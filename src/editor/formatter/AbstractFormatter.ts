import Quill, {StringMap} from "quill"
import Format from "./Format.ts"
import IToolbar from "../../ui/toolbar/IToolbar.ts"

export default abstract class AbstractFormatter {

  protected quill: Quill

  public toolbars: IToolbar[] = []

  public constructor(quill: Quill, toolbars: IToolbar[]) {
    this.quill = quill
    this.toolbars = toolbars
  }

  public abstract select(formats: StringMap): void

  public abstract format(format: Format, ...params: any[]): void

  public active(key: string, label?: string) {
    this.toolbars.forEach(toolbar => toolbar.activeItem(key))
    if (label) {
      this.toolbars.forEach(toolbar => toolbar.setItemLabel(key, label))
    }
  }

  public deactive(key: string) {
    console.debug("deactive", key)
    this.toolbars.forEach(toolbar => toolbar.deactiveItem(key))
  }
}