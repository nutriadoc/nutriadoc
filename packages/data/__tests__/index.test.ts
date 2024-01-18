import { deltaToHtml } from "../src/index.ts"

var ops =  [
  {insert: "Hello"},
  {insert: "\n", attributes: { title: 999 }},
  {insert: "Subtitle",},
  {insert: "\n", attributes: { subtitle: 998 }},
  {insert: "This is colorful\n", attributes: {color: '#f00', size: '15'}},
  {insert: "let debug: boolean = true"},
  {insert: "\n", attributes: { 'code-block': "typescript" }},
]

describe("Index", () => {
  it("should to be html", () => {
    expect(deltaToHtml(ops))
      .toBe('<h1 class="title">Hello</h1><h2 class="subtitle">Subtitle</h2><p><span class="ql-size-15" style="font-size: 20.00px;color:#f00">This is colorful</span></p><pre data-language="typescript">let debug: boolean = true</pre>')
  })
})