import * as assert from 'assert'
import {
  right,
  left,
  map,
  fold,
  getOrElse,
  getOrElseValue,
  ap,
  chain,
  fromPredicate,
  tryCatch,
  fromOption,
  fromNullable,
  bimap,
  getSetoid
} from '../src/Either'
import { eqEithers as eq } from './helpers'
import { none, some } from '../src/Option'
import { setoidNumber, setoidString } from '../src/Setoid'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(fold(f, g)(left('abc')), 'left3')
    assert.strictEqual(fold(f, g)(right('abc')), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    eq(map(f, right('abc')), right(3))
    eq(map(f, left('s')), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    eq(bimap(f, g, right(1)), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    eq(ap(right<string, (s: string) => number>(f), right<string, string>('abc')), right(3))
    eq(ap(right<string, (s: string) => number>(f), left<string, string>('a')), left<string, number>('a'))
    eq(ap(left<string, (s: string) => number>('a'), right<string, string>('abc')), left<string, number>('a'))
    eq(ap(left<string, (s: string) => number>('a'), left<string, string>('b')), left<string, number>('a'))
  })

  it('chain', () => {
    const f = (s: string) => right<string, number>(s.length)
    eq(chain(f, right<string, string>('abc')), right(3))
    eq(chain(f, left<string, string>('a')), left('a'))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    eq(gt2(3), right(3))
    eq(gt2(1), left('Invalid number 1'))
  })

  it('tryCatch', () => {
    const e1 = tryCatch(() => {
      return JSON.parse(`{}`)
    })
    eq(e1, right({}))
    const e2 = tryCatch(() => {
      return JSON.parse(``)
    })
    eq(e2, left<Error, any>(new Error()))
  })

  it('getOrElse', () => {
    assert.equal(getOrElse((l: number) => 17)(right(12)), 12)
    assert.equal(getOrElse((l: number) => 17)(left(12)), 17)
    assert.equal(getOrElse((l: number) => l + 1)(left(12)), 13)
  })

  it('getOrElseValue', () => {
    assert.equal(getOrElseValue(17)(right(12)), 12)
    assert.equal(getOrElseValue(17)(left(12)), 17)
  })

  it('fromOption', () => {
    assert.deepEqual(fromOption('default')(none), left('default'))
    assert.deepEqual(fromOption('default')(some(1)), right(1))
  })

  it('fromNullable', () => {
    assert.deepEqual(fromNullable('default')(null), left('default'))
    assert.deepEqual(fromNullable('default')(undefined), left('default'))
    assert.deepEqual(fromNullable('default')(1), right(1))
  })

  it('equals', () => {
    const eq = getSetoid(setoidString, setoidNumber).equals
    assert.strictEqual(eq(right(1))(right(1)), true)
    assert.strictEqual(eq(right(1))(right(2)), false)
    assert.strictEqual(eq(left('foo'))(left('foo')), true)
    assert.strictEqual(eq(left('foo'))(left('bar')), false)
  })
})
