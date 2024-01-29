import type { StoryObj, Meta } from '@storybook/html';
import {text} from "@nutriadoc/classes";
import PrimaryButton from "../button/PrimaryButton";

interface ButtonProps {
  isPrimaryButton?: boolean,

  loading?: boolean
}

const meta = {
  title: 'Form/Button',
  tags: ['autodocs'],
  render: (args) => {
    const button = new PrimaryButton({ loading: args.loading }, text("Primary button"))
    return button.render() as Node
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    isPrimaryButton: true,
    loading: false,
  },
}