/**
 * @since 2.4.0
 */
import { apComposition } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { flow, pipe } from './function'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
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
export const URI = 'TaskThese'

/**
 * @category model
 * @since 2.4.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: TaskThese<E, A>
  }
}

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

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const bimap_: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const mapLeft_: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

/**
 * @category instances
 * @since 2.4.0
 */
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> {
  return T.getSemigroup(TH.getSemigroup<E, A>(SE, SA))
}

/**
 * @category instances
 * @since 2.4.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  const ap = apComposition(T.applyTask, TH.getMonad(S))
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of: right,
    chain: (ma, f) =>
      pipe(
        ma,
        T.chain(
          TH.fold(left, f, (e1, a) =>
            pipe(
              f(a),
              T.map(
                TH.fold(
                  (e2) => TH.left(S.concat(e1, e2)),
                  TH.right,
                  (e2, b) => TH.both(S.concat(e1, e2), b)
                )
              )
            )
          )
        )
      ),
    fromIO: rightIO,
    fromTask: rightTask
  }
}

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
