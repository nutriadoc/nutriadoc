import Quill from "quill"
import LanguageButton from "../../ui/code/LanguageButton.ts";
import {div, style} from "../../ui/views.ts";
import LanguageEvent from "../../ui/code/LanguageEvent.ts";
import hljs from "highlight.js";

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
  } as const

  protected blot: any

  initListener() {
    this.quill.on(Syntax.events.SCROLL_BLOT_MOUNT, (blot: any) => {
      if (blot.constructor.name !== "SyntaxCodeBlockContainer") return

      this.languages = hljs.listLanguages().reduce(
        (memo: Record<string, unknown>, lang) => {
          memo[lang] = true
          return memo
        },
        {})

      this.blot = blot
      if (blot.uiNode == null) {
        const button = new LanguageButton()
        button.addEventListener("select", this.onLanguageSelect.bind(this))

        blot.attachUI(
          div(
            button,
            style({
              position: "relative",
            })
          )
            .render() as Node
        )
      }

    })

  }

  protected onLanguageSelect(event: Event): void {
    console.debug("on language select", event)

    const quill = this.quill as Quill
    const language = (event as LanguageEvent).language

    this.blot.format('code-block', language)
    quill.focus()
    this.highlight(this.blot, true)
  }
}