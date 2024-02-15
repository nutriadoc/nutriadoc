import {PackageCDN} from "./index.ts"
import {Package} from "../index.ts"

export default class DevSource extends PackageCDN {

  constructor() {
    super("http://localhost:3000");
  }

  getUrl(path: string, pkg?: Package, _?: string): string {
    const pkgName = pkg?.name.split("/") ?? []
    const name = pkgName.length > 1 ? pkgName[pkgName.length - 1] : pkgName[0]
    return `${this.url}/packages/${name}${path}`
  }
}