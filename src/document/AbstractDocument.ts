import View from "../ui/View.ts";
import ShortcutKeyBinding from "../editor/shortcut_key/ShortcutKeyBinding.ts";
import InlineToolbarBinding from "../editor/toolbar/InlineToolbarBinding.ts";
import Editor from "../editor/Editor.ts";
import Collaboration from "../editor/collaboration/Collaboration.ts";
import Option from "../editor/Option.ts";
import DocumentMutation from "../editor/DocumentMutation.ts";
import IUnit from "../ui/view/unit/IUnit.ts";
import Toolbars from "../ui/toolbar/main/Toolbars.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import DocumentCommandEvent from "./commands/DocumentCommandEvent.ts";
import UserBehavior from "../editor/behavior/UserBehavior.ts";
import DefaultUserPressBehavior from "../editor/behavior/DefaultUserPressBehavior.ts";
import DefaultUserUploadBehavior from "../editor/behavior/upload/DefaultUserUploadBehavior.ts";
import UserUploadBehavior from "../editor/behavior/upload/UserUploadBehavior.ts";
import MockUploadService from "../ui/upload/MockUploadService.ts";
import MessageBox from "../ui/MessageBox/MessageBox.ts";
import MessageBoxMode from "../ui/MessageBox/MessageBoxMode.ts";

export default abstract class AbstractDocument extends View {

  protected _option?: Option

  protected _editor: Editor

  protected mainToolbar!: Toolbar

  protected toolbars: Toolbars

  protected textChangeHandler: any

  protected commandHandler: any

  protected messageBox!: MessageBox

  protected constructor(option?: Option, element?: HTMLElement, ...units: IUnit[]) {
    super(element, ...units)
    this._option = option
    this._editor = this.createEditor()

    this.textChangeHandler = this.onTextChange.bind(this)
    this.commandHandler = this._onCommand.bind(this)

    this.toolbars = this.createToolbars()
  }

  abstract createEditor(): Editor

  abstract createShortcutKeyBinding(): ShortcutKeyBinding

  abstract createInlineToolbar(): InlineToolbarBinding

  abstract createCollaboration(option: Option): Collaboration

  protected createToolbars(): Toolbars {
    this.mainToolbar = this.createToolbar()
    return new Toolbars([this.mainToolbar])
  }

  protected createToolbar(): Toolbar {
    const formatter = this._editor.createFormatter()
    const main = Toolbar.simple(formatter)

    formatter.toolbars = [main]
    this.addElement(main)
    main.addEventListener("command", this.commandHandler)

    return main
  }

  initialized(): void {
    this._editor.addEventListener('mutation', this.textChangeHandler)
  }

  abstract onTextChange(mutation: DocumentMutation, old: DocumentMutation): void

  protected _onCommand(event: Event) {
    this.onCommand(event as DocumentCommandEvent)
  }

  protected abstract onCommand(event: DocumentCommandEvent): void

  protected createUserBehavior(): UserBehavior {
    return new UserBehavior(
      new DefaultUserPressBehavior(this.toolbars),
      this.createUploadBehavior()
    )
  }

  protected createUploadBehavior(): UserUploadBehavior {

    this.messageBox = new MessageBox(this.mainToolbar, MessageBoxMode.Tiny)
    this.addElement(this.messageBox)

    return new DefaultUserUploadBehavior(
      new MockUploadService(),
      this.messageBox,
      this._editor
    )
  }
}