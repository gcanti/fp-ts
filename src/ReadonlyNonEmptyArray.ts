/**
 * Data structure which represents readonly non-empty arrays.
 *
 * @since 3.0.0
 */
import { Alt1 } from './Alt'
import { Applicative as ApplicativeHKT, Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { Comonad1 } from './Comonad'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { flow, identity, Lazy, pipe, Predicate, Refinement, tuple } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1, tupled as tupled_ } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import * as O from './Option'
import { Ord } from './Ord'
import { Pointed1 } from './Pointed'
import { ReadonlyRecord } from './ReadonlyRecord'
import * as Se from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'

import Semigroup = Se.Semigroup
import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}

/**
 * @internal
 */
export const empty: ReadonlyArray<never> = []

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category guards
 * @since 3.0.0
 */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A> => as.length > 0

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], cons(1)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 3.0.0
 */
export const cons = <A>(head: A) => (tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A> => [head, ...tail]

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], snoc(4)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 3.0.0
 */
export const snoc = <A>(end: A) => (init: ReadonlyArray<A>): ReadonlyNonEmptyArray<A> => concat(init, [end])

/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromReadonlyArray = <A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
  isNonEmpty(as) ? O.some(as) : O.none

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any.
 *
 * @example
 * import { uncons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(uncons([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 3.0.0
 */
export const uncons = <A>(as: ReadonlyNonEmptyArray<A>): readonly [A, ReadonlyArray<A>] => [head(as), tail(as)]

/**
 * Produces a couple of a copy of the array without its last element, and that last element.
 *
 * @example
 * import { unsnoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 3.0.0
 */
export const unsnoc = <A>(as: ReadonlyNonEmptyArray<A>): readonly [ReadonlyArray<A>, A] => [init(as), last(as)]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyArray<A>): ReadonlyArray<A> {
  return fx.concat(fy)
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => [
  last(as),
  ...as.slice(0, -1).reverse()
]

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { group } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [
 *   [1],
 *   [2],
 *   [1, 1]
 * ])
 *
 * @category combinators
 * @since 3.0.0
 */
export const group = <B>(E: Eq<B>) => <A extends B>(
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>> =>
  pipe(
    as,
    chop((as) => {
      const h = head(as)
      const out: NonEmptyArray<A> = [h]
      let i = 1
      for (; i < as.length; i++) {
        const a = as[i]
        if (E.equals(h)(a)) {
          out.push(a)
        } else {
          break
        }
      }
      return [out, as.slice(i)]
    })
  )

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { groupSort } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [[1, 1, 1], [2]])
 *
 * @category combinators
 * @since 3.0.0
 */
export const groupSort = <B>(
  O: Ord<B>
): (<A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) =>
  flow(sort(O), group(O))

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': ['foo', 'bar'],
 *   '6': ['foobar']
 * })
 *
 * @category combinators
 * @since 3.0.0
 */
export const groupBy = <A>(f: (a: A) => string) => (
  as: ReadonlyArray<A>
): ReadonlyRecord<string, ReadonlyNonEmptyArray<A>> => {
  const out: Record<string, [A, ...Array<A>]> = {}
  for (const a of as) {
    const k = f(a)
    if (Object.prototype.hasOwnProperty.call(out, k)) {
      out[k].push(a)
    } else {
      out[k] = [a]
    }
  }
  return out
}

/**
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const sort = <B>(O: Ord<B>) => <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> =>
  as.length === 1 ? as : (as.slice().sort((first, second) => O.compare(second)(first)) as any)

interface NonEmptyArray<A> extends Array<A> {
  // tslint:disable-next-line: readonly-keyword
  0: A
}

const toNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [head(as), ...tail(as)]

/**
 * @internal
 */
export const unsafeUpdateAt = <A>(i: number, a: A, as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
  if (as[i] === a) {
    return as
  } else {
    const xs = toNonEmptyArray(as)
    xs[i] = a
    return xs
  }
}

/**
 * @internal
 */
export const isOutOfBound = <A>(i: number, as: ReadonlyArray<A>): boolean => i < 0 || i >= as.length

/**
 * Change the element at the specified index, creating a new `ReadonlyNonEmptyArray`, or returning `None` if the index is out of bounds.
 *
 * @since 3.0.0
 */
export const updateAt = <A>(i: number, a: A) => (as: ReadonlyNonEmptyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
  isOutOfBound(i, as) ? O.none : O.some(unsafeUpdateAt(i, a, as))

/**
 * Apply a function to the element at the specified index, creating a new `ReadonlyNonEmptyArray`, or returning `None` if the index is out
 * of bounds.
 *
 * @since 3.0.0
 */
export const modifyAt = <A>(i: number, f: (a: A) => A) => (
  as: ReadonlyNonEmptyArray<A>
): Option<ReadonlyNonEmptyArray<A>> => (isOutOfBound(i, as) ? O.none : O.some(unsafeUpdateAt(i, f(as[i]), as)))

/**
 * @since 3.0.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
export function filter<A>(predicate: Predicate<A>): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return filterWithIndex((_, a) => predicate(a))
}

/**
 * @since 3.0.0
 */
export const filterWithIndex = <A>(predicate: (i: number, a: A) => boolean) => (
  as: ReadonlyNonEmptyArray<A>
): Option<ReadonlyNonEmptyArray<A>> => fromReadonlyArray(as.filter((a, i) => predicate(i, a)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const zipWith = <B, A, C>(bs: ReadonlyNonEmptyArray<B>, f: (a: A, b: B) => C) => (
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<C> => {
  const cs: NonEmptyArray<C> = [f(as[0], bs[0])]
  const len = Math.min(as.length, bs.length)
  for (let i = 1; i < len; i++) {
    cs[i] = f(as[i], bs[i])
  }
  return cs
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const zip = <B>(bs: ReadonlyNonEmptyArray<B>) => <A>(
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<readonly [A, B]> => pipe(as, zipWith(bs, tuple))

/**
 * @since 3.0.0
 */
export const unzip = <A, B>(
  abs: ReadonlyNonEmptyArray<readonly [A, B]>
): readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>] => {
  const fa: NonEmptyArray<A> = [abs[0][0]]
  const fb: NonEmptyArray<B> = [abs[0][1]]
  for (let i = 1; i < abs.length; i++) {
    fa[i] = abs[i][0]
    fb[i] = abs[i][1]
  }
  return [fa, fb]
}

/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export const prependAll = <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
  const out: NonEmptyArray<A> = [middle, as[0]]
  for (let i = 1; i < as.length; i++) {
    out.push(middle, as[i])
  }
  return out
}

/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export const intersperse = <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
  const rest = tail(as)
  return isNonEmpty(rest) ? cons(as[0])(prependAll(middle)(rest)) : as
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const foldMapWithIndex = <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (
  fa: ReadonlyNonEmptyArray<A>
): S => fa.slice(1).reduce((s, a, i) => S.concat(f(i + 1, a))(s), f(0, fa[0]))

/**
 * @category combinators
 * @since 3.0.0
 */
export const foldMap = <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>): S =>
  fa.slice(1).reduce((s, a) => S.concat(f(a))(s), f(fa[0]))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainWithIndex = <A, B>(f: (i: number, a: A) => ReadonlyNonEmptyArray<B>) => (
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<B> => {
  const out: NonEmptyArray<B> = toNonEmptyArray(f(0, head(as)))
  for (let i = 1; i < as.length; i++) {
    out.push(...f(i, as[i]))
  }
  return out
}

/**
 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
 * value and the tail of the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chop = <A, B>(f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, ReadonlyArray<A>]) => (
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<B> => {
  const [b, rest] = f(as)
  const out: NonEmptyArray<B> = [b]
  let next: ReadonlyArray<A> = rest
  while (isNonEmpty(next)) {
    const [b, rest] = f(next)
    out.push(b)
    next = rest
  }
  return out
}

/**
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has `n` elements.
 * If `n` is out of bounds or `n = 0`, the input is returned.
 *
 * @category combinators
 * @since 3.0.0
 */
export const splitAt = (n: number) => <A>(
  as: ReadonlyNonEmptyArray<A>
): readonly [ReadonlyNonEmptyArray<A>, ReadonlyArray<A>] =>
  n < 1 || n > as.length ? [as, empty] : [pipe(as.slice(1, n), cons(head(as))), as.slice(n)]

/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chunksOf = (
  n: number
): (<A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => chop(splitAt(n))

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW = <B>(second: Lazy<ReadonlyNonEmptyArray<B>>) => <A>(
  first: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<A | B> => concat(first as ReadonlyNonEmptyArray<A | B>, second())

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt1<URI>['alt'] = altW

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => [a]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain1<URI>['chain'] = (f) => chainWithIndex((_, a) => f(a))

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend1<URI>['extend'] = <A, B>(f: (as: ReadonlyNonEmptyArray<A>) => B) => (
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<B> => {
  let next: ReadonlyArray<A> = tail(as)
  const out: NonEmptyArray<B> = [f(as)]
  while (isNonEmpty(next)) {
    out.push(f(next))
    next = tail(next)
  }
  return out
}

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor1<URI>['map'] = (f) => mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = <A, B>(f: (i: number, a: A) => B) => (
  as: ReadonlyNonEmptyArray<A>
): ReadonlyNonEmptyArray<B> => {
  const out: NonEmptyArray<B> = [f(0, head(as))]
  for (let i = 1; i < as.length; i++) {
    out.push(f(i, as[i]))
  }
  return out
}

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable1<URI>['reduce'] = (b, f) => reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceWithIndex: FoldableWithIndex1<URI, number>['reduceWithIndex'] = (b, f) => (as) =>
  as.reduce((b, a, i) => f(i, b, a), b)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable1<URI>['reduceRight'] = (b, f) => reduceRightWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceRightWithIndex: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = (b, f) => (as) =>
  as.reduceRight((b, a, i) => f(i, a, b), b)

/**
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (as: ReadonlyNonEmptyArray<A>) => HKT<F, ReadonlyNonEmptyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @since 3.0.0
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: ApplicativeHKT<F>
): (<A>(as: ReadonlyNonEmptyArray<HKT<F, A>>) => HKT<F, ReadonlyNonEmptyArray<A>>) => traverseWithIndex(F)((_, a) => a)

/**
 * @since 3.0.0
 */
export const traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'] = <F>(F: ApplicativeHKT<F>) => <
  A,
  B
>(
  f: (i: number, a: A) => HKT<F, B>
) => (as: ReadonlyNonEmptyArray<A>): HKT<F, ReadonlyNonEmptyArray<B>> => {
  let out: HKT<F, ReadonlyNonEmptyArray<B>> = pipe(f(0, head(as)), F.map(of))
  for (let i = 1; i < as.length; i++) {
    out = pipe(
      out,
      F.map((bs) => (b: B) => pipe(bs, snoc(b))),
      F.ap(f(i, as[i]))
    )
  }
  return out
}

/**
 * @since 3.0.0
 */
export const extract: Comonad1<URI>['extract'] = (as) => as[0]

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReadonlyNonEmptyArray'

declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyNonEmptyArray: ReadonlyNonEmptyArray<A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<ReadonlyNonEmptyArray<A>> => ({
  show: (as) => `[${as.map(S.show).join(', ')}]`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<ReadonlyNonEmptyArray<A>> => ({
  concat: (second) => (first) => concat(first, second)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<ReadonlyNonEmptyArray<A>> =>
  fromEquals((second) => (first) => first.length === second.length && first.every((a, i) => E.equals(second[i])(a)))

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor1<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative1<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain1<URI> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
  reduceWithIndex,
  foldMapWithIndex,
  reduceRightWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable1<URI> = {
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
  traverseWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt1<URI> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad1<URI> = {
  map,
  extend,
  extract
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReadonlyNonEmptyArray<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReadonlyNonEmptyArray<readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const head: <A>(as: ReadonlyNonEmptyArray<A>) => A = extract

/**
 * @since 3.0.0
 */
export const tail = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> => as.slice(1)

/**
 * @since 3.0.0
 */
export const last = <A>(as: ReadonlyNonEmptyArray<A>): A => as[as.length - 1]

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 3.0.0
 */
export const init = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> => as.slice(0, -1)

/**
 * @since 3.0.0
 */
export const min = <A>(O: Ord<A>): ((as: ReadonlyNonEmptyArray<A>) => A) => {
  const S = Se.min(O)
  return (nea) => nea.reduce((a, acc) => S.concat(acc)(a))
}

/**
 * @since 3.0.0
 */
export const max = <A>(O: Ord<A>): ((as: ReadonlyNonEmptyArray<A>) => A) => {
  const S = Se.max(O)
  return (nea) => nea.reduce((a, acc) => S.concat(acc)(a))
}

/**
 * @since 3.0.0
 */
export const concatAll = <A>(S: Semigroup<A>) => (fa: ReadonlyNonEmptyArray<A>): A =>
  fa.reduce((a, acc) => S.concat(acc)(a))
