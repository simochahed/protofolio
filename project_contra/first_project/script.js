 // Theme toggle functionality
 const themeToggle = document.getElementById('themeToggle');
 const html = document.documentElement;
 const icon = themeToggle.querySelector('i');

 // Check for saved theme preference
 if (localStorage.theme === 'dark' || 
     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
     html.classList.add('dark');
     icon.classList.remove('fa-moon');
     icon.classList.add('fa-sun');
 }

 themeToggle.addEventListener('click', () => {
     html.classList.toggle('dark');
     icon.classList.toggle('fa-sun');
     icon.classList.toggle('fa-moon');
     
     // Save theme preference
     localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
 });

 // Form submission handler
 document.getElementById('contactForm').addEventListener('submit', (e) => {
     e.preventDefault();
     // Add your form submission logic here
     alert('Thank you for your message! I will get back to you soon.');
     e.target.reset();
 });

 // Intersection Observer for fade-in animations
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('fade-in');
         }
     });
 }, { threshold: 0.1 });

 // Observe all sections
 document.querySelectorAll('section').forEach(section => {
     observer.observe(section);
 });