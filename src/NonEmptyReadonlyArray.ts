/**
 * Data structure which represents non-empty readonly arrays.
 *
 * ```ts
 * export type NonEmptyReadonlyArray<A> = ReadonlyArray<A> & {
 *   readonly 0: A
 * }
 * ```
 *
 * Note that you don't need any conversion, a `NonEmptyReadonlyArray` is a `ReadonlyArray`,
 * so all `ReadonlyArray`'s APIs can be used with a `NonEmptyReadonlyArray` without further ado.
 *
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as alt from './Alt'
import * as apply from './Apply'
import type * as applicative from './Applicative'
import * as flattenable from './Flattenable'
import type * as comonad from './Comonad'
import type { Endomorphism } from './Endomorphism'
import * as eq from './Eq'
import type * as foldable from './Foldable'
import * as foldableWithIndex from './FoldableWithIndex'
import { flow, identity, pipe } from './Function'
import * as functor from './Functor'
import type * as functorWithIndex from './FunctorWithIndex'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as ord from './Ord'
import * as fromIdentity from './FromIdentity'
import * as semigroup from './Semigroup'
import type { Show } from './Show'
import type * as traversable from './Traversable'
import type * as traversableWithIndex from './TraversableWithIndex'
import * as tuple from './tuple'
import type { Eq } from './Eq'
import type { Ord } from './Ord'
import type { Semigroup } from './Semigroup'
import * as iterable from './Iterable'

/**
 * @category model
 * @since 3.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const prepend =
  <B>(head: B) =>
  <A>(tail: ReadonlyArray<A>): NonEmptyReadonlyArray<A | B> =>
    [head, ...tail]

/**
 * @internal
 */
export const append =
  <B>(end: B) =>
  <A>(init: ReadonlyArray<A>): NonEmptyReadonlyArray<A | B> =>
    concat([end])(init)

/**
 * Builds a `NonEmptyReadonlyArray` from an array returning `none` if `as` is an empty array.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromReadonlyArray = <A>(as: ReadonlyArray<A>): Option<NonEmptyReadonlyArray<A>> =>
  _.isNonEmpty(as) ? _.some(as) : _.none

/**
 * Return a `NonEmptyReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 3.0.0
 */
export const makeBy =
  <A>(f: (i: number) => A) =>
  (n: number): NonEmptyReadonlyArray<A> => {
    const j = Math.max(0, Math.floor(n))
    const out: _.NonEmptyArray<A> = [f(0)]
    for (let i = 1; i < j; i++) {
      out.push(f(i))
    }
    return out
  }

/**
 * Create a `NonEmptyReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 3.0.0
 */
export const replicate = <A>(a: A): ((n: number) => NonEmptyReadonlyArray<A>) => makeBy(() => a)

/**
 * Create a `NonEmptyReadonlyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 3.0.0
 */
export const range = (start: number, end: number): NonEmptyReadonlyArray<number> =>
  start <= end ? makeBy((i) => start + i)(end - start + 1) : [start]

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any.
 *
 * @example
 * import { unprepend } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const unprepend = <A>(as: NonEmptyReadonlyArray<A>): readonly [A, ReadonlyArray<A>] => [head(as), tail(as)]

/**
 * Produces a couple of a copy of the array without its last element, and that last element.
 *
 * @example
 * import { unappend } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const unappend = <A>(as: NonEmptyReadonlyArray<A>): readonly [ReadonlyArray<A>, A] => [init(as), last(as)]

/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const matchLeft =
  <A, B>(f: (head: A, tail: ReadonlyArray<A>) => B) =>
  (as: NonEmptyReadonlyArray<A>): B =>
    f(head(as), tail(as))

/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const matchRight =
  <A, B>(f: (init: ReadonlyArray<A>, last: A) => B) =>
  (as: NonEmptyReadonlyArray<A>): B =>
    f(init(as), last(as))

/**
 * @since 3.0.0
 */
export function concat<B>(that: NonEmptyReadonlyArray<B>): <A>(self: ReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(that: ReadonlyArray<B>): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(that: ReadonlyArray<B>): <A>(self: NonEmptyReadonlyArray<A>) => ReadonlyArray<A | B> {
  return <A>(self: NonEmptyReadonlyArray<A | B>) => self.concat(that)
}

/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/NonEmptyReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 3.0.0
 */
export const uniq = <A>(Eq: Eq<A>) => {
  const uniq = iterable.uniq(Eq)
  return (self: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> =>
    self.length === 1 ? self : uniq(unprepend(self))
}

/**
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/NonEmptyReadonlyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
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
 * const persons: RNEA.NonEmptyReadonlyArray<Person> = [
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
 * @since 3.0.0
 */
export const sortBy = <B>(
  ords: ReadonlyArray<Ord<B>>
): (<A extends B>(as: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A>) => {
  if (_.isNonEmpty(ords)) {
    const M = ord.getMonoid<B>()
    return sort(ords.reduce((a, acc) => M.combine(acc)(a), M.empty))
  }
  return identity
}

/**
 * Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.
 *
 * @example
 * import { union } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
 *
 * @since 3.0.0
 */
export const union = <A>(E: Eq<A>): Semigroup<NonEmptyReadonlyArray<A>>['combine'] => {
  const uniqE = uniq(E)
  return (that) => (self) => uniqE(concat(that)(self))
}

/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @since 3.0.0
 */
export const rotate =
  (n: number) =>
  <A>(as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> => {
    const len = as.length
    const m = Math.round(n) % len
    if (isOutOfBound(Math.abs(m), as) || m === 0) {
      return as
    }
    if (m < 0) {
      const [f, s] = splitAt(-m)(as)
      return concat(f)(s)
    } else {
      return rotate(m - len)(as)
    }
  }

/**
 * Apply a function to the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const modifyHead =
  <A>(f: Endomorphism<A>) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> =>
    [f(head(as)), ...tail(as)]

/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const updateHead = <A>(a: A): ((as: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A>) => modifyHead(() => a)

/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const modifyLast =
  <A>(f: Endomorphism<A>) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> =>
    pipe(init(as), append(f(last(as))))

/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const updateLast = <A>(a: A): ((as: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A>) => modifyLast(() => a)

/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 3.0.0
 */
export const intercalate = <A>(S: Semigroup<A>): ((middle: A) => (as: NonEmptyReadonlyArray<A>) => A) => {
  const combineAllS = combineAll(S)
  return (middle) => flow(intersperse(middle), combineAllS)
}

/**
 * `NonEmptyReadonlyArray` comprehension.
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ... ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/NonEmptyReadonlyArray'
 * import { tuple } from 'fp-ts/tuple'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [2, 'a'],
 *   [2, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @since 3.0.0
 */
export function comprehension<A, B, C, D, R>(
  input: readonly [
    NonEmptyReadonlyArray<A>,
    NonEmptyReadonlyArray<B>,
    NonEmptyReadonlyArray<C>,
    NonEmptyReadonlyArray<D>
  ],
  f: (a: A, b: B, c: C, d: D) => R
): NonEmptyReadonlyArray<R>
export function comprehension<A, B, C, R>(
  input: readonly [NonEmptyReadonlyArray<A>, NonEmptyReadonlyArray<B>, NonEmptyReadonlyArray<C>],
  f: (a: A, b: B, c: C) => R
): NonEmptyReadonlyArray<R>
export function comprehension<A, B, R>(
  input: readonly [NonEmptyReadonlyArray<A>, NonEmptyReadonlyArray<B>],
  f: (a: A, b: B) => R
): NonEmptyReadonlyArray<R>
export function comprehension<A, R>(
  input: readonly [NonEmptyReadonlyArray<A>],
  f: (a: A) => R
): NonEmptyReadonlyArray<R>
export function comprehension<A, R>(
  input: NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>,
  f: (...as: ReadonlyArray<A>) => R
): NonEmptyReadonlyArray<R> {
  const go = (as: ReadonlyArray<A>, input: ReadonlyArray<NonEmptyReadonlyArray<A>>): NonEmptyReadonlyArray<R> =>
    _.isNonEmpty(input)
      ? pipe(
          head(input),
          flatMap((head) => go(append(head)(as), tail(input)))
        )
      : [f(...as)]
  return go(_.emptyReadonlyArray, input)
}

/**
 * @since 3.0.0
 */
export const reverse = <A>(as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> =>
  as.length === 1 ? as : [last(as), ...as.slice(0, -1).reverse()]

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { group } from 'fp-ts/NonEmptyReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Eq)([1, 2, 1, 1]), [
 *   [1],
 *   [2],
 *   [1, 1]
 * ])
 *
 * @since 3.0.0
 */
export const group =
  <B>(E: Eq<B>) =>
  <A extends B>(as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>> =>
    pipe(
      as,
      chop((as) => {
        const h = head(as)
        const out: _.NonEmptyArray<A> = [h]
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
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': ['foo', 'bar'],
 *   '6': ['foobar']
 * })
 *
 * @since 3.0.0
 */
export const groupBy =
  <A>(f: (a: A) => string) =>
  (as: ReadonlyArray<A>): Readonly<Record<string, NonEmptyReadonlyArray<A>>> => {
    const out: Record<string, _.NonEmptyArray<A>> = {}
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
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const sort =
  <B>(O: Ord<B>) =>
  <A extends B>(as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> =>
    as.length === 1 ? as : (as.slice().sort((self, that) => O.compare(that)(self)) as any)

/**
 * @internal
 */
export const isOutOfBound = <A>(i: number, as: ReadonlyArray<A>): boolean => i < 0 || i >= as.length

/**
 * Change the element at the specified index, creating a new `NonEmptyReadonlyArray`, or returning `None` if the index is out of bounds.
 *
 * @since 3.0.0
 */
export const updateAt = <A>(i: number, a: A): ((as: NonEmptyReadonlyArray<A>) => Option<NonEmptyReadonlyArray<A>>) =>
  modifyAt(i, () => a)

/**
 * Apply a function to the element at the specified index, creating a new `NonEmptyReadonlyArray`, or returning `None` if the index is out
 * of bounds.
 *
 * @since 3.0.0
 */
export const modifyAt =
  <A>(i: number, f: (a: A) => A) =>
  (as: NonEmptyReadonlyArray<A>): Option<NonEmptyReadonlyArray<A>> => {
    if (isOutOfBound(i, as)) {
      return _.none
    }
    const prev = as[i]
    const next = f(prev)
    if (next === prev) {
      return _.some(as)
    }
    const out = _.fromNonEmptyReadonlyArray(as)
    out[i] = next
    return _.some(out)
  }

/**
 * @since 3.0.0
 */
export const zipWith =
  <B, A, C>(bs: NonEmptyReadonlyArray<B>, f: (a: A, b: B) => C) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<C> => {
    const cs: _.NonEmptyArray<C> = [f(head(as), head(bs))]
    const len = Math.min(as.length, bs.length)
    for (let i = 1; i < len; i++) {
      cs[i] = f(as[i], bs[i])
    }
    return cs
  }

/**
 * @since 3.0.0
 */
export const zip =
  <B>(bs: NonEmptyReadonlyArray<B>) =>
  <A>(as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<readonly [A, B]> =>
    pipe(as, zipWith(bs, tuple.tuple))

/**
 * @since 3.0.0
 */
export const unzip = <A, B>(
  abs: NonEmptyReadonlyArray<readonly [A, B]>
): readonly [NonEmptyReadonlyArray<A>, NonEmptyReadonlyArray<B>] => {
  const fa: _.NonEmptyArray<A> = [abs[0][0]]
  const fb: _.NonEmptyArray<B> = [abs[0][1]]
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
 * import { prependAll } from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 3.0.0
 */
export const prependAll =
  <A>(middle: A) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> => {
    const out: _.NonEmptyArray<A> = [middle, head(as)]
    for (let i = 1; i < as.length; i++) {
      out.push(middle, as[i])
    }
    return out
  }

/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 3.0.0
 */
export const intersperse =
  <A>(middle: A) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<A> => {
    const rest = tail(as)
    return _.isNonEmpty(rest) ? prepend(head(as))(prependAll(middle)(rest)) : as
  }

/**
 * @since 3.0.0
 */
export const flatMapWithIndex =
  <A, B>(f: (i: number, a: A) => NonEmptyReadonlyArray<B>) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
    const out: _.NonEmptyArray<B> = _.fromNonEmptyReadonlyArray(f(0, head(as)))
    for (let i = 1; i < as.length; i++) {
      out.push(...f(i, as[i]))
    }
    return out
  }

/**
 * A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
 * `NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
 * value and the tail of the `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const chop =
  <A, B>(f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
    const [b, rest] = f(as)
    const out: _.NonEmptyArray<B> = [b]
    let next: ReadonlyArray<A> = rest
    while (_.isNonEmpty(next)) {
      const [b, rest] = f(next)
      out.push(b)
      next = rest
    }
    return out
  }

/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @since 3.0.0
 */
export const splitAt =
  (n: number) =>
  <A>(as: NonEmptyReadonlyArray<A>): readonly [NonEmptyReadonlyArray<A>, ReadonlyArray<A>] => {
    const m = Math.max(1, n)
    return m >= as.length ? [as, _.emptyReadonlyArray] : [pipe(as.slice(1, m), prepend(head(as))), as.slice(m)]
  }

/**
 * Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const chunksOf = (
  n: number
): (<A>(as: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>) => chop(splitAt(n))

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `NonEmptyReadonlyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RNEA from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3] as const,
 *     RNEA.orElse([4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @since 3.0.2
 */
export const orElse = <B>(
  that: NonEmptyReadonlyArray<B>
): (<A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>) => concat(that)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<B> = (f) =>
  mapWithIndex((_, a) => f(a))

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => NonEmptyReadonlyArray<A> = _.toReadonlyArray

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<NonEmptyReadonlyArrayTypeLambda> = {
  of
}

/**
 * @example
 * import * as RNEA from 'fp-ts/NonEmptyReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 *
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(
  f: (a: A) => NonEmptyReadonlyArray<B>
) => (self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<B> = (f) => flatMapWithIndex((_, a) => f(a))

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<NonEmptyReadonlyArrayTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(
  bfc: (b: B) => NonEmptyReadonlyArray<C>
) => <A>(afb: (a: A) => NonEmptyReadonlyArray<B>) => (a: A) => NonEmptyReadonlyArray<C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<NonEmptyReadonlyArrayTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => NonEmptyReadonlyArray<A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<NonEmptyReadonlyArrayTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (
  second: NonEmptyReadonlyArray<unknown>
) => <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(
  second: NonEmptyReadonlyArray<A>
) => (self: NonEmptyReadonlyArray<unknown>) => NonEmptyReadonlyArray<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(
  fa: NonEmptyReadonlyArray<A>
) => <B>(self: NonEmptyReadonlyArray<(a: A) => B>) => NonEmptyReadonlyArray<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const extend =
  <A, B>(f: (as: NonEmptyReadonlyArray<A>) => B) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
    let next: ReadonlyArray<A> = tail(as)
    const out: _.NonEmptyArray<B> = [f(as)]
    while (_.isNonEmpty(next)) {
      out.push(f(next))
      next = tail(next)
    }
    return out
  }

/**
 * @since 3.0.0
 */
export const duplicate: <A>(ma: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>> =
  /*#__PURE__*/ extend(identity)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>) => NonEmptyReadonlyArray<A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<B> =
  <A, B>(f: (i: number, a: A) => B) =>
  (as: NonEmptyReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
    const out: _.NonEmptyArray<B> = [f(0, head(as))]
    for (let i = 1; i < as.length; i++) {
      out.push(f(i, as[i]))
    }
    return out
  }

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => (ta: NonEmptyReadonlyArray<A>) => Kind<F, S, R, O, E, NonEmptyReadonlyArray<B>> = (F) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <S, R, O, E, A>(
  fas: NonEmptyReadonlyArray<Kind<F, S, R, O, E, A>>
) => Kind<F, S, R, O, E, NonEmptyReadonlyArray<A>> = (F) => traverse(F)(identity)

/**
 * @since 3.0.0
 */
export const traverseWithIndex =
  <F extends TypeLambda>(F: apply.Apply<F>) =>
  <A, S, R, O, E, B>(f: (i: number, a: A) => Kind<F, S, R, O, E, B>) =>
  (as: NonEmptyReadonlyArray<A>): Kind<F, S, R, O, E, NonEmptyReadonlyArray<B>> => {
    let out = pipe(f(0, head(as)), F.map(of))
    for (let i = 1; i < as.length; i++) {
      out = pipe(
        out,
        F.map((bs) => (b: B) => pipe(bs, append(b))),
        F.ap(f(i, as[i]))
      )
    }
    return out
  }

/**
 * @since 3.0.0
 */
export const extract: <A>(wa: NonEmptyReadonlyArray<A>) => A = _.head

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface NonEmptyReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: NonEmptyReadonlyArray<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<NonEmptyReadonlyArray<A>> => ({
  show: (as) => `[${as.map(S.show).join(', ')}]`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<NonEmptyReadonlyArray<A>> => ({
  combine: concat
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<NonEmptyReadonlyArray<A>> =>
  eq.fromEquals((that) => (self) => self.length === that.length && self.every((a, i) => E.equals(that[i])(a)))

/**
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(E: Eq<A>): Semigroup<NonEmptyReadonlyArray<A>> => ({
  combine: union(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<NonEmptyReadonlyArrayTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: NonEmptyReadonlyArray<(a: A) => B>) => NonEmptyReadonlyArray<B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: NonEmptyReadonlyArray<unknown>) => NonEmptyReadonlyArray<B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: NonEmptyReadonlyArray<unknown>) => NonEmptyReadonlyArray<void> =
  /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: functorWithIndex.FunctorWithIndex<NonEmptyReadonlyArrayTypeLambda, number> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<NonEmptyReadonlyArrayTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `NonEmptyReadonlyArray`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => (fa: NonEmptyReadonlyArray<A>, fb: NonEmptyReadonlyArray<B>) => NonEmptyReadonlyArray<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `NonEmptyReadonlyArray`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (
  fa: NonEmptyReadonlyArray<A>,
  fb: NonEmptyReadonlyArray<B>,
  fc: NonEmptyReadonlyArray<C>
) => NonEmptyReadonlyArray<D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<NonEmptyReadonlyArrayTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<NonEmptyReadonlyArrayTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.tap(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 *
 * @since 3.0.0
 */
export const tap: <A>(
  f: (a: A) => NonEmptyReadonlyArray<unknown>
) => (self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<NonEmptyReadonlyArrayTypeLambda> = {
  toIterable: identity
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: NonEmptyReadonlyArray<A>): B =>
    self.reduce((b, a) => f(b, a), b)

/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <S>(S: Semigroup<S>) =>
  <A>(f: (a: A) => S) =>
  (self: NonEmptyReadonlyArray<A>): S =>
    self.slice(1).reduce((s, a) => S.combine(f(a))(s), f(self[0]))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  (self: NonEmptyReadonlyArray<A>): B =>
    self.reduceRight((b, a) => f(a, b), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const toEntries: <A>(self: NonEmptyReadonlyArray<A>) => Iterable<readonly [number, A]> = iterable.toEntries

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<NonEmptyReadonlyArrayTypeLambda, number> = {
  toEntries
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex: <B, A>(b: B, f: (i: number, b: B, a: A) => B) => (self: NonEmptyReadonlyArray<A>) => B =
  /*#__PURE__*/ foldableWithIndex.reduceWithIndex(FoldableWithIndex)

// TODO: can we derive this function?
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <S>(S: Semigroup<S>) =>
  <A>(f: (i: number, a: A) => S) =>
  (self: NonEmptyReadonlyArray<A>): S =>
    self.slice(1).reduce((s, a, i) => S.combine(f(i + 1, a))(s), f(0, self[0]))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex: <B, A>(
  b: B,
  f: (i: number, a: A, b: B) => B
) => (self: NonEmptyReadonlyArray<A>) => B = /*#__PURE__*/ foldableWithIndex.reduceRightWithIndex(FoldableWithIndex)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<NonEmptyReadonlyArrayTypeLambda> = {
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: traversableWithIndex.TraversableWithIndex<NonEmptyReadonlyArrayTypeLambda, number> =
  {
    traverseWithIndex
  }

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<NonEmptyReadonlyArrayTypeLambda> = {
  orElse
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <A>(
  startWith: NonEmptyReadonlyArray<A>
) => (iterable: Iterable<NonEmptyReadonlyArray<A>>) => NonEmptyReadonlyArray<A> = /*#__PURE__*/ alt.firstSuccessOf(Alt)

/**
 * Returns an effect that runs the first effect and in case of failure, runs
 * each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOfNonEmpty: <A>(
  head: NonEmptyReadonlyArray<A>,
  ...tail: ReadonlyArray<NonEmptyReadonlyArray<A>>
) => NonEmptyReadonlyArray<A> = /*#__PURE__*/ alt.firstSuccessOfNonEmpty(Alt)

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<NonEmptyReadonlyArrayTypeLambda> = {
  map,
  extend,
  extract
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: NonEmptyReadonlyArray<{}> =
  /*#__PURE__*/
  of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (
  self: NonEmptyReadonlyArray<A>
) => NonEmptyReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => NonEmptyReadonlyArray<B>
) => (
  self: NonEmptyReadonlyArray<A>
) => NonEmptyReadonlyArray<{ readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: NonEmptyReadonlyArray<B>
) => (
  self: NonEmptyReadonlyArray<A>
) => NonEmptyReadonlyArray<{ readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: NonEmptyReadonlyArray<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: NonEmptyReadonlyArray<B>
) => <A extends ReadonlyArray<unknown>>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * @since 3.0.0
 */
export const head: <A>(as: NonEmptyReadonlyArray<A>) => A = extract

/**
 * @since 3.0.0
 */
export const tail: <A>(as: NonEmptyReadonlyArray<A>) => ReadonlyArray<A> = _.tail

/**
 * @since 3.0.0
 */
export const last = <A>(as: NonEmptyReadonlyArray<A>): A => as[as.length - 1]

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyReadonlyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 3.0.0
 */
export const init = <A>(as: NonEmptyReadonlyArray<A>): ReadonlyArray<A> => as.slice(0, -1)

/**
 * @since 3.0.0
 */
export const min = <A>(O: Ord<A>): ((as: NonEmptyReadonlyArray<A>) => A) => {
  const S = semigroup.min(O)
  return (nea) => nea.reduce((a, acc) => S.combine(acc)(a))
}

/**
 * @since 3.0.0
 */
export const max = <A>(O: Ord<A>): ((as: NonEmptyReadonlyArray<A>) => A) => {
  const S = semigroup.max(O)
  return (nea) => nea.reduce((a, acc) => S.combine(acc)(a))
}

/**
 * @since 3.0.0
 */
export const combineAll =
  <A>(S: Semigroup<A>) =>
  (fa: NonEmptyReadonlyArray<A>): A =>
    fa.reduce((a, acc) => S.combine(acc)(a))
