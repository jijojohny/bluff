# Bluff Brand Identity

## Color Palette

### Dark Red/Maroon Theme
Inspired by luxury and boldness - similar to the Euphroia wine aesthetic.

#### Primary Colors
- **Background**: `#1a0f0f` - Deep dark red/maroon
- **Card Background**: `#2a1515` - Slightly lighter maroon for cards/containers
- **Card Border**: `#4a2825` - Warm brown/rust border color
- **Hover Background**: `#3a1f1f` - Hover state for cards

#### Accent Colors
- **Primary Accent**: `#B85C3F` - Burnt orange/rust red (main CTA, active states)
- **Accent Dark**: `#8B4428` - Darker burnt orange (hover state)

#### Text Colors
- **Foreground**: `#fafafa` - Off-white text
- **Primary Text**: `#ffffff` - Pure white headings
- **Secondary Text**: `#e5e5e5` - Light gray text
- **Tertiary Text**: `#9ca3af` - Medium gray for hints
- **Muted Text**: `#6b7280` - Darker gray for disabled/secondary

## CSS Variables
All colors are defined in `/src/app/globals.css`:
```css
:root {
  --background: #1a0f0f;
  --foreground: #fafafa;
  --accent: #B85C3F;
  --accent-dark: #8B4428;
  --card-bg: #2a1515;
  --card-border: #4a2825;
  --hover-bg: #3a1f1f;
}
```

## Tailwind Configuration
Extended in `tailwind.config.ts`:
- `colors.accent` - Primary accent color
- `colors.card` - Card styling utilities
- `colors.hover` - Hover state utilities

## Usage Guidelines

### Buttons
- **Primary CTA**: `bg-accent hover:bg-accent-dark`
- **Secondary/Ghost**: `text-gray-400 hover:text-accent`
- **Disabled**: `bg-card-border text-gray-600`

### Cards & Containers
- **Background**: `bg-card-bg`
- **Border**: `border border-card-border`
- **Hover**: `hover:bg-hover-bg hover:border-accent/40`

### Text
- **Headings**: Use white text on dark backgrounds
- **Body**: Use gray-100 or gray-200
- **Hints**: Use gray-500 or gray-400
- **Accents**: Use the accent color for highlights/links

## Design Principles
1. **High Contrast**: Dark maroon background ensures text legibility
2. **Bold Accent**: Burnt orange provides energy and draws attention
3. **Warmth**: Color palette conveys luxury and sophistication
4. **Accessibility**: WCAG AA compliant contrast ratios maintained
5. **Modern**: Clean, minimal aesthetic with strategic use of color

## Components Using Theme
- Navigation bar
- Card layouts (confessions, leaderboard, trending)
- Buttons (primary, secondary, disabled states)
- Form inputs and select dropdowns
- Step indicators and progress states
- Alert/notification states

Last updated: April 12, 2026
