import * as assert from 'assert'
import * as witherable from '../src/Witherable'
import * as array from '../src/Array'
// import * as either from '../src/Either'
import * as option from '../src/Option'
import * as identity from '../src/Identity'

describe('Witherable', () => {
  it('Array/wither', () => {
    const f = (n: number): identity.Identity<option.Option<number>> =>
      n > 5 ? identity.of(option.some(n * 10)) : identity.of(option.none)
    assert.deepEqual(witherable.wither(array, identity)(f, [1, 2, 3]).value, [])
    assert.deepEqual(witherable.wither(array, identity)(f, [1, 2, 6]).value, [60])
  })

  it('Option/wither', () => {
    const f = (n: number): identity.Identity<option.Option<number>> =>
      n > 5 ? identity.of(option.some(n * 10)) : identity.of(option.none)
    assert.deepEqual(witherable.wither(option, identity)(f, option.some(6)).value, option.some(60))
    assert.deepEqual(witherable.wither(option, identity)(f, option.some(5)).value, option.none)
    assert.deepEqual(witherable.wither(option, identity)(f, option.none).value, option.none)
  })

  it('withered', () => {
    assert.deepEqual(
      witherable.withered(array, identity)<number>([identity.of(option.none), identity.of(option.some(1))]).value,
      [1]
    )
  })
})
