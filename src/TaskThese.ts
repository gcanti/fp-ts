/**
 * @since 2.4.0
 */
import { Bifunctor2 } from './Bifunctor'
import { Functor2 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad2C } from './Monad'
import { MonadTask2C } from './MonadTask'
import { Semigroup } from './Semigroup'
import { getSemigroup as getTaskSemigroup, Task, monadTask, fromIO as fromIOTask } from './Task'
import * as TH from './These'
import { getTheseM } from './TheseT'

import These = TH.These

const T = /*#__PURE__*/ getTheseM(monadTask)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly TaskThese: TaskThese<E, A>
  }
}

/**
 * @since 2.4.0
 */
export const URI = 'TaskThese'

/**
 * @since 2.4.0
 */
export type URI = typeof URI

/**
 * @since 2.4.0
 */
export interface TaskThese<E, A> extends Task<These<E, A>> {}

/**
 * @since 2.4.0
 */
export const left: <E = never, A = never>(e: E) => TaskThese<E, A> = T.left

/**
 * @since 2.4.0
 */
export const right: <E = never, A = never>(a: A) => TaskThese<E, A> = T.right

/**
 * @since 2.4.0
 */
export const both: <E, A>(e: E, a: A) => TaskThese<E, A> = T.both

/**
 * @since 2.4.0
 */
export function rightIO<E = never, A = never>(ma: IO<A>): TaskThese<E, A> {
  return rightTask(fromIOTask(ma))
}

/**
 * @since 2.4.0
 */
export function leftIO<E = never, A = never>(me: IO<E>): TaskThese<E, A> {
  return leftTask(fromIOTask(me))
}

/**
 * @since 2.4.0
 */
export const leftTask: <E = never, A = never>(me: Task<E>) => TaskThese<E, A> = T.leftM

/**
 * @since 2.4.0
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => TaskThese<E, A> = T.rightM

/**
 * @since 2.4.0
 */
export const fromIOEither: <E, A>(fa: IOEither<E, A>) => TaskThese<E, A> = fromIOTask

/**
 * @since 2.4.0
 */
export function fold<E, A, B>(
  onLeft: (e: E) => Task<B>,
  onRight: (a: A) => Task<B>,
  onBoth: (e: E, a: A) => Task<B>
): (fa: TaskThese<E, A>) => Task<B> {
  return (fa) => T.fold(fa, onLeft, onRight, onBoth)
}

/**
 * @since 2.4.0
 */
export const swap: <E, A>(fa: TaskThese<E, A>) => TaskThese<A, E> = T.swap

/**
 * @since 2.4.0
 */
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<TaskThese<E, A>> {
  return getTaskSemigroup(TH.getSemigroup<E, A>(SE, SA))
}

/**
 * @since 2.4.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadTask2C<URI, E> {
  return {
    URI,
    ...T.getMonad(S),
    fromIO: rightIO,
    fromTask: rightTask
  }
}

/* tslint:disable:readonly-array */
/**
 * @since 2.4.0
 */
export function toTuple<E, A>(e: E, a: A): (fa: TaskThese<E, A>) => Task<[E, A]> {
  return (fa) => T.toTuple(fa, e, a)
}
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: TaskThese<E, A>) => TaskThese<G, B> = (
  f,
  g
) => (fa) => T.bimap(fa, f, g)

/**
 * @since 2.4.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: TaskThese<E, A>) => TaskThese<E, B> = (f) => (fa) => T.map(fa, f)

/**
 * @since 2.4.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: TaskThese<E, A>) => TaskThese<G, A> = (f) => (fa) =>
  T.mapLeft(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.4.0
 */
export const taskThese: Functor2<URI> & Bifunctor2<URI> = {
  URI,
  map: T.map,
  bimap: T.bimap,
  mapLeft: T.mapLeft
}
