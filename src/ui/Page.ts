import Option from "../editor/Option.ts"
// import Load from "./Load.ts";

export default class Page {
  static async setup(option?: Option): Promise<void> {
    const viewport = document.querySelector('meta[name="viewport"]')
    viewport?.setAttribute('content', 'width=deviceWidth, initial-scale=1.0')

    await this.loadStyleSheet(option)
  }

  static async loadStyleSheet(option?: Option): Promise<void> {
    const assetFromLocal = option?.assetFromRemote === false
    if (assetFromLocal) return

    const mode = import.meta.env.MODE
    if (mode === 'development') return
    // await Load.loadCSS('https://cdn.jsdelivr.net/npm/@nutriadoc/nutriadoc@0/dist/style.css')
  }
}