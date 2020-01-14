import * as assert from 'assert'
import { eq, eqDate, eqNumber, eqString, fromEquals, getTupleEq, eqBoolean, getStructEq } from '../src/Eq'

describe('Eq', () => {
  it('getTupleEq', () => {
    const S = getTupleEq(eqString, eqNumber, eqBoolean)
    assert.deepStrictEqual(S.equals(['a', 1, true], ['a', 1, true]), true)
    assert.deepStrictEqual(S.equals(['a', 1, true], ['b', 1, true]), false)
    assert.deepStrictEqual(S.equals(['a', 1, true], ['a', 2, true]), false)
    assert.deepStrictEqual(S.equals(['a', 1, true], ['a', 1, false]), false)
  })

  interface Person {
    readonly name: string
    readonly age: number
  }
  it('fromEquals', () => {
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const S1 = fromEquals<A>((a, b) => {
      nbCall += 1
      return a.x === b.x
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    S1.equals(a1, a1)
    assert.deepStrictEqual(nbCall, 0)
    S1.equals(a1, a2)
    assert.deepStrictEqual(nbCall, 1)
  })

  it('contramap', () => {
    const S = eq.contramap(eqString, (p: Person) => p.name)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), true)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 2 }), false)
  })

  it('eqDate', () => {
    assert.deepStrictEqual(eqDate.equals(new Date(0), new Date(0)), true)
    assert.deepStrictEqual(eqDate.equals(new Date(0), new Date(1)), false)
    assert.deepStrictEqual(eqDate.equals(new Date(1), new Date(0)), false)
  })

  it('getStructEq', () => {
    const S = getStructEq<Person>({
      name: eqString,
      age: eqNumber
    })
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    assert.deepStrictEqual(S.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })
})
