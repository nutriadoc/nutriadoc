export default interface IToolbar {

  setToolbarItemText(key: string, label: string): void

  activeItem(key: string): void

  activeMenuItem(menuKey: string, itemKey: string): void

  deactiveItem(key: string): void
}