#!/bin/bash

# ThreadInsights.AI Dashboard Setup Script
echo "🚀 Setting up ThreadInsights.AI Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    echo "Please update Node.js. Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Clean install dependencies
echo "📦 Installing dependencies..."
if [ -d "node_modules" ]; then
    echo "🧹 Cleaning existing node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    rm package-lock.json
fi

npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Type check
echo "🔍 Running TypeScript type check..."
npm run type-check

if [ $? -eq 0 ]; then
    echo "✅ TypeScript type check passed!"
else
    echo "⚠️ TypeScript type check found issues (this may not prevent the app from running)"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# ThreadInsights.AI Dashboard Environment Variables
VITE_APP_NAME="ThreadInsights.AI Dashboard"
VITE_APP_VERSION="1.0.0"
EOL
    echo "✅ .env file created!"
fi

echo ""
echo "🎉 Setup complete! Your ThreadInsights.AI Dashboard is ready to run."
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "The app will be available at: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"