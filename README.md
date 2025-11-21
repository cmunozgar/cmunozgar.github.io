# Personal Website - Carlos Muñoz

A modern, minimal personal website built with pure HTML, CSS, and JavaScript featuring a Twitter/X-inspired design system.

## Structure

```
/
├── index.html          # Main page
├── about/
│   └── index.html      # About page
├── articles/
│   └── index.html      # Articles listing
├── updates/
│   └── index.html      # Weekly updates
├── partials/
│   ├── banner.html     # Tweet-style banner component
│   ├── footer.html     # Footer component
│   └── nav.html        # Navigation component
├── assets/
│   ├── js/
│   │   └── theme-init.js  # Theme initialization script
│   ├── hardhat.svg     # Site favicon
│   └── og-image.png    # Social sharing image
├── script.js           # Main JavaScript
├── styles.css          # Main stylesheet
├── sitemap.xml         # SEO sitemap
├── gulpfile.js         # Development server config
├── CNAME              # Custom domain configuration
└── LICENSE            # MIT License
```

## Features

- **Modern Design**: Twitter/X-inspired banner card with interactive elements
- **Dark Mode**: System-aware theme with manual toggle, persisted in localStorage
- **Component-Based**: Reusable HTML partials for banner, navigation, and footer
- **SEO Optimized**: Complete Open Graph and Twitter Card meta tags, XML sitemap
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Development Server**: Gulp-based BrowserSync server with live reload
- **Weekly Updates**: Dedicated section for sharing weekly work updates
- **Articles**: Portfolio of published technical articles
- **Social Integration**: LinkedIn, Threads, and email contact links

## Development

### Quick Start

The recommended way to develop locally is using the included Gulp development server:

```bash
# Install dependencies
npm install

# Start development server (opens browser automatically)
npm start
# or
npm run serve
```

The server will start at `http://localhost:8000` with live reload enabled.

### Alternative Methods

You can also serve it with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

### Project Technologies

- **HTML5**: Semantic markup with component-based partials
- **CSS3**: Custom properties (CSS variables) for theming
- **JavaScript (ES6+)**: Dynamic component loading and theme management
- **Inter Font**: Google Fonts integration for typography
- **Material Symbols**: Google's icon font for UI elements
- **BrowserSync**: Development server with live reload

## Deployment

This site can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Customization

### Content Updates

- **Banner**: Edit [partials/banner.html](partials/banner.html) to update profile information and links
- **Weekly Updates**: Add new updates to [updates/index.html](updates/index.html)
- **Articles**: Add new articles to [articles/index.html](articles/index.html)
- **About Page**: Edit [about/index.html](about/index.html) for biography and experience
- **Social Links**: Update contact links in the banner dropdown menu

### Styling

The site uses CSS custom properties for theming. Key variables are defined in [styles.css](styles.css):

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f1419;
  --border-color: #e7e9ea;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg-primary: #000000;
  --text-primary: #e7e9ea;
  /* ... dark mode overrides */
}
```

### Component System

The site uses dynamic component loading via JavaScript. Components are HTML partials loaded into placeholder elements:

```html
<!-- In your HTML -->
<div id="banner-placeholder"></div>

<!-- Loaded from partials/banner.html -->
```

See [script.js](script.js) for the component loading implementation.

## Recent Updates

### November 2025
- Added Twitter/X-inspired banner design with interactive elements
- Implemented dark mode with system preference detection and localStorage persistence
- Created sitemap.xml for improved SEO
- Added Open Graph and Twitter Card meta tags for better social sharing
- Refactored navigation with new menu order (Home, Updates, Articles, About)
- Integrated Material Symbols icon font for better icon consistency
- Added Gulp development server with BrowserSync and live reload
- Updated favicon to hardhat SVG
- Created reusable component system with HTML partials
- Added theme toggle button to banner
- Improved responsive design for mobile devices
- Added dedicated sections for weekly updates and articles

## Browser Support

Modern browsers with support for:
- CSS Custom Properties (CSS Variables)
- ES6+ JavaScript (fetch, async/await, arrow functions)
- localStorage API
- CSS Grid and Flexbox
- `prefers-color-scheme` media query

## License

MIT License - see LICENSE file for details
