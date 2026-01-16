# Virtual Medical Assistant - Powered by Google Gemini AI

A professional, AI-powered virtual medical assistant designed to provide safe, accurate, ethical, and easy-to-understand health guidance. Built with Google Gemini API for intelligent responses and MySQL for data persistence.

## 🌟 Features

### 🤖 AI-Powered Analysis
- **100% AI-Driven**: All responses come from Google Gemini AI, not predefined logic
- **Symptom Analysis**: Get AI-powered health insights based on symptoms
- **Medicine Information**: Look up medicines by name or upload images
- **Side Effects Checker**: Analyze reported side effects with AI
- **Safe Medicine Suggestions**: Get AI-recommended OTC medicine suggestions

### 🎨 Professional UI
- Modern, engaging design with Bootstrap 5
- Fully responsive for mobile, tablet, and desktop
- Smooth animations and transitions
- Accessible and user-friendly interface
- Optimized for low-bandwidth connections

### 📊 Database Integration
- MySQL database for storing consultations
- Medicine query history
- Side effect reports
- Analytics-ready data structure

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with gradients and animations
- **Bootstrap 5.3.2** - Responsive framework
- **Bootstrap Icons** - Icon library
- **Vanilla JavaScript** - No framework dependencies

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Gemini API** - AI engine (gemini-1.5-flash)
- **MySQL2** - Database driver
- **Multer** - File upload handling

### AI & Database
- **Google Gemini 1.5 Flash** - Fast, efficient AI responses
- **MySQL** - Relational database
- **Image Processing** - Medicine image analysis with Gemini Vision

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MySQL Server (v5.7 or higher)

### Step 1: Clone and Install Dependencies

```bash
cd Medical
npm install
```

### Step 2: Database Setup

1. Start MySQL server
2. Create the database:

```bash
mysql -u root -p < database.sql
```

Or manually:
```sql
CREATE DATABASE medical_assistant;
USE medical_assistant;
-- Then run the SQL from database.sql
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=AIzaSyAJIrfUO12TQC_fVyYLw5PMOSpMwh1rJxQ
GEMINI_MODEL=gemini-1.5-flash

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=medical_assistant
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

**Note**: Update the database credentials according to your MySQL setup.

### Step 4: Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
Medical/
├── server.js              # Express server and API endpoints
├── package.json           # Dependencies
├── database.sql           # MySQL schema
├── .env                   # Environment variables (create this)
├── config/
│   ├── database.js       # MySQL connection and initialization
│   └── gemini.js         # Gemini API integration
├── uploads/              # Medicine images (auto-created)
└── public/
    ├── index.html        # Frontend HTML
    ├── styles.css        # Custom CSS
    └── app.js            # Frontend JavaScript
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Check API and database status

### Symptom Analysis
- `POST /api/analyze-symptoms`
  - Body: `{ symptoms, age, gender, duration, severity, existingConditions }`
  - Returns: AI-generated health analysis

### Medicine Information
- `POST /api/medicine-info` - Get medicine info by name
  - Body: `{ medicineName }`
  
- `POST /api/medicine-info-image` - Get medicine info from image
  - Form Data: `medicineImage` (file)

### Medicine Suggestions
- `POST /api/suggest-medicines`
  - Body: `{ symptoms }`
  - Returns: AI-suggested safe OTC medicines

### Side Effects Check
- `POST /api/check-side-effects`
  - Body: `{ medicineName, sideEffects }`
  - Returns: AI analysis of reported side effects

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

## 🎯 Key Features

### 1. AI-Powered Responses
All medical guidance comes from Google Gemini AI, ensuring:
- Context-aware responses
- Natural language understanding
- Up-to-date medical knowledge
- Personalized recommendations

### 2. Image Recognition
Upload medicine images to:
- Identify medicines visually
- Get information about unknown medicines
- Verify medicine details

### 3. Database Logging
All consultations are stored for:
- Future reference
- Analytics
- Improvement tracking
- User history (if implemented)

## 🔒 Security & Privacy

- API keys stored in environment variables
- File uploads validated and sanitized
- No personal health information logged permanently
- Suitable for deployment with proper security measures

## 🛠️ Customization

### Change AI Model
Edit `.env`:
```env
GEMINI_MODEL=gemini-1.5-pro  # For more advanced responses
```

### Database Configuration
Update `.env` with your MySQL credentials

### UI Customization
Edit `public/styles.css` for colors, fonts, and styling

## 📝 Notes

- The application requires an active internet connection for Gemini API calls
- Image uploads are limited to 5MB
- Database connection is optional - app will work without it but won't store history
- All AI responses follow strict medical safety guidelines

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MySQL server is running
- Check database credentials in `.env`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Gemini API Error
- Verify API key is correct in `.env`
- Check internet connection
- Ensure API key has proper permissions

### File Upload Issues
- Check `uploads/` directory exists and is writable
- Verify file size is under 5MB
- Ensure file is a valid image format

## 📄 License

MIT License - Feel free to use and modify for your needs.

## 🤝 Contributing

When contributing, please ensure:
- Medical safety guidelines are followed
- Disclaimers are maintained
- Code follows ethical medical practices
- User safety is prioritized

---

**Remember**: This tool is designed to assist, not replace, professional medical care. Always consult licensed healthcare providers for proper diagnosis and treatment.

**Built with ❤️ for rural and underserved communities**
