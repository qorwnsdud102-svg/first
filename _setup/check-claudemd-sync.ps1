# check-claudemd-sync.ps1
# PostToolUse(Edit|Write) drift guard.
# Warns when the live global memory (~/.claude/CLAUDE.md) diverges from the
# vault canonical (_setup/claude-global.md, git-synced). ASCII-only on purpose:
# no Korean literals / no Korean paths in the executable chain -> codepage-safe.
#
# Reads the hook JSON from stdin, only reacts when the edited file is the live
# global memory or the canonical itself, and prints a JSON warning on drift.
param(
  [string]$Live  = (Join-Path $env:USERPROFILE '.claude\CLAUDE.md'),
  [string]$Canon = (Join-Path $PSScriptRoot 'claude-global.md')
)

try {
  # --- read stdin (UTF-8) ---
  $raw = ''
  try {
    $si = [System.Console]::OpenStandardInput()
    $sr = New-Object System.IO.StreamReader($si, [System.Text.Encoding]::UTF8)
    $raw = $sr.ReadToEnd()
  } catch { }

  $fp = $null
  if ($raw) { try { $fp = ($raw | ConvertFrom-Json).tool_input.file_path } catch { } }

  function Full([string]$p) { try { [System.IO.Path]::GetFullPath($p) } catch { $p } }

  # --- only react when the edited file is the live memory or the canonical ---
  if ($fp) {
    $fpFull    = Full $fp
    $liveFull  = Full $Live
    $canonFull = Full $Canon
    if ($fpFull -ne $liveFull -and $fpFull -ne $canonFull) { exit 0 }
  }

  if (-not (Test-Path $Live) -or -not (Test-Path $Canon)) { exit 0 }

  $a = Get-Content -Raw -Encoding UTF8 $Live
  $b = Get-Content -Raw -Encoding UTF8 $Canon

  function Norm([string]$s) {
    if ($null -eq $s) { return '' }
    (($s -replace "`r`n", "`n") -replace "[ \t]+(?=`n)", "").TrimEnd()
  }

  if ((Norm $a) -eq (Norm $b)) { exit 0 }

  $msg = "CLAUDE.md drift: ~/.claude/CLAUDE.md differs from the vault canonical (_setup/claude-global.md). Re-sync them: if the canonical changed, run _setup/install.ps1; if this was a deliberate global-guide edit, copy it back into _setup/claude-global.md and commit."
  $out = [ordered]@{
    systemMessage      = $msg
    hookSpecificOutput = [ordered]@{
      hookEventName     = 'PostToolUse'
      additionalContext = "$msg (Live: $Live | Canon: $Canon)"
    }
  }
  $out | ConvertTo-Json -Depth 6 -Compress
  exit 0
} catch {
  exit 0
}
