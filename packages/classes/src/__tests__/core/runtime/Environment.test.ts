import { describe, test} from "@jest/globals"

import Environment from "../../../core/runtime/Environment.ts";

describe('Environment', () => {
  test('should', () => {
    const mode = Environment['MODE']
    console.debug(mode)
  })
})