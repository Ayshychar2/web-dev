document.addEventListener('DOMContentLoaded', function() {
    // Wait for window load to ensure all resources are loaded
    window.addEventListener('load', function() {
        const slides = document.querySelectorAll('.slide');
        
        // If no slides, exit early
        if (!slides.length) return;
        
        let currentSlide = 0;
        let isTransitioning = false;
        const slideInterval = 8000; // Change slide every 8 seconds (longer to allow video viewing)
        let slideTimer = null;
        
        // Initialize videos
        function initializeVideos() {
            // Get all videos in slides
            const videos = document.querySelectorAll('.hero-video');
            
            // Pause all videos initially
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
            
            // Play video in active slide
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) {
                const activeVideo = activeSlide.querySelector('.hero-video');
                if (activeVideo) {
                    // Make sure video is visible
                    activeVideo.style.opacity = 1;
                    // Play the video
                    activeVideo.play().catch(e => {
                        console.log('Video autoplay prevented by browser:', e);
                    });
                }
            }
        }
        
        // Call initialize videos on page load
        initializeVideos();
        
        // Use setTimeout instead of requestAnimationFrame for better performance
        function startSlideTimer() {
            // Clear any existing timer
            if (slideTimer) clearTimeout(slideTimer);
            
            // Set new timer
            slideTimer = setTimeout(() => {
                if (!isTransitioning) {
                    changeSlide();
                }
                startSlideTimer(); // Restart timer
            }, slideInterval);
        }
        
        function changeSlide() {
            isTransitioning = true;
            
            // Pause current video
            const currentVideo = slides[currentSlide].querySelector('.hero-video');
            if (currentVideo) {
                currentVideo.pause();
                currentVideo.currentTime = 0;
            }
            
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Calculate next slide index
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to next slide
            slides[currentSlide].classList.add('active');
            
            // Play next video
            const nextVideo = slides[currentSlide].querySelector('.hero-video');
            if (nextVideo) {
                // Small delay to ensure slide transition has started
                setTimeout(() => {
                    nextVideo.play().catch(e => {
                        console.log('Video autoplay prevented by browser:', e);
                    });
                }, 100);
            }
            
            // Allow next transition after current one completes
            setTimeout(() => {
                isTransitioning = false;
            }, 1000); // Match this with the CSS transition duration
        }
        
        // Start the slideshow
        startSlideTimer();
        
        // Pause slideshow when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && slideTimer) {
                clearTimeout(slideTimer);
                slideTimer = null;
                
                // Pause all videos when page is not visible
                const videos = document.querySelectorAll('.hero-video');
                videos.forEach(video => {
                    video.pause();
                });
            } else if (!document.hidden && !slideTimer) {
                startSlideTimer();
                
                // Resume video in active slide
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) {
                    const activeVideo = activeSlide.querySelector('.hero-video');
                    if (activeVideo) {
                        activeVideo.play().catch(e => {
                            console.log('Video autoplay prevented by browser:', e);
                        });
                    }
                }
            }
        });
        
        // Pause slideshow when user interacts with the page
        let userInteractionTimeout;
        const userInteractionEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        
        userInteractionEvents.forEach(event => {
            document.addEventListener(event, () => {
                // Clear existing timer
                if (slideTimer) {
                    clearTimeout(slideTimer);
                    slideTimer = null;
                }
                
                // Clear existing interaction timeout
                if (userInteractionTimeout) {
                    clearTimeout(userInteractionTimeout);
                }
                
                // Set new timeout to restart slideshow after user stops interacting
                userInteractionTimeout = setTimeout(() => {
                    startSlideTimer();
                }, 8000);
            }, { passive: true });
        });
    });
}); 