import UploadState from "./UploadState.ts"

export default interface UploadHandler {
  (file: File, state: UploadState): void
}