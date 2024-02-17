export default interface UploadState {

  progress(loaded: number): void

  completed(): void

  error(error: Error): void
}