import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div, style} from "@nutriadoc/classes";
import QuillEditor from "../editor/quilljs/QuillEditor.ts";

const meta = {
  title: 'Editor/Code',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)



    const container = div(
      div(
        style({
          height: "0",
        })
      ),
      doc
    )

    doc.addEventListener("ready", () => {
      doc.insertText(0, "npm install --save @nutriadoc/nutriadoc\n", { "code-block": "javascript" })
      doc.insertText(doc.getLength() - 1, "const document = new Document();\n")

      const editor = doc.editor as QuillEditor
      const delta = editor.quill.getContents()
      console.debug(delta)
    })

    return container.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Code: Story = {
  args: {},
}


