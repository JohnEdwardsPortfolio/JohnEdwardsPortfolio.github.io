// Typing effect for the hero section
const typingText = document.getElementById('typing-text');
const phrases = [
    "Building innovative web solutions.",
    "Creating intelligent AI systems.",
    "Developing cutting-edge mobile apps.",
    "Turning ideas into reality."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Initialize the first testimonial
showTestimonial(currentTestimonial);

// Auto-scroll testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Project hover effect
const projectRows = document.querySelectorAll('.project-row');

projectRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.querySelector('.project-image img').style.transform = 'scale(1.1)';
    });

    row.addEventListener('mouseleave', () => {
        row.querySelector('.project-image img').style.transform = 'scale(1)';
    });
});

// Skills animation
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px)';
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
    });
});

// Contact form modal
const contactButton = document.querySelector('.cta-button');
const modal = document.getElementById('contactModal');
const closeButton = document.getElementsByClassName('close')[0];
const contactForm = document.getElementById('contactForm');

contactButton.onclick = function() {
  modal.style.display = "block";
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

contactForm.onsubmit = function(e) {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nMessage: ${formData.get('message')}`;
  
  window.location.href = `mailto:john.edwardsfreelancerdev@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(body)}`;
  
  modal.style.display = "none";
  contactForm.reset();
}

