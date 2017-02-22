import * as assert from 'assert'
import {
  equals,
  fold,
  none,
  map,
  some,
  ap,
  chain,
  alt,
  getMonoid,
  fromNullable
} from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import { eqOptions as eq } from './helpers'

describe('Option', () => {

  it('fold', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(fold(f, g, none), 'none')
    assert.strictEqual(fold(f, g, some('abc')), 'some3')
  })

  it('getOrElse', () => {
    assert.strictEqual(some(1).getOrElse(() => 0), 1)
    assert.strictEqual(none.getOrElse(() => 0), 0)
  })

  it('equals', () => {
    assert.strictEqual(equals(setoidNumber, none, none), true)
    assert.strictEqual(equals(setoidNumber, none, some(1)), false)
    assert.strictEqual(equals(setoidNumber, some(2), some(1)), false)
    assert.strictEqual(equals(setoidNumber, some(2), some(2)), true)
  })

  it('map', () => {
    const f = (n: number) => n * 2
    eq(map(f, some(2)), some(4))
  })

  it('ap', () => {
    const f = (n: number) => n * 2
    eq(ap(some(f), some(2)), some(4))
    eq(ap(some(f), none), none)
    eq(ap(none, some(2)), none)
    eq(ap(some(f), some(2)), some(4))
  })

  it('chain', () => {
    const f = (n: number) => some(n * 2)
    const g = () => none
    eq(chain(f, some(2)), some(4))
    eq(chain(g, some(2)), none)
  })

  it('getMonoid', () => {
    const { concat } = getMonoid({ concat(x: number, y: number) { return x + y } })
    eq(concat(none, some(1)), some(1))
    eq(concat(some(2), none), some(2))
    eq(concat(some(2), some(1)), some(3))
  })

  it('alt', () => {
    eq(alt(some(1), some(2)), some(1))
    eq(alt(none, some(2)), some(2))
    eq(alt(some(1), none), some(1))
    eq(alt(none, none), none)
  })

  it('fromNullable', () => {
    eq(fromNullable(2), some(2))
    eq(fromNullable(null), none)
    eq(fromNullable(undefined), none)
  })

})
