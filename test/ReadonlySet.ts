import { left, right } from '../src/Either'
import * as Eq from '../src/Eq'
import { pipe } from '../src/function'
import { none, some as optionSome } from '../src/Option'
import * as N from '../src/number'
import { getMonoid } from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlySet'
import * as S from '../src/string'
import { deepStrictEqual } from './util'
import { separated } from '../src/Separated'

const gte2 = (n: number) => n >= 2

interface Foo {
  readonly x: string
}
const foo = (x: string): Foo => ({ x })
const fooEq: Eq.Eq<Foo> = Eq.fromEquals((second: Foo) => (first: Foo) => first.x === second.x)

describe('ReadonlySet', () => {
  it('toReadonlyArray', () => {
    deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set()), [])
    deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set([1, 2, 3])), [1, 2, 3])
    deepStrictEqual(_.toReadonlyArray(N.Ord)(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('getEq', () => {
    const S = _.getEq(N.Eq)
    deepStrictEqual(S.equals(new Set([1, 2, 3]))(new Set([1, 2, 3])), true)
    deepStrictEqual(S.equals(new Set([1, 2, 3]))(new Set([1, 2])), false)
    deepStrictEqual(S.equals(new Set([1, 2]))(new Set([1, 2, 3])), false)
  })

  it('some', () => {
    deepStrictEqual(_.some((s: string) => s.trim() === '')(new Set<string>()), false)
    deepStrictEqual(_.some(gte2)(new Set([1, 2, 3])), true)
    deepStrictEqual(_.some(gte2)(new Set([1])), false)
  })

  it('map', () => {
    deepStrictEqual(_.map(N.Eq)((n: number) => n % 2)(new Set([])), new Set([]))
    deepStrictEqual(_.map(N.Eq)((n: number) => n % 2)(new Set([1, 2, 3, 4])), new Set([0, 1]))
    deepStrictEqual(_.map(S.Eq)((n: number) => `${n % 2}`)(new Set([1, 2, 3, 4])), new Set(['0', '1']))
  })

  it('every', () => {
    deepStrictEqual(_.every(gte2)(new Set([1, 2, 3])), false)
    deepStrictEqual(_.every(gte2)(new Set([2, 3])), true)
  })

  it('chain', () => {
    deepStrictEqual(_.chain(S.Eq)((n: number) => new Set([n.toString()]))(new Set([])), new Set([]))
    deepStrictEqual(_.chain(S.Eq)(() => new Set([]))(new Set([1, 2])), new Set([]))
    deepStrictEqual(
      _.chain(S.Eq)((n: number) => new Set([`${n}`, `${n + 1}`]))(new Set([1, 2])),
      new Set(['1', '2', '3'])
    )
  })

  it('isSubset', () => {
    deepStrictEqual(pipe(new Set([1, 2]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), true)
    deepStrictEqual(pipe(new Set([1, 2, 4]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), false)
  })

  it('filter', () => {
    deepStrictEqual(_.filter(gte2)(new Set([1, 2, 3])), new Set([2, 3]))

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.filter(isNumber)(new Set([1, 'a', 2]))
    deepStrictEqual(actual, new Set([1, 2]))
  })

  it('partition', () => {
    deepStrictEqual(_.partition(() => true)(new Set([])), separated(new Set([]), new Set([])))
    deepStrictEqual(_.partition(() => true)(new Set([1])), separated(new Set([]), new Set([1])))
    deepStrictEqual(_.partition(() => false)(new Set([1])), separated(new Set([1]), new Set([])))
    deepStrictEqual(
      _.partition((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4])),
      separated(new Set([1, 3]), new Set([2, 4]))
    )

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.partition(isNumber)(new Set([1, 'a', 2]))
    deepStrictEqual(actual, separated(new Set(['a']), new Set([1, 2])))
  })

  it('union', () => {
    deepStrictEqual(pipe(new Set([1, 2]), _.union(N.Eq)(new Set([1, 3]))), new Set([1, 2, 3]))
  })

  it('intersection', () => {
    deepStrictEqual(pipe(new Set([1, 2]), _.intersection(N.Eq)(new Set([1, 3]))), new Set([1]))
  })

  it('partitionMap', () => {
    deepStrictEqual(
      _.partitionMap(N.Eq, S.Eq)((n: number) => left(n))(new Set([])),
      separated(new Set([]), new Set([]))
    )
    deepStrictEqual(
      _.partitionMap(N.Eq, S.Eq)((n: number) => (n % 2 === 0 ? left(n) : right(`${n}`)))(new Set([1, 2, 3])),
      separated(new Set([2]), new Set(['1', '3']))
    )
    const SL = Eq.struct({ value: N.Eq })
    const SR = Eq.struct({ value: S.Eq })
    deepStrictEqual(
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
    deepStrictEqual(pipe(new Set([1, 2]), M.concat(new Set([1, 3]))), new Set([1, 2, 3]))
    deepStrictEqual(pipe(new Set([1, 2]), M.concat(M.empty)), new Set([1, 2]))
    deepStrictEqual(pipe(M.empty, M.concat(new Set([1, 3]))), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const S = _.getIntersectionSemigroup(N.Eq)
    deepStrictEqual(pipe(new Set([1, 2]), S.concat(new Set([1, 3]))), new Set([1]))
    deepStrictEqual(pipe(new Set([1, 2]), S.concat(_.empty)), _.empty)
    deepStrictEqual(pipe(_.empty, S.concat(new Set([1, 3]))), _.empty)
  })

  it('difference', () => {
    deepStrictEqual(pipe(new Set([1, 2]), _.difference(N.Eq)(new Set([1, 3]))), new Set([2]))
  })

  it('reduce', () => {
    deepStrictEqual(_.reduce(N.Ord)('', (b, a) => b + a)(new Set([1, 2, 3])), '123')
    deepStrictEqual(_.reduce(N.Ord)('', (b, a) => b + a)(new Set([3, 2, 1])), '123')
  })

  it('foldMap', () => {
    deepStrictEqual(_.foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([1, 2, 3])), [1, 2, 3])
    deepStrictEqual(_.foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('singleton', () => {
    deepStrictEqual(_.singleton(1), new Set([1]))
  })

  it('insert', () => {
    const x = new Set([1, 2])
    deepStrictEqual(_.insert(N.Eq)(3)(x), new Set([1, 2, 3]))
    // should return the same ference if the element is already a member
    deepStrictEqual(_.insert(N.Eq)(2)(x), x)
  })

  it('remove', () => {
    deepStrictEqual(_.remove(N.Eq)(3)(new Set([1, 2])), new Set([1, 2]))
    deepStrictEqual(_.remove(N.Eq)(1)(new Set([1, 2])), new Set([2]))
  })

  it('fromReadonlyArray', () => {
    deepStrictEqual(_.fromReadonlyArray(N.Eq)([]), new Set([]))
    deepStrictEqual(_.fromReadonlyArray(N.Eq)([1]), new Set([1]))
    deepStrictEqual(_.fromReadonlyArray(N.Eq)([1, 1]), new Set([1]))
    deepStrictEqual(_.fromReadonlyArray(N.Eq)([1, 2]), new Set([1, 2]))

    deepStrictEqual(_.fromReadonlyArray(fooEq)(['a', 'a', 'b'].map(foo)), new Set(['a', 'b'].map(foo)))
  })

  it('compact', () => {
    deepStrictEqual(_.compact(N.Eq)(new Set([optionSome(1), none, optionSome(2)])), new Set([1, 2]))
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    deepStrictEqual(
      _.compact(E)(new Set([optionSome({ id: 'a' }), none, optionSome({ id: 'a' })])),
      new Set([{ id: 'a' }])
    )
  })

  it('separate', () => {
    deepStrictEqual(
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
    deepStrictEqual(
      _.separate(
        SL,
        SR
      )(new Set([right({ id: 'a' }), left({ error: 'error' }), right({ id: 'a' }), left({ error: 'error' })])),
      separated(new Set([{ error: 'error' }]), new Set([{ id: 'a' }]))
    )
  })

  it('filterMap', () => {
    deepStrictEqual(
      _.filterMap(N.Eq)((s: string) => (s.length > 1 ? optionSome(s.length) : none))(new Set(['a', 'bb', 'ccc'])),
      new Set([2, 3])
    )
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    deepStrictEqual(
      _.filterMap(E)((x: { readonly id: string }) => optionSome(x))(new Set([{ id: 'a' }, { id: 'a' }])),
      new Set([{ id: 'a' }])
    )
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const s1 = new Set<string>([])
    deepStrictEqual(Sh.show(s1), `new Set([])`)
    const s2 = new Set<string>(['a'])
    deepStrictEqual(Sh.show(s2), `new Set(["a"])`)
    const s3 = new Set<string>(['a', 'b'])
    deepStrictEqual(Sh.show(s3), `new Set(["a", "b"])`)
  })

  it('isEmpty', () => {
    deepStrictEqual(_.isEmpty(_.empty), true)
    deepStrictEqual(_.isEmpty(new Set()), true)
    deepStrictEqual(_.isEmpty(new Set(['a'])), false)
  })

  it('size', () => {
    deepStrictEqual(_.size(_.empty), 0)
    deepStrictEqual(_.size(new Set()), 0)
    deepStrictEqual(_.size(new Set(['a'])), 1)
  })
})
