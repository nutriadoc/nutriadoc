import UploadBehavior from "../../../ui/upload/UploadBehavior.ts";
import Quill from "quill";
import FileInput from "../../../ui/upload/FileInput.ts";
import IDisposable from "../../../core/IDisposable.ts";

export default class QuillUploadBehavior implements UploadBehavior, IDisposable {

  protected quill: Quill

  protected fileSelectedHandler: any = this.onFileSelected.bind(this)

  protected fileInput: FileInput

  constructor(quill: Quill, input: FileInput) {
    this.quill = quill

    this.fileInput = input
    this.fileInput.addEventListener("change", this.fileSelectedHandler)
  }

  get input(): HTMLInputElement {
    return this.fileInput.element as HTMLInputElement
  }

  onFileSelected(_: Event): void {
    this.uploadFile(this.input.files as FileList)
  }

  selectFile(): void {
    console.debug(this.input)
    this.input.click()
  }

  uploadFile(files: FileList): void {
    console.debug(files)

    this.fileInput.renew()
  }

  dispose(): void {
    this.fileInput.removeEventListener("change", this.fileSelectedHandler)
  }

}