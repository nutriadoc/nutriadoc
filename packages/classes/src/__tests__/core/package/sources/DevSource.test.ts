import {DevSource, Package} from "../../../../core";

describe("DevSource", () => {
  it("should return the correct url", () => {
    const devSource = new DevSource()
    const pkg: Package = { name: "@nutriadoc/components", version: "1.0.0"}
    const url = devSource.getUrl("/dist/main.es.js", pkg)
    expect(url).toBe("http://localhost:3000/packages/components/dist/main.es.js")
  })
})