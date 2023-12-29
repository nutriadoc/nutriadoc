import type {StoryObj, Meta} from '@storybook/html'
import Editor from "../index"

const meta = {
  title: 'Editor/Align',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = Editor(root)

    doc.quill.insertText(0, "Align left", { align: "left" })
    doc.quill.insertText(doc.quill.getLength(), "Align center\n", { align: "center" })
    doc.quill.insertText(doc.quill.getLength() , "Align right\n", { align: "right" })
    doc.quill.insertText(doc.quill.getLength(), "Align justify\n", { align: "justify" })

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Align: Story = {
  args: {},
}


