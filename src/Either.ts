/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * @since 2.0.0
 */

import { Alt2, Alt2C } from './Alt'
import { Applicative, Applicative2 } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec, ChainRec2C } from './ChainRec'
import { Separated } from './Compactable'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Foldable2 } from './Foldable'
import { Lazy, Predicate, identity, Refinement } from './function'
import { HKT } from './HKT'
import { Monad2, Monad2C } from './Monad'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2, PipeableTraverse2 } from './Traversable'
import { Witherable2C } from './Witherable'
import { Apply2 } from './Apply'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Either: Either<E, A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'Either'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @category model
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @category model
 * @since 2.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @category constructors
 * @since 2.0.0
 */
export function left<E = never, A = never>(e: E): Either<E, A> {
  return { _tag: 'Left', left: e }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @category constructors
 * @since 2.0.0
 */
export function right<E = never, A = never>(a: A): Either<E, A> {
  return { _tag: 'Right', right: a }
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/lib/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 2.0.0
 */
export function fromNullable<E>(e: E): <A>(a: A) => Either<E, NonNullable<A>> {
  return <A>(a: A) => (a == null ? left(e) : right(a as NonNullable<A>))
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
 * @category constructors
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
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export function fold<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B): (ma: Either<E, A>) => B {
  return (ma) => (isLeft(ma) ? onLeft(ma.left) : onRight(ma.right))
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> {
  return {
    show: (ma) => (isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`)
  }
}

/**
 * @category instances
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
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (x, y) => (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right)))
  }
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
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
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (x, y) => (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right)))
  }
}

/**
 * @category instances
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
 * @category guards
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
 * @category guards
 * @since 2.0.0
 */
export function isRight<E, A>(ma: Either<E, A>): ma is Right<A> {
  return isLeft(ma) ? false : true
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function swap<E, A>(ma: Either<E, A>): Either<A, E> {
  return isLeft(ma) ? right(ma.left) : left(ma.right)
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> {
  return (ma) => (isLeft(ma) ? onLeft(ma.left) : ma)
}

/**
 * @category destructors
 * @since 2.0.0
 */
export function getOrElse<E, A>(onLeft: (e: E) => A): (ma: Either<E, A>) => A {
  return (ma) => (isLeft(ma) ? onLeft(ma.left) : ma.right)
}

/**
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => A | B = getOrElse as any

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean {
  return (a, ma) => (isLeft(ma) ? false : E.equals(a, ma.right))
}

/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/lib/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
export function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean {
  return (ma) => (isLeft(ma) ? false : predicate(ma.right))
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
 * @category constructors
 * @since 2.0.0
 */
export function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown> {
  return tryCatch(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/pipeable'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string> {
  return tryCatch(() => JSON.stringify(u), onError)
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
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

  const partitionMap = <A, B, C>(
    ma: Either<E, A>,
    f: (a: A) => Either<B, C>
  ): Separated<Either<E, B>, Either<E, C>> => {
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
    const traverseF = traverse_(F)
    return (ma, f) => F.map(traverseF(ma, f), compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<A, B, C>(
    ma: Either<E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Either<E, B>, Either<E, C>>>) => {
    const traverseF = traverse_(F)
    return (ma, f) => F.map(traverseF(ma, f), separate)
  }

  return {
    URI,
    _E: undefined as any,
    map: map_,
    compact,
    separate,
    filter,
    filterMap,
    partition,
    partitionMap,
    traverse: traverse_,
    sequence,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    wither,
    wilt
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2C<URI, E> &
  Extend2<URI> &
  ChainRec2C<URI, E> &
  MonadThrow2C<URI, E> {
  return {
    ...either,
    _E: undefined as any,
    ap: (mab, ma) =>
      isLeft(mab)
        ? isLeft(ma)
          ? left(S.concat(mab.left, ma.left))
          : mab
        : isLeft(ma)
        ? ma
        : right(mab.right(ma.right)),
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
 * @category instances
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
 * @category instances
 * @since 2.0.0
 */
export function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>> {
  return {
    concat: getValidationSemigroup(SE, SA).concat,
    empty: right(SA.empty)
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const map_: <E, A, B>(fa: Either<E, A>, f: (a: A) => B) => Either<E, B> = (ma, f) =>
  isLeft(ma) ? ma : right(f(ma.right))

const ap_: <E, A, B>(fab: Either<E, (a: A) => B>, fa: Either<E, A>) => Either<E, B> = (mab, ma) =>
  isLeft(mab) ? mab : isLeft(ma) ? ma : right(mab.right(ma.right))

const chain_: <E, A, B>(fa: Either<E, A>, f: (a: A) => Either<E, B>) => Either<E, B> = (ma, f) =>
  isLeft(ma) ? ma : f(ma.right)

const reduce_: <E, A, B>(fa: Either<E, A>, b: B, f: (b: B, a: A) => B) => B = (fa, b, f) =>
  isLeft(fa) ? b : f(b, fa.right)

const foldMap_: <M>(M: Monoid<M>) => <E, A>(fa: Either<E, A>, f: (a: A) => M) => M = (M) => (fa, f) =>
  isLeft(fa) ? M.empty : f(fa.right)

const reduceRight_: <E, A, B>(fa: Either<E, A>, b: B, f: (a: A, b: B) => B) => B = (fa, b, f) =>
  isLeft(fa) ? b : f(fa.right, b)

const traverse_ = <F>(F: Applicative<F>) => <E, A, B>(
  ma: Either<E, A>,
  f: (a: A) => HKT<F, B>
): HKT<F, Either<E, B>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<B, Either<E, B>>(f(ma.right), right)
}

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(ta: Either<E, A>) => HKT<F, Either<E, B>>) => {
  const traverseF = traverse_(F)
  return (f) => (fa) => traverseF(fa, f)
}

/**
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <E, A>(
  ma: Either<E, HKT<F, A>>
): HKT<F, Either<E, A>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<E, A>>(ma.right, right)
}

const bimap_: <E, A, G, B>(fea: Either<E, A>, f: (e: E) => G, g: (a: A) => B) => Either<G, B> = (fea, f, g) =>
  isLeft(fea) ? left(f(fea.left)) : right(g(fea.right))

const mapLeft_: <E, A, G>(fea: Either<E, A>, f: (e: E) => G) => Either<G, A> = (fea, f) =>
  isLeft(fea) ? left(f(fea.left)) : fea

const alt_: <E, A>(fx: Either<E, A>, fy: () => Either<E, A>) => Either<E, A> = (fx, fy) => (isLeft(fx) ? fy() : fx)

const extend_: <E, A, B>(wa: Either<E, A>, f: (wa: Either<E, A>) => B) => Either<E, B> = (wa, f) =>
  isLeft(wa) ? wa : right(f(wa))

const chainRec_: <E, A, B>(a: A, f: (a: A) => Either<E, Either<A, B>>) => Either<E, B> = (a, f) =>
  tailRec(f(a), (e) =>
    isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
  )

/**
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: () => Either<E, A>) => (fa: Either<E, A>) => Either<E, A> = (that) => (fa) =>
  alt_(fa, that)

/**
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B> = (fa) => (fab) =>
  ap_(fab, fa)

/**
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>): Either<E, B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B> = (f) => (ma) =>
  chain_(ma, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<E | D, B> = chain as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>> = (wa) => extend_(wa, identity)

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B> = (f) => (ma) =>
  extend_(ma, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A> = (mma) => chain_(mma, identity)

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B> = (f, g) => (
  fa
) => bimap_(fa, f, g)

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B> = (f) => (fa) => map_(fa, f)

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A> = (f) => (fa) => mapLeft_(fa, f)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => Either<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: Either<E, A>) =>
  chain_(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @internal
 */
export const applyEither: Apply2<URI> = {
  URI,
  map: map_,
  ap: ap_
}

/**
 * @internal
 */
export const applicativeEither: Applicative2<URI> = {
  URI,
  map: map_,
  of: right,
  ap: ap_
}

/**
 * @internal
 */
export const bifunctorEither: Bifunctor2<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

/**
 * @category instances
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
  map: map_,
  of: right,
  ap: ap_,
  chain: chain_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  bimap: bimap_,
  mapLeft: mapLeft_,
  alt: alt_,
  extend: extend_,
  chainRec: chainRec_,
  throwError: left
}
