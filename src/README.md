# ThreadInsights.AI Dashboard

A comprehensive thread analyzer dashboard built with React, TypeScript, Tailwind CSS, and Vite. This application provides advanced analytics and management capabilities for Java thread dump analysis.

## 🚀 Features

- **Thread Analysis**: Comprehensive thread dump analysis with detailed metrics
- **Interactive Dashboard**: Real-time metrics overview with clickable charts
- **Responsive Design**: Fully responsive layout supporting mobile, tablet, laptop, and desktop
- **Advanced Analytics**: Performance charts using Recharts
- **Modern UI**: Built with Tailwind CSS v4 and Shadcn/UI components
- **TypeScript**: Full type safety and enhanced developer experience
- **File Upload**: Drag-and-drop thread dump file upload with analysis

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn** (version 1.22.0 or higher)
- **Git** (for cloning the repository)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd threadinsights-ai-dashboard
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

The application will start on `http://localhost:3000` and should automatically open in your default browser.

## 🏗️ Build for Production

To create a production build:

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

To preview the production build:

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

## 📁 Project Structure

```
threadinsights-ai-dashboard/
├── App.tsx                    # Main application component (entry point)
├── src/
│   ├── main.tsx              # Vite entry point
│   ├── components/           # React components
│   │   ├── ui/              # Shadcn/UI components
│   │   ├── DashboardOverview.tsx
│   │   ├── SignInPage.tsx
│   │   ├── FileUploadPage.tsx
│   │   ├── NewSidebar.tsx
│   │   ├── InteractiveToggle.tsx
│   │   └── ...other components
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── styles/
│       └── globals.css      # Global styles with Tailwind v4
├── styles/
│   └── globals.css          # Additional global styles
├── components/              # Additional components (legacy)
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🔧 Available Scripts

- `npm run dev` / `yarn dev` - Start development server
- `npm run build` / `yarn build` - Build for production
- `npm run preview` / `yarn preview` - Preview production build
- `npm run lint` / `yarn lint` - Run ESLint
- `npm run type-check` / `yarn type-check` - Run TypeScript type checking

## 🌐 Environment Setup

### VS Code Extensions (Recommended)

For the best development experience, install these VS Code extensions:

1. **ES7+ React/Redux/React-Native snippets**
2. **TypeScript Importer**
3. **Tailwind CSS IntelliSense**
4. **Prettier - Code formatter**
5. **ESLint**
6. **Auto Rename Tag**
7. **Bracket Pair Colorizer**

### VS Code Settings

The project includes a `.vscode/settings.json` file with optimized settings for this project.

## 📱 Responsive Breakpoints

The application supports the following responsive breakpoints:

- **Mobile**: 360px and up
- **Tablet**: 768px and up  
- **Laptop**: 1366px and up
- **Desktop**: 1920px and up

## 🎨 Design System

### Colors
- **Primary**: #030213 (Dark navy)
- **Secondary**: #315596 (Blue)
- **Background**: #ffffff (White)
- **Accent**: #e9ebef (Light gray)

### Typography
- **Base font size**: 14px
- **Font family**: Inter, system fonts fallback
- Uses CSS custom properties for consistent theming

## 🔄 State Management

The application uses React's built-in state management with:
- `useState` for component-level state
- `useEffect` for side effects
- Custom hooks for reusable logic
- Props drilling for component communication

## 📊 Data Flow

1. **Authentication**: User signs in through SignInPage
2. **File Upload**: User uploads thread dump file via FileUploadPage
3. **Analysis**: File is processed and mock data is generated
4. **Dashboard**: Results displayed in interactive dashboard
5. **Navigation**: Users can switch between Overview, Threads, and Analytics views

## 🧪 Testing

The project is set up for testing with:
- React Testing Library (to be added)
- Jest (to be added)
- Type checking with TypeScript

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Netlify**: Drag and drop the `dist` folder
2. **Vercel**: Connect your GitHub repository
3. **GitHub Pages**: Use GitHub Actions for automated deployment
4. **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts`
2. **Dependencies not installing**: Delete `node_modules` and `package-lock.json`, then run `npm install`
3. **TypeScript errors**: Run `npm run type-check` to see detailed errors
4. **Build errors**: Check that all dependencies are properly installed

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify Node.js version compatibility
4. Clear browser cache and restart development server

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details

---

**ThreadInsights.AI Dashboard** - Built with ❤️ for better thread analysis