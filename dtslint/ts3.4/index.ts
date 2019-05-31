import * as Apv from '../../src/Applicative'
import * as Apy from '../../src/Apply'
import * as A from '../../src/Array'
import * as C from '../../src/Const'
import * as E from '../../src/Either'
import * as Eq from '../../src/Eq'
import * as Field from '../../src/Field'
import * as Fo from '../../src/Foldable'
import * as Fu from '../../src/function'
import * as H from '../../src/HKT'
import * as Map from '../../src/Map'
import * as Mon from '../../src/Monoid'
import * as NEA from '../../src/NonEmptyArray'
import * as O from '../../src/Option'
import * as Or from '../../src/Ord'
import * as Re from '../../src/Reader'
import * as RTE from '../../src/ReaderTaskEither'
import * as R from '../../src/Record'
import * as Ring from '../../src/Ring'
import * as S from '../../src/Semigroup'
import * as T from '../../src/Task'
import * as TE from '../../src/TaskEither'

//
// Apply
//

// sequenceS

declare function functionForfactoryS(
  a1: string,
  a2: number,
  a3: boolean,
  a4: string,
  a5: number,
  a6: boolean,
  a7: string,
  a8: number,
  a9: boolean
): boolean

export function factoryS<F extends H.URIS>(
  F: Apy.Apply1<F>,
  a1: H.Type<F, string>,
  a2: H.Type<F, number>,
  a3: H.Type<F, boolean>,
  a4: H.Type<F, string>,
  a5: H.Type<F, number>,
  a6: H.Type<F, boolean>,
  a7: H.Type<F, string>,
  a8: H.Type<F, number>,
  a9: H.Type<F, boolean>
): H.Type<F, boolean> {
  return F.map(Apy.sequenceS(F)({ a1, a2, a3, a4, a5, a6, a7, a8, a9 }), ({ a1, a2, a3, a4, a5, a6, a7, a8, a9 }) =>
    functionForfactoryS(a1, a2, a3, a4, a5, a6, a7, a8, a9)
  )
}

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

// sequenceT

export function factoryT<F extends H.URIS>(
  F: Apy.Apply1<F>,
  f1: H.Type<F, string>,
  f2: H.Type<F, number>,
  f3: H.Type<F, boolean>,
  f4: H.Type<F, string>,
  f5: H.Type<F, number>,
  f6: H.Type<F, boolean>,
  f7: H.Type<F, string>,
  f8: H.Type<F, number>,
  f9: H.Type<F, boolean>
): H.Type<F, boolean> {
  return F.map(Apy.sequenceT(F)(f1, f2, f3, f4, f5, f6, f7, f8, f9), ([a1, a2, a3, a4, a5, a6, a7, a8, a9]) =>
    functionForfactoryS(a1, a2, a3, a4, a5, a6, a7, a8, a9)
  )
}

const sequenceTf1 = Apy.sequenceT(E.either)

// $ExpectError
sequenceTf1([])
// $ExpectError
sequenceTf1(sequenceS1, sequenceS4)

sequenceTf1(sequenceS1, sequenceS2, sequenceS3) // $ExpectType Either<string, [number, string, boolean]>

const sequenceTf2 = Apy.sequenceT(RTE.readerTaskEither)

// $ExpectError
sequenceTf2(sequenceS5, sequenceS8)
// $ExpectError
sequenceTf2(sequenceS5, sequenceS9)

sequenceTf2(sequenceS5, sequenceS6, sequenceS7) // $ExpectType ReaderTaskEither<{ a: number; }, string, [number, string, boolean]>

//
// Applicative
//

// getApplicativeComposition

const applicativeValidation = E.getValidation(S.semigroupString)

Apv.getApplicativeComposition(Re.reader, applicativeValidation).map // $ExpectType <LF, A, B>(fa: Reader<LF, Either<string, A>>, f: (a: A) => B) => Reader<LF, Either<string, B>>

//
// Const
//

// contramap

C.const_.contramap(C.make<boolean>(true), (s: string) => s.length) // $ExpectType Const<boolean, string>

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

// isssue #536
function testIssue536<F extends H.URIS, G extends H.URIS, A>(x: H.Type<F, A>): H.Type<G, A> {
  // $ExpectError
  return x
}

const testURI = <F extends H.URIS>(ma: T.Task<number>): H.Type<F, number> => {
  // $ExpectError
  return ma
}

// $ExpectError
type HKT1 = H.Type<'a', string>

//
// Record
//

declare const d1: { [key: string]: number }
declare const do1: { [key: string]: O.Option<number> }
declare const r1: Record<'a' | 'b', number>
declare const ro1: Record<'a' | 'b', O.Option<number>>
declare const stringKey: string
const l1 = { a: 1 }

R.pop('a')(r1) // $ExpectType Option<[number, Record<"b", number>]>
R.pop('a')(d1) // $ExpectType Option<[number, Record<string, number>]>
R.pop(stringKey)(r1) // $ExpectType Option<[number, Record<string, number>]>

R.collect((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType number[]
R.collect((_k: 'a', n: number) => n)(l1) // $ExpectType number[]
R.collect((_k, n: number) => n)(d1) // $ExpectType number[]
R.collect((_k: 'a' | 'b', n: number) => n)(r1) // $ExpectType number[]

R.toArray({ a: 1 }) // $ExpectType ["a", number][]
R.toArray(l1) // $ExpectType ["a", number][]
R.toArray(d1) // $ExpectType [string, number][]
R.toArray(r1) // $ExpectType ["a" | "b", number][]

R.insert('b', 0)({ a: 1 }) // $ExpectType Record<"a" | "b", number>
R.insert('b', 0)(l1) // $ExpectType Record<"a" | "b", number>
R.insert('b', 0)(d1) // $ExpectType Record<string, number>
R.insert('b', 0)(r1) // $ExpectType Record<"a" | "b", number>
R.insert(stringKey, 0)(r1) // $ExpectType Record<string, number>
R.insert('c', 0)(r1) // $ExpectType Record<"a" | "b" | "c", number>

R.remove('a')({ a: 1 }) // $ExpectType Record<never, number>
R.remove('b')({ a: 1 }) // $ExpectType Record<"a", number>
R.remove('a')(l1) // $ExpectType Record<never, number>
R.remove('b')(l1) // $ExpectType Record<"a", number>
R.remove('b')(d1) // $ExpectType Record<string, number>
R.remove('c')(r1) // $ExpectType Record<"a" | "b", number>
R.remove('a')(r1) // $ExpectType Record<"b", number>
R.remove(stringKey)(r1) // $ExpectType Record<string, number>

R.mapWithIndex((_k: 'a', n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
R.mapWithIndex((_k: 'a', n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
R.mapWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
R.mapWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Record<"a" | "b", boolean>

R.map((n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
R.map((n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
R.map((n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
R.map((n: number) => n > 2)(r1) // $ExpectType Record<"a" | "b", boolean>

R.reduceWithIndex('', (k: string, _n) => k)(d1) // $ExpectType string
R.reduceWithIndex('', (k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

R.foldMapWithIndex(Mon.monoidString)((k: string, _n) => k)(d1) // $ExpectType string
R.foldMapWithIndex(Mon.monoidString)((k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

R.reduceRightWithIndex('', (k: string, _n, _b) => k)(d1) // $ExpectType string
R.reduceRightWithIndex('', (k: 'a' | 'b', _n, _b) => k)(r1) // $ExpectType string

R.singleton('a', 1) // $ExpectType Record<"a", number>

R.traverseWithIndex(O.option)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
R.traverseWithIndex(O.option)((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a" | "b", number>>

R.traverse(O.option)((n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
R.traverse(O.option)((n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a" | "b", number>>

R.sequence(O.option)(do1) // $ExpectType Option<Record<string, number>>
R.sequence(O.option)(ro1) // $ExpectType Option<Record<"a" | "b", number>>

R.record.compact(do1) // $ExpectType Record<string, number>

R.partitionMapWithIndex((_k: string, n: number): E.Either<string, number> => E.right(n))(d1) // $ExpectType Separated<Record<string, string>, Record<string, number>>
R.partitionMapWithIndex((_k: 'a' | 'b', n: number): E.Either<string, number> => E.right(n))(r1) // $ExpectType Separated<Record<string, string>, Record<string, number>>

R.partitionWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Separated<Record<string, number>, Record<string, number>>
R.partitionWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Separated<Record<string, number>, Record<string, number>>

R.filterMapWithIndex((_k: string, n: number) => O.some(n))(d1) // $ExpectType Record<string, number>
R.filterMapWithIndex((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Record<string, number>

R.filterWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, number>
R.filterWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Record<string, number>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

R.fromFoldable(S.getFirstSemigroup<number>(), A.array)(arr1) // $ExpectType Record<string, number>
R.fromFoldable(S.getFirstSemigroup<number>(), A.array)(arr2) // $ExpectType Record<"a" | "b", number>

type Keys = 'key1' | 'key2'
R.getMonoid(S.semigroupSum) // $ExpectType Monoid<Record<string, number>>
R.getMonoid<Keys, number>(S.semigroupSum) // $ExpectType Monoid<Record<Keys, number>>

R.getEq<Keys, number>(Eq.eqNumber) // $ExpectType Eq<Record<Keys, number>>
R.getEq(Eq.eqNumber) // $ExpectType Eq<Record<string, number>>

R.toUnfoldable(A.array)({ a: 1 }) // $ExpectType ["a", number][]
R.toUnfoldable(A.array)({ a: 1, b: 2 }) // $ExpectType ["a" | "b", number][]

declare const fromFoldableF1: Fo.Foldable<'Test'>
declare const fromFoldableInput1: H.HKT<'Test', ['a' | 'b', number]>
R.fromFoldable(S.getFirstSemigroup<number>(), fromFoldableF1)(fromFoldableInput1) // $ExpectType Record<"a" | "b", number>

//
// Eq
//

Eq.getTupleEq(Eq.eqString, Eq.eqNumber, Eq.eqBoolean) // $ExpectType Eq<[string, number, boolean]>

//
// Ord
//

Or.getTupleOrd(Or.ordString, Or.ordNumber, Or.ordBoolean) // $ExpectType Ord<[string, number, boolean]>

//
// Semigroup
//

S.getTupleSemigroup(S.semigroupString, S.semigroupSum, S.semigroupAll) // $ExpectType Semigroup<[string, number, boolean]>

//
// Monoid
//

R.getMonoid(S.semigroupSum) // $ExpectType Monoid<Record<string, number>>
R.getMonoid<Keys, number>(S.semigroupSum) // $ExpectType Monoid<Record<Keys, number>>

Mon.getTupleMonoid(Mon.monoidString, Mon.monoidSum, Mon.monoidAll) // $ExpectType Monoid<[string, number, boolean]>

//
// Ring
//

Ring.getTupleRing(Field.fieldNumber, Field.fieldNumber, Field.fieldNumber) // $ExpectType Ring<[number, number, number]>

//
// NonEmptyArray
//

declare const nea2v1: NEA.NonEmptyArray<string>

NEA.cons(1, []) // $ExpectType NonEmptyArray<1>

nea2v1.sort(Or.ordString.compare) // $ExpectType NonEmptyArray<string>

//
// function
//

// flip

// should handle generics
Fu.flip(A.cons) // $ExpectType <A>(b: A[], a: A) => NonEmptyArray<A>

// tuple

Fu.tuple() // $ExpectType []
Fu.tuple(1) // $ExpectType [number]
Fu.tuple(1, 'a') // $ExpectType [number, string]
Fu.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

//
// Filterable overloads
//

declare function isString(x: unknown): x is string

O.option.filter(O.some<string | number>('a'), isString) // $ExpectType Option<string>
O.option.partition(O.some<string | number>('a'), isString) // $ExpectType Separated<Option<string | number>, Option<string>>

const witherableEither = E.getWitherable(Mon.monoidAll)

witherableEither.filter(E.right(1) as E.Either<boolean, string | number>, isString) // $ExpectType Either<boolean, string>
witherableEither.partition(E.right(1) as E.Either<boolean, string | number>, isString) // $ExpectType Separated<Either<boolean, string | number>, Either<boolean, string>>

declare function isStringWithIndex(i: number, x: unknown): x is string

A.array.filterWithIndex([] as Array<string | number>, isStringWithIndex) // $ExpectType string[]
A.array.partitionWithIndex([] as Array<string | number>, isStringWithIndex) // $ExpectType Separated<(string | number)[], string[]>

const filterableWithIndexMap = Map.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: unknown): x is string

filterableWithIndexMap.filterWithIndex(Map.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Map<"a" | "b", string>
filterableWithIndexMap.partitionWithIndex(Map.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Separated<Map<"a" | "b", string | number>, Map<"a" | "b", string>>
