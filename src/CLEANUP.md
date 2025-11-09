# Project Structure Cleanup

If you encounter issues with duplicate files or folders, follow these steps:

## Manual Cleanup (if needed)

The project should follow the standard Vite structure:

### ✅ Keep These Files/Folders:
```
/src/                     # All source code
/.vscode/                 # VS Code settings
/App.tsx                  # Main app component (root level)
/index.html               # Entry HTML file
/package.json             # Dependencies
/vite.config.ts           # Vite config
/tsconfig.json            # TypeScript config
/tailwind.config.js       # Tailwind config
```

### ❌ Remove These if They Exist:
```
/components/              # Duplicate - should only be in /src/
/styles/                  # Duplicate - should only be in /src/
/settings.json            # Should only be in /.vscode/
/extensions.json          # Should only be in /.vscode/
```

## Quick Fix

If you see import errors, make sure:

1. **Main entry point** (`/index.html`) points to `/src/main.tsx`
2. **Main component** (`/src/main.tsx`) imports from `../App.tsx`  
3. **All components** are in `/src/components/`
4. **All styles** are in `/src/styles/`

## Verify Setup

Run these commands to verify everything works:

```bash
# Install dependencies
npm install

# Check for any errors
npm run dev
```

If you still see errors, delete `node_modules` and `package-lock.json`, then run `npm install` again.