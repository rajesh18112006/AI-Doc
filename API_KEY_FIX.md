# Fix Gemini API Key Issue

## Problem
The Gemini API is returning 404 errors for all models. This usually means:

1. **API Key is invalid or expired**
2. **Gemini API is not enabled** in Google Cloud Console
3. **API Key doesn't have proper permissions**

## Solution Steps

### Step 1: Verify Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check if your API key is still valid
3. If needed, create a new API key

### Step 2: Enable Gemini API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Library"
3. Search for "Generative Language API" or "Gemini API"
4. Click on it and make sure it's **ENABLED**
5. If not enabled, click "Enable"

### Step 3: Update Your .env File

Make sure your `.env` file has the correct API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=models/gemini-pro
```

### Step 4: Test the Connection

Run the test script:
```bash
node test-gemini.js
```

### Step 5: Alternative - Use Different API

If Gemini API is not available, you might need to:
- Check if your Google Cloud account has billing enabled
- Verify your API key has the correct permissions
- Try creating a new API key

## Quick Test

After updating your API key, restart the server:
```bash
npm start
```

Then test the API endpoint:
```bash
curl http://localhost:3000/api/test-gemini
```

Or open in browser: http://localhost:3000/api/test-gemini

## If Still Not Working

The API key you provided might need to be:
1. Regenerated from Google AI Studio
2. Have Gemini API enabled in Google Cloud Console
3. Have proper billing/quota enabled

Check the server console logs for detailed error messages.





