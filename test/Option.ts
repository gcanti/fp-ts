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
    assert.deepStrictEqual(some(2).map(f), some(4))
    assert.deepStrictEqual(none.map(f), none)
    assert.deepStrictEqual(option.map(some(2), f), some(4))
  })

  it('getSetoid', () => {
    const O = getSetoid(ordString)
    assert.deepStrictEqual(O.equals(none, none), true)
    assert.deepStrictEqual(O.equals(some('a'), none), false)
    assert.deepStrictEqual(O.equals(none, some('a')), false)
    assert.deepStrictEqual(O.equals(some('a'), some('a')), true)
    assert.deepStrictEqual(O.equals(some('a'), some('b')), false)
  })

  it('getOrd', () => {
    const O = getOrd(ordString)
    assert.deepStrictEqual(O.compare(none, none), 0)
    assert.deepStrictEqual(O.compare(some('a'), none), 1)
    assert.deepStrictEqual(O.compare(none, some('a')), -1)
    assert.deepStrictEqual(O.compare(some('a'), some('a')), 0)
    assert.deepStrictEqual(O.compare(some('a'), some('b')), -1)
    assert.deepStrictEqual(O.compare(some('b'), some('a')), 1)
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
    assert.deepStrictEqual(nestedOption.mapNullable(value => value.foo), none)
    assert.deepStrictEqual(nestedOption.mapNullable(value => value.foo2), some(nested.foo2))
    assert.deepStrictEqual(nestedOption.mapNullable(value => value.foo2.bar2), none)
    assert.deepStrictEqual(none.mapNullable(identity), none)
  })

  it('ap', () => {
    const f = (n: number) => n * 2
    assert.deepStrictEqual(some(2).ap(some(f)), some(4))
    assert.deepStrictEqual(none.ap(some(f)), none)
    assert.deepStrictEqual(some(2).ap(none), none)
    assert.deepStrictEqual(some(2).ap(some(f)), some(4))
    assert.deepStrictEqual(option.ap(some(f), some(2)), some(4))
    assert.deepStrictEqual(some(f).ap_(some(2)), some(4))
    assert.deepStrictEqual(none.ap_(some(2)), none)
  })

  it('chain', () => {
    const f = (n: number) => some(n * 2)
    const g = () => none
    assert.deepStrictEqual(some(2).chain(f), some(4))
    assert.deepStrictEqual(some(2).chain(g), none)
    assert.deepStrictEqual(none.chain(f), none)
  })

  it('getMonoid', () => {
    const { concat } = getMonoid(semigroupString)
    assert.deepStrictEqual(concat(none, none), none)
    assert.deepStrictEqual(concat(none, some('a')), some('a'))
    assert.deepStrictEqual(concat(some('a'), none), some('a'))
    assert.deepStrictEqual(concat(some('b'), some('a')), some('ba'))
    assert.deepStrictEqual(concat(some('a'), some('b')), some('ab'))
  })

  it('alt', () => {
    assert.deepStrictEqual(some(1).alt(some(2)), some(1))
    assert.deepStrictEqual(some(2).alt(none), some(2))
    assert.deepStrictEqual((none as Option<number>).alt(some(1)), some(1))
    assert.deepStrictEqual(none.alt(none), none)
  })

  it('orElse', () => {
    assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
    assert.deepStrictEqual(some(2).orElse(() => none), some(2))
    assert.deepStrictEqual((none as Option<number>).orElse(() => some(1)), some(1))
    assert.deepStrictEqual(none.orElse(() => none), none)
  })

  it('extend', () => {
    const f = (fa: Option<number>) => fa.getOrElse(0)
    assert.deepStrictEqual(some(2).extend(f), some(2))
    assert.deepStrictEqual(none.extend(f), none)
    assert.deepStrictEqual(option.extend(some(2), f), some(2))
  })

  it('fromNullable', () => {
    assert.deepStrictEqual(fromNullable(2), some(2))
    assert.deepStrictEqual(fromNullable(null), none)
    assert.deepStrictEqual(fromNullable(undefined), none)
  })

  it('fromPredicate', () => {
    const f = fromPredicate(p)
    assert.deepStrictEqual(f(1), none)
    assert.deepStrictEqual(f(3), some(3))

    type Direction = 'asc' | 'desc'
    // tslint:disable-next-line: deprecation
    const parseDirection = fromRefinement((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepStrictEqual(parseDirection('asc'), some('asc'))
    assert.deepStrictEqual(parseDirection('foo'), none)
  })

  it('traverse', () => {
    assert.deepStrictEqual(option.traverse(array)(some('hello'), () => []), [])
    assert.deepStrictEqual(option.traverse(array)(some('hello'), s => [s.length]), [some(5)])
    assert.deepStrictEqual(option.traverse(array)(none, s => [s]), [none])
  })

  it('sequence', () => {
    assert.deepStrictEqual(option.sequence(array)(some([1, 2])), [some(1), some(2)])
    assert.deepStrictEqual(option.sequence(array)(none), [none])
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
    assert.deepStrictEqual(S.concat(none, none), none)
    assert.deepStrictEqual(S.concat(some(1), none), none)
    assert.deepStrictEqual(S.concat(none, some(1)), none)
    assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
  })

  it('getApplyMonoid', () => {
    const M = getApplyMonoid(monoidSum)
    assert.deepStrictEqual(M.concat(M.empty, none), none)
    assert.deepStrictEqual(M.concat(none, M.empty), none)
    assert.deepStrictEqual(M.concat(M.empty, some(1)), some(1))
    assert.deepStrictEqual(M.concat(some(1), M.empty), some(1))
  })

  it('getFirstMonoid', () => {
    const M = getFirstMonoid<number>()
    assert.deepStrictEqual(M.concat(none, none), none)
    assert.deepStrictEqual(M.concat(some(1), none), some(1))
    assert.deepStrictEqual(M.concat(none, some(1)), some(1))
    assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
  })

  it('getLastMonoid', () => {
    const M = getLastMonoid<number>()
    assert.deepStrictEqual(M.concat(none, none), none)
    assert.deepStrictEqual(M.concat(some(1), none), some(1))
    assert.deepStrictEqual(M.concat(none, some(1)), some(1))
    assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
  })

  it('contains', () => {
    const x: Option<number> = none
    assert.deepStrictEqual(x.contains(setoidNumber, 2), false)
    assert.deepStrictEqual(some(2).contains(setoidNumber, 2), true)
    assert.deepStrictEqual(some(2).contains(setoidNumber, 1), false)
  })

  it('isNone', () => {
    assert.deepStrictEqual(none.isNone(), true)
    assert.deepStrictEqual(some(1).isNone(), false)
    assert.deepStrictEqual(some(null).isNone(), false)
    assert.deepStrictEqual(isNone(none), true)
  })

  it('isSome', () => {
    assert.deepStrictEqual(none.isSome(), false)
    assert.deepStrictEqual(some(1).isSome(), true)
    assert.deepStrictEqual(some(null).isSome(), true)
    assert.deepStrictEqual(isSome(none), false)
  })

  it('exists', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2

    assert.deepStrictEqual(x.exists(is2), false)
    assert.deepStrictEqual(some(1).exists(is2), false)
    assert.deepStrictEqual(some(2).exists(is2), true)
  })

  it('refine', () => {
    const y: Option<number | string> = none
    const isString = (a: any): a is string => typeof a === 'string'
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(y.refine(isString), y)
    const some1 = some<number | string>(1)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(some1.refine(isString), none)
    const someHello = some<number | string>('hello')
    // explicitly type refinedOption as Option<string> to prove typings work
    // typing as Option<number> will cause typescript to error
    // tslint:disable-next-line: deprecation
    const refinedOption: Option<string> = someHello.refine(isString)
    assert.deepStrictEqual(refinedOption, someHello)
  })

  it('tryCatch', () => {
    assert.deepStrictEqual(tryCatch(() => JSON.parse('2')), some(2))
    assert.deepStrictEqual(tryCatch(() => JSON.parse('(')), none)
  })

  it('fromEither', () => {
    assert.deepStrictEqual(fromEither(left('foo')), none)
    assert.deepStrictEqual(fromEither(right(1)), some(1))
  })

  it('toString', () => {
    assert.strictEqual(some(2).toString(), 'some(2)')
    assert.strictEqual(some({ a: 1 }).toString(), 'some({\n  "a": 1\n})')
  })

  it('fromRefinement', () => {
    type Direction = 'asc' | 'desc'
    // tslint:disable-next-line: deprecation
    const parseDirection = fromRefinement((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepStrictEqual(parseDirection('asc'), some('asc'))
    assert.deepStrictEqual(parseDirection('foo'), none)
  })

  it('compact', () => {
    assert.deepStrictEqual(option.compact(none), none)
    assert.deepStrictEqual(option.compact(some(none)), none)
    assert.deepStrictEqual(option.compact(some(some('123'))), some('123'))
  })

  it('separate', () => {
    assert.deepStrictEqual(option.separate(none), { left: none, right: none })
    assert.deepStrictEqual(option.separate(some(left('123'))), { left: some('123'), right: none })
    assert.deepStrictEqual(option.separate(some(right('123'))), { left: none, right: some('123') })
  })

  it('filter', () => {
    const x: Option<number> = none
    const is2 = (a: number) => a === 2
    assert.deepStrictEqual(x.filter(is2), x)
    assert.deepStrictEqual(option.filter(x, is2), x)
    assert.deepStrictEqual(some(1).filter(is2), none)
    assert.deepStrictEqual(option.filter(some(1), is2), none)
    const some2 = some(2)
    assert.deepStrictEqual(some2.filter(is2), some2)
    assert.deepStrictEqual(option.filter(some2, is2), some2)

    const y: Option<number | string> = none
    const isString = (a: any): a is string => typeof a === 'string'
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(y.refine(isString), y)
    const some1 = some<number | string>(1)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(some1.refine(isString), none)
    const someHello = some<number | string>('hello')
    // explicitly type refinedOption as Option<string> to prove typings work
    // typing as Option<number> will cause typescript to error
    // tslint:disable-next-line: deprecation
    const refinedOption: Option<string> = someHello.refine(isString)
    assert.deepStrictEqual(refinedOption, someHello)
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(option.filterMap(none, f), none)
    assert.deepStrictEqual(option.filterMap(some(1), f), none)
    assert.deepStrictEqual(option.filterMap(some(3), f), some(4))
  })

  it('partition', () => {
    assert.deepStrictEqual(option.partition(none, p), { left: none, right: none })
    assert.deepStrictEqual(option.partition(some(1), p), { left: some(1), right: none })
    assert.deepStrictEqual(option.partition(some(3), p), { left: none, right: some(3) })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(option.partitionMap(none, f), { left: none, right: none })
    assert.deepStrictEqual(option.partitionMap(some(1), f), { left: some(0), right: none })
    assert.deepStrictEqual(option.partitionMap(some(3), f), { left: none, right: some(4) })
  })

  it('wither', () => {
    const witherIdentity = option.wither(I)
    const f = (n: number) => new Identity(p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(witherIdentity(none, f), new Identity(none))
    assert.deepStrictEqual(witherIdentity(some(1), f), new Identity(none))
    assert.deepStrictEqual(witherIdentity(some(3), f), new Identity(some(4)))
  })

  it('wilt', () => {
    const wiltIdentity = option.wilt(I)
    const f = (n: number) => new Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity(none, f), new Identity({ left: none, right: none }))
    assert.deepStrictEqual(wiltIdentity(some(1), f), new Identity({ left: some(0), right: none }))
    assert.deepStrictEqual(wiltIdentity(some(3), f), new Identity({ left: none, right: some(4) }))
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
