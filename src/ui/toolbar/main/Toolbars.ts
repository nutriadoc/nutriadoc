import IToolbar from "../IToolbar.ts";

export default class Toolbars {

  protected _toolbars: IToolbar[] = []

  constructor(toolbars: IToolbar[]) {
    this._toolbars = toolbars
  }

  enableToolbarItem(key: string) {
    this._toolbars.forEach(toolbar => toolbar.enableToolbarItem(key))
  }

  disableToolbarItem(undo: string) {
    this._toolbars.forEach(toolbar => toolbar.disableToolbarItem(undo))
  }
}