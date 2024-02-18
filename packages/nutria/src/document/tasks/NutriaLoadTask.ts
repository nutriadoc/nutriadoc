import AssetsLoadTask from "./asset/AssetsLoadTask.ts";
import {PackageManager, Task} from "@nutriadoc/classes";
import Option from "../../editor/Option.ts";

export default class NutriaLoadTask extends Task {

  constructor(pkg: PackageManager, task: Task, option?: Option) {
    super([
      new AssetsLoadTask(pkg, option),
      task,
    ])
  }
}