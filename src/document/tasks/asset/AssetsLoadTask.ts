import Task from "../../../ui/task/Task.ts"
import PackageManager from "../../../core/package/PackageManager.ts";
import Option from "../../../editor/Option.ts";
import AssetLoadTask from "./AssetLoadTask.ts";

export default class AssetsLoadTask extends Task {

  constructor(packageManager: PackageManager, option?: Option) {
    const assets = [
      { path: "nutria/dist/style.css" },
      { path: "quill/dist/quill.core.css" },
      { path: "bootstrap-icons/font/bootstrap-icons.css" },
      { path: "highlightjs/cdn-release@11.9.0/build/highlight.min.js", source: "gh" },
      { path: "highlightjs/cdn-release@11.9.0/build/styles/github.css", source: "gh" },
    ].filter(asset => option?.excludeCss?.includes(asset.path) !== true)

    // console.debug("load assets", assets)

    super(
      assets.map(asset => new AssetLoadTask(packageManager, asset.path, asset.source))
    )
  }
}