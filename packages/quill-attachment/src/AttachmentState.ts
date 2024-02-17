export default class AttachmentState {

  protected _file: File

  constructor(file: File) {
    this._file = file
  }

  progress(loaded: number) {
  }

  completed() {
  }

  error(error: Error) {
  }

  get file(): File {
    return this._file
  }
}