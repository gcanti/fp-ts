/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C, getApplicativeMonoid } from './Applicative'
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply2,
  apS as apS_,
  apSecond as apSecond_,
  getApplySemigroup as getApplySemigroup_
} from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable2C, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import {
  filter as filter_,
  Filterable2C,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither2,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO2, fromIOK as fromIOK_ } from './FromIO'
import { flow, identity, Lazy, pipe, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import * as I from './IO'
import { Monad2, Monad2C } from './Monad'
import { MonadIO2, MonadIO2C } from './MonadIO'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed2 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either
import IO = I.IO

/**
 * @category model
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <E = never, A = never>(l: E) => IOEither<E, A> =
  /*#__PURE__*/
  ET.left(I.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => IOEither<E, A> =
  /*#__PURE__*/
  ET.right(I.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A> =
  /*#__PURE__*/
  ET.rightF(I.Functor)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A> =
  /*#__PURE__*/
  ET.leftF(I.Functor)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromEither: FromEither2<URI>['fromEither'] = I.of

/**
 * @category natural transformations
 * @since 2.7.0
 */
export const fromIO: FromIO2<URI>['fromIO'] = rightIO

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  ET.match(I.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: IOEither<E, A>) => IO<B | C> = match as any

/**
 * @category destructors
 * @since 2.10.0
 */
export const matchE: <E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  ET.matchE(I.Monad)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.0.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW: <E, B, A, C>(
  onLeft: (e: E) => IO<B>,
  onRight: (a: A) => IO<C>
) => (ma: IOEither<E, A>) => IO<B | C> = matchE as any

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchEW

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> =
  /*#__PURE__*/
  ET.getOrElse(I.Monad)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @category interop
 * @since 2.0.0
 */
export const tryCatch = <E, A>(f: Lazy<A>, onThrow: (reason: unknown) => E): IOEither<E, A> => () =>
  E.tryCatch(f, onThrow)

/**
 * Converts a function that may throw to one returning a `IOEither`.
 *
 * @category interop
 * @since 2.10.0
 */
export const tryCatchK = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (reason: unknown) => E
): ((...a: A) => IOEither<E, B>) => (...a) => tryCatch(() => f(...a), onThrow)

/**
 * @category interop
 * @since 2.10.0
 */
export const toUnion: <E, A>(fa: IOEither<E, A>) => IO<E | A> =
  /*#__PURE__*/
  ET.toUnion(I.Functor)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.0.0
 */
export const orElse: <E1, A, E2>(onLeft: (e: E1) => IOEither<E2, A>) => (ma: IOEither<E1, A>) => IOEither<E2, A> =
  /*#__PURE__*/
  ET.orElse(I.Monad)

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 2.10.0
 */
export const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirst: <E, B>(onLeft: (e: E) => IOEither<E, B>) => <A>(ma: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  ET.orElseFirst(I.Monad)

/**
 * @category combinators
 * @since 2.11.0
 */
export const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = orElseFirst as any

/**
 * @category combinators
 * @since 2.11.0
 */
export const orLeft: <E1, E2>(onLeft: (e: E1) => IO<E2>) => <A>(fa: IOEither<E1, A>) => IOEither<E2, A> =
  /*#__PURE__*/
  ET.orLeft(I.Monad)

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> =
  /*#__PURE__*/
  ET.swap(I.Functor)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Apply2<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
/* istanbul ignore next */
const _chain: Chain2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const _alt: Alt2<URI>['alt'] = (fa, that) => pipe(fa, alt(that))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  ET.map(I.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B> =
  /*#__PURE__*/
  ET.bimap(I.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A> =
  /*#__PURE__*/
  ET.mapLeft(I.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> =
  /*#__PURE__*/
  ET.ap(I.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 2.8.5
 */
export const of: <E = never, A = never>(a: A) => IOEither<E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  ET.chain(I.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.11.0
 */
export const flattenW: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A> =
  /*#__PURE__*/
  chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> = flattenW

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: Lazy<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  ET.alt(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <E2, B>(
  that: Lazy<IOEither<E2, B>>
) => <E1, A>(fa: IOEither<E1, A>) => IOEither<E2, A | B> = alt as any

/**
 * @category MonadThrow
 * @since 2.7.0
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'IOEither'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: IOEither<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeIOValidation<E>(S: Semigroup<E>): Applicative2C<URI, E> {
  const ap = ap_(I.Apply, E.getApplicativeValidation(S))
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getAltIOValidation<E>(S: Semigroup<E>): Alt2C<URI, E> {
  const alt = ET.altValidation(I.Monad, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    alt: (fa, that) => pipe(fa, alt(that))
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable2C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    URI,
    _E: undefined as any,
    compact: compact_(I.Functor, C),
    separate: separate_(I.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 2.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getFilterable(M)
  const C = getCompactable(M)

  const filter = filter_(I.Functor, F)
  const filterMap = filterMap_(I.Functor, F)
  const partition = partition_(I.Functor, F)
  const partitionMap = partitionMap_(I.Functor, F)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: C.compact,
    separate: C.separate,
    filter: <A>(fa: IOEither<E, A>, predicate: Predicate<A>) => pipe(fa, filter(predicate)),
    filterMap: (fa, f) => pipe(fa, filterMap(f)),
    partition: <A>(fa: IOEither<E, A>, predicate: Predicate<A>) => pipe(fa, partition(predicate)),
    partitionMap: (fa, f) => pipe(fa, partitionMap(f))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplyPar: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 2.8.4
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.8.4
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt2<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadIO: MonadIO2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  fromIO: fromIO
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadThrow: MonadThrow2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  throwError
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither
}

/**
 * @category natural transformations
 * @since 2.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = chainEitherK as any

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
} =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: IOEither<E, B>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 2.9.0
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
 * @since 2.4.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => IOEither<E, B> =
  /*#__PURE__*/
  fromEitherK_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export const bracket = <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> =>
  pipe(
    acquire,
    chain((a) =>
      pipe(
        use(a),
        I.chain((e) =>
          pipe(
            release(a, e),
            chain(() => I.of(e))
          )
        )
      )
    )
  )

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: IOEither<never, {}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * @since 2.8.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * @since 2.8.0
 */
export const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(
  fa: IOEither<E1, A>
) => IOEither<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const ApT: IOEither<never, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>> = (f) =>
  flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(E.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.11.0
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
 * @since 2.11.0
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
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * @since 2.9.0
 */
export const traverseArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

/**
 * @since 2.9.0
 */
export const traverseSeqArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = traverseReadonlyArrayWithIndexSeq

/**
 * @since 2.9.0
 */
export const traverseSeqArray = <A, E, B>(
  f: (a: A) => IOEither<E, B>
): ((as: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceSeqArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseSeqArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use [`ApplicativePar`](#applicativepar) instead
 *
 * @since 2.7.0
 * @category instances
 * @deprecated
 */
export const Applicative: Applicative2<URI> = ApplicativePar

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  alt: _alt,
  fromIO,
  throwError
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>> =
  /*#__PURE__*/
  getApplySemigroup_(ApplyPar)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<IOEither<E, A>> =
  /*#__PURE__*/
  getApplicativeMonoid(ApplicativePar)

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> =>
  getApplySemigroup_(I.Apply)(E.getSemigroup(S))

/**
 * Use [`getApplicativeIOValidation`](#getapplicativeiovalidation) and [`getAltIOValidation`](#getaltiovalidation).
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export function getIOValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E> {
  const applicativeIOValidation = getApplicativeIOValidation(SE)
  const altIOValidation = getAltIOValidation(SE)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: applicativeIOValidation.ap,
    of,
    chain: _chain,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: altIOValidation.alt,
    fromIO,
    throwError
  }
}
