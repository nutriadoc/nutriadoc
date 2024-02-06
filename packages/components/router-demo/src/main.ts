import './style.css'
import {View} from "@nutriadoc/classes"
import { Main } from "@nutriadoc/components"

class DefaultView extends View {
  constructor() {
    super(
      undefined,
      new Main(),
    )
  }
}

const dv = new DefaultView()
document.body.append(dv.render() as Node)