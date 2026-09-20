import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

// Render the same React page at build time; hosting remains static.
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
  const template = await readFile('dist/index.html', 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!template.includes(placeholder)) {
    throw new Error('Missing prerender root in dist/index.html')
  }
  await writeFile('dist/index.html', template.replace(placeholder, () => `<div id="root">${render()}</div>`))
} finally {
  await server.close()
}
