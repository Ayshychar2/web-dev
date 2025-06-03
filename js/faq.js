// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the FAQ section is visible
    const faqSection = document.getElementById('faq');
    if (faqSection) {
        faqSection.style.display = 'block';
        faqSection.style.visibility = 'visible';
        faqSection.style.opacity = '1';
        console.log('FAQ section found and made visible');
    } else {
        console.error('FAQ section not found!');
    }
    
    // Initialize FAQ with a slight delay to ensure DOM is fully processed
    setTimeout(initFaqAccordion, 100);
    
    // Also try again after a longer delay
    setTimeout(initFaqAccordion, 1000);
});

function initFaqAccordion() {
    console.log('Initializing FAQ accordion');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found ' + faqItems.length + ' FAQ items');
    
    if (faqItems.length === 0) {
        console.error('No FAQ items found!');
        return;
    }
    
    // First, ensure all FAQ items are closed but visible
    faqItems.forEach(item => {
        item.classList.remove('active');
        item.style.display = 'block'; // Make sure they're visible
        item.style.opacity = '1';
    });
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            // Log to confirm we found the question element
            console.log('Found question element for FAQ item ' + (index + 1));
            
            // Remove any existing event listeners (to avoid duplicates)
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);
            
            // Add click event listener
            newQuestion.addEventListener('click', () => {
                console.log('FAQ item clicked: ' + (index + 1));
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other items (for accordion behavior)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        } else {
            console.error('No question element found for FAQ item ' + (index + 1));
        }
    });
    
    console.log('FAQ accordion initialization complete');
}