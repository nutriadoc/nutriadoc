import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed")

export default class HorizontalRuleBlot extends BlockEmbed {

  static blotName = 'hr';
  static tagName = ['hr'];

}