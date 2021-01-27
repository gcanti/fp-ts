import * as _ from '../src/Random'
import { deepStrictEqual } from './util'

describe('Random', () => {
  it('random', () => {
    const n = _.random()
    deepStrictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = _.randomInt(0, 10)()
    deepStrictEqual(typeof n, 'number')
    deepStrictEqual(n % 1 === 0, true)
    deepStrictEqual(n >= 0, true)
    deepStrictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = _.randomRange(0, 10)()
      deepStrictEqual(typeof n, 'number')
      deepStrictEqual(n >= 0, true)
      deepStrictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = _.randomBool()
    deepStrictEqual(typeof b, 'boolean')
  })

  it('randomElem', () => {
    const e = _.randomElem([1, 2, 3])()
    deepStrictEqual(e >= 1 && e <= 3, true)
  })
})
