import type {Meta, StoryObj} from '@storybook/html'
import {create} from "../../../index.ts";

const meta = {
  title: 'Upload/Elements/MessageBox',
  tags: [],
  render: () => {
    const editor = create()
    return editor.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TinyMessageBox: Story = {
  args: {},
}


