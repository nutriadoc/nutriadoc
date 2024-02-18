import {PackageManager, Task} from "@nutriadoc/classes"

export default class AssetLoadTask extends Task {

  protected package: PackageManager

  protected path: string

  protected source?: string

  constructor(packageManager: PackageManager, path: string, source?: string) {
    super()
    this.package = packageManager
    this.path = path
    this.source = source
  }
  protected async run(): Promise<void> {

    await this.package.load(this.path, this.source)

    // console.debug("did load " + this.path)
  }
}