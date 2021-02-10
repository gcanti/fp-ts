import * as U from './util'
import * as N from '../src/number'
import { struct, tuple } from '../src/Show'
import * as S from '../src/string'

describe('Show', () => {
  it('struct', () => {
    U.deepStrictEqual(struct({}).show({}), '{}')
    U.deepStrictEqual(struct({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    U.deepStrictEqual(struct({ a: S.Show, b: N.Show }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('tuple', () => {
    const Sh = tuple(S.Show, N.Show)
    U.deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
