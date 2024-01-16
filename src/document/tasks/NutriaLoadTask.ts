import Task from "../../ui/task/Task.ts"
import AssetLoadTask from "./asset/AssetLoadTask.ts";
import PackageManager from "../../core/package/PackageManager.ts";

export default class NutriaLoadTask extends Task {

  constructor(pkg: PackageManager, task: Task) {
    super([
      new AssetLoadTask(pkg),
      task,
    ])
  }
}