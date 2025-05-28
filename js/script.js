// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mouse Slide Animation with GSAP
    const mouseSlideContainer = document.querySelector('.mouse-slide-container');
    const panels = document.querySelectorAll('.panel');
    
    if (mouseSlideContainer && panels.length && window.gsap) {
        // Initialize GSAP
        gsap.registerPlugin(window.ScrollTrigger);
        
        // Set initial positions with GSAP
        gsap.set(panels[0], { 
            x: '0%',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        });
        panels[0].classList.add('active');
        
        gsap.set(panels.slice(1), { 
            x: '100%',
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        });
        
        // Create a timeline for smooth animations
        const tl = gsap.timeline({ paused: true });
        
        // Mouse move handler with GSAP
        let currentX = 0;
        let targetX = 0;
        let activeIndex = 0;
        
        mouseSlideContainer.addEventListener('mousemove', (e) => {
            // Calculate mouse position as percentage of container width
            targetX = e.clientX / mouseSlideContainer.offsetWidth;
            
            // Update CSS variables for radial gradient mask
            gsap.to(mouseSlideContainer, {
                duration: 0.5,
                '--mouse-x': `${e.clientX}px`,
                '--mouse-y': `${e.clientY}px`,
                ease: 'power2.out'
            });
            
            // Update panel masks
            panels.forEach(panel => {
                const panelMask = panel.querySelector('.panel-mask');
                if (panelMask) {
                    gsap.to(panelMask, {
                        duration: 0.3,
                        '--mouse-x': `${e.clientX}px`,
                        '--mouse-y': `${e.clientY}px`,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Animation loop for smooth movement
        function animateSlides() {
            // Smooth out the movement
            currentX += (targetX - currentX) * 0.1;
            
            // Animate panels based on mouse position
            panels.forEach((panel, index) => {
                // Different calculation for each panel
                const panelX = (index - currentX * (panels.length - 1)) * 100;
                
                // Apply transform with GSAP
                gsap.to(panel, {
                    duration: 0.8,
                    x: `${panelX}%`,
                    ease: 'power2.out',
                    clipPath: panelX > -50 && panelX < 50 
                        ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                        : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    onUpdate: function() {
                        // Add/remove active class based on visibility
                        if (panelX > -50 && panelX < 50) {
                            if (!panel.classList.contains('active')) {
                                panel.classList.add('active');
                                // Animate content in
                                gsap.to(panel.querySelectorAll('h2, p'), {
                                    duration: 0.5,
                                    y: 0,
                                    opacity: 1,
                                    stagger: 0.1,
                                    ease: 'power2.out'
                                });
                            }
                        } else {
                            if (panel.classList.contains('active')) {
                                panel.classList.remove('active');
                                // Animate content out
                                gsap.to(panel.querySelectorAll('h2, p'), {
                                    duration: 0.3,
                                    y: 30,
                                    opacity: 0,
                                    stagger: 0.05,
                                    ease: 'power2.in'
                                });
                            }
                        }
                    }
                });
            });
            
            requestAnimationFrame(animateSlides);
        }
        
        // Start the animation loop
        animateSlides();
        
        // Touch support for mobile with GSAP
        let touchStartX = 0;
        let currentPanelIndex = 0;
        
        mouseSlideContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        mouseSlideContainer.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
            const touchX = e.touches[0].clientX;
            const diffX = touchX - touchStartX;
            const swipePercent = diffX / mouseSlideContainer.offsetWidth;
            
            // Update targetX for the animation loop
            targetX = currentPanelIndex / (panels.length - 1) + swipePercent;
            targetX = Math.max(0, Math.min(1, targetX));
        });
        
        mouseSlideContainer.addEventListener('touchend', (e) => {
            const touchX = e.changedTouches[0].clientX;
            const diffX = touchX - touchStartX;
            
            if (Math.abs(diffX) > mouseSlideContainer.offsetWidth / 4) {
                if (diffX > 0 && currentPanelIndex > 0) {
                    currentPanelIndex--;
                } else if (diffX < 0 && currentPanelIndex < panels.length - 1) {
                    currentPanelIndex++;
                }
            }
            
            // Set targetX to snap to the current panel
            targetX = currentPanelIndex / (panels.length - 1);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Change icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Sticky header effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Testimonial carousel (if many testimonials)
    // This is a simple version, you might want to use a library for more complex carousels
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    // Only initialize carousel if there are more than 3 testimonials and screen is small
    if (testimonials.length > 3 && window.innerWidth < 768) {
        // Hide all testimonials except the first three
        for (let i = 3; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Create navigation buttons
        const testimonialsSection = document.querySelector('.testimonials');
        const navContainer = document.createElement('div');
        navContainer.className = 'testimonial-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.className = 'nav-btn prev-btn';
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.className = 'nav-btn next-btn';
        
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        testimonialsSection.appendChild(navContainer);
        
        // Navigation functionality
        prevBtn.addEventListener('click', () => {
            if (currentTestimonial > 0) {
                testimonials[currentTestimonial + 2].style.display = 'none';
                testimonials[currentTestimonial - 1].style.display = 'block';
                currentTestimonial--;
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentTestimonial < testimonials.length - 3) {
                testimonials[currentTestimonial].style.display = 'none';
                testimonials[currentTestimonial + 3].style.display = 'block';
                currentTestimonial++;
            }
        });
    }
    
    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Check email format
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value.trim() && !isValidEmail(field.value)) {
                    valid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Please enter a valid email address';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        });
    });
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animation on scroll with Intersection Observer API
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .step, .testimonial, .pricing-card, .faq-item, .animate-on-scroll');
    
    // Create the observer options
    const observerOptions = {
        root: null, // viewport is the root
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element must be visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active or visible class based on element type
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.add('active');
                }
                
                // Add staggered animation delay for grid items
                if (entry.target.parentElement && 
                    (entry.target.parentElement.classList.contains('steps') || 
                     entry.target.parentElement.classList.contains('testimonials-grid') ||
                     entry.target.parentElement.classList.contains('pricing-cards'))) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Stop observing after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.guarantee');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.3; // Adjust for more or less effect
            const yPos = -(scrollY * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    });
    
    // Add hover animations for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .resume-btn, .resume-btn-prt, .service-card, .step, .testimonial, .pricing-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = element.classList.contains('pricing-card') && element.classList.contains('featured') 
                ? 'scale(1.05) translateY(-10px)' 
                : 'translateY(-10px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.classList.contains('pricing-card') && element.classList.contains('featured')
                ? 'scale(1.05)'
                : '';
        });
    });
});