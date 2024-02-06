import type { StoryObj, Meta } from '@storybook/html';
import Console from "../console/Console.ts";

interface ConsoleProps {

}

const meta = {
  title: 'Console',
  tags: ['autodocs'],
  render: (args) => {
    return new Console().render() as Node
  }
} satisfies Meta<ConsoleProps>;

export default meta;
type Story = StoryObj<ConsoleProps>;

export const ConsoleStory: Story = {
  args: {

  },
}