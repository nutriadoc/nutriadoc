import UploadTask from "../../../ui/upload/UploadTask.ts";
import UserUploadBehavior from "./UserUploadBehavior.ts";
import FileService from "../../../core/file/FileService.ts";
import UploadMessageView from "../../../ui/upload/UploadMessageView.ts";
import UploadService from "../../../ui/upload/UploadService.ts";
import MessageBox from "../../../ui/MessageBox/MessageBox.ts";
import Editor from "../../Editor.ts";
import ImageCommand from "../../commands/ImageCommand.ts";
import FileInput from "../../../ui/upload/FileInput.ts";

export default class DefaultUserUploadBehavior implements UserUploadBehavior {

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

  userLoadDocument(): Promise<void> {
      throw new Error("Method not implemented.");
  }

  selectImageFile(): void {

    const selected = this.editor.getSelection()

    const onChange = (_: Event) => {
      this.userUploadImages(FileInput.shared.files, selected.index).then(_ => {})
    }

    FileInput.shared.addEventListener(
      "change",
      onChange,
      {
        once: true
      }
    )

    FileInput.shared.openSelect()
  }

  async userUploadAnImage(file: File, editorIndex: number): Promise<void> {
    console.debug("user upload an image", file, editorIndex)
    let blob: Blob | null = await FileService.toBlob(file)
    const ref = await FileService.toBlobRef(blob)

    const task = this.uploadService.upload(file, ref)
    const messageView = new UploadMessageView(task)
    this.messageBox.addMessage(messageView)
    const b64 = await FileService.base64(file)
    this.editor.insertEmbed(editorIndex, new ImageCommand(b64))
  }

  userUploadImages(file: File[], editorIndex: number): Promise<void> {
    return this.userUploadAnImage(file[0], editorIndex)
  }

  uploadsHasFailed(task: UploadTask): void {
    this.messageBox.activeMessage(task.key)
    // this.messageBox.addToast(t("message"))
  }

  uploadsHasSucceeded(task: UploadTask): void {
    this.messageBox.activeMessage(task.key)
    // this.messageBox.addToast(t("message"))
  }

  imageLosesTheFocus(key: string): void {

    this
      .uploadService
      .get(key)
      .ifPresent(_ => {

        this.messageBox.deactivateMessage()
      })
  }

  userHasSelectedAnImageThatAreCurrentlyUploading(): void {
    if (this.uploadService.get(key).isPresent())
      return

    this.messageBox.activeMessage(key)
  }

  feedbackToUserAboutUploads(keys: string[]) {
    if (keys.length > 1) {
      this.messageBox.displaySummary()
    } else {
      this.messageBox.activeMessage(keys[0])
    }
  }

}