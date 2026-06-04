import { describe, expect, it } from 'vitest'
import {
  hasUnsafeSvgContent,
  isRemoteOrDataUrl,
  isSvgPath,
  looksLikeSvg,
} from '../components/svgSafety'

describe('svgSafety', () => {
  it('classifies remote and data URLs, including protocol-relative URLs', () => {
    expect(isRemoteOrDataUrl('https://example.com/diagram.svg')).toBe(true)
    expect(isRemoteOrDataUrl('http://example.com/diagram.svg')).toBe(true)
    expect(isRemoteOrDataUrl('//example.com/diagram.svg')).toBe(true)
    expect(isRemoteOrDataUrl('data:image/svg+xml,<svg/>')).toBe(true)
    expect(isRemoteOrDataUrl('./assets/diagram.svg')).toBe(false)
  })

  it('detects SVG paths without query/hash noise', () => {
    expect(isSvgPath('./assets/diagram.svg?raw#icon')).toBe(true)
    expect(isSvgPath('./assets/photo.png')).toBe(false)
  })

  it('accepts basic SVG-shaped content', () => {
    expect(looksLikeSvg('<?xml version="1.0"?><svg viewBox="0 0 1 1"></svg>')).toBe(true)
    expect(looksLikeSvg('<html></html>')).toBe(false)
  })

  it('rejects active content and external/protocol URL references', () => {
    expect(hasUnsafeSvgContent('<svg><script>alert(1)</script></svg>')).toBe(true)
    expect(hasUnsafeSvgContent('<svg onload="alert(1)"></svg>')).toBe(true)
    expect(hasUnsafeSvgContent('<svg><foreignObject><div /></foreignObject></svg>')).toBe(true)
    expect(hasUnsafeSvgContent('<svg><a href="javascript:alert(1)"></a></svg>')).toBe(true)
    expect(hasUnsafeSvgContent('<svg><image href="https://example.com/pixel.png" /></svg>')).toBe(true)
    expect(hasUnsafeSvgContent('<svg><rect fill="var(--vp-base)" /></svg>')).toBe(false)
  })
})
