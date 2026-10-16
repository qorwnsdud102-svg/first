# 윈도우 기본 OCR(한국어)로 폴더 안 이미지(*.png, *.jpg)를 읽어 같은 이름 .txt로 남긴다. 모델 없음, 밖으로 보내지 않음.
# 사용: powershell -NoProfile -ExecutionPolicy Bypass -File win_ocr.ps1 <폴더>
param([string]$Dir)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, $type) { $t = $asTaskGeneric.MakeGenericMethod($type).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }
[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine,Windows.Foundation,ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics,ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime] | Out-Null
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('ko'))
Get-ChildItem -LiteralPath $Dir -File | Where-Object { $_.Extension -in '.png','.jpg','.jpeg' } | ForEach-Object {
  $out = [System.IO.Path]::ChangeExtension($_.FullName, '.txt')
  if (Test-Path -LiteralPath $out) { return }
  try {
    $f = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($_.FullName)) ([Windows.Storage.StorageFile])
    $s = Await ($f.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $d = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($s)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $b = Await ($d.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $r = Await ($engine.RecognizeAsync($b)) ([Windows.Media.Ocr.OcrResult])
    ($r.Lines | ForEach-Object { $_.Text }) -join "`n" | Out-File -LiteralPath $out -Encoding utf8
    $s.Dispose()
  } catch { "" | Out-File -LiteralPath $out -Encoding utf8 }
}
