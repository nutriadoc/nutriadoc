import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../../index"

const meta = {
  title: 'Editor/InitializeHtml',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root, {
      html: `<h1>Nutria</h1>
<p>Nutria is a feature-rich rich text editor designed to provide a comprehensive set of tools for text formatting, inserting images, videos, and attachments. It offers collaborative editing and communication features, making it a versatile platform for various use cases.</p>`
    })
    // doc.insertText(0, "<h1>Nutria</h1>")

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InitializeHtml: Story = {
  args: {},
}


