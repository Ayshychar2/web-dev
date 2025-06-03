document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // The lower the faster

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        // Calculate increment based on target value
        const inc = target / speed;
        
        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };

    // Use Intersection Observer to trigger counter when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); // Only trigger once
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all counter elements
    counters.forEach(counter => {
        observer.observe(counter);
    });
}); 