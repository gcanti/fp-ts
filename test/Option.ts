import * as assert from 'assert'
import {
  Option,
  equals,
  fold,
  none,
  map,
  of,
  ap,
  chain,
  alt,
  getMonoid,
  fromNullable
} from '../src/Option'

import { setoidPimitive } from '../src/cats'

function assertEqual<A>(fx: Option<A>, fy: Option<A>) {
  assert.strictEqual(equals(setoidPimitive, fx, fy), true)
}

describe('Option', () => {

  it('fold', () => {
    const f = (s: string): number => s.length
    assert.strictEqual(fold(() => 1, f, none), 1)
    assert.strictEqual(fold(() => 1, f, of('abc')), 3)
  })

  it('equals', () => {
    assert.strictEqual(equals(setoidPimitive, none, none), true)
    assert.strictEqual(equals(setoidPimitive, none, of(1)), false)
    assert.strictEqual(equals(setoidPimitive, of(2), of(1)), false)
    assert.strictEqual(equals(setoidPimitive, of(2), of(2)), true)
  })

  it('map', () => {
    const f = (n: number) => n * 2
    assertEqual(map(f, of(2)), of(4))
  })

  it('ap', () => {
    const f = (n: number) => n * 2
    assertEqual(ap(of(f), of(2)), of(4))
    assertEqual(ap(of(f), none), none)
    assertEqual(ap(none, of(2)), none)
    assertEqual(ap(of(f), of(2)), of(4))
  })

  it('chain', () => {
    const f = (n: number) => of(n * 2)
    const g = () => none
    assertEqual(chain(f, of(2)), of(4))
    assertEqual(chain(g, of(2)), none)
  })

  it('getMonoid', () => {
    const { concat } = getMonoid({ concat(x: number, y: number){ return x + y } })
    assertEqual(concat(none, of(1)), of(1))
    assertEqual(concat(of(2), none), of(2))
    assertEqual(concat(of(2), of(1)), of(3))
  })

  it('alt', () => {
    assertEqual(alt(of(1), of(2)), of(1))
    assertEqual(alt(none, of(2)), of(2))
    assertEqual(alt(of(1), none), of(1))
    assertEqual(alt(none, none), none)
  })

  it('fromNullable', () => {
    assertEqual(fromNullable(2), of(2))
    assertEqual(fromNullable(null), none)
    assertEqual(fromNullable(undefined), none)
  })

})
