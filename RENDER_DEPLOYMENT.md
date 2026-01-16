# Render Deployment Guide

## Fixed Issues

The API has been updated to handle Gemini API overload errors and improve reliability:

### ✅ Changes Made:

1. **Retry Logic with Exponential Backoff**
   - Automatically retries failed requests up to 3 times
   - Uses exponential backoff (1s, 2s, 4s delays)
   - Handles "overloaded" and "quota" errors gracefully

2. **Model Fallback System**
   - Tries multiple Gemini models if one fails
   - Fallback order: `gemini-1.5-flash` → `gemini-1.5-pro` → `gemini-pro` → `gemini-flash`
   - Ensures API continues working even if a specific model is unavailable

3. **Better Error Handling**
   - User-friendly error messages
   - Proper error responses to clients
   - Detailed logging for debugging

4. **Request Timeout**
   - 30-second timeout per request
   - Prevents hanging requests

## Environment Variables for Render

Make sure to set these in your Render dashboard:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=models/gemini-1.5-flash
PORT=10000
NODE_ENV=production
```

## Model Names

The following models are supported (in fallback order):
- `models/gemini-1.5-flash` (default - fastest)
- `models/gemini-1.5-pro` (more capable)
- `models/gemini-pro` (stable)
- `models/gemini-flash` (alternative)

## Testing

After deployment, test the API:

```bash
# Health check
curl https://your-app.onrender.com/api/health

# Test AI endpoint
curl https://your-app.onrender.com/api/test-ai

# Test symptom analysis
curl -X POST https://your-app.onrender.com/api/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache","age":25,"severity":"mild"}'
```

## Troubleshooting

### If API still returns "overloaded" errors:

1. **Check your API key**: Make sure `GEMINI_API_KEY` is set correctly in Render
2. **Check API quota**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to verify your quota
3. **Wait and retry**: The retry logic will automatically handle temporary overloads
4. **Check logs**: View Render logs to see which model is being used and any errors

### Common Issues:

- **"API_KEY not set"**: Add `GEMINI_API_KEY` to Render environment variables
- **"Model not found"**: The fallback system should handle this automatically
- **"Timeout"**: Requests timeout after 30 seconds, will retry automatically

## Notes

- The app no longer requires a database (MySQL removed)
- All AI responses are returned directly without storage
- File uploads for medicine images are stored temporarily in the `uploads/` folder

