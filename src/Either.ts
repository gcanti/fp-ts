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

import { Alt2 } from './Alt'
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Compactable2C, Separated } from './Compactable'
import { Extend2 } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2 } from './Foldable'
import { identity, Lazy, phantom, Predicate, Refinement } from './function'
import { HKT } from './HKT'
import { Monad2 } from './Monad'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
import { Witherable2C } from './Witherable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export const URI = 'Either'

export type URI = typeof URI

export interface Left<L> {
  readonly _tag: 'Left'
  readonly left: L
}

export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @since 2.0.0
 */
export type Either<L, A> = Left<L> | Right<A>

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 2.0.0
 */
export function left<L>(l: L): Either<L, never> {
  return { _tag: 'Left', left: l }
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
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): Either<L, A> {
  return ma._tag === 'None' ? left(onNone()) : right(ma.value)
}

/**
 * @since 2.0.0
 */
export function fromPredicate<L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => Either<L, B>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A> {
  return a => (predicate(a) ? right(a) : left(onFalse(a)))
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 2.0.0
 */
export function fromNullable<L, A>(a: A | null | undefined, l: L): Either<L, A> {
  return a == null ? left(l) : right(a)
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
export function tryCatch<L, A>(f: Lazy<A>, onError: (e: unknown) => L): Either<L, A> {
  try {
    return right(f())
  } catch (e) {
    return left(onError(e))
  }
}

/**
 * @since 2.0.0
 */
export function fold<L, A, R>(ma: Either<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): R {
  return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)
}

/**
 * @since 2.0.0
 */
export function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<Either<L, A>> {
  return {
    show: ma => (isLeft(ma) ? `left(${SL.show(ma.left)})` : `right(${SA.show(ma.right)})`)
  }
}

/**
 * @since 2.0.0
 */
export function getEq<L, A>(SL: Eq<L>, SA: Eq<A>): Eq<Either<L, A>> {
  return fromEquals((x, y) =>
    isLeft(x) ? isLeft(y) && SL.equals(x.left, y.left) : isRight(y) && SA.equals(x.right, y.right)
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
export function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> {
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
export function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> {
  return {
    concat: (x, y) => (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right)))
  }
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<Either<L, A>> {
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
export function isLeft<L, A>(ma: Either<L, A>): ma is Left<L> {
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
export function isRight<L, A>(ma: Either<L, A>): ma is Right<A> {
  return isLeft(ma) ? false : true
}

/**
 * @since 2.0.0
 */
export function mapLeft<L, A, M>(ma: Either<L, A>, f: (l: L) => M): Either<M, A> {
  return isLeft(ma) ? left(f(ma.left)) : ma
}

/**
 * @since 2.0.0
 */
export function swap<L, A>(ma: Either<L, A>): Either<A, L> {
  return isLeft(ma) ? right(ma.left) : left(ma.right)
}

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(ma: Either<L, A>, f: (l: L) => Either<M, A>): Either<M, A> {
  return isLeft(ma) ? f(ma.left) : ma
}

/**
 * @since 2.0.0
 */
export function getOrElse<L, A>(ma: Either<L, A>, f: (l: L) => A): A {
  return isLeft(ma) ? f(ma.left) : ma.right
}

/**
 * @since 2.0.0
 */
export function filterOrElse<L, A, B extends A>(
  ma: Either<L, A>,
  refinement: Refinement<A, B>,
  zero: (a: A) => L
): Either<L, B>
export function filterOrElse<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Either<L, A>
export function filterOrElse<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Either<L, A> {
  return isLeft(ma) ? ma : predicate(ma.right) ? ma : left(zero(ma.right))
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
export function parseJSON<L>(s: string, onError: (reason: unknown) => L): Either<L, unknown> {
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
export function stringifyJSON<L>(u: unknown, onError: (reason: unknown) => L): Either<L, string> {
  return tryCatch(() => JSON.stringify(u), onError)
}

//
// instances
//

const map = <L, A, B>(ma: Either<L, A>, f: (a: A) => B): Either<L, B> => {
  return isLeft(ma) ? ma : right(f(ma.right))
}

const ap = <L, A, B>(mab: Either<L, (a: A) => B>, ma: Either<L, A>): Either<L, B> => {
  return isLeft(mab) ? mab : fold<L, A, Either<L, B>>(ma, left, a => right(mab.right(a)))
}

const chain = <L, A, B>(ma: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> => {
  return isLeft(ma) ? ma : f(ma.right)
}

const bimap = <L, V, A, B>(ma: Either<L, A>, f: (u: L) => V, g: (a: A) => B): Either<V, B> => {
  return isLeft(ma) ? left(f(ma.left)) : right(g(ma.right))
}

const extend = <L, A, B>(ma: Either<L, A>, f: (ma: Either<L, A>) => B): Either<L, B> => {
  return isLeft(ma) ? ma : right(f(ma))
}

const reduce = <L, A, B>(ma: Either<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return isLeft(ma) ? b : f(b, ma.right)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(ma: Either<L, A>, f: (a: A) => M): M => {
  return isLeft(ma) ? M.empty : f(ma.right)
}

const reduceRight = <L, A, B>(ma: Either<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return isLeft(ma) ? b : f(ma.right, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(
  ma: Either<L, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Either<L, B>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<B, Either<L, B>>(f(ma.right), of)
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ma: Either<L, HKT<F, A>>): HKT<F, Either<L, A>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<L, A>>(ma.right, right)
}

const chainRec = <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>): Either<L, B> => {
  return tailRec(f(a), e =>
    isLeft(e)
      ? right<Either<L, B>>(left(e.left))
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
export function getCompactable<L>(M: Monoid<L>): Compactable2C<URI, L> {
  const empty = left(M.empty)
  const onNone = () => M.empty

  const compact = <A>(ma: Either<L, Option<A>>): Either<L, A> => {
    return isLeft(ma) ? ma : fromOption(ma.right, onNone)
  }

  const separate = <A, B>(ma: Either<L, Either<A, B>>): Separated<Either<L, A>, Either<L, B>> => {
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
export function getFilterable<L>(M: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(M)
  const empty = left(M.empty)
  const onNone = () => M.empty

  const partitionMap = <RL, RR, A>(
    ma: Either<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<L, RL>, Either<L, RR>> => {
    if (isLeft(ma)) {
      return { left: ma, right: ma }
    }
    const e = f(ma.right)
    return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) }
  }

  const partition = <A>(ma: Either<L, A>, p: Predicate<A>): Separated<Either<L, A>, Either<L, A>> => {
    return isLeft(ma)
      ? { left: ma, right: ma }
      : p(ma.right)
      ? { left: empty, right: right(ma.right) }
      : { left: right(ma.right), right: empty }
  }

  const filterMap = <A, B>(ma: Either<L, A>, f: (a: A) => Option<B>): Either<L, B> => {
    return isLeft(ma) ? ma : fromOption(f(ma.right), onNone)
  }

  const filter = <A>(ma: Either<L, A>, p: Predicate<A>): Either<L, A> => filterOrElse(ma, p, () => M.empty)

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
export function getWitherable<L>(M: Monoid<L>): Witherable2C<URI, L> {
  const filterableM = getFilterable(M)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(ma: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = traverse(F)
    return (ma, f) => F.map(traverseF(ma, f), filterableM.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    ma: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
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

/**
 * @since 2.0.0
 */
export const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> &
  MonadThrow2<URI> = {
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
  alt: orElse,
  extend,
  chainRec,
  throwError: left,
  fromEither: identity,
  fromOption
}
