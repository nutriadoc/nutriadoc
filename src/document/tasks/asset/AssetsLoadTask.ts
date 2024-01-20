import Task from "../../../ui/task/Task.ts"
import PackageManager from "../../../core/package/PackageManager.ts";
import Option from "../../../editor/Option.ts";
import AssetLoadTask from "./AssetLoadTask.ts";

export default class AssetsLoadTask extends Task {

  constructor(packageManager: PackageManager, option?: Option) {
    const assets = [
      "quill/dist/quill.core.css",
      "bootstrap-icons/font/bootstrap-icons.css",
      "highlight.js/highlight.min.js",
      "highlight.js/styles/github.css",
    ].filter(path => option?.excludeCss?.includes(path) !== true)

    super(
      assets.map(path => new AssetLoadTask(packageManager, path))
    )
  }
}