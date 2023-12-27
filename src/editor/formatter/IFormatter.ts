import Format from "./Format.ts"

export default interface IFormatter {

  format(format: Format, ...params: any[]): void

}

export class NothingFormatter implements IFormatter {
    format(_: Format, ...__: any[]): void {

    }

}