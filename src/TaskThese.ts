/**
 * @since 3.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply1, Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import {
  FromEither2,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { FromIO2, fromIOK as fromIOK_ } from './FromIO'
import { FromTask2, fromTaskK as fromTaskK_ } from './FromTask'
import { FromThese2, fromTheseK as fromTheseK_ } from './FromThese'
import { flow } from './function'
import { flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import * as TT from './TheseT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import These = TH.These
import Task = T.Task

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.left(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.right(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.both(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, E = never>(ma: Task<A>) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.rightF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, A = never>(me: Task<E>) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.leftF(T.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, leftTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> =
  /*#__PURE__*/
  T.fromIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: FromEither2<URI>['fromEither'] = T.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromThese: FromThese2<URI>['fromThese'] = T.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: FromIO2<URI>['fromIO'] = rightIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: FromTask2<URI>['fromTask'] = rightTask

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match =
  /*#__PURE__*/
  TT.match(T.Monad)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <E, B, A, C, D>(
  onLeft: (e: E) => T.Task<B>,
  onRight: (a: A) => T.Task<C>,
  onBoth: (e: E, a: A) => T.Task<D>
) => (ma: T.Task<TH.These<E, A>>) => T.Task<B | C | D> = match as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap =
  /*#__PURE__*/
  TT.swap(T.Functor)

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
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  TT.map(T.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor2<URI>['bimap'] =
  /*#__PURE__*/
  TT.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  TT.mapLeft(T.Functor)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => TaskThese<E, A> = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'TaskThese'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly TaskThese: TaskThese<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Apply2C<URI, E> => ({
  map,
  ap: TT.ap(A, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E> => {
  const AS = getApply(A, S)
  return {
    map,
    ap: AS.ap,
    of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <E>(S: Semigroup<E>): Chain2C<URI, E> => ({
  map,
  chain: TT.chain(T.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad2C<URI, E> => {
  const C = getChain(S)
  return {
    map,
    of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither2<URI> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
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
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: FromThese2<URI> = {
  fromThese
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTheseK =
  /*#__PURE__*/
  fromTheseK_(FromThese)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO2<URI> = {
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
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask2<URI> = {
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

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const toTuple2 =
  /*#__PURE__*/
  TT.toTuple2(T.Functor)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: TaskThese<never, readonly []> = of(_.emptyReadonlyArray)
