// Initialize EmailJS
emailjs.init("PxZ3keznWjDknLNh3s");

// DOM Elements - with null checks
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for animations - cached elements
let animateElements = null;

function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Cache elements for animation - only query once
    if (!animateElements) {
        animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-item');
    }
    animateElements.forEach(el => observer.observe(el));
}

// Active navigation link highlighting - optimized
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    let activeSection = null;

    // Find the active section first
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            activeSection = section.getAttribute('id');
        }
    });

    // Only update if we found an active section
    if (activeSection) {
        // Remove active class from all links once
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the current section's link
        const activeNavLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
        if (activeNavLink) activeNavLink.classList.add('active');
    }
}

// Add staggered animation to tech items
function animateTechItems() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
}

// Add subtle hover animations
function addHoverAnimations() {
    const cards = document.querySelectorAll('.skill-category, .project-card, .principle-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation link event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
        
        // Add touch feedback for mobile
        link.addEventListener('touchstart', () => {
            link.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', () => {
            setTimeout(() => {
                link.style.opacity = '1';
            }, 150);
        });
    });
    
    // Throttled scroll event listeners for better performance
    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Initialize intersection observer for animations
    createObserver();
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
    
    // Initialize tech items animation
    animateTechItems();
    
    // Add hover animations
    addHoverAnimations();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Handle touch events for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    // Close mobile menu on upward swipe
    if (diff > swipeThreshold && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Prevent scroll when mobile menu is open
function preventScroll(e) {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}

// Add touch event listeners
document.addEventListener('touchmove', preventScroll, { passive: false });

// Add CSS for mobile menu states
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-link {
            font-size: 1.1rem;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);