# Radix website

## Development and validation

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm test
pnpm preview
```

The build prerenders the existing React homepage into `dist/index.html`. The browser hydrates it to preserve animations, screenshot dialogs, clipboard actions, and live GitHub statistics. With JavaScript disabled, the page remains readable; the `noscript` styles reveal content that would otherwise wait for Motion animations.

Keep `public/index.md` in sync when changing homepage product copy. It is the Markdown representation of the homepage and links to downloads, source documentation, and the sitemap.

## Hosting and agent responses

Vercel's root `middleware.js` negotiates `/` and `/index.html`. Explicit requests preferring `text/markdown` rewrite to the static Markdown file. Other requests keep the static HTML response. Both representations send `Vary: Accept`; no user-agent sniffing is used.

The fallback rewrite in `vercel.json` runs after Vercel checks existing files. Missing paths reach `api/not-found.js`, which returns HTTP 404 with either Markdown or HTML and `Vary: Accept`. Existing assets, the Sparkle appcast, release notes, robots.txt, and sitemap remain static.

`pnpm preview` serves the built static files; Vite does not run Vercel middleware or functions. To check hosting locally, serve a temporary copy of the built files with the same middleware, API handler, and routing configuration using `vercel dev --local` (framework disabled). Vercel's Vite development proxy does not model the built static file fallback correctly. Repeat these checks against a deployment when publishing is authorized:

```sh
curl -sS -L -i -H 'Accept: text/markdown' https://tryradix.app/
curl -sS -L -i -H 'Accept: text/html' https://tryradix.app/
curl -sS -L -i -H 'Accept: text/markdown' https://tryradix.app/some-path-that-does-not-exist
curl -sS -L -i -H 'Accept: text/html' https://tryradix.app/some-path-that-does-not-exist
```

Verify the final response status, content type, `Vary: Accept`, and body. The homepage must return HTTP 200 with the requested representation. Both missing-page responses must stay HTTP 404; the Markdown body must explain the error and link to the sitemap.
