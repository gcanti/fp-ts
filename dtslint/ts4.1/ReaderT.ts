import * as _ from '../../src/ReaderT'
import * as E from '../../src/Either'
import * as IO from '../../src/IO'
import * as R from '../../src/Reader'
import * as S from '../../src/State'
import * as T from '../../src/Task'
import * as TH from '../../src/These'
import * as TE from '../../src/TaskEither'
import * as TTH from '../../src/TaskThese'
import * as RTE from '../../src/ReaderTaskEither'
import * as SRTE from '../../src/StateReaderTaskEither'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.ApplyPar)

declare const fab: R.Reader<{ r1: 'r1' }, RTE.ReaderTaskEither<{ r3: 'r3' }, number, (n: number) => boolean>>
declare const fa: R.Reader<{ r2: 'r2' }, RTE.ReaderTaskEither<{ r4: 'r4' }, boolean, number>>
// $ExpectType Reader<{ r1: "r1"; } & { r2: "r2"; }, ReaderTaskEither<{ r3: "r3"; } & { r4: "r4"; }, number | boolean, boolean>>
ap(fa)(fab)

//
// -------------------------------------------------------------------------------------
//

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => Either<E, A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<E.EitherF, TE.TaskEitherF>(TE.fromEither)

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => IO<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<IO.IOF, TE.TaskEitherF>(TE.fromIO)

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => Reader<FR, A>) => Reader<R, ReaderTaskEither<FR, E, A>>
_.fromNaturalTransformation<R.ReaderF, RTE.ReaderTaskEitherF>(RTE.fromReader)

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => State<S, A>) => Reader<R, StateReaderTaskEither<S, FR, E, A>>
_.fromNaturalTransformation<S.StateF, SRTE.StateReaderTaskEitherF>(SRTE.fromState)

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => Task<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<T.TaskF, TE.TaskEitherF>(TE.fromTask)

// $ExpectType <R, S, FR, W, E, A>(f: (r: R) => These<E, A>) => Reader<R, TaskThese<E, A>>
_.fromNaturalTransformation<TH.TheseF, TTH.TaskTheseF>(TTH.fromThese)
