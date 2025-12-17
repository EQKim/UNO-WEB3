@echo off
echo Cleaning node_modules and reinstalling...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
echo Installing dependencies...
npm install
echo Done! You can now run: npm run dev
