// Initialize cursor elements
document.addEventListener("DOMContentLoaded", function() {
    // Create cursor elements if they don't exist
    if (!document.querySelector("#cursor")) {
        const cursor = document.createElement("div");
        cursor.id = "cursor";
        document.body.appendChild(cursor);
    }
    
    if (!document.querySelector("#cursor-blur")) {
        const cursorBlur = document.createElement("div");
        cursorBlur.id = "cursor-blur";
        document.body.appendChild(cursorBlur);
    }
    
    const crsr = document.querySelector("#cursor");
    const blur = document.querySelector("#cursor-blur");
    
    // Add cursor movement with requestAnimationFrame for smoother performance
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let blurX = -250;
    let blurY = -250;
    
    document.addEventListener("mousemove", function(dets) {
        mouseX = dets.clientX;
        mouseY = dets.clientY;
    });
    
    function animateCursor() {
        // Smooth cursor movement with easing
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        blurX += (mouseX - 250 - blurX) * 0.1;
        blurY += (mouseY - 250 - blurY) * 0.1;
        
        if (crsr && blur) {
            crsr.style.left = cursorX + "px";
            crsr.style.top = cursorY + "px";
            blur.style.left = blurX + "px";
            blur.style.top = blurY + "px";
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the animation loop
    animateCursor();
    
    // Add interactive elements
    const interactiveElements = document.querySelectorAll(".interactive-element, a, button, .btn, .card-3d, .badge");
    interactiveElements.forEach(function(elem) {
        elem.addEventListener("mouseenter", function() {
            if (crsr) {
                crsr.style.scale = 3;
                crsr.style.border = "1px solid #fff";
                crsr.style.backgroundColor = "transparent";
            }
        });
        
        elem.addEventListener("mouseleave", function() {
            if (crsr) {
                crsr.style.scale = 1;
                crsr.style.border = "0px solid #38cdfa";
                crsr.style.backgroundColor = "#38cdfa";
            }
        });
    });
    
    // Initialize 3D card hover effect
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Initialize scroll text if it exists
    if (document.querySelector('.scroll-text')) {
        const scrollText = document.querySelector('.scroll-text');
        const scrollTextInner = document.querySelector('.scroll-text-inner');
        
        if (scrollTextInner) {
            // Clone the content for continuous scrolling
            scrollText.appendChild(scrollTextInner.cloneNode(true));
        }
    }
});