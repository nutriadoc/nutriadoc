export default interface UploadBehavior {

  selectFile(): void

  uploadFile(files: FileList): void
}