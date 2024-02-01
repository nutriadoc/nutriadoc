import {IView, FlexView, IUnit, className, Direction, Measurable} from "@nutriadoc/classes"

export default class Layout extends FlexView implements IView, Measurable {

  protected direction: Direction

  protected _items: Measurable[] = []

  constructor(direction: Direction | undefined, ...units: IUnit[]) {
    super(
      undefined,
      ...[
        className("layout"),
        direction == Direction.Vertical ? className("flex-col") : className("flex-row"),
        ...units
      ]
    )
    this.direction = direction ?? Direction.Horizontal
  }

  addItem(item: Measurable) {
    this._items.push(item)
  }

  get width(): number {
    return this
        ._items
        .reduce(
          (total, node) => {
            return total + node.width
          },
          0
        )
      +
      (this._items.length - 1) * 4 // calculate gap
  }
}