import { struct, tuple } from '../src/Show'
import { deepStrictEqual } from './util'
import * as S from '../src/string'
import * as N from '../src/number'

describe('Show', () => {
  it('struct', () => {
    deepStrictEqual(struct({}).show({}), '{}')
    deepStrictEqual(struct({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    deepStrictEqual(struct({ a: S.Show, b: N.Show }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('tuple', () => {
    const Sh = tuple(S.Show, N.Show)
    deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
