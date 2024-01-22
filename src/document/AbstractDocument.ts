import View from "../ui/View.ts";
import Collaboration from "../editor/collaboration/Collaboration.ts";
import Option from "../editor/Option.ts";
import DocumentMutation from "../editor/DocumentMutation.ts";
import IUnit from "../ui/view/unit/IUnit.ts";
import Toolbars from "../ui/toolbar/main/Toolbars.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import DocumentCommandEvent from "./commands/DocumentCommandEvent.ts";
import MessageBox from "../ui/MessageBox/MessageBox.ts";
// import MessageBoxMode from "../ui/MessageBox/MessageBoxMode.ts";
import { CollaborationOption } from "../editor/collaboration/CollaborationOption.ts";

export default abstract class AbstractDocument extends View {


  protected _option?: Option

  protected mainToolbar!: Toolbar

  protected toolbars!: Toolbars

  protected textChangeHandler: any

  protected commandHandler: any

  protected messageBox!: MessageBox

  protected constructor(option?: Option, element?: HTMLElement, ...units: IUnit[]) {
    super(element, ...units)
    this.setupLoadEvent()
    this._option = option

    this.textChangeHandler = this.onTextChange.bind(this)
    this.commandHandler = this._onCommand.bind(this)

  }

  protected abstract setupLoadEvent(): void

  protected onNodeInserted(_: Node) {
  }

  abstract createCollaboration(option?: CollaborationOption): Collaboration


  abstract onTextChange(mutation: DocumentMutation, old: DocumentMutation): void

  protected _onCommand(event: Event) {
    this.onCommand(event as DocumentCommandEvent)
  }

  protected abstract onCommand(event: DocumentCommandEvent): void
}