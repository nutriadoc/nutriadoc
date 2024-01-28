import Quill from "quill";
import {FontFamily, FontFamilyClass} from "../formats/FontFamily.ts";
// import Title from "../formats/Title.ts";
// import Subtitle from "../formats/Subtitle.ts";
import FontSize from "../formats/FontSize.ts";
import LineSpacing from "../formats/LineSpacing.ts";
import InlineToolbarBlock from "../formats/InlineToolbarBlock.ts";
import ImageEmbed from "../formats/ImageEmbed.ts";
import Resize from "../formats/Resize.ts";
import HorizontalRuleBlot from "../formats/HorizontalRuleBlot.ts";
import Syntax from "../formats/Syntax.ts";
import HTMLEmbed from "../formats/HTMLEmbed.ts";
import Attributor from "../formats/Attributor.ts";
import QuillCursors from "quill-cursors";
import QuillUploader from "./QuillUploader.ts";
import VideoEmbed from "../formats/attachment/VideoEmbed.ts";
import Attachment from "../formats/attachment/Attachment.ts";

export default class QuillModule {
  static registerModules() {
    Quill.register({
      "attributors/class/font": FontFamilyClass,
      "attributors/style/font": FontFamily,
      "attributors/style/attachment": Attachment,
    },true)

    Quill.register({
      "formats/font": FontFamily,
    }, true)

    Quill.register({
      // TODO:
/*      "formats/title": Title,
      "formats/subtitle": Subtitle,*/
      "formats/font-size": FontSize,
      "formats/linespacing": new LineSpacing('linespacing', 'linespacing', { /*scope: Scope.INLINE*/ }),
      "formats/inline-toolbar": InlineToolbarBlock,
      "formats/image": ImageEmbed,
      "formats/video": VideoEmbed,
      "formats/resize": new Resize('resize', 'resize', {}),
      "formats/html": HTMLEmbed,
      "formats/readonly": new Attributor('readonly', 'readonly'),
      "formats/attachment": Attachment,

      "modules/syntax": Syntax,
      "modules/uploader": QuillUploader,

    }, true)

    Quill.register('formats/hr', HorizontalRuleBlot, true)

    Quill.register('modules/cursors', QuillCursors, true);
  }
}