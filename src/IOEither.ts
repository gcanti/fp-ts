/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.
 *
 * @since 3.0.0
 */
import * as AltModule from './Alt'
import type { Applicative } from './Applicative'
import * as ApplyModule from './Apply'
import * as BifunctorModule from './Bifunctor'
import * as ChainModule from './Chain'
import * as CompactableModule from './Compactable'
import * as EitherModule from './Either'
import * as EitherTModule from './EitherT'
import * as FilterableModule from './Filterable'
import * as FromEitherModule from './FromEither'
import * as FromIOModule from './FromIO'
import { flow, identity, Lazy, pipe, SK } from './function'
import * as FunctorModule from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import * as IOModule from './IO'
import * as MonadModule from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import * as PointedModule from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'

import Either = EitherModule.Either
import IO = IOModule.IO

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => IOEither<E, A> = /*#__PURE__*/ EitherTModule.left(IOModule.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => IOEither<E, A> = /*#__PURE__*/ EitherTModule.right(IOModule.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => IOEither<E, A> = /*#__PURE__*/ EitherTModule.rightF(IOModule.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => IOEither<E, A> = /*#__PURE__*/ EitherTModule.leftF(IOModule.Functor)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => IOEither<E, A> = IOModule.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, E = never>(fa: IO<A>) => IOEither<E, A> = rightIO

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
) => (ma: IOEither<E, A>) => IO<B | C> = /*#__PURE__*/ EitherTModule.match(IOModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A, C = B>(
  onLeft: (e: E) => IO<B>,
  onRight: (a: A) => IO<C>
) => (ma: IOEither<E, A>) => IO<B | C> = /*#__PURE__*/ EitherTModule.matchE(IOModule.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, B>(
  onLeft: (e: E) => B
) => <A>(ma: IOEither<E, A>) => IO<A | B> = /*#__PURE__*/ EitherTModule.getOrElse(IOModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, B>(
  onLeft: (e: E) => IO<B>
) => <A>(ma: IOEither<E, A>) => IO<A | B> = /*#__PURE__*/ EitherTModule.getOrElseE(IOModule.Monad)

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
export const tryCatch = <A>(f: Lazy<A>): IOEither<unknown, A> => () => EitherModule.tryCatch(f)

/**
 * Converts a function that may throw to one returning a `IOEither`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => IOEither<E, B>) => (...a) =>
  pipe(
    tryCatch(() => f(...a)),
    mapLeft(onThrow)
  )

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: IOEither<E, A>) => IO<E | A> = /*#__PURE__*/ EitherTModule.toUnion(IOModule.Functor)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, A | B> = /*#__PURE__*/ EitherTModule.orElse(IOModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = /*#__PURE__*/ EitherTModule.orElseFirst(IOModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstIOK: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IOEither<E, A> = (onLeft) =>
  orElseFirst(fromIOK(onLeft))

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, E2>(
  onLeft: (e: E1) => IO<E2>
) => <A>(fa: IOEither<E1, A>) => IOEither<E2, A> = /*#__PURE__*/ EitherTModule.orLeft(IOModule.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = /*#__PURE__*/ EitherTModule.swap(IOModule.Functor)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ EitherTModule.map(
  IOModule.Functor
)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fea: IOEither<E, A>) => IOEither<G, B> = /*#__PURE__*/ EitherTModule.bimap(IOModule.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <A>(fea: IOEither<E, A>) => IOEither<G, A> = /*#__PURE__*/ EitherTModule.mapLeft(IOModule.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E1 | E2, B> = /*#__PURE__*/ EitherTModule.ap(IOModule.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => IOEither<E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = /*#__PURE__*/ EitherTModule.chain(IOModule.Monad)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A> = /*#__PURE__*/ chain(
  identity
)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <E2, B>(
  second: Lazy<IOEither<E2, B>>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E2, A | B> = /*#__PURE__*/ EitherTModule.alt(IOModule.Monad)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface IOEitherF extends HKT {
  readonly type: IOEither<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface IOEitherFFixedE<E> extends HKT {
  readonly type: IOEither<E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeIOValidation = <E>(S: Semigroup<E>): Applicative<IOEitherFFixedE<E>> => ({
  map,
  ap: ApplyModule.ap(IOModule.Apply, EitherModule.getApplicativeValidation(S)),
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
export const getAltIOValidation = <E>(S: Semigroup<E>): AltModule.Alt<IOEitherFFixedE<E>> => {
  return {
    map,
    alt: EitherTModule.altValidation(IOModule.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): CompactableModule.Compactable<IOEitherFFixedE<E>> => {
  const C = EitherModule.getCompactable(M)
  const F: FunctorModule.Functor<EitherModule.EitherFFixedE<E>> = { map: EitherModule.map }
  return {
    compact: CompactableModule.compact(IOModule.Functor, C),
    separate: CompactableModule.separate(IOModule.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): FilterableModule.Filterable<IOEitherFFixedE<E>> => {
  const F = EitherModule.getFilterable(M)
  return {
    filter: FilterableModule.filter(IOModule.Functor, F),
    filterMap: FilterableModule.filterMap(IOModule.Functor, F),
    partition: FilterableModule.partition(IOModule.Functor, F),
    partitionMap: FilterableModule.partitionMap(IOModule.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: FunctorModule.Functor<IOEitherF> = {
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
) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> = /*#__PURE__*/ FunctorModule.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: PointedModule.Pointed<IOEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: BifunctorModule.Bifunctor<IOEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: ApplyModule.Apply<IOEitherF> = {
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
export const apFirst: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E1 | E2, A> = /*#__PURE__*/ ApplyModule.apFirst(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E1 | E2, B> = /*#__PURE__*/ ApplyModule.apSecond(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative<IOEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: ChainModule.Chain<IOEitherF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ ChainModule.ap(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: ApplyModule.Apply<IOEitherF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative<IOEitherF> = {
  map,
  ap: apSeq,
  of
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
export const chainFirst: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(first: IOEither<E1, A>) => IOEither<E1 | E2, A> = /*#__PURE__*/ ChainModule.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: MonadModule.Monad<IOEitherF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: AltModule.Alt<IOEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIOModule.FromIO<IOEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOModule.IO<B>
) => <E = never>(...a: A) => IOEither<E, B> = /*#__PURE__*/ FromIOModule.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => IOModule.IO<B>
) => <E>(first: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ FromIOModule.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => IOModule.IO<B>
) => <E>(first: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ FromIOModule.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<IOEitherF> = {
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
) => <A>(fa: Option<A>) => IOEither<E, A> = /*#__PURE__*/ FromEitherModule.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ FromEitherModule.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => (ma: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ FromEitherModule.chainOptionK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = /*#__PURE__*/ FromEitherModule.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => EitherModule.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = /*#__PURE__*/ FromEitherModule.chainFirstEitherK(
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
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOEither<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOEither<B, B>
} = /*#__PURE__*/ FromEitherModule.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: IOEither<E1, B>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
} = /*#__PURE__*/ FromEitherModule.filterOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => EitherModule.Either<E, B>
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ FromEitherModule.fromEitherK(FromEither)

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
  release: (a: A, e: EitherModule.Either<E2, B>) => IOEither<E3, void>
) => IOEither<E1 | E2 | E3, B> = /*#__PURE__*/ EitherTModule.bracket(IOModule.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IOEither<never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ FunctorModule.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(
  fa: IOEither<E, A>
) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ FunctorModule.let(
  Functor
)

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
  f: <A2 extends A>(a: A | A2) => IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ ChainModule.bind(
  Chain
)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ ApplyModule.apS(
  ApplyPar
)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IOEither<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(fa: IOEither<E, A>) => IOEither<E, readonly [A]> = /*#__PURE__*/ FunctorModule.tupled(
  Functor
)

/**
 * @since 3.0.0
 */
export const apT: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(
  fas: IOEither<E1, A>
) => IOEither<E1 | E2, readonly [...A, B]> = /*#__PURE__*/ ApplyModule.apT(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>> = (f) =>
  flow(
    IOModule.traverseReadonlyNonEmptyArrayWithIndex(f),
    IOModule.map(EitherModule.traverseReadonlyNonEmptyArrayWithIndex(SK))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(
  arr: ReadonlyArray<IOEither<E, A>>
) => IOEither<E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, E, B>(f: (index: number, a: A) => IOEither<E, B>) => (
  as: ReadonlyNonEmptyArray<A>
): IOEither<E, ReadonlyNonEmptyArray<B>> => () => {
  const e = f(0, _.head(as))()
  if (_.isLeft(e)) {
    return e
  }
  const out: NonEmptyArray<B> = [e.right]
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArraySeq = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexSeq((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <E, A>(
  arr: ReadonlyArray<IOEither<E, A>>
) => IOEither<E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArraySeq(identity)
