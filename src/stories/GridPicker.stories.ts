import type {StoryObj, Meta} from '@storybook/html'
import GridPicker from "../ui/grid_picker/GridPicker.ts";

const meta = {
  title: 'Components/GridPicker1',
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const picker = new GridPicker(10, 10, true)
    picker.addTo(root)
    picker.addEventListener("pick", (_: Event) => {
    })

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const GridPicker1: Story = {
  args: {},
}


