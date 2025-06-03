document.addEventListener('DOMContentLoaded', () => {
    const processSteps = document.querySelectorAll('.process-step');
    
    const animateProcessSteps = () => {
        processSteps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('animate');
            }, index * 200); // 200ms delay between each step
        });
    };

    // Initial animation
    setTimeout(animateProcessSteps, 500);

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    processSteps.forEach(step => {
        observer.observe(step);
    });
}); 