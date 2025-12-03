Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Testing TurboVets Challenge Locally" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Step 1: Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location "D:\tpechetti-dcb16974\apps\api"
if (-not (Test-Path "node_modules")) {
    npm install
}

Write-Host "`nStep 2: Creating .env file..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item .env.example .env
    Write-Host "✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host "`nStep 3: Starting Backend Server..." -ForegroundColor Yellow
Write-Host "Backend will run on http://localhost:3333" -ForegroundColor Cyan
Write-Host "`nTest credentials:" -ForegroundColor White
Write-Host "  owner@example.com / ownerpass" -ForegroundColor Gray
Write-Host "  admin@example.com / adminpass" -ForegroundColor Gray
Write-Host "  viewer@example.com / viewerpass" -ForegroundColor Gray
Write-Host "`nPress Ctrl+C to stop the server`n" -ForegroundColor Yellow

npm run start:dev
