#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 ThreadInsights.AI Dashboard - Setup Check\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
console.log(`📋 Node.js version: ${nodeVersion}`);
if (majorVersion < 18) {
  console.log('❌ Node.js version 18 or higher is required');
  process.exit(1);
} else {
  console.log('✅ Node.js version is compatible');
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.log('❌ package.json not found');
  process.exit(1);
} else {
  console.log('✅ package.json found');
}

// Check if src directory exists
if (!fs.existsSync('src')) {
  console.log('❌ src directory not found');
  process.exit(1);
} else {
  console.log('✅ src directory found');
}

// Check critical files
const criticalFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/styles/globals.css',
  'index.html',
  'vite.config.ts',
  'tsconfig.json'
];

let allFilesExist = true;
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('\n📦 Dependencies not installed yet');
  console.log('   Run: npm install');
} else {
  console.log('✅ node_modules found');
}

if (allFilesExist) {
  console.log('\n🎉 Setup check completed successfully!');
  console.log('\n🚀 To start development:');
  console.log('   1. npm install (if not done yet)');
  console.log('   2. npm run dev');
  console.log('   3. Open http://localhost:3000');
} else {
  console.log('\n❌ Some critical files are missing. Please check the project structure.');
  process.exit(1);
}