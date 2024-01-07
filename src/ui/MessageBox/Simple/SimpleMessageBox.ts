import {className} from "../../views.ts";
import View from "../../View.ts";

import IUnit from "../../view/unit/IUnit.ts";
import MessageBoxComponent from "../MessageBoxComponent.ts";
import MessageView from "../MessageView.ts";
import TitleBar from "../components/TitleBar.ts";
import FlexView from "../../FlexView.ts";

export default class SimpleMessageBox extends FlexView implements MessageBoxComponent {

  protected messageView?: MessageView

  protected container: View

  public constructor(...units: IUnit[]) {

    const container = new View(undefined, className("container"))

    super(
      undefined,
      ...[
        ...units,
        className("ntr-simple-message-box", "no-select", "hidden", "fade-in"),
        new TitleBar(),
        container
      ]
    )

    this.container = container
  }

  public setMessage(message: MessageView) {
    this.messageView = message

    this.container.removeAllChild()
    this.container.addElement(this.messageView)
  }

  visible() {
    super.visible();
  }

  hide() {
    super.hide();
  }

  protected onExpandClick() {
    this.element.dispatchEvent(new Event("expand"))
  }
}