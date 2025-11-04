python3 --version || { echo "❌ Python not found. Install from python.org."; exit 1; }

if [ ! -d "venv" ]; then
  echo "🌀 Creating virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate
python3 -m pip install --upgrade pip

if [ -f "requirements.txt" ]; then
  echo "📦 Installing dependencies..."
  pip install -r requirements.txt
else
  echo "⚠️ No requirements.txt found, installing essentials..."
  pip install fastapi uvicorn "pydantic[email]" python-dotenv supabase psycopg2-binary
fi

pip freeze > requirements.txt
open http://127.0.0.1:8000/
uvicorn main:app --reload
