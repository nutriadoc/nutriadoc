import type { StoryObj, Meta } from '@storybook/html';

const meta = {
  title: 'Attachment',
  tags: [],
  render: (args) => {

  },
  argTypes: {
    validationField: {
      control:  'boolean'
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {

  },
}