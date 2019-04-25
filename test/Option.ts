import * as assert from 'assert'
import { array } from '../src/Array'
import { left, right } from '../src/Either'
import * as O from '../src/Option'
import { ordString } from '../src/Ord'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidSum, monoidString } from '../src/Monoid'
import { showString } from '../src/Show'

const p = (n: number): boolean => n > 2

describe('Option', () => {
  it('fold', () => {
    const f = 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(O.fold(O.none, f, g), 'none')
    assert.strictEqual(O.fold(O.some('abc'), f, g), 'some3')
  })

  it('foldL', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    assert.strictEqual(O.foldL(O.none, f, g), 'none')
    assert.strictEqual(O.foldL(O.some('abc'), f, g), 'some3')
  })

  it('toNullable', () => {
    assert.strictEqual(O.toNullable(O.none), null)
    assert.strictEqual(O.toNullable(O.some(1)), 1)
  })

  it('toUndefined', () => {
    assert.strictEqual(O.toUndefined(O.none), undefined)
    assert.strictEqual(O.toUndefined(O.some(1)), 1)
  })

  it('getOrElse', () => {
    assert.strictEqual(O.getOrElse(O.some(1), 0), 1)
    assert.strictEqual(O.getOrElse(O.none, 0), 0)
  })

  it('getOrElseL', () => {
    assert.strictEqual(O.getOrElseL(O.some(1), () => 0), 1)
    assert.strictEqual(O.getOrElseL(O.none, () => 0), 0)
  })

  it('equals', () => {
    const { equals } = O.getSetoid(setoidNumber)
    assert.strictEqual(equals(O.none, O.none), true)
    assert.strictEqual(equals(O.none, O.some(1)), false)
    assert.strictEqual(equals(O.some(1), O.none), false)
    assert.strictEqual(equals(O.some(2), O.some(1)), false)
    assert.strictEqual(equals(O.some(1), O.some(2)), false)
    assert.strictEqual(equals(O.some(2), O.some(2)), true)
  })

  it('map', () => {
    const f = (n: number) => n * 2
    assert.deepStrictEqual(O.option.map(O.some(2), f), O.some(4))
    assert.deepStrictEqual(O.option.map(O.none, f), O.none)
  })

  it('getSetoid', () => {
    const S = O.getSetoid(ordString)
    assert.deepStrictEqual(S.equals(O.none, O.none), true)
    assert.deepStrictEqual(S.equals(O.some('a'), O.none), false)
    assert.deepStrictEqual(S.equals(O.none, O.some('a')), false)
    assert.deepStrictEqual(S.equals(O.some('a'), O.some('a')), true)
    assert.deepStrictEqual(S.equals(O.some('a'), O.some('b')), false)
  })

  it('getOrd', () => {
    const OS = O.getOrd(ordString)
    assert.deepStrictEqual(OS.compare(O.none, O.none), 0)
    assert.deepStrictEqual(OS.compare(O.some('a'), O.none), 1)
    assert.deepStrictEqual(OS.compare(O.none, O.some('a')), -1)
    assert.deepStrictEqual(OS.compare(O.some('a'), O.some('a')), 0)
    assert.deepStrictEqual(OS.compare(O.some('a'), O.some('b')), -1)
    assert.deepStrictEqual(OS.compare(O.some('b'), O.some('a')), 1)
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
    const nestedOption = O.some(nested)
    assert.deepStrictEqual(O.mapNullable(nestedOption, value => value.foo), O.none)
    assert.deepStrictEqual(O.mapNullable(nestedOption, value => value.foo2), O.some(nested.foo2))
    assert.deepStrictEqual(O.mapNullable(nestedOption, value => value.foo2.bar2), O.none)
    assert.deepStrictEqual(O.mapNullable(O.none, identity), O.none)
  })

  it('ap', () => {
    const f = (n: number) => n * 2
    assert.deepStrictEqual(O.option.ap(O.some(f), O.some(2)), O.some(4))
    assert.deepStrictEqual(O.option.ap(O.some(f), O.none), O.none)
    assert.deepStrictEqual(O.option.ap(O.none, O.some(2)), O.none)
    assert.deepStrictEqual(O.option.ap(O.none, O.none), O.none)
  })

  it('chain', () => {
    const f = (n: number) => O.some(n * 2)
    const g = () => O.none
    assert.deepStrictEqual(O.option.chain(O.some(1), f), O.some(2))
    assert.deepStrictEqual(O.option.chain(O.none, f), O.none)
    assert.deepStrictEqual(O.option.chain(O.some(1), g), O.none)
    assert.deepStrictEqual(O.option.chain(O.none, g), O.none)
  })

  it('getMonoid', () => {
    const { concat } = O.getMonoid(semigroupString)
    assert.deepStrictEqual(concat(O.none, O.none), O.none)
    assert.deepStrictEqual(concat(O.none, O.some('a')), O.some('a'))
    assert.deepStrictEqual(concat(O.some('a'), O.none), O.some('a'))
    assert.deepStrictEqual(concat(O.some('b'), O.some('a')), O.some('ba'))
    assert.deepStrictEqual(concat(O.some('a'), O.some('b')), O.some('ab'))
  })

  it('alt', () => {
    assert.deepStrictEqual(O.option.alt(O.some(1), O.some(2)), O.some(1))
    assert.deepStrictEqual(O.option.alt(O.some(1), O.none), O.some(1))
    assert.deepStrictEqual(O.option.alt(O.none, O.some(2)), O.some(2))
    assert.deepStrictEqual(O.option.alt(O.none, O.none), O.none)
  })

  it('orElse', () => {
    assert.deepStrictEqual(O.orElse(O.some(1), () => O.some(2)), O.some(1))
    assert.deepStrictEqual(O.orElse(O.some(2), () => O.none), O.some(2))
    assert.deepStrictEqual(O.orElse(O.none, () => O.some(1)), O.some(1))
    assert.deepStrictEqual(O.orElse(O.none, () => O.none), O.none)
  })

  it('extend', () => {
    const f = (fa: O.Option<number>) => O.getOrElse(fa, 0)
    assert.deepStrictEqual(O.option.extend(O.some(2), f), O.some(2))
    assert.deepStrictEqual(O.option.extend(O.none, f), O.none)
  })

  it('fromNullable', () => {
    assert.deepStrictEqual(O.fromNullable(2), O.some(2))
    assert.deepStrictEqual(O.fromNullable(null), O.none)
    assert.deepStrictEqual(O.fromNullable(undefined), O.none)
  })

  it('fromPredicate', () => {
    const f = O.fromPredicate(p)
    assert.deepStrictEqual(f(1), O.none)
    assert.deepStrictEqual(f(3), O.some(3))

    type Direction = 'asc' | 'desc'
    const parseDirection = O.fromPredicate((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepStrictEqual(parseDirection('asc'), O.some('asc'))
    assert.deepStrictEqual(parseDirection('foo'), O.none)
  })

  it('traverse', () => {
    assert.deepStrictEqual(O.option.traverse(array)(O.some('hello'), () => []), [])
    assert.deepStrictEqual(O.option.traverse(array)(O.some('hello'), s => [s.length]), [O.some(5)])
    assert.deepStrictEqual(O.option.traverse(array)(O.none, s => [s]), [O.none])
  })

  it('sequence', () => {
    assert.deepStrictEqual(O.option.sequence(array)(O.some([1, 2])), [O.some(1), O.some(2)])
    assert.deepStrictEqual(O.option.sequence(array)(O.none), [O.none])
  })

  it('reduce', () => {
    assert.strictEqual(O.option.reduce(O.none, 2, (b, a) => b + a), 2)
    assert.strictEqual(O.option.reduce(O.some(3), 2, (b, a) => b + a), 5)
  })

  it('foldMap', () => {
    const foldMap = O.option.foldMap(monoidString)
    const x1 = O.some('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    const x2: O.Option<string> = O.none
    assert.strictEqual(foldMap(x2, f1), '')
  })

  it('foldr', () => {
    const foldr = O.option.foldr
    const x1 = O.some('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    const x2: O.Option<string> = O.none
    assert.strictEqual(foldr(x2, init1, f1), '')
  })

  it('getApplySemigroup', () => {
    const S = O.getApplySemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(O.none, O.none), O.none)
    assert.deepStrictEqual(S.concat(O.some(1), O.none), O.none)
    assert.deepStrictEqual(S.concat(O.none, O.some(1)), O.none)
    assert.deepStrictEqual(S.concat(O.some(1), O.some(2)), O.some(3))
  })

  it('getApplyMonoid', () => {
    const M = O.getApplyMonoid(monoidSum)
    assert.deepStrictEqual(M.concat(M.empty, O.none), O.none)
    assert.deepStrictEqual(M.concat(O.none, M.empty), O.none)
    assert.deepStrictEqual(M.concat(M.empty, O.some(1)), O.some(1))
    assert.deepStrictEqual(M.concat(O.some(1), M.empty), O.some(1))
  })

  it('getFirstMonoid', () => {
    const M = O.getFirstMonoid<number>()
    assert.deepStrictEqual(M.concat(O.none, O.none), O.none)
    assert.deepStrictEqual(M.concat(O.some(1), O.none), O.some(1))
    assert.deepStrictEqual(M.concat(O.none, O.some(1)), O.some(1))
    assert.deepStrictEqual(M.concat(O.some(1), O.some(2)), O.some(1))
  })

  it('getLastMonoid', () => {
    const M = O.getLastMonoid<number>()
    assert.deepStrictEqual(M.concat(O.none, O.none), O.none)
    assert.deepStrictEqual(M.concat(O.some(1), O.none), O.some(1))
    assert.deepStrictEqual(M.concat(O.none, O.some(1)), O.some(1))
    assert.deepStrictEqual(M.concat(O.some(1), O.some(2)), O.some(2))
  })

  it('contains', () => {
    const contains = O.contains(setoidNumber)
    assert.deepStrictEqual(contains(O.none, 2), false)
    assert.deepStrictEqual(contains(O.some(2), 2), true)
    assert.deepStrictEqual(contains(O.some(2), 1), false)
  })

  it('isNone', () => {
    assert.deepStrictEqual(O.isNone(O.none), true)
    assert.deepStrictEqual(O.isNone(O.some(1)), false)
  })

  it('isSome', () => {
    assert.deepStrictEqual(O.isSome(O.none), false)
    assert.deepStrictEqual(O.isSome(O.some(1)), true)
  })

  it('exists', () => {
    const is2 = (a: number) => a === 2

    assert.deepStrictEqual(O.exists(O.none, is2), false)
    assert.deepStrictEqual(O.exists(O.some(1), is2), false)
    assert.deepStrictEqual(O.exists(O.some(2), is2), true)
  })

  it('tryCatch', () => {
    assert.deepStrictEqual(O.tryCatch(() => JSON.parse('2')), O.some(2))
    assert.deepStrictEqual(O.tryCatch(() => JSON.parse('(')), O.none)
  })

  it('fromEither', () => {
    assert.deepStrictEqual(O.fromEither(left('foo')), O.none)
    assert.deepStrictEqual(O.fromEither(right(1)), O.some(1))
  })

  it('compact', () => {
    assert.deepStrictEqual(O.option.compact(O.none), O.none)
    assert.deepStrictEqual(O.option.compact(O.some(O.none)), O.none)
    assert.deepStrictEqual(O.option.compact(O.some(O.some('123'))), O.some('123'))
  })

  it('separate', () => {
    assert.deepStrictEqual(O.option.separate(O.none), { left: O.none, right: O.none })
    assert.deepStrictEqual(O.option.separate(O.some(left('123'))), { left: O.some('123'), right: O.none })
    assert.deepStrictEqual(O.option.separate(O.some(right('123'))), { left: O.none, right: O.some('123') })
  })

  it('filter', () => {
    const is2 = (a: number) => a === 2
    assert.deepStrictEqual(O.option.filter(O.none, is2), O.none)
    assert.deepStrictEqual(O.option.filter(O.some(1), is2), O.none)
    assert.deepStrictEqual(O.option.filter(O.some(2), is2), O.some(2))
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
    assert.deepStrictEqual(O.option.filterMap(O.none, f), O.none)
    assert.deepStrictEqual(O.option.filterMap(O.some(1), f), O.none)
    assert.deepStrictEqual(O.option.filterMap(O.some(3), f), O.some(4))
  })

  it('partition', () => {
    assert.deepStrictEqual(O.option.partition(O.none, p), { left: O.none, right: O.none })
    assert.deepStrictEqual(O.option.partition(O.some(1), p), { left: O.some(1), right: O.none })
    assert.deepStrictEqual(O.option.partition(O.some(3), p), { left: O.none, right: O.some(3) })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(O.option.partitionMap(O.none, f), { left: O.none, right: O.none })
    assert.deepStrictEqual(O.option.partitionMap(O.some(1), f), { left: O.some(0), right: O.none })
    assert.deepStrictEqual(O.option.partitionMap(O.some(3), f), { left: O.none, right: O.some(4) })
  })

  it('wither', () => {
    const witherIdentity = O.option.wither(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? O.some(n + 1) : O.none)
    assert.deepStrictEqual(witherIdentity(O.none, f), I.identity.of(O.none))
    assert.deepStrictEqual(witherIdentity(O.some(1), f), I.identity.of(O.none))
    assert.deepStrictEqual(witherIdentity(O.some(3), f), I.identity.of(O.some(4)))
  })

  it('wilt', () => {
    const wiltIdentity = O.option.wilt(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity(O.none, f), I.identity.of({ left: O.none, right: O.none }))
    assert.deepStrictEqual(wiltIdentity(O.some(1), f), I.identity.of({ left: O.some(0), right: O.none }))
    assert.deepStrictEqual(wiltIdentity(O.some(3), f), I.identity.of({ left: O.none, right: O.some(4) }))
  })

  it('getRefinement', () => {
    const f = (s: string | number): O.Option<string> => (typeof s === 'string' ? O.some(s) : O.none)
    const isString = O.getRefinement(f)
    assert.strictEqual(isString('s'), true)
    assert.strictEqual(isString(1), false)
    type A = { type: 'A' }
    type B = { type: 'B' }
    type C = A | B
    const isA = O.getRefinement<C, A>(c => (c.type === 'A' ? O.some(c) : O.none))
    assert.strictEqual(isA({ type: 'A' }), true)
    assert.strictEqual(isA({ type: 'B' }), false)
  })

  it('getShow', () => {
    const S = O.getShow(showString)
    assert.strictEqual(S.show(O.some('a')), `some("a")`)
    assert.strictEqual(S.show(O.none), `none`)
  })
})
