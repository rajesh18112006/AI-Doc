# Debugging Render Deployment Issues

## Quick Checklist

### 1. Verify Environment Variables on Render

Go to your Render dashboard → Your Service → Environment → Make sure these are set:

```
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=models/gemini-1.5-flash
PORT=10000
NODE_ENV=production
```

**Important**: 
- Remove any spaces around the `=` sign
- Don't use quotes around the values
- Make sure there are no trailing spaces

### 2. Check Render Logs

In Render dashboard → Your Service → Logs, look for:

✅ **Good signs:**
```
🔧 AI Service Configuration:
  - API Key: ✅ Set (AIzaSyC...)
  - Default Model: models/gemini-1.5-flash
🔑 API Key: ✅ Configured
```

❌ **Bad signs:**
```
🔑 API Key: ❌ Missing
⚠️  WARNING: GEMINI_API_KEY is not set! API will not work.
```

### 3. Test API Directly

After deployment, test the health endpoint:

```bash
curl https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Medical Assistant API is running",
  "gemini_api_key": "configured"
}
```

### 4. Test AI Endpoint

```bash
curl https://your-app.onrender.com/api/test-ai
```

### 5. Common Issues & Solutions

#### Issue: "API Key not set"
**Solution**: 
1. Go to Render → Environment
2. Add `GEMINI_API_KEY` variable
3. Paste your key from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Click "Save Changes"
5. **Redeploy** your service

#### Issue: "Model overloaded" errors
**Solution**: 
- The code now has automatic retry logic
- It will try up to 3 times with exponential backoff
- It will also try different models automatically
- Just wait a moment and try again

#### Issue: API returns 500 errors
**Solution**:
1. Check Render logs for detailed error messages
2. Look for lines starting with `❌` or `Error in`
3. The error message will tell you what's wrong

#### Issue: "Request timeout"
**Solution**:
- Requests timeout after 30 seconds
- The code will retry automatically
- If it keeps timing out, check your API quota on Google AI Studio

### 6. Verify API Key is Valid

Test your API key locally first:

```bash
# In your local project
node test-gemini.js
```

Or test directly:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### 7. Check API Quota

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Dashboard"
3. Find "Generative Language API"
4. Check your quota and usage

### 8. Enable API on Google Cloud

If you haven't already:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Library"
3. Search for "Generative Language API"
4. Click "Enable"

### 9. Debug Mode

To see more detailed errors, temporarily add to Render environment:
```
NODE_ENV=development
```

This will show full error stacks in API responses (remove after debugging for security).

### 10. Test Each Endpoint

```bash
# Health check
curl https://your-app.onrender.com/api/health

# Test AI
curl https://your-app.onrender.com/api/test-ai

# Test symptom analysis
curl -X POST https://your-app.onrender.com/api/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache","age":25,"severity":"mild"}'

# Test side effects
curl -X POST https://your-app.onrender.com/api/check-side-effects \
  -H "Content-Type: application/json" \
  -d '{"medicineName":"paracetamol","sideEffects":"nausea"}'
```

## Still Not Working?

1. **Check Render Logs** - Look for error messages
2. **Verify API Key** - Make sure it's correct and has quota
3. **Check Model Name** - Should be `models/gemini-1.5-flash` (not `gemini-2.5-flash`)
4. **Redeploy** - After changing environment variables, redeploy the service
5. **Wait a moment** - Sometimes Render needs a minute to propagate changes



