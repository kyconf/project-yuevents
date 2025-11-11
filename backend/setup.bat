@echo off
setlocal

REM ================================
REM   FastAPI Auto Setup Script
REM ================================

echo.
echo 🔍 Checking for Python installation...
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed or not in PATH.
    pause
    exit /b
)

REM -------------------------------
REM   Create venv if missing
REM -------------------------------
if not exist venv (
    echo 🌀 Creating virtual environment...
    python -m venv venv
)

REM -------------------------------
REM   Activate virtual environment
REM -------------------------------
echo ✅ Activating virtual environment...
call venv\Scripts\activate.bat

REM -------------------------------
REM   Upgrade pip
REM -------------------------------
echo ⬆️  Upgrading pip...
python -m pip install --upgrade pip

REM -------------------------------
REM   Install dependencies
REM -------------------------------
if exist requirements.txt (
    echo 📦 Installing dependencies from requirements.txt...
    pip install -r requirements.txt
) else (
    echo ⚠️ No requirements.txt found, skipping...
)

REM -------------------------------
REM   Ensure essential packages
REM -------------------------------
echo 🔧 Ensuring essential packages are installed...
pip install fastapi uvicorn pydantic[email] python-dotenv supabase >nul

REM -------------------------------
REM   Update requirements.txt
REM -------------------------------
echo 🗒️  Updating requirements.txt...
pip freeze > requirements.txt

REM -------------------------------
REM   Start FastAPI server
REM -------------------------------
echo 🚀 Starting FastAPI server...
start http://127.0.0.1:8000/
uvicorn main:app --reload

echo.
echo ✅ FastAPI server running. Press Ctrl+C to stop.
pause
endlocal
