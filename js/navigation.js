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

        // Verify all required elements exist
        if (!this.mobileMenuBtn || !this.mobileMenu) {
            console.error('Navigation Manager: Required elements not found');
            console.error('Mobile menu button:', this.mobileMenuBtn);
            console.error('Mobile menu:', this.mobileMenu);
            return;
        }

        this.init();
    }

    init() {
        console.log("Initializing navigation with elements:");
        console.log("this.mobileMenuBtn : ", this.mobileMenuBtn);
        console.log("this.mobileMenu : ", this.mobileMenu);
        console.log("this.hamburgerIcon : ", this.hamburgerIcon);
        console.log("this.closeIcon : ", this.closeIcon);
        console.log("this.mobileNavLinks : ", this.mobileNavLinks);

        this.setupEventListeners();
        this.ensureInitialState();
        console.log("Navigation initialized successfully");
    }

    setupEventListeners() {
        // Mobile menu toggle button
        if (this.mobileMenuBtn) {
            console.log('Adding click listener to mobile menu button');
            this.mobileMenuBtn.addEventListener('click', (e) => {
                console.log('Mobile menu button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking on mobile nav links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (link.id === 'mobile-services-dropdown-btn') {
                    return;
                }
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
        console.log("toggleMobileMenu called, current state:", this.isMenuOpen);
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        console.log("Opening mobile menu");
        this.isMenuOpen = true;

        // Show mobile menu
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('hidden');
            console.log("Removed 'hidden' class from mobile menu");
        }

        // Update icons
        this.updateIcons();

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        console.log('Mobile menu opened');
    }

    closeMobileMenu() {
        console.log("Closing mobile menu");
        this.isMenuOpen = false;

        // Hide mobile menu
        if (this.mobileMenu) {
            this.mobileMenu.classList.add('hidden');
            console.log("Added 'hidden' class to mobile menu");
        }

        // Update icons
        this.updateIcons();

        // Restore body scrolling
        document.body.style.overflow = '';

        console.log('Mobile menu closed');
    }

    updateIcons() {
        if (!this.hamburgerIcon || !this.closeIcon) {
            console.log('Icons not found, skipping icon update');
            return;
        }

        if (this.isMenuOpen) {
            // Show close icon, hide hamburger
            this.hamburgerIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            console.log('Switched to close icon');
        } else {
            // Show hamburger, hide close icon
            this.hamburgerIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            console.log('Switched to hamburger icon');
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

        console.log('Initial state set: menu closed');
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

// Remove the automatic initialization - let components.js handle it
// This prevents conflicts and race conditions