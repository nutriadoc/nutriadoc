import type {Meta, StoryObj} from '@storybook/html'
import MessageBox from "../../../ui/MessageBox/MessageBox.ts";
import MessageBoxMode from "../../../ui/MessageBox/MessageBoxMode.ts";

const meta = {
  title: 'Upload/Elements/MessageBox',
  tags: [],
  render: () => {

    return new MessageBox(MessageBoxMode.Tiny).render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TinyMessageBox: Story = {
  args: {},
}


