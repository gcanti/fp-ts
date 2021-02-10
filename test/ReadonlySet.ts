import * as assert from 'assert'
import { getMonoid } from '../src/Array'
import { left, right } from '../src/Either'
import * as Eq from '../src/Eq'
import { pipe } from '../src/function'
import { none, some as optionSome } from '../src/Option'
import * as _ from '../src/ReadonlySet'
import * as S from '../src/string'
import * as N from '../src/number'
import * as U from './util'
import { separated } from '../src/Separated'

const gte2 = (n: number) => n >= 2

interface Foo {
  readonly x: string
}
const foo = (x: string): Foo => ({ x })
const fooEq: Eq.Eq<Foo> = {
  equals: (a: Foo, b: Foo) => a.x === b.x
}

describe('ReadonlySet', () => {
  it('toReadonlyArray', () => {
    U.deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set()), [])
    U.deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set([1, 2, 3])), [1, 2, 3])
    U.deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('getEq', () => {
    const E = _.getEq(N.Eq)
    U.deepStrictEqual(E.equals(new Set([1, 2, 3]), new Set([1, 2, 3])), true)
    U.deepStrictEqual(E.equals(new Set([1, 2, 3]), new Set([1, 2])), false)
    U.deepStrictEqual(E.equals(new Set([1, 2]), new Set([1, 2, 3])), false)
  })

  it('some', () => {
    U.deepStrictEqual(_.some((s: string) => s.trim() === '')(new Set<string>()), false)
    U.deepStrictEqual(_.some(gte2)(new Set([1, 2, 3])), true)
    U.deepStrictEqual(_.some(gte2)(new Set([1])), false)
  })

  it('map', () => {
    U.deepStrictEqual(_.map(N.Eq)((n: number) => n % 2)(new Set([])), new Set([]))
    U.deepStrictEqual(_.map(N.Eq)((n: number) => n % 2)(new Set([1, 2, 3, 4])), new Set([0, 1]))
    U.deepStrictEqual(_.map(S.Eq)((n: number) => `${n % 2}`)(new Set([1, 2, 3, 4])), new Set(['0', '1']))
  })

  it('every', () => {
    U.deepStrictEqual(_.every(gte2)(new Set([1, 2, 3])), false)
    U.deepStrictEqual(_.every(gte2)(new Set([2, 3])), true)
  })

  it('chain', () => {
    U.deepStrictEqual(_.chain(S.Eq)((n: number) => new Set([n.toString()]))(new Set([])), new Set([]))
    U.deepStrictEqual(_.chain(S.Eq)(() => new Set([]))(new Set([1, 2])), new Set([]))
    U.deepStrictEqual(
      _.chain(S.Eq)((n: number) => new Set([`${n}`, `${n + 1}`]))(new Set([1, 2])),
      new Set(['1', '2', '3'])
    )
  })

  it('isSubset', () => {
    U.deepStrictEqual(_.isSubset(N.Eq)(new Set([1, 2]), new Set([1, 2, 3])), true)
    U.deepStrictEqual(_.isSubset(N.Eq)(new Set([1, 2, 4]), new Set([1, 2, 3])), false)

    U.deepStrictEqual(pipe(new Set([1, 2]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), true)
    U.deepStrictEqual(pipe(new Set([1, 2, 4]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), false)
  })

  it('filter', () => {
    U.deepStrictEqual(_.filter(gte2)(new Set([1, 2, 3])), new Set([2, 3]))

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.filter(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, new Set([1, 2]))
  })

  it('partition', () => {
    U.deepStrictEqual(_.partition(() => true)(new Set([])), separated(new Set([]), new Set([])))
    U.deepStrictEqual(_.partition(() => true)(new Set([1])), separated(new Set([]), new Set([1])))
    U.deepStrictEqual(_.partition(() => false)(new Set([1])), separated(new Set([1]), new Set([])))
    U.deepStrictEqual(
      _.partition((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4])),
      separated(new Set([1, 3]), new Set([2, 4]))
    )

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.partition(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, separated(new Set(['a']), new Set([1, 2])))
  })

  it('union', () => {
    U.deepStrictEqual(_.union(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))

    U.deepStrictEqual(pipe(new Set([1, 2]), _.union(N.Eq)(new Set([1, 3]))), new Set([1, 2, 3]))
  })

  it('intersection', () => {
    U.deepStrictEqual(_.intersection(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([1]))

    U.deepStrictEqual(pipe(new Set([1, 2]), _.intersection(N.Eq)(new Set([1, 3]))), new Set([1]))
  })

  it('partitionMap', () => {
    U.deepStrictEqual(
      _.partitionMap(N.Eq, S.Eq)((n: number) => left(n))(new Set([])),
      separated(new Set([]), new Set([]))
    )
    U.deepStrictEqual(
      _.partitionMap(N.Eq, S.Eq)((n: number) => (n % 2 === 0 ? left(n) : right(`${n}`)))(new Set([1, 2, 3])),
      separated(new Set([2]), new Set(['1', '3']))
    )
    const SL = Eq.struct({ value: N.Eq })
    const SR = Eq.struct({ value: S.Eq })
    U.deepStrictEqual(
      _.partitionMap(
        SL,
        SR
      )((x: { readonly value: number }) => (x.value % 2 === 0 ? left({ value: 2 }) : right({ value: 'odd' })))(
        new Set([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }])
      ),
      separated(new Set([{ value: 2 }]), new Set([{ value: 'odd' }]))
    )
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(N.Eq)
    U.deepStrictEqual(M.concat(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
    U.deepStrictEqual(M.concat(new Set([1, 2]), M.empty), new Set([1, 2]))
    U.deepStrictEqual(M.concat(M.empty, new Set([1, 3])), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const IS = _.getIntersectionSemigroup(N.Eq)
    U.deepStrictEqual(IS.concat(new Set([1, 2]), new Set([1, 3])), new Set([1]))
    U.deepStrictEqual(IS.concat(new Set([1, 2]), _.empty), _.empty)
    U.deepStrictEqual(IS.concat(_.empty, new Set([1, 3])), _.empty)
  })

  it('difference', () => {
    U.deepStrictEqual(_.difference(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([2]))

    U.deepStrictEqual(pipe(new Set([1, 2]), _.difference(N.Eq)(new Set([1, 3]))), new Set([2]))
  })

  it('reduce', () => {
    U.deepStrictEqual(_.reduce(N.Ord)('', (b, a) => b + a)(new Set([1, 2, 3])), '123')
    U.deepStrictEqual(_.reduce(N.Ord)('', (b, a) => b + a)(new Set([3, 2, 1])), '123')
  })

  it('foldMap', () => {
    U.deepStrictEqual(_.foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([1, 2, 3])), [1, 2, 3])
    U.deepStrictEqual(_.foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton(1), new Set([1]))
  })

  it('insert', () => {
    const x = new Set([1, 2])
    U.deepStrictEqual(_.insert(N.Eq)(3)(x), new Set([1, 2, 3]))
    // should return the same ference if the element is already a member
    U.deepStrictEqual(_.insert(N.Eq)(2)(x), x)
  })

  it('remove', () => {
    U.deepStrictEqual(_.remove(N.Eq)(3)(new Set([1, 2])), new Set([1, 2]))
    U.deepStrictEqual(_.remove(N.Eq)(1)(new Set([1, 2])), new Set([2]))
  })

  it('fromArray', () => {
    U.deepStrictEqual(_.fromArray(N.Eq)([]), new Set([]))
    U.deepStrictEqual(_.fromArray(N.Eq)([1]), new Set([1]))
    U.deepStrictEqual(_.fromArray(N.Eq)([1, 1]), new Set([1]))
    U.deepStrictEqual(_.fromArray(N.Eq)([1, 2]), new Set([1, 2]))

    U.deepStrictEqual(_.fromArray(fooEq)(['a', 'a', 'b'].map(foo)), new Set(['a', 'b'].map(foo)))
  })

  it('compact', () => {
    U.deepStrictEqual(_.compact(N.Eq)(new Set([optionSome(1), none, optionSome(2)])), new Set([1, 2]))
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    U.deepStrictEqual(
      _.compact(E)(new Set([optionSome({ id: 'a' }), none, optionSome({ id: 'a' })])),
      new Set([{ id: 'a' }])
    )
  })

  it('separate', () => {
    U.deepStrictEqual(
      _.separate(S.Eq, N.Eq)(new Set([right(1), left('a'), right(2)])),
      separated(new Set(['a']), new Set([1, 2]))
    )
    type L = { readonly error: string }
    type R = { readonly id: string }
    const SL: Eq.Eq<L> = pipe(
      S.Eq,
      Eq.contramap((x) => x.error)
    )
    const SR: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    U.deepStrictEqual(
      _.separate(
        SL,
        SR
      )(new Set([right({ id: 'a' }), left({ error: 'error' }), right({ id: 'a' }), left({ error: 'error' })])),
      separated(new Set([{ error: 'error' }]), new Set([{ id: 'a' }]))
    )
  })

  it('filterMap', () => {
    U.deepStrictEqual(
      _.filterMap(N.Eq)((s: string) => (s.length > 1 ? optionSome(s.length) : none))(new Set(['a', 'bb', 'ccc'])),
      new Set([2, 3])
    )
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    U.deepStrictEqual(
      _.filterMap(E)((x: { readonly id: string }) => optionSome(x))(new Set([{ id: 'a' }, { id: 'a' }])),
      new Set([{ id: 'a' }])
    )
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const s1 = new Set<string>([])
    U.deepStrictEqual(Sh.show(s1), `new Set([])`)
    const s2 = new Set<string>(['a'])
    U.deepStrictEqual(Sh.show(s2), `new Set(["a"])`)
    const s3 = new Set<string>(['a', 'b'])
    U.deepStrictEqual(Sh.show(s3), `new Set(["a", "b"])`)
  })

  it('fromSet', () => {
    const as = new Set(['a'])
    const bs = _.fromSet(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toSet', () => {
    const as: ReadonlySet<string> = new Set(['a'])
    const bs = _.toSet(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })
})
