Write-Host "Testing TurboVets API..." -ForegroundColor Cyan

try {
    # Login
    $login = Invoke-RestMethod -Uri "http://localhost:3333/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"owner@example.com","password":"ownerpass"}'
    Write-Host " Login successful" -ForegroundColor Green
    
    $token = $login.access_token
    $headers = @{Authorization="Bearer $token"}
    
    # Get tasks
    $tasks = Invoke-RestMethod -Uri "http://localhost:3333/tasks" -Method GET -Headers $headers
    Write-Host " GET /tasks - $($tasks.Count) tasks" -ForegroundColor Green
    
    # Get audit logs
    $audit = Invoke-RestMethod -Uri "http://localhost:3333/audit-log" -Method GET -Headers $headers
    Write-Host " GET /audit-log - $($audit.total) logs captured" -ForegroundColor Green
    
    Write-Host "`nRecent audit entries:" -ForegroundColor Yellow
    $audit.logs | Select-Object -Last 3 | Format-Table timestamp,userId,method,url,statusCode,duration -AutoSize
    
    Write-Host "`n=== ALL TESTS PASSED ===" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
