import Quill from "quill"
import QuillDocument from "./QuillDocument.ts";

const Uploader = Quill.import("modules/uploader")

export default class QuillUploader extends Uploader {

  upload(range: any, files: FileList | File[]) {
    QuillDocument
      .getDocumentByScroll(this.quill.scroll)
      .behavior
      .upload
      .uploadImages(
        this.toFileArray(files),
        range.index
      )
      .then(() => {})
  }

  toFileArray(files: FileList | File[]): File[] {
    let arrays: File[] = []
    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        arrays.push(files[i])
      }
    } else if (Array.isArray(files)) {
      arrays = files
    }
    return arrays
  }
}