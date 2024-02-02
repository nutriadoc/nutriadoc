import type { StoryObj, Meta } from '@storybook/html';
import {className, Load, placeholder} from "@nutriadoc/classes";
import { WantList as WantListComponent  } from "../../landing_page"

interface ButtonProps {

}

const meta = {
  title: 'LandingPage/WantList',
  tags: ['autodocs'],
  render: (args) => {
    (async () => {
      await Load.loadJS("https://cdn.tailwindcss.com")
    })()

    const wantlist = new WantListComponent()
    return wantlist.render() as Node
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const WantList: Story = {
  args: {

  },
}