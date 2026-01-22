const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

// Verify environment variables
console.log('🔍 Environment Check:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('GEMINI_MODEL:', process.env.GEMINI_MODEL || 'gemini-1.5-flash');

const { generateTextResponse, generateImageResponse } = require('./config/ai-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'medicine-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Medical Assistant API is running',
    gemini_api_key: process.env.GEMINI_API_KEY ? 'configured' : 'missing'
  });
});

// Test AI API endpoint
app.get('/api/test-ai', async (req, res) => {
  try {
    const { generateTextResponse } = require('./config/ai-service');
    const testPrompt = 'Say "Hello, AI API is working!" in one sentence.';
    const response = await generateTextResponse(testPrompt);
    res.json({
      success: true,
      message: 'AI API is working!',
      response: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Symptom Analysis Endpoint
app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms, age, gender, duration, severity, existingConditions } = req.body;
    
    if (!symptoms || !age || !severity) {
      return res.status(400).json({ 
        error: 'Missing required fields: symptoms, age, and severity are required' 
      });
    }

    // Check for emergency symptoms
    const emergencyKeywords = [
      'chest pain', 'difficulty breathing', 'unconsciousness', 'fainting',
      'heavy bleeding', 'severe abdominal pain', 'high fever', 'pregnancy',
      'breathing difficulty', 'cannot breathe'
    ];
    
    const symptomsLower = symptoms.toLowerCase();
    const isEmergency = emergencyKeywords.some(keyword => symptomsLower.includes(keyword)) ||
                       (age < 5 && severity === 'severe') ||
                       (age > 65 && severity === 'severe');

    if (isEmergency) {
      return res.json({
        emergency: true,
        response: `⚠️ URGENT: Please visit a hospital or doctor immediately. Your symptoms require immediate medical attention.\n\nBased on your description, this appears to be an emergency situation. Do not delay - seek medical help right away.\n\n📌 Disclaimer: This information is for guidance only and is not a substitute for a licensed medical professional.`
      });
    }

    // Get user's selected language
    const userLang = req.body.userLang || 'en';
    
    // Build prompt for Gemini - AI will respond directly in the selected language
    const prompt = `Please analyze the following patient information and provide health guidance:

Patient Information:
- Age: ${age} years
- Gender: ${gender || 'Not specified'}
- Symptoms: ${symptoms}
- Duration: ${duration || 'Not specified'}
- Severity: ${severity}
- Existing Conditions: ${existingConditions || 'None mentioned'}

Please provide a comprehensive analysis following the required format.`;

    // Get AI response directly in the selected language
    console.log(`📝 Request received for symptom analysis (Language: ${userLang})`);
    const aiResponse = await generateTextResponse(prompt, 'consultation', userLang);
    console.log('✅ AI response generated successfully');

    res.json({
      emergency: false,
      response: aiResponse,
      language: userLang
    });

  } catch (error) {
    console.error('❌ Error in analyze-symptoms:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Provide user-friendly error messages
    let errorMessage = 'Error analyzing symptoms. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    } else if (error.message.includes('API_KEY')) {
      errorMessage = 'AI service configuration error. Please contact support.';
    }
    
    res.status(500).json({ 
      error: errorMessage,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Medicine Information Endpoint (Text)
app.post('/api/medicine-info', async (req, res) => {
  try {
    const { medicineName } = req.body;
    
    if (!medicineName) {
      return res.status(400).json({ error: 'Medicine name is required' });
    }

    const userLang = req.body.userLang || 'en';
    
    const prompt = `A user wants to know about the medicine: "${medicineName}"

Please provide information about this medicine following the required format. Include:
- What it is commonly used for
- General usage guidance (no specific dosage without doctor consultation)
- Common side effects
- Who should avoid it
- Important warnings

If you cannot identify the medicine, please say so clearly and recommend consulting a doctor or pharmacist.`;

    const aiResponse = await generateTextResponse(prompt, 'medicine-info', userLang);

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error in medicine-info:', error);
    let errorMessage = 'Error fetching medicine information. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    }
    res.status(500).json({ 
      error: errorMessage,
      message: error.message 
    });
  }
});

// Medicine Information Endpoint (Image)
app.post('/api/medicine-info-image', upload.single('medicineImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Medicine image is required' });
    }

    const userLang = req.body.userLang || 'en';
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const mimeType = req.file.mimetype;

    const prompt = `A user has provided an image of a medicine. Please analyze the image and provide information about this medicine following the required format. Include:
- What medicine this appears to be (if identifiable)
- What it is commonly used for
- General usage guidance
- Common side effects
- Who should avoid it
- Important warnings

If you cannot clearly identify the medicine from the image, please say so and recommend consulting a doctor or pharmacist with the medicine.`;

    const aiResponse = await generateImageResponse(prompt, imageBuffer, mimeType, userLang);

    res.json({ response: aiResponse, imagePath: `/uploads/${path.basename(imagePath)}` });

  } catch (error) {
    console.error('Error in medicine-info-image:', error);
    let errorMessage = 'Error analyzing medicine image. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    }
    res.status(500).json({ 
      error: errorMessage,
      message: error.message 
    });
  }
});

// Medicine Suggestions Endpoint
app.post('/api/suggest-medicines', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms are required' });
    }

    const userLang = req.body.userLang || 'en';
    
    const prompt = `A user is experiencing: "${symptoms}"

Please suggest ONLY safe over-the-counter (OTC) medicines that might help, such as:
- Paracetamol (for pain/fever)
- ORS (for dehydration)
- Antacids (for acidity)
- Basic vitamins (for general health)

IMPORTANT: 
- Only suggest safe OTC medicines
- Always emphasize consulting a doctor before taking any medicine
- Do not suggest antibiotics, prescription medicines, or controlled substances
- Provide general guidance only

Follow the required format in your response.`;

    const aiResponse = await generateTextResponse(prompt, 'medicine-suggestion', userLang);

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error in suggest-medicines:', error);
    let errorMessage = 'Error suggesting medicines. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    }
    res.status(500).json({ 
      error: errorMessage,
      message: error.message 
    });
  }
});

// Search Hospitals Endpoint
app.post('/api/search-hospitals', async (req, res) => {
  try {
    const { location, coords } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    // If Google Maps API key is available, use Places API
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    
    if (GOOGLE_MAPS_API_KEY) {
      try {
        // First geocode the location
        const https = require('https');
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`;
        
        const geocodeData = await new Promise((resolve, reject) => {
          https.get(geocodeUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                reject(e);
              }
            });
          }).on('error', reject);
        });
        
        if (geocodeData.results && geocodeData.results.length > 0) {
          const locationCoords = geocodeData.results[0].geometry.location;
          
          // Search for nearby hospitals
          const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoords.lat},${locationCoords.lng}&radius=10000&type=hospital&key=${GOOGLE_MAPS_API_KEY}`;
          
          const placesData = await new Promise((resolve, reject) => {
            https.get(placesUrl, (response) => {
              let data = '';
              response.on('data', (chunk) => { data += chunk; });
              response.on('end', () => {
                try {
                  resolve(JSON.parse(data));
                } catch (e) {
                  reject(e);
                }
              });
            }).on('error', reject);
          });
          
          if (placesData.results && placesData.results.length > 0) {
            // Get details for each hospital
            const hospitals = await Promise.all(
              placesData.results.slice(0, 10).map(async (place) => {
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,geometry&key=${GOOGLE_MAPS_API_KEY}`;
                
                const detailsData = await new Promise((resolve, reject) => {
                  https.get(detailsUrl, (response) => {
                    let data = '';
                    response.on('data', (chunk) => { data += chunk; });
                    response.on('end', () => {
                      try {
                        resolve(JSON.parse(data));
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).on('error', reject);
                });
                
                if (detailsData.result) {
                  return {
                    name: detailsData.result.name,
                    formatted_address: detailsData.result.formatted_address,
                    formatted_phone_number: detailsData.result.formatted_phone_number || null,
                    lat: detailsData.result.geometry.location.lat,
                    lng: detailsData.result.geometry.location.lng,
                    place_id: place.place_id
                  };
                }
                return null;
              })
            );
            
            const validHospitals = hospitals.filter(h => h !== null);
            return res.json({ hospitals: validHospitals });
          }
        }
      } catch (error) {
        console.error('Error using Google Places API:', error);
        // Fall through to return empty result
      }
    }
    
    // If no API key or API failed, return empty result
    res.json({ hospitals: [] });
    
  } catch (error) {
    console.error('Error in search-hospitals:', error);
    res.status(500).json({ 
      error: 'Error searching hospitals',
      message: error.message 
    });
  }
});

// Translate Text Endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang, sourceLang = 'en' } = req.body;
    
    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }
    
    // If source and target are the same, return original text
    if (sourceLang === targetLang) {
      return res.json({ translatedText: text });
    }
    
    // Use Gemini for translation
    const prompt = `Translate the following text from ${sourceLang === 'en' ? 'English' : sourceLang === 'ta' ? 'Tamil' : 'Hindi'} to ${targetLang === 'en' ? 'English' : targetLang === 'ta' ? 'Tamil' : 'Hindi'}. 
    
    Text to translate: "${text}"
    
    Provide only the translated text without any explanations or additional text.`;
    
    try {
      const translatedText = await generateTextResponse(prompt);
      res.json({ translatedText: translatedText.trim() });
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback: return original text
      res.json({ translatedText: text });
    }
    
  } catch (error) {
    console.error('Error in translate:', error);
    res.status(500).json({ 
      error: 'Error translating text',
      message: error.message 
    });
  }
});

// Skin/Wound Analysis Endpoint
app.post('/api/analyze-skin', upload.single('skinImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Skin image is required' });
    }

    const userLang = req.body.userLang || 'en';
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const mimeType = req.file.mimetype;

    const prompt = `A user has uploaded an image of a skin condition, wound, rash, swelling, redness, pimple, or boil. 

Please analyze the image and provide a SHORT, CONCISE response following the required format with only main content:
- Problem: What you see and what it resembles (1-2 sentences)
- Solution: Severity assessment (1 sentence)
- Remedies: Brief care steps (bullet points)
- Medicine: 1-2 over-the-counter suggestions (1-2 sentences, no dosage)
- When to See Doctor: Warning signs (bullet points)

Keep it very brief and practical. Use simple words.`;

    console.log(`📝 Request received for skin analysis (Language: ${userLang})`);
    const aiResponse = await generateImageResponse(prompt, imageBuffer, mimeType, userLang);
    console.log('✅ Skin analysis response generated successfully');

    res.json({ 
      response: aiResponse, 
      imagePath: `/uploads/${path.basename(imagePath)}`,
      language: userLang
    });

  } catch (error) {
    console.error('Error in analyze-skin:', error);
    let errorMessage = 'Error analyzing skin condition. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    }
    res.status(500).json({ 
      error: errorMessage,
      message: error.message 
    });
  }
});

// Side Effects Check Endpoint
app.post('/api/check-side-effects', async (req, res) => {
  try {
    const { medicineName, sideEffects } = req.body;
    
    if (!medicineName || !sideEffects) {
      return res.status(400).json({ 
        error: 'Medicine name and side effects are required' 
      });
    }

    const userLang = req.body.userLang || 'en';
    
    const prompt = `A user is taking the medicine "${medicineName}" and experiencing: "${sideEffects}"

Please analyze if these are common or serious side effects. Provide guidance on:
- Whether these are common side effects (usually mild and manageable)
- Whether these are serious side effects (require immediate medical attention)
- What action the user should take (continue, stop, or seek immediate help)
- When to see a doctor

Follow the required format in your response.`;

    const aiResponse = await generateTextResponse(prompt, 'side-effects', userLang);

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error in check-side-effects:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    
    let errorMessage = 'Error checking side effects. Please try again later.';
    if (error.message.includes('overloaded') || error.message.includes('quota')) {
      errorMessage = 'The AI service is currently busy. Please try again in a few moments.';
    } else if (error.message.includes('API_KEY') || error.message.includes('not set')) {
      errorMessage = 'AI service configuration error. Please contact support.';
      console.error('⚠️  CRITICAL: API Key issue detected!');
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
    }
    
    res.status(500).json({ 
      error: errorMessage,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Please try again later or consult a doctor directly.' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🏥 Medical Assistant Server running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`🤖 Using AI Model: ${process.env.GEMINI_MODEL || 'models/gemini-1.5-flash'}`);
  console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
  if (!process.env.GEMINI_API_KEY) {
    console.error('⚠️  WARNING: GEMINI_API_KEY is not set! API will not work.');
  }
});
