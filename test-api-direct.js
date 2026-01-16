// Test Gemini API directly with REST call
require('dotenv').config();
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;

async function testDirectAPI() {
  console.log('🧪 Testing Gemini API directly...');
  console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 15)}...` : 'MISSING');
  
  // Try to list available models first
  const listModelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  console.log('\n📋 Fetching available models...');
  
  https.get(listModelsUrl, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.models && response.models.length > 0) {
          console.log('\n✅ Available models:');
          response.models.forEach(model => {
            if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
              console.log(`  - ${model.name}`);
            }
          });
          
          // Try the first available model
          const firstModel = response.models.find(m => 
            m.supportedGenerationMethods && 
            m.supportedGenerationMethods.includes('generateContent')
          );
          
          if (firstModel) {
            console.log(`\n🎯 Testing with model: ${firstModel.name}`);
            testModel(firstModel.name);
          }
        } else if (response.error) {
          console.error('❌ API Error:', response.error.message);
          console.error('Full error:', JSON.stringify(response.error, null, 2));
        } else {
          console.log('Response:', JSON.stringify(response, null, 2));
        }
      } catch (error) {
        console.error('Parse error:', error.message);
        console.log('Raw response:', data);
      }
    });
  }).on('error', (error) => {
    console.error('Request error:', error.message);
  });
}

function testModel(modelName) {
  const testUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`;
  
  const postData = JSON.stringify({
    contents: [{
      parts: [{
        text: 'Say "Hello, Gemini API is working!" in one sentence.'
      }]
    }]
  });
  
  const url = new URL(testUrl);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.candidates && response.candidates[0]) {
          console.log('\n✅ SUCCESS! Gemini API is working!');
          console.log('Response:', response.candidates[0].content.parts[0].text);
          console.log(`\n🎉 Use this model in your .env file:`);
          console.log(`GEMINI_MODEL=${modelName}\n`);
        } else if (response.error) {
          console.error('❌ Error:', response.error.message);
        } else {
          console.log('Unexpected response:', JSON.stringify(response, null, 2));
        }
      } catch (error) {
        console.error('Parse error:', error.message);
        console.log('Raw response:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Request error:', error.message);
  });
  
  req.write(postData);
  req.end();
}

testDirectAPI();
