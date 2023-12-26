export default interface IToolbar {

  setItemLabel(key: string, label: string): void

  activeItem(key: string): void

  deactiveItem(key: string): void
}