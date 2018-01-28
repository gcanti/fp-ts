import * as assert from 'assert'
import { getRecordSetoid, setoidString, setoidNumber, getProductSetoid } from '../src/Setoid'

describe('Setoid', () => {
  it('getRecordSetoid', () => {
    interface Person {
      name: string
      age: number
    }
    const S = getRecordSetoid<Person>({
      name: setoidString,
      age: setoidNumber
    })
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })

  it('getProductSetoid', () => {
    const S = getProductSetoid(setoidString, setoidNumber)
    assert.strictEqual(S.equals(['a', 1], ['a', 1]), true)
    assert.strictEqual(S.equals(['a', 1], ['b', 1]), false)
    assert.strictEqual(S.equals(['a', 1], ['a', 2]), false)
  })
})
