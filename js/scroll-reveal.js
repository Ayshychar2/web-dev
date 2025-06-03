// Enhanced Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal with a slight delay to ensure DOM is fully loaded
    setTimeout(function() {
        // Initialize scroll reveal
        initScrollReveal();
        
        // Initialize FAQ accordion
        initFaqAccordion();
        
        // Initialize parallax effects
        initParallaxEffects();
        
        // Force reveal all elements in the hero section
        const heroSection = document.getElementById('page1');
        if (heroSection) {
            const heroElements = heroSection.querySelectorAll('.reveal-element, .animate-on-scroll, .scroll-trigger, .stagger-item');
            heroElements.forEach(element => {
                element.classList.add('reveal');
                element.classList.add('visible');
            });
        }
        
        // Force reveal the slider section
        const sliderSection = document.querySelector('.mouse-slide-container');
        if (sliderSection) {
            sliderSection.classList.add('reveal');
            sliderSection.classList.add('visible');
        }
    }, 100);
});

// Function to handle scroll reveal animations
function initScrollReveal() {
    // Handle both existing animate-on-scroll elements and our new reveal-element classes
    function revealOnScroll() {
        const elements = document.querySelectorAll(".reveal-element, .animate-on-scroll, .scroll-trigger, .stagger-item");
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            // Special handling for hero section elements - always show them
            if (element.closest('#page1') || element.id === 'page1' || element.classList.contains('mouse-slide-container')) {
                element.classList.add('revealed');
                element.classList.add('reveal');
                element.classList.add('visible');
                
                // Also make sure all child elements are revealed
                const childElements = element.querySelectorAll('.reveal-element, .animate-on-scroll, .scroll-trigger, .stagger-item');
                childElements.forEach(child => {
                    child.classList.add('revealed');
                    child.classList.add('reveal');
                    child.classList.add('visible');
                });
                
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
                // Special handling for testimonials
                if (element.classList.contains('testimonial')) {
                    // Don't auto-reveal testimonials
                    return;
                }
                
                // Special handling for FAQ items
                if (element.classList.contains('faq-item')) {
                    // Reveal the FAQ item but ensure it's not active (open)
                    if (element.classList.contains('reveal-element')) {
                        element.classList.add("reveal");
                    }
                    element.classList.remove("active");
                    return;
                }
                
                // Normal handling for all other elements
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
        '.mouse-slide-container', '.clients-section', '.counter-section', 
        '.vision-section', '.partners-section', '.shopify-expert-section',
        '#testimonials', '#how-it-works', '#pricing', '#faq', '#page1',
        '.guarantee', '.cta', 'footer', '.industries-section',
        
        // Individual elements within sections
        '.panel', '.panel-content h2', '.panel-content p', '.panel-content a',
        '.clients-section-header', '.clients-section-header h2', '.clients-section-header p',
        '.marquee-container', '.client-logo', '.client-logo img',
        '.counter-container', '.counter-stats', '.counter-item', '.counter-number', '.counter-title',
        '.counter-image', '.counter-image img',
        '.vision-container', '.vision-content', '.vision-content h2', '.vision-content p', '.vision-btn',
        '.vision-image', '.vision-image img',
        '.partners-header', '.partners-header h2', '.partners-header p',
        '.partners-marquee-container', '.partner-logo', '.partner-logo img',
        '.shopify-container', '.shopify-content', '.shopify-title-wrap', '.shopify-title-main',
        '.shopify-title-highlight', '.trophy-icon', '.shopify-content p', '.shopify-content a',
        '.section-header', '.section-header h2', '.section-header p',
        // Removed testimonial elements to prevent auto-reveal
        // '.testimonials-slider', '.testimonials-track', '.testimonial', '.rating', '.rating i',
        // '.testimonial h3', '.testimonial p', '.testimonial .client', '.client img', '.client h4', '.client p',
        '.slider-nav', '.slider-btn', '.slider-dots', '.dot',
        '.pricing-card', '.pricing-card h3', '.pricing-card .price', '.pricing-card ul', '.pricing-card a',
        '.faq-item', '.faq-question', '.faq-answer',
        '.guarantee-content', '.guarantee-content h2', '.guarantee-content p', '.clients-badge', '.join-badge',
        '.cta h2', '.cta a',
        '.footer-content', '.footer-logo', '.footer-links', '.footer-contact', '.social-icons',
        'nav', 'nav a', '.resume-btn', '.resume-btn-prt',
        '.video-container', '.hero-subtitle', '.hero-tagline', '.hero-description', '.hero-description p', '.hero-description .btn', '.hero-title',
        '.slider', '.slide', '.slider-container'
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
                // Add reveal animation class but ensure they're closed
                element.classList.add('reveal-right');
                element.classList.add('reveal-element'); // Make sure it has the reveal-element class
                element.classList.remove('active'); // Ensure FAQ items are closed by default
            } else if (element.classList.contains('testimonial')) {
                // Don't add any reveal animations to testimonials
                // They will be controlled by the testimonial slider script
                element.classList.remove('reveal-element'); // Remove reveal-element class
                // Don't add any animation classes
            } else if (element.tagName === 'H1' || element.tagName === 'H2') {
                element.classList.add('reveal-down');
            } else if (element.tagName === 'H3') {
                element.classList.add('reveal-left');
            } else if (element.classList.contains('btn') || element.classList.contains('cta-button') || 
                       element.classList.contains('vision-btn') || element.classList.contains('shopify-content a')) {
                element.classList.add('reveal-zoom');
            } else if (element.tagName === 'IMG' || element.classList.contains('step-image') || 
                       element.classList.contains('client-logo') || element.classList.contains('partner-logo')) {
                // Add floating animation to images
                element.classList.add('reveal-up');
                element.classList.add('float-animation');
            } else if (element.classList.contains('footer-links') || element.classList.contains('footer-contact')) {
                element.classList.add('reveal-up');
            } else if (element.classList.contains('counter-item')) {
                // Alternate animations for counter items
                if (index % 4 === 0) {
                    element.classList.add('reveal-up');
                } else if (index % 4 === 1) {
                    element.classList.add('reveal-left');
                } else if (index % 4 === 2) {
                    element.classList.add('reveal-right');
                } else {
                    element.classList.add('reveal-down');
                }
            } else if (element.classList.contains('vision-content')) {
                element.classList.add('reveal-left');
            } else if (element.classList.contains('vision-image')) {
                element.classList.add('reveal-right');
            } else if (element.classList.contains('shopify-content')) {
                element.classList.add('reveal-left');
            } else if (element.classList.contains('clients-section-header') || 
                       element.classList.contains('partners-header')) {
                element.classList.add('reveal-down');
            } else if (element.classList.contains('section')) {
                // Default animation for sections
                element.classList.add('reveal-up');
            } else if (element.classList.contains('slider') || 
                       element.classList.contains('slide') || 
                       element.classList.contains('slider-container')) {
                element.classList.add('reveal-zoom');
            } else {
                // Default animation for other elements
                element.classList.add('reveal-up');
            }
            
            // Add glow effect to important elements
            if (element.classList.contains('pricing-card') || 
                element.classList.contains('cta-button') || 
                element.classList.contains('btn-primary') ||
                element.classList.contains('vision-btn') ||
                element.classList.contains('shopify-content a')) {
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
    // Add parallax effect to background elements with throttling
    let lastScrollTime = 0;
    const scrollThrottleTime = 50; // Throttle to improve performance
    
    window.addEventListener('scroll', function() {
        // Throttle scroll events
        const now = Date.now();
        if (now - lastScrollTime < scrollThrottleTime) return;
        lastScrollTime = now;
        
        const scrollPosition = window.scrollY;
        
        // Apply parallax effect to elements with parallax-bg class
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }, { passive: true });
    
    // Mouse movement effects for hero section with throttling
    let lastMouseMoveTime = 0;
    const mouseMoveThrottleTime = 50; // Throttle to improve performance
    
    document.addEventListener('mousemove', function(e) {
        // Throttle mousemove events
        const now = Date.now();
        if (now - lastMouseMoveTime < mouseMoveThrottleTime) return;
        lastMouseMoveTime = now;
        
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
    }, { passive: true });
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