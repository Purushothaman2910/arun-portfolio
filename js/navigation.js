/**
 * Simple Navigation Menu Handler
 * Focuses only on menu bar opening/closing and hamburger icon toggle
 */

class SimpleNavigationManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.hamburgerIcon = document.getElementById('icon-hamburger');
        this.closeIcon = document.getElementById('icon-close');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        this.isMenuOpen = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.ensureInitialState();
    }

    setupEventListeners() {
        // Mobile menu toggle button
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking on mobile nav links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen &&
                !this.mobileMenu.contains(e.target) &&
                !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;

        // Show mobile menu
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('hidden');
        }

        // Update icons
        this.updateIcons();

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        // console.log('Mobile menu opened');
    }

    closeMobileMenu() {
        this.isMenuOpen = false;

        // Hide mobile menu
        if (this.mobileMenu) {
            this.mobileMenu.classList.add('hidden');
        }

        // Update icons
        this.updateIcons();

        // Restore body scrolling
        document.body.style.overflow = '';

        // console.log('Mobile menu closed');
    }

    updateIcons() {
        if (!this.hamburgerIcon || !this.closeIcon) return;

        if (this.isMenuOpen) {
            // Show close icon, hide hamburger
            this.hamburgerIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
        } else {
            // Show hamburger, hide close icon
            this.hamburgerIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
        }
    }

    ensureInitialState() {
        // Ensure menu starts closed
        this.isMenuOpen = false;

        if (this.mobileMenu) {
            this.mobileMenu.classList.add('hidden');
        }

        // Ensure correct initial icon state
        this.updateIcons();

        // Ensure body scrolling is enabled
        document.body.style.overflow = '';
    }

    // Public methods for external use
    isOpen() {
        return this.isMenuOpen;
    }

    forceClose() {
        this.closeMobileMenu();
    }

    // Debug method
    debug() {
        console.log('Navigation Debug Info:');
        console.log('- Menu button:', this.mobileMenuBtn);
        console.log('- Mobile menu:', this.mobileMenu);
        console.log('- Hamburger icon:', this.hamburgerIcon);
        console.log('- Close icon:', this.closeIcon);
        console.log('- Menu is open:', this.isMenuOpen);
        console.log('- Menu classes:', this.mobileMenu?.className);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing navigation manager
    if (window.navigationManager) {
        window.navigationManager = null;
    }

    // Create new simple navigation manager
    window.simpleNav = new SimpleNavigationManager();

    // console.log('Simple navigation manager initialized');
});

// Fallback initialization if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.simpleNav) {
            window.simpleNav = new SimpleNavigationManager();
        }
    });
} else {
    // DOM is already loaded
    if (!window.simpleNav) {
        window.simpleNav = new SimpleNavigationManager();
    }
}