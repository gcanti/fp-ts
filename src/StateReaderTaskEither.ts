import * as RTE from './ReaderTaskEither'
import { getStateM } from './StateT'
import ReaderTaskEither = RTE.ReaderTaskEither
import { Monad4 } from './Monad'
import { Either } from './Either'
import { State } from './State'
import { Task } from './Task'
import { TaskEither } from './TaskEither'
import { Reader } from './Reader'
import { IOEither } from './IOEither'
import { Option } from './Option'
import { IO } from './IO'

const T = getStateM(RTE.readerTaskEither)

declare module './HKT' {
  interface URI2HKT4<X, U, L, A> {
    StateReaderTaskEither: StateReaderTaskEither<X, U, L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'StateReaderTaskEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}

/**
 * @since 2.0.0
 */
export function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>> {
  return ma(s)(r)()
}

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A> =
  T.evalState

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S> =
  T.execState

/**
 * @since 2.0.0
 */
export function left<S, E>(e: E): StateReaderTaskEither<S, unknown, E, never> {
  return fromReaderTaskEither(RTE.left(e))
}

/**
 * @since 2.0.0
 */
export const right: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A> = T.of

/**
 * @since 2.0.0
 */
export function rightTask<S, A>(ma: Task<A>): StateReaderTaskEither<S, unknown, never, A> {
  return fromReaderTaskEither(RTE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<S, E>(me: Task<E>): StateReaderTaskEither<S, unknown, E, never> {
  return fromReaderTaskEither(RTE.leftTask(me))
}

/**
 * @since 2.0.0
 */
export function fromTaskEither<S, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, unknown, E, A> {
  return fromReaderTaskEither(RTE.fromTaskEither(ma))
}

/**
 * @since 2.0.0
 */
export function rightReader<S, R, A>(ma: Reader<R, A>): StateReaderTaskEither<S, R, never, A> {
  return fromReaderTaskEither(RTE.rightReader(ma))
}

/**
 * @since 2.0.0
 */
export function leftReader<S, R, E>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, never> {
  return fromReaderTaskEither(RTE.leftReader(me))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<S, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, unknown, E, A> {
  return fromReaderTaskEither(RTE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromEither<S, E, A>(ma: Either<E, A>): StateReaderTaskEither<S, unknown, E, A> {
  return fromReaderTaskEither(RTE.fromEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromOption<S, E, A>(ma: Option<A>, onNone: () => E): StateReaderTaskEither<S, unknown, E, A> {
  return fromReaderTaskEither(RTE.fromOption(ma, onNone))
}

/**
 * @since 2.0.0
 */
export function rightIO<S, A>(ma: IO<A>): StateReaderTaskEither<S, unknown, never, A> {
  return fromReaderTaskEither(RTE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<S, E>(me: IO<E>): StateReaderTaskEither<S, unknown, E, never> {
  return fromReaderTaskEither(RTE.leftIO(me))
}

/**
 * @since 2.0.0
 */
export const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> = T.fromState

/**
 * @since 2.0.0
 */
export function leftState<S, E>(me: State<S, E>): StateReaderTaskEither<S, unknown, E, never> {
  return s => RTE.left(me(s)[0])
}

/**
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  T.fromM

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S>() => StateReaderTaskEither<S, unknown, never, S> = T.get

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S>(s: S) => StateReaderTaskEither<S, unknown, never, void> = T.put

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => StateReaderTaskEither<S, unknown, never, void> = T.modify

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateReaderTaskEither<S, unknown, never, A> = T.gets

/**
 * @since 2.0.0
 */
export const stateReaderTaskEither: Monad4<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain
}

/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = {
  ...stateReaderTaskEither,
  ap: (mab, ma) => stateReaderTaskEither.chain(mab, f => stateReaderTaskEither.map(ma, f))
}
