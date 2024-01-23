import UploadTask from "../../../ui/upload/UploadTask.ts"
import UserMediaBehavior from "./UserMediaBehavior.ts"
import UploadService from "../../../ui/upload/service/UploadService.ts"
import MessageBox from "../../../ui/MessageBox/MessageBox.ts"
import Editor from "../../Editor.ts"
import FileInput from "../../../ui/upload/FileInput.ts"
import KeyFile from "../../../core/file/KeyFile.ts"
import AttachmentFactory from "../../commands/AttachmentFactory.ts"

export default class DefaultMediaUploadBehavior implements UserMediaBehavior {

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
    await this.uploadImages([file], editorIndex)
  }

  async userUploadImages(files: File[], editorIndex: number): Promise<void> {


    await this.uploadImages(files, editorIndex)
  }

  protected async uploadImages(files: File[], editorIndex: number) {
    // 模式一 没有上传，直接显示base64
    // 模式二 有上传，直接显示base64
    // 模式三，有上传，但没有配置接口，回退到模式一

    // 单张图片，显示激活
    // 多张图片，显示 Summary

    // let messageView = Optional.empty<MessageView>()

    const factory = new AttachmentFactory()
    for (let i = 0; i < files.length; i++) {
      const file = KeyFile.create(files[i])
  
      const command = factory.create(file)
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

  imageLosesTheFocus(key: string): void {

    this
      .uploadService
      .get(key)
      .ifPresent(_ => {

        this.messageBox.deactivateMessage()
      })
  }

  userHasSelectedAnImageThatAreCurrentlyUploading(): void {
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