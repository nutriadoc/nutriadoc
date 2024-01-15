import type {StoryObj, Meta} from '@storybook/html'
import {div, style} from "../../ui/views.ts";

const meta = {
  title: 'Misc/ContainerSize',
  tags: [],
  render: () => {

    const root = div(

      div(
        style({
          width: "100%",
          height: "100%",
        }),
      ),
    )

    const observer = new ResizeObserver(entries => {
      console.debug(entries)
      console.debug(root.element.offsetWidth)
      console.debug(root.element.offsetHeight)
    })
    observer.observe(root.element)

    console.debug(root.element.offsetWidth)

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ContainerSize: Story = {
  args: {},
}


