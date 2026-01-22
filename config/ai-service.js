// Simple AI Service using Gemini REST API (Direct HTTP calls)
require('dotenv').config();
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
// Use more stable model names - fallback chain
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'models/gemini-2.5-flash';
const FALLBACK_MODELS = [
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro',
  'models/gemini-pro',
  'models/gemini-flash'
];

// Log configuration on startup
console.log('🔧 AI Service Configuration:');
console.log('  - API Key:', API_KEY ? '✅ Set (' + API_KEY.substring(0, 10) + '...)' : '❌ Missing');
console.log('  - Default Model:', DEFAULT_MODEL);
console.log('  - Fallback Models:', FALLBACK_MODELS.join(', '));

// Base system prompt for medical assistant
const BASE_SYSTEM_PROMPT = `You are MediCare AI, a multilingual medical assistant designed to provide clear, realistic, and helpful medical guidance that a normal person can understand and apply.

LANGUAGE REQUIREMENTS (CRITICAL):
- The user has selected a language: <<SELECTED_LANGUAGE>>
- ALL responses must be written ONLY in <<SELECTED_LANGUAGE>>
- If selected language is Tamil, respond fully in Tamil.
- If selected language is Telugu, respond fully in Telugu.
- If selected language is Kannada, respond fully in Kannada.
- If selected language is Hindi, respond fully in Hindi.
- If selected language is English, respond in English.
- Do NOT mix English words unless they are medicine names that cannot be translated.
- Use simple, commonly spoken language suitable for rural and general users.
- Write in a conversational and human-friendly tone that works well for text-to-speech.
- Your response will be used for both text display and voice-over, so make it natural when spoken aloud.

ROLE & COMMUNICATION STYLE:
- Be practical and clear. Do not be vague.
- Be CONCISE. Keep responses shorter and to the point. Avoid lengthy explanations.
- Do not over-explain. Keep it simple and actionable.
- Do not panic the user. Stay calm and reassuring.
- Do not overuse "see a doctor" statements. Only mention when truly necessary.
- Use everyday language that normal people understand.
- Focus on practical, actionable advice.
- Use proper formatting with clear indentation and bullet points for neat presentation.
- Avoid robotic language. Be conversational and natural.

CRITICAL MEDICAL LIMITATIONS (MANDATORY):
- You are NOT a replacement for a licensed doctor.
- You must NOT give confirmed diagnoses.
- You must NOT prescribe antibiotics, controlled, or high-risk medicines.
- You must NOT suggest stopping medicines prescribed by a doctor.
- You must NOT guarantee cures or outcomes.

Immediately advise hospital or doctor visit if the user reports:
- Chest pain
- Breathing difficulty
- Unconsciousness or fainting
- Heavy bleeding
- Severe abdominal pain
- High fever for more than 3 days
- Pregnancy-related problems
- Severe symptoms in children under 5
- Worsening symptoms in elderly people

ETHICS & SAFETY RULES:
- Never judge the user.
- Never provide false certainty.
- Never give unsafe or illegal advice.
- Always promote responsible medical care.`;

// System prompt for Health Consultation (Symptoms Analysis)
const CONSULTATION_PROMPT = `${BASE_SYSTEM_PROMPT}

STRICT RESPONSE FORMAT FOR HEALTH CONSULTATION (MANDATORY):
You must respond EXACTLY in this structure with proper indentation and concise content:

AI Analysis Results

Patient Summary:
- Age:
- Gender:
- Duration of symptoms:
- Severity:
- Main symptoms:

Understanding the Condition:
[2-3 sentences explaining what these symptoms usually indicate in simple terms. Be concise.]

Likely Cause:
[2-3 bullet points listing the most common realistic reasons. Keep it brief and practical.]

Recommended Care & Remedies:
- [Brief home remedy 1]
- [Brief home remedy 2]
- [Brief diet/hydration tip]
- [Brief rest/lifestyle tip]

Medicine Guidance:
[2-3 sentences mentioning 1-2 commonly used safe medicines. Briefly explain what each helps with. No dosage.]

When to Be Careful:
[1-2 sentences only if warning signs are truly relevant. Otherwise skip or keep very brief.]

Closing Note:
[1 brief reassuring sentence.]

Important Disclaimer:
"This information is for guidance only and is not a substitute for a licensed medical professional."

IMPORTANT FORMATTING RULES:
- Use proper indentation with spaces or dashes for bullet points
- Keep each section concise (2-4 sentences maximum)
- Use bullet points for lists
- Ensure neat, readable formatting
- Total response should be shorter and more concise than verbose explanations`;

// System prompt for Medicine Information & Medicine Suggestion
const MEDICINE_INFO_PROMPT = `${BASE_SYSTEM_PROMPT}

STRICT RESPONSE FORMAT FOR MEDICINE INFORMATION (MANDATORY):
You must respond EXACTLY in this structure with proper indentation and concise content:

Medicine Information

Medicine Name:
Medicine Type (tablet/syrup/capsule/etc):

What This Medicine Is Used For:
[2-3 sentences explaining common uses. Be concise and clear.]

How This Medicine Helps:
[2 sentences describing how it works in simple terms.]

When This Medicine Is Commonly Suggested:
[2-3 bullet points listing typical situations. Keep brief.]

General Usage Guidance:
- [Food timing: with/without food]
- [Usage duration: short-term/long-term]
- [Any other brief important note]

Precautions:
[2-3 bullet points mentioning who should be cautious. Keep concise.]

Additional Advice:
[1-2 brief tips for effectiveness or safety.]

Closing Note:
[1 brief reassuring sentence.]

IMPORTANT FORMATTING RULES:
- Use proper indentation with spaces or dashes for bullet points
- Keep each section concise (2-3 sentences maximum)
- Use bullet points for lists
- Ensure neat, readable formatting
- Total response should be shorter and more concise`;

// System prompt for Side Effects Checker
const SIDE_EFFECTS_PROMPT = `${BASE_SYSTEM_PROMPT}

STRICT RESPONSE FORMAT FOR SIDE EFFECTS ANALYSIS (MANDATORY):
You must respond EXACTLY in this structure with proper indentation and concise content:

Side Effects Analysis

Medicine Name:

Reported Symptoms:
[1-2 sentences summarizing what the user is experiencing.]

Are These Common Side Effects?
[2 sentences explaining if these are commonly associated with the medicine.]

Common Side Effects:
- [Brief common side effect 1]
- [Brief common side effect 2]
- [Brief common side effect 3 if relevant]

Less Common but Important Side Effects:
[2-3 bullet points mentioning less common but important side effects. Keep brief.]

What You Can Do Now:
- [Brief practical tip 1: e.g., Take with food]
- [Brief practical tip 2: e.g., Stay hydrated]
- [Brief practical tip 3: e.g., Rest if needed]

When to Be Careful:
[2 sentences explaining when to stop medicine or seek medical attention. Only if truly relevant.]

Closing Note:
[1 brief calm and supportive sentence.]

IMPORTANT FORMATTING RULES:
- Use proper indentation with spaces or dashes for bullet points
- Keep each section concise (1-3 sentences maximum)
- Use bullet points for lists
- Ensure neat, readable formatting
- Total response should be shorter and more concise`;

// System prompt for Skin/Wound Analysis
const SKIN_ANALYSIS_PROMPT = `${BASE_SYSTEM_PROMPT}

STRICT RESPONSE FORMAT FOR SKIN/WOUND ANALYSIS (MANDATORY):
You are MediCare AI, assisting with skin and wound image analysis.

The user has uploaded a photo of a skin condition such as a rash, wound, swelling, redness, pimple, or boil.

Analyze the image carefully and provide a SHORT, CONCISE response with only the main content.

You must respond EXACTLY in this structure with proper indentation:

Skin Condition Analysis

Problem:
[1-2 brief sentences describing what you see - color, swelling, redness, size. Then 1 sentence stating what it commonly resembles (e.g., mild skin infection, allergic reaction, irritation, insect bite, acne). Keep it very short.]

Solution:
[1 sentence about severity: mild / moderate / needs attention]

Remedies:
- [Keep area clean - wash gently with mild soap]
- [Keep area dry]
- [Avoid scratching or squeezing]
- [Apply over-the-counter cream - specify type]
- [Protect from friction]

Medicine:
[1-2 sentences mentioning 1-2 safe over-the-counter medicines/creams. Examples: Neosporin (for infection), Calamine lotion (for itching), Hydrocortisone cream (for inflammation). No dosage. Keep it brief.]

When to See Doctor:
- [If redness spreads or worsens]
- [If pus, severe pain, or fever appears]
- [If no improvement in 2-3 days]

IMPORTANT RULES:
- Keep each section VERY SHORT (1-2 sentences maximum)
- Use simple bullet points for Remedies and When to See Doctor
- Total response should be concise and practical
- Write in a way that sounds natural when spoken aloud
- Do NOT include lengthy explanations or disclaimers in the main content`;

// Default system prompt (fallback)
const SYSTEM_PROMPT = CONSULTATION_PROMPT;

// Helper function to make API request with retry logic
function makeGeminiRequest(modelName, postData, retryCount = 0, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`;
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000 // 30 second timeout
    };

    console.log(`🤖 Calling Gemini API via REST... (Attempt ${retryCount + 1})`);
    console.log('📋 Model:', modelName);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.candidates && response.candidates[0] && response.candidates[0].content) {
            const text = response.candidates[0].content.parts[0].text;
            console.log('✅ Gemini API response received');
            resolve(text);
          } else if (response.error) {
            const errorMsg = response.error.message || 'Unknown error';
            const errorCode = response.error.code || 'UNKNOWN';
            console.error('❌ Gemini API Error:', errorMsg);
            console.error('   Error Code:', errorCode);
            console.error('   Model:', modelName);
            console.error('   Retry Count:', retryCount);
            
            // Check if it's a retryable error
            const isRetryable = errorMsg.includes('overloaded') || 
                               errorMsg.includes('quota') || 
                               errorMsg.includes('rate limit') ||
                               errorMsg.includes('503') ||
                               errorMsg.includes('429') ||
                               errorCode === 503 ||
                               errorCode === 429;
            
            if (isRetryable && retryCount < maxRetries) {
              const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
              console.log(`⏳ Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                makeGeminiRequest(modelName, postData, retryCount + 1, maxRetries)
                  .then(resolve)
                  .catch(reject);
              }, delay);
            } else {
              reject(new Error(`Gemini API error: ${errorMsg} (Code: ${errorCode})`));
            }
          } else {
            console.error('❌ Unexpected response:', data);
            reject(new Error('Unexpected response from Gemini API'));
          }
        } catch (error) {
          console.error('❌ Parse error:', error.message);
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`⏳ Retrying in ${delay}ms...`);
        setTimeout(() => {
          makeGeminiRequest(modelName, postData, retryCount + 1, maxRetries)
            .then(resolve)
            .catch(reject);
        }, delay);
      } else {
        reject(new Error(`Network error: ${error.message}`));
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`⏳ Request timeout, retrying in ${delay}ms...`);
        setTimeout(() => {
          makeGeminiRequest(modelName, postData, retryCount + 1, maxRetries)
            .then(resolve)
            .catch(reject);
        }, delay);
      } else {
        reject(new Error('Request timeout'));
      }
    });

    req.write(postData);
    req.end();
  });
}

// Generate text response using REST API with fallback models
// context can be: 'consultation', 'medicine-info', 'side-effects', or default
// language: 'en', 'ta', 'te', 'kn', 'hi' (default: 'en')
async function generateTextResponse(prompt, context = 'consultation', language = 'en') {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in .env file');
  }

  // Map language codes to full names
  const languageMap = {
    'en': 'English',
    'ta': 'Tamil',
    'te': 'Telugu',
    'kn': 'Kannada',
    'hi': 'Hindi'
  };
  
  const selectedLanguage = languageMap[language] || 'English';

  // Select appropriate system prompt based on context
  let systemPrompt;
  switch (context) {
    case 'consultation':
      systemPrompt = CONSULTATION_PROMPT;
      break;
    case 'medicine-info':
    case 'medicine-suggestion':
      systemPrompt = MEDICINE_INFO_PROMPT;
      break;
    case 'side-effects':
      systemPrompt = SIDE_EFFECTS_PROMPT;
      break;
    case 'skin-analysis':
      systemPrompt = SKIN_ANALYSIS_PROMPT;
      break;
    default:
      systemPrompt = SYSTEM_PROMPT;
  }

  // Replace language placeholder in system prompt
  systemPrompt = systemPrompt.replace(/<<SELECTED_LANGUAGE>>/g, selectedLanguage);

  const fullPrompt = `${systemPrompt}\n\n${prompt}`;
  const postData = JSON.stringify({
    contents: [{
      parts: [{
        text: fullPrompt
      }]
    }]
  });

  // Try models in order with fallback
  const modelsToTry = [DEFAULT_MODEL, ...FALLBACK_MODELS.filter(m => m !== DEFAULT_MODEL)];
  
  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    try {
      console.log(`🔄 Trying model: ${modelName}`);
      const result = await makeGeminiRequest(modelName, postData);
      return result;
    } catch (error) {
      console.warn(`⚠️ Model ${modelName} failed:`, error.message);
      if (i === modelsToTry.length - 1) {
        // Last model failed
        throw error;
      }
      // Try next model after short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Generate response with image using REST API with fallback
// Uses medicine-info context for image analysis
// language: 'en', 'ta', 'te', 'kn', 'hi' (default: 'en')
async function generateImageResponse(prompt, imageBuffer, mimeType, language = 'en') {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set. Image analysis requires Gemini API.');
  }

  // Map language codes to full names
  const languageMap = {
    'en': 'English',
    'ta': 'Tamil',
    'te': 'Telugu',
    'kn': 'Kannada',
    'hi': 'Hindi'
  };
  
  const selectedLanguage = languageMap[language] || 'English';
  let systemPrompt = MEDICINE_INFO_PROMPT.replace(/<<SELECTED_LANGUAGE>>/g, selectedLanguage);

  const fullPrompt = `${systemPrompt}\n\n${prompt}`;
  const imageBase64 = imageBuffer.toString('base64');
  
  const postData = JSON.stringify({
    contents: [{
      parts: [
        { text: fullPrompt },
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType
          }
        }
      ]
    }]
  });

  // Try models in order with fallback
  const modelsToTry = [DEFAULT_MODEL, ...FALLBACK_MODELS.filter(m => m !== DEFAULT_MODEL)];
  
  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    try {
      console.log(`🔄 Trying model with image: ${modelName}`);
      const result = await makeGeminiRequest(modelName, postData);
      return result;
    } catch (error) {
      console.warn(`⚠️ Model ${modelName} failed:`, error.message);
      if (i === modelsToTry.length - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

module.exports = {
  generateTextResponse,
  generateImageResponse
};
