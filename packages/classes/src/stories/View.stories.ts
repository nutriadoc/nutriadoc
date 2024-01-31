import type {StoryObj, Meta} from '@storybook/html'
import {div, input, IUnit, onChange, text, value, View} from "../ui";
import {bind} from "../core";

interface Model {
  name: string
}

class Container extends View {
  constructor(...units: IUnit[]) {
    const element = document.createElement('div')
    element.classList.add('container')
    super(element, ...units)
  }
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

    return new Container(
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


