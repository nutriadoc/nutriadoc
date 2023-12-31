import ToolbarItem from "../ToolbarItem.ts";
import CommandEvent from "../../../../../editor/commands/CommandEvent.ts";
import FormatPainterCommand from "../../../../../editor/commands/FormatPainterCommand.ts";
import QuitFormatPainterCommand from "../../../../../editor/commands/QuitFormatPainterCommand.ts";

export default class ToolbarFormatPainterItem extends ToolbarItem {

  protected initialize() {
    super.initialize();

    this.element.addEventListener('dblclick', this.onDoubleClick.bind(this))
  }

  public onDoubleClick() {

    if (!this._isActivated) this.active()
    this.dispatchCommandEvent(false)
  }

  public onClick() {

    if (!this._isActivated) {
      this.active()

      this.dispatchCommandEvent()
    } else {

      this.dispatchEvent(new CommandEvent(new QuitFormatPainterCommand()))
      this.deactivate()
    }
  }

  public deactivate() {
    super.deactivate()
  }

  protected dispatchCommandEvent(limit: boolean = true) {
    this.dispatchEvent(new CommandEvent(new FormatPainterCommand(limit)))
  }
}