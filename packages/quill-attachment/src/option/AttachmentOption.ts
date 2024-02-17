import UploadHandler from "./UploadHandler.ts"
import Quill from "quill"

export default interface AttachmentOption {
  quill?: typeof Quill

  upload(files: FileList | File[], handler: UploadHandler): void
}