// Initialize Lucide Icons
lucide.createIcons();

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Mobile Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

if (mobileLinks) {
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Reveal on Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal classes to specific elements
const revealElements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .contact-box');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        
        // EmailJS implementation
        emailjs.sendForm('service_lvyzn8l', 'template_kf3wyq9', contactForm)
            .then(() => {
                btn.innerHTML = 'Message Sent!';
                btn.style.background = '#22c55e'; // Green success color
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, (error) => {
                console.error('FAILED...', error);
                btn.innerHTML = 'Error! Try Again';
                btn.style.background = '#ef4444'; // Red error color
                btn.disabled = false;
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            });
    });
}

// Add Reveal Styles via JS to keep CSS clean
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
