/**
 * Data structure which represents non-empty arrays.
 *
 * ```ts
 * export type NonEmptyArray<A> = Array<A> & {
 *   0: A
 * }
 * ```
 *
 * Note that you don't need any conversion, a `NonEmptyArray` is an `Array`,
 * so all `Array`'s APIs can be used with a `NonEmptyArray` without further ado.
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative as ApplicativeHKT, Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { identity, Lazy, pipe, Predicate, Refinement } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT } from './HKT'
import * as _ from './internal'
import { Monad1 } from './Monad'
import * as O from './Option'
import { getMonoid, Ord } from './Ord'
import { Pointed1 } from './Pointed'
import * as RNEA from './ReadonlyNonEmptyArray'
import * as Se from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'

import Semigroup = Se.Semigroup
import Option = O.Option
import ReadonlyNonEmptyArray = RNEA.ReadonlyNonEmptyArray

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  // tslint:disable-next-line: readonly-keyword
  0: A
}

// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const isNonEmpty = <A>(as: Array<A>): as is NonEmptyArray<A> => as.length > 0

/**
 * @internal
 */
export const isOutOfBound = <A>(i: number, as: Array<A>): boolean => i < 0 || i >= as.length

/**
 * @internal
 */
export const prepend = <A>(head: A) => (tail: Array<A>): NonEmptyArray<A> => [head, ...tail]

/**
 * @internal
 */
export const append = <A>(end: A) => (init: Array<A>): NonEmptyArray<A> => concat(init, [end])

/**
 * @internal
 */
export const unsafeInsertAt = <A>(i: number, a: A, as: Array<A>): NonEmptyArray<A> => {
  if (isNonEmpty(as)) {
    const xs = fromReadonlyNonEmptyArray(as)
    xs.splice(i, 0, a)
    return xs
  }
  return [a]
}

/**
 * @internal
 */
export const unsafeUpdateAt = <A>(i: number, a: A, as: NonEmptyArray<A>): NonEmptyArray<A> => {
  const xs = fromReadonlyNonEmptyArray(as)
  xs[i] = a
  return xs
}

/**
 * @internal
 */
export const uniq = <A>(E: Eq<A>) => (as: NonEmptyArray<A>): NonEmptyArray<A> => {
  if (as.length === 1) {
    return copy(as)
  }
  const out: NonEmptyArray<A> = [head(as)]
  const rest = tail(as)
  for (const a of rest) {
    if (out.every((o) => !E.equals(o, a))) {
      out.push(a)
    }
  }
  return out
}

/**
 * @internal
 */
export const sortBy = <B>(ords: Array<Ord<B>>): (<A extends B>(as: NonEmptyArray<A>) => NonEmptyArray<A>) => {
  if (isNonEmpty(ords)) {
    const M = getMonoid<B>()
    return sort(ords.reduce(M.concat, M.empty))
  }
  return copy
}

/**
 * @internal
 */
export const union = <A>(E: Eq<A>): Semigroup<NonEmptyArray<A>>['concat'] => {
  const uniqE = uniq(E)
  return (first, second) => uniqE(concat(first, second))
}

/**
 * @internal
 */
export const rotate = (n: number) => <A>(as: NonEmptyArray<A>): NonEmptyArray<A> => {
  const len = as.length
  const m = Math.round(n) % len
  if (isOutOfBound(Math.abs(m), as) || m === 0) {
    return copy(as)
  }
  if (m < 0) {
    const [f, s] = splitAt(-m)(as)
    return concat(s, f)
  } else {
    return rotate(m - len)(as)
  }
}

/**
 * @internal
 */
export const makeBy = <A>(n: number, f: (i: number) => A): NonEmptyArray<A> => {
  const j = Math.max(0, Math.floor(n))
  const out: NonEmptyArray<A> = [f(0)]
  for (let i = 1; i < j; i++) {
    out.push(f(i))
  }
  return out
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromReadonlyNonEmptyArray: <A>(as: ReadonlyNonEmptyArray<A>) => NonEmptyArray<A> =
  _.fromReadonlyNonEmptyArray

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => (isNonEmpty(as) ? O.some(as) : O.none)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3]), [1, [2, 3]])
 *
 * @category destructors
 * @since 2.9.0
 */
export const unprepend = <A>(as: NonEmptyArray<A>): [A, Array<A>] => [head(as), tail(as)]

/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export const unappend = <A>(as: NonEmptyArray<A>): [Array<A>, A] => [init(as), last(as)]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

// TODO: curry in v3
/**
 * @category combinators
 * @since 2.2.0
 */
export function concat<A>(first: Array<A>, second: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(first: NonEmptyArray<A>, second: Array<A>): NonEmptyArray<A>
export function concat<A>(first: Array<A>, second: Array<A>): Array<A> {
  return first.concat(second)
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const reverse = <A>(as: NonEmptyArray<A>): NonEmptyArray<A> => [last(as), ...as.slice(0, -1).reverse()]

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { group } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [
 *   [1],
 *   [2],
 *   [1, 1]
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
export function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  return (as) => {
    const len = as.length
    if (len === 0) {
      return []
    }
    const out: Array<NonEmptyArray<A>> = []
    let head: A = as[0]
    let nea: NonEmptyArray<A> = [head]
    for (let i = 1; i < len; i++) {
      const a = as[i]
      if (E.equals(a, head)) {
        nea.push(a)
      } else {
        out.push(nea)
        head = a
        nea = [head]
      }
    }
    out.push(nea)
    return out
  }
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { groupSort } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [[1, 1, 1], [2]])
 *
 * @category combinators
 * @since 2.0.0
 */
export function groupSort<B>(
  O: Ord<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
export function groupSort<A>(O: Ord<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  const sortO = sort(O)
  const groupO = group(O)
  return (as) => (isNonEmpty(as) ? groupO(sortO(as)) : [])
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @category combinators
 * @since 2.0.0
 */
export const groupBy = <A>(f: (a: A) => string) => (as: Array<A>): Record<string, NonEmptyArray<A>> => {
  const out: Record<string, NonEmptyArray<A>> = {}
  for (const a of as) {
    const k = f(a)
    if (out.hasOwnProperty(k)) {
      out[k].push(a)
    } else {
      out[k] = [a]
    }
  }
  return out
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const sort = <B>(O: Ord<B>) => <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<A> =>
  as.slice().sort(O.compare) as any

/**
 * @category combinators
 * @since 2.0.0
 */
export const insertAt = <A>(i: number, a: A) => (as: Array<A>): Option<NonEmptyArray<A>> =>
  i < 0 || i > as.length ? O.none : O.some(unsafeInsertAt(i, a, as))

/**
 * @category combinators
 * @since 2.0.0
 */
export const updateAt = <A>(i: number, a: A): ((as: NonEmptyArray<A>) => Option<NonEmptyArray<A>>) =>
  modifyAt(i, () => a)

/**
 * @category combinators
 * @since 2.0.0
 */
export const modifyAt = <A>(i: number, f: (a: A) => A) => (as: NonEmptyArray<A>): Option<NonEmptyArray<A>> =>
  isOutOfBound(i, as) ? O.none : O.some(unsafeUpdateAt(i, f(as[i]), as))

/**
 * @category combinators
 * @since 2.0.0
 */
export const copy: <A>(as: NonEmptyArray<A>) => NonEmptyArray<A> = fromReadonlyNonEmptyArray

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => [a]

/**
 * @category combinators
 * @since 2.5.1
 */
export const zipWith = <A, B, C>(
  as: NonEmptyArray<A>,
  bs: NonEmptyArray<B>,
  f: (a: A, b: B) => C
): NonEmptyArray<C> => {
  const cs: NonEmptyArray<C> = [f(as[0], bs[0])]
  const len = Math.min(as.length, bs.length)
  for (let i = 1; i < len; i++) {
    cs[i] = f(as[i], bs[i])
  }
  return cs
}

/**
 * @category combinators
 * @since 2.5.1
 */
export function zip<B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
export function zip<A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
export function zip<A, B>(
  as: NonEmptyArray<A>,
  bs?: NonEmptyArray<B>
): NonEmptyArray<[A, B]> | ((bs: NonEmptyArray<B>) => NonEmptyArray<[B, A]>) {
  if (bs === undefined) {
    return (bs) => zip(bs, as)
  }
  return zipWith(as, bs, (a, b) => [a, b])
}

/**
 * @category combinators
 * @since 2.5.1
 */
export const unzip = <A, B>(abs: NonEmptyArray<[A, B]>): [NonEmptyArray<A>, NonEmptyArray<B>] => {
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
 * import { prependAll } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
export const prependAll = <A>(middle: A) => (as: NonEmptyArray<A>): NonEmptyArray<A> => {
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
 * import { intersperse } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export const intersperse = <A>(middle: A) => (as: NonEmptyArray<A>): NonEmptyArray<A> => {
  const rest = tail(as)
  return isNonEmpty(rest) ? pipe(rest, prependAll(middle), prepend(head(as))) : copy(as)
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const foldMapWithIndex: <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S =
  RNEA.foldMapWithIndex

/**
 * @category combinators
 * @since 2.0.0
 */
export const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S = RNEA.foldMap

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainWithIndex = <A, B>(f: (i: number, a: A) => NonEmptyArray<B>) => (
  as: NonEmptyArray<A>
): NonEmptyArray<B> => {
  const out: NonEmptyArray<B> = fromReadonlyNonEmptyArray(f(0, head(as)))
  for (let i = 1; i < as.length; i++) {
    out.push(...f(i, as[i]))
  }
  return out
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const chop = <A, B>(f: (as: NonEmptyArray<A>) => [B, Array<A>]) => (as: NonEmptyArray<A>): NonEmptyArray<B> => {
  const [b, rest] = f(as)
  const out: NonEmptyArray<B> = [b]
  let next: Array<A> = rest
  while (isNonEmpty(next)) {
    const [b, rest] = f(next)
    out.push(b)
    next = rest
  }
  return out
}

/**
 * Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category combinators
 * @since 2.10.0
 */
export const splitAt = (n: number) => <A>(as: NonEmptyArray<A>): [NonEmptyArray<A>, Array<A>] => {
  const m = Math.max(1, n)
  return m >= as.length ? [copy(as), []] : [pipe(as.slice(1, m), prepend(head(as))), as.slice(m)]
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const chunksOf = (n: number): (<A>(as: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>) => chop(splitAt(n))

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
/* istanbul ignore next */
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _extend: Extend1<URI>['extend'] = (wa, f) => pipe(wa, extend(f))
/* istanbul ignore next */
const _reduce: Foldable1<URI>['reduce'] = (fa, b, f) => pipe(fa, reduce(b, f))
/* istanbul ignore next */
const _foldMap: Foldable1<URI>['foldMap'] = (M) => {
  const foldMapM = foldMap(M)
  return (fa, f) => pipe(fa, foldMapM(f))
}
/* istanbul ignore next */
const _reduceRight: Foldable1<URI>['reduceRight'] = (fa, b, f) => pipe(fa, reduceRight(b, f))
/* istanbul ignore next */
const _traverse: Traversable1<URI>['traverse'] = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(ta: NonEmptyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>) => {
  const traverseF = traverse(F)
  return (ta, f) => pipe(ta, traverseF(f))
}
/* istanbul ignore next */
const _alt: Alt1<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _reduceWithIndex: FoldableWithIndex1<URI, number>['reduceWithIndex'] = (fa, b, f) =>
  pipe(fa, reduceWithIndex(b, f))
/* istanbul ignore next */
const _foldMapWithIndex: FoldableWithIndex1<URI, number>['foldMapWithIndex'] = (M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (fa, f) => pipe(fa, foldMapWithIndexM(f))
}
/* istanbul ignore next */
const _reduceRightWithIndex: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = (fa, b, f) =>
  pipe(fa, reduceRightWithIndex(b, f))
/* istanbul ignore next */
const _traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'] = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(ta: NonEmptyArray<A>, f: (i: number, a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => pipe(ta, traverseWithIndexF(f))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW = <B>(that: Lazy<NonEmptyArray<B>>) => <A>(as: NonEmptyArray<A>): NonEmptyArray<A | B> =>
  concat(as as NonEmptyArray<A | B>, that())

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A> = altW

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap = <A>(as: NonEmptyArray<A>): (<B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>) =>
  chain((f) => pipe(as, map(f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain = <A, B>(f: (a: A) => NonEmptyArray<B>): ((ma: NonEmptyArray<A>) => NonEmptyArray<B>) =>
  chainWithIndex((_, a) => f(a))

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend = <A, B>(f: (as: NonEmptyArray<A>) => B) => (as: NonEmptyArray<A>): NonEmptyArray<B> => {
  let next: Array<A> = tail(as)
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
 * @since 2.5.0
 */
export const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map = <A, B>(f: (a: A) => B): ((as: NonEmptyArray<A>) => NonEmptyArray<B>) => mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export const mapWithIndex = <A, B>(f: (i: number, a: A) => B) => (as: NonEmptyArray<A>): NonEmptyArray<B> => {
  const out: NonEmptyArray<B> = [f(0, head(as))]
  for (let i = 1; i < as.length; i++) {
    out.push(f(i, as[i]))
  }
  return out
}

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduce

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceWithIndex

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduceRight

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceRightWithIndex

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (as: NonEmptyArray<A>) => HKT<F, NonEmptyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: ApplicativeHKT<F>
): (<A>(as: NonEmptyArray<HKT<F, A>>) => HKT<F, NonEmptyArray<A>>) => traverseWithIndex(F)((_, a) => a)

/**
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> = <F>(F: ApplicativeHKT<F>) => <A, B>(
  f: (i: number, a: A) => HKT<F, B>
) => (as: NonEmptyArray<A>): HKT<F, NonEmptyArray<B>> => {
  let out: HKT<F, NonEmptyArray<B>> = F.map(f(0, head(as)), of)
  for (let i = 1; i < as.length; i++) {
    out = F.ap(
      F.map(out, (bs) => (b: B) => pipe(bs, append(b))),
      f(i, as[i])
    )
  }
  return out
}

/**
 * @since 2.7.0
 */
export const extract: Comonad1<URI>['extract'] = RNEA.head

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'NonEmptyArray'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: NonEmptyArray<A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = RNEA.getShow

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => ({
  concat
})

/**
 * @example
 * import { getEq } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = RNEA.getEq

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex,
  traverseWithIndex: _traverseWithIndex
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Comonad: Comonad1<URI> = {
  URI,
  map: _map,
  extend: _extend,
  extract
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: NonEmptyArray<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const head: <A>(nea: NonEmptyArray<A>) => A = RNEA.head

/**
 * @since 2.0.0
 */
export const tail = <A>(as: NonEmptyArray<A>): Array<A> => as.slice(1)

/**
 * @since 2.0.0
 */
export const last: <A>(nea: NonEmptyArray<A>) => A = RNEA.last

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export const init = <A>(as: NonEmptyArray<A>): Array<A> => as.slice(0, -1)

/**
 * @since 2.0.0
 */
export const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.min

/**
 * @since 2.0.0
 */
export const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.max

/**
 * @since 2.10.0
 */
export const concatAll = <A>(S: Semigroup<A>) => (as: NonEmptyArray<A>): A => as.reduce(S.concat)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`filter`](./Array.ts.html#filter) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (as: NonEmptyArray<A>) => Option<NonEmptyArray<B>>
export function filter<A>(predicate: Predicate<A>): (as: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (as: NonEmptyArray<A>) => Option<NonEmptyArray<A>> {
  // tslint:disable-next-line: deprecation
  return filterWithIndex((_, a) => predicate(a))
}

/**
 * Use [`filterWithIndex`](./Array.ts.html#filterWithIndex) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export const filterWithIndex = <A>(predicate: (i: number, a: A) => boolean) => (
  as: NonEmptyArray<A>
): Option<NonEmptyArray<A>> => fromArray(as.filter((a, i) => predicate(i, a)))

/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category destructors
 * @since 2.9.0
 * @deprecated
 */
export const uncons: <A>(as: NonEmptyArray<A>) => [A, Array<A>] = unprepend

/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category destructors
 * @since 2.9.0
 * @deprecated
 */
export const unsnoc: <A>(as: NonEmptyArray<A>) => [Array<A>, A] = unappend

/**
 * Use [`prepend`](./Array.ts.html#prepend) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
export function cons<A>(head: A): (tail: Array<A>) => NonEmptyArray<A>
/** @deprecated */
export function cons<A>(head: A, tail: Array<A>): NonEmptyArray<A>
export function cons<A>(head: A, tail?: Array<A>): NonEmptyArray<A> | ((tail: Array<A>) => NonEmptyArray<A>) {
  return tail === undefined ? prepend(head) : pipe(tail, prepend(head))
}

/**
 * Use [`append`](./Array.ts.html#append) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
export const snoc = <A>(init: Array<A>, end: A): NonEmptyArray<A> => pipe(init, append(end))

/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
export const prependToAll = prependAll

/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @since 2.5.0
 * @deprecated
 */
export const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A = RNEA.concatAll

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = {
  URI,
  of,
  map: _map,
  mapWithIndex: _mapWithIndex,
  ap: _ap,
  chain: _chain,
  extend: _extend,
  extract: extract,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex,
  traverseWithIndex: _traverseWithIndex,
  alt: _alt
}
