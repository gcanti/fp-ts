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

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Either<E, A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<E.EitherF, TE.TaskEitherF>(TE.fromEither)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => IO<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<IO.IOF, TE.TaskEitherF>(TE.fromIO)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Reader<FR, A>) => Reader<R, ReaderTaskEither<FR, E, A>>
_.fromNaturalTransformation<R.ReaderF, RTE.ReaderTaskEitherF>(RTE.fromReader)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => State<S, A>) => Reader<R, StateReaderTaskEither<S, FR, E, A>>
_.fromNaturalTransformation<S.StateF, SRTE.StateReaderTaskEitherF>(SRTE.fromState)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Task<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation<T.TaskF, TE.TaskEitherF>(TE.fromTask)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => These<E, A>) => Reader<R, TaskThese<E, A>>
_.fromNaturalTransformation<TH.TheseF, TTH.TaskTheseF>(TTH.fromThese)
