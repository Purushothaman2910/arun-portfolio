/**
 * Navigation Management
 * Handles smooth scrolling, mobile menu, and active navigation states
 */

class NavigationManager {
    constructor() {
        this.header = document.querySelector('header');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');

        this.isMobileMenuOpen = false;
        this.scrollThreshold = 100;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.handleInitialScroll();
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Resize events
        window.addEventListener('resize', () => this.handleResize());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNav(entry.target.id);
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    handleNavClick(e) {
        e.preventDefault();

        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            this.scrollToSection(targetSection);
            this.closeMobileMenu();
        }
    }

    scrollToSection(section) {
        const headerHeight = this.header ? this.header.offsetHeight : 0;
        const targetPosition = section.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('hidden', !this.isMobileMenuOpen);
        }

        // Update button icon
        this.updateMobileMenuIcon();

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.isMobileMenuOpen = false;

            if (this.mobileMenu) {
                this.mobileMenu.classList.add('hidden');
            }

            this.updateMobileMenuIcon();
            document.body.style.overflow = '';
        }
    }

    updateMobileMenuIcon() {
        if (!this.mobileMenuBtn) return;

        const icon = this.mobileMenuBtn.querySelector('svg');
        if (!icon) return;

        const paths = icon.querySelectorAll('path');

        if (this.isMobileMenuOpen) {
            // Show close icon (X)
            paths[0].setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            // Show hamburger icon
            paths[0].setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class to header
        if (this.header) {
            if (scrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }

        // Close mobile menu on scroll
        if (this.isMobileMenuOpen && scrollY > 50) {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        // Close mobile menu on resize if screen becomes larger
        if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleOutsideClick(e) {
        if (this.isMobileMenuOpen &&
            !this.mobileMenu?.contains(e.target) &&
            !this.mobileMenuBtn?.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    handleKeydown(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    updateActiveNav(sectionId) {
        // Remove active class from all nav links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section's nav link
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    handleInitialScroll() {
        // Set initial active nav based on current scroll position
        const scrollY = window.scrollY;
        const headerHeight = this.header ? this.header.offsetHeight : 0;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop - headerHeight - 100;

            if (scrollY >= sectionTop) {
                this.updateActiveNav(section.id);
                break;
            }
        }
    }

    // Public method to scroll to a specific section
    scrollToSectionById(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.scrollToSection(section);
        }
    }

    // Public method to get current active section
    getCurrentSection() {
        const scrollY = window.scrollY;
        const headerHeight = this.header ? this.header.offsetHeight : 0;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop - headerHeight - 100;

            if (scrollY >= sectionTop) {
                return section.id;
            }
        }

        return null;
    }

    // Public method to check if mobile menu is open
    isMobileMenuOpen() {
        return this.isMobileMenuOpen;
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
} 