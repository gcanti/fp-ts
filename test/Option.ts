import * as assert from 'assert'
import { array } from '../src/Array'
import { left, right } from '../src/Either'
import {
  Option,
  fromEither,
  fromNullable,
  fromRefinement,
  getFirstMonoid,
  getLastMonoid,
  getMonoid,
  getOrd,
  getSetoid,
  none,
  option,
  some,
  tryCatch
} from '../src/Option'
import { ordString } from '../src/Ord'
import { semigroupString } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import { traverse } from '../src/Traversable'
import { identity } from '../src/function'

describe('Option', () => {
  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(none.fold(f, g), 'none')
    assert.strictEqual(some('abc').fold(f, g), 'some3')
  })

  it('getOrElse', () => {
    const x: Option<number> = some(1)
    assert.strictEqual(x.getOrElse(0), 1)
    const y: Option<number> = none
    assert.strictEqual(y.getOrElse(0), 0)
  })

  it('getOrElseL', () => {
    const x: Option<number> = some(1)
    assert.strictEqual(x.getOrElseL(() => 0), 1)
    const y: Option<number> = none
    assert.strictEqual(y.getOrElseL(() => 0), 0)
  })

  it('equals', () => {
    const { equals } = getSetoid(setoidNumber)
    assert.strictEqual(equals(none, none), true)
    assert.strictEqual(equals(none, some(1)), false)
    assert.strictEqual(equals(some(1), none), false)
    assert.strictEqual(equals(some(2), some(1)), false)
    assert.strictEqual(equals(some(1), some(2)), false)
    assert.strictEqual(equals(some(2), some(2)), true)
  })

  it('map', () => {
    const f = (n: number) => n * 2
    assert.deepEqual(some(2).map(f), some(4))
    assert.deepEqual(none.map(f), none)
  })

  it('getSetoid', () => {
    const O = getSetoid(ordString)
    assert.deepEqual(O.equals(none, none), true, 'none === none')
    assert.deepEqual(O.equals(some('a'), none), false, 'some(a) !== none')
    assert.deepEqual(O.equals(none, some('a')), false, 'none !== some(a)')
    assert.deepEqual(O.equals(some('a'), some('a')), true, 'some(a) === some(a)')
    assert.deepEqual(O.equals(some('a'), some('b')), false, 'some(a) !== some(b)')
  })

  it('getOptionOrd', () => {
    const O = getOrd(ordString)
    assert.deepEqual(O.compare(none, none), 0, 'none ? none')
    assert.deepEqual(O.compare(some('a'), none), 1, 'some(a) ? none')
    assert.deepEqual(O.compare(none, some('a')), -1, 'none ? some(a)')
    assert.deepEqual(O.compare(some('a'), some('a')), 0, 'some(a) ? some(a)')
    assert.deepEqual(O.compare(some('a'), some('b')), -1, 'some(a) ? some(b)')
    assert.deepEqual(O.compare(some('b'), some('a')), 1, 'some(b) ? some(a)')
  })

  it('mapNullable', () => {
    type Nested = {
      foo?: number
      foo2: {
        bar2?: string
      }
    }
    const nested: Nested = {
      foo2: {}
    }
    const nestedOption = some(nested)
    assert.deepEqual(nestedOption.mapNullable(value => value.foo), none)
    assert.deepEqual(nestedOption.mapNullable(value => value.foo2), some(nested.foo2))
    assert.deepEqual(nestedOption.mapNullable(value => value.foo2.bar2), none)
    assert.deepEqual(none.mapNullable(identity), none)
  })

  it('ap', () => {
    const f = (n: number) => n * 2
    assert.deepEqual(some(2).ap(some(f)), some(4))
    assert.deepEqual(none.ap(some(f)), none)
    assert.deepEqual(some(2).ap(none), none)
    assert.deepEqual(some(2).ap(some(f)), some(4))
  })

  it('chain', () => {
    const f = (n: number) => some(n * 2)
    const g = () => none
    assert.deepEqual(some(2).chain(f), some(4))
    assert.deepEqual(some(2).chain(g), none)
    assert.deepEqual(none.chain(f), none)
  })

  it('getMonoid', () => {
    const { concat } = getMonoid(semigroupString)
    assert.deepEqual(concat(none, none), none)
    assert.deepEqual(concat(none, some('a')), some('a'))
    assert.deepEqual(concat(some('a'), none), some('a'))
    assert.deepEqual(concat(some('b'), some('a')), some('ba'))
    assert.deepEqual(concat(some('a'), some('b')), some('ab'))
  })

  it('alt', () => {
    assert.deepEqual(some(1).alt(some(2)), some(1))
    assert.deepEqual(some(2).alt(none), some(2))
    assert.deepEqual((none as Option<number>).alt(some(1)), some(1))
    assert.deepEqual(none.alt(none), none)
  })

  it('fromNullable', () => {
    assert.deepEqual(fromNullable(2), some(2))
    assert.deepEqual(fromNullable(null), none)
    assert.deepEqual(fromNullable(undefined), none)
  })

  it('traverse', () => {
    assert.deepEqual(traverse(array, option)(some('hello'), s => []), [])
    assert.deepEqual(traverse(array, option)(some('hello'), s => [s.length]), [some(5)])
    assert.deepEqual(traverse(array, option)(none, s => [s]), [none])
  })

  it('reduce', () => {
    assert.strictEqual(none.reduce(2, (b, a) => b + a), 2)
    assert.strictEqual(some(3).reduce(2, (b, a) => b + a), 5)
  })

  it('getFirstMonoid', () => {
    const first = getFirstMonoid<number>()
    assert.deepEqual(first.concat(none, some(1)), some(1))
    assert.deepEqual(first.concat(some(1), none), some(1))
    assert.deepEqual(first.concat(none, none), none)
    assert.deepEqual(first.concat(some(1), some(2)), some(1))
  })

  it('getLastMonoid', () => {
    const last = getLastMonoid<number>()
    assert.deepEqual(last.concat(none, some(1)), some(1))
    assert.deepEqual(last.concat(some(1), none), some(1))
    assert.deepEqual(last.concat(none, none), none)
    assert.deepEqual(last.concat(some(1), some(2)), some(2))
  })

  it('contains', () => {
    const x: Option<number> = none
    assert.equal(x.contains(setoidNumber, 2), false)
    assert.equal(some(2).contains(setoidNumber, 2), true)
    assert.equal(some(2).contains(setoidNumber, 1), false)
  })

  it('isNone', () => {
    const x: Option<number> = none
    assert.equal(x.isNone(), true)
    assert.equal(some(1).isNone(), false)
    assert.equal(some(null).isNone(), false)
  })

  it('isSome', () => {
    const x: Option<number> = none
    assert.equal(x.isSome(), false)
    assert.equal(some(1).isSome(), true)
    assert.equal(some(null).isSome(), true)
  })

  it('exists', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2

    assert.equal(x.exists(is2), false)
    assert.equal(some(1).exists(is2), false)
    assert.equal(some(2).exists(is2), true)
  })

  it('filter', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2
    assert.equal(x.filter(is2), x)
    assert.equal(some(1).filter(is2), none)
    const some2 = some(2)
    assert.equal(some2.filter(is2), some2)
  })

  it('refine', () => {
    const x: Option<number | string> = none
    const isString = (a: any): a is string => typeof a === 'string'
    assert.equal(x.refine(isString), x)
    const some1 = some<number | string>(1)
    assert.equal(some1.refine(isString), none)
    const someHello = some<number | string>('hello')
    // explicitly type refinedOption as Option<string> to prove typings work
    // typing as Option<number> will cause typescript to error
    const refinedOption: Option<string> = someHello.refine(isString)
    assert.equal(refinedOption, someHello)
  })

  it('tryCatch', () => {
    assert.deepEqual(tryCatch(() => JSON.parse('2')), some(2))
    assert.deepEqual(tryCatch(() => JSON.parse('(')), none)
  })

  it('fromEither', () => {
    assert.deepEqual(fromEither(left('foo')), none)
    assert.deepEqual(fromEither(right(1)), some(1))
  })

  it('toString', () => {
    assert.strictEqual(some(2).toString(), 'some(2)')
    assert.strictEqual(some({ a: 1 }).toString(), 'some({\n  "a": 1\n})')
  })

  it('fromRefinement', () => {
    type Direction = 'asc' | 'desc'
    const parseDirection = fromRefinement((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepEqual(parseDirection('asc'), some('asc'))
    assert.deepEqual(parseDirection('foo'), none)
  })
})
