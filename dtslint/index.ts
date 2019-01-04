import * as Apv from '../src/Applicative'
import * as Apy from '../src/Apply'
import * as A from '../src/Array'
import * as C from '../src/Const'
import * as E from '../src/Either'
import * as F from '../src/Functor'
import * as H from '../src/HKT'
import * as Ix from '../src/IxIO'
import * as O from '../src/Option'
import * as OT from '../src/OptionT'
import * as Re from '../src/Reader'
import * as RTE from '../src/ReaderTaskEither'
import * as S from '../src/Semigroup'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as Th from '../src/These'
import * as Tr from '../src/Traversable'
import * as U from '../src/Unfoldable'
import * as V from '../src/Validation'

const double = (n: number) => n * 2

//
// Functor
//

// lift

F.lift(O.option)(double) // $ExpectType (fa: Option<number>) => Option<number>
F.lift(E.either)(double) // $ExpectType <L>(fa: Either<L, number>) => Either<L, number>
F.lift(RTE.readerTaskEither)(double) // $ExpectType <U, L>(fa: ReaderTaskEither<U, L, number>) => ReaderTaskEither<U, L, number>
declare const EitherFunctor2C: F.Functor2C<'Either', string>
F.lift(EitherFunctor2C)(double) // $ExpectType (fa: Either<string, number>) => Either<string, number>
declare const ReaderTaskEitherFunctor3C: F.Functor3C<'ReaderTaskEither', string, boolean>
F.lift(ReaderTaskEitherFunctor3C)(double) // $ExpectType (fa: ReaderTaskEither<string, boolean, number>) => ReaderTaskEither<string, boolean, number>

//
// Traversable
//

// sequence

Tr.sequence(E.either, A.array) // $ExpectType <L, A>(tfa: Either<L, A>[]) => Either<L, A[]>
Tr.sequence(T.task, V.validation) // $ExpectType <L, A>(tfa: Validation<L, Task<A>>) => Task<Validation<L, A>>
Tr.sequence(E.either, V.validation) // $ExpectType <LF, LT, A>(tfa: Validation<LT, Either<LF, A>>) => Either<LF, Validation<LT, A>>
Tr.sequence(V.getApplicative(S.semigroupString), E.either) // $ExpectType <LT, A>(tfa: Either<LT, Validation<string, A>>) => Validation<string, Either<LT, A>>

//
// Apply
//

// liftA2

const applicativeValidation = V.getApplicative(S.semigroupString)
Apy.liftA2(applicativeValidation) // $ExpectType <A, B, C>(f: Curried2<A, B, C>) => (fa: Validation<string, A>) => (fb: Validation<string, B>) => Validation<string, C>

//
// Unfoldable
//

// replicateA

U.replicateA(applicativeValidation, A.array) // $ExpectType <A>(n: number, ma: Validation<string, A>) => Validation<string, A[]>

//
// Applicative
//

// getApplicativeComposition

Apv.getApplicativeComposition(Re.reader, applicativeValidation).map // $ExpectType <LF, A, B>(fa: Reader<LF, Validation<string, A>>, f: (a: A) => B) => Reader<LF, Validation<string, B>>

//
// Const
//

// contramap

C.const_.contramap(new C.Const<boolean, number>(true), (s: string) => s.length) // $ExpectType Const<boolean, string>

//
// OptionT
//

// Monad2C

OT.getOptionT(Th.getMonad(S.getArraySemigroup<string>())) // $ExpectType OptionT2C<"These", string[]>

// Monad3C

OT.getOptionT(Ix.getMonad<string>()) // $ExpectType OptionT3C<"IxIO", string, string>

//
// TaskEither
//

// taskify

declare function apiForTaskify(path: string, callback: (err: Error | null | undefined, result?: string) => void): void

TE.taskify(apiForTaskify) // $ExpectType (a: string) => TaskEither<Error, string>

//
// Option
//

// getRefinement

interface A {
  type: 'A'
}
interface B {
  type: 'B'
}
type C = A | B

// $ExpectError
O.getRefinement<C, A>(c => (c.type === 'B' ? O.some(c) : O.none))

//
// HKT
//

// $ExpectError
type HKT1 = H.Type<'a', string>
