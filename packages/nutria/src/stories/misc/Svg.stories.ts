import type {StoryObj, Meta} from '@storybook/html'
import {EraserFill} from "../../ui/toolbar/icons";

const meta = {
  title: 'Misc/Svg',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    root.innerHTML = EraserFill
    
    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Svg: Story = {
  args: {},
}


