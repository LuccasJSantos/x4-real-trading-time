@echo off
chcp 65001 >nul
REM Build script for Windows - creates dist/ folder and copies mod files

echo 🏗️  Creating dist folder...
if exist dist (
    rmdir /s /q dist
)
mkdir dist

echo 📋 Copying mod files...
copy content.xml dist\
copy preview.jpg dist\
xcopy aiscripts dist\aiscripts\ /E /I >nul || exit /b 1

echo ✅ Build complete! Mod files copied to dist\
