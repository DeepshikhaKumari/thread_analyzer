# 🚀 ThreadInsights.AI Dashboard - Complete Setup Guide

This guide will help you set up and run the ThreadInsights.AI Dashboard on your local machine using Visual Studio Code.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Visual Studio Code**
   - Download from: https://code.visualstudio.com/

4. **Git** (recommended)
   - Download from: https://git-scm.com/

## 🛠️ Step-by-Step Setup

### Step 1: Download/Clone the Project

#### Option A: Download ZIP
1. Download all the project files as a ZIP
2. Extract to your desired location
3. Rename the folder to `threadinsights-ai-dashboard`

#### Option B: Clone Repository (if available)
```bash
git clone <repository-url>
cd threadinsights-ai-dashboard
```

### Step 2: Open in Visual Studio Code

1. Open Visual Studio Code
2. Go to `File` → `Open Folder`
3. Select the `threadinsights-ai-dashboard` folder
4. VS Code will automatically detect the project

### Step 3: Install Recommended Extensions

When you open the project, VS Code will prompt you to install recommended extensions. Click **"Install"** or manually install:

1. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
2. **Prettier - Code formatter** - `esbenp.prettier-vscode`
3. **ESLint** - `dbaeumer.vscode-eslint`
4. **TypeScript and JavaScript Language Features** - `ms-vscode.vscode-typescript-next`
5. **Auto Rename Tag** - `formulahendry.auto-rename-tag`
6. **Path Intellisense** - `christian-kohler.path-intellisense`

### Step 4: Install Project Dependencies

Open the **Terminal** in VS Code (`View` → `Terminal` or `Ctrl+``) and run:

```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Tailwind CSS v4
- Vite
- Motion (animations)
- Recharts (charts)
- Lucide React (icons)
- Radix UI components
- And many more...

### Step 5: Start the Development Server

In the terminal, run:

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

You should see output similar to:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 6: Open the Application

1. The application should automatically open in your default browser
2. If not, manually navigate to `http://localhost:3000`
3. You should see the ThreadInsights.AI sign-in page

## 🎯 Project Structure Overview

```
threadinsights-ai-dashboard/
├── 📁 src/                          # Source code
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # UI components (shadcn/ui)
│   │   ├── 📄 DashboardOverview.tsx # Main dashboard
│   │   ├── 📄 DetailedMetricView.tsx# Detailed analysis
│   │   ├── 📄 SignInPage.tsx        # Authentication
│   │   ├── 📄 FileUploadPage.tsx    # File upload
│   │   └── 📄 ...                   # Other components
│   ├── 📁 styles/
│   │   └── 📄 globals.css           # Tailwind CSS styles
│   └── 📄 main.tsx                  # App entry point
├── 📄 App.tsx                       # Main app component
├── 📄 index.html                    # HTML template
├── 📄 package.json                  # Dependencies
├── 📄 vite.config.ts               # Vite configuration
├── 📄 tsconfig.json                # TypeScript config
├── 📄 tailwind.config.js           # Tailwind config
└── 📄 README.md                    # Documentation
```

## 🧩 Understanding the Application

### Main Components

1. **App.tsx** - Main application component with routing logic
2. **SignInPage.tsx** - User authentication interface
3. **FileUploadPage.tsx** - Thread dump file upload
4. **DashboardOverview.tsx** - Main dashboard with metrics
5. **DetailedMetricView.tsx** - Detailed analysis views
6. **ThreadsTable.tsx** - Thread listing and details

### Key Features to Explore

1. **📊 Dashboard Overview**
   - 6 main metric cards (Total Threads, Deadlocks, CPU Usage, etc.)
   - Click "View More" on any card for detailed analysis

2. **📈 Detailed Metric Views**
   - 4 interactive tabs: Overview, Charts, Details, Recommendations
   - Comprehensive thread analysis with actionable insights

3. **📱 Responsive Design**
   - Test on different screen sizes
   - Mobile-first design approach

4. **🎨 Modern UI**
   - Clean, professional interface
   - Smooth animations and transitions

## ⚡ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🔧 Customization

### Modifying Styles
- Edit `src/styles/globals.css` for global styles
- Use Tailwind CSS classes in components
- Customize color scheme by modifying CSS variables

### Adding New Components
- Create new files in `src/components/`
- Follow the existing naming convention
- Import and use in `App.tsx` or other components

### Modifying Data
- Update mock data in component files
- Customize charts and metrics as needed
- Add new analysis features

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port 3000 is already in use**
   ```bash
   # Use a different port
   npm run dev -- --port 3001
   ```

3. **TypeScript errors**
   ```bash
   # Run type checking to see detailed errors
   npm run type-check
   ```

4. **Tailwind CSS not working**
   - Ensure `globals.css` is imported in `main.tsx`
   - Check VS Code Tailwind CSS extension is installed
   - Verify class names are correct

5. **Build fails**
   ```bash
   # Check for linting errors first
   npm run lint
   # Fix any TypeScript errors
   npm run type-check
   ```

### VS Code Specific

1. **IntelliSense not working**
   - Restart TypeScript language service: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
   - Ensure workspace trust is enabled

2. **Tailwind CSS suggestions not appearing**
   - Install the Tailwind CSS IntelliSense extension
   - Reload VS Code window

3. **Auto-formatting not working**
   - Ensure Prettier extension is installed and enabled
   - Check if `editor.formatOnSave` is enabled in settings

## 🎉 Success Indicators

You've successfully set up the project when:

- ✅ Development server starts without errors
- ✅ Browser opens to `http://localhost:3000`
- ✅ You see the ThreadInsights.AI sign-in page
- ✅ No console errors in browser developer tools
- ✅ VS Code shows no TypeScript errors
- ✅ Tailwind CSS IntelliSense works in VS Code

## 📚 Next Steps

1. **Explore the Application**
   - Sign in with any email address
   - Upload a sample thread dump file (or use the mock upload)
   - Navigate through different sections

2. **Review the Code**
   - Start with `App.tsx` to understand the structure
   - Look at component files to see implementation details
   - Examine the Tailwind CSS setup in `globals.css`

3. **Customize and Extend**
   - Modify existing components
   - Add new features
   - Customize the design and branding

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review the main README.md file
3. Look at VS Code's integrated terminal for error messages
4. Check the browser console for runtime errors
5. Ensure all prerequisites are correctly installed

## 🎯 Pro Tips

1. **Use VS Code shortcuts**:
   - `Ctrl+` (backtick) - Toggle terminal
   - `Ctrl+Shift+P` - Command palette
   - `Ctrl+P` - Quick file open

2. **Development workflow**:
   - Keep the dev server running while coding
   - Save files to see changes instantly (hot reload)
   - Use browser dev tools for debugging

3. **Code organization**:
   - Follow the existing folder structure
   - Use TypeScript for type safety
   - Keep components small and focused

---

**🎉 Congratulations! You now have ThreadInsights.AI Dashboard running locally!**

Happy coding! 🚀