/**
 * @since 3.0.0
 */
import * as AltModule from './Alt'
import * as ApplicativeModule from './Applicative'
import * as ApplyModule from './Apply'
import * as BifunctorModule from './Bifunctor'
import * as ChainModule from './Chain'
import * as CompactableModule from './Compactable'
import * as EitherModule from './Either'
import * as EitherTModule from './EitherT'
import * as FilterableModule from './Filterable'
import * as FromEitherModule from './FromEither'
import * as FromReaderModule from './FromReader'
import { flow, identity, Lazy, SK } from './function'
import * as FunctorModule from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import * as MonadModule from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import * as PointedModule from './Pointed'
import type { Predicate } from './Predicate'
import * as ReaderModule from './Reader'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'

import Either = EitherModule.Either
import Reader = ReaderModule.Reader

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
export const left: <E, R = unknown, A = never>(e: E) => ReaderEither<R, E, A> = /*#__PURE__*/ EitherTModule.left(
  ReaderModule.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A> = /*#__PURE__*/ EitherTModule.right(
  ReaderModule.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(
  ma: Reader<R, A>
) => ReaderEither<R, E, A> = /*#__PURE__*/ EitherTModule.rightF(ReaderModule.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(
  me: Reader<R, E>
) => ReaderEither<R, E, A> = /*#__PURE__*/ EitherTModule.leftF(ReaderModule.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderEither: <R1, R2, E, A>(f: (r1: R1) => ReaderEither<R2, E, A>) => ReaderEither<R1 & R2, E, A> =
  ReaderModule.asksReader

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A, R = unknown>(fa: Either<E, A>) => ReaderEither<R, E, A> = ReaderModule.of

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
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: Reader<R, EitherModule.Either<E, A>>) => Reader<R, B | C> = /*#__PURE__*/ EitherTModule.match(
  ReaderModule.Functor
)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, R2, B, A, R3, C = B>(
  onLeft: (e: E) => Reader<R2, B>,
  onRight: (a: A) => Reader<R3, C>
) => <R1>(
  ma: Reader<R1, EitherModule.Either<E, A>>
) => Reader<R1 & R2 & R3, B | C> = /*#__PURE__*/ EitherTModule.matchE(ReaderModule.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(
  onLeft: (e: E) => B
) => <R, A>(ma: ReaderEither<R, E, A>) => Reader<R, A | B> = /*#__PURE__*/ EitherTModule.getOrElse(ReaderModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, R2, B>(
  onLeft: (e: E) => Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => Reader<R1 & R2, A | B> = /*#__PURE__*/ EitherTModule.getOrElseE(
  ReaderModule.Monad
)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => Reader<R, E | A> = /*#__PURE__*/ EitherTModule.toUnion(
  ReaderModule.Functor
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
  ReaderModule.local

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ EitherTModule.orElse(
  ReaderModule.Monad
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderEither<R2, E2, B>
) => <R1, A>(
  ma: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ EitherTModule.orElseFirst(ReaderModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => Reader<R, E2>
) => <A>(fa: ReaderEither<R, E1, A>) => ReaderEither<R, E2, A> = /*#__PURE__*/ EitherTModule.orLeft(ReaderModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = /*#__PURE__*/ EitherTModule.swap(
  ReaderModule.Functor
)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = /*#__PURE__*/ EitherTModule.map(ReaderModule.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, B> = /*#__PURE__*/ EitherTModule.bimap(ReaderModule.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fea: ReaderEither<R, E, A>) => ReaderEither<R, G, A> = /*#__PURE__*/ EitherTModule.mapLeft(
  ReaderModule.Functor
)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(
  fab: ReaderEither<R1, E1, (a: A) => B>
) => ReaderEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ EitherTModule.ap(ReaderModule.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown, E = never>(a: A) => ReaderEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ EitherTModule.chain(
  ReaderModule.Monad
)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <R2, E2, B>(
  second: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = /*#__PURE__*/ EitherTModule.alt(
  ReaderModule.Monad
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
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeReaderValidation = <E>(
  S: Semigroup<E>
): ApplicativeModule.Applicative<ReaderEitherFFixedE<E>> => ({
  map,
  ap: ApplyModule.ap(ReaderModule.Apply, EitherModule.getApplicativeValidation(S)),
  of
})

/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getAltReaderValidation = <E>(S: Semigroup<E>): AltModule.Alt<ReaderEitherFFixedE<E>> => {
  return {
    map,
    alt: EitherTModule.altValidation(ReaderModule.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): CompactableModule.Compactable<ReaderEitherFFixedE<E>> => {
  const C = EitherModule.getCompactable(M)
  const F: FunctorModule.Functor<EitherModule.EitherFFixedE<E>> = { map: EitherModule.map }
  return {
    compact: CompactableModule.compact(ReaderModule.Functor, C),
    separate: CompactableModule.separate(ReaderModule.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): FilterableModule.Filterable<ReaderEitherFFixedE<E>> => {
  const F = EitherModule.getFilterable(M)
  return {
    filter: FilterableModule.filter(ReaderModule.Functor, F),
    filterMap: FilterableModule.filterMap(ReaderModule.Functor, F),
    partition: FilterableModule.partition(ReaderModule.Functor, F),
    partitionMap: FilterableModule.partitionMap(ReaderModule.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: FunctorModule.Functor<ReaderEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(
  a: A
) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> = /*#__PURE__*/ FunctorModule.flap(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: PointedModule.Pointed<ReaderEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: ApplyModule.Apply<ReaderEitherF> = {
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
) => <R1, E1, A>(
  first: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ ApplyModule.apFirst(Apply)

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
) => <R1, E1, A>(
  first: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, B> = /*#__PURE__*/ ApplyModule.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: ApplicativeModule.Applicative<ReaderEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: ChainModule.Chain<ReaderEitherF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: MonadModule.Monad<ReaderEitherF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  first: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, A> = /*#__PURE__*/ ChainModule.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: BifunctorModule.Bifunctor<ReaderEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: AltModule.Alt<ReaderEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReaderModule.FromReader<ReaderEitherF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderEither<R, E, R> = /*#__PURE__*/ FromReaderModule.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderEither<R, E, A> = /*#__PURE__*/ FromReaderModule.asks(
  FromReader
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <E = never>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ FromReaderModule.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E = never>(
  ma: ReaderEither<R1, E, A>
) => ReaderEither<R1 & R2, E, B> = /*#__PURE__*/ FromReaderModule.chainReaderK(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1, E = never>(
  ma: ReaderEither<R1, E, A>
) => ReaderEither<R1 & R2, E, A> = /*#__PURE__*/ FromReaderModule.chainFirstReaderK(FromReader, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<ReaderEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(
  onNone: Lazy<E>
) => <A, R = unknown>(fa: Option<A>) => ReaderEither<R, E, A> = /*#__PURE__*/ FromEitherModule.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <R = unknown>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ FromEitherModule.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = /*#__PURE__*/ FromEitherModule.chainOptionK(
  FromEither,
  Chain
)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): <R = unknown>(a: A) => ReaderEither<R, A, B>
  <A>(predicate: Predicate<A>): <B extends A, R = unknown>(b: B) => ReaderEither<R, A, B>
} = /*#__PURE__*/ FromEitherModule.fromPredicate(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => <R = unknown>(c: C) => ReaderEither<R, C, B> = /*#__PURE__*/ FromEitherModule.fromRefinement(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderEither<R, E1, B>
  ) => ReaderEither<R, E1 | E2, B>
} = /*#__PURE__*/ FromEitherModule.filterOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => EitherModule.Either<E, B>
) => <R = unknown>(...a: A) => ReaderEither<R, E, B> = /*#__PURE__*/ FromEitherModule.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, B> = /*#__PURE__*/ FromEitherModule.chainEitherK(
  FromEither,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(
  ma: ReaderEither<R, E1, A>
) => ReaderEither<R, E1 | E2, A> = /*#__PURE__*/ FromEitherModule.chainFirstEitherK(FromEither, Chain)

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
) => <R, E, A>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N]: A }> = /*#__PURE__*/ FunctorModule.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<
  R,
  E,
  { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
> = /*#__PURE__*/ FunctorModule.let(Functor)

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
  f: <A2 extends A>(a: A | A2) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = /*#__PURE__*/ ChainModule.bind(Chain)

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
) => ReaderEither<
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = /*#__PURE__*/ ApplyModule.apS(Apply)

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
export const tupled: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<R, E, readonly [A]> = /*#__PURE__*/ FunctorModule.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ ApplyModule.apT(Apply)

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
) => ReaderEither<R, E, B> = /*#__PURE__*/ EitherTModule.bracket(ReaderModule.Monad)

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
  flow(
    ReaderModule.traverseReadonlyNonEmptyArrayWithIndex(f),
    ReaderModule.map(EitherModule.traverseReadonlyNonEmptyArrayWithIndex(SK))
  )

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
