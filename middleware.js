import { next, rewrite } from '@vercel/functions/middleware'
import { prefersMarkdown } from './server/accept.mjs'

export const config = { matcher: ['/', '/index.html'] }

export default function middleware(request) {
  const headers = { Vary: 'Accept' }
  if (prefersMarkdown(request.headers.get('accept') ?? '')) {
    headers['Content-Type'] = 'text/markdown; charset=utf-8'
    return rewrite(new URL('/index.md', request.url), { headers })
  }
  return next({ headers })
}
