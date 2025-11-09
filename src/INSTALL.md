# 🚀 Thread Analyzer Dashboard - Installation Guide

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open browser**: Automatically opens at `http://localhost:3000`

## Features
- ✅ **Authentication Flow**: Sign In → Upload → Dashboard
- ✅ **File Upload**: Drag & drop thread dump files
- ✅ **Interactive Dashboard**: Real-time charts and metrics
- ✅ **Thread Analysis**: Sortable/filterable tables
- ✅ **Responsive Design**: Mobile and desktop support

## File Structure
```
src/
├── components/         # React components
│   ├── ui/            # Shadcn UI components
│   ├── figma/         # Figma integration
│   └── ...            # Feature components
├── styles/            # Tailwind CSS v4
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Available Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Code linting
```

## VS Code Setup
The project includes:
- ✅ Auto-formatting with Prettier
- ✅ ESLint integration
- ✅ Tailwind CSS IntelliSense
- ✅ TypeScript auto-imports
- ✅ React snippets

## Supported File Types
- `.txt` - Text files
- `.dump` - Thread dump files
- `.log` - Log files
- `.jstack` - JStack output
- `.tdump` - Thread dump files

**Ready to analyze threads!** 🧵📊