import { View } from "@nutriadoc/classes";
import Option from "../editor/Option.ts";
import IUnit from "../../../classes/src/ui/view/unit/IUnit.ts";
import Toolbars from "../ui/toolbar/main/Toolbars.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import DocumentCommandEvent from "./commands/DocumentCommandEvent.ts";
import MessageBox from "../ui/MessageBox/MessageBox.ts";

export default abstract class AbstractDocument extends View {


  protected _option: Option

  protected mainToolbar!: Toolbar

  protected toolbars!: Toolbars

  protected textChangeHandler = this.onTextChange.bind(this)

  protected commandHandler: any

  protected messageBox!: MessageBox

  protected constructor(option: Option, element?: HTMLElement, ...units: IUnit[]) {
    super(element, ...units)
    this.setupLoadEvent()
    this._option = option

    this.commandHandler = this._onCommand.bind(this)

  }

  protected abstract setupLoadEvent(): void

  protected onNodeInserted(_: Node) {
  }

  abstract onTextChange(event: Event): void

  protected _onCommand(event: Event) {
    this.onCommand(event as DocumentCommandEvent)
  }

  protected abstract onCommand(event: DocumentCommandEvent): void
}