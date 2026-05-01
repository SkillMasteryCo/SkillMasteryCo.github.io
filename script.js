/* ===========================
   FORM VALIDATION
   =========================== */

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates name input
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is at least 2 characters
 */
function validateName(name) {
    return name.trim().length >= 2;
}

/**
 * Validates message input
 * @param {string} message - Message to validate
 * @returns {boolean} - True if message is at least 10 characters
 */
function validateMessage(message) {
    return message.trim().length >= 10;
}

/**
 * Clears error messages and styling
 */
function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('formMessage').textContent = '';
    document.getElementById('formMessage').className = '';

    document.getElementById('name').classList.remove('error');
    document.getElementById('email').classList.remove('error');
    document.getElementById('message').classList.remove('error');
}

/**
 * Displays an error message for a specific field
 * @param {string} fieldId - ID of the field
 * @param {string} errorId - ID of the error message element
 * @param {string} message - Error message to display
 */
function displayError(fieldId, errorId, message) {
    document.getElementById(fieldId).classList.add('error');
    document.getElementById(errorId).textContent = message;
}

/**
 * Validates the entire contact form
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
    clearErrors();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    let isValid = true;

    // Validate name
    if (!validateName(name)) {
        displayError('name', 'nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    if (!email) {
        displayError('email', 'emailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        displayError('email', 'emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!validateMessage(message)) {
        displayError('message', 'messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

/**
 * Handles form submission
 * @param {Event} e - Form submission event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!validateForm()) {
        return;
    }

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        _subject: 'New inquiry from SkillMasterCo website'
    };

    formMessage.textContent = 'Sending message...';
    formMessage.className = '';

    fetch(contactForm.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Form submission failed');
                });
            }
            return response.json();
        })
        .then(() => {
            formMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
            formMessage.className = 'success';
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        })
        .catch(() => {
            formMessage.textContent = 'Sorry, something went wrong. Please try again later.';
            formMessage.className = 'error';
        });
}

/* ===========================
   MOBILE NAVIGATION
   =========================== */

/**
 * Toggles mobile navigation menu
 */
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Closes mobile menu when a nav link is clicked
 */
function setupNavLinkHandlers() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ===========================
   CTA BUTTON SMOOTH SCROLL
   =========================== */

/**
 * Scrolls to contact section when "Hire Us" button is clicked
 */
function setupCTAButton() {
    const hireButton = document.getElementById('hireButton');
    hireButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ===========================
   DOM CONTENT LOADED
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    setupNavLinkHandlers();

    // CTA button
    setupCTAButton();

    // Real-time validation feedback (optional enhancement)
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.classList.add('error');
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
            }
        });

        emailInput.addEventListener('focus', () => {
            emailInput.classList.remove('error');
            document.getElementById('emailError').textContent = '';
        });
    }

    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            if (nameInput.value && !validateName(nameInput.value)) {
                nameInput.classList.add('error');
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
            }
        });

        nameInput.addEventListener('focus', () => {
            nameInput.classList.remove('error');
            document.getElementById('nameError').textContent = '';
        });
    }
});
