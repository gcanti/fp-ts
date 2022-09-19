/**
 * Data structure which represents non-empty readonly arrays.
 *
 * ```ts
 * export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
 *   readonly 0: A
 * }
 * ```
 *
 * Note that you don't need any conversion, a `ReadonlyNonEmptyArray` is a `ReadonlyArray`,
 * so all `ReadonlyArray`'s APIs can be used with a `ReadonlyNonEmptyArray` without further ado.
 *
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Applicative as ApplicativeHKT, Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { Comonad1 } from './Comonad'
import { Endomorphism } from './Endomorphism'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { flow, identity, Lazy, pipe, SK } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT } from './HKT'
import * as _ from './internal'
import { Monad1 } from './Monad'
import { NonEmptyArray } from './NonEmptyArray'
import { Option } from './Option'
import { getMonoid, Ord } from './Ord'
import { Pointed1 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyRecord } from './ReadonlyRecord'
import { Refinement } from './Refinement'
import * as Se from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'

import Semigroup = Se.Semigroup

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.5.0
 */
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}

// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const empty: ReadonlyArray<never> = _.emptyReadonlyArray

/**
 * @internal
 */
export const isNonEmpty: <A>(as: ReadonlyArray<A>) => as is ReadonlyNonEmptyArray<A> = _.isNonEmpty

/**
 * @internal
 */
export const isOutOfBound = <A>(i: number, as: ReadonlyArray<A>): boolean => i < 0 || i >= as.length

/**
 * @internal
 */
export const prependW =
  <B>(head: B) =>
  <A>(tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A | B> =>
    [head, ...tail]

/**
 * @internal
 */
export const prepend: <A>(head: A) => (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = prependW

/**
 * @internal
 */
export const appendW =
  <B>(end: B) =>
  <A>(init: ReadonlyArray<A>): ReadonlyNonEmptyArray<A | B> =>
    [...init, end] as any

/**
 * @internal
 */
export const append: <A>(end: A) => (init: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = appendW

/**
 * @internal
 */
export const unsafeInsertAt = <A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyNonEmptyArray<A> => {
  if (isNonEmpty(as)) {
    const xs = _.fromReadonlyNonEmptyArray(as)
    xs.splice(i, 0, a)
    return xs
  }
  return [a]
}

/**
 * @internal
 */
export const unsafeUpdateAt = <A>(i: number, a: A, as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
  if (as[i] === a) {
    return as
  } else {
    const xs = _.fromReadonlyNonEmptyArray(as)
    xs[i] = a
    return xs
  }
}

/**
 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
export const uniq =
  <A>(E: Eq<A>) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
    if (as.length === 1) {
      return as
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
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
 *
 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.11.0
 */
export const sortBy = <B>(
  ords: ReadonlyArray<Ord<B>>
): (<A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>) => {
  if (isNonEmpty(ords)) {
    const M = getMonoid<B>()
    return sort(ords.reduce(M.concat, M.empty))
  }
  return identity
}

/**
 * @category combinators
 * @since 2.11.0
 */
export const union = <A>(
  E: Eq<A>
): ((second: ReadonlyNonEmptyArray<A>) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>) => {
  const uniqE = uniq(E)
  return (second) => (first) => uniqE(pipe(first, concat(second)))
}

/**
 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
export const rotate =
  (n: number) =>
  <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
    const len = as.length
    const m = Math.round(n) % len
    if (isOutOfBound(Math.abs(m), as) || m === 0) {
      return as
    }
    if (m < 0) {
      const [f, s] = splitAt(-m)(as)
      return pipe(s, concat(f))
    } else {
      return rotate(m - len)(as)
    }
  }

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
 *
 * @category constructors
 * @since 2.5.0
 */
export const fromReadonlyArray = <A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
  isNonEmpty(as) ? _.some(as) : _.none

/**
 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
export const makeBy =
  <A>(f: (i: number) => A) =>
  (n: number): ReadonlyNonEmptyArray<A> => {
    const j = Math.max(0, Math.floor(n))
    const out: NonEmptyArray<A> = [f(0)]
    for (let i = 1; i < j; i++) {
      out.push(f(i))
    }
    return out
  }

/**
 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
export const replicate = <A>(a: A): ((n: number) => ReadonlyNonEmptyArray<A>) => makeBy(() => a)

/**
 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
export const range = (start: number, end: number): ReadonlyNonEmptyArray<number> =>
  start <= end ? makeBy((i) => start + i)(end - start + 1) : [start]

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
export const unprepend = <A>(as: ReadonlyNonEmptyArray<A>): readonly [A, ReadonlyArray<A>] => [head(as), tail(as)]

/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export const unappend = <A>(as: ReadonlyNonEmptyArray<A>): readonly [ReadonlyArray<A>, A] => [init(as), last(as)]

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 2.5.0
 */
export const fromArray = <A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>> => fromReadonlyArray(as.slice())

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.11.0
 */
export function concatW<B>(
  second: ReadonlyNonEmptyArray<B>
): <A>(first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A | B>
export function concatW<B>(
  second: ReadonlyArray<B>
): <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A | B>
export function concatW<B>(second: ReadonlyArray<B>): <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyArray<A | B> {
  return <A>(first: ReadonlyNonEmptyArray<A | B>) => first.concat(second)
}

/**
 * @category combinators
 * @since 2.5.0
 */
export function concat<A>(second: ReadonlyNonEmptyArray<A>): (first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export function concat<A>(second: ReadonlyArray<A>): (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
/** @deprecated */
export function concat<A>(first: ReadonlyArray<A>, second: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
/** @deprecated */
export function concat<A>(first: ReadonlyNonEmptyArray<A>, second: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(
  x: ReadonlyArray<A>,
  y?: ReadonlyArray<A>
): ReadonlyArray<A> | ((y: ReadonlyNonEmptyArray<A>) => ReadonlyArray<A>) {
  return y ? x.concat(y) : (y) => y.concat(x)
}

/**
 * @category combinators
 * @since 2.5.0
 */
export const reverse = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> =>
  as.length === 1 ? as : [last(as), ...as.slice(0, -1).reverse()]

/**
 * Group equal, consecutive elements of a `ReadonlyArray` into `ReadonlyNonEmptyArray`s.
 *
 * @example
 * import { group } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Eq)([1, 2, 1, 1]), [
 *   [1],
 *   [2],
 *   [1, 1]
 * ])
 *
 * @category combinators
 * @since 2.5.0
 */
export function group<B>(E: Eq<B>): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  return (as) => {
    const len = as.length
    if (len === 0) {
      return empty
    }
    const out: Array<ReadonlyNonEmptyArray<A>> = []
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
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @category combinators
 * @since 2.5.0
 */
export const groupBy =
  <A>(f: (a: A) => string) =>
  (as: ReadonlyArray<A>): ReadonlyRecord<string, ReadonlyNonEmptyArray<A>> => {
    const out: Record<string, NonEmptyArray<A>> = {}
    for (const a of as) {
      const k = f(a)
      if (_.has.call(out, k)) {
        out[k].push(a)
      } else {
        out[k] = [a]
      }
    }
    return out
  }

/**
 * @category combinators
 * @since 2.5.0
 */
export const sort =
  <B>(O: Ord<B>) =>
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> =>
    as.length === 1 ? as : (as.slice().sort(O.compare) as any)

/**
 * @category combinators
 * @since 2.5.0
 */
export const updateAt = <A>(i: number, a: A): ((as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>) =>
  modifyAt(i, () => a)

/**
 * @category combinators
 * @since 2.5.0
 */
export const modifyAt =
  <A>(i: number, f: (a: A) => A) =>
  (as: ReadonlyNonEmptyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
    isOutOfBound(i, as) ? _.none : _.some(unsafeUpdateAt(i, f(as[i]), as))

/**
 * @category combinators
 * @since 2.5.1
 */
export const zipWith = <A, B, C>(
  as: ReadonlyNonEmptyArray<A>,
  bs: ReadonlyNonEmptyArray<B>,
  f: (a: A, b: B) => C
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
 * @since 2.5.1
 */
export function zip<B>(
  bs: ReadonlyNonEmptyArray<B>
): <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>
export function zip<A, B>(
  as: ReadonlyNonEmptyArray<A>,
  bs: ReadonlyNonEmptyArray<B>
): ReadonlyNonEmptyArray<readonly [A, B]>
export function zip<A, B>(
  as: ReadonlyNonEmptyArray<A>,
  bs?: ReadonlyNonEmptyArray<B>
): ReadonlyNonEmptyArray<readonly [A, B]> | ((bs: ReadonlyNonEmptyArray<B>) => ReadonlyNonEmptyArray<readonly [B, A]>) {
  if (bs === undefined) {
    return (bs) => zip(bs, as)
  }
  return zipWith(as, bs, (a, b) => [a, b])
}

/**
 * @category combinators
 * @since 2.5.1
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
 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
export const prependAll =
  <A>(middle: A) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
    const out: NonEmptyArray<A> = [middle, as[0]]
    for (let i = 1; i < as.length; i++) {
      out.push(middle, as[i])
    }
    return out
  }

/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
export const intersperse =
  <A>(middle: A) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> => {
    const rest = tail(as)
    return isNonEmpty(rest) ? pipe(rest, prependAll(middle), prepend(head(as))) : as
  }

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainWithIndex =
  <A, B>(f: (i: number, a: A) => ReadonlyNonEmptyArray<B>) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<B> => {
    const out: NonEmptyArray<B> = _.fromReadonlyNonEmptyArray(f(0, head(as)))
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
 * @since 2.10.0
 */
export const chop =
  <A, B>(f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, ReadonlyArray<A>]) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<B> => {
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
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category combinators
 * @since 2.10.0
 */
export const splitAt =
  (n: number) =>
  <A>(as: ReadonlyNonEmptyArray<A>): readonly [ReadonlyNonEmptyArray<A>, ReadonlyArray<A>] => {
    const m = Math.max(1, n)
    return m >= as.length ? [as, empty] : [pipe(as.slice(1, m), prepend(head(as))), as.slice(m)]
  }

/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const chunksOf = (
  n: number
): (<A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => chop(splitAt(n))

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
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
): (<A, B>(ta: ReadonlyNonEmptyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, ReadonlyNonEmptyArray<B>>) => {
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
): (<A, B>(ta: ReadonlyNonEmptyArray<A>, f: (i: number, a: A) => HKT<F, B>) => HKT<F, ReadonlyNonEmptyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => pipe(ta, traverseWithIndexF(f))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Pointed
 * @since 2.5.0
 */
export const of: <A>(a: A) => ReadonlyNonEmptyArray<A> = _.singleton

/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
 *     RNEA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW =
  <B>(that: Lazy<ReadonlyNonEmptyArray<B>>) =>
  <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A | B> =>
    pipe(as, concatW(that()))

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <A>(
  that: Lazy<ReadonlyNonEmptyArray<A>>
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = altW

/**
 * @category Apply
 * @since 2.5.0
 */
export const ap = <A>(
  as: ReadonlyNonEmptyArray<A>
): (<B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>) => chain((f) => pipe(as, map(f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.chain((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 *
 * @category Monad
 * @since 2.5.0
 */
export const chain = <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
): ((ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>) => chainWithIndex((_, a) => f(a))

/**
 * @category Extend
 * @since 2.5.0
 */
export const extend =
  <A, B>(f: (as: ReadonlyNonEmptyArray<A>) => B) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<B> => {
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
 * @since 2.5.0
 */
export const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>> =
  /*#__PURE__*/ extend(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A> =
  /*#__PURE__*/ chain(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export const map = <A, B>(f: (a: A) => B): ((as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>) =>
  mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
export const mapWithIndex =
  <A, B>(f: (i: number, a: A) => B) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<B> => {
    const out: NonEmptyArray<B> = [f(0, head(as))]
    for (let i = 1; i < as.length; i++) {
      out.push(f(i, as[i]))
    }
    return out
  }

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduce = <A, B>(b: B, f: (b: B, a: A) => B): ((as: ReadonlyNonEmptyArray<A>) => B) =>
  reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category Foldable
 * @since 2.5.0
 */
export const foldMap =
  <S>(S: Semigroup<S>) =>
  <A>(f: (a: A) => S) =>
  (as: ReadonlyNonEmptyArray<A>): S =>
    as.slice(1).reduce((s, a) => S.concat(s, f(a)), f(as[0]))

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduceRight = <A, B>(b: B, f: (a: A, b: B) => B): ((as: ReadonlyNonEmptyArray<A>) => B) =>
  reduceRightWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceWithIndex =
  <A, B>(b: B, f: (i: number, b: B, a: A) => B) =>
  (as: ReadonlyNonEmptyArray<A>): B =>
    as.reduce((b, a, i) => f(i, b, a), b)

/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const foldMapWithIndex =
  <S>(S: Semigroup<S>) =>
  <A>(f: (i: number, a: A) => S) =>
  (as: ReadonlyNonEmptyArray<A>): S =>
    as.slice(1).reduce((s, a, i) => S.concat(s, f(i + 1, a)), f(0, as[0]))

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceRightWithIndex =
  <A, B>(b: B, f: (i: number, a: A, b: B) => B) =>
  (as: ReadonlyNonEmptyArray<A>): B =>
    as.reduceRight((b, a, i) => f(i, a, b), b)

/**
 * @category Traversable
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (as: ReadonlyNonEmptyArray<A>) => HKT<F, ReadonlyNonEmptyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category Traversable
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: ApplicativeHKT<F>
): (<A>(as: ReadonlyNonEmptyArray<HKT<F, A>>) => HKT<F, ReadonlyNonEmptyArray<A>>) => traverseWithIndex(F)(SK)

/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> =
  <F>(F: ApplicativeHKT<F>) =>
  <A, B>(f: (i: number, a: A) => HKT<F, B>) =>
  (as: ReadonlyNonEmptyArray<A>): HKT<F, ReadonlyNonEmptyArray<B>> => {
    let out: HKT<F, ReadonlyNonEmptyArray<B>> = F.map(f(0, head(as)), of)
    for (let i = 1; i < as.length; i++) {
      out = F.ap(
        F.map(out, (bs) => (b: B) => pipe(bs, append(b))),
        f(i, as[i])
      )
    }
    return out
  }

/**
 * @category Comonad
 * @since 2.6.3
 */
export const extract: Comonad1<URI>['extract'] = _.head

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyNonEmptyArray'

/**
 * @category instances
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: ReadonlyNonEmptyArray<A>
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export const getShow = <A>(S: Show<A>): Show<ReadonlyNonEmptyArray<A>> => ({
  show: (as) => `[${as.map(S.show).join(', ')}]`
})

/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
export const getSemigroup = <A = never>(): Semigroup<ReadonlyNonEmptyArray<A>> => ({
  concat
})

/**
 * @example
 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
export const getEq = <A>(E: Eq<A>): Eq<ReadonlyNonEmptyArray<A>> =>
  fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])))

/**
 * @category combinators
 * @since 2.11.0
 */
export const getUnionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlyNonEmptyArray<A>> => {
  const unionE = union(E)
  return {
    concat: (first, second) => unionE(second)(first)
  }
}

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
export const flap = /*#__PURE__*/ flap_(Functor)

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
export const apFirst = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(Apply)

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
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 *
 * @category combinators
 * @since 2.5.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = /*#__PURE__*/ chainFirst_(Chain)

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
export const Do: ReadonlyNonEmptyArray<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 2.8.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @since 2.8.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.5.0
 */
export const head: <A>(as: ReadonlyNonEmptyArray<A>) => A = extract

/**
 * @since 2.5.0
 */
export const tail: <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyArray<A> = _.tail

/**
 * @since 2.5.0
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
 * @since 2.5.0
 */
export const init = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> => as.slice(0, -1)

/**
 * @since 2.5.0
 */
export const min = <A>(O: Ord<A>): ((as: ReadonlyNonEmptyArray<A>) => A) => {
  const S = Se.min(O)
  return (as) => as.reduce(S.concat)
}

/**
 * @since 2.5.0
 */
export const max = <A>(O: Ord<A>): ((as: ReadonlyNonEmptyArray<A>) => A) => {
  const S = Se.max(O)
  return (as) => as.reduce(S.concat)
}

/**
 * @since 2.10.0
 */
export const concatAll =
  <A>(S: Semigroup<A>) =>
  (as: ReadonlyNonEmptyArray<A>): A =>
    as.reduce(S.concat)

/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category destructors
 * @since 2.11.0
 */
export const matchLeft =
  <A, B>(f: (head: A, tail: ReadonlyArray<A>) => B) =>
  (as: ReadonlyNonEmptyArray<A>): B =>
    f(head(as), tail(as))

/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.11.0
 */
export const matchRight =
  <A, B>(f: (init: ReadonlyArray<A>, last: A) => B) =>
  (as: ReadonlyNonEmptyArray<A>): B =>
    f(init(as), last(as))

/**
 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
export const modifyHead =
  <A>(f: Endomorphism<A>) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> =>
    [f(head(as)), ...tail(as)]

/**
 * Change the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
export const updateHead = <A>(a: A): ((as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>) => modifyHead(() => a)

/**
 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
export const modifyLast =
  <A>(f: Endomorphism<A>) =>
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A> =>
    pipe(init(as), append(f(last(as))))

/**
 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
export const updateLast = <A>(a: A): ((as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>) => modifyLast(() => a)

/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
export const intercalate = <A>(S: Semigroup<A>): ((middle: A) => (as: ReadonlyNonEmptyArray<A>) => A) => {
  const concatAllS = concatAll(S)
  return (middle) => flow(intersperse(middle), concatAllS)
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * This is just `sort` followed by `group`.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
export function groupSort<B>(O: Ord<B>): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
export function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  const sortO = sort(O)
  const groupO = group(O)
  return (as) => (isNonEmpty(as) ? groupO(sortO(as)) : empty)
}

/**
 * Use [`filter`](./ReadonlyArray.ts.html#filter) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
export function filter<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyNonEmptyArray<B>) => Option<ReadonlyNonEmptyArray<B>>
export function filter<A>(predicate: Predicate<A>): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return filterWithIndex((_, a) => predicate(a))
}

/**
 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
export const filterWithIndex =
  <A>(predicate: (i: number, a: A) => boolean) =>
  (as: ReadonlyNonEmptyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
    fromReadonlyArray(as.filter((a, i) => predicate(i, a)))

/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
export const uncons: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [A, ReadonlyArray<A>] = unprepend

/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
export const unsnoc: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [ReadonlyArray<A>, A] = unappend

/**
 * Use [`prepend`](./ReadonlyArray.ts.html#prepend) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
export function cons<A>(head: A): (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
/** @deprecated */
export function cons<A>(head: A, tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function cons<A>(
  head: A,
  tail?: ReadonlyArray<A>
): ReadonlyNonEmptyArray<A> | ((tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>) {
  return tail === undefined ? prepend(head) : pipe(tail, prepend(head))
}

/**
 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
export const snoc = <A>(init: ReadonlyArray<A>, end: A): ReadonlyNonEmptyArray<A> => pipe(init, concat([end]))

/**
 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
export const insertAt =
  <A>(i: number, a: A) =>
  (as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> =>
    i < 0 || i > as.length ? _.none : _.some(unsafeInsertAt(i, a, as))

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
export const fold = concatAll

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
 * (where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
export const readonlyNonEmptyArray: Monad1<URI> &
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
