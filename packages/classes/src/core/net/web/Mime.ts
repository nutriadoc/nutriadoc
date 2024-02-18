


export default class Mime {

  static imageTypes: string[] = [ "jpg", "jpeg", "png", "gif", "svg", "webp", "tiff", "tif", "bmp" ]

  static videoTypes: string[] = [ "mp4", "m4v", "webm", "ogv", "ogg", "aiv", "mov", "wmv", "flv" ]

  static implementation: Mime

  static shared: Mime = new class extends Mime {
    getType(_: string): string {
      throw new Error("Not implemented")
    }
  }

  getType(path: string): string {
    return Mime.implementation.getType(path)
  }

  static register(implementation: Mime): void {
    this.shared = implementation
  }
}