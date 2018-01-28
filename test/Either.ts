import * as assert from 'assert'
import {
  ap,
  bimap,
  chain,
  fold,
  fromNullable,
  fromOption,
  fromPredicate,
  getOrElse,
  getOrElseValue,
  getSetoid,
  left,
  map,
  right,
  tryCatch,
  fromValidation
} from '../src/Either'
import { none, some } from '../src/Option'
import { setoidNumber, setoidString } from '../src/Setoid'
import { failure, success } from '../src/Validation'
import { semigroupString } from '../src/Semigroup'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(fold(f, g)(left('abc')), 'left3')
    assert.strictEqual(fold(f, g)(right('abc')), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(map(right('abc'), f), right(3))
    assert.deepEqual(map(left<string, string>('s'), f), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepEqual(bimap(f, g, right(1)), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(ap(right<string, (s: string) => number>(f), right<string, string>('abc')), right(3))
    assert.deepEqual(ap(right<string, (s: string) => number>(f), left<string, string>('a')), left<string, number>('a'))
    assert.deepEqual(
      ap(left<string, (s: string) => number>('a'), right<string, string>('abc')),
      left<string, number>('a')
    )
    assert.deepEqual(ap(left<string, (s: string) => number>('a'), left<string, string>('b')), left<string, number>('a'))
  })

  it('chain', () => {
    const f = (s: string) => right<string, number>(s.length)
    assert.deepEqual(chain(right<string, string>('abc'), f), right(3))
    assert.deepEqual(chain(left<string, string>('a'), f), left('a'))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepEqual(gt2(3), right(3))
    assert.deepEqual(gt2(1), left('Invalid number 1'))
  })

  it('tryCatch', () => {
    const e1 = tryCatch(() => {
      return JSON.parse(`{}`)
    })
    assert.deepEqual(e1, right({}))
    const e2 = tryCatch(() => {
      return JSON.parse(``)
    })
    assert.deepEqual(e2, left<Error, any>(new SyntaxError('Unexpected end of JSON input')))
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
    const equals = getSetoid(setoidString, setoidNumber).equals
    assert.strictEqual(equals(right(1), right(1)), true)
    assert.strictEqual(equals(right(1), right(2)), false)
    assert.strictEqual(equals(left('foo'), left('foo')), true)
    assert.strictEqual(equals(left('foo'), left('bar')), false)
  })

  it('fromValidation', () => {
    const f = failure(semigroupString)
    assert.deepEqual(fromValidation(success(1)), right(1))
    assert.deepEqual(fromValidation(f('a')), left('a'))
  })
})
