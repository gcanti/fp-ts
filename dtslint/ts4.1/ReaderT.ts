import * as _ from '../../src/ReaderT'
import * as TE from '../../src/TaskEither'
import * as TTH from '../../src/TaskThese'
import * as RTE from '../../src/ReaderTaskEither'
import * as SRTE from '../../src/StateReaderTaskEither'

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Either<E, A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromEither)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => IO<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromIO)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Reader<FR, A>) => Reader<R, ReaderTaskEither<FR, E, A>>
_.fromNaturalTransformation(RTE.fromReader)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => State<S, A>) => Reader<R, StateReaderTaskEither<S, FR, E, A>>
_.fromNaturalTransformation(SRTE.fromState)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => Task<A>) => Reader<R, TaskEither<E, A>>
_.fromNaturalTransformation(TE.fromTask)

// $ExpectType <R, S, FR, E, A>(f: (r: R) => These<E, A>) => Reader<R, TaskThese<E, A>>
_.fromNaturalTransformation(TTH.fromThese)
