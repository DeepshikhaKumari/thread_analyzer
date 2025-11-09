# Thread Analyzer Dashboard Guidelines

## General Guidelines

* Use Tailwind CSS v4 with the provided design tokens in globals.css
* Follow responsive design principles - mobile-first approach
* Use the 14px base font size as defined in CSS variables
* Maintain consistent spacing using Tailwind's spacing scale
* Use semantic HTML elements for accessibility

## Design System

### Typography
* Base font size: 14px (defined in CSS variables)
* Use default typography from globals.css - avoid Tailwind text size classes unless specifically needed
* Headers should follow the hierarchy: h1 > h2 > h3 > h4

### Colors
* Primary: Dark navy (#030213)
* Use CSS custom properties for colors (--primary, --secondary, etc.)
* Support both light and dark modes through CSS variables

### Components
* Use Shadcn UI components from `/src/components/ui/`
* Maintain consistent styling with existing design patterns
* Cards should use the Card component with proper spacing
* Tables should be sortable and filterable where appropriate

### Thread Analyzer Specific
* File upload areas should support drag and drop
* Show file size limits and supported formats clearly
* Use progress indicators for upload/analysis operations
* Display thread states with appropriate color coding:
  - RUNNING: Primary/success color
  - BLOCKED: Destructive/error color
  - WAITING: Secondary color
  - TIMED_WAITING: Outline variant

### Data Display
* Use tables for thread listings with sorting capabilities
* Show metrics in card format with icons
* Charts should use Recharts with consistent color scheme
* Always show loading states during data processing