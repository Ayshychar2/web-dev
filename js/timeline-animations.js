// Intersection Observer for timeline animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all timeline steps
document.addEventListener('DOMContentLoaded', () => {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step, index) => {
        // Add staggered delay
        step.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(step);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for timeline animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '-50px'
        }
    );

    // Observe timeline steps with staggered delay
    document.querySelectorAll('.timeline-step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(step);
    });

    // Add hover effects
    document.querySelectorAll('.timeline-step').forEach(step => {
        step.addEventListener('mouseenter', () => {
            const number = step.querySelector('.timeline-number');
            const content = step.querySelector('.timeline-content');
            
            if (number) {
                number.style.transform = 'scale(1.1)';
                number.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.3)';
            }
            
            if (content) {
                const isLeft = step.querySelector('.timeline-content').style.textAlign === 'right';
                content.style.transform = `translateX(${isLeft ? '-' : ''}10px)`;
            }
        });

        step.addEventListener('mouseleave', () => {
            const number = step.querySelector('.timeline-number');
            const content = step.querySelector('.timeline-content');
            
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.boxShadow = 'none';
            }
            
            if (content) {
                content.style.transform = 'translateX(0)';
            }
        });
    });
}); 