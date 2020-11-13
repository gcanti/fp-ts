/**
 * @since 2.4.0
 */
import { Applicative2, Applicative2C } from './Applicative'
import { Apply1 } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { flow, pipe } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2, MonadTask2C } from './MonadTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TH from './These'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import These = TH.These
import Task = T.Task

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
  flow(TH.left, T.of)

/**
 * @category constructors
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(TH.right, T.of)

/**
 * @category constructors
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> =
  /*#__PURE__*/
  flow(TH.both, T.of)

/**
 * @category constructors
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> =
  /*#__PURE__*/
  T.map(TH.right)

/**
 * @category constructors
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> =
  /*#__PURE__*/
  T.map(TH.left)

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
  flow(TH.fold, T.chain)

// TODO: make lazy in v3
/* tslint:disable:readonly-array */
/**
 * @category destructors
 * @since 2.4.0
 */
export const toTuple: <E, A>(e: E, a: A) => (fa: TaskThese<E, A>) => Task<[E, A]> =
  /*#__PURE__*/
  flow(TH.toTuple, T.map)
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> =
  /*#__PURE__*/
  T.map(TH.swap)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const bimap_: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const mapLeft_: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.4.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = (f) => T.map(TH.map(f))

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> = (f, g) =>
  T.map(TH.bimap(f, g))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> = (f) =>
  T.map(TH.mapLeft(f))

/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.7.0
 */
export const of: Applicative2<URI>['of'] = right

/**
 * @category MonadIO
 * @since 2.7.0
 */
export const fromIO: MonadIO2<URI>['fromIO'] = rightIO

/**
 * @category MonadIO
 * @since 2.7.0
 */
export const fromTask: MonadTask2<URI>['fromTask'] = rightTask

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
 * @since 2.4.0
 */
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> {
  return T.getSemigroup(TH.getSemigroup(SE, SA))
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative<E>(A: Apply1<T.URI>, SE: Semigroup<E>): Applicative2C<URI, E> {
  const AV = TH.getApplicative(SE)
  const ap = <A>(fga: T.Task<TH.These<E, A>>) => <B>(fgab: T.Task<TH.These<E, (a: A) => B>>): T.Task<TH.These<E, B>> =>
    A.ap(
      A.map(fgab, (h) => (ga: TH.These<E, A>) => AV.ap(h, ga)),
      fga
    )
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of
  }
}

// TODO: remove in v3 in favour of a non-constrained Monad / MonadTask instance
/**
 * @category instances
 * @since 2.4.0
 */
export function getMonad<E>(SE: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  const A = getApplicative(T.ApplicativePar, SE)
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: A.ap,
    of,
    chain: (ma, f) =>
      pipe(
        ma,
        T.chain(
          TH.fold(left, f, (e1, a) =>
            pipe(
              f(a),
              T.map(
                TH.fold(
                  (e2) => TH.left(SE.concat(e1, e2)),
                  (b) => TH.both(e1, b),
                  (e2, b) => TH.both(SE.concat(e1, e2), b)
                )
              )
            )
          )
        )
      ),
    fromIO,
    fromTask
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorTaskThese: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const bifunctorTaskThese: Bifunctor2<URI> = {
  URI,
  bimap: bimap_,
  mapLeft: mapLeft_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.4.0
 */
export const taskThese: Functor2<URI> & Bifunctor2<URI> = {
  URI,
  map: map_,
  bimap: bimap_,
  mapLeft: mapLeft_
}
