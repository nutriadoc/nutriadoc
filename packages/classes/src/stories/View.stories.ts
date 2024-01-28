import type {StoryObj, Meta} from '@storybook/html'
import {div, input, onChange, text, value} from "../ui";
import {bind} from "../core";

interface Model {
  name: string
}

const meta = {
  title: 'ViewStory',
  tags: [],
  render: () => {

    const model: Model = bind({
      name: ''
    })

    bind(model, (_: any, key: string | number | symbol, newValue: any, oldValue: any) => {
      console.log(key, newValue, oldValue)
    })

    return div(
      input(value(model.name),
        onChange((e: Event) => {
          model.name = (e.target as HTMLInputElement).value
        })
      ),
      div(text(model.name))
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


