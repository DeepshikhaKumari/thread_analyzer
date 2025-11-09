# 🚀 Quick Start Guide - ThreadInsights.AI Dashboard

Get your ThreadInsights.AI Dashboard up and running in VS Code in just a few minutes!

## ⚡ One-Click Setup

### For Windows Users:

1. Open Command Prompt or PowerShell in the project directory
2. Run the setup script:
   ```bash
   setup.bat
   ```

### For Mac/Linux Users:

1. Open Terminal in the project directory
2. Make the script executable and run it:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

### Manual Setup (if scripts don't work):

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser to:**
   ```
   http://localhost:3000
   ```

## 🎯 What You'll See

1. **Sign In Page** - Enter any email to sign in (no real authentication)
2. **File Upload Page** - Upload a thread dump file or use the demo
3. **Dashboard** - Explore the analytics with mock data

## 🛠️ VS Code Setup

### Recommended Extensions (Auto-prompted):

- **Tailwind CSS IntelliSense** - CSS class autocomplete
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **ES7+ React/Redux Snippets** - React snippets
- **TypeScript Importer** - Auto imports

### Quick Tips:

- **Auto-format on save** is enabled
- **Auto-organize imports** on save
- **Tailwind CSS suggestions** in strings
- **File nesting** is configured for better organization

## 📁 Key Files to Know

```
├── App.tsx                    # 🏠 Main app component (START HERE)
├── src/
│   ├── main.tsx              # Entry point
│   ├── components/           # React components
│   └── styles/globals.css    # Tailwind styles
├── package.json              # Dependencies
├── vite.config.ts           # Vite configuration
└── README.md                # Full documentation
```

## 🎨 Development Workflow

1. **Start coding** in `App.tsx` or any component in `src/components/`
2. **Hot reload** automatically updates the browser
3. **TypeScript checking** shows errors in real-time
4. **Tailwind classes** get auto-suggestions
5. **Prettier** formats code on save

## 🏃‍♂️ Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔧 Troubleshooting

### Issue: Port 3000 is busy

**Solution:** Kill the process or change port in `vite.config.ts`

### Issue: Dependencies not installing

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution:** Run `npm run type-check` for detailed errors

### Issue: Tailwind not working

**Solution:** Check if Tailwind CSS extension is installed

## 🎉 You're Ready!

Your ThreadInsights.AI Dashboard is now ready for development. Start by exploring the existing components and making your own modifications!

**Need help?** Check the full README.md for detailed documentation.

Happy coding! 🚀