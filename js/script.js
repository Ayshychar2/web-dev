// Wait for the DOM to be fully loaded
// Function to initialize testimonials properly
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        // Make first testimonial active
        testimonials[0].classList.add('active');
        testimonials[0].style.opacity = '1';
        testimonials[0].style.visibility = 'visible';
        
        // Make other testimonials semi-visible
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].classList.remove('active');
            testimonials[i].style.opacity = '0.3';
            testimonials[i].style.visibility = 'visible';
        }
    }
}

// Run on page load to initialize testimonials
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials
    initializeTestimonials();
    
    // Run again after a short delay to catch any late initializations
    setTimeout(initializeTestimonials, 500);
    
    // Also initialize when scrolling near the testimonials section
    window.addEventListener('scroll', function() {
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            const rect = testimonialsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Only initialize if not already done
                const activeTestimonials = document.querySelectorAll('.testimonial.active');
                if (activeTestimonials.length === 0) {
                    initializeTestimonials();
                }
            }
        }
    });
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
        
        gsap.set(Array.from(panels).slice(1), { 
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
    
    // Smooth scrolling for anchor links is now handled by locomotive-scroll.js
    
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
    
    // Sticky header effect with Locomotive Scroll
    const header = document.querySelector('header');
    
    if (header && window.locomotiveScroll) {
        window.locomotiveScroll.on('scroll', (instance) => {
            const scrollY = instance.scroll.y;
            if (scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    } else if (header) {
        // Fallback if Locomotive Scroll is not available
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
    
    // Parallax effect for background elements is now handled by Locomotive Scroll
    // We've added data-scroll-speed attributes to these elements
    
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

    // How We Work Section Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate each step box on scroll
    gsap.utils.toArray(".step-box").forEach((box, i) => {
        // Initial animation on scroll
        gsap.from(box, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: box,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });

        // Add click interaction
        box.addEventListener('click', function() {
            // Toggle active state for clicked box
            this.classList.toggle('active');
            
            // Animate the box on click
            gsap.to(this, {
                scale: this.classList.contains('active') ? 1.02 : 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animate the number
            const number = this.querySelector('.step-number');
            gsap.to(number, {
                scale: this.classList.contains('active') ? 1.1 : 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
    });

    // Animate step numbers (bounce effect)
    gsap.utils.toArray(".step-number").forEach((num, i) => {
        gsap.from(num, {
            scale: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: i * 0.15,
            scrollTrigger: {
                trigger: num,
                start: "top 95%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate SVG line growth - only if the element exists
    const svgLineElements = document.querySelectorAll(".svg-line line");
    const svgLineContainer = document.querySelector(".svg-line");
    
    if (svgLineElements.length > 0 && svgLineContainer) {
        gsap.from(".svg-line line", {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1,
            scrollTrigger: {
                trigger: ".svg-line",
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    }

    // Simple Testimonials Slider with Loop
    try {
        // Initialize testimonials to show the first one
        initializeTestimonials();
        
        const track = document.querySelector('.testimonials-track');
        if (!track) {
            console.log('Testimonial track not found');
            return;
        }
        
        // Add a class to indicate testimonials are initialized
        track.classList.add('testimonials-initialized');
        
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dotsNav = document.querySelector('.slider-dots');
        
        if (!nextButton || !prevButton || !dotsNav) {
            console.log('Testimonial navigation elements not found');
            return;
        }
        
        const slides = Array.from(track.children);
        if (slides.length === 0) {
            console.log('No testimonial slides found');
            return;
        }
        
        const dots = Array.from(dotsNav.children);
        
        let currentIndex = 0;
        
        // Function to update slide positions
        const updateSlides = () => {
            // Move the track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active states and ensure proper visibility
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                    slide.style.opacity = '1';
                    slide.style.visibility = 'visible';
                    slide.style.pointerEvents = 'auto';
                } else {
                    slide.classList.remove('active');
                    // Keep other slides semi-visible for smooth transitions
                    slide.style.opacity = '0.3';
                    // But disable interaction with non-active slides
                    slide.style.pointerEvents = 'none';
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };
        
        // Next slide function
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        };
        
        // Previous slide function
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        };
        
        // Event listeners for buttons
        nextButton.addEventListener('click', () => {
            // Show first testimonial when user clicks next for the first time
            if (!slides.some(slide => slide.classList.contains('active'))) {
                currentIndex = 0;
                slides[currentIndex].classList.add('active');
                slides[currentIndex].style.opacity = '1';
                slides[currentIndex].style.visibility = 'visible';
                
                // Start auto-play only after user interaction
                if (!slideInterval) {
                    slideInterval = setInterval(nextSlide, 4000);
                }
            } else {
                nextSlide();
            }
            resetInterval();
        });
        
        prevButton.addEventListener('click', () => {
            // Show first testimonial when user clicks prev for the first time
            if (!slides.some(slide => slide.classList.contains('active'))) {
                currentIndex = 0;
                slides[currentIndex].classList.add('active');
                slides[currentIndex].style.opacity = '1';
                slides[currentIndex].style.visibility = 'visible';
                
                // Start auto-play only after user interaction
                if (!slideInterval) {
                    slideInterval = setInterval(nextSlide, 4000);
                }
            } else {
                prevSlide();
            }
            resetInterval();
        });
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Show the testimonial when user clicks a dot
                currentIndex = index;
                
                // Make sure all testimonials have proper visibility
                slides.forEach((slide, i) => {
                    if (i === currentIndex) {
                        slide.classList.add('active');
                        slide.style.opacity = '1';
                        slide.style.visibility = 'visible';
                    } else {
                        slide.classList.remove('active');
                        // Don't hide other slides completely to allow for smooth transitions
                    }
                });
                
                updateSlides();
                
                // Start auto-play only after user interaction
                if (!slideInterval) {
                    slideInterval = setInterval(nextSlide, 4000);
                }
                
                resetInterval();
            });
        });
        
        // Auto-play functionality - enabled by default
        let slideInterval = setInterval(nextSlide, 4000); // Auto-play enabled
        
        // Reset interval function
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
        }
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume on mouse leave
        track.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 4000);
        });
        
        // Initial setup - show the first testimonial by default
        // Make the first slide active
        if (slides.length > 0) {
            currentIndex = 0;
            slides[0].classList.add('active');
            slides[0].style.opacity = '1';
            slides[0].style.visibility = 'visible';
            slides[0].style.pointerEvents = 'auto';
            
            // Make other slides semi-visible
            for (let i = 1; i < slides.length; i++) {
                slides[i].classList.remove('active');
                slides[i].style.opacity = '0.3';
                slides[i].style.visibility = 'visible';
                slides[i].style.pointerEvents = 'none';
            }
            
            // Update the dots
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }
        }
        
        // Run updateSlides to ensure everything is properly set up
        updateSlides();
        
        console.log('Testimonial slider initialized successfully - closed by default');
    } catch (error) {
        console.error('Error initializing testimonial slider:', error);
    }
});