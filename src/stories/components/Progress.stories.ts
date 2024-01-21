import type {StoryObj, Meta} from '@storybook/html'
import {div, style} from "../../ui/views.ts";
import ProgressIndicator from "../../ui/progress_indicator/ProgressIndicator.ts";


const meta = {
  title: 'Components/ProgressIndicatorExample',
  tags: [],
  render: () => {

    const indicator = new ProgressIndicator()

    let i = 0
    const handler = setInterval(() => {
      i++

      indicator.percent = i / 100

      if (i > 100) {
        clearInterval(handler)
        indicator.remove()
        return
      }
    }, 10)

    indicator.percent = 0.1

    return div(
      style({
        width: "400px",
        height: "300px",
        position: "relative",
        backgroundColor: "#f2f2f2"
      }),
      indicator
    ).render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ProgressIndicatorExample: Story = {
  args: {
  },
}


