import type {StoryObj, Meta} from '@storybook/html'
import { Login } from "../login"
import {div, a, href, text, onClick, View, style} from "@nutriadoc/classes"

interface LoginArgs {
}

const meta: Meta<LoginArgs> = {
  title: 'LoginStory',
  tags: [],
  render: () => {

    const login = new Login()
    const link: View = a(
      href("#"),
      text("Login"),
      onClick((e: Event) => {
        e.preventDefault()
        login.visible(link)
      })
    ) as View

    setTimeout(() => {
      link.element.click()
    }, 1000);

    (document.querySelector("#storybook-root") as HTMLElement).style.height = "600px"

    return div(
      style({
        display: "flex",
        justifyContent: "right",
        flex: 1,
        position: "relative",
      }),
      link,
    ).render() as Node
  },
  argTypes: {
    validationField: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta;
type Story = StoryObj<LoginArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LoginStory: Story = {
  args: {},
}


