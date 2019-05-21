/**
 * @file Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * import { either } from 'fp-ts/lib/Either'
 *
 * either.map(right(12), double) // right(24)
 * either.map(left(23), double)  // left(23)
 * ```
 */

import { Alt2, Alt2C } from './Alt'
import { Applicative, Applicative2C } from './Applicative'
import { Bifunctor2, Bifunctor2C } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Compactable2C, Separated } from './Compactable'
import { Eq, fromEquals } from './Eq'
import { Extend2, Extend2C } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2, Foldable2C } from './Foldable'
import { Lazy, phantom, Predicate, Refinement } from './function'
import { HKT } from './HKT'
import { Monad2, Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2, Traversable2C } from './Traversable'
import { Witherable2C } from './Witherable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Either'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @since 2.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 2.0.0
 */
export function left<E>(e: E): Either<E, never> {
  return { _tag: 'Left', left: e }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 2.0.0
 */
export function right<A>(a: A): Either<never, A> {
  return { _tag: 'Right', right: a }
}

/**
 * @since 2.0.0
 */
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): Either<E, A> {
  return ma._tag === 'None' ? left(onNone()) : right(ma.value)
}

/**
 * @since 2.0.0
 */
export function fromPredicate<E, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => Either<E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A> {
  return a => (predicate(a) ? right(a) : left(onFalse(a)))
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 2.0.0
 */
export function fromNullable<E, A>(a: A | null | undefined, e: E): Either<E, A> {
  return a == null ? left(e) : right(a)
}

/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e))
}

/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A> {
  try {
    return right(f())
  } catch (e) {
    return left(onError(e))
  }
}

/**
 * @since 2.0.0
 */
export function fold<E, A, R>(onLeft: (e: E) => R, onRight: (a: A) => R): (ma: Either<E, A>) => R {
  return ma => (isLeft(ma) ? onLeft(ma.left) : onRight(ma.right))
}

/**
 * @since 2.0.0
 */
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> {
  return {
    show: ma => (isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`)
  }
}

/**
 * @since 2.0.0
 */
export function getEq<E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>> {
  return fromEquals((x, y) =>
    isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right)
  )
}

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (x, y) => (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right)))
  }
}

/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (x, y) => (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right)))
  }
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<Either<E, A>> {
  return {
    ...getApplySemigroup(M),
    empty: right(M.empty)
  }
}

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isLeft<E, A>(ma: Either<E, A>): ma is Left<E> {
  switch (ma._tag) {
    case 'Left':
      return true
    case 'Right':
      return false
  }
}

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isRight<E, A>(ma: Either<E, A>): ma is Right<A> {
  return isLeft(ma) ? false : true
}

/**
 * @since 2.0.0
 */
export function swap<E, A>(ma: Either<E, A>): Either<A, E> {
  return isLeft(ma) ? right(ma.left) : left(ma.right)
}

/**
 * @since 2.0.0
 */
export function orElse<E, A, M>(f: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> {
  return ma => (isLeft(ma) ? f(ma.left) : ma)
}

/**
 * @since 2.0.0
 */
export function getOrElse<E, A>(f: (e: E) => A): (ma: Either<E, A>) => A {
  return ma => (isLeft(ma) ? f(ma.left) : ma.right)
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean {
  return (a, ma) => (isLeft(ma) ? false : E.equals(a, ma.right))
}

/**
 * @since 2.0.0
 */
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (ma: Either<E, A>) => Either<E, B>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
export function filterOrElse<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A> {
  return ma => (isLeft(ma) ? ma : predicate(ma.right) ? ma : left(onFalse(ma.right)))
}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 2.0.0
 */
export function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown> {
  return tryCatch(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError), right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError), left(new TypeError('Converting circular structure to JSON')))
 *
 * @since 2.0.0
 */
export function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string> {
  return tryCatch(() => JSON.stringify(u), onError)
}

const map = <E, A, B>(ma: Either<E, A>, f: (a: A) => B): Either<E, B> => {
  return isLeft(ma) ? ma : right(f(ma.right))
}

const ap = <E, A, B>(mab: Either<E, (a: A) => B>, ma: Either<E, A>): Either<E, B> => {
  return isLeft(mab) ? mab : isLeft(ma) ? ma : right(mab.right(ma.right))
}

const chain = <E, A, B>(ma: Either<E, A>, f: (a: A) => Either<E, B>): Either<E, B> => {
  return isLeft(ma) ? ma : f(ma.right)
}

const bimap = <E, V, A, B>(ma: Either<E, A>, f: (e: E) => V, g: (a: A) => B): Either<V, B> => {
  return isLeft(ma) ? left(f(ma.left)) : right(g(ma.right))
}

const extend = <E, A, B>(ma: Either<E, A>, f: (ma: Either<E, A>) => B): Either<E, B> => {
  return isLeft(ma) ? ma : right(f(ma))
}

const reduce = <E, A, B>(ma: Either<E, A>, b: B, f: (b: B, a: A) => B): B => {
  return isLeft(ma) ? b : f(b, ma.right)
}

const foldMap = <M>(M: Monoid<M>) => <E, A>(ma: Either<E, A>, f: (a: A) => M): M => {
  return isLeft(ma) ? M.empty : f(ma.right)
}

const reduceRight = <E, A, B>(ma: Either<E, A>, b: B, f: (a: A, b: B) => B): B => {
  return isLeft(ma) ? b : f(ma.right, b)
}

const traverse = <F>(F: Applicative<F>) => <E, A, B>(
  ma: Either<E, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Either<E, B>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<B, Either<E, B>>(f(ma.right), of)
}

const sequence = <F>(F: Applicative<F>) => <E, A>(ma: Either<E, HKT<F, A>>): HKT<F, Either<E, A>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<E, A>>(ma.right, right)
}

const chainRec = <E, A, B>(a: A, f: (a: A) => Either<E, Either<A, B>>): Either<E, B> => {
  return tailRec(f(a), e =>
    isLeft(e)
      ? right<Either<E, B>>(left(e.left))
      : isLeft(e.right)
      ? left(f(e.right.left))
      : right(right(e.right.right))
  )
}

const of = right

/**
 * Builds `Compactable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
export function getCompactable<E>(M: Monoid<E>): Compactable2C<URI, E> {
  const empty = left(M.empty)
  const onNone = () => M.empty

  const compact = <A>(ma: Either<E, Option<A>>): Either<E, A> => {
    return isLeft(ma) ? ma : fromOption(ma.right, onNone)
  }

  const separate = <A, B>(ma: Either<E, Either<A, B>>): Separated<Either<E, A>, Either<E, B>> => {
    return isLeft(ma)
      ? { left: ma, right: ma }
      : isLeft(ma.right)
      ? { left: right(ma.right.left), right: empty }
      : { left: empty, right: right(ma.right.right) }
  }

  return {
    URI,
    _L: phantom,
    compact,
    separate
  }
}

/**
 * Builds `Filterable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const C = getCompactable(M)
  const empty = left(M.empty)
  const onNone = () => M.empty

  const partitionMap = <RL, RR, A>(
    ma: Either<E, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<E, RL>, Either<E, RR>> => {
    if (isLeft(ma)) {
      return { left: ma, right: ma }
    }
    const e = f(ma.right)
    return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) }
  }

  const partition = <A>(ma: Either<E, A>, p: Predicate<A>): Separated<Either<E, A>, Either<E, A>> => {
    return isLeft(ma)
      ? { left: ma, right: ma }
      : p(ma.right)
      ? { left: empty, right: right(ma.right) }
      : { left: right(ma.right), right: empty }
  }

  const filterMap = <A, B>(ma: Either<E, A>, f: (a: A) => Option<B>): Either<E, B> => {
    return isLeft(ma) ? ma : fromOption(f(ma.right), onNone)
  }

  const filter = <A>(ma: Either<E, A>, predicate: Predicate<A>): Either<E, A> =>
    isLeft(ma) ? ma : predicate(ma.right) ? ma : left(M.empty)

  return {
    ...C,
    map,
    partitionMap,
    filterMap,
    partition,
    filter
  }
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 2.0.0
 */
export function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E> {
  const filterableM = getFilterable(M)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(ma: Either<E, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<E, B>>) => {
    const traverseF = traverse(F)
    return (ma, f) => F.map(traverseF(ma, f), filterableM.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    ma: Either<E, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<E, RL>, Either<E, RR>>>) => {
    const traverseF = traverse(F)
    return (ma, f) => F.map(traverseF(ma, f), filterableM.separate)
  }

  return {
    ...filterableM,
    traverse,
    sequence,
    reduce,
    foldMap,
    reduceRight,
    wither,
    wilt
  }
}

export function getValidationApplicative<E>(
  S: Semigroup<E>
): Applicative2C<URI, E> & Foldable2C<URI, E> & Traversable2C<URI, E> & Bifunctor2C<URI, E> & Extend2C<URI, E> {
  return {
    URI,
    _L: phantom,
    map,
    of: either.of,
    ap: (mab, ma) =>
      isLeft(mab)
        ? isLeft(ma)
          ? left(S.concat(mab.left, ma.left))
          : mab
        : isLeft(ma)
        ? ma
        : right(mab.right(ma.right)),
    reduce: either.reduce,
    foldMap: either.foldMap,
    reduceRight: either.reduceRight,
    traverse: either.traverse,
    sequence: either.sequence,
    extend: either.extend,
    bimap: either.bimap,
    mapLeft: either.mapLeft
  }
}

/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 2.0.0
 */
export function getValidationMonad<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Foldable2C<URI, E> & Traversable2C<URI, E> & Bifunctor2C<URI, E> & Extend2C<URI, E> {
  return {
    ...getValidationApplicative(S),
    chain: (ma, f) => (isLeft(ma) ? ma : f(ma.right))
  }
}

/**
 * @since 2.0.0
 */
export function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (fx, fy) =>
      isLeft(fx)
        ? isLeft(fy)
          ? left(SE.concat(fx.left, fy.left))
          : fx
        : isLeft(fy)
        ? fy
        : right(SA.concat(fx.right, fy.right))
  }
}

/**
 * @since 2.0.0
 */
export function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>> {
  return {
    ...getValidationSemigroup(SE, SA),
    empty: right(SA.empty)
  }
}

/**
 * @since 2.0.0
 */
export function getValidationAlt<E>(S: Semigroup<E>): Alt2C<URI, E> {
  return {
    URI,
    _L: phantom,
    map,
    alt: (fx, f) => {
      if (isRight(fx)) {
        return fx
      }
      const fy = f()
      return isLeft(fy) ? left(S.concat(fx.left, fy.left)) : fy
    }
  }
}

/**
 * @since 2.0.0
 */
export const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence,
  bimap,
  mapLeft: (ma, f) => (isLeft(ma) ? left(f(ma.left)) : ma),
  alt: (fx, fy) => (isLeft(fx) ? fy() : fx),
  extend,
  chainRec
}
