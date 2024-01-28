import type {StoryObj, Meta} from '@storybook/html'
import {div, input, value} from "../ui";
import {bind} from "../core";

interface Model {
  name: string
}

const meta = {
  title: 'ViewStory',
  tags: [],
  render: () => {

    const model: Model = bind({
      name: 'CJ'
    })

    bind(model, (_: any, key: string | number | symbol, newValue: any, oldValue: any) => {
      console.log(key, newValue, oldValue)
    })

    model.name = 'CJ2'

    return div(
      input(value(model.name))
    ).render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ViewStory: Story = {
  args: {},
}


