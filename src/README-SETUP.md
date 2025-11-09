# Thread Analyzer Dashboard - VS Code Setup Guide

This is a React TypeScript project built with Vite, Tailwind CSS, and modern UI components.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **VS Code**
   - Download from: https://code.visualstudio.com/

## Step-by-Step Setup Instructions

### 1. Open Project in VS Code

1. Open VS Code
2. File → Open Folder
3. Navigate to and select your project folder
4. Click "Select Folder"

### 2. Install Recommended Extensions

VS Code should automatically prompt you to install recommended extensions. If not, install these manually:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets for React
2. **TypeScript Importer** - Auto import for TypeScript
3. **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
4. **Auto Rename Tag** - Automatically rename paired HTML tags
5. **Bracket Pair Colorizer** - Colorize matching brackets
6. **ESLint** - JavaScript/TypeScript linting
7. **Prettier** - Code formatter
8. **GitLens** - Enhanced Git capabilities
9. **Auto Import - ES6, TS, JSX, TSX** - Auto import statements

### 3. Install Dependencies

Open VS Code terminal (Terminal → New Terminal) and run:

```bash
npm install
```

This will install all the required dependencies including:
- React & React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Radix UI components
- Lucide React icons
- Recharts (for analytics)
- Motion (for animations)
- Sonner (for toast notifications)

### 4. Start Development Server

In the terminal, run:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Open your browser automatically
- Enable hot reload for instant updates
- The app will be available at `http://localhost:3000`

### 5. Project Structure Overview

```
/
├── src/                    # Main source code
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── *.tsx          # Page components
│   ├── styles/            # CSS files
│   └── main.tsx           # App entry point
├── App.tsx                # Main App component
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

### 6. Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint for code quality

### 7. VS Code Shortcuts and Tips

- **Ctrl+Shift+P** (Windows) or **Cmd+Shift+P** (Mac) - Command Palette
- **Ctrl+\`** - Toggle Terminal
- **Ctrl+Shift+E** - Explorer Panel
- **Ctrl+P** - Quick file search
- **F2** - Rename symbol
- **Ctrl+Space** - IntelliSense/Autocomplete

### 8. Development Features

This project includes:
- ✅ Hot Module Replacement (HMR) for instant updates
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Tailwind CSS for styling
- ✅ Component library (Radix UI)
- ✅ Icons (Lucide React)
- ✅ Charts (Recharts)
- ✅ Animations (Motion)
- ✅ Toast notifications (Sonner)

### 9. Troubleshooting

#### If you encounter dependency errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### If TypeScript errors persist:
```bash
npm run type-check
```

#### If the development server won't start:
1. Check if port 3000 is already in use
2. Try: `npm run dev -- --port 3001`

#### Clear browser cache:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### 10. Making Changes

1. All component files are in `/src/components/`
2. Styles are in `/src/styles/globals.css`
3. The main app logic is in `/App.tsx`
4. Changes auto-reload in the browser
5. TypeScript will show errors in VS Code in real-time

### 11. Building for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

## Next Steps

Once everything is running:
1. Explore the codebase in VS Code
2. Make small changes to see hot reload in action
3. Check the browser developer tools for any console errors
4. Start customizing the components to fit your needs

Happy coding! 🚀