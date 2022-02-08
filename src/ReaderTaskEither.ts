/**
 * @since 3.0.0
 */
import type { Alt3, Alt3C } from './Alt'
import type { Applicative3, Applicative3C } from './Applicative'
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply1,
  Apply3,
  apS as apS_,
  apSecond as apSecond_,
  apT as apT_
} from './Apply'
import type { Bifunctor3 } from './Bifunctor'
import { ap as apSeq_, bind as bind_, Chain3, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable3C, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { filter, Filterable3C, filterMap, partition, partitionMap } from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither3,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO3, fromIOK as fromIOK_ } from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader3,
  fromReaderK as fromReaderK_
} from './FromReader'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask3,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor3, tupled as tupled_ } from './Functor'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither, URI as IEURI } from './IOEither'
import type { Monad3 } from './Monad'
import type { Monoid } from './Monoid'
import { NaturalTransformation23, NaturalTransformation33 } from './NaturalTransformation'
import type { Pointed3 } from './Pointed'
import type { Predicate } from './Predicate'
import * as R from './Reader'
import type { ReaderEither, URI as REURI } from './ReaderEither'
import * as RT from './ReaderTask'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TE from './TaskEither'

import Either = E.Either
import Task = T.Task
import TaskEither = TE.TaskEither
import Reader = R.Reader
import ReaderTask = RT.ReaderTask

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: NaturalTransformation23<TE.URI, URI> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, R, A = never>(e: E) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.left(RT.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R, E = never>(a: A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.right(RT.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, R, E = never>(ma: Task<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightTask, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, R, A = never>(me: Task<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftTask, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = (ma) => flow(ma, TE.right)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(me: Reader<R, E>) => ReaderTaskEither<R, E, A> = (me) => flow(me, TE.left)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderTask: <R, A, E = never>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF(RT.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderTask: <R, E, A = never>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF(RT.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, R, E = never>(ma: IO<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightIO, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, R, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftIO, fromTaskEither)

/**
 * Less strict version of [`asksReaderTaskEitherK`](#asksreadertaskeitherk).
 *
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A> = R.asksReaderW

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskEither: <R, E, A>(
  f: (r: R) => ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, A> = asksReaderTaskEitherW

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: FromEither3<URI>['fromEither'] = RT.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: FromReader3<URI>['fromReader'] = rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: FromIO3<URI>['fromIO'] = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: FromTask3<URI>['fromTask'] = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: NaturalTransformation23<IEURI, URI> =
  /*#__PURE__*/
  flow(TE.fromIOEither, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderEither: NaturalTransformation33<REURI, URI> = (ma) => flow(ma, TE.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  ET.match(RT.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <E, R, B, A>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  ET.matchE(RT.Monad)

/**
 * Less strict version of [`matchE`](#matchE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderTask<R2, B>,
  onRight: (a: A) => ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> = matchE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  ET.getOrElse(RT.Functor)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, B>(
  onLeft: (e: E) => B
) => <R, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <E, R, A>(
  onLeft: (e: E) => ReaderTask<R, A>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  ET.getOrElseE(RT.Monad)

/**
 * Less strict version of [`getOrElseE`](#getOrElseE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseEW: <E, R2, B>(
  onLeft: (e: E) => ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> = getOrElseE as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTask<R, E | A> =
  /*#__PURE__*/
  ET.toUnion(RT.Functor)

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
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A> = R.local

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, R, E2, A>(
  onLeft: (e: E1) => ReaderTaskEither<R, E2, A>
) => (ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A> =
  /*#__PURE__*/
  ET.orElse(RT.Monad)

/**
 * Less strict version of [`orElse`](#orElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirst: <E, R, B>(
  onLeft: (e: E) => ReaderTaskEither<R, E, B>
) => <A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.orElseFirst(RT.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElseFirstW: <E1, R, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R, E2, B>
) => <A>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, A> = orElseFirst as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => ReaderTask<R, E2>
) => <A>(fa: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A> =
  /*#__PURE__*/
  ET.orLeft(RT.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E> =
  /*#__PURE__*/
  ET.swap(RT.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => fromIOEither(f(...a))

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherKW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromIOEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => TaskEither<E, B>
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => fromTaskEither(f(...a))

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherKW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainTaskEitherKW

/**
 * Less strict version of [`chainFirstTaskEitherK`](#chainFirstTaskEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskEitherKW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, A> = (f) => chainFirstW(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = chainFirstTaskEitherKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderEitherK = <R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderEither<R, E, B>
): ((...a: A) => ReaderTaskEither<R, E, B>) => flow(f, fromReaderEither)

/**
 * Less strict version of [`chainReaderEitherK`](#chainReaderEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = (f) =>
  chainW(fromReaderEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainReaderEitherKW

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainFirstReaderEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> = (f) =>
  chainFirstW(fromReaderEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = chainFirstReaderEitherKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor3<URI>['map'] =
  /*#__PURE__*/
  ET.map(RT.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor3<URI>['bimap'] =
  /*#__PURE__*/
  ET.bimap(RT.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor3<URI>['mapLeft'] =
  /*#__PURE__*/
  ET.mapLeft(RT.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply3<URI>['ap'] =
  /*#__PURE__*/
  ET.ap(RT.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R, E = never>(a: A) => ReaderTaskEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain3<URI>['chain'] =
  /*#__PURE__*/
  ET.chain(RT.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A> =
  /*#__PURE__*/
  chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, E, A>(
  mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, A> = flattenW

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt3<URI>['alt'] =
  /*#__PURE__*/
  ET.alt(RT.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <R2, E2, B>(
  second: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> = alt as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReaderTaskEither'

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderTaskEither: ReaderTaskEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeReaderTaskValidation = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative3C<URI, E> => ({
  map,
  ap: ap_(R.Apply, TE.getApplicativeTaskValidation(A, S)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getAltReaderTaskValidation = <E>(S: Semigroup<E>): Alt3C<URI, E> => {
  return {
    map,
    alt: ET.altValidation(RT.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    compact: compact_(RT.Functor, C),
    separate: separate_(RT.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable3C<URI, E> => {
  const F = E.getFilterable(M)
  return {
    filter: filter(RT.Functor, F),
    filterMap: filterMap(RT.Functor, F),
    partition: partition(RT.Functor, F),
    partitionMap: partitionMap(RT.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor3<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed3<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply3<URI> = {
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
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative3<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain3<URI> = {
  map,
  chain
}

const apSeq =
  /*#__PURE__*/
  apSeq_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply3<URI> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative3<URI> = {
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
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad3<URI> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO3<URI> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask3<URI> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader3<URI> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> =
  /*#__PURE__*/
  ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  asks_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  chainReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainReaderK`](#chainReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderTaskEither<R2, E, A>) => ReaderTaskEither<R1 & R2, E, B> = chainReaderK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chainFirstReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderTaskEither<R2, E, A>) => ReaderTaskEither<R1 & R2, E, A> = chainFirstReaderK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderTaskK = <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => ReaderTask<R, B>
): (<E = never>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => rightReaderTask(f(...a))

/**
 * Less strict version of [`chainReaderTaskK`](#chainReaderTaskK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) =>
  chainW(fromReaderTaskK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainReaderTaskKW

/**
 * Less strict version of [`chainFirstReaderTaskK`](#chainFirstReaderTaskK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A> = (f) =>
  chainFirstW(fromReaderTaskK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = chainFirstReaderTaskKW

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither3<URI> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = chainEitherK as any

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderTaskEither<R, E1, B>
  ) => ReaderTaskEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt3<URI> = {
  map,
  alt
}

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
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.bracket(RT.Monad)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTaskEither<unknown, never, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(ApplyPar)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
