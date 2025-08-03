# Feature Cards Component - Usage Guide

## Overview

The feature cards component provides a reusable, interactive card design for displaying features, services, or highlights across the portfolio website.

## Features

- ✅ Smooth hover animations
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Multiple layout variants
- ✅ CSS custom properties integration
- ✅ Accessible design

## Basic Usage

### 1. Include the CSS

Add this line to your HTML file's head section:

```html
<link rel="stylesheet" href="../../css/feature-cards.css" />
```

### 2. Basic Feature Card Structure

```html
<div class="feature-card">
  <div class="feature-icon">
    <span>🎯</span>
  </div>
  <div>
    <h3 class="feature-title">Feature Title</h3>
    <p class="feature-description">
      Your feature description goes here. This can be a longer text explaining
      the feature.
    </p>
  </div>
</div>
```

## Layout Variants

### 1. Default Horizontal Layout

```html
<div class="feature-card">
  <!-- Icon and content side by side -->
</div>
```

### 2. Vertical Layout

```html
<div class="feature-card feature-card-vertical">
  <!-- Icon on top, content below -->
</div>
```

### 3. Compact Layout

```html
<div class="feature-card feature-card-compact">
  <!-- Smaller spacing and icons -->
</div>
```

## Grid Layout Examples

### 3-Column Grid

```html
<div class="grid md:grid-cols-3 gap-10">
  <div class="feature-card">
    <!-- Feature 1 -->
  </div>
  <div class="feature-card">
    <!-- Feature 2 -->
  </div>
  <div class="feature-card">
    <!-- Feature 3 -->
  </div>
</div>
```

### 2-Column Grid

```html
<div class="grid md:grid-cols-2 gap-8">
  <div class="feature-card">
    <!-- Feature 1 -->
  </div>
  <div class="feature-card">
    <!-- Feature 2 -->
  </div>
</div>
```

## Available Icons

You can use any emoji or text as icons:

- ⌨️ (Keyword Research)
- 📝 (Content)
- ⚙️ (Technical)
- 🔗 (Links)
- ✏️ (Writing)
- 🗺️ (Local)
- 🎯 (Target)
- 📊 (Analytics)
- 💡 (Ideas)
- 🚀 (Growth)

## Customization

### CSS Custom Properties

The component uses CSS custom properties for theming:

```css
:root {
  --primary-color: #f59e0b; /* Your brand color */
}
```

### Custom Styling

You can override styles by adding custom CSS:

```css
.feature-card {
  /* Your custom styles */
}

.feature-card:hover {
  /* Custom hover effects */
}
```

## Responsive Behavior

- **Desktop**: Horizontal layout with icon and content side by side
- **Mobile**: Vertical layout with centered content
- **Tablet**: Adaptive layout based on screen size

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Lightweight CSS (minimal impact on page load)
- Hardware-accelerated animations
- No JavaScript required

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Examples from Current Pages

### SEO Services Page

```html
<!-- Feature 1: Keyword Research -->
<div class="feature-card">
  <div class="feature-icon">
    <span>⌨️</span>
  </div>
  <div>
    <h3 class="feature-title">Keyword Research</h3>
    <p class="feature-description">
      Keyword research is a critical part of SEO, helping to identify the terms
      and phrases your target audience is searching for.
    </p>
  </div>
</div>
```

### Web Design Services

```html
<!-- Feature: Responsive Design -->
<div class="feature-card">
  <div class="feature-icon">
    <span>📱</span>
  </div>
  <div>
    <h3 class="feature-title">Responsive Design</h3>
    <p class="feature-description">
      Websites that look great and work perfectly on all devices and screen
      sizes.
    </p>
  </div>
</div>
```

## Best Practices

1. **Consistent Icons**: Use relevant emojis or icons that match the feature
2. **Clear Titles**: Keep titles concise and descriptive
3. **Descriptive Content**: Write clear, benefit-focused descriptions
4. **Proper Spacing**: Use appropriate grid layouts for different screen sizes
5. **Accessibility**: Ensure proper contrast and semantic structure

## Troubleshooting

### Common Issues

1. **Icons not showing**: Ensure the CSS file is properly linked
2. **Hover effects not working**: Check for CSS conflicts
3. **Layout issues**: Verify grid classes are properly applied
4. **Dark mode not working**: Ensure CSS custom properties are defined

### Debug Steps

1. Check browser console for CSS errors
2. Verify file paths are correct
3. Test with different browsers
4. Check responsive behavior on different devices
