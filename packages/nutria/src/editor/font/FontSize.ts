
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

export class FontSizeManager {

  protected sizes: FontSize[] = []

  public static readonly shared: FontSizeManager = new FontSizeManager(fontSizes())

  public constructor(sizes: FontSize[]) {
    this.sizes = sizes
  }

  public next(size: number): FontSize | undefined {
    const index: number = this.sizes.findIndex(fontSize => fontSize.size === size)

    if (index === -1) {
      return undefined
    }

    return this.sizes[index + 1]
  }

public previous(size: number): FontSize | undefined {
    const index: number = this.sizes.findIndex(fontSize => fontSize.size === size)

    if (index === -1) {
      return undefined
    }

    return this.sizes[index - 1]
  }
}

export function fontSizes(): FontSize[] {
  return en.map(size => ({ name: size.toString(), size}))
}