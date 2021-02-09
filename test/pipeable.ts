import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as C from '../src/Const'
import * as E from '../src/Either'
import { fold } from '../src/Monoid'
import * as O from '../src/Option'
import { pipeable } from '../src/pipeable'
import * as R from '../src/Reader'
import { pipe } from '../src/function'
import * as N from '../src/number'
import { separated } from '../src/Separated'
import * as assert from 'assert'

// tslint:disable: deprecation

describe('pipeable', () => {
  it('{}', () => {
    const r = pipeable<'{}', {}>({ URI: '{}' })
    U.deepStrictEqual(r, {})
  })

  it('Functor', () => {
    const { map } = pipeable(RA.Functor)
    U.deepStrictEqual(map((n: number) => n * 2)([1, 2, 3]), [2, 4, 6])
  })

  it('Contravariant', () => {
    const { contramap } = pipeable(C.Contravariant)
    U.deepStrictEqual(contramap((s: string) => s.length * 2)(C.make(1)), 1)
  })

  it('FunctorWithIndex', () => {
    const { mapWithIndex } = pipeable(RA.FunctorWithIndex)
    U.deepStrictEqual(mapWithIndex((i, n: number) => n * 2 + i)([1, 2, 3]), [2, 5, 8])
  })

  it('Apply', () => {
    const { ap, apFirst, apSecond } = pipeable(RA.Applicative)
    U.deepStrictEqual(ap([1, 2, 3])([(n) => n * 2]), [2, 4, 6])
    U.deepStrictEqual(apFirst([2])([1]), [1])
    U.deepStrictEqual(apSecond([2])([1]), [2])
  })

  it('Chain', () => {
    const { chain, chainFirst, flatten } = pipeable(RA.Monad)
    U.deepStrictEqual(chain((n: number) => [n * 2])([1, 2, 3]), [2, 4, 6])
    U.deepStrictEqual(chainFirst((n: number) => [n * 2])([1, 2, 3]), [1, 2, 3])
    U.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it('Bifunctor', () => {
    const { bimap, mapLeft } = pipeable(E.Bifunctor)
    U.deepStrictEqual(
      bimap(
        (s: string) => s.length,
        (n: number) => n * 2
      )(E.right(1)),
      E.right(2)
    )
    U.deepStrictEqual(
      bimap(
        (s: string) => s.length,
        (n: number) => n * 2
      )(E.left('aa')),
      E.left(2)
    )
    U.deepStrictEqual(mapLeft((s: string) => s.length)(E.right(1)), E.right(1))
    U.deepStrictEqual(mapLeft((s: string) => s.length)(E.left('aa')), E.left(2))
  })

  it('Extend', () => {
    const { extend, duplicate } = pipeable(RA.Extend)
    U.deepStrictEqual(extend((as: ReadonlyArray<number>) => fold(N.MonoidSum)(as))([1, 2, 3]), [6, 5, 3])
    U.deepStrictEqual(duplicate([1, 2, 3]), [[1, 2, 3], [2, 3], [3]])
  })

  it('Foldable', () => {
    const { reduce, foldMap, reduceRight } = pipeable(RA.Foldable)
    U.deepStrictEqual(reduce(0, (acc, n: number) => acc + n)([1, 2, 3]), 6)
    U.deepStrictEqual(foldMap(N.MonoidSum)((n: number) => n)([1, 2, 3]), 6)
    U.deepStrictEqual(reduceRight(0, (n: number, acc) => -acc + n)([1, 2, 3]), 2)
  })

  it('FoldableWithIndex', () => {
    const { reduceWithIndex, foldMapWithIndex, reduceRightWithIndex } = pipeable(RA.FoldableWithIndex)
    U.deepStrictEqual(reduceWithIndex(0, (i, acc, n: number) => acc + n + i)([1, 2, 3]), 9)
    U.deepStrictEqual(foldMapWithIndex(N.MonoidSum)((i, n: number) => n + i)([1, 2, 3]), 9)
    U.deepStrictEqual(reduceRightWithIndex(0, (i, n: number, acc) => -acc + n + i)([1, 2, 3]), 3)
  })

  it('Alt', () => {
    const { alt } = pipeable(RA.Alt)
    U.deepStrictEqual(alt(() => [4, 5, 6])([1, 2, 3]), [1, 2, 3, 4, 5, 6])
  })

  it('Filterable', () => {
    const { filter, filterMap, partition, partitionMap } = pipeable(RA.Filterable)
    U.deepStrictEqual(pipe([O.some(1), O.none, O.some(2)], filter(O.isSome)), [O.some(1), O.some(2)] as ReadonlyArray<
      O.Some<number>
    >)
    U.deepStrictEqual(filterMap(<A>(a: O.Option<A>) => a)([O.some(1), O.none, O.some(2)]), [1, 2])
    assert.deepStrictEqual(
      pipe([O.some(1), O.none, O.some(2)], partition(O.isSome)),
      separated([O.none], [O.some(1), O.some(2)])
    )
    U.deepStrictEqual(
      partitionMap((n: number) => (n > 2 ? E.right(n) : E.left(String(n))))([1, 2, 3]),
      separated(['1', '2'], [3])
    )
  })

  it('FilterableWithIndex', () => {
    const { filterWithIndex, filterMapWithIndex, partitionWithIndex, partitionMapWithIndex } = pipeable(
      RA.FilterableWithIndex
    )
    U.deepStrictEqual(
      filterWithIndex((i, a: O.Option<number>) => i > 1 && O.isSome(a))([O.some(1), O.none, O.some(2)]),
      [O.some(2)]
    )
    U.deepStrictEqual(
      filterMapWithIndex((i, a: O.Option<number>) =>
        pipe(
          a,
          O.map((n) => n + i)
        )
      )([O.some(1), O.none, O.some(2)]),
      [1, 4]
    )
    U.deepStrictEqual(
      partitionWithIndex((i, a: O.Option<number>) => i > 1 && O.isSome(a))([O.some(1), O.none, O.some(2)]),
      separated([O.some(1), O.none], [O.some(2)])
    )
    U.deepStrictEqual(
      partitionMapWithIndex((i, n: number) => (i < 2 && n > 1 ? E.right(n) : E.left(String(n))))([1, 2, 3]),
      separated(['1', '3'], [2])
    )
  })

  it('Profunctor', () => {
    const { promap } = pipeable(R.Profunctor)
    const f = promap(
      (s: string) => s + 'a',
      (n: number) => n > 2
    )((s: string) => s.length)
    U.deepStrictEqual(f('a'), false)
    U.deepStrictEqual(f('aa'), true)
  })

  it('Semigroupoid', () => {
    const { compose } = pipeable(R.Category)
    U.deepStrictEqual(compose((s: string) => s.length)((n) => n * 2)('aa'), 4)
  })

  it('MonadThrow', () => {
    const { fromEither, fromOption, fromPredicate, filterOrElse } = pipeable(E.MonadThrow)
    U.deepStrictEqual(fromEither(E.right(1)), E.right(1))
    U.deepStrictEqual(fromEither(E.left('a')), E.left('a'))
    U.deepStrictEqual(fromOption(() => 'none')(O.none), E.left('none'))
    U.deepStrictEqual(fromOption(() => 'none')(O.some(1)), E.right(1))
    const gt2 = fromPredicate(
      (n: number) => n >= 2,
      (n) => `Invalid number ${n}`
    )
    U.deepStrictEqual(gt2(3), E.right(3))
    U.deepStrictEqual(gt2(1), E.left('Invalid number 1'))
    const gt10 = (n: number): boolean => n > 10
    U.deepStrictEqual(
      pipe(
        E.right(12),
        filterOrElse(gt10, () => -1)
      ),
      E.right(12)
    )
    U.deepStrictEqual(
      pipe(
        E.right(7),
        filterOrElse(gt10, () => -1)
      ),
      E.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        E.left(12),
        filterOrElse(gt10, () => -1)
      ),
      E.left(12)
    )
    U.deepStrictEqual(
      pipe(
        E.right(7),
        filterOrElse(gt10, (n) => `invalid ${n}`)
      ),
      E.left('invalid 7')
    )
  })
})
