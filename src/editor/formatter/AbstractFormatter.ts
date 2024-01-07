import Quill, {Sources, StringMap} from "quill"
import Format from "./Format.ts"
import IToolbar from "../../ui/toolbar/IToolbar.ts"
import IFormatter from "./IFormatter.ts";

export default abstract class AbstractFormatter implements IFormatter {

  protected quill: Quill

  protected  _toolbars: IToolbar[] = []

  public constructor(quill: Quill) {
    this.quill = quill
  }

  public abstract select(formats: StringMap): void

  public abstract format(format: Format, ...params: any[]): void

  public active(key: string, value?: any) {
    debugger
    this.toolbars.forEach(toolbar => toolbar.activeItem(key))
    if (value) {
      this.toolbars.forEach(toolbar => toolbar.setToolbarItemText(key, value))
    }
  }

  public textChange(_delta: any, _oldDelta: any, _source: Sources) {

  }

  protected activeToolbarItem(key: string) {
    this
      .toolbars
      .map(toolbar => toolbar.findToolbarItem(key))
      .forEach(toolbarItem => toolbarItem?.active())
  }

  protected deactivateToolbarItem(key: string) {
    this
      .toolbars
      .map(toolbar => toolbar.findToolbarItem(key))
      .forEach(toolbarItem => toolbarItem?.deactivate())
  }

  protected changeToolbarItemText(key: string, value: string) {
    this.toolbars.forEach(toolbar => toolbar.setToolbarItemText(key, value))
  }

  protected activeMenuItem(menuKey: string, itemKey: string) {
    this.toolbars.forEach(toolbar => toolbar.activeMenuItem(menuKey, itemKey))
  }

  public deactive(key: string) {
    this.toolbars.forEach(toolbar => toolbar.deactiveItem(key))
  }

  public get toolbars(): IToolbar[] {
    return this._toolbars
  }

  public set toolbars(value: IToolbar[]) {
    this._toolbars = value
  }
}