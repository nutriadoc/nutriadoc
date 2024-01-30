import type { StoryObj, Meta } from '@storybook/html';
import {placeholder} from "@nutriadoc/classes";
import Input from "../input/Input";

interface ButtonProps {

}

const meta = {
  title: 'Form/Input',
  tags: ['autodocs'],
  render: (args) => {
    const button = new Input(placeholder("Placeholder"))
    return button.render() as Node
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {

  },
}