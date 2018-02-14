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

//
// Traversable
//

const sequenceEither: <L, A>(tfa: Either<L, A>[]) => Either<L, A[]> = sequence(either, array)

//
// Apply
//

import { semigroupString } from '../src/Semigroup'
import { Validation, getApplicative } from '../src/Validation'
import { liftA2 } from '../src/Apply'

const F1 = getApplicative(semigroupString)
const f1: <A, B, C>(
  f: (a: A) => (b: B) => C
) => (fa: Validation<string, A>) => (fb: Validation<string, B>) => Validation<string, C> = liftA2(F1)

//
// Unfoldable
//

import { replicateA } from '../src/Unfoldable'

const replicateValidation: <A>(n: number, ma: Validation<string, A>) => Validation<string, Array<A>> = replicateA(
  F1,
  array
)
