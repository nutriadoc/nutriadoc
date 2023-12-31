export default interface ILinkBinding {

  get payload(): any | undefined

  link(url: string, text: string): void

}