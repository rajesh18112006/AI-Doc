// Check available models for your API key
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set');
  process.exit(1);
}

async function checkModels() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('📋 Fetching available models...\n');
    
    // Try to get available models
    const client = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Test with a simple call to see what works
    console.log('Testing different model names...\n');
    
    const modelsToTry = [
      'gemini-pro',
      'models/gemini-pro',
      'gemini-1.0-pro',
      'models/gemini-1.0-pro',
      'gemini-1.5-pro',
      'models/gemini-1.5-pro',
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ SUCCESS with "${modelName}"!`);
        console.log(`Response: ${text}\n`);
        console.log(`\n🎉 Use this in your .env file:`);
        console.log(`GEMINI_MODEL=${modelName}\n`);
        process.exit(0);
      } catch (error) {
        console.log(`❌ Failed: ${error.message.split('\n')[0]}\n`);
      }
    }
    
    console.log('❌ None of the tested models worked.');
    console.log('This might mean:');
    console.log('1. Your API key might be invalid');
    console.log('2. Your API key might not have access to Gemini models');
    console.log('3. You might need to enable the Gemini API in Google Cloud Console');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkModels();









