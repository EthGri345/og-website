# Logo Setup Instructions

## Required Logo File

The website requires your OnlyGoon logo to be placed at:
```
/public/logo.png
```

## Logo Specifications

### Format
- **File Type**: PNG (with transparent background)
- **Color Mode**: RGB
- **Bit Depth**: 24-bit or 32-bit (with alpha channel)

### Dimensions
- **Recommended Size**: 512x512px or larger
- **Aspect Ratio**: 1:1 (square) preferred
- **Minimum Size**: 256x256px
- **Maximum Size**: 2048x2048px

### File Size
- **Target**: Under 500KB
- **Maximum**: 1MB
- Optimize with tools like TinyPNG or ImageOptim

## Your Logo

Based on the image provided, your logo features:
- Pink/purple gradient devil character
- "OG" text integrated into design
- "OnlyGoon" text below
- Transparent background (recommended)
- Vibrant colors matching brand identity

## How to Add Your Logo

### Option 1: Simple Copy
```bash
# Copy your logo file to the public directory
cp /path/to/your/logo.png /home/ethan-griffin/onlygoon-website/public/logo.png
```

### Option 2: Manual Addition
1. Open your file explorer
2. Navigate to the project folder: `onlygoon-website/public/`
3. Copy your logo PNG file
4. Rename it to `logo.png` (lowercase)
5. Paste it in the `public` directory

### Option 3: Optimize First (Recommended)
```bash
# Using ImageMagick (if installed)
convert original-logo.png -resize 512x512 -quality 95 public/logo.png

# Or use online tools:
# - TinyPNG: https://tinypng.com/
# - ImageOptim: https://imageoptim.com/
# - Squoosh: https://squoosh.app/
```

## Verification

After adding the logo, verify it works:

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open browser**
   - Navigate to `http://localhost:3000`

3. **Check logo appears**
   - Should see logo in center of page
   - Should see logo in lock overlay
   - Both instances should have glow effects

## Troubleshooting

### Logo Not Showing
- ✅ Check file is named exactly `logo.png` (lowercase)
- ✅ Check file is in `/public/` directory
- ✅ Restart development server
- ✅ Clear browser cache (Ctrl+Shift+R)

### Logo Looks Blurry
- Use higher resolution source image
- Ensure PNG is not compressed too much
- Minimum 512x512px recommended

### Logo Has White Background
- Export with transparent background from design tool
- Use PNG format (not JPG)
- Remove background with tools:
  - Photoshop: Magic Wand + Delete
  - remove.bg: https://remove.bg/
  - Figma: Export with transparency

### Logo Colors Look Wrong
- Check color profile is RGB (not CMYK)
- Ensure proper export settings from design tool
- Verify file on white and black backgrounds

## Image Optimization

### Recommended Settings

**Photoshop**:
- File → Export → Export As
- Format: PNG-24
- Transparency: Checked
- Convert to sRGB: Checked
- Size: 512x512px

**Figma**:
- Select frame/group
- Export settings → PNG
- 2x resolution
- Background: Transparent

**GIMP**:
- Image → Scale Image → 512x512px
- File → Export As → PNG
- Save with transparency

## Logo Usage in Code

The logo is used in two locations:

### 1. Main Page (`app/page.tsx`)
```typescript
<Image
  src="/logo.png"
  alt="OnlyGoon"
  width={224}
  height={224}
  className="w-full h-full object-contain"
  priority
/>
```

### 2. Lock Overlay (`components/LockOverlay.tsx`)
```typescript
<Image
  src="/logo.png"
  alt="OnlyGoon Logo"
  width={192}
  height={192}
  className="w-full h-full object-contain"
  priority
/>
```

## Next Steps

After adding the logo:

1. ✅ Verify logo displays correctly
2. ✅ Test on mobile device
3. ✅ Check animations work smoothly
4. ✅ Commit and push to repository:
   ```bash
   git add public/logo.png
   git commit -m "chore: add OnlyGoon logo"
   git push
   ```

## Alternative: Using a Different Image Format

If you prefer to use a different format (WebP, SVG):

### WebP
```typescript
// Update in components
<Image src="/logo.webp" ... />
```

### SVG
```typescript
// Better for scalability
<Image src="/logo.svg" ... />
```

## Questions?

Refer to:
- README.md for general setup
- DEVELOPMENT.md for development guide
- DEPLOYMENT.md for deployment steps

---

**Important**: The logo is a critical part of the brand identity. Ensure it's high quality and properly optimized before deploying to production.
