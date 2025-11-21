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

  // Banner content configuration per page
  const bannerContent = {
    home: {
      text: [
        'I\'m a Senior Product Engineer at <a href="https://www.buffer.com" target="_blank" rel="noopener noreferrer" class="link-accent">Buffer</a>, where I build features that help thousands of businesses manage their social media presence. With over 15 years of experience spanning full-stack development, engineering leadership, and scalable infrastructure, I\'m passionate about crafting solutions that balance technical excellence with real user impact.',
        'This is where I share my journey in tech—from weekly updates about what I\'m building and learning, to deep dives on product engineering decisions.'
      ]
    },
    updates: {
      text: ['I share weekly updates about what I\'m working on, learning, and exploring. Each week, I reflect on the features I\'m building at Buffer, technical challenges I\'m tackling, and interesting things I discover along the way—from product decisions to new tools and approaches that catch my attention.']
    },
    articles: {
      text: ['Thoughts on product engineering, team leadership, and building at scale. These are deeper explorations into the craft of building software—lessons learned from managing teams, making technical decisions, and navigating the challenges of growing products and systems.']
    },
    about: {
      text: [
        'Hi! I\'m Carlos, a Senior Software Engineer on the Core UX team at <a href="https://www.buffer.com" target="_blank" rel="noopener noreferrer" class="link-accent">Buffer</a>. I live in a small town just outside of Madrid with my wife and our two kids. I\'ve been part of Buffer for over four years now, and it\'s been such a meaningful journey—I had followed Buffer for a long time before joining, and it still feels special to be part of the team.',
        'Right now, I\'m focused on improving some of the key building blocks of our product experience—from updating legacy parts of the codebase, to bringing consistency across features, to helping shape the future of scheduling and how people build habits in Buffer.'
      ],
      isThread: true
    }
  };

  // Populate banner content
  function populateBannerContent() {
    const currentPage = getCurrentPage();
    const content = bannerContent[currentPage];

    if (!content) return;

    const bannerTextContent = document.querySelector('.banner-text-content');
    if (!bannerTextContent) return;

    // For about page (thread), handle specially
    if (content.isThread) {
      // First card gets first paragraph
      bannerTextContent.innerHTML = `<p class="banner-text">${content.text[0]}</p>`;

      // Create thread line and second card
      const bannerSection = document.querySelector('.banner-section .container');
      if (bannerSection && content.text[1]) {
        const threadLine = document.createElement('div');
        threadLine.className = 'thread-line';
        bannerSection.appendChild(threadLine);

        const secondCard = document.createElement('div');
        secondCard.className = 'banner-card banner-card-thread';
        secondCard.innerHTML = `
          <div class="banner-content">
            <p class="banner-text">${content.text[1]}</p>
          </div>
        `;
        bannerSection.appendChild(secondCard);
      }
    } else {
      // Regular pages - just insert paragraphs
      bannerTextContent.innerHTML = content.text.map(text =>
        `<p class="banner-text">${text}</p>`
      ).join('');
    }
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

  // Initialize theme after banner is loaded
  function initTheme() {
    const bannerThemeToggles = document.querySelectorAll('#banner-theme-toggle');

    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    if (currentTheme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    }

    // Update icon states
    function updateIcons() {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const isDark = currentTheme === 'dark';

      bannerThemeToggles.forEach(toggle => {
        if (toggle) {
          const iconElement = toggle.querySelector('.material-symbols-outlined');
          if (iconElement) {
            iconElement.textContent = isDark ? 'light_mode' : 'dark_mode';
          }
        }
      });
    }

    // Initial icon update
    updateIcons();

    // Function to toggle theme
    function toggleTheme() {
      const currentTheme = htmlElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }

      updateIcons();
    }

    // Toggle theme on banner button click
    bannerThemeToggles.forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('click', toggleTheme);
      }
    });

    // Optional: Respect system preference on first visit
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateIcons();
      }
    }
  }

  // Initialize banner dropdown
  function initBannerDropdown() {
    const menuBtn = document.getElementById('banner-menu-btn');
    const mobileMenuBtn = document.getElementById('banner-mobile-menu-btn');
    const dropdown = document.getElementById('banner-dropdown');

    if ((!menuBtn && !mobileMenuBtn) || !dropdown) return;

    // Toggle dropdown on desktop button click
    if (menuBtn) {
      menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
    }

    // Toggle dropdown on mobile button click
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      const isMenuBtn = menuBtn && menuBtn.contains(e.target);
      const isMobileMenuBtn = mobileMenuBtn && mobileMenuBtn.contains(e.target);
      if (!isMenuBtn && !isMobileMenuBtn && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Close dropdown when clicking on menu items
    const dropdownItems = dropdown.querySelectorAll('.banner-dropdown-item, .banner-dropdown-contact-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdown.classList.remove('show');
      });
    });
  }

  // Initialize like buttons
  function initLikeButtons() {
    const currentPage = getCurrentPage();
    const likeKey = `banner-liked-${currentPage}`;

    // Get all like buttons (first banner-action in each card)
    const likeButtons = document.querySelectorAll('.banner-action:first-child');

    likeButtons.forEach(button => {
      // Check if this page is already liked
      const isLiked = localStorage.getItem(likeKey) === 'true';

      if (isLiked) {
        button.classList.add('liked');
      }

      // Add click handler
      button.addEventListener('click', function(e) {
        e.preventDefault();

        // Toggle liked state
        const currentlyLiked = button.classList.contains('liked');

        if (currentlyLiked) {
          button.classList.remove('liked');
          localStorage.setItem(likeKey, 'false');
        } else {
          button.classList.add('liked');
          localStorage.setItem(likeKey, 'true');

          // Trigger animation by removing and re-adding the class
          button.classList.remove('liked');
          void button.offsetWidth; // Force reflow
          button.classList.add('liked');
        }
      });
    });
  }

  // Initialize share buttons
  function initShareButtons() {
    // Get all share buttons (third banner-action in each card, after like and message)
    const shareButtons = document.querySelectorAll('.banner-actions .banner-action:nth-child(3)');

    shareButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();

        const url = window.location.href;
        const title = document.title;
        const text = document.querySelector('meta[name="description"]')?.content || title;

        // Try Web Share API first (mobile-friendly)
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              text: text,
              url: url
            });
            console.log('Shared successfully');
          } catch (err) {
            // User cancelled or error occurred
            if (err.name !== 'AbortError') {
              console.log('Share failed, falling back to clipboard');
              copyToClipboard(url, button);
            }
          }
        } else {
          // Fallback to clipboard
          copyToClipboard(url, button);
        }
      });
    });
  }

  // Copy URL to clipboard with visual feedback
  async function copyToClipboard(url, button) {
    try {
      await navigator.clipboard.writeText(url);
      showCopyFeedback(button);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showCopyFeedback(button);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  }

  // Initialize avatar click handlers
  function initAvatarClick() {
    const avatarImages = document.querySelectorAll('.banner-profile-image');

    avatarImages.forEach(image => {
      image.style.cursor = 'pointer';
      image.addEventListener('click', function(e) {
        e.preventDefault();
        // Get the base path
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part && !part.endsWith('.html'));
        const depth = pathParts.length;
        const basePath = depth > 0 ? '../'.repeat(depth) : './';

        window.location.href = basePath + 'index.html';
      });
    });
  }

  // Show "Copied!" feedback
  function showCopyFeedback(button) {
    const originalColor = button.style.color;
    button.style.color = 'var(--accent-color)';

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    button.style.position = 'relative';
    button.appendChild(tooltip);

    // Remove tooltip after animation
    setTimeout(() => {
      tooltip.remove();
      button.style.color = originalColor;
    }, 2000);
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
    await loadComponent('banner-placeholder', `${basePath}partials/banner.html`);
    await loadComponent('footer-placeholder', `${basePath}partials/footer.html`);

    populateBannerContent();
    setActiveNavLink();
    initTheme();
    initBannerDropdown();
    initLikeButtons();
    initShareButtons();
    initAvatarClick();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
