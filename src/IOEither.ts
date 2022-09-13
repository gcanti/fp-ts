/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.
 *
 * @since 3.0.0
 */
import type { Alt as Alt_ } from './Alt'
import type { Applicative } from './Applicative'
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply as Apply_,
  apS as apS_,
  apSecond as apSecond_,
  apT as apT_
} from './Apply'
import type { Bifunctor as Bifunctor_ } from './Bifunctor'
import { ap as apSeq_, bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { filter, Filterable, filterMap, partition, partitionMap } from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither as FromEither_,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_,
  chainFirstEitherK as chainFirstEitherK_
} from './FromEither'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import { flow, identity, Lazy, pipe, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import * as I from './IO'
import type { Monad as Monad_ } from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Option } from './Option'

import Either = E.Either
import IO = I.IO

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
export const left: <E, A = never>(e: E) => IOEither<E, A> = /*#__PURE__*/ ET.left(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => IOEither<E, A> = /*#__PURE__*/ ET.right(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => IOEither<E, A> = /*#__PURE__*/ ET.rightF(I.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => IOEither<E, A> = /*#__PURE__*/ ET.leftF(I.Functor)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A>(fa: Either<E, A>) => IOEither<E, A> = I.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, E>(fa: IO<A>) => IOEither<E, A> = rightIO

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  ET.match(I.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: IOEither<E, A>) => IO<B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, B, A>(
  onLeft: (e: E) => IO<B>,
  onRight: (a: A) => IO<B>
) => (ma: IOEither<E, A>) => IO<B> = /*#__PURE__*/ ET.matchE(I.Monad)

/**
 * Less strict version of [`matchE`](#matchE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchEW: <E, B, A, C>(
  onLeft: (e: E) => IO<B>,
  onRight: (a: A) => IO<C>
) => (ma: IOEither<E, A>) => IO<B | C> = matchE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: IOEither<E, A>) => IO<A> = /*#__PURE__*/ ET.getOrElse(
  I.Functor
)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> = /*#__PURE__*/ ET.getOrElseE(
  I.Monad
)

/**
 * Less strict version of [`getOrElseE`](#getOrElseE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseEW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElseE as any

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
export const tryCatch = <A>(f: Lazy<A>): IOEither<unknown, A> => () => E.tryCatch(f)

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
export const toUnion: <E, A>(fa: IOEither<E, A>) => IO<E | A> = /*#__PURE__*/ ET.toUnion(I.Functor)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, E2, A>(
  onLeft: (e: E1) => IOEither<E2, A>
) => (ma: IOEither<E1, A>) => IOEither<E2, A> = /*#__PURE__*/ ET.orElse(I.Monad)

/**
 * Less strict version of [`orElse`](#orElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E, B>(
  onLeft: (e: E) => IOEither<E, B>
) => <A>(ma: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ ET.orElseFirst(I.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = orElseFirst as any

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
) => <A>(fa: IOEither<E1, A>) => IOEither<E2, A> = /*#__PURE__*/ ET.orLeft(I.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = /*#__PURE__*/ ET.swap(I.Functor)

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ ET.map(I.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fea: IOEither<E, A>) => IOEither<G, B> = /*#__PURE__*/ ET.bimap(I.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: IOEither<E, A>) => IOEither<G, A> = /*#__PURE__*/ ET.mapLeft(
  I.Functor
)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E1 | E2, B> = /*#__PURE__*/ ET.ap(I.Apply)

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
export const chain: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ ET.chain(I.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A> = /*#__PURE__*/ chainW(
  identity
)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> = flattenW

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <E, A>(
  second: Lazy<IOEither<E, A>>
) => (first: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ ET.alt(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <E2, B>(
  second: Lazy<IOEither<E2, B>>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E2, A | B> = alt as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface IOEitherF extends HKT {
  readonly type: IOEither<this['Covariant2'], this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface IOEitherFE<E> extends HKT {
  readonly type: IOEither<E, this['Covariant1']>
}

/**
 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeIOValidation = <E>(S: Semigroup<E>): Applicative<IOEitherFE<E>> => ({
  map,
  ap: ap_(I.Apply, E.getApplicativeValidation(S)),
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
export const getAltIOValidation = <E>(S: Semigroup<E>): Alt_<IOEitherFE<E>> => {
  return {
    map,
    alt: ET.altValidation(I.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable<IOEitherFE<E>> => {
  const C = E.getCompactable(M)
  const F: Functor_<E.EitherFE<E>> = { map: E.map }
  return {
    compact: compact_(I.Functor, C),
    separate: separate_(I.Functor, C, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable<IOEitherFE<E>> => {
  const F = E.getFilterable(M)
  return {
    filter: filter(I.Functor, F),
    filterMap: filterMap(I.Functor, F),
    partition: partition(I.Functor, F),
    partitionMap: partitionMap(I.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<IOEitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<IOEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<IOEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply_<IOEitherF> = {
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
export const apFirst: <E, B>(
  second: IOEither<E, B>
) => <A>(first: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ apFirst_(ApplyPar)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirstW: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E1 | E2, A> = apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E, B>(
  second: IOEither<E, B>
) => <A>(first: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ apSecond_(ApplyPar)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecondW: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E1 | E2, B> = apSecond as any

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
export const Chain: Chain_<IOEitherF> = {
  map,
  chain
}

const apSeq = /*#__PURE__*/ apSeq_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply_<IOEitherF> = {
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
export const chainFirst: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (first: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(first: IOEither<E1, A>) => IOEither<E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<IOEitherF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<IOEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<IOEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => I.IO<B>
) => <E>(...a: A) => IOEither<E, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => I.IO<B>
) => <E>(first: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => I.IO<B>
) => <E>(first: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither_<IOEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => IOEither<E, A> = /*#__PURE__*/ fromOption_(
  FromEither
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ chainOptionK_(
  FromEither,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, B> = /*#__PURE__*/ chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = chainEitherK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, A> = /*#__PURE__*/ chainFirstEitherK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = chainFirstEitherK as any

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOEither<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOEither<B, B>
  <A>(predicate: Predicate<A>): (a: A) => IOEither<A, A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: IOEither<E, B>) => IOEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} = /*#__PURE__*/ filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: IOEither<E1, B>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => IOEither<E, B> = /*#__PURE__*/ fromEitherK_(FromEither)

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
export const bracket: <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
) => IOEither<E, B> = /*#__PURE__*/ ET.bracket(I.Monad)

/**
 * Less strict version of [`bracket`](#bracket).
 *
 * @since 3.0.0
 */
export const bracketW: <E1, A, E2, B, E3>(
  acquire: IOEither<E1, A>,
  use: (a: A) => IOEither<E2, B>,
  release: (a: A, e: E.Either<E2, B>) => IOEither<E3, void>
) => IOEither<E1 | E2 | E3, B> = bracket as any

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
) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => IOEither<E, B>
) => (
  ma: IOEither<E, A>
) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (
  fa: IOEither<E, A>
) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

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
export const tupled: <E, A>(fa: IOEither<E, A>) => IOEither<E, readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <E, B>(
  fb: IOEither<E, B>
) => <A extends ReadonlyArray<unknown>>(fas: IOEither<E, A>) => IOEither<E, readonly [...A, B]> = /*#__PURE__*/ apT_(
  ApplyPar
)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(fas: IOEither<E1, A>) => IOEither<E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>> = (f) =>
  flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(E.traverseReadonlyNonEmptyArrayWithIndex(SK)))

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
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
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
