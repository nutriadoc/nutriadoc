import Direction from "../Direction.ts"

import "./table.scss"

export default class NTRTable {

  protected table: HTMLTableElement

  protected line: HTMLDivElement

  protected resizing: boolean = false

  protected resizingTarget?: HTMLTableCellElement

  protected edgeTarget?: HTMLTableCellElement

  public constructor(element: HTMLTableElement) {
    this.table = element

    element.classList.add("ntr-table")

    this.line = this.setupLine()
    this.setupEvents()
  }

  protected setupLine(): HTMLDivElement {
    let line: HTMLDivElement | null = document.querySelector(".ntr-table-line")

    if (!line) {
      line = document.createElement("div")
      line.className = "ntr-table-line"
      document.body.append(line)
    }
    return line
  }

  protected setupEvents() {
    const dataList = this.table.getElementsByTagName("td")
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      data.addEventListener("mousemove", this.onMouseMoveInTableCell.bind(this))
      data.addEventListener("mouseenter", this.onMouseEnter.bind(this))
      data.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    }

    this.line.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.line.addEventListener("mouseup", this.onMouseUp.bind(this))

  }

  protected onMouseDown(_: MouseEvent) {
    this.resizing = true
  }

  protected onMouseUp(_: MouseEvent) {
    this.resizing = false
  }

  protected drawLine(cell: HTMLTableCellElement, direction: Direction) {
    if (direction == Direction.Unknown) return

    this.edgeTarget = cell
    const line = this.line

    let left = this.table.offsetLeft + cell.offsetLeft
    const right = left + cell.clientWidth
    let top = this.table.offsetTop
    const height = this.table.clientHeight

    if (direction == Direction.Left || direction == Direction.Right) {
      line.style.left = (direction == Direction.Left ? left : right) + "px"
      line.style.top = top + "px"
      line.style.height = height + "px"
      line.style.width = "4px"
      line.style.cursor = "col-resize"
    }

    if (direction == Direction.Up || direction == Direction.Down) {
      top = this.table.offsetTop + cell.offsetTop
      left = this.table.offsetLeft

      this.line.style.top = ((direction == Direction.Up ? top : top + cell.clientHeight) - 2) + "px"
      this.line.style.left = left + "px"
      this.line.style.height = "4px"
      this.line.style.width = this.table.clientWidth + "px"
      this.line.style.cursor = "row-resize"
    }

    line.style.visibility = "visible"
  }

  protected onMouseEnter(_: MouseEvent) {
  }

  protected onMouseLeave(_: MouseEvent) {
  }

  protected onMouseMoveInTableCell(event: MouseEvent) {
    const cell = event.target as HTMLTableCellElement

    if (this.resizing) {
      return
    }

    const reached = this.isReachedTheEdge(event)

    if (reached == Direction.Unknown) {
      this.line.style.visibility = "hidden"
      return
    }
    this.drawLine(cell, reached)

  }

  protected queryResizeCell() {

  }

  protected isReachedTheEdge(event: MouseEvent): Direction {
    const cell = event.target as HTMLTableCellElement
    const offsetLeft = cell.offsetLeft + this.table.offsetLeft
    const offsetRight = offsetLeft + cell.clientWidth

    const left = event.clientX - offsetLeft
    const right = offsetRight - event.clientX
    const top = event.clientY - this.table.offsetTop - cell.offsetTop
    const bottom = event.clientY - (this.table.offsetTop + cell.offsetTop + cell.clientHeight)

    if (left < 10)
      return Direction.Left

    if (right < 10)
      return Direction.Right

    if (top < 10)
      return Direction.Up

    if (bottom < 10)
      return Direction.Down

    return Direction.Unknown
  }
}