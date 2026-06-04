export function isRemoteOrDataUrl(src: string) {
  return /^(?:https?:|data:|\/\/)/i.test(src.trim())
}

export function isSvgPath(src: string) {
  return src.split(/[?#]/, 1)[0]?.toLowerCase().endsWith('.svg') ?? false
}

export function looksLikeSvg(content: string) {
  return /^\s*(?:<\?xml[\s\S]*?\?>\s*)?(?:<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(content)
}

export function hasUnsafeSvgContent(content: string) {
  return (
    /<\s*(?:script|foreignObject|iframe|object|embed|audio|video|canvas|link|meta|base)\b/i.test(content)
    || /\son[a-z]+\s*=/i.test(content)
    || /\s(?:href|xlink:href|src)\s*=\s*(['"]?)\s*(?:javascript:|data:|https?:|\/\/)/i.test(content)
    || /url\(\s*(['"]?)\s*(?:javascript:|data:|https?:|\/\/)/i.test(content)
  )
}
