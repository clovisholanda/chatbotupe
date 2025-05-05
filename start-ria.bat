@echo off
echo Starting Flask Server...
start /min cmd /k "python app.py"

timeout /t 5

echo Starting Node Server...
start /min cmd /k "node server.js"

timeout /t 5

echo Starting React Application...
set PORT=3001
set BROWSER=none
start /min cmd /k "npm start"

echo ALL services started. The script will now exit.
exit
