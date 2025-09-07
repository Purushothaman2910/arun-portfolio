// JavaScript for animating client logos when they come into view
document.addEventListener('DOMContentLoaded', function () {
    initClientLogoAnimation();
});

function initClientLogoAnimation() {
    // Create Intersection Observer for client logos
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
    };

    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');

                // Optional: Add smooth-reveal class to logos for alternative animation
                const logo = entry.target.querySelector('.client-logo');
                if (logo) {
                    logo.classList.add('smooth-reveal');
                }

                // Stop observing this element after animation triggers
                logoObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all client cards
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach((card) => {
        logoObserver.observe(card);
    });
}

// Alternative: More customizable approach with manual control
function initAdvancedClientAnimation() {
    const clientCards = document.querySelectorAll('.client-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on card position
                setTimeout(() => {
                    entry.target.classList.add('animate-in');

                    // Trigger custom animation event
                    const customEvent = new CustomEvent('logoAnimationStart', {
                        detail: { card: entry.target }
                    });
                    document.dispatchEvent(customEvent);

                }, index * 100); // 100ms delay between each card

                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    clientCards.forEach((card) => {
        cardObserver.observe(card);
    });
}

// Event listener for custom logo animation events
document.addEventListener('logoAnimationStart', (event) => {
    const card = event.detail.card;
    const logo = card.querySelector('.client-logo');

    if (logo) {
        // Add any additional custom effects here
        console.log('Logo animation started for:', card);
    }
});

// Optional: Reset animations when user scrolls back up (for demo purposes)
function enableLogoAnimationReset() {
    let hasScrolledDown = false;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            hasScrolledDown = true;
        } else if (hasScrolledDown && scrollTop < 50) {
            // Reset animations when scrolling back to top
            const animatedCards = document.querySelectorAll('.client-card.animate-in');
            animatedCards.forEach((card) => {
                card.classList.remove('animate-in');
                const logo = card.querySelector('.client-logo');
                if (logo) {
                    logo.classList.remove('smooth-reveal');
                }
            });

            // Re-initialize observer
            setTimeout(() => {
                initClientLogoAnimation();
            }, 100);

            hasScrolledDown = false;
        }
    });
}

// Call the animation initialization
// Use initClientLogoAnimation() for basic setup
// or initAdvancedClientAnimation() for more control
initClientLogoAnimation();

// Uncomment the line below if you want the reset functionality
// enableLogoAnimationReset();