// Load HTML Components
(function() {
  'use strict';

  // Function to load HTML partial
  async function loadComponent(elementId, filePath) {
    try {
      console.log(`Loading component: ${filePath} into ${elementId}`);
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
        console.log(`Successfully loaded ${filePath}`);
      } else {
        console.error(`Element not found: ${elementId}`);
      }
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      console.error('Full error details:', error);
    }
  }

  // Get current page from path
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.endsWith('index.html')) return 'home';
    if (path.includes('/about')) return 'about';
    if (path.includes('/updates')) return 'updates';
    if (path.includes('/articles')) return 'articles';
    return 'home';
  }

  // Set active nav link
  function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Initialize theme after nav is loaded
  function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const htmlElement = document.documentElement;
    const iconElement = themeToggle.querySelector('.material-symbols-outlined');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    if (currentTheme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      iconElement.textContent = 'light_mode';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
      const currentTheme = htmlElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        iconElement.textContent = 'dark_mode';
      } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        iconElement.textContent = 'light_mode';
      }
    });

    // Optional: Respect system preference on first visit
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        iconElement.textContent = 'light_mode';
      }
    }
  }

  // Initialize banner dropdown
  function initBannerDropdown() {
    const menuBtn = document.getElementById('banner-menu-btn');
    const dropdown = document.getElementById('banner-dropdown');

    if (!menuBtn || !dropdown) return;

    // Toggle dropdown on button click
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Close dropdown when clicking on a link
    const dropdownItems = dropdown.querySelectorAll('.banner-dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdown.classList.remove('show');
      });
    });
  }

  // Load components on page load
  async function init() {
    // Determine the base path for partials (adjust based on current page depth)
    const path = window.location.pathname;
    let basePath = './';

    // Count directory depth (excluding filename)
    const pathParts = path.split('/').filter(part => part && !part.endsWith('.html'));
    const depth = pathParts.length;

    // Build the correct relative path
    if (depth > 0) {
      basePath = '../'.repeat(depth);
    }

    await loadComponent('nav-placeholder', `${basePath}partials/nav.html`);
    await loadComponent('footer-placeholder', `${basePath}partials/footer.html`);

    setActiveNavLink();
    initTheme();
    initBannerDropdown();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
