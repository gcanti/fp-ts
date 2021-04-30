import * as _ from '../../src/ReaderT'
import * as TE from '../../src/TaskEither'
import * as TTH from '../../src/TaskThese'
import * as RTE from '../../src/ReaderTaskEither'
import * as SRTE from '../../src/StateReaderTaskEither'

// $ExpectType <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromEither)

// $ExpectType <R, A, E>(f: (r: R) => IO<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromIO)

// $ExpectType <R, A, E>(f: (r: R) => Reader<R, A>) => Reader<R, ReaderTaskEither<R, E, A>>
_.fromNaturalTransformation(RTE.fromReader)

// $ExpectType <R, S, A, E>(f: (r: R) => State<S, A>) => Reader<R, StateReaderTaskEither<S, R, E, A>>
_.fromNaturalTransformation(SRTE.fromState)

// $ExpectType <R, A, E>(f: (r: R) => Task<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromTask)

// $ExpectType <R, E, A>(f: (r: R) => These<E, A>) => Reader<R, TaskThese<E, A>>
_.fromNaturalTransformation(TTH.fromThese)
