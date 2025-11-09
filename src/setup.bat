@echo off
echo 🚀 Setting up ThreadInsights.AI Dashboard...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version

REM Clean install dependencies
echo 📦 Installing dependencies...
if exist node_modules (
    echo 🧹 Cleaning existing node_modules...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    del package-lock.json
)

npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Type check
echo 🔍 Running TypeScript type check...
npm run type-check

if %errorlevel% neq 0 (
    echo ⚠️ TypeScript type check found issues (this may not prevent the app from running)
) else (
    echo ✅ TypeScript type check passed!
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo # ThreadInsights.AI Dashboard Environment Variables
        echo VITE_APP_NAME="ThreadInsights.AI Dashboard"
        echo VITE_APP_VERSION="1.0.0"
    ) > .env
    echo ✅ .env file created!
)

echo.
echo 🎉 Setup complete! Your ThreadInsights.AI Dashboard is ready to run.
echo.
echo To start the development server:
echo   npm run dev
echo.
echo To build for production:
echo   npm run build
echo.
echo The app will be available at: http://localhost:3000
echo.
echo Happy coding! 🚀
pause