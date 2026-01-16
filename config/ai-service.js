// Simple AI Service using Gemini REST API (Direct HTTP calls)
require('dotenv').config();
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
// Use more stable model names - fallback chain
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'models/gemini-1.5-flash';
const FALLBACK_MODELS = [
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro',
  'models/gemini-pro',
  'models/gemini-flash'
];

// System prompt for medical assistant
const SYSTEM_PROMPT = `You are an AI-powered virtual medical assistant designed to provide safe, accurate, ethical, and easy-to-understand health guidance for a web-based application used by many people, especially rural and underserved populations.

You must behave like a caring, experienced general physician (MBBS-level), while strictly following medical safety rules.

ROLE & COMMUNICATION STYLE:
- Act like a calm, kind, and responsible doctor.
- Use very simple English suitable for rural users.
- Avoid medical jargon.
- Be polite, respectful, and reassuring.
- Never scare or panic the user.
- Ask follow-up questions if important information is missing.
- Keep explanations short, structured, and clear.

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

STRICT OUTPUT FORMAT (MANDATORY):
Always respond EXACTLY in this structure:

--------------------------------
👤 Patient Summary:
- Age:
- Gender:
- Key symptoms:

🧠 Possible Health Insight:
- (Simple explanation, no diagnosis)

💊 Medicine Information / Suggestion:
- (Explanation or safe OTC suggestion only)

⚠️ Warnings & When to See a Doctor:
- (Clear emergency or risk signs)

✅ Self-Care Advice:
- (Rest, food, hydration, lifestyle tips)

📌 Disclaimer:
"This information is for guidance only and is not a substitute for a licensed medical professional."
--------------------------------

ETHICS & SAFETY RULES:
- Never judge the user.
- Never provide false certainty.
- Never give unsafe or illegal advice.
- Always promote responsible medical care.`;

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
            console.error('❌ Gemini API Error:', errorMsg);
            
            // Check if it's a retryable error
            const isRetryable = errorMsg.includes('overloaded') || 
                               errorMsg.includes('quota') || 
                               errorMsg.includes('rate limit') ||
                               errorMsg.includes('503') ||
                               errorMsg.includes('429');
            
            if (isRetryable && retryCount < maxRetries) {
              const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
              console.log(`⏳ Retrying in ${delay}ms...`);
              setTimeout(() => {
                makeGeminiRequest(modelName, postData, retryCount + 1, maxRetries)
                  .then(resolve)
                  .catch(reject);
              }, delay);
            } else {
              reject(new Error(`Gemini API error: ${errorMsg}`));
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
async function generateTextResponse(prompt) {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in .env file');
  }

  const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
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
async function generateImageResponse(prompt, imageBuffer, mimeType) {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set. Image analysis requires Gemini API.');
  }

  const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
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
