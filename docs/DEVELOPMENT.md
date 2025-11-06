# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone git@github.com:EthGri345/og-website.git
   cd og-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to `http://localhost:3000`

## Development Workflow

### Branch Strategy

**Main Branch**: Production-ready code
```bash
git checkout -b feature/your-feature-name
# Make changes
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
# Create pull request
```

**Naming Conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `style/` - Styling changes

### Commit Messages

Follow Conventional Commits:
```bash
feat: add telegram integration
fix: resolve clipboard copy issue
docs: update readme with setup instructions
style: improve button hover effect
refactor: extract hook logic
perf: optimize image loading
```

## Project Structure

```
onlygoon-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── favicon.ico        # Favicon
├── components/            # React components
│   ├── LockOverlay.tsx    # Lock screen
│   ├── CopyButton.tsx     # Copy button
│   └── Ticker.tsx         # Ticker
├── hooks/                 # Custom React hooks
│   └── useClipboard.ts    # Clipboard hook
├── public/                # Static assets
│   └── logo.png           # Logo
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # Architecture docs
│   ├── DEPLOYMENT.md      # Deployment guide
│   └── DEVELOPMENT.md     # This file
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── next.config.ts        # Next.js config
└── README.md             # Project readme
```

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

Add these scripts to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md}\""
  }
}
```

## Code Style Guide

### TypeScript Conventions

**Interfaces vs Types**:
```typescript
// Use interfaces for component props
interface ButtonProps {
  text: string;
  onClick: () => void;
}

// Use types for complex unions
type Status = 'idle' | 'loading' | 'success' | 'error';
```

**Function Components**:
```typescript
// Preferred: Arrow function with typed props
export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  return <div>{prop1}</div>;
};

// Not: function declarations
function MyComponent() { ... }
```

**Hooks**:
```typescript
// Custom hooks start with 'use'
export const useCustomHook = () => {
  const [state, setState] = useState(false);
  return { state, setState };
};
```

### React Conventions

**Component Structure**:
```typescript
'use client'; // If client component

// 1. Imports
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export const Component = ({ title }: Props) => {
  // 3a. Hooks
  const [state, setState] = useState(false);

  // 3b. Functions
  const handleClick = () => {
    setState(true);
  };

  // 3c. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3d. Render
  return (
    <div onClick={handleClick}>
      {title}
    </div>
  );
};
```

**State Management**:
```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state
const [state, setState] = useState({
  isOpen: false,
  data: null,
  error: null,
});

// Avoid: too many useState calls
// Better: combine related state
```

### CSS/Styling Conventions

**Tailwind Classes**:
```typescript
// Preferred: Logical grouping
className="
  flex items-center gap-4
  px-4 py-2 rounded-lg
  bg-primary hover:bg-primary/80
  transition-colors duration-300
"

// Not: Random order
className="px-4 bg-primary flex rounded-lg ..."
```

**Custom Classes**:
```css
/* Use semantic names */
.glass-effect { /* Good */ }
.style1 { /* Bad */ }

/* Use BEM for complex components */
.card { }
.card__header { }
.card__header--active { }
```

## Component Development

### Creating New Components

1. **Create Component File**
   ```bash
   touch components/MyComponent.tsx
   ```

2. **Basic Template**
   ```typescript
   'use client'; // If needed

   import { motion } from 'framer-motion';

   interface MyComponentProps {
     title: string;
     onAction?: () => void;
   }

   export const MyComponent = ({ title, onAction }: MyComponentProps) => {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
       >
         <h2>{title}</h2>
         {onAction && <button onClick={onAction}>Action</button>}
       </motion.div>
     );
   };
   ```

3. **Export from index** (if needed)
   ```typescript
   // components/index.ts
   export { MyComponent } from './MyComponent';
   ```

### Adding Animations

**Framer Motion Patterns**:

```typescript
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>

// Slide in
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
/>

// Scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>

// Stagger children
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item} variants={itemVariants} />
  ))}
</motion.div>
```

## Testing

### Manual Testing Checklist

**Functionality**:
- [ ] Lock screen displays on load
- [ ] Unlock button appears after 2s
- [ ] Clicking unlock reveals Telegram modal
- [ ] Telegram link opens in new tab
- [ ] Contract address copies to clipboard
- [ ] Copy button shows feedback
- [ ] Ticker displays in corner

**Responsive Design**:
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Ultra-wide (1920px+)

**Browsers**:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Mobile Chrome

**Performance**:
- [ ] Animations run at 60fps
- [ ] No layout shift on load
- [ ] Images load quickly
- [ ] No console errors

### Automated Testing (Future)

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## Debugging

### Development Tools

**React DevTools**:
- Install browser extension
- Inspect component tree
- View props and state

**Next.js DevTools**:
- Built-in error overlay
- Compile errors shown in browser

**Console Logging**:
```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### Common Issues

**Hydration Errors**:
```
Error: Hydration failed because the initial UI does not match
```
**Solution**: Ensure server and client render same HTML
- Check for browser-only APIs in render
- Use `useEffect` for client-only code
- Add 'use client' directive

**Clipboard Not Working**:
```
Error: Navigator.clipboard is undefined
```
**Solution**:
- HTTPS required for clipboard API
- Use localhost in development

**Image Not Loading**:
```
Error: Failed to load image
```
**Solution**:
- Check file exists in `/public`
- Verify path is correct
- Check image format supported

## Performance Optimization

### Image Optimization

```typescript
// Always use Next.js Image
import Image from 'next/image';

<Image
  src="/logo.png"
  width={224}
  height={224}
  alt="Logo"
  priority // For above-fold images
/>
```

### Bundle Size

```bash
# Analyze bundle
npm run build
# Check .next/static/* size

# Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

### Animation Performance

```css
/* Use transform and opacity for animations */
.animated {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.3s, opacity 0.3s;
}

/* Avoid animating expensive properties */
/* Bad: */
.bad { transition: height 0.3s; }
/* Good: */
.good { transition: transform 0.3s; }
```

## VS Code Setup

### Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens"
  ]
}
```

Save as `.vscode/extensions.json`

### Workspace Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Save as `.vscode/settings.json`

## Environment Variables

### Configuration

**Development** (`.env.local`):
```env
# Public variables (exposed to browser)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/...

# Private variables (server-only)
SECRET_KEY=your_secret_here
```

**Usage**:
```typescript
// Client-side
const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Server-side
const secret = process.env.SECRET_KEY;
```

## Git Workflow

### Before Committing

```bash
# 1. Check status
git status

# 2. Review changes
git diff

# 3. Stage changes
git add .

# 4. Run checks
npm run lint
npm run type-check

# 5. Commit
git commit -m "feat: add feature"

# 6. Push
git push origin your-branch
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create PR with description
5. Request review
6. Address feedback
7. Merge when approved

## Troubleshooting

### Clear Cache

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Reset to Clean State

```bash
git clean -fdx
npm install
npm run dev
```

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Learning Resources
- [Next.js Learn](https://nextjs.org/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind Components](https://tailwindui.com/)

## Getting Help

### Internal Resources
- Check existing documentation
- Review similar components
- Ask team members

### External Resources
- [Stack Overflow](https://stackoverflow.com/)
- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)

---

Happy coding! Build something amazing. 🚀
