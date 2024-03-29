import UploadTask from "../../../ui/upload/UploadTask.ts"
import UserAttachmentBehavior from "./UserAttachmentBehavior.ts"
import UploadService from "../../../ui/upload/service/UploadService.ts"
import MessageBox from "../../../ui/MessageBox/MessageBox.ts"
import Editor from "../../Editor.ts"
import FileInput from "../../../ui/upload/FileInput.ts"
import { KeyFile} from "../../core"
import AttachmentFactory from "../../commands/attachment/AttachmentFactory.ts"
import DocumentCommandType from "../../../document/commands/DocumentCommandType.ts";
import AttachmentCommand from "../../commands/attachment/AttachmentCommand.ts";

export default class DefaultUserAttachmentBehavior implements UserAttachmentBehavior {

  protected uploadService: UploadService

  protected messageBox: MessageBox

  protected editor: Editor

  public constructor(
    uploadService: UploadService,
    messageBox: MessageBox,
    editor: Editor
  ) {

    this.uploadService = uploadService
    this.messageBox = messageBox
    this.editor = editor
  }

  selectFile(type: DocumentCommandType): void {

    const selected = this.editor.getSelection()

    const onChange = (_: Event) => {
      this.uploadFiles(FileInput.shared.files, selected.index, type).then(_ => {})
    }

    FileInput.shared.addEventListener(
      "change",
      onChange,
      {
        once: true
      }
    )

    FileInput.shared.openSelect(type)
  }

  async uploadAnFile(file: File, editorIndex: number, type?: DocumentCommandType): Promise<void> {
    await this.uploadFiles([file], editorIndex, type)
  }

  async uploadFiles(files: File[], editorIndex: number, type?: DocumentCommandType): Promise<void> {
    // let messageView = Optional.empty<MessageView>()

    const factory = new AttachmentFactory()
    for (let i = 0; i < files.length; i++) {
      const file = KeyFile.create(files[i])

      const command = factory.create(file, type)

      if (command instanceof AttachmentCommand) {

        const length = file.file.name.length
        this.editor.insertLink({ index: editorIndex, length}, { "url": command.value, "text": file.file.name })
        this.editor.formatText(editorIndex, length, { "attachment": command.value })
      } else
        this.editor.insertEmbed(editorIndex, command)

      // const mv = UploadMessageView.createUploadMessageView(file)
      // if (i === 0)
      //   messageView = Optional.of(mv)

      // this.messageBox.addMessage(mv)
    }


    // if (files.length > 1) {
    //   this.messageBox.displaySummary()
    // } else {
    //   this.messageBox.activeMessage(messageView.get())
    // }
  }

  uploadsHasFailed(_task: UploadTask): void {
    // this.messageBox.activeMessage(task.key)
    // this.messageBox.addToast(t("message"))
  }

  uploadsHasSucceeded(_task: UploadTask): void {
    // this.messageBox.activeMessage(task.key)
    // this.messageBox.addToast(t("message"))
  }

  attachmentLosesTheFocus(key: string): void {

    this
      .uploadService
      .get(key)
      .ifPresent(_ => {

        this.messageBox.deactivateMessage()
      })
  }

  userHasSelectedAnAttachmentThatAreCurrentlyUploading(): void {
    // if (this.uploadService.get(key).isPresent())
    //   return
    //
    // this.messageBox.activeMessage(key)
  }

  feedbackToUserAboutUploads(keys: string[]) {
    if (keys.length > 1) {
      this.messageBox.displaySummary()
    } else {
      this.messageBox.activeMessage(keys[0])
    }
  }

}