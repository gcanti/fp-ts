import * as assert from 'assert'
import { array } from '../src/Array'
import { left, right } from '../src/Either'
import {
  Option,
  fromEither,
  fromNullable,
  fromPredicate,
  fromRefinement,
  getFirstMonoid,
  getLastMonoid,
  getMonoid,
  getOrd,
  getSetoid,
  isNone,
  isSome,
  none,
  option,
  some,
  tryCatch,
  getRefinement,
  getApplySemigroup,
  getApplyMonoid
} from '../src/Option'
import { ordString } from '../src/Ord'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import { identity } from '../src/function'
import { Identity, identity as I } from '../src/Identity'
import { monoidSum, monoidString } from '../src/Monoid'
import * as F from '../src/Foldable'

const p = (n: number): boolean => n > 2

describe('Option', () => {
  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(none.fold(f, g), 'none')
    assert.strictEqual(some('abc').fold(f, g), 'some3')
  })

  it('foldL', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(none.foldL(f, g), 'none')
    assert.strictEqual(some('abc').foldL(f, g), 'some3')
  })

  it('toNullable', () => {
    assert.strictEqual(none.toNullable(), null)
    assert.strictEqual(some(1).toNullable(), 1)
  })

  it('toUndefined', () => {
    assert.strictEqual(none.toUndefined(), undefined)
    assert.strictEqual(some(1).toUndefined(), 1)
  })

  it('toString', () => {
    assert.strictEqual(none.toString(), 'none')
    assert.strictEqual(some(1).toString(), 'some(1)')
    assert.strictEqual(none.inspect(), 'none')
    assert.strictEqual(some(1).inspect(), 'some(1)')
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
    assert.deepEqual(option.map(some(2), f), some(4))
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
    assert.deepEqual(option.ap(some(f), some(2)), some(4))
    assert.deepEqual(some(f).ap_(some(2)), some(4))
    assert.deepEqual(none.ap_(some(2)), none)
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

  it('orElse', () => {
    assert.deepEqual(some(1).orElse(() => some(2)), some(1))
    assert.deepEqual(some(2).orElse(() => none), some(2))
    assert.deepEqual((none as Option<number>).orElse(() => some(1)), some(1))
    assert.deepEqual(none.orElse(() => none), none)
  })

  it('extend', () => {
    const f = (fa: Option<number>) => fa.getOrElse(0)
    assert.deepEqual(some(2).extend(f), some(2))
    assert.deepEqual(none.extend(f), none)
    assert.deepEqual(option.extend(some(2), f), some(2))
  })

  it('fromNullable', () => {
    assert.deepEqual(fromNullable(2), some(2))
    assert.deepEqual(fromNullable(null), none)
    assert.deepEqual(fromNullable(undefined), none)
  })

  it('fromPredicate', () => {
    const f = fromPredicate(p)
    assert.deepEqual(f(1), none)
    assert.deepEqual(f(3), some(3))

    type Direction = 'asc' | 'desc'
    const parseDirection = fromRefinement((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepEqual(parseDirection('asc'), some('asc'))
    assert.deepEqual(parseDirection('foo'), none)
  })

  it('traverse', () => {
    assert.deepEqual(option.traverse(array)(some('hello'), () => []), [])
    assert.deepEqual(option.traverse(array)(some('hello'), s => [s.length]), [some(5)])
    assert.deepEqual(option.traverse(array)(none, s => [s]), [none])
  })

  it('sequence', () => {
    assert.deepEqual(option.sequence(array)(some([1, 2])), [some(1), some(2)])
    assert.deepEqual(option.sequence(array)(none), [none])
  })

  it('reduce', () => {
    assert.strictEqual(none.reduce(2, (b, a) => b + a), 2)
    assert.strictEqual(some(3).reduce(2, (b, a) => b + a), 5)
  })

  it('foldMap', () => {
    const old = F.foldMap(option, monoidString)
    const foldMap = option.foldMap(monoidString)
    const x1 = some('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
    const x2: Option<string> = none
    assert.strictEqual(foldMap(x2, f1), '')
    assert.strictEqual(foldMap(x2, f1), old(x2, f1))
  })

  it('foldr', () => {
    const old = F.foldr(option)
    const foldr = option.foldr
    const x1 = some('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
    const x2: Option<string> = none
    assert.strictEqual(foldr(x2, init1, f1), '')
    assert.strictEqual(foldr(x2, init1, f1), old(x2, init1, f1))
  })

  it('getApplySemigroup', () => {
    const S = getApplySemigroup(semigroupSum)
    assert.deepEqual(S.concat(none, none), none)
    assert.deepEqual(S.concat(some(1), none), none)
    assert.deepEqual(S.concat(none, some(1)), none)
    assert.deepEqual(S.concat(some(1), some(2)), some(3))
  })

  it('getApplyMonoid', () => {
    const M = getApplyMonoid(monoidSum)
    assert.deepEqual(M.concat(M.empty, none), none)
    assert.deepEqual(M.concat(none, M.empty), none)
    assert.deepEqual(M.concat(M.empty, some(1)), some(1))
    assert.deepEqual(M.concat(some(1), M.empty), some(1))
  })

  it('getFirstMonoid', () => {
    const M = getFirstMonoid<number>()
    assert.deepEqual(M.concat(none, none), none)
    assert.deepEqual(M.concat(some(1), none), some(1))
    assert.deepEqual(M.concat(none, some(1)), some(1))
    assert.deepEqual(M.concat(some(1), some(2)), some(1))
  })

  it('getLastMonoid', () => {
    const M = getLastMonoid<number>()
    assert.deepEqual(M.concat(none, none), none)
    assert.deepEqual(M.concat(some(1), none), some(1))
    assert.deepEqual(M.concat(none, some(1)), some(1))
    assert.deepEqual(M.concat(some(1), some(2)), some(2))
  })

  it('contains', () => {
    const x: Option<number> = none
    assert.equal(x.contains(setoidNumber, 2), false)
    assert.equal(some(2).contains(setoidNumber, 2), true)
    assert.equal(some(2).contains(setoidNumber, 1), false)
  })

  it('isNone', () => {
    assert.equal(none.isNone(), true)
    assert.equal(some(1).isNone(), false)
    assert.equal(some(null).isNone(), false)
    assert.equal(isNone(none), true)
  })

  it('isSome', () => {
    assert.equal(none.isSome(), false)
    assert.equal(some(1).isSome(), true)
    assert.equal(some(null).isSome(), true)
    assert.equal(isSome(none), false)
  })

  it('exists', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2

    assert.equal(x.exists(is2), false)
    assert.equal(some(1).exists(is2), false)
    assert.equal(some(2).exists(is2), true)
  })

  it('refine', () => {
    const y: Option<number | string> = none
    const isString = (a: any): a is string => typeof a === 'string'
    assert.equal(y.refine(isString), y)
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

  it('compact', () => {
    assert.deepEqual(option.compact(none), none)
    assert.deepEqual(option.compact(some(none)), none)
    assert.deepEqual(option.compact(some(some('123'))), some('123'))
  })

  it('separate', () => {
    assert.deepEqual(option.separate(none), { left: none, right: none })
    assert.deepEqual(option.separate(some(left('123'))), { left: some('123'), right: none })
    assert.deepEqual(option.separate(some(right('123'))), { left: none, right: some('123') })
  })

  it('filter', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2
    assert.equal(x.filter(is2), x)
    assert.equal(option.filter(x, is2), x)
    assert.equal(some(1).filter(is2), none)
    assert.equal(option.filter(some(1), is2), none)
    const some2 = some(2)
    assert.equal(some2.filter(is2), some2)
    assert.equal(option.filter(some2, is2), some2)

    const y: Option<number | string> = none
    const isString = (a: any): a is string => typeof a === 'string'
    assert.equal(y.refine(isString), y)
    const some1 = some<number | string>(1)
    assert.equal(some1.refine(isString), none)
    const someHello = some<number | string>('hello')
    // explicitly type refinedOption as Option<string> to prove typings work
    // typing as Option<number> will cause typescript to error
    const refinedOption: Option<string> = someHello.refine(isString)
    assert.equal(refinedOption, someHello)
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepEqual(option.filterMap(none, f), none)
    assert.deepEqual(option.filterMap(some(1), f), none)
    assert.deepEqual(option.filterMap(some(3), f), some(4))
  })

  it('partition', () => {
    assert.deepEqual(option.partition(none, p), { left: none, right: none })
    assert.deepEqual(option.partition(some(1), p), { left: some(1), right: none })
    assert.deepEqual(option.partition(some(3), p), { left: none, right: some(3) })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(option.partitionMap(none, f), { left: none, right: none })
    assert.deepEqual(option.partitionMap(some(1), f), { left: some(0), right: none })
    assert.deepEqual(option.partitionMap(some(3), f), { left: none, right: some(4) })
  })

  it('wither', () => {
    const witherIdentity = option.wither(I)
    const f = (n: number) => new Identity(p(n) ? some(n + 1) : none)
    assert.deepEqual(witherIdentity(none, f), new Identity(none))
    assert.deepEqual(witherIdentity(some(1), f), new Identity(none))
    assert.deepEqual(witherIdentity(some(3), f), new Identity(some(4)))
  })

  it('wilt', () => {
    const wiltIdentity = option.wilt(I)
    const f = (n: number) => new Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(wiltIdentity(none, f), new Identity({ left: none, right: none }))
    assert.deepEqual(wiltIdentity(some(1), f), new Identity({ left: some(0), right: none }))
    assert.deepEqual(wiltIdentity(some(3), f), new Identity({ left: none, right: some(4) }))
  })

  it('getRefinement', () => {
    const f = (s: string | number): Option<string> => (typeof s === 'string' ? some(s) : none)
    const isString = getRefinement(f)
    assert.strictEqual(isString('s'), true)
    assert.strictEqual(isString(1), false)
    type A = { type: 'A' }
    type B = { type: 'B' }
    type C = A | B
    const isA = getRefinement<C, A>(c => (c.type === 'A' ? some(c) : none))
    assert.strictEqual(isA({ type: 'A' }), true)
    assert.strictEqual(isA({ type: 'B' }), false)
  })
})
