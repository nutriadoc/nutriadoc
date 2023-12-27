import type {StoryObj, Meta} from '@storybook/html'
import ColorPicker from "../ui/color_picker/ColorPicker.ts";

// TODO: https://coloris.js.org/

const meta = {
  title: 'Editor/ColorPicker',
  tags: ['autodocs'],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const picker = new ColorPicker()
    picker.addTo(root)

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ColorPickerStories: Story = {
  args: {},
}


