import Package from "./Package.ts";
import PackageCDN from "./PackageCDN.ts";

export default class JsDelivrCDN extends PackageCDN {

  constructor() {
    super("https://www.jsdelivr.com/npm");
  }

  getUrl(path: string, pkg?: Package): string {
    if (!pkg) return `${this.url}/${path}`
    return `${this.url}/${pkg?.version}/${path}`
  }

}