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
export interface StateReaderTaskEither<S, E, L, A> {
  (s: S): ReaderTaskEither<E, L, [A, S]>
}

/**
 * @since 2.0.0
 */
export function run<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, [A, S]>> {
  return ma(s)(e)()
}

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export const evalState: <S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S) => ReaderTaskEither<E, L, A> =
  T.evalState

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export const execState: <S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S) => ReaderTaskEither<E, L, S> =
  T.execState

/**
 * @since 2.0.0
 */
export function left<S, L>(l: L): StateReaderTaskEither<S, unknown, L, never> {
  return fromReaderTaskEither(RTE.left(l))
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
export function leftTask<S, L>(ma: Task<L>): StateReaderTaskEither<S, unknown, L, never> {
  return fromReaderTaskEither(RTE.leftTask(ma))
}

/**
 * @since 2.0.0
 */
export function fromTaskEither<S, L, A>(ma: TaskEither<L, A>): StateReaderTaskEither<S, unknown, L, A> {
  return fromReaderTaskEither(RTE.fromTaskEither(ma))
}

/**
 * @since 2.0.0
 */
export function rightReader<S, E, A>(ma: Reader<E, A>): StateReaderTaskEither<S, E, never, A> {
  return fromReaderTaskEither(RTE.rightReader(ma))
}

/**
 * @since 2.0.0
 */
export function leftReader<S, E, L>(ml: Reader<E, L>): StateReaderTaskEither<S, E, L, never> {
  return fromReaderTaskEither(RTE.leftReader(ml))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<S, L, A>(ma: IOEither<L, A>): StateReaderTaskEither<S, unknown, L, A> {
  return fromReaderTaskEither(RTE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromEither<S, L, A>(ma: Either<L, A>): StateReaderTaskEither<S, unknown, L, A> {
  return fromReaderTaskEither(RTE.fromEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromOption<S, L, A>(ma: Option<A>, onNone: () => L): StateReaderTaskEither<S, unknown, L, A> {
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
export function leftIO<S, L>(ml: IO<L>): StateReaderTaskEither<S, unknown, L, never> {
  return fromReaderTaskEither(RTE.leftIO(ml))
}

/**
 * @since 2.0.0
 */
export const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> = T.fromState

/**
 * @since 2.0.0
 */
export function leftState<S, L>(ml: State<S, L>): StateReaderTaskEither<S, unknown, L, never> {
  return s => RTE.left(ml(s)[0])
}

/**
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, E, L, A>(ma: ReaderTaskEither<E, L, A>) => StateReaderTaskEither<S, E, L, A> =
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
  ap: (fab, fa) => stateReaderTaskEither.chain(fab, f => stateReaderTaskEither.map(fa, f))
}
