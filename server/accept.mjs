// HTML remains the default unless Markdown is explicitly requested and preferred.
export function prefersMarkdown(accept = '') {
  const ranges = accept.toLowerCase().split(',').map(part => {
    const [type, ...parameters] = part.trim().split(';').map(value => value.trim())
    const quality = parameters.find(parameter => parameter.startsWith('q='))
    const q = quality === undefined ? 1 : Number(quality.slice(2))
    return { type, q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 }
  })
  const quality = type => {
    for (const range of [type, 'text/*', '*/*']) {
      const matches = ranges.filter(item => item.type === range)
      if (matches.length) return Math.max(...matches.map(item => item.q))
    }
    return 0
  }
  const markdown = quality('text/markdown')
  return ranges.some(range => range.type === 'text/markdown') &&
    markdown > 0 && markdown >= quality('text/html')
}
