import Task from "../../ui/task/Task.ts"
import AssetsLoadTask from "./asset/AssetsLoadTask.ts";
import PackageManager from "../../core/package/PackageManager.ts";
import Option from "../../editor/Option.ts";

export default class NutriaLoadTask extends Task {

  constructor(pkg: PackageManager, task: Task, option?: Option) {
    super([
      new AssetsLoadTask(pkg, option),
      task,
    ])
  }
}