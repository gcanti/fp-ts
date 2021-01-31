import { getStructShow, getTupleShow, showNumber, showString } from '../src/Show'
import { deepStrictEqual } from './util'

describe('Show', () => {
  it('showString', () => {
    const S = showString
    deepStrictEqual(S.show('a'), '"a"')
  })

  it('showNumber', () => {
    const S = showNumber
    deepStrictEqual(S.show(1), '1')
  })

  it('getStructShow', () => {
    deepStrictEqual(getStructShow({}).show({}), '{}')
    deepStrictEqual(getStructShow({ a: showString }).show({ a: 'a' }), '{ a: "a" }')
    deepStrictEqual(getStructShow({ a: showString, b: showNumber }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const S = getTupleShow(showString, showNumber)
    deepStrictEqual(S.show(['a', 1]), '["a", 1]')
  })
})
