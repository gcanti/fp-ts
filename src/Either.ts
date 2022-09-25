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
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as flattenableRec from './FlattenableRec'
import type * as compactable from './Compactable'
import * as eq from './Eq'
import type * as extendable from './Extendable'
import type * as filterable from './Filterable'
import type * as foldable from './Foldable'
import * as fromEither_ from './FromEither'
import type { LazyArg } from './function'
import { flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import * as traversable from './Traversable'
import * as filterableE from './FilterableE'

// Note: tapError doesn't make sense for `Either`, would be like mapLeft

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * @category model
 * @since 3.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface EitherF extends HKT {
  readonly type: Either<this['Covariant2'], this['Covariant1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface Validated<F extends HKT, E> extends HKT {
  readonly type: Kind<F, this['Invariant1'], this['Contravariant1'], this['Covariant3'], E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 3.0.0
 */
export const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E> = _.isLeft

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 3.0.0
 */
export const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A> = _.isRight

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => Either<E, never> = _.left

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => Either<never, A> = _.right

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const onError  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onSuccess = (value: number): string => `Ok: ${value}`
 *
 * assert.strictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onError , onSuccess)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     E.left(['error 1', 'error 2']),
 *     E.match(onError , onSuccess)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const match =
  <E, B, A, C = B>(onError: (e: E) => B, onSuccess: (a: A) => C) =>
  (ma: Either<E, A>): B | C =>
    isLeft(ma) ? onError(ma.left) : onSuccess(ma.right)

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('error'),
 *     E.getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse =
  <E, B>(onError: (e: E) => B) =>
  <A>(ma: Either<E, A>): A | B =>
    isLeft(ma) ? onError(ma.left) : ma.right

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const parse = E.fromNullable(() => 'nully')
 *
 * assert.deepStrictEqual(parse(1), E.right(1))
 * assert.deepStrictEqual(parse(null), E.left('nully'))
 *
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => Either<E, NonNullable<A>> =
  (onNullable) => (a) =>
    _.fromNullableOrElse(a, onNullable)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK = <E>(
  onNullable: LazyArg<E>
): (<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Either<E, NonNullable<B>>) => {
  const from = fromNullable(onNullable)
  return (f) => flow(f, from)
}

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK = <E>(
  onNullable: LazyArg<E>
): (<A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>) =>
  flow(fromNullableK(onNullable), flatMap)

/**
 * Constructs a new `Either` from a function that might throw.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { identity } from 'fp-ts/function'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> =>
 *   E.tryCatch(() => unsafeHead(as), identity)
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch = <A, E>(f: LazyArg<A>, onThrow: (error: unknown) => E): Either<E, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onThrow(e))
  }
}

/**
 * Converts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => B,
    onThrow: (error: unknown) => E
  ): ((...a: A) => Either<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onThrow)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: Either<E, A>) => E | A = /*#__PURE__*/ match(identity, identity)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 3.0.0
 */
export const swap = <E, A>(ma: Either<E, A>): Either<A, E> => (isLeft(ma) ? right(ma.left) : left(ma.right))

/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElse =
  <E1, E2, B>(onError: (e: E1) => Either<E2, B>) =>
  <A>(ma: Either<E1, A>): Either<E2, A | B> =>
    isLeft(ma) ? onError(ma.left) : ma

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Either<E, A>) => Either<G, B> =
  (f, g) => (fa) =>
    isLeft(fa) ? left(f(fa.left)) : right(g(fa.right))

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: Either<E, A>) => Either<G, A> =
  /*#__PURE__*/ bifunctor.getDefaultMapLeft<EitherF>(mapBoth)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E1 | E2, B> =
  (fa) => (fab) =>
    isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => Either<never, A> = right

/**
 * @since 3.0.0
 */
export const unit: Either<never, void> = of(undefined)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap =
  <A, E2, B>(f: (a: A) => Either<E2, B>) =>
  <E1>(ma: Either<E1, A>): Either<E1 | E2, B> =>
    isLeft(ma) ? ma : f(ma.right)

/**
 * @category FlattenableRec
 * @since 3.0.0
 */
export const flatMapRec = <A, E, B>(f: (a: A) => Either<E, Either<A, B>>): ((a: A) => Either<E, B>) =>
  flow(
    f,
    flattenableRec.tailRec<Either<E, Either<A, B>>, Either<E, B>>((e) =>
      isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
    )
  )

/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Flattenable`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: Either<E1, Either<E2, A>>) => Either<E1 | E2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).
 *
 * | x        | y        | pipe(x, combineK(() => y) |
 * | -------- | -------- | ------------------------- |
 * | left(a)  | left(b)  | left(b)                   |
 * | left(a)  | right(2) | right(2)                  |
 * | right(1) | left(b)  | right(1)                  |
 * | right(1) | right(2) | right(1)                  |
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.combineK(() => E.left('b'))
 *   ),
 *   E.left('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.combineK(() => E.right(2))
 *   ),
 *   E.right(2)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.combineK(() => E.left('b'))
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.combineK(() => E.right(2))
 *   ),
 *   E.right(1)
 * )
 *
 * @category instance operations
 * @since 3.0.0
 */
export const combineK: <E2, B>(second: LazyArg<Either<E2, B>>) => <E1, A>(self: Either<E1, A>) => Either<E2, A | B> =
  (that) => (fa) =>
    isLeft(fa) ? that() : fa

/**
 * @category Extendable
 * @since 3.0.0
 */
export const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B> = (f) => (wa) =>
  isLeft(wa) ? wa : right(f(wa))

/**
 * Derivable from `Extendable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>> = /*#__PURE__*/ extend(identity)

/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const combine = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, combine)),
 *   'prefix:a',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, combine)),
 *   'prefix',
 * )
 *
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(b, fa.right)

/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import * as E from 'fp-ts/Either'
 * import { Monoid } from 'fp-ts/string'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(Monoid)(yell)),
 *   'a!',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(Monoid)(yell)),
 *   Monoid.empty,
 * )
 *
 * @category Foldable
 * @since 3.0.0
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
 * const combine = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, combine)),
 *   'a:postfix',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, combine)),
 *   'postfix',
 * )
 *
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(fa.right, b)

/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none,
 * )
 *
 * @category Traversable
 * @since 3.0.0
 */
export const traverse =
  <F extends HKT>(F: applicative.Applicative<F>) =>
  <A, FS, FR, FW, FE, B>(f: (a: A) => Kind<F, FS, FR, FW, FE, B>) =>
  <E>(ta: Either<E, A>): Kind<F, FS, FR, FW, FE, Either<E, B>> =>
    isLeft(ta) ? F.of(left(ta.left)) : pipe(f(ta.right), F.map(right))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> => ({
  show: (ma) => (isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <E, A>(EE: eq.Eq<E>, EA: eq.Eq<A>): eq.Eq<Either<E, A>> =>
  eq.fromEquals(
    (second) => (first) =>
      isLeft(first)
        ? isLeft(second) && EE.equals(second.left)(first.left)
        : isRight(second) && EA.equals(second.right)(first.right)
  )

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * combined using the provided `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = E.getSemigroup<number, string>(N.SemigroupSum)
 * assert.deepStrictEqual(pipe(E.left('a'), S.combine(E.left('b'))), E.left('a'))
 * assert.deepStrictEqual(pipe(E.left('a'), S.combine(E.right(2))), E.right(2))
 * assert.deepStrictEqual(pipe(E.right(1), S.combine(E.left('b'))), E.right(1))
 * assert.deepStrictEqual(pipe(E.right(1), S.combine(E.right(2))), E.right(3))
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A, E>(S: Semigroup<A>): Semigroup<Either<E, A>> => ({
  combine: (second) => (first) =>
    isLeft(second) ? first : isLeft(first) ? second : right(S.combine(second.right)(first.right))
})

/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): compactable.Compactable<Validated<EitherF, E>> => {
  const empty = left(M.empty)

  const compact: <A>(foa: Either<E, Option<A>>) => Either<E, A> = (ma) =>
    isLeft(ma) ? ma : _.isNone(ma.right) ? empty : right(ma.right.value)

  const separate: <A, B>(fe: Either<E, Either<A, B>>) => readonly [Either<E, A>, Either<E, B>] = (ma) =>
    isLeft(ma) ? [ma, ma] : isLeft(ma.right) ? [right(ma.right.left), empty] : [empty, right(ma.right.right)]

  return {
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
export const getFilterable = <E>(M: Monoid<E>): filterable.Filterable<Validated<EitherF, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, () => M.empty),
    filterMap: (f) => filterMap(f, () => M.empty)
  }
}

/**
 * Builds `FilterableE` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 3.0.0
 */
export const getFilterableE = <E>(M: Monoid<E>): filterableE.FilterableE<Validated<EitherF, E>> => {
  const C = getCompactable(M)
  const T: traversable.Traversable<Validated<EitherF, E>> = { traverse }
  return {
    filterMapE: filterableE.getDefaultFilterMapE(T, C),
    partitionMapE: filterableE.getDefaultPartitionMapE(T, C)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<EitherF> = {
  mapBoth,
  mapLeft: mapError
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B> =
  /*#__PURE__*/ bifunctor.getDefaultMap<EitherF>(mapBoth)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<EitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Either<E, (a: A) => B>) => Either<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<EitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<EitherF> = {
  map,
  ap
}

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <E2, B>(second: Either<E2, B>) => <E1, A>(self: Either<E1, A>) => Either<E1 | E2, A> =
  /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <E2, B>(second: Either<E2, B>) => <E1, A>(self: Either<E1, A>) => Either<E1 | E2, B> =
  /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<EitherF> = {
  map,
  ap,
  of
}

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide an way to combined them via a `Semigroup`.
 *
 * @example
 * import * as A from 'fp-ts/Apply'
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const parsePerson = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     E.bindPar('name', parseString(input.name)),
 *     E.bindPar('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error
 *
 * const Applicative = E.getValidatedApplicative(
 *   pipe(string.Semigroup, S.intercalate(', '))
 * )
 *
 * const bindPar = A.bindPar(Applicative)
 *
 * const parsePersonAll = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     bindPar('name', parseString(input.name)),
 *     bindPar('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(S: Semigroup<E>): applicative.Applicative<Validated<EitherF, E>> => ({
  map,
  ap: (fa) => (fab) =>
    isLeft(fab)
      ? isLeft(fa)
        ? left(S.combine(fa.left)(fab.left))
        : fab
      : isLeft(fa)
      ? fa
      : right(fab.right(fa.right)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<EitherF> = {
  map,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<EitherF> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, E2, _>(f: (a: A) => Either<E2, _>) => <E1>(self: Either<E1, A>) => Either<E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRec: flattenableRec.FlattenableRec<EitherF> = {
  flatMapRec: flatMapRec
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<EitherF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<EitherF> = {
  traverse
}

/**
 * @since 3.0.0
 */
export const sequence: <F extends HKT>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FW, FE, A>(fa: Either<E, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, Either<E, A>> =
  /*#__PURE__*/ traversable.sequence<EitherF>(Traversable)

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<EitherF> = {
  combineK
}

/**
 * The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * const parse = (u: unknown): E.Either<string, string | number> =>
 *   pipe(
 *     parseString(u),
 *     E.combineK<string, string | number>(() => parseNumber(u))
 *   )
 *
 * assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error
 *
 * const SemigroupK = E.getValidatedSemigroupK(pipe(string.Semigroup, S.intercalate(', ')))
 *
 * const parseAll = (u: unknown): E.Either<string, string | number> =>
 *   pipe(parseString(u), SemigroupK.combineK(() => parseNumber(u) as E.Either<string, string | number>))
 *
 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedSemigroupK = <E>(S: Semigroup<E>): semigroupK.SemigroupK<Validated<EitherF, E>> => ({
  combineK: (second) => (first) => {
    if (isRight(first)) {
      return first
    }
    const ea = second()
    return isLeft(ea) ? left(S.combine(ea.left)(first.left)) : ea
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Extendable: extendable.Extendable<EitherF> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<EitherF> = {
  fromEither: identity
}

/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some(1),
 *     E.fromOption(() => 'error')
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     E.fromOption(() => 'error')
 *   ),
 *   E.left('error')
 * )
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => Either<E, A> = _.fromOption

/**
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
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => Either<E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.filter(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(-1),
 *     E.filter(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.filter(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('a')
 * )
 *
 * @category combinators
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    self: Either<E1, C>
  ) => Either<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    self: Either<E1, B>
  ) => Either<E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(f: (a: A) => Option<B>, onNone: (a: A) => E) => (self: Either<E, A>) => Either<E, B> =
  /*#__PURE__*/ fromEither_.filterMap(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: Either<E, C>
  ) => readonly [Either<E, C>, Either<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: Either<E, B>
  ) => readonly [Either<E, B>, Either<E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => (self: Either<E, A>) => readonly [Either<E, B>, Either<E, C>] = /*#__PURE__*/ fromEither_.partitionMap(
  FromEither,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (ma: Either<E, A>) => Either<E, B> = /*#__PURE__*/ fromEither_.flatMapOptionK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a value is a member of a `Either`.
 *
 * @since 3.0.0
 */
export const elem =
  <A>(E: eq.Eq<A>) =>
  (a: A) =>
  <E>(ma: Either<E, A>): boolean =>
    isLeft(ma) ? false : E.equals(ma.right)(a)

/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.strictEqual(f(E.left('a')), false)
 * assert.strictEqual(f(E.right(1)), false)
 * assert.strictEqual(f(E.right(3)), true)
 *
 * @since 3.0.0
 */
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: Either<unknown, A>): boolean =>
    isLeft(ma) ? false : predicate(ma.right)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Either<never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <E, A>(fa: Either<E, A>) => Either<E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Either<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(fa: Either<E, A>) => Either<E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <E2, B>(
  fb: Either<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(fas: Either<E1, A>) => Either<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.apT(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => Either<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): Either<E, ReadonlyNonEmptyArray<B>> => {
    const e = f(0, _.head(as))
    if (isLeft(e)) {
      return e
    }
    const out: _.NonEmptyArray<B> = [e.right]
    for (let i = 1; i < as.length; i++) {
      const e = f(i, as[i])
      if (isLeft(e)) {
        return e
      }
      out.push(e.right)
    }
    return right(out)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => Either<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => Either<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<Either<E, A>>) => Either<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
