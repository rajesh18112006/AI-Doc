// List available Gemini models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set');
  process.exit(1);
}

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const models = await genAI.listModels();
    
    console.log('📋 Available Gemini Models:');
    models.forEach(model => {
      console.log(`  - ${model.name}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();



