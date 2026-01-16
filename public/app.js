// API Base URL
const API_BASE = window.location.origin + '/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupConsultationForm();
    setupMedicineForm();
    setupMedicineImageForm();
    setupSuggestionForm();
    setupSideEffectsForm();
});

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

// Format AI Response
function formatAIResponse(text) {
    // Split by the format markers
    const sections = text.split(/--------------------------------/);
    let formatted = text;
    
    // If response follows the format, parse it
    if (sections.length > 1) {
        formatted = text.replace(/👤 Patient Summary:/g, '<h5 class="mt-4 mb-3"><i class="bi bi-person-circle me-2"></i>Patient Summary:</h5>');
        formatted = formatted.replace(/🧠 Possible Health Insight:/g, '<h5 class="mt-4 mb-3"><i class="bi bi-brain me-2"></i>Possible Health Insight:</h5>');
        formatted = formatted.replace(/💊 Medicine Information \/ Suggestion:/g, '<h5 class="mt-4 mb-3"><i class="bi bi-capsule me-2"></i>Medicine Information / Suggestion:</h5>');
        formatted = formatted.replace(/⚠️ Warnings & When to See a Doctor:/g, '<h5 class="mt-4 mb-3 text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Warnings & When to See a Doctor:</h5>');
        formatted = formatted.replace(/✅ Self-Care Advice:/g, '<h5 class="mt-4 mb-3 text-success"><i class="bi bi-check-circle me-2"></i>Self-Care Advice:</h5>');
        formatted = formatted.replace(/📌 Disclaimer:/g, '<h5 class="mt-4 mb-3 text-warning"><i class="bi bi-info-circle me-2"></i>Disclaimer:</h5>');
        
        // Convert line breaks to HTML
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Format bullet points
        formatted = formatted.replace(/^- /gm, '<li>');
        formatted = formatted.replace(/(<li>.*?)(<br>|$)/g, '$1</li>');
        formatted = formatted.replace(/(<li>.*?<\/li>)/g, '<ul class="mb-3">$1</ul>');
    } else {
        // Simple formatting for non-structured responses
        formatted = text.replace(/\n\n/g, '</p><p>');
        formatted = '<p>' + formatted + '</p>';
    }
    
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
                .filter(c => c.length > 0)
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
                    <h3><i class="bi bi-exclamation-triangle me-2"></i>Error</h3>
                    <p><strong>${errorMessage}</strong></p>
                    ${errorDetails ? `<p class="small text-muted">${errorDetails}</p>` : ''}
                    <p>Please check:</p>
                    <ul>
                        <li>Your internet connection</li>
                        <li>API key configuration in .env file</li>
                        <li>Try again in a few moments</li>
                    </ul>
                    <p class="mt-3">If the problem persists, please consult a doctor directly.</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}

function displayConsultationResult(data) {
    const resultContainer = document.getElementById('consultationResult');
    
    if (data.emergency) {
        resultContainer.innerHTML = `
            <div class="result-container result-emergency">
                <h3><i class="bi bi-exclamation-triangle-fill me-2"></i>Emergency Situation Detected</h3>
                <div class="mt-3">
                    ${formatAIResponse(data.response)}
                </div>
                <div class="alert alert-danger mt-3 mb-0">
                    <strong><i class="bi bi-phone me-2"></i>Please do not delay.</strong> Seek immediate medical attention at the nearest hospital or call emergency services.
                </div>
            </div>
        `;
    } else {
        resultContainer.innerHTML = `
            <div class="result-container result-info">
                <h3><i class="bi bi-clipboard-check me-2"></i>AI Analysis Results</h3>
                <div class="alert alert-info mb-3">
                    <strong><i class="bi bi-info-circle me-2"></i>Important:</strong> This is a preliminary assessment only. It is not a diagnosis. Please consult a licensed doctor for proper medical evaluation and treatment.
                </div>
                <div class="mt-3">
                    ${formatAIResponse(data.response)}
                </div>
            </div>
        `;
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
            alert('Please enter a medicine name');
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
                body: JSON.stringify({ medicineName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch medicine information');
            }

            resultContainer.innerHTML = `
                <div class="result-container result-info">
                    <h4><i class="bi bi-capsule me-2"></i>Medicine Information</h4>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>Error</h4>
                    <p>${error.message}</p>
                    <p>Please check the spelling or consult a doctor or pharmacist.</p>
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
            alert('Please select an image file');
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
                    <h4><i class="bi bi-image me-2"></i>Medicine Image Analysis</h4>
                    ${imageHTML}
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>Error</h4>
                    <p>${error.message}</p>
                    <p>Please try again with a clearer image or consult a pharmacist.</p>
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
            alert('Please describe your symptoms');
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
                body: JSON.stringify({ symptoms })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get suggestions');
            }

            resultContainer.innerHTML = `
                <div class="result-container result-success">
                    <h4><i class="bi bi-lightbulb-fill me-2"></i>AI Medicine Suggestions</h4>
                    <div class="alert alert-warning mt-3 mb-3">
                        <strong><i class="bi bi-exclamation-triangle me-2"></i>Important:</strong> 
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
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>Error</h4>
                    <p>${error.message}</p>
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
            alert('Please fill in all fields');
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
                    sideEffects
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
                    <h4><i class="bi bi-exclamation-triangle-fill me-2"></i>Side Effect Analysis</h4>
                    <p class="mb-2"><strong>Medicine:</strong> ${medicineName}</p>
                    <div class="mt-3">
                        ${formatAIResponse(data.response)}
                    </div>
                </div>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="result-container result-warning">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>Error</h4>
                    <p>${error.message}</p>
                    <p>Please consult a doctor or pharmacist for accurate information.</p>
                </div>
            `;
        } finally {
            hideLoading(submitButton);
        }
    });
}
