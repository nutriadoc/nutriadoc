import Task from "../../../ui/task/Task.ts"
import PackageManager from "../../../core/package/PackageManager.ts";

export default class AssetLoadTask extends Task {

  protected package: PackageManager;

  constructor(packageManager: PackageManager) {
    super()
    this.package = packageManager
  }
  protected async run(): Promise<void> {
    await this.package.load("quill/dist/quill.core.css")
  }
}