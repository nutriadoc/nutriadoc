import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/ClearFormatting',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)

    doc.quill.insertText(0, "Text1", { bold: true, italic: true })
    doc.quill.removeFormat(0, 5)
    doc.quill.formatText(0, 5, { bold: true, italic: true })

    setTimeout(() => {
      doc.quill.focus()
      doc.quill.setSelection(0, 5, 'user')
    })

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ClearFormatting: Story = {
  args: {},
}


