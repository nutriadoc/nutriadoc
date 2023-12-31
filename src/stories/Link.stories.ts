import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Link',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)
    doc.quill.insertText(0, "google\n", "link", "https://google.com")
    doc.quill.insertText(7, "google\n", "link", "https://google.com")

    setTimeout(() => {
      doc.quill.setSelection(14, 0)
    }, 20)


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Link: Story = {
  args: {},
}


