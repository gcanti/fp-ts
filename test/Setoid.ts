import * as assert from 'assert'
import {
  contramap,
  setoidDate,
  setoidNumber,
  setoidString,
  fromEquals,
  getTupleSetoid,
  setoidBoolean,
  getStructSetoid
} from '../src/Setoid'

describe('Setoid', () => {
  it('getTupleSetoid', () => {
    const S = getTupleSetoid(setoidString, setoidNumber, setoidBoolean)
    assert.strictEqual(S.equals(['a', 1, true], ['a', 1, true]), true)
    assert.strictEqual(S.equals(['a', 1, true], ['b', 1, true]), false)
    assert.strictEqual(S.equals(['a', 1, true], ['a', 2, true]), false)
    assert.strictEqual(S.equals(['a', 1, true], ['a', 1, false]), false)
  })

  interface Person {
    name: string
    age: number
  }
  it('fromEquals', () => {
    interface A {
      x: number
    }
    let nbCall = 0
    const S1 = fromEquals<A>((a, b) => {
      nbCall += 1
      return a.x === b.x
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    S1.equals(a1, a1)
    assert.strictEqual(nbCall, 0)
    S1.equals(a1, a2)
    assert.strictEqual(nbCall, 1)
  })

  it('contramap', () => {
    const S = contramap(setoidString, (p: Person) => p.name)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 2 }), false)
  })

  it('setoidDate', () => {
    assert.strictEqual(setoidDate.equals(new Date(0), new Date(0)), true)
    assert.strictEqual(setoidDate.equals(new Date(0), new Date(1)), false)
    assert.strictEqual(setoidDate.equals(new Date(1), new Date(0)), false)
  })

  it('getStructSetoid', () => {
    const S = getStructSetoid<Person>({
      name: setoidString,
      age: setoidNumber
    })
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })
})
