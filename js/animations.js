/**
 * Animation Management
 * Handles scroll-triggered animations and interactive effects
 */

class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.intersectionObserver = null;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        this.observeAnimatedElements();
    }

    observeAnimatedElements() {
        const selectors = [
            '.animate-fade-in',
            '.animate-slide-up',
            '.animate-slide-left',
            '.animate-slide-right',
            '.animate-scale-in',
            '.scroll-animate'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.intersectionObserver.observe(element);
                this.animatedElements.push(element);
            });
        });
    }

    animateElement(element) {
        if (element.classList.contains('animated')) return;

        // Add animated class to prevent re-animation
        element.classList.add('animated');

        // Trigger animation based on class
        if (element.classList.contains('animate-fade-in')) {
            this.fadeIn(element);
        } else if (element.classList.contains('animate-slide-up')) {
            this.slideUp(element);
        } else if (element.classList.contains('animate-slide-left')) {
            this.slideInLeft(element);
        } else if (element.classList.contains('animate-slide-right')) {
            this.slideInRight(element);
        } else if (element.classList.contains('animate-scale-in')) {
            this.scaleIn(element);
        } else if (element.classList.contains('scroll-animate')) {
            this.scrollAnimate(element);
        }
    }

    fadeIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-40px)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(40px)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    scrollAnimate(element) {
        element.classList.add('animate');
    }

    setupScrollAnimations() {
        // Counter animations for stats
        this.setupCounterAnimations();

        // Progress bar animations
        this.setupProgressAnimations();

        // Staggered animations for lists
        this.setupStaggeredAnimations();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');

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
    }

    animateCounter(element) {
        if (element.classList.contains('counted')) return;

        element.classList.add('counted');
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-bar');

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
    }

    animateProgressBar(element) {
        if (element.classList.contains('animated')) return;

        element.classList.add('animated');
        const progress = element.getAttribute('data-progress') || '0';

        element.style.width = '0%';
        element.style.transition = 'width 1.5s ease';

        requestAnimationFrame(() => {
            element.style.width = progress + '%';
        });
    }

    setupStaggeredAnimations() {
        const lists = document.querySelectorAll('.stagger-list');

        lists.forEach(list => {
            const items = list.querySelectorAll('.stagger-item');

            const listObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateStaggeredItems(items);
                    }
                });
            }, { threshold: 0.3 });

            listObserver.observe(list);
        });
    }

    animateStaggeredItems(items) {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        });
    }

    setupHoverAnimations() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.service-card, .portfolio-card, .team-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }

    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');

        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Public method to trigger animation manually
    triggerAnimation(element, animationType = 'fadeIn') {
        switch (animationType) {
            case 'fadeIn':
                this.fadeIn(element);
                break;
            case 'slideUp':
                this.slideUp(element);
                break;
            case 'slideLeft':
                this.slideInLeft(element);
                break;
            case 'slideRight':
                this.slideInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            default:
                this.fadeIn(element);
        }
    }

    // Public method to reset animations
    resetAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animated', 'counted');
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = '';
        });

        // Re-observe elements
        this.animatedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    // Public method to add new animated element
    addAnimatedElement(element) {
        this.intersectionObserver.observe(element);
        this.animatedElements.push(element);
    }

    // Cleanup method
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
} 