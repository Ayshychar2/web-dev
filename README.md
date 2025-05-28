# Dark-Themed Web Development Services Website

This is a professional dark-themed website template for web development services, inspired by modern dark mode designs with advanced CSS and JavaScript features.

## Table of Contents

- [Features](#features)
- [Modern Web Technologies](#modern-web-technologies)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Adding Content](#adding-content)
- [Image Requirements](#image-requirements)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)

## Features

- Modern dark-themed design
- Mobile-friendly responsive layout
- Sleek and professional appearance
- Optimized for conversions
- Easy to customize
- Smooth scrolling navigation
- Interactive elements with advanced animations
- Testimonials showcase
- Pricing tables
- Call-to-action sections
- Gradient buttons with glow effects

## Modern Web Technologies

This template leverages the following modern web technologies:

| Feature | Description |
|---------|-------------|
| ✅ @font-face | Custom fonts for branding with font-display optimization |
| ✅ Viewport Units | Responsive layout with vw, vh, vmax for fluid sizing |
| ✅ Gradients | Fallback-supported linear and radial gradients |
| ✅ Transitions & Animations | Advanced transitions with cubic-bezier timing and keyframe animations |
| ✅ Flexbox | With full cross-browser compatibility for modern layouts |
| ✅ CSS Grid | For responsive card layouts and complex positioning |
| ✅ Custom Scroll & Selection | Enhanced interactivity with custom scrollbars and text selection |
| ✅ Z-index layering | Proper stacking context management |
| ✅ Hover interactions | Animated hover effects with pseudo-elements |
| ✅ Mobile-first media queries | Better mobile UX with progressive enhancement |
| ✅ Intersection Observer | Modern JavaScript API for scroll-based animations |
| ✅ CSS Variables | Dynamic theming with CSS custom properties |
| ✅ Print Styles | Optimized appearance when printing pages |
| ✅ Mouse Slide Animation | Interactive panel animations that respond to cursor movement |
| ✅ Clip-path Animations | Smooth reveal effects using CSS clip-path |
| ✅ GSAP Integration | Professional animation library for buttery-smooth effects |

## Interactive Mouse Slide Animation

The website features a cutting-edge mouse slide animation that creates an engaging user experience:

### How It Works

1. **Mouse-Driven Navigation**: As users move their cursor across the screen, panels slide and reveal content based on cursor position.

2. **Smooth Transitions**: Using GSAP (GreenSock Animation Platform), all animations are silky smooth with custom easing functions.

3. **Clip-Path Reveals**: Content is revealed using clip-path animations that create a dynamic masking effect.

4. **Touch Support**: The animation is fully touch-compatible for mobile devices, with swipe gestures replacing mouse movement.

### Customization

You can easily customize the mouse slide animation:

```javascript
// Adjust animation speed
gsap.to(panel, {
    duration: 0.8, // Change this value (in seconds)
    ease: 'power2.out' // Try different easing functions
});

// Change the number of panels
// Simply add or remove panel elements in the HTML
```

## Getting Started

To use this template:

1. Download or clone this repository
2. Replace placeholder images in the `images` folder with your own images
3. Customize the content in `index.html` to match your services and branding
4. Modify colors and styles in `css/styles.css` if needed
5. Test the website on different devices and browsers
6. Deploy to your web hosting service

## Customization

### Colors

You can easily change the color scheme by modifying the CSS variables in the `:root` section of `css/styles.css`:

```css
:root {
    --primary-color: #38cdfa;
    --secondary-color: #45d6e7;
    --accent-color: #FC626A;
    --text-color: #fff;
    --light-text: rgba(255, 255, 255, 0.7);
    --background-color: #111;
    --light-background: rgba(255, 255, 255, 0.05);
    --dark-background: #000;
    --border-color: rgba(255, 255, 255, 0.1);
    --success-color: #38cdfa;
    --box-shadow: 0 0 0.8vmax #49bff6;
}
```

### Fonts

The template uses Moranga and Gilroy fonts. To change the fonts:

1. Choose new fonts from [Google Fonts](https://fonts.google.com/) or [CDN Fonts](https://fonts.cdnfonts.com/)
2. Update the font-face declarations in the `<head>` section of `index.html`
3. Change the font-family in the appropriate selectors in `css/styles.css`

### Button Styles

The template uses gradient buttons with glow effects. You can customize these by modifying:

```css
.btn-primary {
    background: linear-gradient(to right, #45d6e7, #38cdfa);
    color: white;
    border: none;
    box-shadow: 0 0 0.8vmax #49bff6;
}
```

## Adding Content

### Hero Section

To modify the hero section, edit the page1 section in `index.html`:

```html
<section id="page1">
    <h1>Your Headline Here</h1>
    <div id="image-div">
        <img src="images/your-image.jpg" alt="Description">
    </div>
</section>
```

### Testimonials

To add more testimonials, duplicate the testimonial structure in the testimonials section:

```html
<div class="testimonial">
    <img src="images/star.png" alt="5 Stars" class="rating">
    <h3>"Your Testimonial Title"</h3>
    <p>"Testimonial text goes here..."</p>
    <div class="client">
        <img src="images/client.jpg" alt="Client">
        <div>
            <h4>Client Name</h4>
            <p>Client Position</p>
        </div>
    </div>
</div>
```

### FAQ Items

To add more FAQ items, duplicate the FAQ item structure in the FAQ section:

```html
<div class="faq-item">
    <div class="faq-question">
        <h3>Your Question Here?</h3>
        <span class="faq-toggle"><i class="fas fa-plus"></i></span>
    </div>
    <div class="faq-answer">
        <p>Your answer here...</p>
    </div>
</div>
```

## Image Requirements

For optimal performance with the dark theme, use the following image specifications:

- **Hero Image**: High contrast, dark-themed image (1920px × 1080px)
- **Trust Badge Icons**: Light colored or white icons (60px × 60px, PNG with transparency)
- **Client Photos**: Well-lit portraits (200px × 200px, square, JPG)
- **Star Ratings**: White or light colored (100px × 20px, PNG with transparency)
- **Background Images**: Dark-themed images (1920px × 1080px, JPG, optimized for web)

## Browser Compatibility

This template is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This template is for your personal use. You may modify and use it for your own projects or client projects.

---

Created with ❤️ by Web Developers Team