import * as assert from 'assert'
import { showString, showNumber, showBoolean, getStructShow, getTupleShow } from '../src/Show'

describe('Show', () => {
  it('showString', () => {
    const S = showString
    assert.deepStrictEqual(S.show('a'), '"a"')
  })

  it('showNumber', () => {
    const S = showNumber
    assert.deepStrictEqual(S.show(1), '1')
  })

  it('showBoolean', () => {
    const S = showBoolean
    assert.deepStrictEqual(S.show(true), 'true')
  })

  it('getStructShow', () => {
    assert.deepStrictEqual(getStructShow({}).show({}), '{}')
    assert.deepStrictEqual(getStructShow({ a: showString }).show({ a: 'a' }), '{ a: "a" }')
    assert.deepStrictEqual(getStructShow({ a: showString, b: showNumber }).show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const S = getTupleShow(showString, showNumber)
    assert.deepStrictEqual(S.show(['a', 1]), '["a", 1]')
  })
})
