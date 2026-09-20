import { prefersMarkdown } from '../server/accept.mjs'

const markdown = `# 404 — Page not found

The requested page does not exist on the Radix website.

Visit the [Radix homepage](https://tryradix.app/) or check the [sitemap](https://tryradix.app/sitemap.xml) for available pages.
`

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found — Radix</title>
  <style>
    body { background: #0a0a0a; color: #f5f0eb; font: 18px/1.6 system-ui, sans-serif; margin: 4rem auto; max-width: 40rem; padding: 0 1.5rem; }
    a { color: #d4a054; }
  </style>
</head>
<body>
  <main>
    <h1>404 — Page not found</h1>
    <p>The requested page does not exist on the Radix website.</p>
    <p>Visit the <a href="/">Radix homepage</a> or check the <a href="/sitemap.xml">sitemap</a> for available pages.</p>
  </main>
</body>
</html>`

export default function notFound(request, response) {
  const isMarkdown = prefersMarkdown(request.headers.accept)
  response.statusCode = 404
  response.setHeader('Content-Type', `${isMarkdown ? 'text/markdown' : 'text/html'}; charset=utf-8`)
  response.setHeader('Vary', 'Accept')
  response.setHeader('Cache-Control', 'no-store')
  response.end(request.method === 'HEAD' ? undefined : isMarkdown ? markdown : html)
}
