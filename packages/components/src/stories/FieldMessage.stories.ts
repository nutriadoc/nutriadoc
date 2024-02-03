import type { StoryObj, Meta } from '@storybook/html';
import {placeholder, text} from "@nutriadoc/classes";
import {FieldMessage, FieldMessageLevel} from "../field_message";
interface FieldMessageArgs {
  level: FieldMessageLevel
}

const meta = {
  title: 'Form/FieldMessage',
  tags: ['autodocs'],
  render: (args) => {
    const button = new FieldMessage(args.level, text("This is a example message"))
    return button.render() as Node
  },
  argTypes: {
    level: {
      control:  {
        type: 'select',
        options: [FieldMessageLevel.Success, FieldMessageLevel.Warning, FieldMessageLevel.Error, FieldMessageLevel.Info]
      }
    }
  },
} satisfies Meta<FieldMessageArgs>;

export default meta;
type Story = StoryObj<FieldMessageArgs>;

export const Info: Story = {
  args: {
    level: FieldMessageLevel.Info
  },
}

export const Error: Story = {
  args: {
    level: FieldMessageLevel.Error
  },
}

export const Success: Story = {
  args: {
    level: FieldMessageLevel.Success
  },
}