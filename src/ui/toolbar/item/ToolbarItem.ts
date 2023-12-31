import View from "../../View.ts";
import {EraserFill} from "../icons";

export default class ToolbarItem extends View {

  style: any = {
    display: 'flex',
    padding: "4px"
  }

  innerHtml = EraserFill

  onMouseEnter() {
    this.style = {
      backgroundColor: "#eee"
    }
  }

  onMouseLevel() {
    this.style = {
      backgroundColor: "#fff"
    }
  }

}