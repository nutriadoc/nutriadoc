import Package from "./Package.ts";
import Load from "./Load.ts";
import PackageCDN from "./PackageCDN.ts";
import JsDelivrCDN from "./JsDelivrCDN.ts";

export default class PackageManager {

  protected packages: Package[] = []

  protected cdn: PackageCDN = new JsDelivrCDN()

  register(...pkgs: Package[]): void {
    pkgs.forEach(pkg => {
      this.packages.push(pkg)
    })
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
}