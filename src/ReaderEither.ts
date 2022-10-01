/**
 * @since 3.0.0
 */
import type * as semigroupKind from './SemigroupKind'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as compactable from './Compactable'
import * as either from './Either'
import * as eitherT from './EitherT'
import type * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromReader_ from './FromReader'
import type { LazyArg } from './f'
import { flow, identity, SK } from './f'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'

import Either = either.Either
import Reader = reader.Reader

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderEitherTypeLambda extends TypeLambda {
  readonly type: ReaderEither<this['In1'], this['Out2'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E>(e: E) => ReaderEither<unknown, E, never> = /*#__PURE__*/ eitherT.left(reader.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A>(a: A) => ReaderEither<unknown, never, A> = /*#__PURE__*/ eitherT.right(reader.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A>(ma: Reader<R, A>) => ReaderEither<R, never, A> = /*#__PURE__*/ eitherT.rightKind(
  reader.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E>(me: Reader<R, E>) => ReaderEither<R, E, never> = /*#__PURE__*/ eitherT.leftKind(
  reader.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderEither: <R1, R2, E, A>(f: (r1: R1) => ReaderEither<R2, E, A>) => ReaderEither<R1 & R2, E, A> =
  reader.asksReader

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => ReaderEither<unknown, E, A> = reader.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: Reader<R, A>) => ReaderEither<R, never, A> = rightReader

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: Reader<R, either.Either<E, A>>) => Reader<R, B | C> = /*#__PURE__*/ eitherT.match(reader.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchReader: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => Reader<R2, B>,
  onSuccess: (a: A) => Reader<R3, C>
) => <R1>(ma: Reader<R1, either.Either<E, A>>) => Reader<R1 & R2 & R3, B | C> = /*#__PURE__*/ eitherT.matchKind(
  reader.Monad
)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <R, A>(ma: ReaderEither<R, E, A>) => Reader<R, A | B> =
  /*#__PURE__*/ eitherT.getOrElse(reader.Functor)

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElseReader: <E, R2, B>(
  onError: (e: E) => Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => Reader<R1 & R2, A | B> = /*#__PURE__*/ eitherT.getOrElseKind(reader.Monad)

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => Reader<R, E | A> = /*#__PURE__*/ eitherT.toUnion(
  reader.Functor
)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 3.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderEither<R1, E, A>) => ReaderEither<R2, E, A> =
  reader.local

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, R1, E2, B>(
  onError: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.catchAll(
  reader.Monad
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = /*#__PURE__*/ eitherT.swap(
  reader.Functor
)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> =
  /*#__PURE__*/ eitherT.map(reader.Functor)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(self: ReaderEither<R, E, A>) => ReaderEither<R, G, B> = /*#__PURE__*/ eitherT.mapBoth(reader.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, G, A> =
  /*#__PURE__*/ eitherT.mapLeft(reader.Functor)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ eitherT.flatMap(
  reader.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderEitherTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <R2, E2, _>(
  that: ReaderEither<R2, E2, _>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, E2, A>(
  that: ReaderEither<R2, E2, A>
) => <R1, E1, _>(self: ReaderEither<R1, E1, _>) => ReaderEither<R1 & R2, E2 | E1, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(self: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReaderEither<unknown, never, A> = right

/**
 * @since 3.0.0
 */
export const unit: ReaderEither<unknown, never, void> = of(undefined)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category SemigroupK
 * @since 3.0.0
 */
export const orElse: <R2, E2, B>(
  that: ReaderEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.orElse(
  reader.Monad
)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  Semigroup: Semigroup<E>
): applicative.Applicative<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>> => ({
  map,
  ap: apply.getApComposition(reader.Apply, either.getValidatedApplicative(Semigroup)),
  of
})

/**
 * The default [`SemigroupKind`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedSemigroupKind = <E>(
  Semigroup: Semigroup<E>
): semigroupKind.SemigroupKind<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>> => {
  return {
    combineKind: eitherT.getValidatedCombineKind(reader.Monad, Semigroup)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(
  M: Monoid<E>
): compactable.Compactable<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.ValidatedTypeLambda<either.EitherTypeLambda, E>> = { map: either.map }
  return {
    compact: compactable.getCompactComposition(reader.Functor, C),
    separate: compactable.getSeparateComposition(reader.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(
  M: Monoid<E>
): filterable.Filterable<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>> => {
  return {
    partitionMap: (f) => partitionMap(f, () => M.empty),
    filterMap: (f) => filterMap(f, () => M.empty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderEitherTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderEitherTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderEitherTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReaderEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(fa: ReaderEither<R1, E1, A>, fb: ReaderEither<R2, E2, B>) => ReaderEither<R1 & R2, E1 | E2, C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReaderEither`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderEither<R1, E1, A>,
  fb: ReaderEither<R2, E2, B>,
  fc: ReaderEither<R3, E3, C>
) => ReaderEither<R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderEitherTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderEitherTypeLambda> = {
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
export const tap: <A, R2, E2, _>(
  f: (a: A) => ReaderEither<R2, E2, _>
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2, _>(
  onError: (e: E1) => ReaderEither<R2, E2, _>
) => <R1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ eitherT.tapLeft(
  reader.Monad
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderEitherTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupKind: semigroupKind.SemigroupKind<ReaderEitherTypeLambda> = {
  combineKind: orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderEitherTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderEither<R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderEither<R, never, A> = /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => (...a: A) => ReaderEither<R, never, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B> = /*#__PURE__*/ fromReader_.flatMapReader(
  FromReader,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<ReaderEitherTypeLambda> = {
  fromEither
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => ReaderEither<unknown, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => ReaderEither<unknown, E, B> = /*#__PURE__*/ fromEither_.liftOption(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <R, E1>(self: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B> = /*#__PURE__*/ fromEither_.flatMapOption(
  FromEither,
  Flattenable
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    c: C
  ) => ReaderEither<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => ReaderEither<unknown, E, B>
} = /*#__PURE__*/ fromEither_.liftPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <R, E1>(
    ma: ReaderEither<R, E1, C>
  ) => ReaderEither<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <R, E1>(
    mb: ReaderEither<R, E1, B>
  ) => ReaderEither<R, E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.filterMap(
  FromEither,
  Flattenable
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <R>(
    self: ReaderEither<R, E, C>
  ) => readonly [ReaderEither<R, E, C>, ReaderEither<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <R>(
    self: ReaderEither<R, E, B>
  ) => readonly [ReaderEither<R, E, B>, ReaderEither<R, E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => <R>(self: ReaderEither<R, E, A>) => readonly [ReaderEither<R, E, B>, ReaderEither<R, E, C>] =
  /*#__PURE__*/ fromEither_.partitionMap(FromEither, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => ReaderEither<unknown, E, B> = /*#__PURE__*/ fromEither_.liftEither(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, B> = /*#__PURE__*/ fromEither_.flatMapEither(
  FromEither,
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => ReaderEither<unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: LazyArg<E>
) => (...a: A) => ReaderEither<unknown, E, NonNullable<B>> = /*#__PURE__*/ fromEither_.liftNullable(FromEither)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: LazyArg<E2>
) => <R, E1>(self: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullable(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReaderEither<unknown, never, {}> = /*#__PURE__*/ of(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReaderEither<unknown, never, readonly []> = /*#__PURE__*/ of(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, E2, B, A, C>(
  that: ReaderEither<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, C> = /*#__PURE__*/ apply.zipWith(Apply)

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
export const bracket: <R, E, A, B>(
  aquire: ReaderEither<R, E, A>,
  use: (a: A) => ReaderEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderEither<R, E, void>
) => ReaderEither<R, E, B> = /*#__PURE__*/ eitherT.bracket(reader.Monad)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(reader.traverseReadonlyNonEmptyArrayWithIndex(f), reader.map(either.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderEither<R, E, A>>
) => ReaderEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
