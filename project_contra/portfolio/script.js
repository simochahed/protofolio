// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    } else {
        hideError(name);
    }

    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        hideError(email);
    }

    // Message validation
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    } else {
        hideError(message);
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        form.reset();
    }
});

function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    input.style.borderColor = '#ff6b6b';
}

function hideError(input) {
    const errorDiv = input.nextElementSibling;
    errorDiv.style.display = 'none';
    input.style.borderColor = '';
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});