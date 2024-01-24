import IToolbar from "../IToolbar.ts";
import Range from "../../../editor/Range.ts"

export default class Toolbars {

  protected _toolbars: IToolbar[] = []

  constructor(toolbars: IToolbar[]) {
    this._toolbars = toolbars
  }

  onEditorSelectionChange(range: Range) {
    this._toolbars.forEach(toolbar => toolbar.onEditorSelectionChange(range))
  }

  enableToolbarItem(key: string) {
    this._toolbars.forEach(toolbar => toolbar.enableToolbarItem(key))
  }

  disableToolbarItem(undo: string) {
    this._toolbars.forEach(toolbar => toolbar.disableToolbarItem(undo))
  }

  get toolbars(): IToolbar[] {
    return this._toolbars
  }
}