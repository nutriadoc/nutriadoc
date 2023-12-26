enum Format {
  Title,
  Subtitle,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
  NormalText,
  FontFamily,
  Bold,
  I,
}

export function formatToHeadingLevel(format: Format): number | undefined {
  let level: number | undefined = undefined
  let key = formatToKey(format)

  switch (format) {
    case Format.NormalText:
      level = undefined
      break
    case Format.Title:
      level = 1
      break;
    case Format.Subtitle:
      level = 2
      break;
    default:
      if (!key.startsWith("Heading")) return
      level = parseInt(key.replace("Heading", ""))
      break
  }

  return level
}

export function toStyles(level: number, isTitle?: boolean, isSubtitle?: boolean): Format | undefined {
  if (!level && !isTitle && !isSubtitle) return Format.NormalText

  let format: Format
  if (isTitle) {
    format = Format.Title
  } else if (isSubtitle) {
    format = Format.Subtitle
  } else {
    const formatKey = `Heading${level}`
    format = Format[formatKey as keyof typeof Format]
  }

  return format
}

export function keyToFormat(key: string): Format {
  const initial = key.charAt(0).toUpperCase()
  key = initial + key.slice(1)

  return Format[key as keyof typeof Format]
}

export function formatToKey(format: Format): string {
  return Format[format]
}

export default Format