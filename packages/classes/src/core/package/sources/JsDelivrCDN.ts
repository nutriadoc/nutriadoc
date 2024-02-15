import {PackageCDN} from "./index.ts";
import {Package} from "../index.ts";

export default class JsDelivrCDN extends PackageCDN {

  constructor() {
    super("https://cdn.jsdelivr.net");
  }

  getUrl(path: string, pkg?: Package, source?: string): string {
    source = source || "npm"
    const url = [this.url, "/", source, "/"]
    if (!pkg) {
      url.push(path)
    } else {
      url.push(pkg.name)
      if (source == 'npm') {
        url.push('@')
        url.push(pkg.version)
      }
      url.push("/")
      url.push(path.split("/").slice(1).join("/"))
    }

    return url.join("")
  }

}