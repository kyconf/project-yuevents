@echo off
REM ---- Delete existing venv if exists ----
if exist venv (
    echo Deleting old virtual environment...
    rmdir /s /q venv
)

REM ---- Create virtual environment ----
echo Creating virtual environment...
python -m venv venv

REM ---- Activate virtual environment ----
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM ---- Upgrade pip and install dependencies ----
echo Installing dependencies...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

REM ---- Run FastAPI ----
echo Starting FastAPI server...
uvicorn main:app --reload
