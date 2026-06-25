@echo off
chcp 65001 >nul
title Pahadi Aangan — Heritage Retreat Setup
cls

echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║               🏔️  PAHADI AANGAN — SETUP                     ║
echo ║          Heritage Retreat, Kullu Valley, H.P.                ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Download from: https://nodejs.org/ (v18 or later)
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js found: 
node -v
echo.

:: Install dependencies
echo 📦 Installing dependencies (this may take 2-3 minutes)...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)
echo ✅ Dependencies installed!
echo.

:: Build
echo 🔧 Building production bundle...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✅ Build complete!
echo.

:: Start
echo 🚀 Starting server...
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║      🌐  http://localhost:3000                               ║
echo ║                                                              ║
echo ║      🔑  Admin: /admin  (admin / admin123)                  ║
echo ║                                                              ║
echo ║      Press Ctrl+C to stop the server                         ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

start http://localhost:3000
npm start -p 3000

pause
