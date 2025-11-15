# Personal Website - Carlos Muñoz

A simple, static personal website built with pure HTML, CSS, and JavaScript.

## Structure

```
/
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css    # Compiled CSS styles
│   ├── js/
│   │   ├── main.js           # Custom JavaScript
│   │   └── sweet-scroll.min.js  # Smooth scrolling library
│   ├── fonts/          # Web fonts (FontAwesome, Devicon)
│   └── favicon.png     # Site favicon
├── CNAME              # Custom domain configuration
└── LICENSE            # License file
```

## Features

- Fully static - no build process required
- Responsive design
- Particle.js background animation
- Smooth scrolling
- Font Awesome icons
- Google Analytics integration

## Development

Simply open `index.html` in a browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment

This site can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Customization

To customize the content, edit `index.html` and modify:
- Personal information in the header section
- About section content
- Social media links
- Google Analytics ID (or remove if not needed)

## License

MIT License - see LICENSE file for details
