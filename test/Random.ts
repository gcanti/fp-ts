import * as assert from 'assert'
import { random, randomInt, randomBool, randomRange } from '../src/Random'

describe('Random', () => {
  it('random', () => {
    const n = random()
    assert.deepStrictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = randomInt(0, 10)()
    assert.deepStrictEqual(typeof n, 'number')
    assert.deepStrictEqual(n % 1 === 0, true)
    assert.deepStrictEqual(n >= 0, true)
    assert.deepStrictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = randomRange(0, 10)()
      assert.deepStrictEqual(typeof n, 'number')
      assert.deepStrictEqual(n >= 0, true)
      assert.deepStrictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = randomBool()
    assert.deepStrictEqual(typeof b, 'boolean')
  })
})
