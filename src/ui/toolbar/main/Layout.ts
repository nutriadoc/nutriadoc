import FlexView from "../../FlexView.ts"
import IView from "../../IView.ts"
import IUnit from "../../view/unit/IUnit.ts";
import {className} from "../../views.ts";
import Direction from "../../Direction.ts";

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