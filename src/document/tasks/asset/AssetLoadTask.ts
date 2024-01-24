import Task from "../../../ui/task/Task.ts";
import PackageManager from "../../../core/package/PackageManager.ts";

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
  }
}