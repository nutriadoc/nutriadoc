import Package from "./Package.ts"
import Load from "./Load.ts"
import {DevSource, JsDelivrCDN, PackageCDN} from "./sources"

export default class PackageManager {

  protected packages: Package[] = []

  protected cdn: PackageCDN = new JsDelivrCDN()

  static _shared: PackageManager


  static {
    this._shared = new PackageManager()
  }

  constructor(source?: PackageCDN) {
    if (!!source) {
      this.cdn = source
    }
  }

  register(...pkgs: Package[]): void {
    pkgs.forEach(pkg => {
      this.packages.push(pkg)
    })
  }

  devMode() {
    this.cdn = new DevSource()
  }

  productionMode() {
    this.cdn = new JsDelivrCDN()
  }

  dumpImportMap(): any {

  }

  static get shared(): PackageManager {
    return this._shared
  }

  async load(path: string, source?: string): Promise<void> {
    const pkg = this.packages.find(pkg => pkg.name === path.split('/')[0])
    if (path.endsWith(".css")) {
      const url = this.cdn.getUrl(path, pkg, source)
      await Load.loadCSS(url)
    }
    else if (path.endsWith(".js")) {
      const url = this.cdn.getUrl(path, pkg, source)
      await Load.loadJS(url)
    }
  }

  getUrl(path: string, source?: string): string {
    const pkg = this.getPackage(path)
    if (!pkg) throw new Error("Cannot find the " + path)
    return this.cdn.getUrl(path, pkg, source)
  }

  getPackage(path: string): Package | undefined {
    return this.packages.find(pkg => pkg.name === path.split('/')[0])
  }

  getUmdUrl(packageName: string): string {
    const pkg = this.getPackage(packageName)
    if (!pkg?.main) {
      throw new Error("")
    }
    return this.cdn.getUrl(pkg.main, pkg)
  }
}