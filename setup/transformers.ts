function isFenceStart(line: string) {
  const match = line.match(/^\s*(`{3,}|~{3,})/)
  return match?.[1]
}

function updateFence(line: string, fence: string | undefined) {
  if (!fence) return isFenceStart(line)
  const marker = fence[0]
  const re = new RegExp(`^\\s*${marker === '`' ? '`' : '~'}{${fence.length},}\\s*$`)
  return re.test(line) ? undefined : fence
}

function isColumnsOpen(line: string) {
  return /^:{3,}columns\s*$/.test(line.trim())
}

function isComponentOpen(line: string) {
  const trimmed = line.trim()
  return /^:{2,}[A-Za-z][\w$-]*(?:\s|\{|$)/.test(trimmed) && !/^:{2,}[\w$.-]+\s*::\s*$/.test(trimmed)
}

function isComponentClose(line: string) {
  return /^:{2,}\s*$/.test(line.trim())
}

function isColumnSeparator(line: string) {
  return /^\+\+\+\s*$/.test(line.trim())
}

function splitMdcOpeningLine(line: string) {
  const start = line.match(/^(\s*:{1,}[A-Za-z][\w$.-]*(?:\[[^\]]*\])?\s*)\{/)
  if (!start) return

  let quote: string | undefined
  let depth = 0
  for (let i = start[0].length - 1; i < line.length; i++) {
    const char = line[i]
    if (quote) {
      if (char === '\\') i++
      else if (char === quote) quote = undefined
      continue
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }
    if (char === '{' || char === '[' || char === '(') {
      depth++
      continue
    }
    if (char === '}' || char === ']' || char === ')') {
      depth--
      if (depth === 0 && char === '}') {
        return {
          before: line.slice(0, start[0].length),
          props: line.slice(start[0].length, i),
          after: line.slice(i),
        }
      }
    }
  }
}

function normalizeBareBooleanProps(props: string) {
  let out = ''
  let i = 0
  let quote: string | undefined
  let depth = 0

  while (i < props.length) {
    const char = props[i]

    if (quote) {
      out += char
      if (char === '\\') {
        out += props[i + 1] ?? ''
        i += 2
        continue
      }
      if (char === quote) quote = undefined
      i++
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      out += char
      i++
      continue
    }

    if (char === '{' || char === '[' || char === '(') {
      depth++
      out += char
      i++
      continue
    }

    if (char === '}' || char === ']' || char === ')') {
      depth = Math.max(0, depth - 1)
      out += char
      i++
      continue
    }

    if (depth === 0 && (i === 0 || /\s/.test(props[i - 1] ?? '')) && char !== ':' && char !== '@') {
      const match = props.slice(i).match(/^([A-Za-z_$][\w$.-]*)=(true|false)(?=\s|$)/)
      if (match) {
        out += `:${match[1]}="${match[2]}"`
        i += match[0].length
        continue
      }
    }

    out += char
    i++
  }

  return out
}

export function normalizeBooleanMdcProps(code: string) {
  const lines = code.split('\n')
  let fence: string | undefined

  return lines.map((line) => {
    const nextFence = updateFence(line, fence)
    if (fence || nextFence) {
      fence = nextFence
      return line
    }

    const parts = splitMdcOpeningLine(line)
    if (!parts) return line

    const props = normalizeBareBooleanProps(parts.props)

    return `${parts.before}${props}${parts.after}`
  }).join('\n')
}

function findColumnsClose(lines: string[], start: number) {
  let fence: string | undefined
  let depth = 0

  for (let i = start + 1; i < lines.length; i++) {
    const nextFence = updateFence(lines[i], fence)
    if (fence || nextFence) {
      fence = nextFence
      continue
    }

    if (isComponentClose(lines[i])) {
      if (depth === 0) return i
      depth--
      continue
    }

    if (isComponentOpen(lines[i])) depth++
  }

  return -1
}

function splitColumns(lines: string[]) {
  const columns: string[][] = [[]]
  let fence: string | undefined
  let depth = 0

  for (const line of lines) {
    const nextFence = updateFence(line, fence)
    if (fence || nextFence) {
      columns[columns.length - 1].push(line)
      fence = nextFence
      continue
    }

    if (isComponentClose(line)) {
      if (depth > 0) depth--
      columns[columns.length - 1].push(line)
      continue
    }

    if (isComponentOpen(line)) {
      depth++
      columns[columns.length - 1].push(line)
      continue
    }

    if (depth === 0 && isColumnSeparator(line)) {
      columns.push([])
      continue
    }

    columns[columns.length - 1].push(line)
  }

  return columns
}

function renderColumns(columns: string[][]) {
  const rendered = ['<Columns>']

  columns.forEach((column, index) => {
    rendered.push('', `<template #col${index + 1}>`, '')
    rendered.push(...column)
    rendered.push('', '</template>')
  })

  rendered.push('', '</Columns>')
  return rendered
}

export function transformColumnsSugar(code: string) {
  const lines = code.split('\n')
  const out: string[] = []

  for (let i = 0; i < lines.length; i++) {
    if (!isColumnsOpen(lines[i])) {
      out.push(lines[i])
      continue
    }

    const close = findColumnsClose(lines, i)
    if (close === -1) {
      out.push(lines[i])
      continue
    }

    const body = lines.slice(i + 1, close)
    const columns = splitColumns(body)

    if (columns.length < 2 || columns.length > 3) {
      out.push(...lines.slice(i, close + 1))
      i = close
      continue
    }

    out.push(...renderColumns(columns))
    i = close
  }

  return out.join('\n')
}

export function transformVesperMarkdown(code: string) {
  return transformColumnsSugar(normalizeBooleanMdcProps(code))
}

export default function () {
  return {
    pre: [
      (ctx: any) => {
        const original = ctx.s.original
        const transformed = transformVesperMarkdown(original)
        if (transformed !== original)
          ctx.s.overwrite(0, original.length, transformed)
      },
    ],
  }
}
