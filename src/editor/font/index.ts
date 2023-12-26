import DefaultFonts from "./DefaultFonts.ts";

export interface FontItem {
  name: string
  family: string
}

export default class Font {

  fonts: string = "default"

  protected registry: Map<string, FontItem> = new Map<string, FontItem>()

  protected ordinals: FontItem[] = []

  constructor(fonts: string = "default") {
    this.fonts = fonts

    this.load()
  }

  protected load() {
    DefaultFonts.forEach(font => {
      this.registry.set(font.name, font)
    })

    this.ordinals = DefaultFonts
  }

  public allFont(): FontItem[] {
    return this.ordinals
  }

  public item(name: string): FontItem | undefined {
    return this.registry.get(name)
  }

  public static shared = new Font();

}