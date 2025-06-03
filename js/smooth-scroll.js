/**
 * Anchor link handler only - custom smooth scrolling disabled for performance
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Custom smooth scrolling disabled for better performance');
    
    // Handle anchor links with native smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            // Use native smooth scrolling
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.nav-menu')?.classList.remove('active');
            }
        });
    });
});