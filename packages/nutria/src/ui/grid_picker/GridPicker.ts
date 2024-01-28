import { View } from "@nutriadoc/classes";
import GridCell from "./GridCell.ts";

import "./GridPicker.scss"
import GridPickerEvent from "./GridPickerEvent.ts";

export default class GridPicker extends View {

  protected rows: number

  protected columns: number

  protected _isRangeSelect: boolean = false

  public constructor(rows: number, columns: number, isRangeSelect: boolean = false) {
    const element = document.createElement("div")
    super(element)
    this.className = "grid-picker"
    this.rows = rows
    this.columns = columns
    this._isRangeSelect = isRangeSelect

    this.setupGridCells()
    this.setupEvents()
  }

  protected setupGridCells() {
    for (let column = 0, columns = this.columns; column < columns; column++) {

      const element = document.createElement("div")
      const col = new View(element)
      col.className = "grid-picker-col"

      this.addElement(col)

      for (let row = 0, rows = this.rows; row < rows; row++) {
        const cell = new GridCell(row, column)
        col.addElement(cell)
      }
    }

  }

  protected setupEvents() {
    if (!this._isRangeSelect) return

    this.children.forEach(col => {
      col.children.forEach(cell => {
        const c = cell as GridCell
        c.addEventListener("enter", this.onCellEnter.bind(this))
        c.addEventListener("leave", this.onCellLeave.bind(this))
        c.addEventListener("click", this.onCellClick.bind(this))
      })
    })
  }

  protected onCellClick(event: Event) {
    this.dispatchEvent(new GridPickerEvent(this, event.target as GridCell))
  }

  protected onCellEnter(event: Event) {
    const cell = event.target as GridCell
    const columns = [...this.children].slice(0, cell.column + 1)
    const rows = columns.map(row => row.children.slice(0, cell.row + 1)).flatMap(row => row)
    rows.forEach(row => (row as GridCell).active())
  }

  protected onCellLeave(event: Event) {
    const cell = event.target as GridCell
    const columns = [...this.children].slice(0, cell.column + 1)
    const rows = columns.map(row => row.children.slice(0, cell.row + 1)).flatMap(row => row)
    rows.forEach(row => (row as GridCell).deactivate())
  }

  public get isRangeSelect() {
    return this._isRangeSelect
  }
}