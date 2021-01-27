import * as assert from 'assert'
import * as _ from '../src/Random'

describe('Random', () => {
  it('random', () => {
    const n = _.random()
    assert.deepStrictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = _.randomInt(0, 10)()
    assert.deepStrictEqual(typeof n, 'number')
    assert.deepStrictEqual(n % 1 === 0, true)
    assert.deepStrictEqual(n >= 0, true)
    assert.deepStrictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = _.randomRange(0, 10)()
      assert.deepStrictEqual(typeof n, 'number')
      assert.deepStrictEqual(n >= 0, true)
      assert.deepStrictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = _.randomBool()
    assert.deepStrictEqual(typeof b, 'boolean')
  })

  it('randomElem', () => {
    const e = _.randomElem([1, 2, 3])()
    assert.deepStrictEqual(e >= 1 && e <= 3, true)
  })
})
