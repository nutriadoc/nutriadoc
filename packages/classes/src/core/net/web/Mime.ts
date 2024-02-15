
export default class Mime {

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