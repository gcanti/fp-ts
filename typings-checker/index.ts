import { lift, Functor2C, Functor3, Functor3C } from '../src/Functor'
import { sequence } from '../src/Traversable'
import { array } from '../src/Array'
import { Option, option } from '../src/Option'
import { Either, either } from '../src/Either'
import { ReaderTaskEither, readerTaskEither } from '../examples/ReaderTaskEither'

const double = (n: number) => n * 2

//
// Functor
//

const liftedOption: (fa: Option<number>) => Option<number> = lift(option)(double)
const liftedEither: <L>(fa: Either<L, number>) => Either<L, number> = lift(either)(double)
const liftedReaderTaskEither: <U, L>(fa: ReaderTaskEither<U, L, number>) => ReaderTaskEither<U, L, number> = lift(
  readerTaskEither
)(double)
declare const EitherFunctor2C: Functor2C<'Either', string>
const liftedF: (fa: Either<string, number>) => Either<string, number> = lift(EitherFunctor2C)(double)
declare const ReaderTaskEitherFunctor3C: Functor3C<'ReaderTaskEither', string, boolean>
const liftedGD: (fa: ReaderTaskEither<string, boolean, number>) => ReaderTaskEither<string, boolean, number> = lift(
  ReaderTaskEitherFunctor3C
)(double)

const seq = sequence(either, array)
