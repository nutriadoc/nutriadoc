import Package from "../Package.ts";

export default abstract class PackageCDN {

  protected url: string

  protected constructor(url: string) {
    this.url = url
  }

  abstract getUrl(path: string, pkg?: Package, source?: string): string
}