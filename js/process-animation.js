document.addEventListener('DOMContentLoaded', () => {
    const processSteps = document.querySelectorAll('.process-step');
    const processHeader = document.querySelector('.process-header');
    
    // Function to check if an element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * 0.8 &&
            rect.bottom >= 0
        );
    };

    // Function to animate numbers
    const animateNumber = (element) => {
        const number = element.textContent.padStart(2, '0');
        element.style.transform = 'scale(0.5) rotate(-15deg)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.transform = 'scale(1) rotate(0deg)';
            element.style.opacity = '1';
        }, 200);
    };

    // Function to handle scroll and show elements
    const handleScroll = () => {
        // Animate header if in viewport
        if (isInViewport(processHeader) && !processHeader.classList.contains('visible')) {
            processHeader.classList.add('visible');
        }

        // Animate steps
        processSteps.forEach((step, index) => {
            if (isInViewport(step) && !step.classList.contains('visible')) {
                // Add delay based on index for sequential animation
                setTimeout(() => {
                    step.classList.add('visible');
                    
                    // Animate the number
                    const numberElement = step.querySelector('.step-number');
                    animateNumber(numberElement);

                    // Add hover effect after animation
                    step.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 200); // 200ms delay between each step
            }
        });
    };

    // Function to handle scroll with throttling
    let scrollTimeout;
    const throttledScroll = () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 50); // Throttle to 50ms
        }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttledScroll);
    
    // Add intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleScroll();
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe the process section
    const processSection = document.querySelector('.process-section');
    observer.observe(processSection);
}); 