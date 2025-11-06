# Architecture Documentation

## System Overview

OnlyGoon website is built using a modern, component-based architecture with Next.js 15 and TypeScript, following enterprise-level best practices.

## Architecture Principles

### 1. Modular Design
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Complex UIs built from simple, reusable components
- **Separation of Concerns**: Logic, presentation, and styling are properly separated

### 2. Type Safety
- **TypeScript Throughout**: All code is fully typed
- **Interface Definitions**: Clear contracts for all component props
- **Type Guards**: Runtime type checking where necessary

### 3. Performance
- **Code Splitting**: Automatic route-based splitting via Next.js
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js Image component for automatic optimization
- **CSS Optimization**: Tailwind CSS with PurgeCSS

## Component Architecture

### Core Components

#### LockOverlay (`/components/LockOverlay.tsx`)
**Purpose**: Main interactive "locked portal" experience

**Responsibilities**:
- Display locked screen with visual effects
- Handle unlock interaction
- Reveal Telegram link on unlock
- Manage animation states

**Dependencies**:
- framer-motion (animations)
- react-icons (icons)
- Next.js Image (logo)

**State Management**:
```typescript
const [isLocked, setIsLocked] = useState(true);
const [showUnlockHint, setShowUnlockHint] = useState(false);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
```

**Key Features**:
- Mouse-tracking glow effect
- Animated scanline
- Static noise overlay
- Corner decorations
- Unlock button with timed reveal
- Telegram modal on unlock

#### CopyButton (`/components/CopyButton.tsx`)
**Purpose**: One-click contract address copying

**Responsibilities**:
- Display contract address
- Copy to clipboard on click
- Show visual feedback
- Handle copy errors

**Dependencies**:
- useClipboard hook
- framer-motion (animations)
- react-icons (icons)

**Props Interface**:
```typescript
interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}
```

#### Ticker (`/components/Ticker.tsx`)
**Purpose**: $OG token ticker display

**Responsibilities**:
- Display $OG ticker
- Animated pulse indicator
- Responsive positioning

**Dependencies**:
- framer-motion (animations)

### Custom Hooks

#### useClipboard (`/hooks/useClipboard.ts`)
**Purpose**: Clipboard functionality abstraction

**Interface**:
```typescript
interface UseClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
  error: Error | null;
}
```

**Features**:
- Async clipboard API
- Automatic reset after delay
- Error handling
- Type-safe return values

## Styling Architecture

### Tailwind CSS v4 Integration

**Configuration**: Using new inline @theme directive
```css
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  /* ... */
}
```

### Custom Utility Classes

**Glass Effect**:
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Gradient Text**:
```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Animation System

### Keyframe Animations

All animations defined in `globals.css`:

1. **glitch1 / glitch2**: Glitch effects for lock screen
2. **float**: Floating animation for logo
3. **pulse-glow**: Pulsing glow for interactive elements
4. **scan**: Scanline animation
5. **static-noise**: Noise overlay animation

### Framer Motion Integration

**Usage Pattern**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {content}
</motion.div>
```

**Benefits**:
- Declarative animations
- Spring physics
- AnimatePresence for mount/unmount
- Gesture support

## State Management

### Component-Level State
- React useState for local component state
- No global state management needed (simple app)

### Future Scalability
If global state becomes necessary:
- **Option 1**: React Context + useReducer
- **Option 2**: Zustand (lightweight)
- **Option 3**: Redux Toolkit (if complex)

## Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
State Update (useState)
    ↓
Component Re-render
    ↓
Animated Transition (Framer Motion)
    ↓
UI Update
```

## Performance Optimizations

### 1. Image Optimization
```typescript
<Image
  src="/logo.png"
  width={224}
  height={224}
  priority // Above fold
/>
```

### 2. Code Splitting
- Automatic via Next.js App Router
- Dynamic imports where appropriate

### 3. CSS Optimization
- Tailwind CSS purges unused styles
- Minimal custom CSS
- CSS variables for theming

### 4. Animation Performance
- CSS transforms (GPU accelerated)
- will-change hints where appropriate
- RequestAnimationFrame for JS animations

## Security Considerations

### 1. XSS Prevention
- React escapes by default
- No dangerouslySetInnerHTML usage
- Sanitized user inputs

### 2. Clipboard Security
- Secure Clipboard API
- Permission-based access
- Error handling for unsupported browsers

### 3. External Links
- noopener, noreferrer on external links
- Telegram link opens in new tab safely

## Accessibility

### 1. Semantic HTML
- Proper heading hierarchy
- Button elements for interactions
- Alt text for images

### 2. Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Focus indicators

### 3. ARIA Labels
```typescript
aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
```

## SEO Architecture

### Metadata Configuration
```typescript
export const metadata: Metadata = {
  title: "OnlyGoon | $OG - Exclusive Access Portal",
  description: "...",
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

### Benefits
- Server-side rendering (SSR)
- Static metadata
- OpenGraph tags for social sharing
- Twitter card support

## Deployment Architecture

### Build Process
```bash
npm run build
```

**Output**:
- Static HTML pages
- Optimized JavaScript bundles
- Optimized CSS
- Compressed images

### Hosting Options

**Vercel (Recommended)**:
- Zero-config deployment
- Automatic HTTPS
- CDN distribution
- Edge functions support

**Alternative Platforms**:
- Netlify
- AWS Amplify
- Docker container (self-hosted)

## File Structure

```
app/
├── layout.tsx          # Root layout, metadata
├── page.tsx            # Homepage
└── globals.css         # Global styles

components/
├── LockOverlay.tsx     # Lock screen
├── CopyButton.tsx      # Copy functionality
└── Ticker.tsx          # Ticker display

hooks/
└── useClipboard.ts     # Clipboard hook

public/
└── logo.png            # Static assets

docs/
├── ARCHITECTURE.md     # This file
├── DEPLOYMENT.md       # Deployment guide
└── DEVELOPMENT.md      # Development guide
```

## Technology Stack Deep Dive

### Next.js 15
- **App Router**: New routing system
- **Server Components**: Default for better performance
- **Client Components**: 'use client' directive for interactivity

### TypeScript
- **Strict Mode**: Maximum type safety
- **Type Inference**: Minimal type annotations needed
- **Interface-Driven**: Clear contracts

### Tailwind CSS v4
- **Inline Theme**: New @theme directive
- **JIT Compiler**: On-demand CSS generation
- **Custom Utilities**: Project-specific classes

### Framer Motion
- **Declarative Animations**: Easy to understand
- **Physics-Based**: Natural motion
- **Gesture Support**: Built-in interactions

## Scalability Considerations

### Horizontal Scaling
- Static generation (SSG) where possible
- CDN distribution
- API routes for dynamic content

### Vertical Scaling
- Component code splitting
- Lazy loading
- Bundle size optimization

### Future Enhancements
1. **Analytics Integration**: Google Analytics, Mixpanel
2. **A/B Testing**: Multiple unlock screen variants
3. **CMS Integration**: Dynamic content management
4. **Multi-language**: i18n support
5. **Dark/Light Theme**: User preference
6. **PWA Features**: Offline support, installable

## Maintenance & Monitoring

### Error Tracking
- Consider: Sentry integration
- Console error monitoring
- User feedback mechanism

### Performance Monitoring
- Lighthouse CI
- Web Vitals tracking
- Bundle size monitoring

### Dependency Management
```bash
npm audit        # Security audit
npm outdated     # Check for updates
npm update       # Update dependencies
```

---

*This architecture is designed to scale from MVP to enterprise while maintaining code quality and performance.*
