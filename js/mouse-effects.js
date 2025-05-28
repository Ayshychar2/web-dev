// Mouse movement effects
document.addEventListener("DOMContentLoaded", function() {
    // Mouse move elements with smooth animation
    const mouseMoveElements = document.querySelectorAll('.mouse-move');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Store positions for each element
    const elementPositions = new Map();
    
    // Initialize positions
    mouseMoveElements.forEach(element => {
        elementPositions.set(element, {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            speed: parseInt(element.getAttribute('data-move-speed')) || 5
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        mouseMoveElements.forEach(element => {
            const data = elementPositions.get(element);
            data.targetX = (window.innerWidth / 2 - mouseX) / data.speed;
            data.targetY = (window.innerHeight / 2 - mouseY) / data.speed;
        });
    });
    
    // Animation loop for smooth movement
    function animateElements() {
        mouseMoveElements.forEach(element => {
            const data = elementPositions.get(element);
            
            // Apply easing
            data.x += (data.targetX - data.x) * 0.1;
            data.y += (data.targetY - data.y) * 0.1;
            
            element.style.transform = `translate(${data.x}px, ${data.y}px)`;
        });
        
        requestAnimationFrame(animateElements);
    }
    
    // Start animation loop
    animateElements();
    
    // Parallax effect for background elements - modified to be more subtle
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // Use a much smaller speed value to make the effect more subtle
            const speed = element.getAttribute('data-parallax-speed') || 0.05;
            
            // Don't apply parallax to elements in the hero section
            if (!element.closest('#page1')) {
                element.style.transform = `translateY(${scrollTop * speed}px)`;
            }
        });
    });
    
    // We've removed the floating stars functionality as requested
    // The mouse cursor effects are still active
});