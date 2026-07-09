# Pepsino Lab — local HTTP server for ES modules
# Usage: powershell -ExecutionPolicy Bypass -File serve.ps1
# Then open http://localhost:8080

$port = 8080
$root = $PSScriptRoot

Write-Host "Pepsino Lab server starting on http://localhost:$port"
Write-Host "Root: $root"
Write-Host "Press Ctrl+C to stop."

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }

    $filePath = Join-Path $root ($path.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar))

    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [IO.File]::ReadAllBytes($filePath)
      $ext = [IO.Path]::GetExtension($filePath).ToLower()
      $mime = switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css'  { 'text/css; charset=utf-8' }
        '.js'   { 'application/javascript; charset=utf-8' }
        '.json' { 'application/json; charset=utf-8' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.svg'  { 'image/svg+xml' }
        default { 'application/octet-stream' }
      }
      $response.ContentType = $mime
      $response.StatusCode = 200
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
  }
} finally {
  $listener.Stop()
}
