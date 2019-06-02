import * as assert from 'assert'
import { contramap, eqDate, eqNumber, eqString, fromEquals, getTupleEq, eqBoolean, getStructEq } from '../src/Eq'

describe('Eq', () => {
  it('getTupleEq', () => {
    const S = getTupleEq(eqString, eqNumber, eqBoolean)
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
    const S = contramap(eqString, (p: Person) => p.name)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 2 }), false)
  })

  it('eqDate', () => {
    assert.strictEqual(eqDate.equals(new Date(0), new Date(0)), true)
    assert.strictEqual(eqDate.equals(new Date(0), new Date(1)), false)
    assert.strictEqual(eqDate.equals(new Date(1), new Date(0)), false)
  })

  it('getStructEq', () => {
    const S = getStructEq<Person>({
      name: eqString,
      age: eqNumber
    })
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    assert.strictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })
})
