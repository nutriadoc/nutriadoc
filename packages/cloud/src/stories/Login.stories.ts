import type {StoryObj, Meta} from '@storybook/html'
import Login from "../login";
import {div, a, href, text, onClick, View} from "@nutriadoc/classes";


const meta = {
  title: 'LoginStory',
  tags: [],
  render: () => {

    const login = new Login()
    const link: View = a(href("#"),
      text("Login"),
      onClick((e: Event) => {
        e.preventDefault()
        login.visible(link)
      })
    ) as View

    setTimeout(() => {
      link.element.click()
    }, 100);

    return div(
      link,
      login
    ).render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LoginStory: Story = {
  args: {},
}


