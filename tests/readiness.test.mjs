import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { once } from 'node:events'
import test from 'node:test'
import middleware from '../middleware.js'
import notFound from '../api/not-found.js'
import { prefersMarkdown } from '../server/accept.mjs'

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const markdown = await readFile(new URL('../dist/index.md', import.meta.url), 'utf8')

test('built homepage has meaningful raw HTML and sequential headings', () => {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
  const text = body.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  assert.ok(text.length >= 500, `Only ${text.length} characters of content`)
  for (const phrase of ['Radix scans millions of files', 'Requires macOS 14', 'Discard Pile', 'Saved Snapshots']) {
    assert.ok(text.includes(phrase), `Missing homepage content: ${phrase}`)
  }
  const headings = [...body.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]))
  assert.equal(headings[0], 1)
  assert.equal(headings.filter(level => level === 1).length, 1)
  headings.forEach((level, index) => {
    if (index > 0) assert.ok(level <= headings[index - 1] + 1, 'Skipped heading level')
  })
  assert.match(html, /<noscript>[\s\S]*opacity: 1 !important;[\s\S]*<\/noscript>/)
})

test('Markdown homepage includes product content and working site entry points', () => {
  assert.ok(markdown.length >= 500)
  assert.match(markdown, /^# Radix/)
  assert.ok(!markdown.includes('<html'))
  for (const phrase of ['macOS 14', 'sunburst', 'treemap', 'Discard Pile', 'brew install --cask radix', 'https://tryradix.app/sitemap.xml']) {
    assert.ok(markdown.includes(phrase), `Missing Markdown content: ${phrase}`)
  }
})

for (const [accept, expected] of [
  ['', false],
  ['*/*', false],
  ['text/*', false],
  ['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', false],
  ['text/markdown', true],
  ['TEXT/MARKDOWN; charset=utf-8', true],
  ['text/markdown, text/html;q=0.9', true],
  ['text/html, text/markdown;q=0.5', false],
  ['text/markdown;q=0, */*;q=1', false],
  ['text/markdown;q=0.8, text/*;q=0.4', true],
  ['text/html;q=0, text/markdown;q=0.5, */*;q=1', true],
  ['text/markdown;q=invalid, text/html', false],
  ['text/markdown-preview', false],
]) {
  test(`negotiates Accept: ${accept || '(absent)'}`, () => {
    assert.equal(prefersMarkdown(accept), expected)
    const response = middleware(new Request('https://tryradix.app/?source=test', { headers: { accept } }))
    assert.equal(response.headers.get('vary'), 'Accept')
    if (expected) {
      assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
      assert.equal(response.headers.get('x-middleware-rewrite'), 'https://tryradix.app/index.md')
    } else {
      assert.equal(response.headers.get('x-middleware-next'), '1')
      assert.equal(response.headers.get('x-middleware-rewrite'), null)
      assert.equal(response.headers.get('content-type'), null)
    }
  })
}

test('404 handler returns the negotiated status, headers, and body over HTTP', async t => {
  const server = createServer(notFound).listen(0, '127.0.0.1')
  t.after(() => new Promise(resolve => server.close(resolve)))
  await once(server, 'listening')
  const url = `http://127.0.0.1:${server.address().port}/__ora-404-probe`
  for (const accept of ['text/markdown', 'text/html', '*/*']) {
    const response = await fetch(url, { headers: { accept } })
    const body = await response.text()
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('vary'), 'Accept')
    assert.equal(response.headers.get('content-type'), `${accept === 'text/markdown' ? 'text/markdown' : 'text/html'}; charset=utf-8`)
    assert.ok(body.length >= 20)
    if (accept === 'text/markdown') {
      assert.match(body, /^# 404/)
      assert.match(body, /\[sitemap\]\(https:\/\/tryradix\.app\/sitemap\.xml\)/)
      assert.ok(!body.includes('<html'))
    } else {
      assert.match(body, /<!doctype html>/i)
    }
  }
  const head = await fetch(url, { method: 'HEAD', headers: { accept: 'text/markdown' } })
  assert.equal(head.status, 404)
  assert.equal(head.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(await head.text(), '')
})
