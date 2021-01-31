import { getStructShow, getTupleShow } from '../src/Show'
import { deepStrictEqual } from './util'
import * as S from '../src/string'
import * as N from '../src/number'

describe('Show', () => {
  it('getStructShow', () => {
    deepStrictEqual(getStructShow({}).show({}), '{}')
    deepStrictEqual(getStructShow({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    deepStrictEqual(getStructShow({ a: S.Show, b: N.Show }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const Sh = getTupleShow(S.Show, N.Show)
    deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
