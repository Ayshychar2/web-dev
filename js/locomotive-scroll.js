// Locomotive Scroll implementation - DISABLED FOR PERFORMANCE
console.log('Locomotive Scroll disabled for better scrolling performance');

// Only handle sticky header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }, { passive: true });
});