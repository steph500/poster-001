/**
 * SelfAware Tech - Main JavaScript
 * Futuristic, investor-ready website for Stok
 */

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('loaded');

        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ============================================
// NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Dropdown functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.closest('.nav-dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Close other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
            }
        });
        
        dropdown.classList.toggle('active');
    });
});

// Close dropdown on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ============================================
// PARTICLES EFFECT (HERO)
// ============================================

const particlesContainer = document.getElementById('particles');

function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// CHART.JS - DATA VISUALIZATION
// ============================================

// Load Chart.js
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
chartScript.onload = initCharts;
document.head.appendChild(chartScript);

function initCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Chart global config - dark theme
    Chart.defaults.color = '#ffffff';
    Chart.defaults.borderColor = 'rgba(124, 58, 237, 0.2)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Chart 1: User Growth (Line Chart)
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Monthly Users',
                    data: [50, 120, 200, 350, 600, 1000],
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00D4FF',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#00D4FF',
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Chart 2: App Usage (Bar Chart)
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Daily Active Users',
                    data: [65, 85, 72, 95, 110, 140, 125],
                    backgroundColor: 'rgba(0, 212, 255, 0.7)',
                    borderColor: '#00D4FF',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: '#7C3AED'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                    }
                }
            }
        });
    }

    // Chart 3: Market Opportunity (Pie Chart)
    const marketCtx = document.getElementById('marketChart');
    if (marketCtx) {
        new Chart(marketCtx, {
            type: 'doughnut',
            data: {
                labels: ['Retail', 'Restaurants', 'Services', 'Other'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        'rgba(124, 58, 237, 0.8)',
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 212, 255, 0.5)',
                        'rgba(124, 58, 237, 0.3)'
                    ],
                    borderColor: '#000000',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        cornerRadius: 8
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// ============================================
// INTERACTIVE DEMO
// ============================================

const demoScreen = document.getElementById('demoScreen');

if (demoScreen) {
    const demoImages = [
        '/assets/img/demo-inventory.jpg',
        '/assets/img/dashboard.jpg',
        '/assets/img/analytics.jpg'
    ];
    let currentImage = 0;

    // Auto-rotate demo images
    setInterval(() => {
        currentImage = (currentImage + 1) % demoImages.length;
        // In production, update demoScreen src
        // demoScreen.src = demoImages[currentImage];
    }, 4000);
}

// ============================================
// FEATURE CARDS HOVER EFFECT
// ============================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Simulate form submission
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================

const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// TYPING EFFECT (HERO)
// ============================================

const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.title-line');
    let lineIndex = 0;
    let charIndex = 0;

    const typeLine = () => {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            if (charIndex < line.textContent.length) {
                line.style.opacity = '1';
                charIndex++;
                setTimeout(typeLine, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeLine, 200);
            }
        }
    };

    // Start typing after loader
    setTimeout(typeLine, 1500);
}

// ============================================
// GRADIENT ANIMATION
// ============================================

const heroGradient = document.querySelector('.hero-gradient');

if (heroGradient) {
    let hue = 260;

    setInterval(() => {
        hue = (hue + 0.5) % 360;
        heroGradient.style.background = `
            linear-gradient(${hue}deg,
            rgba(124, 58, 237, 0.3) 0%,
            rgba(0, 212, 255, 0.2) 50%,
            rgba(124, 58, 237, 0.3) 100%
        )`;
    }, 100);
}

// ============================================
// INITIALIZATION COMPLETE
// ============================================

console.log('SelfAware Tech website loaded successfully');
console.log('✨ Futuristic UI initialized');
console.log('📊 Charts ready');
console.log('🎬 Animations active');
