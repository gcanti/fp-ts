import * as U from './util'
import { getMonoid } from '../src/Array'
import { left, right } from '../src/Either'
import * as Eq from '../src/Eq'
import { pipe } from '../src/function'
import { none, some as optionSome } from '../src/Option'
import {
  chain,
  compact,
  difference,
  empty,
  every,
  filter,
  filterMap,
  foldMap,
  fromArray,
  getEq,
  getIntersectionSemigroup,
  getShow,
  getUnionMonoid,
  insert,
  intersection,
  map,
  partition,
  partitionMap,
  reduce,
  remove,
  separate,
  singleton,
  some,
  subset,
  toArray,
  toggle,
  union
} from '../src/Set'
import * as S from '../src/string'
import * as N from '../src/number'
import { separated } from '../src/Separated'

const gte2 = (n: number) => n >= 2

interface Foo {
  readonly x: string
}
const foo = (x: string): Foo => ({ x })
const fooEq: Eq.Eq<Foo> = {
  equals: (a: Foo, b: Foo) => a.x === b.x
}

describe('Set', () => {
  it('toArray', () => {
    U.deepStrictEqual(toArray(N.Ord)(new Set()), [])
    U.deepStrictEqual(toArray(N.Ord)(new Set([1, 2, 3])), [1, 2, 3])
    U.deepStrictEqual(toArray(N.Ord)(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('getEq', () => {
    const E = getEq(N.Eq)
    U.deepStrictEqual(E.equals(new Set([1, 2, 3]), new Set([1, 2, 3])), true)
    U.deepStrictEqual(E.equals(new Set([1, 2, 3]), new Set([1, 2])), false)
    U.deepStrictEqual(E.equals(new Set([1, 2]), new Set([1, 2, 3])), false)
  })

  it('some', () => {
    U.deepStrictEqual(some((s: string) => s.trim() === '')(new Set<string>()), false)
    U.deepStrictEqual(some(gte2)(new Set([1, 2, 3])), true)
    U.deepStrictEqual(some(gte2)(new Set([1])), false)
  })

  it('map', () => {
    U.deepStrictEqual(map(N.Eq)((n: number) => n % 2)(new Set([])), new Set([]))
    U.deepStrictEqual(map(N.Eq)((n: number) => n % 2)(new Set([1, 2, 3, 4])), new Set([0, 1]))
    U.deepStrictEqual(map(S.Eq)((n: number) => `${n % 2}`)(new Set([1, 2, 3, 4])), new Set(['0', '1']))
  })

  it('every', () => {
    U.deepStrictEqual(every(gte2)(new Set([1, 2, 3])), false)
    U.deepStrictEqual(every(gte2)(new Set([2, 3])), true)
  })

  it('chain', () => {
    U.deepStrictEqual(chain(S.Eq)((n: number) => new Set([n.toString()]))(new Set([])), new Set([]))
    U.deepStrictEqual(chain(S.Eq)(() => new Set([]))(new Set([1, 2])), new Set([]))
    U.deepStrictEqual(
      chain(S.Eq)((n: number) => new Set([`${n}`, `${n + 1}`]))(new Set([1, 2])),
      new Set(['1', '2', '3'])
    )
  })

  it('subset', () => {
    U.deepStrictEqual(subset(N.Eq)(new Set([1, 2]), new Set([1, 2, 3])), true)
    U.deepStrictEqual(subset(N.Eq)(new Set([1, 2, 4]), new Set([1, 2, 3])), false)

    U.deepStrictEqual(pipe(new Set([1, 2]), subset(N.Eq)(new Set([1, 2, 3]))), true)
    U.deepStrictEqual(pipe(new Set([1, 2, 4]), subset(N.Eq)(new Set([1, 2, 3]))), false)
  })

  it('filter', () => {
    U.deepStrictEqual(filter(gte2)(new Set([1, 2, 3])), new Set([2, 3]))

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = filter(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, new Set([1, 2]))
  })

  it('partition', () => {
    U.deepStrictEqual(partition(() => true)(new Set([])), separated(new Set([]), new Set([])))
    U.deepStrictEqual(partition(() => true)(new Set([1])), separated(new Set([]), new Set([1])))
    U.deepStrictEqual(partition(() => false)(new Set([1])), separated(new Set([1]), new Set([])))
    U.deepStrictEqual(
      partition((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4])),
      separated(new Set([1, 3]), new Set([2, 4]))
    )

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = partition(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, separated(new Set(['a']), new Set([1, 2])))
  })

  it('union', () => {
    U.deepStrictEqual(union(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))

    U.deepStrictEqual(pipe(new Set([1, 2]), union(N.Eq)(new Set([1, 3]))), new Set([1, 2, 3]))
  })

  it('intersection', () => {
    U.deepStrictEqual(intersection(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([1]))

    U.deepStrictEqual(pipe(new Set([1, 2]), intersection(N.Eq)(new Set([1, 3]))), new Set([1]))
  })

  it('partitionMap', () => {
    U.deepStrictEqual(
      partitionMap(N.Eq, S.Eq)((n: number) => left(n))(new Set([])),
      separated(new Set([]), new Set([]))
    )
    U.deepStrictEqual(
      partitionMap(N.Eq, S.Eq)((n: number) => (n % 2 === 0 ? left(n) : right(`${n}`)))(new Set([1, 2, 3])),
      separated(new Set([2]), new Set(['1', '3']))
    )
    const SL = Eq.getStructEq({ value: N.Eq })
    const SR = Eq.getStructEq({ value: S.Eq })
    U.deepStrictEqual(
      partitionMap(
        SL,
        SR
      )((x: { readonly value: number }) => (x.value % 2 === 0 ? left({ value: 2 }) : right({ value: 'odd' })))(
        new Set([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }])
      ),
      separated(new Set([{ value: 2 }]), new Set([{ value: 'odd' }]))
    )
  })

  it('getUnionMonoid', () => {
    const M = getUnionMonoid(N.Eq)
    U.deepStrictEqual(M.concat(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
    U.deepStrictEqual(M.concat(new Set([1, 2]), M.empty), new Set([1, 2]))
    U.deepStrictEqual(M.concat(M.empty, new Set([1, 3])), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const IS = getIntersectionSemigroup(N.Eq)
    U.deepStrictEqual(IS.concat(new Set([1, 2]), new Set([1, 3])), new Set([1]))
    U.deepStrictEqual(IS.concat(new Set([1, 2]), empty), empty)
    U.deepStrictEqual(IS.concat(empty, new Set([1, 3])), empty)
  })

  it('difference', () => {
    U.deepStrictEqual(difference(N.Eq)(new Set([1, 2]), new Set([1, 3])), new Set([2]))

    U.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
  })

  it('reduce', () => {
    U.deepStrictEqual(reduce(N.Ord)('', (b, a) => b + a)(new Set([1, 2, 3])), '123')
    U.deepStrictEqual(reduce(N.Ord)('', (b, a) => b + a)(new Set([3, 2, 1])), '123')
  })

  it('foldMap', () => {
    U.deepStrictEqual(foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([1, 2, 3])), [1, 2, 3])
    U.deepStrictEqual(foldMap(N.Ord, getMonoid<number>())((a) => [a])(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('singleton', () => {
    U.deepStrictEqual(singleton(1), new Set([1]))
  })

  it('insert', () => {
    const x = new Set([1, 2])
    U.deepStrictEqual(insert(N.Eq)(3)(x), new Set([1, 2, 3]))
    // should return the same ference if the element is already a member
    U.deepStrictEqual(insert(N.Eq)(2)(x), x)
  })

  it('remove', () => {
    U.deepStrictEqual(remove(N.Eq)(3)(new Set([1, 2])), new Set([1, 2]))
    U.deepStrictEqual(remove(N.Eq)(1)(new Set([1, 2])), new Set([2]))
  })

  it('toggle', () => {
    U.deepStrictEqual(toggle(N.Eq)(1)(new Set([2])), new Set([1, 2]))
    U.deepStrictEqual(toggle(N.Eq)(1)(new Set([1, 2])), new Set([2]))
  })

  it('fromArray', () => {
    U.deepStrictEqual(fromArray(N.Eq)([]), new Set([]))
    U.deepStrictEqual(fromArray(N.Eq)([1]), new Set([1]))
    U.deepStrictEqual(fromArray(N.Eq)([1, 1]), new Set([1]))
    U.deepStrictEqual(fromArray(N.Eq)([1, 2]), new Set([1, 2]))

    U.deepStrictEqual(fromArray(fooEq)(['a', 'a', 'b'].map(foo)), new Set(['a', 'b'].map(foo)))
  })

  it('compact', () => {
    U.deepStrictEqual(compact(N.Eq)(new Set([optionSome(1), none, optionSome(2)])), new Set([1, 2]))
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    U.deepStrictEqual(
      compact(E)(new Set([optionSome({ id: 'a' }), none, optionSome({ id: 'a' })])),
      new Set([{ id: 'a' }])
    )
  })

  it('separate', () => {
    U.deepStrictEqual(
      separate(S.Eq, N.Eq)(new Set([right(1), left('a'), right(2)])),
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
      separate(
        SL,
        SR
      )(new Set([right({ id: 'a' }), left({ error: 'error' }), right({ id: 'a' }), left({ error: 'error' })])),
      separated(new Set([{ error: 'error' }]), new Set([{ id: 'a' }]))
    )
  })

  it('filterMap', () => {
    U.deepStrictEqual(
      filterMap(N.Eq)((s: string) => (s.length > 1 ? optionSome(s.length) : none))(new Set(['a', 'bb', 'ccc'])),
      new Set([2, 3])
    )
    type R = { readonly id: string }
    const E: Eq.Eq<R> = pipe(
      S.Eq,
      Eq.contramap((x) => x.id)
    )
    U.deepStrictEqual(
      filterMap(E)((x: { readonly id: string }) => optionSome(x))(new Set([{ id: 'a' }, { id: 'a' }])),
      new Set([{ id: 'a' }])
    )
  })

  it('getShow', () => {
    const Sh = getShow(S.Show)
    const s1 = new Set<string>([])
    U.deepStrictEqual(Sh.show(s1), `new Set([])`)
    const s2 = new Set<string>(['a'])
    U.deepStrictEqual(Sh.show(s2), `new Set(["a"])`)
    const s3 = new Set<string>(['a', 'b'])
    U.deepStrictEqual(Sh.show(s3), `new Set(["a", "b"])`)
  })
})
