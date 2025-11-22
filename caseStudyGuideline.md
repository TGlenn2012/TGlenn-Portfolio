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
6. [Best Practices](#best-practices)

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
- **Main Heading (h1)**: `text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent`
- **Section Heading (h2)**: `text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center`
- **Subsection Heading (h3)**: `text-2xl font-bold text-blue-400 text-center`
- **Body Text**: `text-gray-200 leading-relaxed`

### Spacing
- **Section Padding**: `min-h-screen flex items-center justify-center py-20`
- **Container Max Width**: `max-w-6xl mx-auto px-4 w-full`
- **Card Spacing**: `mb-8` or `mb-10` between major sections
- **Grid Gaps**: `gap-4` or `gap-6` for card grids

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
2. **Breakpoints**: Use Tailwind breakpoints (md:, lg:)
3. **Touch Targets**: Minimum 44x44px for interactive elements
4. **Readable Text**: Ensure text is readable on all screen sizes

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
- [ ] Responsive design tested

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


