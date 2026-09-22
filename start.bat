@echo off
setlocal

set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"

title PAF-IAST Library Launcher

echo ================================================
echo   PAF-IAST Library Management - Launcher
echo ================================================
echo.

REM --- Check Node.js ---
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found.
    echo Please install Node.js 18 or later from https://nodejs.org
    pause
    exit /b 1
)

REM --- Install backend deps if missing ---
if not exist "%BACKEND%\node_modules" (
    echo [SETUP] Installing backend deps (first run only, may take a few minutes)...
    pushd "%BACKEND%"
    call npm install
    if errorlevel 1 ( popd & echo [ERROR] npm install failed for backend & pause & exit /b 1 )
    popd
)

REM --- Install frontend deps if missing ---
if not exist "%FRONTEND%\node_modules" (
    echo [SETUP] Installing frontend deps (first run only, may take a few minutes)...
    pushd "%FRONTEND%"
    call npm install
    if errorlevel 1 ( popd & echo [ERROR] npm install failed for frontend & pause & exit /b 1 )
    popd
)

REM --- Initialize database if missing ---
if not exist "%BACKEND%\prisma\dev.db" (
    echo [SETUP] Initializing database (first run only)...
    pushd "%BACKEND%"
    call npx prisma generate
    if errorlevel 1 ( popd & echo [ERROR] prisma generate failed & pause & exit /b 1 )
    call npx prisma db push --skip-generate
    if errorlevel 1 ( popd & echo [ERROR] prisma db push failed & pause & exit /b 1 )
    call npm run seed
    if errorlevel 1 ( popd & echo [ERROR] seed failed & pause & exit /b 1 )
    popd
)

echo.
echo Starting servers...
echo.

REM --- Launch backend in its own window ---
start "PAF-IAST BACKEND" /D "%BACKEND%" cmd /k npm run dev

REM --- Launch frontend in its own window ---
start "PAF-IAST FRONTEND" /D "%FRONTEND%" cmd /k npm run dev

REM --- Give them a moment to come up, then open the app ---
timeout /t 6 /nobreak >nul
start "" "http://localhost:3000"

echo ================================================
echo   Servers are running.
echo.
echo   Backend  : http://localhost:3001   (window: PAF-IAST BACKEND)
echo   Frontend : http://localhost:3000   (window: PAF-IAST FRONTEND)
echo.
echo   Close the two server windows to stop the app.
echo ================================================
echo.
pause
endlocal
