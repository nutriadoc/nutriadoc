describe("Primitive", () => {
  it("string", () => {
    const name = new String("CJ")
    expect(name == "CJ").toBeTruthy()
  })

  it("number", () => {
    const age = new Number(39)
    expect(age == 39).toBeTruthy()
  })

  it("boolean", () => {
    const isMale = new Boolean(true)
    const isDesigner = new Boolean(false)

    const objects = new WeakMap()
    objects.set(isMale, isMale)
    objects.set(isDesigner, isDesigner)


    expect(objects.get(isDesigner) == false).toBeTruthy()
    expect(objects.get(isMale) === isMale).toBeTruthy()

    expect(isMale == true).toBeTruthy()
  })

  it("string", () => {
    const name = "cj"
    const keys = Object.keys(name)
    expect(keys).toEqual(["0", "1"])
  })

  it("number", () => {
    const name = 1
    const keys = Object.keys(name)
    expect(keys).toEqual([])
  })

  it("boolean", () => {
    const name = true
    const keys = Object.keys(name)
    expect(keys).toEqual([])

  })

  it("array", () => {
    const name = [1, 2, 3]
    const keys = Object.keys(name)
    expect(keys).toEqual(["0", "1", "2"])

  })
})