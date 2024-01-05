import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Font',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)

    doc.insertText(0, "Text1")
    doc.insertText(6, "Text2")
    doc.formatText(0, 5, {
      bold: true,
      font: "微软雅黑",
      color: "rgb(230, 0, 0)",
      unsupported: true
    })

    doc.formatText(6, 1, { bold: true })
    doc.formatText(7, 1, { italic: true })

    doc.insertText(doc.getLength(), "Text3\n", { size: 24 })


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Text: Story = {
  args: {},
}


