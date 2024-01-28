import {bind} from "../../core";
import {div, input, onChange} from "../../ui";

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
});