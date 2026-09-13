$root = (Get-Location).Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:4173/')
$listener.Start()
Write-Host "AlXPlay disponible en http://localhost:4173/"
Write-Host "Presiona Ctrl+C para detener el servidor."

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'
  '.png' = 'image/png'
  '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.svg' = 'image/svg+xml'
  '.webmanifest' = 'application/manifest+json; charset=utf-8'
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $relativePath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
    $filePath = Join-Path $root ($relativePath -replace '/', '\\')

    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $context.Response.ContentType = $mimeTypes[$extension]
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
    }
    $context.Response.Close()
  }
} finally {
  $listener.Stop()
}
