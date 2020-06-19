/**
 * ```ts
 * type Either<E, A> = Left<E> | Right<A>
 * ```
 *
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
import { Applicative, Applicative2, Applicative2C } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, ChainRec2C, tailRec } from './ChainRec'
import { Separated } from './Compactable'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Foldable2 } from './Foldable'
import { identity, Lazy, Predicate, Refinement } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2, Monad2C } from './Monad'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse2, Traversable2 } from './Traversable'
import { Witherable2C } from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === 'Left'

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> => ma._tag === 'Right'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @category constructors
 * @since 2.0.0
 */
export const left = <E = never, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @category constructors
 * @since 2.0.0
 */
export const right = <E = never, A = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

// TODO: make lazy in v3
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

// TODO: `onError => Lazy<A> => Either` in v3
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
 * Copied from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
 *
 * @since 2.6.7
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord

/**
 * @since 2.6.7
 */
export interface JsonRecord {
  readonly [key: string]: Json
}

/**
 * @since 2.6.7
 */
export interface JsonArray extends ReadonlyArray<Json> {}

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
export function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, Json> {
  return tryCatch(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
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
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Either<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/lib/Either'
 * import { pipe } from 'fp-ts/lib/function'
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
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW = <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>): A | B =>
  isLeft(ma) ? onLeft(ma.left) : ma.right

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A = getOrElseW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

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
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: Either<E, A>) =>
  chain_(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B> = (f) => (fa) => map_(fa, f)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B> = (f, g) => (
  fa
) => bimap_(fa, f, g)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A> = (f) => (fa) => mapLeft_(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B> = (fa) => (fab) =>
  ap_(fab, fa)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>): Either<E, B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW = <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>): Either<D | E, B> => chain_(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B> = chainW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A> = (mma) => chain_(mma, identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A> = (that) => (fa) =>
  alt_(fa, that)

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
 * @category Traversable
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(ta: Either<E, A>) => HKT<F, Either<E, B>>) => {
  const traverseF = traverse_(F)
  return (f) => (fa) => traverseF(fa, f)
}

/**
 * @category Traversable
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <E, A>(
  ma: Either<E, HKT<F, A>>
): HKT<F, Either<E, A>> => {
  return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<E, A>>(ma.right, right)
}

/**
 * @category MonadThrow
 * @since 2.6.3
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const map_: <E, A, B>(fa: Either<E, A>, f: (a: A) => B) => Either<E, B> = (ma, f) =>
  isLeft(ma) ? ma : right(f(ma.right))
const ap_: <E, A, B>(fab: Either<E, (a: A) => B>, fa: Either<E, A>) => Either<E, B> = (mab, ma) =>
  isLeft(mab) ? mab : isLeft(ma) ? ma : right(mab.right(ma.right))
const of = right
const chain_: <D, A, E, B>(fa: Either<D, A>, f: (a: A) => Either<E, B>) => Either<D | E, B> = (ma, f) =>
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
const bimap_: <E, A, G, B>(fea: Either<E, A>, f: (e: E) => G, g: (a: A) => B) => Either<G, B> = (fea, f, g) =>
  isLeft(fea) ? left(f(fea.left)) : right(g(fea.right))
const mapLeft_: <E, A, G>(fea: Either<E, A>, f: (e: E) => G) => Either<G, A> = (fea, f) =>
  isLeft(fea) ? left(f(fea.left)) : fea
const alt_: <E, A>(fa: Either<E, A>, that: Lazy<Either<E, A>>) => Either<E, A> = (fa, that) =>
  isLeft(fa) ? that() : fa
const extend_: <E, A, B>(wa: Either<E, A>, f: (wa: Either<E, A>) => B) => Either<E, B> = (wa, f) =>
  isLeft(wa) ? wa : right(f(wa))
const chainRec_: <E, A, B>(a: A, f: (a: A) => Either<E, Either<A, B>>) => Either<E, B> = (a, f) =>
  tailRec(f(a), (e) =>
    isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
  )

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Either'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Either<E, A>
  }
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
 * concatenated using the provided `Semigroup`
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
 * are concatenated using the provided `Semigroup`
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
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
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
 * @since 2.7.0
 */
export function getApplicativeValidation<E>(SE: Semigroup<E>): Applicative2C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) =>
      isLeft(fab)
        ? isLeft(fa)
          ? left(SE.concat(fab.left, fa.left))
          : fab
        : isLeft(fa)
        ? fa
        : right(fab.right(fa.right)),
    of
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getAltValidation<E>(SE: Semigroup<E>): Alt2C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map: map_,
    alt: (me, that) => {
      if (isRight(me)) {
        return me
      }
      const ea = that()
      return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea
    }
  }
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export function getValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2C<URI, E> &
  Extend2<URI> &
  ChainRec2C<URI, E> &
  MonadThrow2C<URI, E> {
  const applicativeValidation = getApplicativeValidation(SE)
  const altValidation = getAltValidation(SE)
  return {
    URI,
    _E: undefined as any,
    map: map_,
    of,
    chain: chain_,
    bimap: bimap_,
    mapLeft: mapLeft_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    extend: extend_,
    traverse: traverse_,
    sequence,
    chainRec: chainRec_,
    throwError,
    ap: applicativeValidation.ap,
    alt: altValidation.alt
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> {
  return {
    concat: (x, y) =>
      isLeft(x) ? (isLeft(y) ? left(SE.concat(x.left, y.left)) : x) : isLeft(y) ? y : right(SA.concat(x.right, y.right))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorEither: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeEither: Applicative2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const monadEither: Monad2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const foldableEither: Foldable2<URI> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const traversableEither: Traversable2<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const bifunctorEither: Bifunctor2<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const altEither: Alt2<URI> = {
  URI,
  map: map_,
  alt: alt_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const extendEither: Extend2<URI> = {
  URI,
  map: map_,
  extend: extend_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const chainRecEither: ChainRec2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  chain: chain_,
  chainRec: chainRec_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const monadThrowEither: MonadThrow2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_,
  throwError: throwError
}

// TODO: remove in v3
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
  of,
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
  throwError: throwError
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e))
}

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
