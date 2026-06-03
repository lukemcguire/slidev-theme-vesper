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

function transformColumnsSugar(code: string) {
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

export default function () {
  return {
    pre: [
      (ctx: any) => {
        const original = ctx.s.original
        const transformed = transformColumnsSugar(original)
        if (transformed !== original)
          ctx.s.overwrite(0, original.length, transformed)
      },
    ],
  }
}
