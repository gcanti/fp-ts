/**
 * @since 2.4.0
 */
import { Applicative2C } from './Applicative'
import { Apply1, Apply2C, getApplySemigroup } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import {
  FromEither2,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { FromIO2 } from './FromIO'
import { FromTask2 } from './FromTask'
import { flow, Lazy, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
import { Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'
import * as TT from './TheseT'

import These = TH.These
import Task = T.Task

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

/**
 * @category constructors
 * @since 2.4.0
 */
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.left(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.right(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.both(T.Pointed)

/**
 * @category constructors
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.rightF(T.Functor)

/**
 * @category constructors
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> =
  /*#__PURE__*/
  TT.leftF(T.Functor)

/**
 * @category constructors
 * @since 2.4.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, rightTask)

/**
 * @category constructors
 * @since 2.4.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(T.fromIO, leftTask)

/**
 * @category constructors
 * @since 2.4.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> =
  /*#__PURE__*/
  T.fromIO

/**
 * @category constructors
 * @since 2.7.0
 */
export const fromIO: FromIO2<URI>['fromIO'] = rightIO

/**
 * @category constructors
 * @since 2.7.0
 */
export const fromTask: FromTask2<URI>['fromTask'] = rightTask

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromEither: FromEither2<URI>['fromEither'] = T.of

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.4.0
 */
export const fold: <E, B, A>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
) => (fa: TaskThese<E, A>) => Task<B> =
  /*#__PURE__*/
  TT.fold(T.Monad)

/**
 * Less strict version of [`fold`](#fold).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW: <E, B, A, C, D>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<C>,
  onBoth: (e: E, a: A) => Task<D>
) => (fa: TaskThese<E, A>) => Task<B | C | D> = fold as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> =
  /*#__PURE__*/
  TT.swap(T.Functor)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.4.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> =
  /*#__PURE__*/
  TT.map(T.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> =
  /*#__PURE__*/
  TT.bimap(T.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> =
  /*#__PURE__*/
  TT.mapLeft(T.Functor)

/**
 * @category Pointed
 * @since 2.7.0
 */
export const of: Pointed2<URI>['of'] = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.4.0
 */
export const URI = 'TaskThese'

/**
 * @category instances
 * @since 2.4.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getApply = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Apply2C<URI, E> => {
  const ap = TT.ap(A, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative2C<URI, E> {
  const { ap } = getApply(A, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap,
    of
  }
}

/**
 * @category instances
 * @since 2.4.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  const A = getApplicative(T.ApplicativePar, S)
  const chain = TT.chain(T.Monad, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    of,
    chain: (ma, f) => pipe(ma, chain(f)),
    fromIO,
    fromTask
  }
}

/**
 * @category instances
 * @since 2.10.0
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
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  map: _map,
  of
}

/**
 * @category instances
 * @since 2.10.0
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
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither
}

/**
 * @category constructors
 * @since 2.10.0
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
 * @category constructors
 * @since 2.10.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask2<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const toTuple2: <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: TaskThese<E, A>) => Task<readonly [E, A]> =
  /*#__PURE__*/
  TT.toTuple2(T.Functor)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `Functor` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const functorTaskThese: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Use `Bifunctor` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const bifunctorTaskThese: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/* tslint:disable:readonly-array */
/**
 * Use `toTuple2` instead.
 *
 * @since 2.4.0
 * @deprecated
 */
export const toTuple = <E, A>(e: E, a: A): ((fa: TaskThese<E, A>) => Task<[E, A]>) =>
  toTuple2(
    () => e,
    () => a
  ) as any
/* tslint:enable:readonly-array */

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const taskThese: Functor2<URI> & Bifunctor2<URI> = {
  URI,
  map: _map,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * Use `Apply.getApplySemigroup` instead.
 *
 * @category instances
 * @since 2.4.0
 * @deprecated
 */
export const getSemigroup = <E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> =>
  getApplySemigroup(T.ApplySeq)(TH.getSemigroup(SE, SA))
