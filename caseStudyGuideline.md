 # Case Study Guidelines

## Overview

This document provides comprehensive guidelines for creating case study pages in the portfolio. These guidelines are based on the StoryMakAR case study template and ensure consistency, accessibility, and high-quality presentation across all project case studies.

---

## Table of Contents

1. [Structure & Sections](#structure--sections)
2. [Visual Design Patterns](#visual-design-patterns)
3. [Content Guidelines](#content-guidelines)
4. [WCAG Accessibility Standards](#wcag-accessibility-standards)
5. [Technical Implementation](#technical-implementation)
6. [Responsive Design Best Practices](#responsive-design-best-practices)
7. [Best Practices](#best-practices)

---

## Structure & Sections

### Required Sections (in order)

1. **Overview / Project Summary**
   - Project title (h1)
   - Project type (Research Project, Design Project, etc.)
   - Teaser image with caption
   - Project summary paragraph
   - Embedded project video (if available)
   - "My Role" cards (3-4 cards with icons)

2. **The Problem**
   - Section heading (h2)
   - Summarized introduction (3 visual cards)
   - Related work/platforms carousel (if applicable)
   - "Our Contributions" cards (3 cards)

3. **My Role and Responsibilities**
   - Section heading (h2)
   - Design process timeline (horizontal, expandable cards)
   - System design goals (visual cards with icons)
   - Key insights from preliminary studies

4. **Process and Solution**
   - Section heading (h2)
   - System architecture overview (interactive component grid)
   - Component details (tabbed interface)
   - Image carousels for each component
   - Pilot study section (if applicable)

5. **Results and Outcomes**
   - Section heading (h2)
   - User study results (if applicable)
   - Quantitative metrics (visual cards)
   - Data tables (with proper accessibility)
   - Awards/recognition (if applicable)

6. **Conclusion**
   - Section heading (h2)
   - Discussion (visual cards)
   - Future work (visual cards)
   - Acknowledgements (structured with team, participants, institutions, funding)
   - Final summary (highlighted card)

---

## Visual Design Patterns

### Color Scheme
- **Primary Text**: `text-white` for headings and important text
- **Body Text**: `text-gray-200` (improved contrast from gray-300)
- **Secondary Text**: `text-gray-300` (improved contrast from gray-400)
- **Accent Colors**: 
  - Blue: `text-blue-400`, `border-blue-500/30`
  - Cyan: `text-cyan-400`, `border-cyan-500/30`
  - Green: `text-green-300`, `border-green-500/20`
  - Purple: `text-purple-300`, `border-purple-500/20`
  - Orange: `text-orange-300`, `border-orange-500/30`

### Glass Morphism
- **Container Class**: `glass rounded-xl p-8 border-white/10 border`
- **Card Class**: `glass rounded-xl p-6 border-white/10 border`
- **Hover Effects**: `hover:scale-105 transition-transform`
- **Background**: Dark theme with glassmorphism effects

### Typography
- **Main Heading (h1)**: `text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent` (responsive)
- **Section Heading (h2)**: `text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center` (responsive)
- **Subsection Heading (h3)**: `text-xl sm:text-2xl font-bold text-blue-400 text-center` (responsive)
- **Body Text**: `text-base sm:text-lg text-gray-200 leading-relaxed` (responsive)

### Spacing
- **Section Padding**: `min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20` (responsive)
- **Container Max Width**: `max-w-6xl mx-auto px-4 sm:px-6 w-full` (responsive padding)
- **Card Spacing**: `mb-6 md:mb-8` or `mb-8 md:mb-10` between major sections (responsive)
- **Grid Gaps**: `gap-2 sm:gap-3 md:gap-4` or `gap-4 md:gap-6` for card grids (responsive)

---

## Content Guidelines

### Writing Style
- **First Person Narrative**: Use "I" instead of "We" to emphasize personal contributions
- **Active Voice**: "I designed", "I created", "I conducted"
- **Concise but Complete**: Balance visual elements with sufficient context
- **Technical Accuracy**: Include specific technologies, tools, and methodologies

### Content Depth
- **Overview**: 2-3 paragraphs summarizing the project
- **Problem**: Visual summary with 1-2 sentences per card
- **Role**: Clear breakdown of responsibilities with visual timeline
- **Process**: Detailed technical explanations with visual aids
- **Results**: Quantitative data with visualizations
- **Conclusion**: Reflective summary with future directions

### Visual Content
- **Images**: High-quality, relevant images with descriptive captions
- **Carousels**: Use for multiple related images (3-5 images per carousel)
- **Icons**: Use emojis or SVG icons consistently (same icon for same concept)
- **Tables**: Use for structured data with proper headers
- **Videos**: Embed YouTube videos when available

---

## WCAG Accessibility Standards

### Color Contrast (WCAG 1.4.3 - Level AA)
- **Body Text**: Use `text-gray-200` (not `text-gray-300`) for sufficient contrast
- **Secondary Text**: Use `text-gray-300` (not `text-gray-400`)
- **Minimum Ratio**: 4.5:1 for normal text, 3:1 for large text
- **Test**: Use contrast checker tools to verify

### Keyboard Navigation (WCAG 2.1.1 - Level A)
- **All Interactive Elements**: Must be keyboard accessible
- **Carousels**: Arrow keys for navigation, Enter/Space to activate
- **Buttons**: Tab to focus, Enter/Space to activate
- **Timeline Cards**: Keyboard accessible with Enter/Space
- **Component Buttons**: Tab navigation with Enter/Space activation

### Focus Indicators (WCAG 2.4.7 - Level AA)
- **Standard Focus Ring**: `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black`
- **Button Focus**: Visible border and background change
- **All Interactive Elements**: Must have visible focus states

### ARIA Labels & Roles (WCAG 4.1.2 - Level A)
- **Main Content**: Wrap in `<main>` tag
- **Sections**: Add `aria-label` to all sections
- **Buttons**: Include descriptive `aria-label` attributes
- **Carousels**: Add `role="region"` and `aria-label`
- **Interactive Divs**: Add `role="button"`, `tabIndex={0}`, and `aria-pressed` or `aria-expanded`
- **Tables**: Add `role="table"` and `aria-label`

### Table Accessibility (WCAG 1.3.1 - Level A)
- **Headers**: Use `<th>` with `scope="col"` or `scope="row"`
- **Grouped Headers**: Use `scope="colgroup"` for multi-column headers
- **Row Headers**: First column should be `<th scope="row">`
- **Table Labels**: Include `aria-label` on table element

### Motion & Animation (WCAG 2.3.3 - Level AAA)
- **Respect Preferences**: Add `@media (prefers-reduced-motion: reduce)` support
- **CSS Implementation**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### Skip Links (WCAG 2.4.1 - Level A)
- **Implementation**: Add skip-to-content link at the top
- **CSS**:
  ```css
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #3b82f6;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
    border-radius: 4px;
  }
  .skip-link:focus {
    top: 0;
  }
  ```

### Image Accessibility
- **Alt Text**: Descriptive alt text for all images
- **Carousel Images**: Include position (e.g., "Image 1 of 5")
- **Decorative Images**: Use empty alt text or `aria-hidden="true"`
- **PNG Backgrounds**: Add white background for PNG images without backgrounds

### Heading Hierarchy (WCAG 1.3.1 - Level A)
- **Structure**: h1 → h2 → h3 (no skipping levels)
- **h1**: Main project title (one per page)
- **h2**: Major section headings
- **h3**: Subsection headings

---

## Technical Implementation

### Component Structure
```jsx
export const ProjectName = () => {
    // State management
    const [expandedCard, setExpandedCard] = useState(null);
    const [activeComponent, setActiveComponent] = useState(0);
    
    return (
        <main className="min-h-screen pt-20">
            {/* Skip link */}
            <a href="#overview" className="skip-link">
                Skip to main content
            </a>
            
            {/* Sections with aria-labels */}
            <section id="overview" aria-label="Overview and Project Summary">
                {/* Content */}
            </section>
        </main>
    );
};
```

### Image Carousel Component
- **Reusable Component**: `ImageCarouselWithCaptions`
- **Props**: Array of image objects with `src` and `caption`
- **Features**: 
  - Keyboard navigation (Arrow keys)
  - Navigation arrows
  - Dot indicators
  - Captions below images
  - PNG white background support

### Interactive Elements
- **Timeline Cards**: Expandable with keyboard support
- **Component Buttons**: Tabbed interface with visual highlighting
- **Carousel Navigation**: Keyboard accessible with proper ARIA

### Table Implementation
```jsx
<table role="table" aria-label="Table Description">
    <thead>
        <tr>
            <th scope="col">Column Header</th>
            <th scope="colgroup" colSpan="2">Grouped Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Row Header</th>
            <td>Data</td>
        </tr>
    </tbody>
</table>
```

---

## Responsive Design Best Practices

### Overview
All case studies must be fully responsive and optimized for mobile devices. This section outlines the responsive design patterns and best practices implemented across the portfolio.

### Mobile-First Approach
- **Design Philosophy**: Start with mobile layout, then enhance for larger screens
- **Breakpoint Strategy**: Use Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px)
- **Progressive Enhancement**: Add features and complexity as screen size increases

### Responsive Typography
- **Main Heading (h1)**: `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`
  - Scales from 30px (mobile) to 72px (desktop)
- **Section Heading (h2)**: `text-2xl sm:text-3xl`
  - Scales from 24px (mobile) to 30px (desktop)
- **Subsection Heading (h3)**: `text-xl sm:text-2xl`
  - Scales from 20px (mobile) to 24px (desktop)
- **Body Text**: `text-base sm:text-lg`
  - Scales from 16px (mobile) to 18px (desktop)
- **Small Text**: `text-xs sm:text-sm`
  - For labels, captions, and secondary information

### Responsive Spacing
- **Section Padding**: `py-8 sm:py-12 md:py-20`
  - Reduced vertical padding on mobile to maximize content visibility
- **Container Padding**: `px-4 sm:px-6`
  - Consistent horizontal padding that scales slightly on larger screens
- **Card Padding**: `p-4 sm:p-6 md:p-8`
  - Tighter padding on mobile, more spacious on desktop
- **Grid Gaps**: `gap-2 sm:gap-3 md:gap-4` or `gap-4 md:gap-6`
  - Tighter gaps on mobile to maximize space utilization
- **Margins**: `mb-4 md:mb-6` or `mb-6 md:mb-8`
  - Reduced margins on mobile for better content density

### Touch Target Optimization
- **Minimum Size**: All interactive elements must be at least 44x44px (WCAG 2.5.5 - Level AAA)
- **Implementation**: Add `touch-target min-h-[44px] min-w-[44px]` classes
- **Button Padding**: Use `py-3 md:py-4 px-4 md:px-6` for comfortable touch targets
- **Navigation Elements**: 
  - Hamburger menu: `w-11 h-11` minimum
  - Menu items: `px-4 py-3` padding for better touch targets
  - Close button: `min-h-[44px] min-w-[44px]`
- **Carousel Buttons**: `p-3 sm:p-4` with `min-h-[44px] min-w-[44px]`

### Responsive Grids
- **Component Selection**: `grid-cols-2 sm:grid-cols-3 md:grid-cols-5`
  - 2 columns on mobile, 3 on small tablets, 5 on desktop
- **Metrics Cards**: `grid-cols-2 md:grid-cols-4`
  - 2 columns on mobile, 4 on desktop
- **Project Cards**: `grid-cols-1 md:grid-cols-2`
  - Single column on mobile, 2 columns on desktop
- **Skills Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - Progressive enhancement: 1 → 2 → 3 columns
- **Education/Experience**: `grid-cols-1 md:grid-cols-2` or `grid-cols-1 md:grid-cols-3`

### Responsive Images
- **Hero Images**: `h-40 sm:h-48` (160px mobile, 192px desktop)
- **Carousel Images**: `min-h-[250px] sm:min-h-[300px] md:min-h-[400px]`
  - Scales from 250px to 400px based on screen size
- **Profile Images**: `w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56`
  - Progressive sizing: 128px → 160px → 224px
- **Project Card Images**: `h-40 sm:h-48` (consistent with hero images)
- **Always Include**: 
  - `object-cover` for proper image scaling
  - `rounded-lg` or `rounded-full` for consistent appearance
  - `overflow-hidden` on container to prevent overflow

### Responsive Tables
- **Container Wrapper**: 
  ```jsx
  <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0" 
       style={{ WebkitOverflowScrolling: 'touch' }}>
    <table className="w-full min-w-[600px] text-xs sm:text-sm">
      {/* table content */}
    </table>
  </div>
  ```
- **Key Features**:
  - Horizontal scrolling on mobile
  - Full-width on mobile with negative margins
  - Minimum width ensures readability
  - Responsive text sizing
  - Smooth scrolling on iOS devices

### Responsive Navigation
- **Hamburger Menu**: 
  - Visible on mobile: `md:hidden`
  - Button size: `w-11 h-11` minimum
  - Position: `top-4 right-4 md:top-6 md:right-6`
- **Desktop Menu**: 
  - Hidden on mobile: `hidden md:flex`
  - Spacing: `space-x-6 lg:space-x-8`
- **Mobile Menu Items**: 
  - Text size: `text-xl md:text-2xl`
  - Padding: `px-4 py-3` for touch targets
  - Spacing: `my-3 md:my-4`

### Responsive Forms
- **Input Fields**: 
  - Padding: `py-3 md:py-4 px-4`
  - Text size: `text-base md:text-lg`
  - Container: `max-w-2xl mx-auto`
- **Textarea**: 
  - Add `resize-y` for vertical resizing only
  - Same padding and text sizing as inputs
- **Submit Buttons**: 
  - Padding: `py-3 md:py-4 px-6 md:px-8`
  - Text size: `text-base md:text-lg`
  - Full width on mobile: `w-full`

### Responsive Carousels
- **Navigation Buttons**: 
  - Position: `left-2 sm:left-4` and `right-2 sm:right-4`
  - Size: `p-3 sm:p-4` with `min-h-[44px] min-w-[44px]`
  - Icon size: `w-5 h-5 sm:w-6 sm:h-6`
- **Dot Indicators**: 
  - Smaller spacing on mobile
  - Touch-friendly sizing
- **Image Container**: 
  - Responsive min-height (see Responsive Images section)

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### Global Mobile Styles
Add to `src/index.css`:
```css
/* Mobile-first responsive typography */
html {
  font-size: 16px;
}

@media (min-width: 640px) {
  html {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 18px;
  }
}

/* Ensure minimum touch target size */
button,
a[role="button"],
input[type="button"],
input[type="submit"],
input[type="reset"],
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Improve tap highlight on mobile */
* {
  -webkit-tap-highlight-color: rgba(59, 130, 246, 0.2);
}

/* Better scrolling on mobile */
@media (max-width: 768px) {
  body {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Reduce padding on mobile */
  .glass {
    padding: 1rem !important;
  }
  
  /* Better text readability */
  p, li, span {
    line-height: 1.6;
  }
  
  /* Better spacing for mobile */
  section {
    padding: 2rem 0 !important;
  }
  
  /* Ensure images don't overflow */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Better table scrolling */
  table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
}
```

### Responsive Testing Checklist
- [ ] Test on actual mobile devices (iPhone, Android)
- [ ] Test on tablets (iPad, Android tablets)
- [ ] Test on various screen sizes (320px, 375px, 414px, 768px, 1024px, 1280px)
- [ ] Verify touch targets are easily tappable
- [ ] Check that text is readable without zooming
- [ ] Verify images don't overflow containers
- [ ] Test horizontal scrolling on tables
- [ ] Verify navigation works on mobile
- [ ] Check form inputs are properly sized
- [ ] Test carousel navigation on touch devices
- [ ] Verify all interactive elements are accessible

---

## Best Practices

### Content Organization
1. **Start with Context**: Overview section provides immediate context
2. **Show the Journey**: Process section shows design evolution
3. **Quantify Results**: Use metrics and data visualizations
4. **Reflect on Learning**: Conclusion includes insights and future work

### Visual Hierarchy
1. **Use Icons Consistently**: Same icon for same concept across sections
2. **Color Coding**: Use consistent colors for related elements
3. **Progressive Disclosure**: Expandable cards for detailed information
4. **Visual Balance**: Mix text, images, and interactive elements

### Accessibility First
1. **Test with Keyboard**: Navigate entire page using only keyboard
2. **Test with Screen Reader**: Verify all content is accessible
3. **Check Contrast**: Use contrast checker for all text
4. **Verify Focus States**: All interactive elements have visible focus

### Performance
1. **Optimize Images**: Use appropriate formats and sizes
2. **Lazy Loading**: Consider lazy loading for images below fold
3. **Code Splitting**: Case studies should be code-split components

### Responsive Design
1. **Mobile First**: Design for mobile, enhance for desktop
2. **Breakpoints**: Use Tailwind breakpoints (sm:, md:, lg:)
3. **Touch Targets**: Minimum 44x44px for interactive elements
4. **Readable Text**: Ensure text is readable on all screen sizes

#### Responsive Typography
- **Main Heading (h1)**: Use fluid scaling - `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`
- **Section Heading (h2)**: `text-2xl sm:text-3xl`
- **Subsection Heading (h3)**: `text-xl sm:text-2xl`
- **Body Text**: `text-base sm:text-lg` for better readability
- **Small Text**: `text-xs sm:text-sm` for labels and captions

#### Responsive Spacing
- **Section Padding**: `py-8 sm:py-12 md:py-20` (reduced on mobile)
- **Container Padding**: `px-4 sm:px-6` (consistent horizontal padding)
- **Card Padding**: `p-4 sm:p-6 md:p-8` (scales with screen size)
- **Grid Gaps**: `gap-2 sm:gap-3 md:gap-4` (tighter on mobile)
- **Margins**: `mb-4 md:mb-6` or `mb-6 md:mb-8` (reduced on mobile)

#### Touch Target Optimization
- **Minimum Size**: All buttons and interactive elements must be at least 44x44px
- **Implementation**: Add `touch-target min-h-[44px] min-w-[44px]` classes
- **Padding**: Use `py-3 md:py-4 px-4 md:px-6` for buttons
- **Navigation**: Hamburger menu button should be `w-11 h-11` minimum
- **Mobile Menu Items**: Add `px-4 py-3` padding for better touch targets

#### Responsive Grids
- **Component Selection**: `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` (2 columns on mobile)
- **Metrics Cards**: `grid-cols-2 md:grid-cols-4` (2 columns on mobile)
- **Project Cards**: `grid-cols-1 md:grid-cols-2` (single column on mobile)
- **Skills Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (progressive enhancement)

#### Responsive Images
- **Hero Images**: `h-40 sm:h-48` (smaller on mobile)
- **Carousel Images**: `min-h-[250px] sm:min-h-[300px] md:min-h-[400px]`
- **Profile Images**: `w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56`
- **Always Include**: `object-cover` and `rounded-lg` for consistent appearance
- **Container Overflow**: Use `overflow-hidden` to prevent image overflow

#### Responsive Tables
- **Container**: Wrap tables in `overflow-x-auto` div
- **Mobile Optimization**: Add `-mx-4 sm:mx-0 px-4 sm:px-0` for full-width scrolling
- **Minimum Width**: Add `min-w-[600px]` to table to ensure readability
- **Text Sizing**: Use `text-xs sm:text-sm` for table text
- **Smooth Scrolling**: Add `style={{ WebkitOverflowScrolling: 'touch' }}` for iOS

#### Responsive Navigation
- **Hamburger Menu**: Visible on mobile (`md:hidden`)
- **Desktop Menu**: Hidden on mobile (`hidden md:flex`)
- **Menu Items**: Larger touch targets with `px-4 py-3` padding
- **Close Button**: Positioned `top-4 right-4 md:top-6 md:right-6`

#### Responsive Forms
- **Input Sizing**: `py-3 md:py-4 px-4 text-base md:text-lg`
- **Textarea**: Add `resize-y` for vertical resizing only
- **Button Sizing**: `py-3 md:py-4 px-6 md:px-8 text-base md:text-lg`
- **Form Container**: `max-w-2xl mx-auto` for optimal width

#### Responsive Carousels
- **Navigation Buttons**: Position `left-2 sm:left-4` and `right-2 sm:right-4`
- **Button Size**: `p-3 sm:p-4` with `min-h-[44px] min-w-[44px]`
- **Icon Size**: `w-5 h-5 sm:w-6 sm:h-6` (smaller on mobile)
- **Dot Indicators**: Smaller spacing on mobile

#### Viewport Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
```

#### Global Mobile Styles
```css
/* Mobile-first responsive typography */
html {
  font-size: 16px;
}

@media (min-width: 640px) {
  html {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 18px;
  }
}

/* Ensure minimum touch target size */
button,
a[role="button"],
input[type="button"],
input[type="submit"],
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Better scrolling on mobile */
@media (max-width: 768px) {
  body {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Reduce padding on mobile */
  .glass {
    padding: 1rem !important;
  }
  
  /* Better table scrolling */
  table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
}
```

#### Responsive Best Practices Checklist
- [ ] All typography uses responsive classes (sm:, md:, lg:)
- [ ] Section padding scales from mobile to desktop
- [ ] All interactive elements meet 44x44px minimum
- [ ] Grids adapt from 1-2 columns on mobile to multiple on desktop
- [ ] Images have responsive sizing and proper overflow handling
- [ ] Tables have horizontal scrolling on mobile
- [ ] Navigation adapts between hamburger menu and full menu
- [ ] Forms have appropriate input and button sizing
- [ ] Carousels have touch-friendly navigation
- [ ] Viewport meta tags are properly configured

---

## Checklist for New Case Studies

### Content
- [ ] All 6 required sections included
- [ ] First-person narrative used throughout
- [ ] Specific contributions clearly stated
- [ ] Quantitative results included
- [ ] Visual content (images, videos) added
- [ ] Captions provided for all images

### Visual Design
- [ ] Glass morphism styling applied consistently
- [ ] Color scheme matches guidelines
- [ ] Typography hierarchy followed
- [ ] Icons used consistently
- [ ] Spacing and layout consistent

### Accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all elements
- [ ] ARIA labels and roles added
- [ ] Tables have proper scope attributes
- [ ] Skip link included
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Images have descriptive alt text
- [ ] Motion preferences respected

### Technical
- [ ] Component structure follows template
- [ ] Reusable carousel component used
- [ ] State management implemented correctly
- [ ] No linting errors
- [ ] Responsive design tested on multiple screen sizes

### Responsive Design
- [ ] All typography uses responsive scaling classes
- [ ] Section padding adapts from mobile to desktop
- [ ] Touch targets meet 44x44px minimum on all devices
- [ ] Grids adapt appropriately (1-2 cols mobile, more on desktop)
- [ ] Images have responsive sizing and overflow protection
- [ ] Tables scroll horizontally on mobile devices
- [ ] Navigation adapts between mobile menu and desktop menu
- [ ] Forms have appropriate sizing for mobile input
- [ ] Viewport meta tags properly configured
- [ ] Tested on actual mobile devices (not just browser dev tools)

---

## Example Section Templates

### Overview Section
```jsx
<section id="overview" className="min-h-screen flex items-center justify-center py-20" aria-label="Overview and Project Summary">
    <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent text-center">
                Project Name
            </h1>
            <div className="glass rounded-xl p-8 border-white/10 border">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                    Overview / Project Summary
                </h2>
                {/* Content */}
            </div>
        </div>
    </RevealOnScroll>
</section>
```

### Results Section with Metrics
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
        <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">42</div>
        <div className="text-sm text-gray-300">Metric Label</div>
    </div>
    {/* More metrics */}
</div>
```

### Image Carousel Usage
```jsx
<ImageCarouselWithCaptions 
    images={[
        {
            src: "/assets/images/project/image1.png",
            caption: "Descriptive caption for image 1"
        },
        {
            src: "/assets/images/project/image2.jpg",
            caption: "Descriptive caption for image 2"
        }
    ]}
/>
```

---

## Notes

- This guideline is based on the StoryMakAR case study implementation
- All accessibility standards follow WCAG 2.1 Level AA (with some AAA features)
- Visual design follows the portfolio's glassmorphism theme
- Content depth should match the complexity and scope of the project
- When in doubt, prioritize accessibility and user experience

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: Based on StoryMakAR case study implementation
**Version**: 1.0


