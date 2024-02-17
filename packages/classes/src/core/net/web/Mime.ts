
export default class Mime {

  static imageTypes: string[] = [ "jpg", "jpeg", "png", "gif", "svg", "webp", "tiff", "tif", "bmp" ]

  static videoTypes: string[] = [ "mp4", "m4v", "webm", "ogv", "ogg", "aiv", "mov", "wmv", "flv" ]

  static implementation: Mime

  static shared: Mime = new Mime()

  getType(path: string): string {
    return Mime.implementation.getType(path)
  }

  register(implementation: Mime): void {
    Mime.implementation = implementation
  }

  static register(implementation: Mime): void {
    Mime.shared.register(implementation)
  }

  static getType(path: string): string {
    return Mime.shared.getType(path)
  }
}