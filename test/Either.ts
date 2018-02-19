import * as assert from 'assert'
import {
  fromNullable,
  fromOption,
  fromPredicate,
  getSetoid,
  left,
  right,
  tryCatch,
  fromValidation,
  either
} from '../src/Either'
import { none, some, option } from '../src/Option'
import { setoidNumber, setoidString } from '../src/Setoid'
import { failure, success } from '../src/Validation'
import { traverse } from '../src/Traversable'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(left<string, string>('abc').fold(f, g), 'left3')
    assert.strictEqual(right<string, string>('abc').fold(f, g), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(right('abc').map(f), right(3))
    assert.deepEqual(left<string, string>('s').map(f), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepEqual(right<string, number>(1).bimap(f, g), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(right<string, string>('abc').ap(right<string, (s: string) => number>(f)), right(3))
    assert.deepEqual(left<string, string>('a').ap(right<string, (s: string) => number>(f)), left<string, number>('a'))
    assert.deepEqual(
      right<string, string>('abc').ap(left<string, (s: string) => number>('a')),
      left<string, number>('a')
    )
    assert.deepEqual(left<string, string>('b').ap(left<string, (s: string) => number>('a')), left<string, number>('a'))
  })

  it('chain', () => {
    const f = (s: string) => right<string, number>(s.length)
    assert.deepEqual(right<string, string>('abc').chain(f), right(3))
    assert.deepEqual(left<string, string>('a').chain(f), left('a'))
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
    assert.deepEqual(e2, left(new SyntaxError('Unexpected end of JSON input')))
    const e3 = tryCatch(() => {
      throw 'a string'
    })
    assert.deepEqual(e3, left(new Error('a string')))
  })

  it('getOrElse', () => {
    assert.equal(right(12).getOrElse(17), 12)
    assert.equal(left(12).getOrElse(17), 17)
  })

  it('getOrElseL', () => {
    assert.equal(right(12).getOrElseL(() => 17), 12)
    assert.equal(left(12).getOrElseL(() => 17), 17)
    assert.equal(left(12).getOrElseL((l: number) => l + 1), 13)
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
    assert.deepEqual(fromValidation(success(1)), right(1))
    assert.deepEqual(fromValidation(failure('a')), left('a'))
  })

  it('traverse', () => {
    assert.deepEqual(traverse(option, either)(right(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepEqual(traverse(option, either)(right(3), a => (a >= 2 ? some(a) : none)), some(right(3)))
  })
})
