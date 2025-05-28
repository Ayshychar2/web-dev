// Fix for hero section visibility
document.addEventListener('DOMContentLoaded', function() {
    // Immediately make hero section visible
    const heroSection = document.querySelector('#page1');
    const heroContent = document.querySelector('.hero-content');
    const heroElements = document.querySelectorAll('#page1 h1, #page1 .hero-subtitle, #page1 .stagger-item');
    const videoContainer = document.querySelector('.video-container');
    
    if (heroSection) {
        heroSection.classList.add('visible', 'revealed');
    }
    
    if (heroContent) {
        heroContent.classList.add('visible', 'revealed');
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
    }
    
    heroElements.forEach(element => {
        element.classList.add('visible', 'revealed');
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
    
    // Add a slight delay to the video container reveal for a nice staggered effect
    setTimeout(() => {
        if (videoContainer) {
            videoContainer.classList.add('visible', 'revealed');
            videoContainer.style.opacity = '1';
            videoContainer.style.transform = 'translateY(0)';
        }
    }, 300);
});