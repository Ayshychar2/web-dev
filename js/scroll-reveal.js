// Enhanced Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize parallax effects
    initParallaxEffects();
});

// Function to handle scroll reveal animations
function initScrollReveal() {
    // Handle both existing animate-on-scroll elements and our new reveal-element classes
    function revealOnScroll() {
        const elements = document.querySelectorAll(".reveal-element, .animate-on-scroll, .scroll-trigger, .stagger-item");
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            // Special handling for hero section elements - always show them
            if (element.closest('#page1')) {
                element.classList.add('revealed');
                return;
            }
            
            const rect = element.getBoundingClientRect();
            // Check if element is in viewport (with some buffer)
            const isInViewport = (
                rect.top < windowHeight - 100 && 
                rect.bottom > 0 &&
                rect.left < window.innerWidth &&
                rect.right > 0
            );
            
            if (isInViewport) {
                // Add appropriate class based on element type
                if (element.classList.contains('reveal-element')) {
                    element.classList.add("reveal");
                } 
                if (element.classList.contains('animate-on-scroll') || 
                    element.classList.contains('scroll-trigger') || 
                    element.classList.contains('stagger-item')) {
                    element.classList.add("visible");
                }
            } else {
                // Optional: Remove classes for re-animation when scrolling back up
                // Uncomment the following lines if you want elements to animate again when scrolling back
                /*
                if (element.classList.contains('reveal-element')) {
                    element.classList.remove("reveal");
                } 
                if (element.classList.contains('animate-on-scroll') || 
                    element.classList.contains('scroll-trigger') || 
                    element.classList.contains('stagger-item')) {
                    element.classList.remove("visible");
                }
                */
            }
        });
    }
    
    // Apply reveal classes to all elements that should animate
    const sections = [
        // Main sections
        '.mouse-slide-container', '.trust-badges', 
        '#how-it-works', '#testimonials', '#pricing', '#faq',
        '.guarantee', '.cta', 'footer',
        
        // Individual elements within sections
        '.panel', '.panel-content h2', '.panel-content p', '.panel-content a',
        '.trust-badges .badge', '.trust-badges .clients', '.badges-grid', '.clients-counter', '.counter-item',
        '.section-header', '.section-header h2', '.section-header p',
        '.step', '.step-image', '.step-content', '.step-number', '.step h3', '.step p', '.step ul', '.step li',
        '.testimonial', '.testimonial h3', '.testimonial p', '.testimonial .client',
        '.pricing-card', '.pricing-card h3', '.pricing-card .price', '.pricing-card ul', '.pricing-card a',
        '.faq-item', '.faq-question', '.faq-answer',
        '.guarantee-content', '.guarantee-content h2', '.guarantee-content p', '.clients-badge', '.join-badge',
        '.cta h2', '.cta a',
        '.footer-content', '.footer-logo', '.footer-links', '.footer-contact', '.social-icons',
        'nav', 'nav a', '.resume-btn', '.resume-btn-prt',
        '.video-container', '.hero-subtitle'
    ];
    
    // Apply reveal classes to all matching elements
    sections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // Skip elements that already have animation classes
            if (element.classList.contains('animate-on-scroll') || 
                element.classList.contains('scroll-trigger') || 
                element.classList.contains('stagger-item')) {
                return;
            }
            
            // Add the reveal-element class
            element.classList.add('reveal-element');
            
            // Add delay classes for staggered animations within the same parent
            if (element.parentElement) {
                const siblings = Array.from(element.parentElement.children);
                if (siblings.length > 1) {
                    const delay = Math.min(index % 8, 7) + 1; // Expanded to 8 delay classes
                    element.classList.add(`reveal-delay-${delay}`);
                }
            }
            
            // Add different reveal directions based on element type or position
            if (element.classList.contains('badge') || element.classList.contains('pricing-card')) {
                // Alternate directions for grid items
                if (index % 3 === 0) {
                    element.classList.add('reveal-left');
                } else if (index % 3 === 1) {
                    element.classList.add('reveal-up');
                } else {
                    element.classList.add('reveal-right');
                }
            } else if (element.classList.contains('step')) {
                // Alternate directions for steps
                if (index % 2 === 0) {
                    element.classList.add('reveal-left');
                } else {
                    element.classList.add('reveal-right');
                }
            } else if (element.classList.contains('faq-item')) {
                element.classList.add('reveal-right');
            } else if (element.classList.contains('testimonial')) {
                // Alternate animations for testimonials
                if (index % 3 === 0) {
                    element.classList.add('reveal-up');
                } else if (index % 3 === 1) {
                    element.classList.add('reveal-zoom');
                } else {
                    element.classList.add('reveal-flip');
                }
            } else if (element.tagName === 'H1' || element.tagName === 'H2') {
                element.classList.add('reveal-down');
            } else if (element.tagName === 'H3') {
                element.classList.add('reveal-left');
            } else if (element.classList.contains('btn') || element.classList.contains('cta-button')) {
                element.classList.add('reveal-zoom');
            } else if (element.tagName === 'IMG' || element.classList.contains('step-image')) {
                // Add floating animation to images
                element.classList.add('reveal-up');
                element.classList.add('float-animation');
            } else if (element.classList.contains('footer-links') || element.classList.contains('footer-contact')) {
                element.classList.add('reveal-up');
            }
            
            // Add glow effect to important elements
            if (element.classList.contains('pricing-card') || 
                element.classList.contains('cta-button') || 
                element.classList.contains('btn-primary')) {
                element.classList.add('glow-effect');
            }
        });
    });
    
    // Run the reveal function initially and on scroll
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
    
    // Also reveal elements when window is resized
    window.addEventListener("resize", revealOnScroll);
}

// Function to handle FAQ accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other items (optional - for accordion behavior)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Function to initialize parallax effects
function initParallaxEffects() {
    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Apply parallax effect to elements with parallax-bg class
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Mouse movement effects for hero section
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate mouse position as percentage
        const mouseXPercent = mouseX / windowWidth;
        const mouseYPercent = mouseY / windowHeight;
        
        // Apply subtle movement to elements with mouse-move class
        document.querySelectorAll('.mouse-move').forEach(element => {
            const speed = element.getAttribute('data-move-speed') || 30;
            const moveX = (mouseXPercent - 0.5) * speed;
            const moveY = (mouseYPercent - 0.5) * speed;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.nav-menu').classList.remove('active');
            }
        }
    });
});