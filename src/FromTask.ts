/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.10.0
 */
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4, chainFirst } from './Chain'
import { FromIO, FromIO1, FromIO2, FromIO2C, FromIO3, FromIO3C, FromIO4 } from './FromIO'
import { flow } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Task } from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask<F> extends FromIO<F> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<F, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask1<F extends URIS> extends FromIO1<F> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<F, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask2<F extends URIS2> extends FromIO2<F> {
  readonly fromTask: <A, E>(fa: Task<A>) => Kind2<F, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask2C<F extends URIS2, E> extends FromIO2C<F, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<F, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask3<F extends URIS3> extends FromIO3<F> {
  readonly fromTask: <A, R, E>(fa: Task<A>) => Kind3<F, R, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask3C<F extends URIS3, E> extends FromIO3C<F, E> {
  readonly fromTask: <A, R>(fa: Task<A>) => Kind3<F, R, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromTask4<F extends URIS4> extends FromIO4<F> {
  readonly fromTask: <A, S, R, E>(fa: Task<A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function fromTaskK<F extends URIS4>(
  F: FromTask4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export function fromTaskK<F extends URIS3>(
  F: FromTask3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export function fromTaskK<F extends URIS3, E>(
  F: FromTask3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromTaskK<F extends URIS2>(
  F: FromTask2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <E>(...a: A) => Kind2<F, E, B>
export function fromTaskK<F extends URIS2, E>(
  F: FromTask2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => Kind2<F, E, B>
export function fromTaskK<F extends URIS>(
  F: FromTask1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => Kind<F, B>
export function fromTaskK<F>(
  F: FromTask<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => HKT<F, B>
export function fromTaskK<F>(
  F: FromTask<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => (...a: A) => HKT<F, B> {
  return (f) => flow(f, F.fromTask)
}

/**
 * @since 2.10.0
 */
export function chainTaskK<M extends URIS4>(
  F: FromTask4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainTaskK<M extends URIS3>(
  F: FromTask3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => Task<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainTaskK<M extends URIS3, E>(
  F: FromTask3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Task<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainTaskK<M extends URIS2>(
  F: FromTask2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => Task<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainTaskK<M extends URIS2, E>(
  F: FromTask2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainTaskK<M extends URIS>(
  F: FromTask1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind<M, A>) => Kind<M, B>
export function chainTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, B>
export function chainTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, B> {
  return (f) => {
    const g = flow(f, F.fromTask)
    return (first) => M.chain(first, g)
  }
}

/**
 * @since 2.10.0
 */
export function chainFirstTaskK<M extends URIS4>(
  F: FromTask4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstTaskK<M extends URIS3>(
  F: FromTask3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => Task<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstTaskK<M extends URIS3, E>(
  F: FromTask3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Task<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstTaskK<M extends URIS2>(
  F: FromTask2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => Task<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstTaskK<M extends URIS2, E>(
  F: FromTask2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstTaskK<M extends URIS>(
  F: FromTask1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => Task<B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirstTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, A>
export function chainFirstTaskK<M>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => (first: HKT<M, A>) => HKT<M, A> {
  const chainFirstM = chainFirst(M)
  return (f) => chainFirstM(flow(f, F.fromTask))
}
