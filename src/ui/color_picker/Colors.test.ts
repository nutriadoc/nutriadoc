import { randomColor } from "./Colors";


describe('Colors', () => {
  it('should pick a color', () => {
    
    const color = randomColor()

    expect(color).not.toBeNull()
  })
})