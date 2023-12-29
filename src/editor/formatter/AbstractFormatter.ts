import Quill, {StringMap} from "quill"
import Format from "./Format.ts"
import IToolbar from "../../ui/toolbar/IToolbar.ts"
import IFormatter from "./IFormatter.ts";

export default abstract class AbstractFormatter implements IFormatter {

  protected quill: Quill

  public toolbars: IToolbar[] = []

  public constructor(quill: Quill, toolbars: IToolbar[]) {
    this.quill = quill
    this.toolbars = toolbars
  }

  public abstract select(formats: StringMap): void

  public abstract format(format: Format, ...params: any[]): void

  public active(key: string, value?: any) {
    this.toolbars.forEach(toolbar => toolbar.activeItem(key))
    if (value) {
      this.toolbars.forEach(toolbar => toolbar.setToolbarItemText(key, value))
    }
  }

  protected activeToolbarItem(key: string) {
    this
      .toolbars
      .map(toolbar => toolbar.findToolbarItem(key))
      .forEach(menu => menu?.active())
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
}