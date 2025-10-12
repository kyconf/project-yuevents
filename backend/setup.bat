@echo off

REM ---- Check for Python installation ----
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH.
    pause
    exit /b
)

REM ---- Create venv if it doesn't exist ----
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv

    REM ---- Activate virtual environment ----
    echo Activating virtual environment...
    call venv\Scripts\activate.bat

    REM ---- Upgrade pip and install dependencies
    echo Installing dependencies...
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
) else (
    REM ---- Activate existing venv
    echo Activating existing virtual environment...
    call venv\Scripts\activate.bat
)

REM ---- Open /ping in browser ----
start http://127.0.0.1:8000/ping

REM ---- Run FastAPI server ----
echo Starting FastAPI server...
echo Press Ctrl+C to stop
uvicorn main:app --reload

pause