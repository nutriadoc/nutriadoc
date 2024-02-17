import type { StoryObj, Meta } from '@storybook/html'
import {Main} from "../router/demo"

interface RouterProps {

}

const meta = {
  title: 'Router',
  tags: [],
  render: (args) => {
    return new Main().render() as Node
  }
} satisfies Meta<RouterProps>;

export default meta;
type Story = StoryObj<RouterProps>;

export const Primary: Story = {
  args: {
  },
}