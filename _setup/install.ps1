# install.ps1 - Bootstrap the LLM-WIKI global guide + drift hook on THIS PC.
# Run once on each new PC after pulling the vault:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install.ps1
# Idempotent: safe to re-run (updates CLAUDE.md, won't duplicate the hook).
$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$claudeDir = Join-Path $env:USERPROFILE '.claude'
if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Path $claudeDir | Out-Null }

# 1) Install the always-loaded global memory from the vault canonical.
$src = Join-Path $here 'claude-global.md'
$dst = Join-Path $claudeDir 'CLAUDE.md'
Copy-Item -LiteralPath $src -Destination $dst -Force
Write-Host "[ok] ~/.claude/CLAUDE.md installed from vault canonical (claude-global.md)."

# 2) Merge the drift-check PostToolUse hook into settings.json (idempotent, no BOM).
$settingsPath = Join-Path $claudeDir 'settings.json'
if (Test-Path $settingsPath) {
  $settings = Get-Content -Raw -Encoding UTF8 $settingsPath | ConvertFrom-Json
} else {
  $settings = [pscustomobject]@{}
}

$checkScript = Join-Path $here 'check-claudemd-sync.ps1'
$cmd = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "' + $checkScript + '"'

if (-not $settings.PSObject.Properties['hooks']) {
  $settings | Add-Member -NotePropertyName hooks -NotePropertyValue ([pscustomobject]@{})
}
if (-not $settings.hooks.PSObject.Properties['PostToolUse']) {
  $settings.hooks | Add-Member -NotePropertyName PostToolUse -NotePropertyValue @()
}

$exists = $false
foreach ($entry in @($settings.hooks.PostToolUse)) {
  foreach ($h in @($entry.hooks)) {
    if ($h.command -and ($h.command -like '*check-claudemd-sync.ps1*')) { $exists = $true }
  }
}

if ($exists) {
  Write-Host "[skip] drift hook already present in settings.json."
} else {
  $hookEntry = [pscustomobject]@{
    matcher = 'Edit|Write'
    hooks   = @([pscustomobject]@{
      type          = 'command'
      command       = $cmd
      timeout       = 15
      statusMessage = 'Checking CLAUDE.md sync'
    })
  }
  $settings.hooks.PostToolUse = @($settings.hooks.PostToolUse) + $hookEntry
  $json = $settings | ConvertTo-Json -Depth 20
  [System.IO.File]::WriteAllText($settingsPath, $json, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "[ok] drift hook added to settings.json."
}

Write-Host ""
Write-Host "Done. Open a NEW terminal (or run /hooks) so Claude Code reloads settings."
