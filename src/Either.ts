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
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Separated } from './Compactable'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Foldable2 } from './Foldable'
import { Lazy, Predicate, Refinement } from './function'
import { HKT } from './HKT'
import { Monad2, Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { pipeable } from './pipeable'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
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
export function fromOption<E>(onNone: () => E): <A>(ma: Option<A>) => Either<E, A> {
  return ma => (ma._tag === 'None' ? left(onNone()) : right(ma.value))
}

/**
 * @since 2.0.0
 */
export function fromPredicate<E, A, B extends A>(
  refinement: Refinement<A, B>,
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
export function fromNullable<E>(e: E): <A>(a: A | null | undefined) => Either<E, A> {
  return a => (a == null ? left(e) : right(a))
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
  return {
    equals: (x, y) =>
      x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right))
  }
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

const phantom: any = undefined

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 2.0.0
 */
export function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E> {
  const empty = left(M.empty)

  const compact = <A>(ma: Either<E, Option<A>>): Either<E, A> => {
    return isLeft(ma) ? ma : ma.right._tag === 'None' ? left(M.empty) : right(ma.right.value)
  }

  const separate = <A, B>(ma: Either<E, Either<A, B>>): Separated<Either<E, A>, Either<E, B>> => {
    return isLeft(ma)
      ? { left: ma, right: ma }
      : isLeft(ma.right)
      ? { left: right(ma.right.left), right: empty }
      : { left: empty, right: right(ma.right.right) }
  }

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
    if (isLeft(ma)) {
      return ma
    }
    const ob = f(ma.right)
    return ob._tag === 'None' ? left(M.empty) : right(ob.value)
  }

  const filter = <A>(ma: Either<E, A>, predicate: Predicate<A>): Either<E, A> =>
    isLeft(ma) ? ma : predicate(ma.right) ? ma : left(M.empty)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(ma: Either<E, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<E, B>>) => {
    const traverseF = either.traverse(F)
    return (ma, f) => F.map(traverseF(ma, f), compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    ma: Either<E, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<E, RL>, Either<E, RR>>>) => {
    const traverseF = either.traverse(F)
    return (ma, f) => F.map(traverseF(ma, f), separate)
  }

  return {
    URI,
    _L: phantom,
    map: either.map,
    compact,
    separate,
    filter,
    filterMap,
    partition,
    partitionMap,
    traverse: either.traverse,
    sequence: either.sequence,
    reduce: either.reduce,
    foldMap: either.foldMap,
    reduceRight: either.reduceRight,
    wither,
    wilt
  }
}

/**
 * @since 2.0.0
 */
export function getValidation<E>(S: Semigroup<E>): Monad2C<URI, E> & Alt2C<URI, E> {
  return {
    URI,
    _L: phantom,
    map: either.map,
    of: either.of,
    ap: (mab, ma) =>
      isLeft(mab)
        ? isLeft(ma)
          ? left(S.concat(mab.left, ma.left))
          : mab
        : isLeft(ma)
        ? ma
        : right(mab.right(ma.right)),
    chain: either.chain,
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
    concat: getValidationSemigroup(SE, SA).concat,
    empty: right(SA.empty)
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
  map: (ma, f) => (isLeft(ma) ? ma : right(f(ma.right))),
  of: right,
  ap: (mab, ma) => (isLeft(mab) ? mab : isLeft(ma) ? ma : right(mab.right(ma.right))),
  chain: (ma, f) => (isLeft(ma) ? ma : f(ma.right)),
  reduce: (fa, b, f) => (isLeft(fa) ? b : f(b, fa.right)),
  foldMap: M => (fa, f) => (isLeft(fa) ? M.empty : f(fa.right)),
  reduceRight: (fa, b, f) => (isLeft(fa) ? b : f(fa.right, b)),
  traverse: <F>(F: Applicative<F>) => <E, A, B>(ma: Either<E, A>, f: (a: A) => HKT<F, B>): HKT<F, Either<E, B>> => {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map<B, Either<E, B>>(f(ma.right), right)
  },
  sequence: <F>(F: Applicative<F>) => <E, A>(ma: Either<E, HKT<F, A>>): HKT<F, Either<E, A>> => {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<E, A>>(ma.right, right)
  },
  bimap: (fla, f, g) => (isLeft(fla) ? left(f(fla.left)) : right(g(fla.right))),
  mapLeft: (fla, f) => (isLeft(fla) ? left(f(fla.left)) : fla),
  alt: (fx, fy) => (isLeft(fx) ? fy() : fx),
  extend: (wa, f) => (isLeft(wa) ? wa : right(f(wa))),
  chainRec: <E, A, B>(a: A, f: (a: A) => Either<E, Either<A, B>>): Either<E, B> => {
    return tailRec(f(a), e =>
      isLeft(e)
        ? right<Either<E, B>>(left(e.left))
        : isLeft(e.right)
        ? left(f(e.right.left))
        : right(right(e.right.right))
    )
  }
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  mapLeft,
  reduce,
  reduceRight
} = pipeable(either)

export {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  mapLeft,
  reduce,
  reduceRight
}
