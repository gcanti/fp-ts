/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.
 *
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import * as either from './Either'
import type { Either } from './Either'
import * as eitherT from './EitherT'
import type * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import * as io from './IO'
import type { IO } from './IO'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface IOEitherTypeLambda extends TypeLambda {
  readonly type: IOEither<this['Out2'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => IOEither<E, never> = /*#__PURE__*/ eitherT.left(io.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => IOEither<never, A> = /*#__PURE__*/ eitherT.right(io.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A>(ma: IO<A>) => IOEither<never, A> = /*#__PURE__*/ eitherT.rightF(io.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E>(me: IO<E>) => IOEither<E, never> = /*#__PURE__*/ eitherT.leftF(io.Functor)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => IOEither<E, A> = io.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => IOEither<never, A> = rightIO

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (ma: IOEither<E, A>) => IO<B | C> = /*#__PURE__*/ eitherT.match(io.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchWithEffect: <E, B, A, C = B>(
  onError: (e: E) => IO<B>,
  onSuccess: (a: A) => IO<C>
) => (ma: IOEither<E, A>) => IO<B | C> = /*#__PURE__*/ eitherT.matchWithEffect(io.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <A>(ma: IOEither<E, A>) => IO<A | B> =
  /*#__PURE__*/ eitherT.getOrElse(io.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseWithEffect: <E, B>(onError: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> =
  /*#__PURE__*/ eitherT.getOrElseWithEffect(io.Monad)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw.
 *
 * See also [`tryCatchK`](#tryCatchK).
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch =
  <A, E>(f: LazyArg<A>, onThrow: (error: unknown) => E): IOEither<E, A> =>
  () =>
    either.tryCatch(f, onThrow)

/**
 * Converts a function that may throw to one returning a `IOEither`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => B,
    onThrow: (error: unknown) => E
  ): ((...a: A) => IOEither<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onThrow)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: IOEither<E, A>) => IO<E | A> = /*#__PURE__*/ eitherT.toUnion(io.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, E2, B>(
  onError: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, A | B> = /*#__PURE__*/ eitherT.orElse(io.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = /*#__PURE__*/ eitherT.swap(io.Functor)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ eitherT.map(
  io.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: IOEither<E, A>) => IOEither<G, B> =
  /*#__PURE__*/ eitherT.mapBoth(io.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: IOEither<E, A>) => IOEither<G, A> =
  /*#__PURE__*/ eitherT.mapLeft(io.Functor)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IOEither<never, A> = right

/**
 * @since 3.0.0
 */
export const unit: IOEither<never, void> = of(undefined)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(f: (a: A) => IOEither<E2, B>) => <E1>(self: IOEither<E1, A>) => IOEither<E1 | E2, B> =
  /*#__PURE__*/ eitherT.flatMap(io.Monad)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category SemigroupK
 * @since 3.0.0
 */
export const combineK: <E2, B>(
  second: LazyArg<IOEither<E2, B>>
) => <E1, A>(self: IOEither<E1, A>) => IOEither<E2, A | B> = /*#__PURE__*/ eitherT.combineK(io.Monad)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * See [`getValidatedApplicative`](./Either.ts.html#getvalidatedapplicative).
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  S: Semigroup<E>
): applicative.Applicative<either.ValidatedTypeLambda<IOEitherTypeLambda, E>> => ({
  map,
  ap: apply.getApComposition(io.Apply, either.getValidatedApplicative(S)),
  of
})

/**
 * The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * @category instances
 * @since 3.0.0
 */
export const getValidatedSemigroupK = <E>(
  S: Semigroup<E>
): semigroupK.SemigroupK<either.ValidatedTypeLambda<IOEitherTypeLambda, E>> => {
  return {
    combineK: eitherT.getValidatedCombineK(io.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(
  M: Monoid<E>
): compactable.Compactable<either.ValidatedTypeLambda<IOEitherTypeLambda, E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.ValidatedTypeLambda<either.EitherTypeLambda, E>> = { map: either.map }
  return {
    compact: compactable.getCompactComposition(io.Functor, C),
    separate: compactable.getSeparateComposition(io.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(
  M: Monoid<E>
): filterable.Filterable<either.ValidatedTypeLambda<IOEitherTypeLambda, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, () => M.empty),
    filterMap: (f) => filterMap(f, () => M.empty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IOEitherTypeLambda> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<IOEitherTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<IOEitherTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<IOEitherTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <E2, _>(that: IOEither<E2, _>) => <E1, A>(self: IOEither<E1, A>) => IOEither<E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <E2, A>(that: IOEither<E2, A>) => <E1, _>(self: IOEither<E1, _>) => IOEither<E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, E2, _>(f: (a: A) => IOEither<E2, _>) => <E1>(self: IOEither<E1, A>) => IOEither<E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <E2, A>(fa: IOEither<E2, A>) => <E1, B>(self: IOEither<E1, (a: A) => B>) => IOEither<E2 | E1, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IOEitherTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `IOEither`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: IOEither<E1, A>, fb: IOEither<E2, B>) => IOEither<E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `IOEither`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: IOEither<E1, A>, fb: IOEither<E2, B>, fc: IOEither<E3, C>) => IOEither<E1 | E2 | E3, D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IOEitherTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IOEitherTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tapError: <E1, E2, _>(
  onError: (e: E1) => IOEither<E2, _>
) => <A>(self: IOEither<E1, A>) => IOEither<E1 | E2, A> = /*#__PURE__*/ eitherT.tapLeft(io.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<IOEitherTypeLambda> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<IOEitherTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => IOEither<never, void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => IOEither<never, void> = /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => IOEither<never, B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => <E>(self: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<IOEitherTypeLambda> = {
  fromEither
}

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => IOEither<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (ma: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ fromEither_.flatMapOptionK(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = /*#__PURE__*/ fromEither_.flatMapEitherK(
  FromEither,
  Flattenable
)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => IOEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => IOEither<E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    ma: IOEither<E1, C>
  ) => IOEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    mb: IOEither<E1, B>
  ) => IOEither<E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ fromEither_.filterMap(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: IOEither<E, C>
  ) => readonly [IOEither<E, C>, IOEither<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: IOEither<E, B>
  ) => readonly [IOEither<E, B>, IOEither<E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => (self: IOEither<E, A>) => readonly [IOEither<E, B>, IOEither<E, C>] = /*#__PURE__*/ fromEither_.partitionMap(
  FromEither,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => IOEither<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOEither<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: IOEither<E, A>) => IOEither<E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullableK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 3.0.0
 */
export const bracket: <E1, A, E2, B, E3>(
  acquire: IOEither<E1, A>,
  use: (a: A) => IOEither<E2, B>,
  release: (a: A, e: Either<E2, B>) => IOEither<E3, void>
) => IOEither<E1 | E2 | E3, B> = /*#__PURE__*/ eitherT.bracket(io.Monad)

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: IOEither<never, {}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: IOEither<E, A>) => IOEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: IOEither<E, A>) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category struct sequencing
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const DoTuple: IOEither<never, readonly []> = /*#__PURE__*/ of(_.DoTuple)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <E, A>(self: IOEither<E, A>) => IOEither<E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZip: <A extends ReadonlyArray<unknown>, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, readonly [...A, B]> =
  /*#__PURE__*/ flattenable.flatZip(Flattenable)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZipPar: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(self: IOEither<E1, A>) => IOEither<E1 | E2, readonly [...A, B]> =
  /*#__PURE__*/ apply.flatZipPar(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>> = (f) =>
  flow(io.traverseReadonlyNonEmptyArrayWithIndex(f), io.map(either.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : DoTuple)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => IOEither<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): IOEither<E, ReadonlyNonEmptyArray<B>> =>
  () => {
    const e = f(0, _.head(as))()
    if (_.isLeft(e)) {
      return e
    }
    const out: _.NonEmptyArray<B> = [e.right]
    for (let i = 1; i < as.length; i++) {
      const e = f(i, as[i])()
      if (_.isLeft(e)) {
        return e
      }
      out.push(e.right)
    }
    return _.right(out)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : DoTuple)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
