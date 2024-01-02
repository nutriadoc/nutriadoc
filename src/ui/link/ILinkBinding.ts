export default interface ILinkBinding {

  get url(): string

  get text(): string

  openLinkSettings(): void

  openLink(): void

  removeLink(): void

  copyLink(): void

  closeInlineToolbar(): void

}