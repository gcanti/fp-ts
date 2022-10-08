import { fail, succeed } from '../src/Result'
import * as Eq from '../src/Eq'
import { pipe } from '../src/Function'
import { none, some as optionSome } from '../src/Option'
import * as N from '../src/number'
import { getMonoid } from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlySet'
import * as S from '../src/string'
import * as U from './util'
import * as iterable from '../src/Iterable'

const gte2 = (n: number) => n >= 2

describe('ReadonlySet', () => {
  it('getEq', () => {
    const S = _.getEq(N.Eq)
    U.deepStrictEqual(S.equals(new Set([1, 2, 3]))(new Set([1, 2, 3])), true)
    U.deepStrictEqual(S.equals(new Set([1, 2, 3]))(new Set([1, 2])), false)
    U.deepStrictEqual(S.equals(new Set([1, 2]))(new Set([1, 2, 3])), false)
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

  it('flatMap', () => {
    U.deepStrictEqual(_.flatMap(S.Eq)((n: number) => new Set([n.toString()]))(new Set([])), new Set([]))
    U.deepStrictEqual(_.flatMap(S.Eq)(() => new Set([]))(new Set([1, 2])), new Set([]))
    U.deepStrictEqual(
      _.flatMap(S.Eq)((n: number) => new Set([`${n}`, `${n + 1}`]))(new Set([1, 2])),
      new Set(['1', '2', '3'])
    )
  })

  it('isSubset', () => {
    U.deepStrictEqual(pipe(new Set([1, 2]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), true)
    U.deepStrictEqual(pipe(new Set([1, 2, 4]), _.isSubset(N.Eq)(new Set([1, 2, 3]))), false)
  })

  it('filter', () => {
    U.deepStrictEqual(_.filter(gte2)(new Set([1, 2, 3])), new Set([2, 3] as const))

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.filter(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, new Set([1, 2]))
  })

  it('partition', () => {
    U.deepStrictEqual(_.partition(() => true)(new Set([])), [new Set([]), new Set([])])
    U.deepStrictEqual(_.partition(() => true)(new Set([1])), [new Set([]), new Set([1])])
    U.deepStrictEqual(_.partition(() => false)(new Set([1])), [new Set([1]), new Set([])])
    U.deepStrictEqual(_.partition((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4])), [
      new Set([1, 3] as const),
      new Set([2, 4] as const)
    ])

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = _.partition(isNumber)(new Set([1, 'a', 2]))
    U.deepStrictEqual(actual, [new Set(['a']), new Set([1, 2])])
  })

  it('partitionMap', () => {
    U.deepStrictEqual(_.partitionMap(N.Eq, S.Eq)((n: number) => fail(n))(new Set([])), [new Set([]), new Set([])])
    U.deepStrictEqual(
      _.partitionMap(N.Eq, S.Eq)((n: number) => (n % 2 === 0 ? fail(n) : succeed(`${n}`)))(new Set([1, 2, 3])),
      [new Set([2]), new Set(['1', '3'])]
    )
    const SL = Eq.struct({ value: N.Eq })
    const SR = Eq.struct({ value: S.Eq })
    U.deepStrictEqual(
      _.partitionMap(
        SL,
        SR
      )((x: { readonly value: number }) => (x.value % 2 === 0 ? fail({ value: 2 }) : succeed({ value: 'odd' })))(
        new Set([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }])
      ),
      [new Set([{ value: 2 }]), new Set([{ value: 'odd' }])]
    )
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(N.Eq)
    U.deepStrictEqual(pipe(new Set([1, 2]), M.combine(new Set([1, 3]))), new Set([1, 2, 3]))
    U.deepStrictEqual(pipe(new Set([1, 2]), M.combine(M.empty)), new Set([1, 2]))
    U.deepStrictEqual(pipe(M.empty, M.combine(new Set([1, 3]))), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const S = _.getIntersectionSemigroup(N.Eq)
    U.deepStrictEqual(pipe(new Set([1, 2]), S.combine(new Set([1, 3]))), new Set([1]))
    U.deepStrictEqual(pipe(new Set([1, 2]), S.combine(_.empty)), _.empty)
    U.deepStrictEqual(pipe(_.empty, S.combine(new Set([1, 3]))), _.empty)
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma(N.Eq)
    U.deepStrictEqual(pipe(new Set([1, 2]), M.combine(new Set([1, 3]))), new Set([2]))
  })

  it('reduce', () => {
    const f = iterable.reduce('', (b, a: number) => b + a)
    U.deepStrictEqual(pipe(new Set([1, 2, 3]), _.toIterable(N.Ord), f), '123')
    U.deepStrictEqual(pipe(new Set([3, 2, 1]), _.toIterable(N.Ord), f), '123')
  })

  it('foldMap', () => {
    const f = iterable.foldMap(getMonoid<number>())((a: number) => [a])
    U.deepStrictEqual(pipe(new Set([1, 2, 3]), _.toIterable(N.Ord), f), [1, 2, 3])
    U.deepStrictEqual(pipe(new Set([3, 2, 1]), _.toIterable(N.Ord), f), [1, 2, 3])
  })

  it('reduceRight', () => {
    const f = iterable.reduceRight('', (a: number, b) => b + a)

    U.deepStrictEqual(pipe(new Set([1, 2, 3]), _.toIterable(N.Ord), f), '321')
    U.deepStrictEqual(pipe(new Set([3, 2, 1]), _.toIterable(N.Ord), f), '321')
  })

  it('singleton', () => {
    U.deepStrictEqual(_.of(1), new Set([1]))
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

  describe('fromIterable', () => {
    it('should remove duplicated elements', () => {
      const fromIterable = _.fromIterable(N.Eq)
      U.deepStrictEqual(fromIterable([1]), new Set([1]))
      U.deepStrictEqual(fromIterable([1, 1]), new Set([1]))
      U.deepStrictEqual(fromIterable([1, 2]), new Set([1, 2]))
    })

    it('should `empty` if the iterable is empty', () => {
      const fromIterable = _.fromIterable(N.Eq)
      U.strictEqual(fromIterable([]), _.empty)
    })
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
    U.deepStrictEqual(_.separate(S.Eq, N.Eq)(new Set([succeed(1), fail('a'), succeed(2)])), [
      new Set(['a']),
      new Set([1, 2])
    ])
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
      )(new Set([succeed({ id: 'a' }), fail({ error: 'error' }), succeed({ id: 'a' }), fail({ error: 'error' })])),
      [new Set([{ error: 'error' }]), new Set([{ id: 'a' }])]
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
    const s3 = new Set<string>(['b', 'a'])
    U.deepStrictEqual(Sh.show(s3), `new Set(["a", "b"])`)
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty(new Set()), true)
    U.deepStrictEqual(_.isEmpty(new Set(['a'])), false)
  })

  it('size', () => {
    U.deepStrictEqual(_.size(_.empty), 0)
    U.deepStrictEqual(_.size(new Set()), 0)
    U.deepStrictEqual(_.size(new Set(['a'])), 1)
  })

  it('toggle', () => {
    U.deepStrictEqual(_.toggle(N.Eq)(1)(new Set([2])), new Set([1, 2]))
    U.deepStrictEqual(_.toggle(N.Eq)(1)(new Set([1, 2])), new Set([2]))
  })
})
