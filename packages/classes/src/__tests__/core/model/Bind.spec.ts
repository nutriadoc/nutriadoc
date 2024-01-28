import {change, bind} from "../../../core";

interface Person {
  name: string

  age?: number

}

describe("Bind", () => {

  it("Bind a primitive value", () => {
    let name = bind("CJ")
    const valueWatch = jest.fn()
    bind(name, valueWatch)
    name = change(name, "CJ2")

    expect(name == "CJ2").toBeTruthy()
    expect(valueWatch).toHaveBeenCalledTimes(1)
  })

  it("should be able to bind a primitive value", () => {
    const person = bind({
      name: 'CJ',
      age: 39
    } as Person)
    bind(person, (_: any, key: string | number | symbol, newValue: any, oldValue: any) => {
      expect(key).toBe('age')
      expect(newValue == 40).toBeTruthy()
      expect(oldValue == 39).toBeTruthy()
    })
    person.age = 40

    expect(person.age == 40).toBeTruthy()
  })

  it("should be able to bind a string value", () => {
    const person = bind({
      name: 'CJ',
      age: 39
    } as Person)
    bind(person, (_: any, key: string | number | symbol, newValue: any, oldValue: any) => {
      expect(key).toBe('name')
      expect(newValue == "CJ2").toBeTruthy()
      expect(oldValue == "CJ").toBeTruthy()
    })
    person.name = "CJ2"
  })

  // toString call not exception
  it("toString", () => {
    const person = bind({
      name: 'CJ',
      age: 39
    } as Person)
    const name = person.name.toString()
    expect(name).toBe('CJ')
  })

  it("Dispatch value change", () => {
    const person = bind({
      name: 'CJ',
      age: 39
    } as Person)

    const objectWatch = jest.fn()
    bind(person, objectWatch)

    const propertyWatch = jest.fn()
    bind(person.age, propertyWatch)

    person.age = 40
    person.age = undefined

    expect(objectWatch).toHaveBeenCalledTimes(2)
    expect(propertyWatch).toHaveBeenCalledTimes(2)
  })

  it("Copy a property value to another object", () => {
    const person = bind({
      name: 'CJ',
      age: 39
    } as Person)

    const person2 = bind({
      name: 'CJ',
      age: 39
    } as Person)

/*    bind(person.age, person2)*/
    bind(person.age, person2.age)

    person.age = 40

    expect(person2.age == 40).toBeTruthy()
  })

})