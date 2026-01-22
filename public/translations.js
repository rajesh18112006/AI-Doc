// Translation dictionaries for English, Tamil, and Hindi
const translations = {
    en: {
        // Navigation
        consultation: "Consultation",
        medicineInfo: "Medicine Info",
        sideEffects: "Side Effects",
        hospitals: "Find Hospitals",
        
        // Hero Section
        heroTitle: "Your Trusted Virtual Medical Assistant",
        heroSubtitle: "Get instant, safe, and reliable health guidance powered by advanced AI. Designed especially for rural and underserved communities.",
        safeEthical: "Safe & Ethical",
        ruralFriendly: "Rural Friendly",
        available24_7: "24/7 Available",
        userFriendly: "User Friendly",
        
        // Disclaimer
        disclaimer: "This information is for guidance only and is not a substitute for a licensed medical professional. Always consult a doctor for proper diagnosis and treatment.",
        
        // Consultation Section
        healthConsultation: "Health Consultation",
        consultationSubtitle: "Tell us about your symptoms and get AI-powered health insights",
        yourAge: "Your Age",
        gender: "Gender",
        selectGender: "Select gender",
        male: "Male",
        female: "Female",
        other: "Other",
        preferNotToSay: "Prefer not to say",
        describeSymptoms: "Describe Your Symptoms",
        symptomsPlaceholder: "Example: I have been experiencing headache and mild fever for 2 days...",
        duration: "Duration",
        selectDuration: "Select duration",
        fewHours: "Few hours",
        oneDay: "1 day",
        twoThreeDays: "2-3 days",
        fourSevenDays: "4-7 days",
        moreThanWeek: "More than a week",
        severity: "Severity",
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe",
        existingConditions: "Existing Medical Conditions",
        existingConditionsPlaceholder: "e.g., Diabetes, High BP, Asthma (leave blank if none)",
        analyzeSymptoms: "Analyze Symptoms with AI",
        speakSymptoms: "Speak Symptoms",
        listening: "Listening...",
        stopListening: "Stop Listening",
        
        // Medicine Section
        medicineInformation: "Medicine Information",
        medicineSubtitle: "Get detailed information about medicines by name or image",
        searchByName: "Search by Name",
        medicineName: "Medicine Name",
        medicineNamePlaceholder: "e.g., Paracetamol, ORS, Antacid",
        getInformation: "Get Information",
        uploadImage: "Upload Medicine Image",
        medicineImage: "Medicine Image",
        supportedFormats: "Supported: JPG, PNG, GIF, WebP (Max 5MB)",
        analyzeImage: "Analyze Image",
        safeSuggestions: "Safe Medicine Suggestions",
        suggestionPlaceholder: "e.g., headache and mild fever",
        getSuggestions: "Get AI Suggestions",
        
        // Side Effects Section
        checkSideEffects: "Check Medicine Side Effects",
        sideEffectsSubtitle: "Experiencing discomfort? Let AI help you understand if it's a side effect",
        sideEffectMedicine: "Medicine Name",
        sideEffectMedicinePlaceholder: "e.g., Paracetamol",
        whatSideEffects: "What side effects are you experiencing?",
        sideEffectsPlaceholder: "Describe the discomfort or side effects you're experiencing",
        checkSideEffectsBtn: "Check Side Effects",
        
        // Hospital Finder Section
        findHospitals: "Find Nearby Hospitals",
        hospitalSubtitle: "Search for hospitals near your location",
        enterLocation: "Enter Location",
        locationPlaceholder: "City, area, or pincode",
        searchHospitals: "Search Hospitals",
        noHospitalsFound: "No hospitals found. Please try a different location.",
        hospitalName: "Name",
        hospitalAddress: "Address",
        hospitalDistance: "Distance",
        hospitalPhone: "Phone",
        directions: "Get Directions",
        loadingHospitals: "Loading hospitals...",
        
        // Voice Section
        listenToConsultation: "Listen to Consultation",
        speaking: "Speaking...",
        stopSpeaking: "Stop Speaking",
        
        // Results
        aiAnalysisResults: "AI Analysis Results",
        emergencySituation: "Emergency Situation Detected",
        important: "Important",
        preliminaryAssessment: "This is a preliminary assessment only. It is not a diagnosis. Please consult a licensed doctor for proper medical evaluation and treatment.",
        pleaseDoNotDelay: "Please do not delay.",
        seekImmediateAttention: "Seek immediate medical attention at the nearest hospital or call emergency services.",
        medicineInfoResult: "Medicine Information",
        medicineImageAnalysis: "Medicine Image Analysis",
        aiSuggestions: "AI Medicine Suggestions",
        sideEffectAnalysis: "Side Effect Analysis",
        error: "Error",
        loading: "Loading...",
        pleaseCheck: "Please check:",
        internetConnection: "Your internet connection",
        apiKeyConfig: "API key configuration in .env file",
        tryAgain: "Try again in a few moments",
        problemPersists: "If the problem persists, please consult a doctor directly.",
        checkSpelling: "Please check the spelling or consult a doctor or pharmacist.",
        tryClearerImage: "Please try again with a clearer image or consult a pharmacist.",
        
        // Skin/Wound Analysis Section
        skinWoundAnalysis: "Skin & Wound Analysis",
        skinWoundSubtitle: "Upload a photo or capture directly from camera of your skin condition, wound, rash, or swelling for AI analysis",
        uploadSkinImage: "Upload Skin/Wound Image",
        skinImage: "Skin/Wound Image",
        skinImagePlaceholder: "Upload a clear photo of the affected area or capture from camera",
        analyzeSkinImage: "Analyze Skin Condition",
        skinAnalysisResult: "Skin Condition Analysis",
        analyzingSkin: "Analyzing your skin condition with AI...",
        captureFromCamera: "Capture from Camera",
        startCamera: "Start Camera",
        capturePhoto: "Capture Photo",
        stopCamera: "Stop Camera",
        
        // Footer
        quickLinks: "Quick Links",
        importantNotice: "Important Notice",
        allRightsReserved: "All rights reserved."
    },
    
    ta: {
        // Navigation
        consultation: "மருத்துவ ஆலோசனை",
        medicineInfo: "மருந்து தகவல்",
        sideEffects: "பக்க விளைவுகள்",
        hospitals: "மருத்துவமனைகளைக் கண்டுபிடி",
        
        // Hero Section
        heroTitle: "உங்கள் நம்பகமான மெய்நிகர் மருத்துவ உதவியாளர்",
        heroSubtitle: "மேம்பட்ட AI மூலம் உடனடி, பாதுகாப்பான மற்றும் நம்பகமான சுகாதார வழிகாட்டலைப் பெறுங்கள். குறிப்பாக கிராமப்புற மற்றும் குறைந்த சேவை பெற்ற சமூகங்களுக்காக வடிவமைக்கப்பட்டது.",
        safeEthical: "பாதுகாப்பான மற்றும் நெறிமுறை",
        ruralFriendly: "கிராமப்புற நட்பு",
        available24_7: "24/7 கிடைக்கும்",
        userFriendly: "பயனர் நட்பு",
        
        // Disclaimer
        disclaimer: "இந்த தகவல் வழிகாட்டலுக்கு மட்டுமே மற்றும் உரிமம் பெற்ற மருத்துவ நிபுணருக்கு மாற்றாக இல்லை. சரியான நோயறிதல் மற்றும் சிகிச்சைக்கு எப்போதும் மருத்துவரைக் கலந்தாலோசிக்கவும்.",
        
        // Consultation Section
        healthConsultation: "சுகாதார ஆலோசனை",
        consultationSubtitle: "உங்கள் அறிகுறிகளை எங்களிடம் சொல்லுங்கள் மற்றும் AI-இயக்கப்பட்ட சுகாதார நுண்ணறிவுகளைப் பெறுங்கள்",
        yourAge: "உங்கள் வயது",
        gender: "பாலினம்",
        selectGender: "பாலினத்தைத் தேர்ந்தெடுக்கவும்",
        male: "ஆண்",
        female: "பெண்",
        other: "மற்றவை",
        preferNotToSay: "சொல்ல விரும்பவில்லை",
        describeSymptoms: "உங்கள் அறிகுறிகளை விவரிக்கவும்",
        symptomsPlaceholder: "எடுத்துக்காட்டு: எனக்கு 2 நாட்களாக தலைவலி மற்றும் சிறிய காய்ச்சல் உள்ளது...",
        duration: "கால அளவு",
        selectDuration: "கால அளவைத் தேர்ந்தெடுக்கவும்",
        fewHours: "சில மணிநேரங்கள்",
        oneDay: "1 நாள்",
        twoThreeDays: "2-3 நாட்கள்",
        fourSevenDays: "4-7 நாட்கள்",
        moreThanWeek: "ஒரு வாரத்திற்கு மேல்",
        severity: "கடுமை",
        mild: "மிதமான",
        moderate: "மிதமான",
        severe: "கடுமையான",
        existingConditions: "தற்போதைய மருத்துவ நிலைமைகள்",
        existingConditionsPlaceholder: "எ.கா., நீரிழிவு, உயர் இரத்த அழுத்தம், ஆஸ்துமா (எதுவும் இல்லை என்றால் வெற்று விடவும்)",
        analyzeSymptoms: "AI உடன் அறிகுறிகளை பகுப்பாய்வு செய்ய",
        speakSymptoms: "அறிகுறிகளை பேசுங்கள்",
        listening: "கேட்கிறது...",
        stopListening: "கேட்பதை நிறுத்து",
        
        // Medicine Section
        medicineInformation: "மருந்து தகவல்",
        medicineSubtitle: "பெயர் அல்லது படத்தின் மூலம் மருந்துகள் பற்றிய விரிவான தகவலைப் பெறுங்கள்",
        searchByName: "பெயரால் தேடு",
        medicineName: "மருந்தின் பெயர்",
        medicineNamePlaceholder: "எ.கா., பாராசிட்டமால், ORS, அன்டாசிட்",
        getInformation: "தகவலைப் பெறு",
        uploadImage: "மருந்து படத்தை பதிவேற்று",
        medicineImage: "மருந்து படம்",
        supportedFormats: "ஆதரவு: JPG, PNG, GIF, WebP (அதிகபட்சம் 5MB)",
        analyzeImage: "படத்தை பகுப்பாய்வு செய்",
        safeSuggestions: "பாதுகாப்பான மருந்து பரிந்துரைகள்",
        suggestionPlaceholder: "எ.கா., தலைவலி மற்றும் மிதமான காய்ச்சல்",
        getSuggestions: "AI பரிந்துரைகளைப் பெறு",
        
        // Side Effects Section
        checkSideEffects: "மருந்து பக்க விளைவுகளை சரிபார்க்கவும்",
        sideEffectsSubtitle: "அசௌகரியத்தை அனுபவிக்கிறீர்களா? இது பக்க விளைவு என்பதை AI உங்களுக்கு புரிந்துகொள்ள உதவும்",
        sideEffectMedicine: "மருந்தின் பெயர்",
        sideEffectMedicinePlaceholder: "எ.கா., பாராசிட்டமால்",
        whatSideEffects: "நீங்கள் என்ன பக்க விளைவுகளை அனுபவிக்கிறீர்கள்?",
        sideEffectsPlaceholder: "நீங்கள் அனுபவிக்கும் அசௌகரியம் அல்லது பக்க விளைவுகளை விவரிக்கவும்",
        checkSideEffectsBtn: "பக்க விளைவுகளை சரிபார்க்கவும்",
        
        // Hospital Finder Section
        findHospitals: "அருகிலுள்ள மருத்துவமனைகளைக் கண்டுபிடி",
        hospitalSubtitle: "உங்கள் இடத்திற்கு அருகிலுள்ள மருத்துவமனைகளைத் தேடுங்கள்",
        enterLocation: "இடத்தை உள்ளிடவும்",
        locationPlaceholder: "நகரம், பகுதி அல்லது பின்கோட்",
        searchHospitals: "மருத்துவமனைகளைத் தேடு",
        noHospitalsFound: "மருத்துவமனைகள் கிடைக்கவில்லை. தயவுசெய்து வேறு இடத்தை முயற்சிக்கவும்.",
        hospitalName: "பெயர்",
        hospitalAddress: "முகவரி",
        hospitalDistance: "தூரம்",
        hospitalPhone: "தொலைபேசி",
        directions: "வழிகாட்டலைப் பெறு",
        loadingHospitals: "மருத்துவமனைகளை ஏற்றுகிறது...",
        
        // Voice Section
        listenToConsultation: "ஆலோசனையைக் கேளுங்கள்",
        speaking: "பேசுகிறது...",
        stopSpeaking: "பேசுவதை நிறுத்து",
        
        // Results
        aiAnalysisResults: "AI பகுப்பாய்வு முடிவுகள்",
        emergencySituation: "அவசரகால சூழ்நிலை கண்டறியப்பட்டது",
        important: "முக்கியமான",
        preliminaryAssessment: "இது ஒரு ஆரம்ப மதிப்பீடு மட்டுமே. இது ஒரு நோயறிதல் அல்ல. சரியான மருத்துவ மதிப்பீடு மற்றும் சிகிச்சைக்கு உரிமம் பெற்ற மருத்துவரைக் கலந்தாலோசிக்கவும்.",
        pleaseDoNotDelay: "தயவுசெய்து தாமதிக்காதீர்கள்.",
        seekImmediateAttention: "அருகிலுள்ள மருத்துவமனையில் உடனடி மருத்துவ உதவியைத் தேடுங்கள் அல்லது அவசரகால சேவைகளை அழைக்கவும்.",
        medicineInfoResult: "மருந்து தகவல்",
        medicineImageAnalysis: "மருந்து பட பகுப்பாய்வு",
        aiSuggestions: "AI மருந்து பரிந்துரைகள்",
        sideEffectAnalysis: "பக்க விளைவு பகுப்பாய்வு",
        error: "பிழை",
        loading: "ஏற்றுகிறது...",
        pleaseCheck: "தயவுசெய்து சரிபார்க்கவும்:",
        internetConnection: "உங்கள் இணைய இணைப்பு",
        apiKeyConfig: ".env கோப்பில் API விசை கட்டமைப்பு",
        tryAgain: "சில நிமிடங்களில் மீண்டும் முயற்சிக்கவும்",
        problemPersists: "பிரச்சனை தொடர்ந்தால், தயவுசெய்து நேரடியாக மருத்துவரைக் கலந்தாலோசிக்கவும்.",
        checkSpelling: "தயவுசெய்து எழுத்துப்பிழையை சரிபார்க்கவும் அல்லது மருத்துவர் அல்லது மருந்தகத்தைக் கலந்தாலோசிக்கவும்.",
        tryClearerImage: "தயவுசெய்து தெளிவான படத்துடன் மீண்டும் முயற்சிக்கவும் அல்லது மருந்தகத்தைக் கலந்தாலோசிக்கவும்.",
        
        // Skin/Wound Analysis Section
        skinWoundAnalysis: "தோல் மற்றும் காயம் பகுப்பாய்வு",
        skinWoundSubtitle: "உங்கள் தோல் நிலை, காயம், சொறி அல்லது வீக்கத்தின் படத்தை பதிவேற்றவும் அல்லது கேமராவிலிருந்து நேரடியாக பிடிக்கவும் AI பகுப்பாய்வுக்காக",
        uploadSkinImage: "தோல்/காயம் படத்தை பதிவேற்று",
        skinImage: "தோல்/காயம் படம்",
        skinImagePlaceholder: "பாதிக்கப்பட்ட பகுதியின் தெளிவான படத்தை பதிவேற்றவும் அல்லது கேமராவிலிருந்து பிடிக்கவும்",
        analyzeSkinImage: "தோல் நிலையை பகுப்பாய்வு செய்",
        skinAnalysisResult: "தோல் நிலை பகுப்பாய்வு",
        analyzingSkin: "AI உடன் உங்கள் தோல் நிலையை பகுப்பாய்வு செய்கிறது...",
        captureFromCamera: "கேமராவிலிருந்து பிடிக்கவும்",
        startCamera: "கேமராவைத் தொடங்கு",
        capturePhoto: "படத்தை பிடி",
        stopCamera: "கேமராவை நிறுத்து",
        
        // Footer
        quickLinks: "விரைவு இணைப்புகள்",
        importantNotice: "முக்கியமான அறிவிப்பு",
        allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    },
    
    hi: {
        // Navigation
        consultation: "परामर्श",
        medicineInfo: "दवा की जानकारी",
        sideEffects: "दुष्प्रभाव",
        hospitals: "अस्पताल खोजें",
        
        // Hero Section
        heroTitle: "आपका विश्वसनीय वर्चुअल मेडिकल असिस्टेंट",
        heroSubtitle: "उन्नत AI द्वारा संचालित तत्काल, सुरक्षित और विश्वसनीय स्वास्थ्य मार्गदर्शन प्राप्त करें। विशेष रूप से ग्रामीण और अविकसित समुदायों के लिए डिज़ाइन किया गया।",
        safeEthical: "सुरक्षित और नैतिक",
        ruralFriendly: "ग्रामीण अनुकूल",
        available24_7: "24/7 उपलब्ध",
        userFriendly: "उपयोगकर्ता अनुकूल",
        
        // Disclaimer
        disclaimer: "यह जानकारी केवल मार्गदर्शन के लिए है और लाइसेंस प्राप्त चिकित्सा पेशेवर का विकल्प नहीं है। उचित निदान और उपचार के लिए हमेशा डॉक्टर से परामर्श लें।",
        
        // Consultation Section
        healthConsultation: "स्वास्थ्य परामर्श",
        consultationSubtitle: "हमें अपने लक्षण बताएं और AI-संचालित स्वास्थ्य अंतर्दृष्टि प्राप्त करें",
        yourAge: "आपकी उम्र",
        gender: "लिंग",
        selectGender: "लिंग चुनें",
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        preferNotToSay: "कहना पसंद नहीं",
        describeSymptoms: "अपने लक्षणों का वर्णन करें",
        symptomsPlaceholder: "उदाहरण: मुझे 2 दिनों से सिरदर्द और हल्का बुखार हो रहा है...",
        duration: "अवधि",
        selectDuration: "अवधि चुनें",
        fewHours: "कुछ घंटे",
        oneDay: "1 दिन",
        twoThreeDays: "2-3 दिन",
        fourSevenDays: "4-7 दिन",
        moreThanWeek: "एक सप्ताह से अधिक",
        severity: "गंभीरता",
        mild: "हल्का",
        moderate: "मध्यम",
        severe: "गंभीर",
        existingConditions: "मौजूदा चिकित्सा स्थितियां",
        existingConditionsPlaceholder: "जैसे, मधुमेह, उच्च रक्तचाप, अस्थमा (यदि कोई नहीं है तो खाली छोड़ दें)",
        analyzeSymptoms: "AI के साथ लक्षणों का विश्लेषण करें",
        speakSymptoms: "लक्षण बोलें",
        listening: "सुन रहा है...",
        stopListening: "सुनना बंद करें",
        
        // Medicine Section
        medicineInformation: "दवा की जानकारी",
        medicineSubtitle: "नाम या छवि द्वारा दवाओं के बारे में विस्तृत जानकारी प्राप्त करें",
        searchByName: "नाम से खोजें",
        medicineName: "दवा का नाम",
        medicineNamePlaceholder: "जैसे, पैरासिटामोल, ORS, एंटासिड",
        getInformation: "जानकारी प्राप्त करें",
        uploadImage: "दवा की छवि अपलोड करें",
        medicineImage: "दवा की छवि",
        supportedFormats: "समर्थित: JPG, PNG, GIF, WebP (अधिकतम 5MB)",
        analyzeImage: "छवि का विश्लेषण करें",
        safeSuggestions: "सुरक्षित दवा सुझाव",
        suggestionPlaceholder: "जैसे, सिरदर्द और हल्का बुखार",
        getSuggestions: "AI सुझाव प्राप्त करें",
        
        // Side Effects Section
        checkSideEffects: "दवा के दुष्प्रभाव जांचें",
        sideEffectsSubtitle: "बेचैनी महसूस हो रही है? AI आपको समझने में मदद करेगा कि क्या यह दुष्प्रभाव है",
        sideEffectMedicine: "दवा का नाम",
        sideEffectMedicinePlaceholder: "जैसे, पैरासिटामोल",
        whatSideEffects: "आप कौन से दुष्प्रभाव अनुभव कर रहे हैं?",
        sideEffectsPlaceholder: "आप जो बेचैनी या दुष्प्रभाव अनुभव कर रहे हैं उसका वर्णन करें",
        checkSideEffectsBtn: "दुष्प्रभाव जांचें",
        
        // Hospital Finder Section
        findHospitals: "निकटतम अस्पताल खोजें",
        hospitalSubtitle: "अपने स्थान के निकट अस्पताल खोजें",
        enterLocation: "स्थान दर्ज करें",
        locationPlaceholder: "शहर, क्षेत्र या पिनकोड",
        searchHospitals: "अस्पताल खोजें",
        noHospitalsFound: "कोई अस्पताल नहीं मिला। कृपया कोई अन्य स्थान आज़माएं।",
        hospitalName: "नाम",
        hospitalAddress: "पता",
        hospitalDistance: "दूरी",
        hospitalPhone: "फोन",
        directions: "दिशा-निर्देश प्राप्त करें",
        loadingHospitals: "अस्पताल लोड हो रहे हैं...",
        
        // Voice Section
        listenToConsultation: "परामर्श सुनें",
        speaking: "बोल रहा है...",
        stopSpeaking: "बोलना बंद करें",
        
        // Results
        aiAnalysisResults: "AI विश्लेषण परिणाम",
        emergencySituation: "आपातकालीन स्थिति का पता चला",
        important: "महत्वपूर्ण",
        preliminaryAssessment: "यह केवल एक प्रारंभिक मूल्यांकन है। यह निदान नहीं है। उचित चिकित्सा मूल्यांकन और उपचार के लिए कृपया लाइसेंस प्राप्त डॉक्टर से परामर्श लें।",
        pleaseDoNotDelay: "कृपया देरी न करें।",
        seekImmediateAttention: "निकटतम अस्पताल में तत्काल चिकित्सा सहायता लें या आपातकालीन सेवाओं को कॉल करें।",
        medicineInfoResult: "दवा की जानकारी",
        medicineImageAnalysis: "दवा छवि विश्लेषण",
        aiSuggestions: "AI दवा सुझाव",
        sideEffectAnalysis: "दुष्प्रभाव विश्लेषण",
        error: "त्रुटि",
        loading: "लोड हो रहा है...",
        pleaseCheck: "कृपया जांचें:",
        internetConnection: "आपका इंटरनेट कनेक्शन",
        apiKeyConfig: ".env फ़ाइल में API कुंजी कॉन्फ़िगरेशन",
        tryAgain: "कुछ क्षणों में पुनः प्रयास करें",
        problemPersists: "यदि समस्या बनी रहती है, तो कृपया सीधे डॉक्टर से परामर्श लें।",
        checkSpelling: "कृपया वर्तनी जांचें या डॉक्टर या फार्मासिस्ट से परामर्श लें।",
        tryClearerImage: "कृपया स्पष्ट छवि के साथ पुनः प्रयास करें या फार्मासिस्ट से परामर्श लें।",
        
        // Skin/Wound Analysis Section
        skinWoundAnalysis: "त्वचा और घाव विश्लेषण",
        skinWoundSubtitle: "AI विश्लेषण के लिए अपनी त्वचा की स्थिति, घाव, चकत्ते या सूजन की तस्वीर अपलोड करें या कैमरे से सीधे कैप्चर करें",
        uploadSkinImage: "त्वचा/घाव छवि अपलोड करें",
        skinImage: "त्वचा/घाव छवि",
        skinImagePlaceholder: "प्रभावित क्षेत्र की स्पष्ट तस्वीर अपलोड करें या कैमरे से कैप्चर करें",
        analyzeSkinImage: "त्वचा की स्थिति का विश्लेषण करें",
        skinAnalysisResult: "त्वचा की स्थिति विश्लेषण",
        analyzingSkin: "AI के साथ आपकी त्वचा की स्थिति का विश्लेषण कर रहा है...",
        captureFromCamera: "कैमरे से कैप्चर करें",
        startCamera: "कैमरा शुरू करें",
        capturePhoto: "फोटो कैप्चर करें",
        stopCamera: "कैमरा बंद करें",
        
        // Footer
        quickLinks: "त्वरित लिंक",
        importantNotice: "महत्वपूर्ण सूचना",
        allRightsReserved: "सभी अधिकार सुरक्षित।"
    },
    
    te: {
        // Navigation
        consultation: "సంప్రదింపు",
        medicineInfo: "మందు సమాచారం",
        sideEffects: "పార్శ్వ ప్రభావాలు",
        hospitals: "ఆసుపత్రులను కనుగొనండి",
        
        // Hero Section
        heroTitle: "మీ విశ్వసనీయ వర్చువల్ వైద్య సహాయకుడు",
        heroSubtitle: "అధునాతన AI ద్వారా తక్షణ, సురక్షిత మరియు నమ్మకమైన ఆరోగ్య మార్గదర్శకత్వాన్ని పొందండి. ప్రత్యేకంగా గ్రామీణ మరియు తక్కువ సేవలు పొందిన సంఘాల కోసం రూపొందించబడింది.",
        safeEthical: "సురక్షిత మరియు నైతిక",
        ruralFriendly: "గ్రామీణ స్నేహపూర్వక",
        available24_7: "24/7 అందుబాటులో",
        userFriendly: "వినియోగదారు స్నేహపూర్వక",
        
        // Disclaimer
        disclaimer: "ఈ సమాచారం మార్గదర్శకత్వం కోసం మాత్రమే మరియు లైసెన్స్ పొందిన వైద్య నిపుణుడికి ప్రత్యామ్నాయం కాదు. సరైన రోగ నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ వైద్యుడిని సంప్రదించండి.",
        
        // Consultation Section
        healthConsultation: "ఆరోగ్య సంప్రదింపు",
        consultationSubtitle: "మీ లక్షణాల గురించి మాకు చెప్పండి మరియు AI-శక్తితో కూడిన ఆరోగ్య అంతర్దృష్టులను పొందండి",
        yourAge: "మీ వయస్సు",
        gender: "లింగం",
        selectGender: "లింగాన్ని ఎంచుకోండి",
        male: "పురుషుడు",
        female: "స్త్రీ",
        other: "ఇతర",
        preferNotToSay: "చెప్పడానికి ఇష్టపడను",
        describeSymptoms: "మీ లక్షణాలను వివరించండి",
        symptomsPlaceholder: "ఉదాహరణ: నాకు 2 రోజుల నుండి తలనొప్పి మరియు తేలికపాటి జ్వరం ఉంది...",
        duration: "కాల వ్యవధి",
        selectDuration: "కాల వ్యవధిని ఎంచుకోండి",
        fewHours: "కొన్ని గంటలు",
        oneDay: "1 రోజు",
        twoThreeDays: "2-3 రోజులు",
        fourSevenDays: "4-7 రోజులు",
        moreThanWeek: "ఒక వారం కంటే ఎక్కువ",
        severity: "తీవ్రత",
        mild: "తేలిక",
        moderate: "మధ్యస్థ",
        severe: "తీవ్రమైన",
        existingConditions: "ప్రస్తుత వైద్య పరిస్థితులు",
        existingConditionsPlaceholder: "ఉదా., మధుమేహం, అధిక రక్తపోటు, ఆస్తమా (ఏదీ లేకపోతే ఖాళీగా వదిలివేయండి)",
        analyzeSymptoms: "AIతో లక్షణాలను విశ్లేషించండి",
        speakSymptoms: "లక్షణాలను మాట్లాడండి",
        listening: "వింటోంది...",
        stopListening: "వినడం ఆపండి",
        
        // Medicine Section
        medicineInformation: "మందు సమాచారం",
        medicineSubtitle: "పేరు లేదా చిత్రం ద్వారా మందుల గురించి వివరణాత్మక సమాచారాన్ని పొందండి",
        searchByName: "పేరు ద్వారా శోధించండి",
        medicineName: "మందు పేరు",
        medicineNamePlaceholder: "ఉదా., పారాసిటమాల్, ORS, యాంటాసిడ్",
        getInformation: "సమాచారాన్ని పొందండి",
        uploadImage: "మందు చిత్రాన్ని అప్‌లోడ్ చేయండి",
        medicineImage: "మందు చిత్రం",
        supportedFormats: "సమర్థించబడినవి: JPG, PNG, GIF, WebP (గరిష్టం 5MB)",
        analyzeImage: "చిత్రాన్ని విశ్లేషించండి",
        safeSuggestions: "సురక్షిత మందు సూచనలు",
        suggestionPlaceholder: "ఉదా., తలనొప్పి మరియు తేలికపాటి జ్వరం",
        getSuggestions: "AI సూచనలను పొందండి",
        
        // Side Effects Section
        checkSideEffects: "మందు పార్శ్వ ప్రభావాలను తనిఖీ చేయండి",
        sideEffectsSubtitle: "అసౌకర్యం అనుభవిస్తున్నారా? ఇది పార్శ్వ ప్రభావం అని AI మీకు అర్థం చేసుకోవడంలో సహాయపడుతుంది",
        sideEffectMedicine: "మందు పేరు",
        sideEffectMedicinePlaceholder: "ఉదా., పారాసిటమాల్",
        whatSideEffects: "మీరు ఏ పార్శ్వ ప్రభావాలను అనుభవిస్తున్నారు?",
        sideEffectsPlaceholder: "మీరు అనుభవిస్తున్న అసౌకర్యం లేదా పార్శ్వ ప్రభావాలను వివరించండి",
        checkSideEffectsBtn: "పార్శ్వ ప్రభావాలను తనిఖీ చేయండి",
        
        // Hospital Finder Section
        findHospitals: "సమీప ఆసుపత్రులను కనుగొనండి",
        hospitalSubtitle: "మీ స్థానానికి సమీపంలోని ఆసుపత్రులను శోధించండి",
        enterLocation: "స్థానాన్ని నమోదు చేయండి",
        locationPlaceholder: "నగరం, ప్రాంతం లేదా పిన్‌కోడ్",
        searchHospitals: "ఆసుపత్రులను శోధించండి",
        noHospitalsFound: "ఆసుపత్రులు కనుగొనబడలేదు. దయచేసి వేరే స్థానాన్ని ప్రయత్నించండి.",
        hospitalName: "పేరు",
        hospitalAddress: "చిరునామా",
        hospitalDistance: "దూరం",
        hospitalPhone: "ఫోన్",
        directions: "దిశలను పొందండి",
        loadingHospitals: "ఆసుపత్రులను లోడ్ చేస్తోంది...",
        
        // Voice Section
        listenToConsultation: "సంప్రదింపును వినండి",
        speaking: "మాట్లాడుతోంది...",
        stopSpeaking: "మాట్లాడడం ఆపండి",
        
        // Results
        aiAnalysisResults: "AI విశ్లేషణ ఫలితాలు",
        emergencySituation: "అత్యవసర పరిస్థితి గుర్తించబడింది",
        important: "ముఖ్యమైన",
        preliminaryAssessment: "ఇది ప్రాథమిక అంచనా మాత్రమే. ఇది రోగ నిర్ధారణ కాదు. సరైన వైద్య మూల్యాంకనం మరియు చికిత్స కోసం దయచేసి లైసెన్స్ పొందిన వైద్యుడిని సంప్రదించండి.",
        pleaseDoNotDelay: "దయచేసి ఆలస్యం చేయకండి.",
        seekImmediateAttention: "సమీప ఆసుపత్రిలో తక్షణ వైద్య సహాయం పొందండి లేదా అత్యవసర సేవలను కాల్ చేయండి.",
        medicineInfoResult: "మందు సమాచారం",
        medicineImageAnalysis: "మందు చిత్ర విశ్లేషణ",
        aiSuggestions: "AI మందు సూచనలు",
        sideEffectAnalysis: "పార్శ్వ ప్రభావ విశ్లేషణ",
        error: "దోషం",
        loading: "లోడ్ అవుతోంది...",
        pleaseCheck: "దయచేసి తనిఖీ చేయండి:",
        internetConnection: "మీ ఇంటర్నెట్ కనెక్షన్",
        apiKeyConfig: ".env ఫైల్‌లో API కీ కాన్ఫిగరేషన్",
        tryAgain: "కొన్ని క్షణాలలో మళ్లీ ప్రయత్నించండి",
        problemPersists: "సమస్య కొనసాగితే, దయచేసి నేరుగా వైద్యుడిని సంప్రదించండి.",
        checkSpelling: "దయచేసి వర్ణక్రమాన్ని తనిఖీ చేయండి లేదా వైద్యుడు లేదా ఫార్మాసిస్ట్‌ను సంప్రదించండి.",
        tryClearerImage: "దయచేసి స్పష్టమైన చిత్రంతో మళ్లీ ప్రయత్నించండి లేదా ఫార్మాసిస్ట్‌ను సంప్రదించండి.",
        
        // Skin/Wound Analysis Section
        skinWoundAnalysis: "చర్మం మరియు గాయం విశ్లేషణ",
        skinWoundSubtitle: "AI విశ్లేషణ కోసం మీ చర్మం పరిస్థితి, గాయం, దద్దుర్లు లేదా వాపు యొక్క ఫోటోను అప్‌లోడ్ చేయండి లేదా కెమెరా నుండి నేరుగా క్యాప్చర్ చేయండి",
        uploadSkinImage: "చర్మం/గాయం చిత్రాన్ని అప్‌లోడ్ చేయండి",
        skinImage: "చర్మం/గాయం చిత్రం",
        skinImagePlaceholder: "ప్రభావితమైన ప్రాంతం యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి లేదా కెమెరా నుండి క్యాప్చర్ చేయండి",
        analyzeSkinImage: "చర్మం పరిస్థితిని విశ్లేషించండి",
        skinAnalysisResult: "చర్మం పరిస్థితి విశ్లేషణ",
        analyzingSkin: "AI తో మీ చర్మం పరిస్థితిని విశ్లేషిస్తోంది...",
        captureFromCamera: "కెమెరా నుండి క్యాప్చర్ చేయండి",
        startCamera: "కెమెరాను ప్రారంభించండి",
        capturePhoto: "ఫోటోను క్యాప్చర్ చేయండి",
        stopCamera: "కెమెరాను ఆపండి",
        
        // Footer
        quickLinks: "త్వరిత లింకులు",
        importantNotice: "ముఖ్యమైన నోటీసు",
        allRightsReserved: "అన్ని హక్కులు రక్షించబడ్డాయి."
    },
    
    kn: {
        // Navigation
        consultation: "ಸಲಹೆ",
        medicineInfo: "ಮದ್ದಿನ ಮಾಹಿತಿ",
        sideEffects: "ಪಾರ್ಶ್ವ ಪರಿಣಾಮಗಳು",
        hospitals: "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
        
        // Hero Section
        heroTitle: "ನಿಮ್ಮ ವಿಶ್ವಸನೀಯ ವರ್ಚುವಲ್ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ",
        heroSubtitle: "ಸುಧಾರಿತ AI ನಿಂದ ಚಾಲಿತ ತ್ವರಿತ, ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಿರಿ. ವಿಶೇಷವಾಗಿ ಗ್ರಾಮೀಣ ಮತ್ತು ಕಡಿಮೆ ಸೇವೆ ಪಡೆದ ಸಮುದಾಯಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
        safeEthical: "ಸುರಕ್ಷಿತ ಮತ್ತು ನೈತಿಕ",
        ruralFriendly: "ಗ್ರಾಮೀಣ ಸ್ನೇಹಪರ",
        available24_7: "24/7 ಲಭ್ಯ",
        userFriendly: "ಬಳಕೆದಾರ ಸ್ನೇಹಪರ",
        
        // Disclaimer
        disclaimer: "ಈ ಮಾಹಿತಿಯು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರವಾಗಿದೆ ಮತ್ತು ಪರವಾನಗಿ ಪಡೆದ ವೈದ್ಯಕೀಯ ವೃತ್ತಿಪರರಿಗೆ ಬದಲಿಯಲ್ಲ. ಸರಿಯಾದ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಯಾವಾಗಲೂ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        
        // Consultation Section
        healthConsultation: "ಆರೋಗ್ಯ ಸಲಹೆ",
        consultationSubtitle: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ ಮತ್ತು AI-ಚಾಲಿತ ಆರೋಗ್ಯ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ",
        yourAge: "ನಿಮ್ಮ ವಯಸ್ಸು",
        gender: "ಲಿಂಗ",
        selectGender: "ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        male: "ಪುರುಷ",
        female: "ಸ್ತ್ರೀ",
        other: "ಇತರ",
        preferNotToSay: "ಹೇಳಲು ಇಷ್ಟವಿಲ್ಲ",
        describeSymptoms: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
        symptomsPlaceholder: "ಉದಾಹರಣೆ: ನನಗೆ 2 ದಿನಗಳಿಂದ ತಲೆನೋವು ಮತ್ತು ಸೌಮ್ಯ ಜ್ವರವಿದೆ...",
        duration: "ಕಾಲಾವಧಿ",
        selectDuration: "ಕಾಲಾವಧಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        fewHours: "ಕೆಲವು ಗಂಟೆಗಳು",
        oneDay: "1 ದಿನ",
        twoThreeDays: "2-3 ದಿನಗಳು",
        fourSevenDays: "4-7 ದಿನಗಳು",
        moreThanWeek: "ಒಂದು ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು",
        severity: "ತೀವ್ರತೆ",
        mild: "ಸೌಮ್ಯ",
        moderate: "ಮಧ್ಯಮ",
        severe: "ತೀವ್ರ",
        existingConditions: "ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ವೈದ್ಯಕೀಯ ಪರಿಸ್ಥಿತಿಗಳು",
        existingConditionsPlaceholder: "ಉದಾ., ಮಧುಮೇಹ, ಹೆಚ್ಚಿನ ರಕ್ತದೊತ್ತಡ, ಆಸ್ತಮಾ (ಯಾವುದೂ ಇಲ್ಲದಿದ್ದರೆ ಖಾಲಿ ಬಿಡಿ)",
        analyzeSymptoms: "AI ನೊಂದಿಗೆ ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
        speakSymptoms: "ಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ",
        listening: "ಕೇಳುತ್ತಿದೆ...",
        stopListening: "ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
        
        // Medicine Section
        medicineInformation: "ಮದ್ದಿನ ಮಾಹಿತಿ",
        medicineSubtitle: "ಹೆಸರು ಅಥವಾ ಚಿತ್ರದ ಮೂಲಕ ಮದ್ದುಗಳ ಬಗ್ಗೆ ವಿವರವಾದ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ",
        searchByName: "ಹೆಸರಿನಿಂದ ಹುಡುಕಿ",
        medicineName: "ಮದ್ದಿನ ಹೆಸರು",
        medicineNamePlaceholder: "ಉದಾ., ಪ್ಯಾರಾಸಿಟಮಾಲ್, ORS, ಆಂಟಾಸಿಡ್",
        getInformation: "ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ",
        uploadImage: "ಮದ್ದಿನ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        medicineImage: "ಮದ್ದಿನ ಚಿತ್ರ",
        supportedFormats: "ಬೆಂಬಲಿತ: JPG, PNG, GIF, WebP (ಗರಿಷ್ಠ 5MB)",
        analyzeImage: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
        safeSuggestions: "ಸುರಕ್ಷಿತ ಮದ್ದಿನ ಸಲಹೆಗಳು",
        suggestionPlaceholder: "ಉದಾ., ತಲೆನೋವು ಮತ್ತು ಸೌಮ್ಯ ಜ್ವರ",
        getSuggestions: "AI ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ",
        
        // Side Effects Section
        checkSideEffects: "ಮದ್ದಿನ ಪಾರ್ಶ್ವ ಪರಿಣಾಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
        sideEffectsSubtitle: "ಅಸೌಕರ್ಯವನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಾ? ಇದು ಪಾರ್ಶ್ವ ಪರಿಣಾಮವೇ ಎಂದು AI ನಿಮಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
        sideEffectMedicine: "ಮದ್ದಿನ ಹೆಸರು",
        sideEffectMedicinePlaceholder: "ಉದಾ., ಪ್ಯಾರಾಸಿಟಮಾಲ್",
        whatSideEffects: "ನೀವು ಯಾವ ಪಾರ್ಶ್ವ ಪರಿಣಾಮಗಳನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ?",
        sideEffectsPlaceholder: "ನೀವು ಅನುಭವಿಸುತ್ತಿರುವ ಅಸೌಕರ್ಯ ಅಥವಾ ಪಾರ್ಶ್ವ ಪರಿಣಾಮಗಳನ್ನು ವಿವರಿಸಿ",
        checkSideEffectsBtn: "ಪಾರ್ಶ್ವ ಪರಿಣಾಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
        
        // Hospital Finder Section
        findHospitals: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
        hospitalSubtitle: "ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
        enterLocation: "ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ",
        locationPlaceholder: "ನಗರ, ಪ್ರದೇಶ ಅಥವಾ ಪಿನ್‌ಕೋಡ್",
        searchHospitals: "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
        noHospitalsFound: "ಆಸ್ಪತ್ರೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಸ್ಥಳವನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
        hospitalName: "ಹೆಸರು",
        hospitalAddress: "ವಿಳಾಸ",
        hospitalDistance: "ದೂರ",
        hospitalPhone: "ಫೋನ್",
        directions: "ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ",
        loadingHospitals: "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...",
        
        // Voice Section
        listenToConsultation: "ಸಲಹೆಯನ್ನು ಕೇಳಿ",
        speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
        stopSpeaking: "ಮಾತನಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
        
        // Results
        aiAnalysisResults: "AI ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು",
        emergencySituation: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಪತ್ತೆಯಾಗಿದೆ",
        important: "ಮುಖ್ಯ",
        preliminaryAssessment: "ಇದು ಪ್ರಾಥಮಿಕ ಮೌಲ್ಯಮಾಪನ ಮಾತ್ರ. ಇದು ರೋಗನಿರ್ಣಯವಲ್ಲ. ಸರಿಯಾದ ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ದಯವಿಟ್ಟು ಪರವಾನಗಿ ಪಡೆದ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        pleaseDoNotDelay: "ದಯವಿಟ್ಟು ವಿಳಂಬ ಮಾಡಬೇಡಿ.",
        seekImmediateAttention: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ ಅಥವಾ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಕರೆ ಮಾಡಿ.",
        medicineInfoResult: "ಮದ್ದಿನ ಮಾಹಿತಿ",
        medicineImageAnalysis: "ಮದ್ದಿನ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ",
        aiSuggestions: "AI ಮದ್ದಿನ ಸಲಹೆಗಳು",
        sideEffectAnalysis: "ಪಾರ್ಶ್ವ ಪರಿಣಾಮ ವಿಶ್ಲೇಷಣೆ",
        error: "ದೋಷ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        pleaseCheck: "ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ:",
        internetConnection: "ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ",
        apiKeyConfig: ".env ಫೈಲ್‌ನಲ್ಲಿ API ಕೀ ಕಾನ್ಫಿಗರೇಷನ್",
        tryAgain: "ಕೆಲವು ಕ್ಷಣಗಳಲ್ಲಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
        problemPersists: "ಸಮಸ್ಯೆ ಮುಂದುವರಿದರೆ, ದಯವಿಟ್ಟು ನೇರವಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        checkSpelling: "ದಯವಿಟ್ಟು ವರ್ಣಕ್ರಮವನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ವೈದ್ಯ ಅಥವಾ ಫಾರ್ಮಾಸಿಸ್ಟ್‌ರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        tryClearerImage: "ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಚಿತ್ರದೊಂದಿಗೆ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಫಾರ್ಮಾಸಿಸ್ಟ್‌ರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        
        // Skin/Wound Analysis Section
        skinWoundAnalysis: "ಚರ್ಮ ಮತ್ತು ಗಾಯ ವಿಶ್ಲೇಷಣೆ",
        skinWoundSubtitle: "AI ವಿಶ್ಲೇಷಣೆಗಾಗಿ ನಿಮ್ಮ ಚರ್ಮದ ಸ್ಥಿತಿ, ಗಾಯ, ದದ್ದು ಅಥವಾ ಊತದ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ನೇರವಾಗಿ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
        uploadSkinImage: "ಚರ್ಮ/ಗಾಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        skinImage: "ಚರ್ಮ/ಗಾಯ ಚಿತ್ರ",
        skinImagePlaceholder: "ಪ್ರಭಾವಿತ ಪ್ರದೇಶದ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
        analyzeSkinImage: "ಚರ್ಮದ ಸ್ಥಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
        skinAnalysisResult: "ಚರ್ಮದ ಸ್ಥಿತಿ ವಿಶ್ಲೇಷಣೆ",
        analyzingSkin: "AI ನೊಂದಿಗೆ ನಿಮ್ಮ ಚರ್ಮದ ಸ್ಥಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
        captureFromCamera: "ಕ್ಯಾಮೆರಾದಿಂದ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
        startCamera: "ಕ್ಯಾಮೆರಾವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
        capturePhoto: "ಫೋಟೋವನ್ನು ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ",
        stopCamera: "ಕ್ಯಾಮೆರಾವನ್ನು ನಿಲ್ಲಿಸಿ",
        
        // Footer
        quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
        importantNotice: "ಮುಖ್ಯ ಸೂಚನೆ",
        allRightsReserved: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಪಾಡಲಾಗಿದೆ."
    }
};

// Current language (default: English)
let currentLanguage = 'en';

// Function to get translation
function t(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Function to set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        updateUI();
    }
}

// Function to get language from localStorage
function getStoredLanguage() {
    const stored = localStorage.getItem('preferredLanguage');
    return stored && translations[stored] ? stored : 'en';
}

// Initialize language on load
currentLanguage = getStoredLanguage();

