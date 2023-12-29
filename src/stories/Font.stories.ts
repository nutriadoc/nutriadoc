import type {StoryObj, Meta} from '@storybook/html'
import Editor from "../index"

const meta = {
  title: 'Editor/Font',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = Editor(root)

    doc.quill.insertText(0, "Text1")
    doc.quill.insertText(6, "Text2")
    let text2 = doc.quill.formatText(0, 5, {
      bold: true,
      font: "微软雅黑",
      color: "rgb(230, 0, 0)",
      unsupported: true

    })

    console.debug("text2", text2)

    doc.quill.formatText(6, 1, { bold: true })
    doc.quill.formatText(7, 1, { italic: true })

    doc.quill.insertText(doc.quill.getLength(), "Text3\n", { size: 24 }, 'user')


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Styles: Story = {
  args: {},
}


