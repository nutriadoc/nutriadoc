import type { StoryObj, Meta } from '@storybook/html';
import {placeholder} from "@nutriadoc/classes";
import Input from "../input/Input";

interface InputArgs {
  validationField: boolean
}

const meta = {
  title: 'Form/Input',
  tags: ['autodocs'],
  render: (args) => {
    const button = new Input(placeholder("Placeholder"))
    if (args.validationField) {
      button.addClass("validation-faild")
    }
    return button.render() as Node
  },
  argTypes: {
    validationField: {
      control:  'boolean'
    },
  },
} satisfies Meta<InputArgs>;

export default meta;
type Story = StoryObj<InputArgs>;

export const Primary: Story = {
  args: {

  },
}