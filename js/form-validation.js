document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('artwork-submission-form')) {
        setupFormValidation();
        setupTagsInput();
        setupFileUpload();
        setupModalHandling();
    }
});

function setupFormValidation() {
    const form = document.getElementById('artwork-submission-form');
    const emailInput = document.getElementById('email');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const tagsInput = document.getElementById('tags');
    const fileInput = document.getElementById('artwork-file');
    const aiRadioYes = document.getElementById('ai-yes');
    const aiRadioNo = document.getElementById('ai-no');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.getElementById('submit-button');
    const successModal = document.getElementById('success-modal');
    const closeSuccess = document.getElementById('close-success');
    const continueButton = document.getElementById('continue-button');
    const clearButton = document.getElementById('clear-button');

    const emailError = document.getElementById('email-error');
    const titleError = document.getElementById('title-error');
    const descriptionError = document.getElementById('description-error');
    const tagsError = document.getElementById('tags-error');
    const fileError = document.getElementById('file-error');
    const aiError = document.getElementById('ai-error');
    const termsError = document.getElementById('terms-error');

    if (!form) return;

    emailInput.addEventListener('input', () => validateField(emailInput, emailError));
    titleInput.addEventListener('input', () => validateField(titleInput, titleError));
    descriptionInput.addEventListener('input', () => validateField(descriptionInput, descriptionError));
    
    [aiRadioYes, aiRadioNo].forEach(radio => {
        radio.addEventListener('change', () => {
            if (aiRadioYes.checked || aiRadioNo.checked) {
                hideError(aiError);
            }
        });
    });
    
    termsCheckbox.addEventListener('change', () => {
        if (termsCheckbox.checked) {
            hideError(termsError);
        } else {
            showError(termsError, 'You must agree to the terms and conditions');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        resetErrors();
  
        let isValid = true;
        
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email address is required');
            highlightField(emailInput);
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            highlightField(emailInput);
            isValid = false;
        }

        if (titleInput.value.trim() === '') {
            showError(titleError, 'Title is required');
            highlightField(titleInput);
            isValid = false;
        } else if (titleInput.value.length < 3) {
            showError(titleError, 'Title must be at least 3 characters');
            highlightField(titleInput);
            isValid = false;
        }

        if (descriptionInput.value.trim() === '') {
            showError(descriptionError, 'Description is required');
            highlightField(descriptionInput);
            isValid = false;
        } else if (descriptionInput.value.length < 20) {
            showError(descriptionError, 'Description must be at least 20 characters');
            highlightField(descriptionInput);
            isValid = false;
        }

        const tagsValue = tagsInput.value;
        try {
            const parsedTags = tagsValue ? JSON.parse(tagsValue) : [];
            if (!tagsValue || parsedTags.length === 0) {
                showError(tagsError, 'Please add at least one tag');
                document.querySelector('.tags-input-container').classList.add('field-error');
                isValid = false;
            }
        } catch (e) {
            showError(tagsError, 'Invalid tags format. Please try again.');
            document.querySelector('.tags-input-container').classList.add('field-error');
            isValid = false;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            showError(fileError, 'Please select a file to upload');
            highlightField(fileInput.parentElement);
            isValid = false;
        } else {
            const file = fileInput.files[0];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            
            if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension)) {
                showError(fileError, 'Only JPG, PNG, GIF and WEBP image files are allowed');
                highlightField(fileInput.parentElement);
                isValid = false;
            }
            
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                showError(fileError, 'File size must be less than 10MB');
                highlightField(fileInput.parentElement);
                isValid = false;
            }
        }
        
        if (!aiRadioYes.checked && !aiRadioNo.checked) {
            showError(aiError, 'Please indicate if the artwork is AI-generated');
            highlightField(aiRadioYes.closest('.form-group'));
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            showError(termsError, 'You must agree to the terms and conditions');
            highlightField(termsCheckbox.parentElement);
            isValid = false;
        }

        if (isValid) {
            successModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    if (continueButton || closeSuccess) {
        const resetForm = () => {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            form.reset();

            const tagsList = document.getElementById('tags-list');
            if (tagsList) {
                tagsList.innerHTML = '';
            }
            
            window.tags = [];
            const tagsHidden = document.getElementById('tags');
            if (tagsHidden) {
                tagsHidden.value = '[]';
            }
            
            const tagsContainer = document.querySelector('.tags-input-container');
            if (tagsContainer) {
                tagsContainer.classList.remove('field-error');
            }
            
            const fileInput = document.getElementById('artwork-file');
            const fileName = document.getElementById('file-name');
            if (fileInput) {
                fileInput.value = '';
                if (fileInput.value) {
                    const newFileInput = document.createElement('input');
                    newFileInput.type = 'file';
                    newFileInput.id = fileInput.id;
                    newFileInput.name = fileInput.name;
                    newFileInput.className = fileInput.className;
                    newFileInput.accept = fileInput.accept;
                    const newFileUpload = fileInput.cloneNode(true);
                    fileInput.parentNode.replaceChild(newFileUpload, fileInput);
                    setupFileUpload();
                }
            }
            
            if (fileName) {
                fileName.textContent = 'No file chosen';
            }
            
            const fileUpload = document.querySelector('.file-upload');
            if (fileUpload) {
                fileUpload.classList.remove('field-error');
            }
            
            const aiRadios = document.querySelectorAll('input[name="ai-generated"]');
            aiRadios.forEach(radio => {
                radio.checked = false;
            });
            
            const termsCheckbox = document.getElementById('terms');
            if (termsCheckbox) {
                termsCheckbox.checked = false;
            }
            
            resetErrors();
        };

        continueButton?.addEventListener('click', resetForm);
        closeSuccess?.addEventListener('click', resetForm);
        clearButton?.addEventListener('click', resetForm);
    }

    function validateField(inputElement, errorElement) {
        if (inputElement === emailInput) {
            if (inputElement.value.trim() === '') {
                showError(errorElement, 'Email address is required');
                highlightField(inputElement);
                return false;
            } else if (!validateEmail(inputElement.value)) {
                showError(errorElement, 'Please enter a valid email address');
                highlightField(inputElement);
                return false;
            } else {
                hideError(errorElement);
                removeHighlight(inputElement);
                return true;
            }
        } 
        else if (inputElement === titleInput) {
            if (inputElement.value.trim() === '') {
                showError(errorElement, 'Title is required');
                highlightField(inputElement);
                return false;
            } else if (inputElement.value.length < 3) {
                showError(errorElement, 'Title must be at least 3 characters');
                highlightField(inputElement);
                return false;
            } else {
                hideError(errorElement);
                removeHighlight(inputElement);
                return true;
            }
        }
        else if (inputElement === descriptionInput) {
            if (inputElement.value.trim() === '') {
                showError(errorElement, 'Description is required');
                highlightField(inputElement);
                return false;
            } else if (inputElement.value.length < 20) {
                showError(errorElement, 'Description must be at least 20 characters');
                highlightField(inputElement);
                return false;
            } else {
                hideError(errorElement);
                removeHighlight(inputElement);
                return true;
            }
        }
    }

    function resetErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            hideError(element);
        });
        
        document.querySelectorAll('.field-error').forEach(element => {
            removeHighlight(element);
        });
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.setAttribute('aria-hidden', 'false');
    }
    
    function hideError(element) {
        element.style.display = 'none';
        element.textContent = '';
        element.setAttribute('aria-hidden', 'true');
    }
    
    function highlightField(element) {
        element.classList.add('field-error');
    }
    
    function removeHighlight(element) {
        element.classList.remove('field-error');
    }
    
    function validateEmail(email) {
        if (!email || email.trim() === '') return false;

        const atIndex = email.indexOf('@');
        if (atIndex === -1 || atIndex === 0) return false;

        const domainPart = email.substring(atIndex + 1);
        const dotIndex = domainPart.indexOf('.');
        
        if (dotIndex === -1 || dotIndex === 0 || dotIndex === domainPart.length - 1) return false;
        
        return true;
    }
}

function setupTagsInput() {
    const tagsInput = document.getElementById('tags-input');
    const tagsList = document.getElementById('tags-list');
    const tagsHidden = document.getElementById('tags');
    const tagsError = document.getElementById('tags-error');
    const tagsContainer = document.querySelector('.tags-input-container');
    
    if (!tagsInput || !tagsList || !tagsHidden) return;

    window.tags = [];

    window.updateTags = function() {
        tagsHidden.value = JSON.stringify(window.tags);
        
        if (window.tags.length > 0) {
            if (tagsError) {
                tagsError.style.display = 'none';
            }
            if (tagsContainer) {
                tagsContainer.classList.remove('field-error');
            }
        }
    }
  
    function addTag(tagText) {
        tagText = tagText.trim().toLowerCase();

        if (tagText === '' || window.tags.includes(tagText)) {
            return;
        }

        window.tags.push(tagText);
        
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `#${tagText} <span>&times;</span>`;
        
        tag.querySelector('span').addEventListener('click', () => {
            tag.remove();
            window.tags = window.tags.filter(t => t !== tagText);
            window.updateTags();
        });
        
        tagsList.appendChild(tag);
        
        window.updateTags();
        
        tagsInput.value = '';
    }
    
    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            
            const tag = tagsInput.value.replace(',', '');
            if (tag) {
                addTag(tag);
            }
        }
    });
    
    tagsInput.addEventListener('blur', () => {
        const tag = tagsInput.value.trim();
        if (tag) {
            addTag(tag);
        }
    });
}

function setupFileUpload() {
    const fileInput = document.getElementById('artwork-file');
    const fileName = document.getElementById('file-name');
    const fileError = document.getElementById('file-error');
    
    if (!fileInput || !fileName) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    fileInput.addEventListener('change', () => {
        if (fileError) {
            fileError.style.display = 'none';
            fileInput.parentElement.classList.remove('field-error');
        }
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension)) {
                if (fileError) {
                    fileError.textContent = 'Only JPG, PNG, GIF and WEBP image files are allowed';
                    fileError.style.display = 'block';
                    fileInput.parentElement.classList.add('field-error');
                }
                
                fileInput.value = '';
                fileName.textContent = 'No file chosen';
                return;
            }
            
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                if (fileError) {
                    fileError.textContent = 'File size must be less than 10MB';
                    fileError.style.display = 'block';
                    fileInput.parentElement.classList.add('field-error');
                }
                
                fileInput.value = '';
                fileName.textContent = 'No file chosen';
                return;
            }
            
            fileName.textContent = file.name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
}

function setupModalHandling() {
    const successModal = document.getElementById('success-modal');
    
    if (successModal) {
        successModal.style.display = 'none';
    }
    
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                successModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}