@echo off
echo Starting CrowdShield AI Intelligence System...

echo Starting Backend FastAPI Service...
start cmd /k "cd backend && pip install -r requirements.txt && python main.py"

echo Starting Frontend Next.js Service...
start cmd /k "cd next-frontend && npm install && npm run dev"

echo Both services have been started.
echo UI will be available at http://localhost:3000
echo API will be available at http://localhost:8000
pause
