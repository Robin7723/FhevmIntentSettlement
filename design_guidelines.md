# Design Guidelines: Encrypted Cross-Chain Intent Settlement Protocol

## Design Approach

**Selected Approach**: Hybrid - DeFi Design System with Privacy-First Emphasis

Drawing inspiration from modern DeFi protocols (Uniswap, CoW Protocol, Aave) while emphasizing the unique privacy-preserving nature through visual encryption indicators and trust-building design elements. The design must balance technical sophistication with approachability.

## Core Design Principles

1. **Privacy Transparency**: Visually communicate encryption without making it intimidating
2. **Dual-Interface Clarity**: Distinct visual separation between User and Solver experiences
3. **Trust Through Polish**: Professional, refined aesthetics build confidence in handling financial data
4. **Functional Elegance**: Clean, purposeful design without unnecessary ornamentation

---

## Color Palette

### Light Mode
- **Primary**: 239 84% 67% (vibrant blue - trustworthy, technical)
- **Secondary**: 262 83% 58% (deep purple - premium, secure)
- **Background Base**: 220 14% 96% (soft gray-blue)
- **Surface**: 0 0% 100% (pure white cards)
- **Success**: 142 76% 36% (encrypted green)
- **Warning**: 25 95% 53% (deadline orange)
- **Text Primary**: 222 47% 11% (near-black)
- **Text Secondary**: 215 16% 47% (muted blue-gray)

### Dark Mode
- **Primary**: 217 91% 60% (bright blue)
- **Secondary**: 262 83% 68% (lighter purple)
- **Background Base**: 222 47% 11% (deep navy-black)
- **Surface**: 217 33% 17% (elevated dark blue)
- **Success**: 142 71% 45% 
- **Warning**: 25 95% 63%
- **Text Primary**: 210 40% 98% (off-white)
- **Text Secondary**: 217 19% 65% (muted light blue)

### Gradient Accents
- **Hero Gradient**: from-blue-50 via-purple-50 to-pink-50 (light mode)
- **Hero Gradient Dark**: from-blue-950 via-purple-950 to-pink-950 (dark mode)
- **Card Hover**: Subtle blue-to-purple gradient overlay at 5% opacity

---

## Typography

**Font Families**:
- **Primary**: Inter (via Google Fonts) - body text, UI elements
- **Display**: Space Grotesk (via Google Fonts) - headings, emphasis

**Type Scale**:
- **Hero Heading**: text-5xl font-bold (Space Grotesk)
- **Page Heading**: text-3xl font-bold
- **Section Heading**: text-2xl font-semibold
- **Card Title**: text-lg font-semibold
- **Body**: text-base font-normal
- **Caption/Label**: text-sm font-medium
- **Micro**: text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** (p-4, gap-6, mb-8, etc.)

**Container Strategy**:
- Max width: max-w-7xl for main content
- Padding: px-4 md:px-6 lg:px-8
- Vertical rhythm: py-8 md:py-12 lg:py-16

**Grid System**:
- Two-column layout for User/Solver tabs: grid grid-cols-1 lg:grid-cols-2 gap-8
- Intent list: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
- Forms: Single column with max-w-2xl

---

## Component Library

### Navigation
- **Header**: Fixed top bar with wallet connection, 64px height
- **Tab Switcher**: Large, pill-shaped toggle between "I'm a User" and "I'm a Solver"
- Use rounded-full for active tab with primary gradient background
- Inactive tabs: transparent with border and hover state

### Cards
- **Intent Card**: Rounded-xl with shadow-lg, border border-gray-200/50
- Hover: translate-y-[-2px] shadow-xl transition
- **Encryption Badge**: Small pill with 🔒 icon, bg-purple-100 text-purple-700
- **Status Indicators**: Colored dots (green=active, gray=filled, red=expired)

### Forms
- **Input Fields**: Rounded-lg border-2 with focus ring in primary color
- **Labels**: text-sm font-medium text-gray-700 mb-2
- **Encrypted Input Indicator**: Small lock icon inside input (right side)
- **Submit Buttons**: Large (h-12), rounded-lg, primary gradient, shadow-md
- **Secondary Buttons**: Outlined variant with hover background fill

### Data Display
- **Intent List**: Card grid with intent ID prominently displayed
- **Offer Count Badge**: Circular badge showing number of offers
- **Timestamp**: Relative time (e.g., "2 hours ago") in muted text
- **Match Button**: Prominent green button when offers exist

### Icons
- Use **Heroicons** (outline style) via CDN for consistency
- Lock icon for encryption indicators
- Clock for timestamps
- Users for offer counts
- Check/X for status

### Feedback Elements
- **Loading States**: Spinner with primary color, "Encrypting..." message
- **Success Toast**: Green background, check icon, auto-dismiss
- **Error Toast**: Red background, alert icon, requires dismissal
- **Empty States**: Centered icon + message for no intents/offers

---

## Visual Hierarchy & Emphasis

1. **Encryption Prominence**: Every encrypted value gets a 🔒 prefix and subtle purple tint
2. **Call-to-Action Priority**: 
   - Primary: "Create Intent" / "Submit Offer" (gradient, large)
   - Secondary: "Match Best Offer" (solid green)
   - Tertiary: View/Filter actions (ghost buttons)

3. **Tab Context**: Active tab has distinct background + shadow to lift it from page

---

## Animations

**Minimal, Purposeful Only**:
- Card hover: 150ms transform + shadow
- Button press: Scale(0.98) on active
- Tab switch: 200ms ease-in-out background transition
- Loading spinner: Smooth rotation
- Toast entry/exit: Slide + fade

**NO**: Scroll animations, parallax, page transitions

---

## Responsive Behavior

- **Mobile (< 768px)**: 
  - Stack all grids to single column
  - Full-width cards
  - Larger touch targets (min 44px)
  - Simplified navigation

- **Tablet (768px - 1024px)**:
  - Two-column intent grid
  - Side-by-side user/solver tabs if space allows

- **Desktop (> 1024px)**:
  - Three-column intent grid
  - Full layout as designed

---

## Images

**Hero Section**: 
Include a large hero image (h-64 md:h-80) showing abstract encrypted network visualization - think glowing nodes, circuit patterns, or data streams with lock symbols integrated. Use semi-transparent overlay (bg-gradient-to-r opacity-90) to ensure text readability.

**Placement**: Top of page, below header, spanning full width with contained text overlay (max-w-4xl centered).

**Fallback**: If no suitable image, use animated gradient mesh background instead.

---

## Unique Privacy-First Elements

- **Encrypted Data Tooltip**: Hover over 🔒 to explain "This value is encrypted on-chain"
- **Privacy Badge**: Top-right corner badge saying "FHE Protected" with lock animation
- **Blind Bidding Indicator**: Visual cue that solvers cannot see other offers
- **Decryption Not Available**: Grayed-out "decrypt" button with explanation