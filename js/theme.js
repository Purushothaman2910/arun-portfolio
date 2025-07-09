/**
 * Theme Management
 * Handles dark/light mode toggle and persistence
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.currentTheme = this.getStoredTheme();

        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);

        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(theme) {
        this.currentTheme = theme;

        if (theme === 'dark') {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }

        // Store preference
        localStorage.setItem('theme', theme);

        // Dispatch custom event
        this.dispatchThemeChangeEvent(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't set a preference
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to check if dark mode is active
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} 