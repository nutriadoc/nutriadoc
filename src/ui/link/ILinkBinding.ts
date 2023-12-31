import ILinkRange from "./ILinkRange.ts";

export default interface ILinkBinding {

  get payload(): ILinkRange | undefined

  link(url: string, text: string): void

}