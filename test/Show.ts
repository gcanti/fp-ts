import * as assert from 'assert'
import { showString, showNumber, showBoolean, getStructShow, getTupleShow } from '../src/Show'

describe('Show', () => {
  it('showString', () => {
    const S = showString
    assert.strictEqual(S.show('a'), '"a"')
  })

  it('showNumber', () => {
    const S = showNumber
    assert.strictEqual(S.show(1), '1')
  })

  it('showBoolean', () => {
    const S = showBoolean
    assert.strictEqual(S.show(true), 'true')
  })

  it('getStructShow', () => {
    const S = getStructShow({ a: showString, b: showNumber })
    assert.strictEqual(S.show({ a: 'a', b: 1 }), '{ a: "a", b: 1 }')
  })

  it('getTupleShow', () => {
    const S = getTupleShow(showString, showNumber)
    assert.strictEqual(S.show(['a', 1]), '["a", 1]')
  })
})
