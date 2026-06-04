import { describe, expect, it } from 'vitest'
import {
  normalizeBooleanMdcProps,
  transformColumnsSugar,
  transformVesperMarkdown,
} from '../setup/transformers'

describe('normalizeBooleanMdcProps', () => {
  it('converts bare true and false MDC props to Vue boolean bindings', () => {
    expect(normalizeBooleanMdcProps(':::block{compact=true disabled=false}\n:::')).toBe(
      ':::block{:compact="true" :disabled="false"}\n:::',
    )
  })

  it('preserves existing bindings, listeners, and quoted string values', () => {
    const input = ':::block{:compact="true" @click="noop" title="true" compact="false" note="foo compact=true bar"}\n:::'
    expect(normalizeBooleanMdcProps(input)).toBe(input)
  })

  it('does not rewrite booleans inside nested object or array expressions', () => {
    const input = ':::block{config={ compact: true } flags=[false] compact=true}\n:::'
    expect(normalizeBooleanMdcProps(input)).toBe(':::block{config={ compact: true } flags=[false] :compact="true"}\n:::')
  })

  it('does not rewrite examples inside fenced code blocks', () => {
    const input = [
      '```md',
      ':::block{compact=true}',
      ':::',
      '```',
      ':::block{compact=true}',
      ':::',
    ].join('\n')

    expect(normalizeBooleanMdcProps(input)).toBe([
      '```md',
      ':::block{compact=true}',
      ':::',
      '```',
      ':::block{:compact="true"}',
      ':::',
    ].join('\n'))
  })

  it('handles the reported block shorthand example', () => {
    const input = [
      ':::block{type="info" title="NOTE" compact=true}',
      'Calendar auto-responses require no action.',
      ':::',
    ].join('\n')

    expect(transformVesperMarkdown(input)).toContain(':::block{type="info" title="NOTE" :compact="true"}')
  })
})

describe('transformColumnsSugar', () => {
  it('transforms two-column sugar into Columns slots', () => {
    const result = transformColumnsSugar([
      ':::columns',
      'Left',
      '',
      '+++',
      '',
      'Right',
      ':::',
    ].join('\n'))

    expect(result).toContain('<Columns>')
    expect(result).toContain('<template #col1>')
    expect(result).toContain('<template #col2>')
    expect(result).toContain('Left')
    expect(result).toContain('Right')
    expect(result).toContain('</Columns>')
  })

  it('transforms three-column sugar into Columns slots', () => {
    const result = transformColumnsSugar([
      ':::columns',
      'One',
      '+++',
      'Two',
      '+++',
      'Three',
      ':::',
    ].join('\n'))

    expect(result).toContain('<template #col1>')
    expect(result).toContain('<template #col2>')
    expect(result).toContain('<template #col3>')
    expect(result).toContain('Three')
  })

  it('does not split on nested component separators', () => {
    const input = [
      ':::columns',
      'Left',
      '+++',
      ':::block{type="info"}',
      'Nested before',
      '+++',
      'Nested after',
      ':::',
      ':::',
    ].join('\n')

    const result = transformColumnsSugar(input)

    expect(result).toContain('<template #col2>')
    expect(result).not.toContain('<template #col3>')
    expect(result).toContain('Nested before\n+++\nNested after')
  })

  it('leaves unclosed columns unchanged', () => {
    const input = ':::columns\nLeft\n+++\nRight'
    expect(transformColumnsSugar(input)).toBe(input)
  })

  it('leaves unsupported column counts unchanged', () => {
    const oneColumn = ':::columns\nOnly one\n:::'
    const fourColumns = ':::columns\nOne\n+++\nTwo\n+++\nThree\n+++\nFour\n:::'

    expect(transformColumnsSugar(oneColumn)).toBe(oneColumn)
    expect(transformColumnsSugar(fourColumns)).toBe(fourColumns)
  })
})
