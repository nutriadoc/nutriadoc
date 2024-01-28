import { IView, FlexView, IUnit, className, Direction} from "@nutriadoc/classes"

export default class Layout extends FlexView implements IView {

  protected direction: Direction

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
}