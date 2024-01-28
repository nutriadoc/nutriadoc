import { Direction } from "./"
import { Point } from "../../"
export default class Bounding {

  public ancestors(node: HTMLElement): HTMLElement[] {
    const ancestors = []
    while (node.parentElement) {
      ancestors.push(node.parentElement)
      node = node.parentElement
    }
    return ancestors
  }

  public isReachedTheEdge(mouse: Point, bounding: DOMRect, distance: number = 10): Direction[] | undefined {
    const mouseX = mouse.x
    const mouseY = mouse.y

    const directions: Direction[] = []

    if (mouseX >= -distance && mouseX <= distance)
      directions.push(Direction.Left)

    if (mouseX >= bounding.width - distance && mouseX <= bounding.width + distance)
      directions.push(Direction.Right)

    if (mouseY >= -distance && mouseY <= distance)
      directions.push(Direction.Up)

    if (mouseY >= bounding.height - distance && mouseY <= bounding.height + distance)
      directions.push(Direction.Down)

    if (directions.length == 0)
      return undefined

    return directions
  }
}