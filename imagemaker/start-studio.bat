@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ======================================================================
echo   IDENTITY LOCK STUDIO - 원장님 전용 인물 고정 AI 사진관 (평생 0원 무료 GPU)
echo   주소: http://localhost:4500
echo ======================================================================
start "" "http://localhost:4500"
node serve.js
pause
