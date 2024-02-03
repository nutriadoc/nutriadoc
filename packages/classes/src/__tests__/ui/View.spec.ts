import {bind} from "../../core";
import {div, id, input, onChange} from "../../ui";

interface Person {
  name: string
}

describe('View', () => {
  // attribute binding (property)

  it('should bind a property to an attribute', () => {
    const person = bind<Person>({
      name: 'CJ'
    })
    const view = div(
      input(onChange(() => {
        console.debug('change')
      }))
    )

    console.debug({person, view})
  })

  it("should add a class to the view", () => {
    const view = div()
    view.addClass("test")
    expect(view.element.classList.contains("test")).toBe(true)


  })

  it("should remove a class from the view", () => {
    const view = div()
    view.addClass("test")
    view.removeClass("test")
    expect(view.element.classList.contains("test")).toBe(false)
  })

  it("should find a view by id", () => {
    const view = div(div(id("test")))
    const test = view.find(id("test"));
    expect(test?.getAttribute("id")).toBe("test")
  })
});