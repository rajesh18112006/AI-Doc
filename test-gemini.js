// Quick test script for Gemini API
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;
// Use the working model from API test
let MODEL_NAME = process.env.GEMINI_MODEL || 'models/gemini-2.5-flash';

console.log('🧪 Testing Gemini API Connection...');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING');
console.log('Model:', MODEL_NAME);

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in .env file');
  process.exit(1);
}

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    console.log('\n📤 Sending test request...');
    const result = await model.generateContent('Say "Hello, Gemini API is working!" in one sentence.');
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ SUCCESS! Gemini API is working!');
    console.log('Response:', text);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testGemini();

