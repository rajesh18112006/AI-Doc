const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
// Use correct model name - default to gemini-2.5-flash (fast and efficient)
// Other available models: models/gemini-2.5-pro, models/gemini-flash-latest, models/gemini-pro-latest
let MODEL_NAME = process.env.GEMINI_MODEL || 'models/gemini-2.5-flash';

// Fix common incorrect model names - map to available models
const modelMapping = {
  'gemini-1.5-flash': 'models/gemini-2.5-flash',
  'gemini-1.5-flash-latest': 'models/gemini-2.5-flash',
  'gemini-1.5-pro': 'models/gemini-2.5-pro',
  'gemini-pro': 'models/gemini-pro-latest',
  'gemini-flash': 'models/gemini-flash-latest'
};

if (modelMapping[MODEL_NAME]) {
  MODEL_NAME = modelMapping[MODEL_NAME];
  console.warn(`⚠️  Model mapped to available model: ${MODEL_NAME}`);
}

// Ensure model name has 'models/' prefix if not present
if (!MODEL_NAME.startsWith('models/')) {
  MODEL_NAME = `models/${MODEL_NAME}`;
}

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

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

// Get model instance
function getModel() {
  // Try using the model with proper configuration
  try {
    return genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      // Some models might need different API version
    });
  } catch (error) {
    console.error('Error getting model:', error);
    // Fallback to default model
    return genAI.getGenerativeModel({ model: 'models/gemini-pro' });
  }
}

// Generate text response
async function generateTextResponse(prompt) {
  try {
    console.log('🤖 Calling Gemini API...');
    console.log('📋 Model:', MODEL_NAME);
    console.log('🔑 API Key exists:', !!API_KEY);
    
    const model = getModel();
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
    
    console.log('📤 Sending request to Gemini...');
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API response received');
    return text;
  } catch (error) {
    console.error('❌ Gemini API Error Details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Provide more helpful error messages
    if (error.message.includes('API_KEY')) {
      throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env file.');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('API quota exceeded. Please check your Gemini API usage limits.');
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error(`AI service error: ${error.message}`);
    }
  }
}

// Generate response with image
async function generateImageResponse(prompt, imageBuffer, mimeType) {
  try {
    const model = getModel();
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
    
    // Convert image buffer to base64
    const imageBase64 = imageBuffer.toString('base64');
    
    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Gemini API Error (with image):', error);
    throw new Error(`AI service error: ${error.message}`);
  }
}

module.exports = {
  generateTextResponse,
  generateImageResponse,
  getModel
};

