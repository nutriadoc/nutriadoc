import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/HorizontalRule',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)

    setTimeout(() => {
      doc.quill.insertText(0,   '\n', { 'hr': true})
    }, 1000)


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const HorizontalRule: Story = {
  args: {},
}


