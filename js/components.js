// components.js - Complete updated version with click-based dropdown and mobile dropdown
document.addEventListener('DOMContentLoaded', function () {
  // Insert header using template literal
  document.body.insertAdjacentHTML('afterbegin', headerTemplate);

  // Insert footer using template literal
  document.body.insertAdjacentHTML('beforeend', footerTemplate);

  // Initialize components
  initNavigation();
  initTheme();
  highlightCurrentPage();
});

// Header template with click-based dropdown and mobile dropdown
const headerTemplate = `
<header class="sticky top-0 z-50 bg-white dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo/Brand -->
      <div class="">
          <a href="../index.html" class="flex items-center text-xl font-bold text-gray-900 dark:text-white">
            <img src="../assets/logo2.jpg" alt="AK Creative Studio Logo" class="w-10 h-10 mr-2" />
            AK Creative Studio
          </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:block">
        <ul class="flex items-center space-x-8">
          <li><a href="/index.html" class="nav-link">Home</a></li>
          <li><a href="/pages/about.html" class="nav-link">About</a></li>
          <li class="relative">
            <button id="services-dropdown-btn" class="flex items-center nav-link focus:outline-none" aria-expanded="false" aria-haspopup="true">
              Services
              <svg class="w-4 h-4 ml-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="services-dropdown" class="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden transition-all duration-200 origin-top">
              <a href="/pages/seo.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Search Engine Optimization</a>
              <a href="/pages/web-des.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Web Design</a>
              <a href="/pages/social-media.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Social Media Marketing</a>
              <a href="/pages/ads.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Google and Meta Ads</a>
              <a href="/pages/content-writting.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Content Writing</a>
              <a href="/pages/graphic-design.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Graphic Design</a>
              <a href="/pages/ui-ux-design.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">UI/UX Design</a>
              <a href="/pages/video-marketing.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Video Marketing</a>
              <a href="/pages/digital-marketing.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Digital Marketing</a>
              <a href="/pages/web-dev.html" class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Web Development</a>
            </div>
          </li>
          <li><a href="/pages/contact.html" class="nav-link">Contact</a></li>
        </ul>
      </nav>

      <!-- Theme Toggle and Mobile Menu Button -->
      <div class="flex items-center space-x-4">
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path class="dark:hidden" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            <path class="hidden dark:block" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        </button>

        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <svg id="icon-hamburger" class="w-6 h-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="hidden md:hidden pb-4 max-h-96 overflow-y-auto">
      <ul class="space-y-2">
        <li><a href="/index.html" class="mobile-nav-link">Home</a></li>
        <li><a href="/pages/about.html" class="mobile-nav-link">About</a></li>
        <li>
          <button id="mobile-services-dropdown-btn" class="w-full flex items-center justify-between mobile-nav-link text-left focus:outline-none" aria-expanded="false" aria-haspopup="true">
            Services
            <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="mobile-services-dropdown" class="hidden pl-4 mt-1 space-y-1">
            <a href="/pages/seo.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Search Engine Optimization</a>
            <a href="/pages/web-des.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Web Design</a>
            <a href="/pages/social-media.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Social Media Marketing</a>
            <a href="/pages/ads.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Google and Meta Ads</a>
            <a href="/pages/content-writting.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Content Writing</a>
            <a href="/pages/graphic-design.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Graphic Design</a>
            <a href="/pages/ui-ux-design.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">UI/UX Design</a>
            <a href="/pages/video-marketing.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Video Marketing</a>
            <a href="/pages/digital-marketing.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Digital Marketing</a>
            <a href="/pages/web-dev.html" class="block py-2 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200">Web Development</a>
          </div>
        </li>
        <li><a href="/pages/contact.html" class="mobile-nav-link">Contact</a></li>
      </ul>
    </div>
  </div>
</header>
`;

// Footer template
const footerTemplate = `
<footer class="bg-gray-900 dark:bg-black text-white py-12 w-full">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-4 gap-8">
      <div class="md:col-span-2">
        <h3 class="text-xl font-bold mb-4">AK Creative Studio</h3>
        <p class="text-gray-300 mb-4">
          A professional business portfolio website template built with modern
          web technologies.
        </p>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li><a href="/pages/index.html" class="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
          <li><a href="/pages/about.html" class="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
          <li><a href="#services" class="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
          <li><a href="/pages/contact.html" class="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4">Contact</h4>
        <ul class="space-y-2 text-gray-300">
          <li>contact@example.com</li>
          <li>+1 (555) 123-4567</li>
          <li>123 Business St, City, State</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
      <p>&copy; ${new Date().getFullYear()} AK Creative Studio. All rights reserved.</p>
    </div>
  </div>
</footer>
`;

// Initialize navigation with click-based dropdown
function initNavigation() {
  // Clear any existing navigation manager
  if (window.simpleNav) {
    window.simpleNav = null;
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const servicesDropdownBtn = document.getElementById('services-dropdown-btn');
  const servicesDropdown = document.getElementById('services-dropdown');
  const mobileServicesDropdownBtn = document.getElementById('mobile-services-dropdown-btn');
  const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');

  console.log('Initializing navigation...');

  // Initialize mobile navigation
  if (mobileMenuBtn && mobileMenu) {
    window.simpleNav = new SimpleNavigationManager();
    console.log('Mobile navigation initialized successfully');
  } else {
    console.error('Failed to find mobile navigation elements');
  }

  // Initialize desktop services dropdown
  if (servicesDropdownBtn && servicesDropdown) {
    // Click handler for dropdown button
    servicesDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = servicesDropdown.classList.toggle('hidden');
      servicesDropdownBtn.setAttribute('aria-expanded', !isExpanded);

      // Rotate chevron icon
      const chevron = servicesDropdownBtn.querySelector('svg');
      chevron.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!servicesDropdown.contains(e.target) && e.target !== servicesDropdownBtn) {
        servicesDropdown.classList.add('hidden');
        servicesDropdownBtn.setAttribute('aria-expanded', 'false');
        const chevron = servicesDropdownBtn.querySelector('svg');
        chevron.style.transform = 'rotate(0deg)';
      }
    });

    // Keyboard navigation support
    servicesDropdownBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        servicesDropdownBtn.click();
      } else if (e.key === 'Escape' && !servicesDropdown.classList.contains('hidden')) {
        servicesDropdown.classList.add('hidden');
        servicesDropdownBtn.setAttribute('aria-expanded', 'false');
        const chevron = servicesDropdownBtn.querySelector('svg');
        chevron.style.transform = 'rotate(0deg)';
      }
    });

    console.log('Desktop services dropdown initialized');
  } else {
    console.error('Failed to find desktop services dropdown elements');
  }

  // Initialize mobile services dropdown
  if (mobileServicesDropdownBtn && mobileServicesDropdown) {
    // Click handler for mobile dropdown button
    mobileServicesDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = mobileServicesDropdown.classList.toggle('hidden');
      mobileServicesDropdownBtn.setAttribute('aria-expanded', !isExpanded);

      // Rotate chevron icon
      const chevron = mobileServicesDropdownBtn.querySelector('svg');
      chevron.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Keyboard navigation support for mobile dropdown
    mobileServicesDropdownBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileServicesDropdownBtn.click();
      } else if (e.key === 'Escape' && !mobileServicesDropdown.classList.contains('hidden')) {
        mobileServicesDropdown.classList.add('hidden');
        mobileServicesDropdownBtn.setAttribute('aria-expanded', 'false');
        const chevron = mobileServicesDropdownBtn.querySelector('svg');
        chevron.style.transform = 'rotate(0deg)';
      }
    });

    console.log('Mobile services dropdown initialized');
  } else {
    console.error('Failed to find mobile services dropdown elements');
  }
}

// Initialize theme manager
function initTheme() {
  // Clear any existing theme manager
  if (window.themeManager) {
    window.themeManager = null;
  }

  const themeToggle = document.getElementById('theme-toggle');
  console.log('Theme toggle button found:', !!themeToggle);

  if (themeToggle) {
    // Initialize your theme manager
    window.themeManager = new ThemeManager();
    console.log('Theme manager initialized successfully');
  } else {
    console.error('Failed to find theme toggle button');
  }
}

// Highlight current page in navigation
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref && currentPage.includes(linkHref.replace('../', ''))) {
      link.classList.add('text-blue-600', 'dark:text-blue-400');
      link.classList.remove('text-gray-900', 'dark:text-white');
    }
  });
}