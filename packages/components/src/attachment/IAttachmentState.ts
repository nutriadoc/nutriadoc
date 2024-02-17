export default interface IAttachmentState {

  progress(loaded: number): void

  completed(): void

  error(error: Error): void
}