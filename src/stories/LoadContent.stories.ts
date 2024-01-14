import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

interface LoadContentArgs {

  source: number
}

const meta = {
  title: 'Editor/LoadContent',
  tags: [],
  render: (args) => {

    const root = document.createElement("div")
    root.className = "root"

    const content = `<h1>Nutria</h1>
      <p>Nutria is a feature-rich rich text editor designed to provide a comprehensive set of tools for text formatting, inserting images, videos, and attachments. It offers collaborative editing and communication features, making it a versatile platform for various use cases.</p>`

    if (args.source == 1) {
      root.innerHTML = content
    }

    create(root, {
      html: args.source == 0 ? content : undefined
    })

    return root
  },
  argTypes: {},
} satisfies Meta<LoadContentArgs>;

export default meta;
type Story = StoryObj<LoadContentArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FromHtml: Story = {
  args: {
    source: 0
  },
}

export const FromInnerHtml: Story = {
  args: {
    source: 1
  },
}