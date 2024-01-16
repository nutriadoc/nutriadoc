import Package from "./Package.ts";
import PackageCDN from "./PackageCDN.ts";

export default class JsDelivrCDN extends PackageCDN {

  constructor() {
    super("https://cdn.jsdelivr.net/npm");
  }

  getUrl(path: string, pkg?: Package): string {
    const url = [this.url, "/"]
    if (!pkg) {
      url.push(path)
    } else {
      url.push(pkg.name)
      url.push('@')
      url.push(pkg.version)
      url.push("/")
      url.push(path.split("/").slice(1).join("/"))
    }

    return url.join("")
  }

}