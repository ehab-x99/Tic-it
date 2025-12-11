# Tic It - Concert Ticket Booking

A futuristic cyberpunk-themed concert ticket booking application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Cyberpunk Design**: Dark theme with neon accents, holographic effects, and futuristic typography
- **Responsive Layout**: Mobile-first design with breakpoints for all devices
- **Component Architecture**: Modular, reusable components with proper TypeScript typing
- **Performance Optimized**: Optimized build with static generation

## 🎨 Design System

### Colors
- **Cyber Blue**: #00ffff (Primary accent)
- **Cyber Pink**: #ff0080 (Secondary accent)
- **Cyber Green**: #00ff41 (Success/positive)
- **Cyber Purple**: #bf00ff (Tertiary accent)
- **Dark Theme**: Dark slate backgrounds with high contrast

### Typography
- **Headers**: Orbitron (cyberpunk-style monospace)
- **Body**: Exo 2 (modern futuristic sans-serif)
- **Animations**: Glow effects, pulse animations, gradient shifts

### Components
- CyberButton with multiple variants (primary, secondary, outline, ghost)
- CyberCard with neon borders and hover effects
- Responsive Navigation with mobile menu
- Custom scrollbars and loading animations

## 📁 Project Structure

```
/home/engine/project
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── CyberButton.tsx
│   │   └── CyberCard.tsx
│   ├── layout/           # Layout components
│   │   └── Navigation.tsx
│   ├── forms/            # Form components (future)
│   └── common/           # Shared components (future)
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
│   └── index.ts          # Global types
├── public/               # Static assets (future)
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## 🛠️ Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🎯 Current Status

✅ **Completed:**
- Next.js 14 project setup with TypeScript
- Tailwind CSS with cyberpunk theme configuration
- Dark mode with neon accent colors
- Responsive base layout and navigation component
- Custom fonts (Orbitron & Exo 2)
- Folder structure for scalable development
- CSS variables for theming
- Base components (CyberButton, CyberCard, Navigation)
- Home page with hero section and features
- Development environment running smoothly

🔄 **Next Steps:**
- Add more pages (events, artists, venues)
- Implement user authentication
- Add booking flow and payment integration
- Database integration for events and users
- Advanced search and filtering
- Social features and user profiles

## 🎨 Theme Customization

The cyberpunk theme can be easily customized by modifying:

1. **Colors**: Update CSS variables in `app/globals.css`
2. **Animations**: Adjust keyframes in Tailwind config
3. **Typography**: Modify font families in `tailwind.config.js`
4. **Components**: Extend base components in `components/ui/`

## 📱 Responsive Breakpoints

- **xs**: 475px (mobile portrait)
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

## 🔧 Configuration Files

- **tailwind.config.js**: Extended with cyberpunk colors, animations, and fonts
- **tsconfig.json**: Strict TypeScript configuration with path mapping
- **next.config.js**: Next.js optimization settings
- **postcss.config.js**: PostCSS plugins for Tailwind

## 🚀 Performance

- Static site generation for optimal performance
- Optimized bundle splitting
- Modern image optimization
- Efficient CSS with Tailwind purging
- TypeScript for better development experience

---

**Tic It** - The future of concert ticket booking! 🎵✨
