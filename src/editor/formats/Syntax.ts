import Quill from "quill"
import LanguageButton from "../../ui/code/LanguageButton.ts";
import {div} from "../../ui/views.ts";

const BaseSyntax = Quill.import("modules/syntax")

export default class Syntax extends BaseSyntax {
  static events = {
    EDITOR_CHANGE: 'editor-change',
    SCROLL_BEFORE_UPDATE: 'scroll-before-update',
    SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
    SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
    SCROLL_OPTIMIZE: 'scroll-optimize',
    SCROLL_UPDATE: 'scroll-update',
    SCROLL_EMBED_UPDATE: 'scroll-embed-update',
    SELECTION_CHANGE: 'selection-change',
    TEXT_CHANGE: 'text-change',
    COMPOSITION_BEFORE_START: 'composition-before-start',
    COMPOSITION_START: 'composition-start',
    COMPOSITION_BEFORE_END: 'composition-before-end',
    COMPOSITION_END: 'composition-end',
  } as const;

  initListener() {
    this.quill.on(Syntax.events.SCROLL_BLOT_MOUNT, (blot: any) => {
      console.debug(blot.children)

      if (blot.constructor.name !== "SyntaxCodeBlockContainer") return

      if (blot.uiNode == null) {
        const button = new LanguageButton()
        blot.attachUI(div(button).render() as Node)

         // uiNode.getAttribute("data-language")

        // blot.format("code-block", language)
      }

    })

  }
}