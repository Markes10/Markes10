@echo off
setlocal EnableExtensions

cd /d "%~dp0"
title Next.js Portfolio - Development Server

echo.
echo Starting Next.js Portfolio...
echo Project folder: %CD%
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or is not on PATH.
    echo Install Node.js 20 or newer, then double-click this file again.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed or is not on PATH.
    echo Install Node.js 20 or newer, then double-click this file again.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Dependencies are missing. Installing them now...
    call npm ci
    if errorlevel 1 (
        echo.
        echo ERROR: Dependency installation failed.
        pause
        exit /b 1
    )
)

:: Ensure database schema is up to date before starting the dev server
echo.
echo Checking database schema...
call npm run db:generate
if errorlevel 1 (
    echo.
    echo ERROR: Failed to generate Prisma client.
    pause
    exit /b 1
)
call npm run db:push
if errorlevel 1 (
    echo.
    echo ERROR: Failed to push Prisma schema to the database.
    pause
    exit /b 1
)

:: Use port 3000 when available, otherwise fall back to port 3001.
set PORT=3000
for /f "usebackq delims=" %%A in (`powershell -NoProfile -ExecutionPolicy Bypass -Command "$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue; if ($listener) { $port = 3001; $listener2 = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue; if ($listener2) { exit 1 } else { Write-Output $port } } else { Write-Output 3000 }"`) do set PORT=%%A

if errorlevel 1 (
    echo.
    echo Ports 3000 and 3001 are both in use.
    echo Please stop the current app or choose a free port manually.
    pause
    exit /b 1
)

if "%PORT%"=="3001" (
    echo Port 3000 is in use. Using port 3001 instead.
)

if exist ".next\dev\lock" (
    echo Another Next.js server is already running for this project.
    echo Open http://localhost:%PORT% in your browser.
    exit /b 0
)

echo.
echo App URL: http://localhost:%PORT%
echo Press Ctrl+C to stop the server.
echo.
call node_modules\.bin\next.cmd dev -p %PORT%

if errorlevel 1 (
    echo.
    echo The development server stopped with an error.
)

pause
