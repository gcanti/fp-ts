import { getStructShow, getTupleShow, showNumber } from '../src/Show'
import { deepStrictEqual } from './util'
import * as S from '../src/string'

describe('Show', () => {
  it('showNumber', () => {
    const Sh = showNumber
    deepStrictEqual(Sh.show(1), '1')
  })

  it('getStructShow', () => {
    deepStrictEqual(getStructShow({}).show({}), '{}')
    deepStrictEqual(getStructShow({ a: S.Show }).show({ a: 'a' }), '{ a: "a" }')
    deepStrictEqual(getStructShow({ a: S.Show, b: showNumber }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const Sh = getTupleShow(S.Show, showNumber)
    deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
