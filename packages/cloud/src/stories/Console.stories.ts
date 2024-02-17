import type { StoryObj, Meta } from '@storybook/html'
import ConsoleComponent from "../console/Console.ts"

const meta = {
  title: 'Console',
  tags: ['autodocs'],
  render: () => {
    const console = new ConsoleComponent()
    console.history.push("/console/documents")
    // console.history.push("/console/document/new")
    return console.renderNode()
  }
} satisfies Meta

export default meta;
type Story = StoryObj

export const Console: Story = { }