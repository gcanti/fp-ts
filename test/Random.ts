import { random, randomBool, randomInt, randomRange } from '../src/Random'
import { deepStrictEqual } from './util'

describe('Random', () => {
  it('random', () => {
    const n = random()
    deepStrictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = randomInt(0, 10)()
    deepStrictEqual(typeof n, 'number')
    deepStrictEqual(n % 1 === 0, true)
    deepStrictEqual(n >= 0, true)
    deepStrictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = randomRange(0, 10)()
      deepStrictEqual(typeof n, 'number')
      deepStrictEqual(n >= 0, true)
      deepStrictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = randomBool()
    deepStrictEqual(typeof b, 'boolean')
  })
})
