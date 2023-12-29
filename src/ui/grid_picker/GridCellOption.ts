export default interface GridCellOption {

  backgroundColor: string

  borderColor: string

  activeBackgroundColor: string

  activeBorderColor: string

  width: number

  height: number
}

export const defaultOption: GridCellOption = {
  backgroundColor: "#F5F5F5",
  borderColor: "#EDEDED",
  activeBackgroundColor: "#E5F3FF",
  activeBorderColor: "#99D0FF",
  width: 13,
  height: 13
}