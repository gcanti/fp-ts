import * as Apv from '../../src/Applicative'
import * as Apy from '../../src/Apply'
import * as A from '../../src/Array'
import * as C from '../../src/Const'
import * as E from '../../src/Either'
import * as F from '../../src/Functor'
import * as H from '../../src/HKT'
import * as Ix from '../../src/IxIO'
import * as O from '../../src/Option'
import * as OT from '../../src/OptionT'
import * as Re from '../../src/Reader'
import * as RTE from '../../src/ReaderTaskEither'
import * as R from '../../src/Record'
import * as S from '../../src/Semigroup'
import * as T from '../../src/Task'
import * as TE from '../../src/TaskEither'
import * as Th from '../../src/These'
import * as Tr from '../../src/Traversable'
import * as U from '../../src/Unfoldable'
import * as V from '../../src/Validation'
import * as Mon from '../../src/Monoid'
import * as Se from '../../src/Setoid'
import * as SM from '../../src/StrMap'
import * as Fo from '../../src/Foldable'
import * as Or from '../../src/Ord'
import * as Fu from '../../src/function'

const double = (n: number): number => n * 2
const len = (s: string): number => s.length

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

// sequenceS

declare const sequenceS1: E.Either<string, number>
declare const sequenceS2: E.Either<string, string>
declare const sequenceS3: E.Either<string, boolean>
declare const sequenceS4: E.Either<boolean, void>

const sequenceSf1 = Apy.sequenceS(E.either)

// $ExpectError
sequenceSf1({})
// $ExpectError
sequenceSf1({ sequenceS1, sequenceS4 })

sequenceSf1({ sequenceS1, sequenceS2, sequenceS3 }) // $ExpectType Either<string, { sequenceS1: number; sequenceS2: string; sequenceS3: boolean; }>

const sequenceSf2 = Apy.sequenceS(RTE.readerTaskEither)
declare const sequenceS5: RTE.ReaderTaskEither<{ a: number }, string, number>
declare const sequenceS6: RTE.ReaderTaskEither<{ a: number }, string, string>
declare const sequenceS7: RTE.ReaderTaskEither<{ a: number }, string, boolean>
declare const sequenceS8: RTE.ReaderTaskEither<{ a: number }, boolean, void>
declare const sequenceS9: RTE.ReaderTaskEither<{ a: string }, string, void>

// $ExpectError
sequenceSf2({ sequenceS5, sequenceS8 })
// $ExpectError
sequenceSf2({ sequenceS5, sequenceS9 })

sequenceSf2({ sequenceS5, sequenceS6, sequenceS7 }) // $ExpectType ReaderTaskEither<{ a: number; }, string, { sequenceS5: number; sequenceS6: string; sequenceS7: boolean; }>

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

//
// Record
//

declare const d1: { [key: string]: number }
declare const do1: { [key: string]: O.Option<number> }
declare const r1: Record<'a' | 'b', number>
// declare const ro1: Record<'a' | 'b', O.Option<number>>
declare const stringKey: string
const l1 = { a: 1 }

R.collect({ a: 1 }, (_k: 'a', n: number) => n) // $ExpectType number[]
R.collect(l1, (_k: 'a', n: number) => n) // $ExpectType number[]
R.collect(d1, (_k, n) => n) // $ExpectType number[]
R.collect(r1, (_k: 'a' | 'b', n: number) => n) // $ExpectType number[]

R.toArray({ a: 1 }) // $ExpectType ["a", number][]
R.toArray(l1) // $ExpectType ["a", number][]
R.toArray(d1) // $ExpectType [string, number][]
R.toArray(r1) // $ExpectType ["a" | "b", number][]

R.insert('b', 0, { a: 1 }) // $ExpectType Record<"a" | "b", number>
R.insert('b', 0, l1) // $ExpectType Record<"a" | "b", number>
R.insert('b', 0, d1) // $ExpectType Record<string, number>
R.insert('b', 0, r1) // $ExpectType Record<"a" | "b", number>
R.insert(stringKey, 0, r1) // $ExpectType Record<string, number>
R.insert('c', 0, r1) // $ExpectType Record<"a" | "b" | "c", number>

R.remove('a', { a: 1 }) // $ExpectType Record<never, number>
R.remove('b', { a: 1 }) // $ExpectType Record<"a", number>
R.remove('a', l1) // $ExpectType Record<never, number>
R.remove('b', l1) // $ExpectType Record<"a", number>
R.remove('b', d1) // $ExpectType Record<string, number>
R.remove('c', r1) // $ExpectType Record<"a" | "b", number>
R.remove('a', r1) // $ExpectType Record<"b", number>
R.remove(stringKey, r1) // $ExpectType Record<string, number>

R.mapWithKey({ a: 1 }, (_k: 'a', n: number) => n > 2) // $ExpectType Record<"a", boolean>
R.mapWithKey(l1, (_k: 'a', n: number) => n > 2) // $ExpectType Record<"a", boolean>
R.mapWithKey(d1, (_k: string, n: number) => n > 2) // $ExpectType Record<string, boolean>
R.mapWithKey(r1, (_k: 'a' | 'b', n: number) => n > 2) // $ExpectType Record<"a" | "b", boolean>

R.map({ a: 1 }, n => n > 2) // $ExpectType Record<"a", boolean>
R.map(l1, n => n > 2) // $ExpectType Record<"a", boolean>
R.map(d1, n => n > 2) // $ExpectType Record<string, boolean>
R.map(r1, n => n > 2) // $ExpectType Record<"a" | "b", boolean>

R.reduceWithKey(d1, '', (k: string, _n) => k) // $ExpectType string
R.reduceWithKey(r1, '', (k: 'a' | 'b', _n) => k) // $ExpectType string

R.foldMapWithKey(Mon.monoidString)(d1, (k: string, _n) => k) // $ExpectType string
// the following test requires https://github.com/Microsoft/TypeScript/issues/29246
// R.foldMapWithKey(Mon.monoidString)(r1, (k: 'a' | 'b', _n) => k) // $ExpectType string

R.foldrWithKey(d1, '', (k: string, _n, _b) => k) // $ExpectType string
R.foldrWithKey(r1, '', (k: 'a' | 'b', _n, _b) => k) // $ExpectType string

R.singleton('a', 1) // $ExpectType Record<"a", number>

R.traverseWithKey(O.option)(d1, (_k: string, n) => O.some(n)) // $ExpectType Option<Record<string, number>>
// the following test requires https://github.com/Microsoft/TypeScript/issues/29246
// R.traverseWithKey(O.option)(r1, (k: 'a' | 'b', n) => O.some(n)) // $ExpectType Option<Record<"a" | "b", number>>

R.traverse(O.option)(d1, O.some) // $ExpectType Option<Record<string, number>>
// the following test requires https://github.com/Microsoft/TypeScript/issues/29246
// R.traverse(O.option)(r1, O.some) // $ExpectType Option<Record<"a" | "b", number>>

R.sequence(O.option)(do1) // $ExpectType Option<Record<string, number>>
// the following test requires https://github.com/Microsoft/TypeScript/issues/29246
// R.sequence(O.option)(ro1) // $ExpectType Option<Record<"a" | "b", number>>

R.compact(do1) // $ExpectType Record<string, number>

R.partitionMapWithIndex(d1, (_k: string, n) => E.right<string, number>(n)) // $ExpectType Separated<Record<string, string>, Record<string, number>>
R.partitionMapWithIndex(r1, (_k: 'a' | 'b', n) => E.right<string, number>(n)) // $ExpectType Separated<Record<string, string>, Record<string, number>>

R.partitionWithIndex(d1, (_k: string, n) => n > 2) // $ExpectType Separated<Record<string, number>, Record<string, number>>
R.partitionWithIndex(r1, (_k: 'a' | 'b', n) => n > 2) // $ExpectType Separated<Record<string, number>, Record<string, number>>

R.filterMapWithIndex(d1, (_k: string, n) => O.some(n)) // $ExpectType Record<string, number>
R.filterMapWithIndex(r1, (_k: 'a' | 'b', n) => O.some(n)) // $ExpectType Record<string, number>

R.filterWithIndex(d1, (_k: string, n) => n > 2) // $ExpectType Record<string, number>
R.filterWithIndex(r1, (_k: 'a' | 'b', n) => n > 2) // $ExpectType Record<string, number>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

R.fromFoldable(A.array)(arr1, a => a) // $ExpectType Record<string, number>
R.fromFoldable(A.array)(arr2, a => a) // $ExpectType Record<"a" | "b", number>

type Keys = 'key1' | 'key2'
const Mon1 = R.getMonoid(S.semigroupSum) // $ExpectType Monoid<Record<string, number>>
const Mon2 = R.getMonoid<Keys, number>(S.semigroupSum) // $ExpectType Monoid<Record<Keys, number>>

const Set1 = R.getSetoid<Keys, number>(Se.setoidNumber) // $ExpectType Setoid<Record<Keys, number>>
const Set2 = R.getSetoid(Se.setoidNumber) // $ExpectType Setoid<Record<string, number>>

const toUnfoldable1 = R.toUnfoldable(A.array)({ a: 1 }) // $ExpectType ["a", number][]
const toUnfoldable2 = R.toUnfoldable(A.array)({ a: 1, b: 2 }) // $ExpectType ["a" | "b", number][]

declare const fromFoldableF1: Fo.Foldable<'Test'>
declare const fromFoldableInput1: H.HKT<'Test', ['a' | 'b', number]>
const fromFoldable1 = R.fromFoldable(fromFoldableF1)(fromFoldableInput1, a => a) // $ExpectType Record<"a" | "b", number>

//
// Semigroup
//

const Sem1 = S.getDictionarySemigroup(S.semigroupSum) // $ExpectType Semigroup<Record<string, number>>
const Sem2 = S.getDictionarySemigroup<Keys, number>(S.semigroupSum) // $ExpectType Semigroup<Record<Keys, number>>

//
// Monoid
//

const Mon3 = Mon.getDictionaryMonoid(S.semigroupSum) // $ExpectType Monoid<Record<string, number>>
const Mon4 = Mon.getDictionaryMonoid<Keys, number>(S.semigroupSum) // $ExpectType Monoid<Record<Keys, number>>

//
// StrMap
//

const toUnfoldable3 = SM.toUnfoldable(A.array)(new SM.StrMap({ a: 1 })) // $ExpectType [string, number][]

//
// NonEmptyArray2v
//

import * as NEA2v from '../../src/NonEmptyArray2v'

declare const nea2v1: NEA2v.NonEmptyArray<string>
declare const nea2v2: NEA2v.NonEmptyArray<string>
declare const array1: Array<string>

const nea2v1make1 = NEA2v.make<number>(1, []) // $ExpectType NonEmptyArray<number>

const nea2vValid = NEA2v.fromNonEmptyArray([1]) // $ExpectType NonEmptyArray<number>
// $ExpectError
const nea2vInvalid = NEA2v.fromNonEmptyArray([])

const nea2v1map1 = nea2v1.map(len) // $ExpectType NonEmptyArray<number>

const nea2v1concat1 = nea2v1.concat(nea2v2) // $ExpectType NonEmptyArray<string>
const nea2v1concat2 = nea2v1.concat(array1) // $ExpectType NonEmptyArray<string>
const nea2v1concat3 = array1.concat(nea2v1) // $ExpectType string[]

const nea2v1sort1 = nea2v1.sort(Or.ordString.compare) // $ExpectType NonEmptyArray<string>

const nea2v1reverse1 = nea2v1.reverse() // $ExpectType NonEmptyArray<string>

//
// function
//

// tuple

Fu.tuple() // $ExpectType []
Fu.tuple(1) // $ExpectType [number]
Fu.tuple(1, 'a') // $ExpectType [number, string]
Fu.tuple(1, 'a', true) // $ExpectType [number, string, boolean]
