import type { StoryObj, Meta } from '@storybook/html'
import ConsoleComponent from "../console/Console.ts"

const meta = {
  title: 'Console',
  tags: ['autodocs'],
  render: () => {
    return new ConsoleComponent().render() as Node
  }
} satisfies Meta

export default meta;
type Story = StoryObj

export const Console: Story = { }