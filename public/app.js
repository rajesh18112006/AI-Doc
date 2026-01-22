// API Base URL
const API_BASE = window.location.origin + '/api';

// Voice recognition and synthesis
let recognition = null;
let synthesis = window.speechSynthesis;
let currentUtterance = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    setupNavigation();
    setupConsultationForm();
    setupMedicineForm();
    setupMedicineImageForm();
    setupSuggestionForm();
    setupSideEffectsForm();
    setupSkinAnalysisForm();
    setupHospitalFinder();
    setupVoiceFeatures();
    updateUI(); // Initial UI update with translations
    
    // Auto-search if location parameter is in URL
    handleLocationParameter();
});

// Handle location parameter from URL (e.g., ?location=chennai)
function handleLocationParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get('location');
    
    if (locationParam) {
        console.log(`📍 Location parameter found in URL: "${locationParam}"`);
        
        // Set the input value
        const locationInput = document.getElementById('locationInput');
        if (locationInput) {
            locationInput.value = locationParam;
        }
        
        // Wait a bit for map to initialize, then search
        setTimeout(() => {
            if (typeof searchHospitals === 'function') {
                console.log(`🔍 Auto-searching for hospitals in: ${locationParam}`);
                searchHospitals(locationParam).catch(error => {
                    console.error('❌ Auto-search error:', error);
                });
            } else {
                console.warn('⚠️ searchHospitals function not available yet, retrying...');
                // Retry after a longer delay
                setTimeout(() => {
                    if (typeof searchHospitals === 'function') {
                        searchHospitals(locationParam).catch(error => {
                            console.error('❌ Auto-search error:', error);
                        });
                    }
                }, 1000);
            }
        }, 500);
    }
}

// Initialize language system
function initializeLanguage() {
    currentLanguage = getStoredLanguage();
    updateLanguageSelector();
}

// Update language selector UI
function updateLanguageSelector() {
    const langNames = { 
        en: 'English', 
        ta: 'தமிழ்', 
        hi: 'हिंदी',
        te: 'తెలుగు',
        kn: 'ಕನ್ನಡ'
    };
    document.getElementById('currentLang').textContent = langNames[currentLanguage] || 'English';
    
    // Update checkmarks
    document.getElementById('check-en').style.display = currentLanguage === 'en' ? 'inline' : 'none';
    document.getElementById('check-ta').style.display = currentLanguage === 'ta' ? 'inline' : 'none';
    document.getElementById('check-hi').style.display = currentLanguage === 'hi' ? 'inline' : 'none';
    const checkTe = document.getElementById('check-te');
    const checkKn = document.getElementById('check-kn');
    if (checkTe) checkTe.style.display = currentLanguage === 'te' ? 'inline' : 'none';
    if (checkKn) checkKn.style.display = currentLanguage === 'kn' ? 'inline' : 'none';
}

// Update all UI text with translations
function updateUI() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        // Skip if it's a select option (handled separately)
        if (element.tagName !== 'OPTION') {
            element.textContent = t(key);
        }
    });
    
    // Update select options
    document.querySelectorAll('select option[data-translate]').forEach(option => {
        const key = option.getAttribute('data-translate');
        option.textContent = t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = t(key);
    });
    
    // Update language selector
    updateLanguageSelector();
}

// Override setLanguage from translations.js to update UI
const originalSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    updateUI();
    updateLanguageSelector();
};

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll to section
            const section = document.getElementById(targetSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Format AI Response with proper indentation and neat formatting
function formatAIResponse(text) {
    let formatted = text;
    
    // Format section headers with proper styling
    formatted = formatted.replace(/^AI Analysis Results$/gm, '<h4 class="mb-4 fw-bold text-primary">AI Analysis Results</h4>');
    formatted = formatted.replace(/^Medicine Information$/gm, '<h4 class="mb-4 fw-bold text-primary">Medicine Information</h4>');
    formatted = formatted.replace(/^Side Effects Analysis$/gm, '<h4 class="mb-4 fw-bold text-primary">Side Effects Analysis</h4>');
    
    // Format main section headers
    formatted = formatted.replace(/^Patient Summary:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-person-circle me-2"></i>Patient Summary:</h5>');
    formatted = formatted.replace(/^Understanding the Condition:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-brain me-2"></i>Understanding the Condition:</h5>');
    formatted = formatted.replace(/^Likely Cause:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-lightbulb me-2"></i>Likely Cause:</h5>');
    formatted = formatted.replace(/^Recommended Care & Remedies:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-success"><i class="bi bi-heart-pulse me-2"></i>Recommended Care & Remedies:</h5>');
    formatted = formatted.replace(/^Medicine Guidance:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-capsule me-2"></i>Medicine Guidance:</h5>');
    formatted = formatted.replace(/^When to Be Careful:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-warning"><i class="bi bi-exclamation-triangle me-2"></i>When to Be Careful:</h5>');
    formatted = formatted.replace(/^Closing Note:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-chat-dots me-2"></i>Closing Note:</h5>');
    formatted = formatted.replace(/^Important Disclaimer:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-info"><i class="bi bi-info-circle me-2"></i>Important Disclaimer:</h5>');
    
    // Format medicine info sections
    formatted = formatted.replace(/^Medicine Name:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-capsule me-2"></i>Medicine Name:</h5>');
    formatted = formatted.replace(/^Medicine Type \(tablet\/syrup\/capsule\/etc\):/gm, '<h5 class="mt-3 mb-2 fw-semibold">Medicine Type:</h5>');
    formatted = formatted.replace(/^What This Medicine Is Used For:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-question-circle me-2"></i>What This Medicine Is Used For:</h5>');
    formatted = formatted.replace(/^How This Medicine Helps:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-gear me-2"></i>How This Medicine Helps:</h5>');
    formatted = formatted.replace(/^When This Medicine Is Commonly Suggested:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-clock me-2"></i>When This Medicine Is Commonly Suggested:</h5>');
    formatted = formatted.replace(/^General Usage Guidance:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-list-check me-2"></i>General Usage Guidance:</h5>');
    formatted = formatted.replace(/^Precautions:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-warning"><i class="bi bi-shield-exclamation me-2"></i>Precautions:</h5>');
    formatted = formatted.replace(/^Additional Advice:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-lightbulb me-2"></i>Additional Advice:</h5>');
    
    // Format side effects sections
    formatted = formatted.replace(/^Reported Symptoms:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-clipboard-pulse me-2"></i>Reported Symptoms:</h5>');
    formatted = formatted.replace(/^Are These Common Side Effects\?/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-question-circle me-2"></i>Are These Common Side Effects?</h5>');
    formatted = formatted.replace(/^Common Side Effects:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-list-ul me-2"></i>Common Side Effects:</h5>');
    formatted = formatted.replace(/^Less Common but Important Side Effects:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-warning"><i class="bi bi-exclamation-triangle me-2"></i>Less Common but Important Side Effects:</h5>');
    formatted = formatted.replace(/^What You Can Do Now:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-success"><i class="bi bi-check-circle me-2"></i>What You Can Do Now:</h5>');
    
    // Format skin analysis sections
    formatted = formatted.replace(/^Skin Condition Analysis$/gm, '<h4 class="mb-4 fw-bold text-primary">Skin Condition Analysis</h4>');
    formatted = formatted.replace(/^Problem:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-danger"><i class="bi bi-exclamation-circle me-2"></i>Problem:</h5>');
    formatted = formatted.replace(/^Solution:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-success"><i class="bi bi-check-circle me-2"></i>Solution:</h5>');
    formatted = formatted.replace(/^Remedies:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-info"><i class="bi bi-heart-pulse me-2"></i>Remedies:</h5>');
    formatted = formatted.replace(/^Medicine:/gm, '<h5 class="mt-4 mb-2 fw-semibold"><i class="bi bi-capsule me-2"></i>Medicine:</h5>');
    formatted = formatted.replace(/^When to See Doctor:/gm, '<h5 class="mt-4 mb-2 fw-semibold text-warning"><i class="bi bi-hospital me-2"></i>When to See Doctor:</h5>');
    
    // Convert line breaks to HTML with proper spacing
    formatted = formatted.replace(/\n\n+/g, '</p><p class="mb-2">');
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Format bullet points with proper indentation
    formatted = formatted.replace(/^- (.+?)(<br>|$)/gm, '<li class="mb-1">$1</li>');
    formatted = formatted.replace(/(<li class="mb-1">.*?<\/li>(?:<br>)?)+/g, function(match) {
        return '<ul class="mb-3 ms-4" style="list-style-type: disc;">' + match.replace(/<br>/g, '') + '</ul>';
    });
    
    // Wrap paragraphs
    formatted = '<div class="ai-response-content" style="line-height: 1.6;">' + formatted + '</div>';
    formatted = formatted.replace(/(<h[45][^>]*>.*?<\/h[45]>)/g, '$1');
    
    // Clean up any double line breaks
    formatted = formatted.replace(/(<br>\s*){3,}/g, '<br><br>');
    
    return formatted;
}

// Show Loading State
function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.innerHTML = originalText;
    }
}

// Consultation Form
function setupConsultationForm() {
    const form = document.getElementById('consultationForm');
    const resultContainer = document.getElementById('consultationResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        const formData = {
            symptoms: document.getElementById('symptoms').value.trim(),
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            duration: document.getElementById('duration').value,
            severity: document.querySelector('input[name="severity"]:checked').value,
            existingConditions: document.getElementById('existingConditions').value
                .split(',')
                .map(c => c.trim())
                .filter(c => c.length > 0),
            userLang: currentLanguage // Send current language to backend
        };

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Analyzing your symptoms with AI...</p>
            </div>
        `;

        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        try {
            const response = await fetch(`${API_BASE}/analyze-symptoms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze symptoms');
            }

            displayConsultationResult(data);
        } catch (error) {
            console.error('Error details:', error);
            let errorMessage = error.message || 'Unknown error occurred';
            let errorDetails = '';
            
            // Try to get more details from response
            if (error.response) {
                try {
                    const errorData = await error.response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                    errorDetails = errorData.details || '';
                } catch (e) {
                    // Ignore JSON parse errors
                }
            }
            
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h3><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h3>
                    <p><strong>${errorMessage}</strong></p>
                    ${errorDetails ? `<p class="small text-muted">${errorDetails}</p>` : ''}
                    <p>${t('pleaseCheck')}</p>
                    <ul>
                        <li>${t('internetConnection')}</li>
                        <li>${t('apiKeyConfig')}</li>
                        <li>${t('tryAgain')}</li>
                    </ul>
                    <p class="mt-3">${t('problemPersists')}</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

function displayConsultationResult(data) {
    const resultContainer = document.getElementById('consultationResult');
    const voiceOutputBtn = document.getElementById('voiceOutputBtn');
    
    if (data.emergency) {
        resultContainer.innerHTML = `
            <div class="result-container result-emergency">
                <h3><i class="bi bi-exclamation-triangle-fill me-2"></i>${t('emergencySituation')}</h3>
                <div class="mt-3">
                    ${formatAIResponse(data.response)}
                </div>
                <div class="alert alert-danger mt-3 mb-0">
                    <strong><i class="bi bi-phone me-2"></i>${t('pleaseDoNotDelay')}</strong> ${t('seekImmediateAttention')}
                </div>
            </div>
        `;
    } else {
        resultContainer.innerHTML = `
            <div class="result-container result-info">
                <h3><i class="bi bi-clipboard-check me-2"></i>${t('aiAnalysisResults')}</h3>
                <div class="alert alert-info mb-3">
                    <strong><i class="bi bi-info-circle me-2"></i>${t('important')}:</strong> ${t('preliminaryAssessment')}
                </div>
                <div class="mt-3">
                    ${formatAIResponse(data.response)}
                </div>
            </div>
        `;
    }
    
    // Show voice output button if result is available
    if (voiceOutputBtn && data.response) {
        voiceOutputBtn.style.display = 'block';
        voiceOutputBtn.setAttribute('data-text', data.response);
    }
}

// Medicine Form (Text)
function setupMedicineForm() {
    const form = document.getElementById('medicineForm');
    const resultContainer = document.getElementById('medicineResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        const medicineName = document.getElementById('medicineName').value.trim();

        if (!medicineName) {
            alert(t('medicineName') + ' ' + t('error'));
            hideLoading(submitButton);
            return;
        }

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Fetching medicine information from AI...</p>
            </div>
        `;

        try {
            const response = await fetch(`${API_BASE}/medicine-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    medicineName,
                    userLang: currentLanguage
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch medicine information');
            }

            resultContainer.innerHTML = `
                <div class="result-container result-info">
                    <h4><i class="bi bi-capsule me-2"></i>${t('medicineInfoResult')}</h4>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h4>
                    <p>${error.message}</p>
                    <p>${t('checkSpelling')}</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

// Medicine Form (Image)
function setupMedicineImageForm() {
    const form = document.getElementById('medicineImageForm');
    const resultContainer = document.getElementById('medicineImageResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        const fileInput = document.getElementById('medicineImage');
        
        if (!fileInput.files || !fileInput.files[0]) {
            alert(t('medicineImage') + ' ' + t('error'));
            hideLoading(submitButton);
            return;
        }

        const formData = new FormData();
        formData.append('medicineImage', fileInput.files[0]);

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Analyzing medicine image with AI vision...</p>
            </div>
        `;

        try {
            // Add language to form data
            formData.append('userLang', currentLanguage);
            
            const response = await fetch(`${API_BASE}/medicine-info-image`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze image');
            }

            let imageHTML = '';
            if (data.imagePath) {
                imageHTML = `
                    <div class="mb-3 text-center">
                        <img src="${data.imagePath}" alt="Medicine" class="img-fluid rounded shadow" style="max-height: 300px;">
                    </div>
                `;
            }

            resultContainer.innerHTML = `
                <div class="result-container result-success">
                    <h4><i class="bi bi-image me-2"></i>${t('medicineImageAnalysis')}</h4>
                    ${imageHTML}
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h4>
                    <p>${error.message}</p>
                    <p>${t('tryClearerImage')}</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

// Suggestion Form
function setupSuggestionForm() {
    const form = document.getElementById('suggestionForm');
    const resultContainer = document.getElementById('suggestionResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        const symptoms = document.getElementById('suggestionSymptoms').value.trim();

        if (!symptoms) {
            alert(t('describeSymptoms'));
            hideLoading(submitButton);
            return;
        }

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Getting AI-powered medicine suggestions...</p>
            </div>
        `;

        try {
            const response = await fetch(`${API_BASE}/suggest-medicines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    symptoms,
                    userLang: currentLanguage
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get suggestions');
            }

            resultContainer.innerHTML = `
                <div class="result-container result-success">
                    <h4><i class="bi bi-lightbulb-fill me-2"></i>${t('aiSuggestions')}</h4>
                    <div class="alert alert-warning mt-3 mb-3">
                        <strong><i class="bi bi-exclamation-triangle me-2"></i>${t('important')}:</strong> 
                        These are only suggestions for safe over-the-counter medicines. Always consult a doctor before taking any medicine.
                    </div>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h4>
                    <p>${error.message}</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

// Skin Analysis Form
let cameraStream = null;
let capturedImageBlob = null;

function setupSkinAnalysisForm() {
    const form = document.getElementById('skinAnalysisForm');
    const resultContainer = document.getElementById('skinAnalysisResult');
    const startCameraBtn = document.getElementById('startCameraBtn');
    const captureImageBtn = document.getElementById('captureImageBtn');
    const stopCameraBtn = document.getElementById('stopCameraBtn');
    const videoElement = document.getElementById('videoElement');
    const canvasElement = document.getElementById('canvasElement');
    const capturedImage = document.getElementById('capturedImage');
    const cameraPreview = document.getElementById('cameraPreview');
    const capturedImagePreview = document.getElementById('capturedImagePreview');
    const fileInput = document.getElementById('skinImage');

    // Start Camera
    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', async () => {
            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment', // Use back camera on mobile
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                });
                
                if (videoElement) {
                    videoElement.srcObject = cameraStream;
                    cameraPreview.style.display = 'block';
                    startCameraBtn.style.display = 'none';
                    captureImageBtn.style.display = 'inline-block';
                    stopCameraBtn.style.display = 'inline-block';
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Unable to access camera. Please check permissions or use file upload instead.');
            }
        });
    }

    // Capture Photo
    if (captureImageBtn) {
        captureImageBtn.addEventListener('click', () => {
            if (videoElement && canvasElement) {
                const context = canvasElement.getContext('2d');
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0);
                
                canvasElement.toBlob((blob) => {
                    capturedImageBlob = blob;
                    const imageUrl = URL.createObjectURL(blob);
                    capturedImage.src = imageUrl;
                    capturedImagePreview.style.display = 'block';
                    cameraPreview.style.display = 'none';
                    
                    // Stop camera after capture
                    stopCamera();
                }, 'image/jpeg', 0.95);
            }
        });
    }

    // Stop Camera
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        if (videoElement) {
            videoElement.srcObject = null;
        }
        cameraPreview.style.display = 'none';
        startCameraBtn.style.display = 'inline-block';
        captureImageBtn.style.display = 'none';
        stopCameraBtn.style.display = 'none';
    }

    if (stopCameraBtn) {
        stopCameraBtn.addEventListener('click', stopCamera);
    }

    // Handle file input change - clear captured image
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files && fileInput.files[0]) {
                capturedImageBlob = null;
                capturedImagePreview.style.display = 'none';
            }
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        // Check if we have captured image or file upload
        let imageFile = null;
        
        if (capturedImageBlob) {
            // Use captured image from camera
            imageFile = new File([capturedImageBlob], 'captured-skin-image.jpg', { type: 'image/jpeg' });
        } else if (fileInput.files && fileInput.files[0]) {
            // Use uploaded file
            imageFile = fileInput.files[0];
        } else {
            alert(t('skinImage') + ' ' + t('error') + ': ' + 'Please capture a photo or upload an image');
            hideLoading(submitButton);
            return;
        }

        const formData = new FormData();
        formData.append('skinImage', imageFile);

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted" data-translate="analyzingSkin">Analyzing your skin condition with AI...</p>
            </div>
        `;

        try {
            // Add language to form data
            formData.append('userLang', currentLanguage);
            
            const response = await fetch(`${API_BASE}/analyze-skin`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze skin condition');
            }

            let imageHTML = '';
            if (data.imagePath) {
                imageHTML = `
                    <div class="mb-3 text-center">
                        <img src="${data.imagePath}" alt="Skin Condition" class="img-fluid rounded shadow" style="max-height: 400px;">
                    </div>
                `;
            }

            resultContainer.innerHTML = `
                <div class="result-container result-info">
                    <h4><i class="bi bi-heart-pulse me-2"></i>${t('skinAnalysisResult')}</h4>
                    ${imageHTML}
                    <div class="alert alert-info mt-3 mb-3">
                        <strong><i class="bi bi-info-circle me-2"></i>${t('important')}:</strong> ${t('preliminaryAssessment')}
                    </div>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
            
            // Clear captured image after successful analysis
            capturedImageBlob = null;
            capturedImagePreview.style.display = 'none';
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Skin analysis error:', error);
            let errorMessage = error.message || 'Failed to analyze skin condition';
            
            // Check if it's a 404 error
            if (errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('Endpoint')) {
                errorMessage = 'Server endpoint not found. Please make sure the server is running and restart it if needed.';
            }
            
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h4>
                    <p>${errorMessage}</p>
                    <p>${t('tryClearerImage')}</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

// Side Effects Form
function setupSideEffectsForm() {
    const form = document.getElementById('sideEffectsForm');
    const resultContainer = document.getElementById('sideEffectsResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        showLoading(submitButton);
        
        const medicineName = document.getElementById('sideEffectMedicine').value.trim();
        const sideEffects = document.getElementById('reportedSideEffects').value.trim();

        if (!medicineName || !sideEffects) {
            alert(t('error') + ': ' + t('pleaseDoNotDelay'));
            hideLoading(submitButton);
            return;
        }

        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Analyzing side effects with AI...</p>
            </div>
        `;

        try {
            const response = await fetch(`${API_BASE}/check-side-effects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicineName,
                    sideEffects,
                    userLang: currentLanguage
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to check side effects');
            }

            // Determine result type based on content
            let resultClass = 'result-info';
            if (data.response.toLowerCase().includes('serious') || 
                data.response.toLowerCase().includes('urgent') ||
                data.response.toLowerCase().includes('immediate')) {
                resultClass = 'result-emergency';
            } else if (data.response.toLowerCase().includes('common')) {
                resultClass = 'result-warning';
            }

            resultContainer.innerHTML = `
                <div class="result-container ${resultClass}">
                    <h4><i class="bi bi-exclamation-triangle-fill me-2"></i>${t('sideEffectAnalysis')}</h4>
                    <p class="mb-2"><strong>${t('medicineName')}:</strong> ${medicineName}</p>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h4>
                    <p>${error.message}</p>
                    <p>Please consult a doctor or pharmacist for accurate information.</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

// Voice Features Setup
function setupVoiceFeatures() {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // Set language based on current language
        const langMap = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN' };
        recognition.lang = langMap[currentLanguage] || 'en-US';
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const symptomsTextarea = document.getElementById('symptoms');
            if (symptomsTextarea) {
                symptomsTextarea.value = transcript;
            }
            stopVoiceInput();
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceInput();
        };
        
        recognition.onend = () => {
            stopVoiceInput();
        };
    }
    
    // Voice Input Button
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', startVoiceInput);
    }
    
    // Stop Listening Button
    const stopListeningBtn = document.getElementById('stopListeningBtn');
    if (stopListeningBtn) {
        stopListeningBtn.addEventListener('click', stopVoiceInput);
    }
    
    // Voice Output Button
    const voiceOutputBtn = document.getElementById('voiceOutputBtn');
    if (voiceOutputBtn) {
        voiceOutputBtn.addEventListener('click', startVoiceOutput);
    }
    
    // Stop Speaking Button
    const stopSpeakingBtn = document.getElementById('stopSpeakingBtn');
    if (stopSpeakingBtn) {
        stopSpeakingBtn.addEventListener('click', stopVoiceOutput);
    }
}

// Start Voice Input
function startVoiceInput() {
    if (!recognition) {
        alert('Speech recognition is not supported in your browser. ' + t('important') + ': Please use Chrome or Edge for best results.');
        return;
    }
    
    const voiceStatus = document.getElementById('voiceStatus');
    const symptomsTextarea = document.getElementById('symptoms');
    
    if (voiceStatus) {
        voiceStatus.style.display = 'block';
    }
    
    // Update language for recognition
    const langMap = { 
        en: 'en-US', 
        ta: 'ta-IN', 
        hi: 'hi-IN',
        te: 'te-IN',
        kn: 'kn-IN'
    };
    recognition.lang = langMap[currentLanguage] || 'en-US';
    
    try {
        recognition.start();
    } catch (error) {
        console.error('Error starting recognition:', error);
        stopVoiceInput();
    }
}

// Stop Voice Input
function stopVoiceInput() {
    if (recognition) {
        try {
            recognition.stop();
        } catch (error) {
            // Ignore errors when stopping
        }
    }
    
    const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) {
        voiceStatus.style.display = 'none';
    }
}

// Start Voice Output
function startVoiceOutput() {
    const voiceOutputBtn = document.getElementById('voiceOutputBtn');
    const speakingStatus = document.getElementById('speakingStatus');
    const text = voiceOutputBtn ? voiceOutputBtn.getAttribute('data-text') : '';
    
    if (!text) {
        alert(t('error') + ': ' + t('noHospitalsFound').replace('hospitals', 'consultation result'));
        return;
    }
    
    // Stop any current speech
    stopVoiceOutput();
    
    // Create utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on current language (support for en, ta, te, kn, hi)
    const langMap = { 
        en: 'en-US', 
        ta: 'ta-IN', 
        te: 'te-IN', 
        kn: 'kn-IN', 
        hi: 'hi-IN' 
    };
    currentUtterance.lang = langMap[currentLanguage] || 'en-US';
    
    // Set voice properties for better quality and clarity
    currentUtterance.rate = 0.85;  // Slightly slower for better clarity
    currentUtterance.pitch = 1.0;  // Natural pitch
    currentUtterance.volume = 1.0; // Full volume
    
    // Try to find appropriate voice for the selected language
    const voices = synthesis.getVoices();
    const langCode = currentLanguage === 'en' ? 'en' : 
                     currentLanguage === 'ta' ? 'ta' : 
                     currentLanguage === 'te' ? 'te' : 
                     currentLanguage === 'kn' ? 'kn' : 
                     'hi';
    
    // Try to find voice matching the language - prioritize female voices for better clarity
    let preferredVoice = voices.find(voice => 
        (voice.lang.startsWith(langCode) || voice.lang.includes(langCode)) &&
        voice.name.toLowerCase().includes('female')
    );
    
    // If no female voice, try any voice matching the language
    if (!preferredVoice) {
        preferredVoice = voices.find(voice => 
            voice.lang.startsWith(langCode) || voice.lang.includes(langCode)
        );
    }
    
    // Fallback: try to find any voice with similar language code or Indian locale
    if (!preferredVoice && langCode !== 'en') {
        preferredVoice = voices.find(voice => 
            voice.lang.includes('IN') || voice.lang.includes(langCode.substring(0, 2))
        );
    }
    
    // Final fallback: prefer Google voices or high-quality voices
    if (!preferredVoice) {
        preferredVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('google') ||
            voice.name.toLowerCase().includes('premium') ||
            voice.name.toLowerCase().includes('enhanced')
        );
    }
    
    if (preferredVoice) {
        currentUtterance.voice = preferredVoice;
        console.log(`🔊 Using voice: ${preferredVoice.name} (${preferredVoice.lang})`);
    } else {
        // Use default voice but still set language
        console.log(`⚠️ No specific voice found for ${currentLanguage}, using default voice with ${currentUtterance.lang} language`);
    }
    
    currentUtterance.onend = () => {
        stopVoiceOutput();
    };
    
    currentUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        stopVoiceOutput();
    };
    
    if (speakingStatus) {
        speakingStatus.style.display = 'block';
    }
    
    if (voiceOutputBtn) {
        voiceOutputBtn.style.display = 'none';
    }
    
    synthesis.speak(currentUtterance);
}

// Stop Voice Output
function stopVoiceOutput() {
    if (synthesis.speaking) {
        synthesis.cancel();
    }
    
    const speakingStatus = document.getElementById('speakingStatus');
    const voiceOutputBtn = document.getElementById('voiceOutputBtn');
    
    if (speakingStatus) {
        speakingStatus.style.display = 'none';
    }
    
    if (voiceOutputBtn) {
        voiceOutputBtn.style.display = 'block';
    }
    
    currentUtterance = null;
}

// Load voices when available
if (synthesis.onvoiceschanged !== undefined) {
    synthesis.onvoiceschanged = () => {
        // Voices loaded
    };
}

// Hospital Finder Setup - Uses OpenStreetMap (100% Free, No API Keys)
// All hospital finder functionality is in hospital-finder.js
function setupHospitalFinder() {
    const form = document.getElementById('hospitalSearchForm');
    if (!form) {
        console.warn('⚠️ Hospital search form not found');
        return;
    }
    
    console.log('✅ Hospital finder form found, setting up event listener...');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('🔍 Form submitted!');
        
        const locationInput = document.getElementById('locationInput');
        const location = locationInput ? locationInput.value.trim() : '';
        
        console.log('📍 Location entered:', location);
        
        if (!location) {
            alert(t('enterLocation') + ' is required');
            return;
        }
        
        // Use the searchHospitals function from hospital-finder.js
        // This uses OpenStreetMap (Nominatim + Overpass API) - completely free
        if (typeof searchHospitals === 'function') {
            console.log('✅ searchHospitals function found, calling...');
            try {
                await searchHospitals(location);
            } catch (error) {
                console.error('❌ Error in searchHospitals:', error);
                alert('Error searching for hospitals: ' + error.message);
            }
        } else {
            console.error('❌ Hospital finder functions not loaded. Make sure hospital-finder.js is included.');
            alert('Hospital finder is not available. Please refresh the page.');
        }
    });
    
    // Also add click handler to button as backup
    const searchButton = form.querySelector('button[type="submit"]');
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            console.log('🔘 Search button clicked');
        });
    }
    
    console.log('✅ Hospital finder setup complete');
    
    // Map initialization is handled in hospital-finder.js
    // It will initialize automatically when the page loads
}
