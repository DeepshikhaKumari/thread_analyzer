# ThreadInsights.AI Dashboard - Setup Guide

## Prerequisites

Before you start, ensure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Visual Studio Code** - [Download here](https://code.visualstudio.com/)

## Quick Setup Instructions

### 1. Clone/Download the Project
Download or clone this project to your local machine.

### 2. Open in VS Code
Open the project folder in Visual Studio Code:
```bash
cd threadinsights-ai-dashboard
code .
```

### 3. Install Dependencies
Open a terminal in VS Code (`Terminal` → `New Terminal`) and run:
```bash
npm install
```

### 4. Start Development Server
Run the development server:
```bash
npm run dev
```

### 5. Open in Browser
The application will automatically open in your default browser at:
```
http://localhost:3000
```

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (Shadcn)
│   ├── DashboardOverview.tsx  # Main dashboard
│   ├── SignInPage.tsx   # Authentication page
│   ├── FileUploadPage.tsx     # File upload interface
│   └── ...             # Other components
├── styles/
│   └── globals.css      # Global styles with Tailwind v4
├── imports/             # SVG imports from Figma
├── lib/                 # Utility functions
└── App.tsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Features

✅ **Modern Tech Stack**: React 18, TypeScript, Vite
✅ **Tailwind CSS v4**: Latest styling framework
✅ **Shadcn/ui Components**: High-quality UI components
✅ **Responsive Design**: Mobile-first approach
✅ **Thread Analysis**: Comprehensive thread monitoring
✅ **Interactive Charts**: Built with Recharts
✅ **Motion Animations**: Smooth interactions

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, Vite will automatically use the next available port (3001, 3002, etc.).

### Node Version Issues
Make sure you're using Node.js version 18 or higher:
```bash
node --version
```

### Dependencies Issues
If you encounter dependency issues, try:
```bash
npm ci  # Clean install
# or
rm -rf node_modules package-lock.json && npm install
```

### TypeScript Errors
Run type checking to see detailed errors:
```bash
npm run type-check
```

## Development Tips

1. **Hot Reloading**: Changes to your code will automatically refresh the browser
2. **Component Structure**: Components are organized by feature in the `components/` directory
3. **Styling**: Use Tailwind classes for styling, with custom CSS variables defined in `globals.css`
4. **Icons**: Lucide React icons are available throughout the project
5. **Charts**: Recharts library is used for all data visualizations

## Building for Production

When ready to deploy:
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all dependencies are installed correctly
3. Verify Node.js version compatibility
4. Check the terminal output for detailed error information

## Next Steps

1. Start the development server
2. Sign in with any email address (demo mode)
3. Upload a sample thread dump file
4. Explore the dashboard features
5. Begin customizing for your needs

Happy coding! 🚀