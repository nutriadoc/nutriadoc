import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div} from "@nutriadoc/classes";

const meta = {
  title: 'Editor/Font',
  tags: [],
  render: () => {

    // const root = document.createElement("div")
    // root.className = "root"
    const doc = create()
    
    doc.insertText(0, "Align left", { align: "left" })
    doc.insertText(doc.getLength(), "Align center\n", { align: "center" })
    doc.insertText(doc.getLength() , "Align right\n", { align: "right" })
    doc.insertText(doc.getLength(), "Align justify\n", { align: "justify" })

    return div(doc).renderNode()
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Align: Story = {
  args: {},
}


