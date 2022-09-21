/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as bifunctor from './Bifunctor'
import * as flat from './Flat'
import * as compactable from './Compactable'
import * as either from './Either'
import * as eitherT from './EitherT'
import * as filterable from './Filterable'
import * as fromEither_ from './FromEither'
import * as fromReader_ from './FromReader'
import type { LazyArg } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
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
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, R = unknown, A = never>(e: E) => ReaderEither<R, E, A> = /*#__PURE__*/ eitherT.left(
  reader.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A> = /*#__PURE__*/ eitherT.right(
  reader.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> = /*#__PURE__*/ eitherT.rightF(
  reader.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> = /*#__PURE__*/ eitherT.leftF(
  reader.Functor
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderEither: <R1, R2, E, A>(f: (r1: R1) => ReaderEither<R2, E, A>) => ReaderEither<R1 & R2, E, A> =
  reader.asksReader

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A, R = unknown>(fa: Either<E, A>) => ReaderEither<R, E, A> = reader.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A, E = never>(fa: Reader<R, A>) => ReaderEither<R, E, A> = rightReader

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
) => <R>(ma: Reader<R, either.Either<E, A>>) => Reader<R, B | C> = /*#__PURE__*/ eitherT.match(reader.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => Reader<R2, B>,
  onSuccess: (a: A) => Reader<R3, C>
) => <R1>(ma: Reader<R1, either.Either<E, A>>) => Reader<R1 & R2 & R3, B | C> = /*#__PURE__*/ eitherT.matchE(
  reader.Monad
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(onError: (e: E) => B) => <R, A>(ma: ReaderEither<R, E, A>) => Reader<R, A | B> =
  /*#__PURE__*/ eitherT.getOrElse(reader.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, R2, B>(
  onError: (e: E) => Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => Reader<R1 & R2, A | B> = /*#__PURE__*/ eitherT.getOrElseE(reader.Monad)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => Reader<R, E | A> = /*#__PURE__*/ eitherT.toUnion(
  reader.Functor
)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

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
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, R1, E2, B>(
  onError: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.orElse(
  reader.Monad
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const tapError: <E1, R2, E2, _>(
  onError: (e: E1) => ReaderEither<R2, E2, _>
) => <R1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ eitherT.tapError(
  reader.Monad
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, R, E2>(
  onError: (e: E1) => Reader<R, E2>
) => <A>(fa: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A> = /*#__PURE__*/ eitherT.orLeft(reader.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = /*#__PURE__*/ eitherT.swap(
  reader.Functor
)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> =
  /*#__PURE__*/ eitherT.map(reader.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, B> = /*#__PURE__*/ eitherT.bimap(reader.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, A> =
  /*#__PURE__*/ eitherT.mapLeft(reader.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ eitherT.ap(reader.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flat
 * @since 3.0.0
 */
export const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ eitherT.flatMap(
  reader.Monad
)

/**
 * Derivable from `Flat`.
 *
 * @category derivable combinators
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
export const combineK: <R2, E2, B>(
  second: LazyArg<ReaderEither<R2, E2, B>>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ eitherT.combineK(
  reader.Monad
)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderEitherF extends HKT {
  readonly type: ReaderEither<this['Contravariant1'], this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderEitherFFixedE<E> extends HKT {
  readonly type: ReaderEither<this['Contravariant1'], E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeReaderValidation = <E>(
  S: Semigroup<E>
): applicative.Applicative<ReaderEitherFFixedE<E>> => ({
  map,
  ap: apply.ap(reader.Apply, either.getApplicativeValidation(S)),
  of
})

/**
 * The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
 * get all errors you need to provide an way to combine them via a `Semigroup`.
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupKReaderValidation = <E>(S: Semigroup<E>): semigroupK.SemigroupK<ReaderEitherFFixedE<E>> => {
  return {
    combineK: eitherT.combineKValidation(reader.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): compactable.Compactable<ReaderEitherFFixedE<E>> => {
  const C = either.getCompactable(M)
  const F: functor.Functor<either.EitherFFixedE<E>> = { map: either.map }
  return {
    compact: compactable.compact(reader.Functor, C),
    separate: compactable.separate(reader.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): filterable.Filterable<ReaderEitherFFixedE<E>> => {
  const F = either.getFilterable(M)
  return {
    filterMap: filterable.filterMap(reader.Functor, F),
    partitionMap: filterable.partitionMap(reader.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<ReaderEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderEitherF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ apply.apFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <R2, E2, B>(
  second: ReaderEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ apply.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flat: flat.Flat<ReaderEitherF> = {
  map,
  flatMap: flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderEitherF> = {
  map,
  of,
  flatMap: flatMap
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Flat`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const tap: <A, R2, E2, _>(
  f: (a: A) => ReaderEither<R2, E2, _>
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ flat.tap(Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<ReaderEitherF> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderEitherF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderEither<R, E, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderEither<R, E, A> =
  /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <E = never>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E = never>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReaderK(FromReader, Flat)

/**
 * @category combinators
 * @since 3.0.0
 */
export const tapReaderK: <A, R2, _>(
  f: (a: A) => Reader<R2, _>
) => <R1, E = never>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, A> = /*#__PURE__*/ fromReader_.tapReaderK(
  FromReader,
  Flat
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<ReaderEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A, R = unknown>(fa: Option<A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => <R = unknown>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.fromOptionKOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionKOrElse: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.flatMapOptionKOrElse(
  FromEither,
  Flat
)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <R = unknown>(b: B) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <R = unknown>(c: C) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.fromRefinementOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <R, E1>(mb: ReaderEither<R, E1, B>) => ReaderEither<R, E2 | E1, B> = /*#__PURE__*/ fromEither_.filterOrElse(
  FromEither,
  Flat
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <R, E1>(ma: ReaderEither<R, E1, C>) => ReaderEither<R, E2 | E1, B> = /*#__PURE__*/ fromEither_.refineOrElse(
  FromEither,
  Flat
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => <R = unknown>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, B> = /*#__PURE__*/ fromEither_.flatMapEitherK(
  FromEither,
  Flat
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const tapEitherK: <A, E2, _>(
  f: (a: A) => Either<E2, _>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, A> = /*#__PURE__*/ fromEither_.tapEitherK(
  FromEither,
  Flat
)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse: <E>(
  onNullable: LazyArg<E>
) => <A, R = unknown>(a: A) => ReaderEither<R, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R = unknown>(...a: A) => ReaderEither<R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.fromNullableKOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableKOrElse: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullableKOrElse(FromEither, Flat)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderEither<unknown, never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flat.bind(Flat)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderEither<unknown, never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, readonly [A]> =
  /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.apT(Apply)

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
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderEither<R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  arr: ReadonlyArray<ReaderEither<R, E, A>>
) => ReaderEither<R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
