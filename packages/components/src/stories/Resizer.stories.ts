import type { StoryObj, Meta } from '@storybook/html'
import {div, image, source, span, text} from "@nutriadoc/classes"
import { default as Component } from "../resizer"


const meta: Meta = {
  title: 'Resizer',
  tags: [],
  render: (args) => {
    const img = image(source("https://placehold.co/600x400/png")).renderNode() as HTMLElement
    const resizer = Component.from(img)
    return div(
      span(text("image")),
      resizer
    ).renderNode()
  }
}

export default meta;
type Story = StoryObj;

export const Resizer: Story = {
}