# MediCare AI - Virtual Medical Assistant

A comprehensive, AI-powered virtual medical assistant designed to provide safe, accurate, and accessible health guidance. Built with Google Gemini AI, featuring full multilingual support, image analysis, and voice capabilities.

## 🌟 Features

### 🤖 AI-Powered Medical Services
- **Symptom Analysis**: Get AI-powered health insights based on symptoms, age, gender, and medical history
- **Medicine Information**: Look up medicines by name or upload images for visual identification
- **Medicine Suggestions**: Get AI-recommended safe over-the-counter medicine suggestions
- **Side Effects Checker**: Analyze reported side effects with AI-powered assessment
- **Skin & Wound Analysis**: Upload or capture photos of skin conditions for AI analysis with practical remedies and medicine suggestions

### 🌍 Complete Multilingual Support
- **5 Languages Supported**: English, Tamil (தமிழ்), Hindi (हिंदी), Telugu (తెలుగు), Kannada (ಕನ್ನಡ)
- **Full UI Translation**: All interface elements change based on selected language (except hero section)
- **AI Responses in Native Language**: All AI responses are generated directly in the selected language
- **Voice Support**: Text-to-speech in all supported languages with optimized voice quality
- **Voice Input**: Speech recognition for symptom input in multiple languages

### 📸 Image Analysis
- **Medicine Image Recognition**: Upload medicine images for AI-powered identification and information
- **Skin Condition Analysis**: Capture or upload skin/wound photos for detailed analysis
- **Camera Integration**: Direct camera capture for both medicine and skin condition images
- **Visual AI**: Powered by Google Gemini Vision API

### 🗺️ Hospital Finder
- **Free OpenStreetMap Integration**: No API keys required
- **Location-Based Search**: Find nearby hospitals by city, area, or pincode
- **Interactive Map**: Visual map with hospital markers
- **Hospital Details**: Name, address, phone, and directions

### 🎤 Voice Features
- **Voice Input**: Speak symptoms instead of typing
- **Voice Output**: Listen to AI consultation responses
- **Multi-language Voice**: Optimized voice synthesis for all supported languages
- **High-Quality Audio**: Enhanced voice settings for clarity and naturalness

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Bootstrap 5**: Modern, professional interface
- **Smooth Animations**: Engaging user experience
- **Accessibility**: User-friendly for all skill levels
- **Rural-Friendly**: Designed especially for rural and underserved communities

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with gradients and animations
- **Bootstrap 5.3.2** - Responsive framework
- **Bootstrap Icons** - Icon library
- **Vanilla JavaScript** - No framework dependencies
- **Web Speech API** - Voice recognition and synthesis
- **MediaDevices API** - Camera access for image capture
- **Leaflet.js** - OpenStreetMap integration for hospital finder

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **Multer 1.4.5** - File upload handling
- **Body-parser** - Request body parsing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI & APIs
- **Google Gemini API** - AI engine (gemini-2.5-flash, with fallback models)
- **Gemini Vision API** - Image analysis for medicines and skin conditions
- **OpenStreetMap (Nominatim + Overpass)** - Free hospital search (no API key required)

### Development Tools
- **Nodemon** - Development auto-reload
- **dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Step 1: Clone and Install

```bash
cd Medical
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=models/gemini-2.5-flash

# Server Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

### Step 3: Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
Medical/
├── server.js                  # Express server and API endpoints
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables (create this)
├── .gitignore                 # Git ignore rules
├── config/
│   └── ai-service.js         # Gemini API integration and prompts
├── public/
│   ├── index.html            # Frontend HTML
│   ├── styles.css            # Custom CSS
│   ├── app.js               # Frontend JavaScript
│   ├── translations.js      # Multilingual translations
│   └── hospital-finder.js   # Hospital search functionality
└── uploads/                  # Uploaded images (auto-created)
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Symptom Analysis
- `POST /api/analyze-symptoms`
  - Body: `{ symptoms, age, gender, duration, severity, existingConditions, userLang }`
  - Returns: AI-generated health analysis in selected language

### Medicine Information
- `POST /api/medicine-info` - Get medicine info by name
  - Body: `{ medicineName, userLang }`
  
- `POST /api/medicine-info-image` - Get medicine info from image
  - Form Data: `medicineImage` (file), `userLang`

### Medicine Suggestions
- `POST /api/suggest-medicines`
  - Body: `{ symptoms, userLang }`
  - Returns: AI-suggested safe OTC medicines

### Side Effects Check
- `POST /api/check-side-effects`
  - Body: `{ medicineName, sideEffects, userLang }`
  - Returns: AI analysis of reported side effects

### Skin/Wound Analysis
- `POST /api/analyze-skin`
  - Form Data: `skinImage` (file), `userLang`
  - Returns: AI analysis with problem, solution, remedies, and medicine suggestions

## 🌐 Language Support

### Supported Languages
1. **English (en)** - Default
2. **Tamil (ta)** - தமிழ்
3. **Hindi (hi)** - हिंदी
4. **Telugu (te)** - తెలుగు
5. **Kannada (kn)** - ಕನ್ನಡ

### Language Features
- Complete UI translation (except hero section)
- AI responses generated directly in selected language
- Voice recognition in multiple languages
- Text-to-speech with language-specific voices
- Language preference saved in localStorage

## 🎯 Key Features Explained

### 1. Symptom Analysis
- Enter symptoms, age, gender, duration, and severity
- Get AI-powered preliminary assessment
- Receive practical care recommendations
- Emergency situations automatically flagged

### 2. Medicine Information
- Search by medicine name
- Upload medicine image for visual identification
- Get detailed information about usage, side effects, and precautions

### 3. Skin & Wound Analysis
- Capture photo directly from camera or upload image
- Get concise analysis with:
  - **Problem**: What's visible and what it resembles
  - **Solution**: Severity assessment
  - **Remedies**: Practical care steps
  - **Medicine**: Over-the-counter suggestions
  - **When to See Doctor**: Warning signs

### 4. Hospital Finder
- Search hospitals by location (city, area, pincode)
- Interactive map with markers
- Hospital details with directions
- Completely free (no API keys needed)

### 5. Voice Features
- **Voice Input**: Click microphone to speak symptoms
- **Voice Output**: Listen to AI responses
- Optimized voice quality for clarity
- Multi-language voice support

## ⚠️ Important Medical Disclaimers

**This application is NOT a replacement for licensed medical professionals.**

- All information is AI-generated for guidance only
- No final diagnoses are provided
- No controlled or high-risk medicines are suggested
- Emergency situations are flagged for immediate medical attention
- Users are always encouraged to consult real doctors

### Emergency Detection
The system automatically flags and recommends immediate hospital visits for:
- Chest pain
- Difficulty breathing
- Unconsciousness or fainting
- Heavy bleeding
- Severe abdominal pain
- High fever lasting more than 3 days
- Pregnancy-related problems
- Severe symptoms in children under 5
- Worsening symptoms in elderly people

## 🔒 Security & Privacy

- API keys stored in environment variables
- File uploads validated and sanitized
- No personal health information logged permanently
- Suitable for deployment with proper security measures
- All data processed securely

## 🛠️ Customization

### Change AI Model
Edit `.env`:
```env
GEMINI_MODEL=models/gemini-1.5-pro  # For more advanced responses
```

### Add New Languages
1. Add translations to `public/translations.js`
2. Update language selector in `public/index.html`
3. Add language mapping in `public/app.js`

### UI Customization
Edit `public/styles.css` for colors, fonts, and styling

## 📝 Usage Instructions

### Symptom Analysis
1. Navigate to "Consultation" section
2. Fill in your age, gender, symptoms, duration, and severity
3. Optionally use voice input to speak symptoms
4. Click "Analyze Symptoms with AI"
5. Review the analysis and listen to voice output if needed

### Medicine Information
1. Go to "Medicine Info" section
2. Enter medicine name OR upload/capture medicine image
3. Get detailed information about the medicine

### Skin Analysis
1. Navigate to "Skin Analysis" section
2. Click "Start Camera" or upload an image
3. Capture/select the skin condition photo
4. Click "Analyze Skin Condition"
5. Review the concise analysis with remedies and medicine suggestions

### Hospital Finder
1. Go to "Find Hospitals" section
2. Enter your location (city, area, or pincode)
3. View hospitals on the interactive map
4. Get directions and contact information

## 🐛 Troubleshooting

### API Key Error
- Verify API key is correct in `.env`
- Check internet connection
- Ensure API key has proper permissions

### Camera Not Working
- Check browser permissions for camera access
- Use HTTPS in production (required for camera)
- Try a different browser (Chrome/Edge recommended)

### Voice Not Working
- Ensure browser supports Web Speech API
- Check microphone permissions
- Use Chrome or Edge for best voice support

### File Upload Issues
- Check `uploads/` directory exists and is writable
- Verify file size is under 5MB
- Ensure file is a valid image format (JPG, PNG, GIF, WebP)

## 📄 License

MIT License - Feel free to use and modify for your needs.

## 🤝 Contributing

When contributing, please ensure:
- Medical safety guidelines are followed
- Disclaimers are maintained
- Code follows ethical medical practices
- User safety is prioritized
- Multilingual support is maintained

## 🎯 Future Enhancements

- Additional language support
- User accounts and history
- Offline mode capabilities
- Enhanced voice features
- Integration with telemedicine platforms

---

**Remember**: This tool is designed to assist, not replace, professional medical care. Always consult licensed healthcare providers for proper diagnosis and treatment.

**Built with ❤️ for rural and underserved communities**

---

## 📞 Support

For issues, questions, or contributions, please refer to the project repository.

**Version**: 2.0.0  
**Last Updated**: 2024
