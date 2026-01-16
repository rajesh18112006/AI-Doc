// Test the new AI service
require('dotenv').config();
const { generateTextResponse } = require('./config/ai-service');

async function test() {
  try {
    console.log('🧪 Testing AI Service...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 15)}...` : 'MISSING');
    console.log('Model:', process.env.GEMINI_MODEL || 'models/gemini-2.5-flash');
    console.log('\n📤 Sending test request...\n');
    
    const response = await generateTextResponse('Say "Hello, AI service is working!" in one sentence.');
    
    console.log('\n✅ SUCCESS!');
    console.log('Response:', response);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

test();





