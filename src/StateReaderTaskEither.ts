import * as RTE from './ReaderTaskEither'
import * as stateT from './StateT'
import ReaderTaskEither = RTE.ReaderTaskEither
import { Monad4 } from './Monad'
import { Either, either } from './Either'
import { State } from './State'

declare module './HKT' {
  interface URI2HKT4<X, U, L, A> {
    StateReaderTaskEither: StateReaderTaskEither<X, U, L, A>
  }
}

export const URI = 'StateReaderTaskEither'

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
 * @since 2.0.0
 */
export function evalState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, A>> {
  return run(ma, s, e).then(e => either.map(e, ([a]) => a))
}

/**
 * @since 2.0.0
 */
export function execState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, S>> {
  return run(ma, s, e).then(e => either.map(e, ([_, s]) => s))
}

const T = stateT.getStateT(RTE.readerTaskEither)

/**
 * @since 2.0.0
 */
export const fromRight: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A> = T.of

/**
 * @since 2.0.0
 */
export const fromState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> = T.fromState

/**
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, E, L, A>(ma: ReaderTaskEither<E, L, A>) => StateReaderTaskEither<S, E, L, A> =
  T.fromM

/**
 * @since 2.0.0
 */
export const stateReaderTaskEither: Monad4<URI> = {
  URI,
  map: T.map,
  of: fromRight,
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
