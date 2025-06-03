// Mouse movement effects - DISABLED FOR PERFORMANCE
document.addEventListener("DOMContentLoaded", function() {
    // Disable mouse move effects for better scrolling performance
    console.log('Mouse movement effects disabled for better scrolling performance');
    
    // Only enable parallax for hero section elements
    const heroParallaxElements = document.querySelectorAll('#page1 .parallax');
    
    if (heroParallaxElements.length > 0) {
        // Use a throttled scroll event for better performance
        let lastScrollTime = 0;
        const scrollThrottleTime = 150; // Very high throttle time for better performance
        
        window.addEventListener('scroll', function() {
            // Throttle scroll events
            const now = Date.now();
            if (now - lastScrollTime < scrollThrottleTime) return;
            lastScrollTime = now;
            
            const scrollTop = window.pageYOffset;
            
            heroParallaxElements.forEach(element => {
                // Use a much smaller speed value to make the effect more subtle
                const speed = element.getAttribute('data-parallax-speed') || 0.02;
                element.style.transform = `translateY(${scrollTop * speed}px)`;
            });
        }, { passive: true });
    }
});