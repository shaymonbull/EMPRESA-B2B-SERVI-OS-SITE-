@echo off
cd /d "%~dp0"
where node >nul 2>nul && (node server.js --open) || (python serve.py)
