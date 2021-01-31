import * as assert from 'assert'
import { showNumber, getStructShow, getTupleShow } from '../src/Show'
import * as S from '../src/string'

describe('Show', () => {
  it('showNumber', () => {
    const S = showNumber
    assert.deepStrictEqual(S.show(1), '1')
  })

  it('getStructShow', () => {
    const Sh = getStructShow({ a: S.Show, b: showNumber })
    assert.deepStrictEqual(Sh.show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const Sh = getTupleShow(S.Show, showNumber)
    assert.deepStrictEqual(Sh.show(['a', 1]), '["a", 1]')
  })
})
