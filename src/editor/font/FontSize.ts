const en: number[] = [
  8,
  9,
  10,
  11,
  12,
  14,
  18,
  24,
  30,
  36,
  48,
  60,
  72,
  96
]

export default interface FontSize {

  name: string

  size: number
}

export function fontSizes(): FontSize[] {
  return en.map(size => ({ name: size.toString(), size}))
}