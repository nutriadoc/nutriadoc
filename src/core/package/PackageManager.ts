import Package from "./Package.ts";
import Load from "../../ui/Load.ts";
import PackageCDN from "./PackageCDN.ts";
import JsDelivrCDN from "./JsDelivrCDN.ts";

export default class PackageManager {

  protected packages: Package[] = []

  protected cdn: PackageCDN = new JsDelivrCDN()

  register(pkg: Package): void {
    this.packages.push(pkg)
  }

  async load(path: string): Promise<void> {
    const pkg = this.packages.find(pkg => pkg.name === path.split('/')[0])
    if (path.endsWith(".css")) {
      await Load.loadCSS(this.cdn.getUrl(path, pkg))
    }
  }
}