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

function Write-JsonResponse($context, $payload, $statusCode = 200) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes(($payload | ConvertTo-Json -Depth 8 -Compress))
  $context.Response.StatusCode = $statusCode
  $context.Response.ContentType = 'application/json; charset=utf-8'
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.Close()
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $relativePath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }

    if ($relativePath -eq 'api/youtube-search') {
      $query = $context.Request.QueryString['q']
      $apiKey = $env:YOUTUBE_API_KEY
      if ([string]::IsNullOrWhiteSpace($query)) { Write-JsonResponse $context @{ error = 'Escribe algo para buscar.' } 400; continue }
      if ([string]::IsNullOrWhiteSpace($apiKey)) { Write-JsonResponse $context @{ error = 'Falta configurar YOUTUBE_API_KEY en el servidor.' } 503; continue }
      try {
        $encodedQuery = [System.Uri]::EscapeDataString($query.Trim())
        $url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=$encodedQuery&key=$apiKey"
        $youtubeResponse = Invoke-RestMethod -Uri $url -Method Get
        $results = @($youtubeResponse.items | ForEach-Object { @{ id = $_.id.videoId; title = $_.snippet.title; channel = $_.snippet.channelTitle; thumbnail = $_.snippet.thumbnails.medium.url; description = $_.snippet.description } })
        Write-JsonResponse $context @{ items = $results }
      } catch {
        Write-JsonResponse $context @{ error = 'No se pudo consultar YouTube.' } 502
      }
      continue
    }
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
