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
import { Applicative as ApplicativeHKT, Applicative2, Applicative2C } from './Applicative'
import { Apply2 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Compactable2C, Separated } from './Compactable'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2 } from './Foldable'
import { bindTo_, bind_, flow, identity, Lazy, pipe, Predicate, Refinement, tuple } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2 } from './Monad'
import { MonadThrow2 } from './MonadThrow'
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
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === 'Left'

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
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
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export const left = <E = never, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export const right = <E = never, A = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable(() => 'nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromNullable = <E>(e: Lazy<E>) => <A>(a: A): Either<E, NonNullable<A>> =>
  a == null ? left(e()) : right(a as NonNullable<A>)

/**
 * Constructs a new `Either` from a function that might throw.
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/Either'
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
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('{"a":1}', E.parseJSON(E.toError)), E.right({ a: 1 }))
 * assert.deepStrictEqual(pipe('{"a":}', E.parseJSON(E.toError)), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.0.0
 */
export const parseJSON = <E>(onError: (reason: unknown) => E) => (s: string): Either<E, Json> =>
  tryCatch(() => JSON.parse(s), onError)

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe({ a: 1 }, E.stringifyJSON(E.toError)), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     circular,
 *     E.stringifyJSON(E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export const stringifyJSON = <E>(onError: (reason: unknown) => E) => (u: unknown): Either<E, string> =>
  tryCatch(() => JSON.stringify(u), onError)

/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromOption, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(1),
 *     fromOption(() => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     none,
 *     fromOption(() => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Either<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
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
 * import { fold, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
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
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A = getOrElseW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.9.0
 */
export function fromNullableK<E>(
  e: Lazy<E>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Either<E, NonNullable<B>> {
  const from = fromNullable(e)
  return (f) => (...a) => from(f(...a))
}

/**
 * @category combinators
 * @since 2.9.0
 */
export function chainNullableK<E>(
  e: Lazy<E>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>> {
  const from = fromNullableK(e)
  return (f) => chain(from(f))
}

/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 2.0.0
 */
export function swap<E, A>(ma: Either<E, A>): Either<A, E> {
  return isLeft(ma) ? right(ma.left) : left(ma.right)
}

/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 2.0.0
 */
export function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A> {
  return (ma) => (isLeft(ma) ? onLeft(ma.left) : ma)
}

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E1 | E2, A>
} = <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): (<E1>(ma: Either<E1, A>) => Either<E1 | E2, A>) =>
  chainW((a) => (predicate(a) ? right(a) : left(onFalse(a))))

/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { filterOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     right(-1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('a'),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('a')
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
} = filterOrElseW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const ap_: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const chain_: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const reduce_: Foldable2<URI>['reduce'] = (fa, b, f) => pipe(fa, reduce(b, f))
/* istanbul ignore next */
const foldMap_: Foldable2<URI>['foldMap'] = (M) => (fa, f) => {
  const foldMapM = foldMap(M)
  return pipe(fa, foldMapM(f))
}
/* istanbul ignore next */
const reduceRight_: Foldable2<URI>['reduceRight'] = (fa, b, f) => pipe(fa, reduceRight(b, f))
const traverse_ = <F>(
  F: ApplicativeHKT<F>
): (<E, A, B>(ta: Either<E, A>, f: (a: A) => HKT<F, B>) => HKT<F, Either<E, B>>) => {
  const traverseF = traverse(F)
  return (ta, f) => pipe(ta, traverseF(f))
}
/* istanbul ignore next */
const bimap_: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const mapLeft_: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const alt_: Alt2<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const extend_: Extend2<URI>['extend'] = (wa, f) => pipe(wa, extend(f))
const chainRec_: ChainRec2<URI>['chainRec'] = (a, f) =>
  tailRec(f(a), (e) =>
    isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
  )

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B> = (f) => (fa) =>
  isLeft(fa) ? fa : right(f(fa.right))

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B> = (f, g) => (
  fa
) => (isLeft(fa) ? left(f(fa.left)) : right(g(fa.right)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A> = (f) => (fa) =>
  isLeft(fa) ? left(f(fa.left)) : fa

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <D, A>(fa: Either<D, A>) => <E, B>(fab: Either<E, (a: A) => B>) => Either<D | E, B> = (fa) => (fab) =>
  isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B> = apW

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A> = (fb) =>
  flow(
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: Either<E, B>): (<A>(fa: Either<E, A>) => Either<E, B>) =>
  flow(
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.of('a'), E.right('a'))
 *
 * @category Applicative
 * @since 2.7.0
 */
export const of: Applicative2<URI>['of'] = right

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW = <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>): Either<D | E, B> =>
  isLeft(ma) ? ma : f(ma.right)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B> = chainW

/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, A> = (f) => (
  ma
) =>
  pipe(
    ma,
    chainW((a) =>
      pipe(
        f(a),
        map(() => a)
      )
    )
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A> = chainFirstW

/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Monad`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(fa: Either<E1, A>) => Either<E1 | E2, A | B> = (
  that
) => (fa) => (isLeft(fa) ? that() : fa)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A> = altW

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B> = (f) => (wa) =>
  isLeft(wa) ? wa : right(f(wa))

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(b, fa.right)

/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import * as E from 'fp-ts/Either'
 * import { monoidString } from 'fp-ts/Monoid'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(monoidString)(yell)),
 *   'a!',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(monoidString)(yell)),
 *   monoidString.empty,
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M = (M) => (f) => (fa) =>
  isLeft(fa) ? M.empty : f(fa.right)

/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(fa.right, b)

/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.Applicative)(A.head)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(A.head)),
 *   O.none,
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(F: ApplicativeHKT<F>) => <A, B>(f: (a: A) => HKT<F, B>) => <E>(
  ta: Either<E, A>
): HKT<F, Either<E, B>> => (isLeft(ta) ? F.of(left(ta.left)) : pipe(f(ta.right), F.map(right)))

/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
 *   O.none
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: ApplicativeHKT<F>) => <E, A>(
  ma: Either<E, HKT<F, A>>
): HKT<F, Either<E, A>> => (isLeft(ma) ? F.of(left(ma.left)) : pipe(ma.right, F.map(right)))

/**
 * @category MonadThrow
 * @since 2.6.3
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

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
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
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
 * import { getApplySemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
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
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 3.0.0
 */
export function getCompactable<E>(M: Monoid<E>): Compactable2C<URI, E> {
  const empty = left(M.empty)

  const compact = <A>(ma: Either<E, Option<A>>): Either<E, A> => {
    return isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value)
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
    compact,
    separate
  }
}

/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 3.0.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const empty = left(M.empty)

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
    return ob._tag === 'None' ? empty : right(ob.value)
  }

  const filter = <A>(ma: Either<E, A>, predicate: Predicate<A>): Either<E, A> =>
    isLeft(ma) ? ma : predicate(ma.right) ? ma : empty

  return {
    URI,
    filter,
    filterMap,
    partition,
    partitionMap
  }
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
export function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E> {
  const C = getCompactable(M)

  const wither = <F>(
    F: ApplicativeHKT<F>
  ): (<A, B>(ma: Either<E, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<E, B>>) => {
    const traverseF = traverse_(F)
    return (ma, f) => pipe(traverseF(ma, f), F.map(C.compact))
  }

  const wilt = <F>(
    F: ApplicativeHKT<F>
  ): (<A, B, C>(
    ma: Either<E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Either<E, B>, Either<E, C>>>) => {
    const traverseF = traverse_(F)
    return (ma, f) => pipe(traverseF(ma, f), F.map(C.separate))
  }

  return {
    URI,
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
    map,
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
    map,
    alt: (me, that) => {
      if (isRight(me)) {
        return me
      }
      const ea = that()
      return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea
    }
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
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map,
  of,
  chain: chain_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable2<URI> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable2<URI> = {
  URI,
  map,
  traverse: traverse_,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt2<URI> = {
  URI,
  map,
  alt: alt_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Extend: Extend2<URI> = {
  URI,
  map,
  extend: extend_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ChainRec: ChainRec2<URI> = {
  URI,
  chainRec: chainRec_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadThrow: MonadThrow2<URI> = {
  URI,
  throwError: throwError
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
 * import { exists, left, right } from 'fp-ts/Either'
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

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: Either<never, {}> = of({})

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N): (<E, A>(fa: Either<E, A>) => Either<E, { [K in N]: A }>) =>
  map(bindTo_(name))

/**
 * @since 2.8.0
 */
export const bindW = <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<D, B>
): (<E>(fa: Either<E, A>) => Either<D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  chainW((a) =>
    pipe(
      f(a),
      map((b) => bind_(a, name, b))
    )
  )

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E, B>
) => (fa: Either<E, A>) => Either<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apSW = <A, N extends string, D, B>(
  name: Exclude<N, keyof A>,
  fb: Either<D, B>
): (<E>(fa: Either<E, A>) => Either<D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    map((a) => (b: B) => bind_(a, name, b)),
    apW(fb)
  )

/**
 * @since 2.8.0
 */
export const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E, B>
) => (fa: Either<E, A>) => Either<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apSW

// -------------------------------------------------------------------------------------
// pipeable sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Either<never, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(a: Either<E, A>) => Either<E, readonly [A]> = map(tuple)

/**
 * @since 3.0.0
 */
export const apTW = <E2, B>(fb: Either<E2, B>) => <E1, A extends ReadonlyArray<unknown>>(
  fas: Either<E1, A>
): Either<E1 | E2, readonly [...A, B]> =>
  pipe(
    fas,
    map((a) => (b: B): readonly [...A, B] => [...a, b]),
    apW(fb)
  )

/**
 * @since 3.0.0
 */
export const apT: <E, B>(
  fb: Either<E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Either<E, A>) => Either<E, readonly [...A, B]> = apTW

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 *
 * @since 2.9.0
 */
export const traverseArrayWithIndex = <E, A, B>(f: (index: number, a: A) => Either<E, B>) => (
  arr: ReadonlyArray<A>
): Either<E, ReadonlyArray<B>> => {
  // tslint:disable-next-line: readonly-array
  const out: Array<B> = []
  for (let i = 0; i < arr.length; i++) {
    const e = f(i, arr[i])
    if (e._tag === 'Left') {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

/**
 * map an array using provided function to Either then transform to Either of the array
 * this function have the same behavior of `A.traverse(E.either)` but it's optimized and perform better
 *
 * @example
 *
 *
 * import { traverseArray, left, right, fromPredicate } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/ReadonlyArray'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray((x) => right(x))
 *   ),
 *   right(arr)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray(
 *       fromPredicate(
 *         (x) => x > 5,
 *         () => 'a'
 *       )
 *     )
 *   ),
 *   left('a')
 * )
 * @since 2.9.0
 */
export const traverseArray: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (arr: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * convert an array of either to an either of array
 * this function have the same behavior of `A.sequence(E.either)` but it's optimized and perform better
 *
 * @example
 *
 * import { sequenceArray, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/ReadonlyArray'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, A.map(right), sequenceArray), right(arr))
 * assert.deepStrictEqual(pipe(arr, A.map(right), A.cons(left('Error')), sequenceArray), left('Error'))
 *
 * @since 2.9.0
 */
export const sequenceArray: <E, A>(arr: ReadonlyArray<Either<E, A>>) => Either<E, ReadonlyArray<A>> = traverseArray(
  identity
)
