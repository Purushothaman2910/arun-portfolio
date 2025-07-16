/**
 * FIXED ANIMATIONS.JS
 * This file manages all the animations on the website
 * Think of it as a "director" that tells elements when to animate
 */

class AnimationManager {
    constructor() {
        // Store all elements we're watching
        this.animatedElements = [];

        // This "observer" watches for when elements come into view
        this.intersectionObserver = null;

        // Start everything up
        this.init();
    }

    init() {
        // Set up all our animation systems
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupCounterAnimations();
        this.setupProgressAnimations();
        this.setupStaggeredAnimations();

        // console.log('Animation Manager initialized!');
    }

    /**
     * INTERSECTION OBSERVER
     * This watches for when elements come into view on the screen
     * Think of it as a "lookout" that tells us when to start animations
     */
    setupIntersectionObserver() {
        const options = {
            root: null, // Use the viewport as the root
            rootMargin: '0px 0px -50px 0px', // Start animation 50px before element is fully visible
            threshold: 0.2 // Trigger when 20% of element is visible
        };

        // Create the observer
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is now visible, animate it!
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Start watching for elements
        this.observeAnimatedElements();
    }

    /**
     * FIND AND WATCH ELEMENTS
     * This finds all elements that need animation and starts watching them
     */
    observeAnimatedElements() {
        // List of CSS classes that indicate an element should be animated
        const selectors = [
            '.animate-fade-in',
            '.animate-slide-up',
            '.animate-slide-down',
            '.animate-slide-left',
            '.animate-slide-right',
            '.animate-scale-in',
            '.scroll-animate',
            '.hero-animate-slide-up',
            '.hero-animate-slide-down',
            '.hero-animate-fade-in',
            '.service-stagger-container'
        ];

        // Find all elements with these classes
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Start watching this element
                this.intersectionObserver.observe(element);
                // Add to our list
                this.animatedElements.push(element);
            });
        });

        // console.log(`Watching ${this.animatedElements.length} elements for animation`);
    }

    /**
     * ANIMATE ELEMENT
     * This function runs when an element comes into view
     * It adds the 'active' class which triggers the CSS animation
     */
    animateElement(element) {
        // Don't animate the same element twice
        if (element.classList.contains('animated')) {
            return;
        }

        // Mark as animated
        element.classList.add('animated');

        // Add 'active' class to trigger CSS animation
        if (element.classList.contains('scroll-animate')) {
            element.classList.add('animate');
        } else if (element.classList.contains('service-stagger-container')) {
            // Handle service stagger animation
            element.classList.add('animate');
            this.animateServiceStagger(element);
        } else {
            element.classList.add('active');
        }

        // Add staggered animation class if it has one
        if (element.classList.contains('animate-stagger-1')) {
            element.classList.add('active');
        }
        if (element.classList.contains('animate-stagger-2')) {
            element.classList.add('active');
        }
        if (element.classList.contains('animate-stagger-3')) {
            element.classList.add('active');
        }
        if (element.classList.contains('animate-stagger-4')) {
            element.classList.add('active');
        }
        if (element.classList.contains('animate-stagger-5')) {
            element.classList.add('active');
        }

        // console.log('Animating element:', element.className);
    }

    /**
     * ANIMATE SERVICE STAGGER
     * Handles the stagger animation for service cards
     */
    animateServiceStagger(container) {
        const serviceItems = container.querySelectorAll('.service-stagger-item');

        serviceItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100); // 100ms delay between each item
        });
    }

    /**
     * SCROLL ANIMATIONS
     * These are animations that happen as you scroll
     */
    setupScrollAnimations() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Optional: Add scroll progress indicator
        this.setupScrollProgress();
    }

    /**
     * SCROLL PROGRESS INDICATOR
     * Shows how much of the page has been scrolled
     */
    setupScrollProgress() {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / maxScroll) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    /**
     * HOVER ANIMATIONS
     * These animations happen when you hover over elements
     */
    setupHoverAnimations() {
        // Find all cards that should have hover effects
        const cards = document.querySelectorAll('.service-card, .portfolio-card, .team-card');

        cards.forEach(card => {
            // Add hover effect classes
            card.classList.add('hover-lift');

            // Optional: Add ripple effect on click
            card.addEventListener('click', (e) => {
                this.createRippleEffect(e, card);
            });
        });

        // console.log(`Added hover effects to ${cards.length} cards`);
    }

    /**
     * RIPPLE EFFECT
     * Creates a cool ripple effect when you click on elements
     */
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Add ripple animation CSS if it doesn't exist
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Make sure the element can contain the ripple
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * COUNTER ANIMATIONS
     * These animate numbers counting up (like stats: 0 -> 100)
     */
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number, [data-counter]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        // console.log(`Set up counter animations for ${counters.length} elements`);
    }

    /**
     * ANIMATE COUNTER
     * Makes numbers count up smoothly
     */
    animateCounter(element) {
        // Don't animate the same counter twice
        if (element.classList.contains('counted')) {
            return;
        }

        element.classList.add('counted');

        // Get the target number
        const target = parseInt(element.getAttribute('data-target') || element.textContent.replace(/[^0-9]/g, ''));

        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Use easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    /**
     * PROGRESS BAR ANIMATIONS
     * Animate progress bars filling up
     */
    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-bar, [data-progress]');

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });

        // console.log(`Set up progress animations for ${progressBars.length} bars`);
    }

    /**
     * ANIMATE PROGRESS BAR
     * Makes progress bars fill up smoothly
     */
    animateProgressBar(element) {
        if (element.classList.contains('animated')) {
            return;
        }

        element.classList.add('animated');
        const progress = element.getAttribute('data-progress') || '0';

        // Start from 0 width
        element.style.width = '0%';
        element.style.transition = 'width 1.5s ease';

        // Animate to target width
        requestAnimationFrame(() => {
            element.style.width = progress + '%';
        });
    }

    /**
     * STAGGERED ANIMATIONS
     * Create wave-like effects where elements animate one after another
     */
    setupStaggeredAnimations() {
        const staggerGroups = document.querySelectorAll('.stagger-group, .services .grid > *');

        staggerGroups.forEach((group, groupIndex) => {
            let items;

            if (group.classList.contains('stagger-group')) {
                items = group.querySelectorAll('.stagger-item');
            } else {
                // For service cards, treat each card as a stagger item
                items = [group];
            }

            items.forEach((item, index) => {
                // Add stagger class based on index
                const staggerClass = `animate-stagger-${Math.min(index + 1, 5)}`;
                item.classList.add(staggerClass);
            });
        });

        // console.log(`Set up staggered animations for ${staggerGroups.length} groups`);
    }

    /**
     * PUBLIC METHODS
     * These can be called from outside this class
     */

    // Manually trigger animation on an element
    triggerAnimation(element, animationType = 'fadeIn') {
        element.classList.add(`animate-${animationType}`);
        this.animateElement(element);
    }

    // Reset all animations (useful for testing)
    resetAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animated', 'active', 'animate', 'counted');
        });

        // Re-observe elements
        this.animatedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });

        // console.log('All animations reset');
    }

    // Add a new element to be animated
    addAnimatedElement(element) {
        if (!this.animatedElements.includes(element)) {
            this.intersectionObserver.observe(element);
            this.animatedElements.push(element);
        }
    }

    // Clean up when page is unloaded
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        // console.log('Animation Manager destroyed');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create global animation manager
    window.animationManager = new AnimationManager();

    // Optional: Add some helpful global functions
    window.animateElement = (element, type) => {
        window.animationManager.triggerAnimation(element, type);
    };

    window.resetAnimations = () => {
        window.animationManager.resetAnimations();
    };
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}