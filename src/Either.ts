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
 * either.map(right(12, double) // right(24)
 * either.map(left(23, double)  // left(23)
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
import { fromEquals, Setoid } from './Setoid'
import { Show } from './Show'
import { Traversable2 } from './Traversable'
import { Validation } from './Validation'
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
  readonly value: L
}

export interface Right<A> {
  readonly _tag: 'Right'
  readonly value: A
}

/**
 * @since 1.0.0
 */
export type Either<L, A> = Left<L> | Right<A>

/**
 * @since 2.0.0
 */
export function fold<L, A, R>(ma: Either<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): R {
  return isLeft(ma) ? onLeft(ma.value) : onRight(ma.value)
}

/**
 * @since 1.17.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Either<L, A>> => {
  return {
    show: ma => (isLeft(ma) ? `left(${SL.show(ma.value)})` : `right(${SA.show(ma.value)})`)
  }
}

/**
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => {
  return fromEquals(
    (x, y) => (isLeft(x) ? isLeft(y) && SL.equals(x.value, y.value) : isRight(y) && SA.equals(x.value, y.value))
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
 * @since 1.7.0
 */
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.value, y.value)))
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
 * @since 1.7.0
 */
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => {
  return {
    concat: (x, y) => (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.value, y.value)))
  }
}

/**
 * @since 1.7.0
 */
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => {
  return {
    ...getApplySemigroup(M),
    empty: right(M.empty)
  }
}

const map = <L, A, B>(ma: Either<L, A>, f: (a: A) => B): Either<L, B> => {
  return isLeft(ma) ? ma : right(f(ma.value))
}

const ap = <L, A, B>(mab: Either<L, (a: A) => B>, ma: Either<L, A>): Either<L, B> => {
  return isLeft(mab) ? mab : fold<L, A, Either<L, B>>(ma, left, a => right(mab.value(a)))
}

const chain = <L, A, B>(ma: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> => {
  return isLeft(ma) ? ma : f(ma.value)
}

const bimap = <L, V, A, B>(ma: Either<L, A>, f: (u: L) => V, g: (a: A) => B): Either<V, B> => {
  return isLeft(ma) ? left(f(ma.value)) : right(g(ma.value))
}

const alt = <L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
  return isLeft(fx) ? fy : fx
}

const extend = <L, A, B>(ma: Either<L, A>, f: (ma: Either<L, A>) => B): Either<L, B> => {
  return isLeft(ma) ? ma : right(f(ma))
}

const reduce = <L, A, B>(ma: Either<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return isLeft(ma) ? b : f(b, ma.value)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: Either<L, A>, f: (a: A) => M): M => {
  return isLeft(fa) ? M.empty : f(fa.value)
}

const foldr = <L, A, B>(fa: Either<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return isLeft(fa) ? b : f(fa.value, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(
  ma: Either<L, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Either<L, B>> => {
  return isLeft(ma) ? F.of(left(ma.value)) : F.map<B, Either<L, B>>(f(ma.value), of)
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ma: Either<L, HKT<F, A>>): HKT<F, Either<L, A>> => {
  return isLeft(ma) ? F.of(left(ma.value)) : F.map<A, Either<L, A>>(ma.value, right)
}

const chainRec = <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>): Either<L, B> => {
  return tailRec(
    f(a),
    e =>
      isLeft(e)
        ? right<Either<L, B>>(left(e.value))
        : isLeft(e.value)
          ? left(f(e.value.value))
          : right(right(e.value.value))
  )
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 1.0.0
 */
export const left = <L>(l: L): Either<L, never> => {
  return { _tag: 'Left', value: l }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 1.0.0
 */
export const right = <A>(a: A): Either<never, A> => {
  return { _tag: 'Right', value: a }
}

const of = right

/**
 * @since 1.0.0
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
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => {
  return fa._tag === 'None' ? left(defaultValue) : right(fa.value)
}

/**
 * Lazy version of `fromOption`
 *
 * @since 1.3.0
 */
export const fromOptionL = <L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => {
  return fa._tag === 'None' ? left(defaultValue()) : right(fa.value)
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 1.0.0
 */
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => {
  return a == null ? left(defaultValue) : right(a)
}

/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 1.0.0
 */
export const toError = (e: unknown): Error => {
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
 * @since 1.11.0
 */
export const tryCatch = <L, A>(f: Lazy<A>, onError: (e: unknown) => L): Either<L, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onError(e))
  }
}

/**
 * @since 1.0.0
 */
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.isFailure() ? left(fa.value) : right(fa.value)
}

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isLeft = <L, A>(ma: Either<L, A>): ma is Left<L> => {
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
 * @since 1.0.0
 */
export const isRight = <L, A>(ma: Either<L, A>): ma is Right<A> => {
  return isLeft(ma) ? false : true
}

/**
 * Builds `Compactable` instance for `Either` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> {
  const compact = <A>(fa: Either<L, Option<A>>): Either<L, A> => {
    if (isLeft(fa)) {
      return fa
    }
    if (fa.value._tag === 'None') {
      return left(ML.empty)
    }
    return right(fa.value.value)
  }
  const separate = <A, B>(fa: Either<L, Either<A, B>>): Separated<Either<L, A>, Either<L, B>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    if (isLeft(fa.value)) {
      return {
        left: right(fa.value.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(fa.value.value)
    }
  }

  return {
    URI,
    _L: phantom,
    compact,
    separate
  }
}

/**
 * @since 2.0.0
 */
export function mapLeft<L, A, M>(ma: Either<L, A>, f: (l: L) => M): Either<M, A> {
  return isLeft(ma) ? left(f(ma.value)) : ma
}

/**
 * @since 2.0.0
 */
export function swap<L, A>(ma: Either<L, A>): Either<A, L> {
  return isLeft(ma) ? right(ma.value) : left(ma.value)
}

/**
 * @since 2.0.0
 */
export function orElse<L, A, M>(ma: Either<L, A>, f: (l: L) => Either<M, A>): Either<M, A> {
  return isLeft(ma) ? f(ma.value) : ma
}

/**
 * @since 2.0.0
 */
export function getOrElse<L, A>(ma: Either<L, A>, a: A): A {
  return isLeft(ma) ? a : ma.value
}

/**
 * @since 2.0.0
 */
export function getOrElseL<L, A>(ma: Either<L, A>, f: (l: L) => A): A {
  return isLeft(ma) ? f(ma.value) : ma.value
}

/**
 * @since 2.0.0
 */
export function filterOrElse<L, A, B extends A>(ma: Either<L, A>, refinement: Refinement<A, B>, zero: L): Either<L, B>
export function filterOrElse<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: L): Either<L, A>
export function filterOrElse<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: L): Either<L, A> {
  return isLeft(ma) ? ma : predicate(ma.value) ? ma : left(zero)
}

/**
 * @since 2.0.0
 */
export function filterOrElseL<L, A, B extends A>(
  ma: Either<L, A>,
  refinement: Refinement<A, B>,
  zero: (a: A) => L
): Either<L, B>
export function filterOrElseL<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Either<L, A>
export function filterOrElseL<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Either<L, A> {
  return isLeft(ma) ? ma : predicate(ma.value) ? ma : left(zero(ma.value))
}

/**
 * Builds `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(ML)
  const partitionMap = <RL, RR, A>(
    fa: Either<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<L, RL>, Either<L, RR>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    const e = f(fa.value)
    if (isLeft(e)) {
      return {
        left: right(e.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(e.value)
    }
  }
  const partition = <A>(fa: Either<L, A>, p: Predicate<A>): Separated<Either<L, A>, Either<L, A>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    if (p(fa.value)) {
      return {
        left: left(ML.empty),
        right: right(fa.value)
      }
    }
    return {
      left: right(fa.value),
      right: left(ML.empty)
    }
  }
  const filterMap = <A, B>(fa: Either<L, A>, f: (a: A) => Option<B>): Either<L, B> => {
    if (isLeft(fa)) {
      return fa
    }
    const optionB = f(fa.value)
    if (optionB._tag === 'Some') {
      return right(optionB.value)
    }
    return left(ML.empty)
  }
  const filter = <A>(fa: Either<L, A>, p: Predicate<A>): Either<L, A> => filterOrElse(fa, p, ML.empty)
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
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  const filterableEither = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.separate)
  }

  return {
    ...filterableEither,
    traverse,
    sequence,
    reduce,
    foldMap,
    foldr,
    wither,
    wilt
  }
}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError).value, { a: 1 })
 * assert.deepStrictEqual(parseJSON('{"a":}', toError).value, new SyntaxError('Unexpected token } in JSON at position 5'))
 *
 * @since 1.16.0
 */
export const parseJSON = <L>(s: string, onError: (reason: unknown) => L): Either<L, unknown> => {
  return tryCatch(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).value, '{"a":1}')
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError).value, new TypeError('Converting circular structure to JSON'))
 *
 * @since 1.16.0
 */
export const stringifyJSON = <L>(u: unknown, onError: (reason: unknown) => L): Either<L, string> => {
  return tryCatch(() => JSON.stringify(u), onError)
}

const throwError = left

const fromEither = identity

/**
 * @since 1.0.0
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
  foldr,
  traverse,
  sequence,
  bimap,
  alt,
  extend,
  chainRec,
  throwError,
  fromEither,
  fromOption: (o, e) => (o._tag === 'None' ? throwError(e) : of(o.value))
}
