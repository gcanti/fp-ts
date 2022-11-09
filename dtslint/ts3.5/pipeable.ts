import * as P from '../../src/pipeable'
import * as T from '../../src/Task'
import * as TE from '../../src/TaskEither'
import * as RTE from '../../src/ReaderTaskEither'
import * as SRTE from '../../src/StateReaderTaskEither'
import * as S from '../../src/string'
import * as TH from '../../src/These'
import { Chain3C } from '../../src/Chain'
import * as O from '../../src/Option'
import * as Eq from '../../src/Eq'
import * as RA from '../../src/ReadonlyArray'
import * as R from '../../src/Reader'
import * as RT from '../../src/ReadonlyTuple'

const TEApplicative = TE.getApplicativeTaskValidation(T.ApplyPar, S.Semigroup)
const TEAlt = TE.getAltTaskValidation(S.Semigroup)
const RTEApplicative = RTE.getApplicativeReaderTaskValidation(T.ApplyPar, S.Semigroup)
const RTEAlt = RTE.getAltReaderTaskValidation(S.Semigroup)

//
// map
//

// $ExpectType <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
P.map(T.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <E>(fa: TaskEither<E, A>) => TaskEither<E, B>
P.map(TE.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => (fa: TaskEither<string, A>) => TaskEither<string, B>
P.map(TEApplicative)

// $ExpectType <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
P.map(RTE.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <R>(fa: ReaderTaskEither<R, string, A>) => ReaderTaskEither<R, string, B>
P.map(RTEApplicative)

// $ExpectType <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
P.map(SRTE.Functor)

//
// mapWithIndex
//

// $ExpectType <A, B>(f: (i: number, a: A) => B) => (fa: readonly A[]) => readonly B[]
P.mapWithIndex(RA.FunctorWithIndex)

//
// contramap
//

// $ExpectType <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
P.contramap(Eq.Contravariant)

//
// ap
//

// $ExpectType <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
P.ap(T.ApplyPar)

// $ExpectType <E, A>(fa: TaskEither<E, A>) => <B>(fab: TaskEither<E, (a: A) => B>) => TaskEither<E, B>
P.ap(TE.ApplyPar)

// $ExpectType <A>(fa: TaskEither<string, A>) => <B>(fab: TaskEither<string, (a: A) => B>) => TaskEither<string, B>
P.ap(TEApplicative)

// $ExpectType <R, E, A>(fa: ReaderTaskEither<R, E, A>) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
P.ap(RTE.ApplyPar)

// $ExpectType <R, A>(fa: ReaderTaskEither<R, string, A>) => <B>(fab: ReaderTaskEither<R, string, (a: A) => B>) => ReaderTaskEither<R, string, B>
P.ap(RTEApplicative)

// $ExpectType <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
P.ap(SRTE.Apply)

//
// chain
//

// $ExpectType <A, B>(f: (a: A) => Task<B>) => (fa: Task<A>) => Task<B>
P.chain(T.Chain)

// $ExpectType <A, E, B>(f: (a: A) => TaskEither<E, B>) => (fa: TaskEither<E, A>) => TaskEither<E, B>
P.chain(TE.Chain)

const THChain = TH.getChain(S.Semigroup)

// $ExpectType <A, B>(f: (a: A) => These<string, B>) => (fa: These<string, A>) => These<string, B>
P.chain(THChain)

// $ExpectType <A, R, E, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
P.chain(RTE.Chain)

declare const Chain3C: Chain3C<RTE.URI, string>
// $ExpectType <A, R, B>(f: (a: A) => ReaderTaskEither<R, string, B>) => (fa: ReaderTaskEither<R, string, A>) => ReaderTaskEither<R, string, B>
P.chain(Chain3C)

// $ExpectType <A, S, R, E, B>(f: (a: A) => StateReaderTaskEither<S, R, E, B>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
P.chain(SRTE.Chain)

//
// bimap
//

// $ExpectType <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: These<E, A>) => These<G, B>
P.bimap(TH.Bifunctor)

//
// mapLeft
//

// $ExpectType <E, G>(f: (e: E) => G) => <A>(fea: These<E, A>) => These<G, A>
P.mapLeft(TH.Bifunctor)

//
// extend
//

// $ExpectType <A, B>(f: (wa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
P.extend(RA.Extend)

//
// reduce
//

// $ExpectType <A, B>(b: B, f: (b: B, a: A) => B) => (fa: readonly A[]) => B
P.reduce(RA.Foldable)

//
// foldMap
//

// $ExpectType <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: readonly A[]) => M
P.foldMap(RA.Foldable)

//
// reduceRight
//

// $ExpectType <A, B>(b: B, f: (a: A, b: B) => B) => (fa: readonly A[]) => B
P.reduceRight(RA.Foldable)

//
// reduceWithIndex
//

// $ExpectType <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: readonly A[]) => B
P.reduceWithIndex(RA.FoldableWithIndex)

//
// foldMapWithIndex
//

// $ExpectType <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: readonly A[]) => M
P.foldMapWithIndex(RA.FoldableWithIndex)

//
// reduceRightWithIndex
//

// $ExpectType <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: readonly A[]) => B
P.reduceRightWithIndex(RA.FoldableWithIndex)

//
// alt
//

// $ExpectType <A>(that: Lazy<Option<A>>) => (fa: Option<A>) => Option<A>
P.alt(O.Alt)

// $ExpectType <E, A>(that: Lazy<TaskEither<E, A>>) => (fa: TaskEither<E, A>) => TaskEither<E, A>
P.alt(TE.Alt)

// $ExpectType <A>(that: Lazy<TaskEither<string, A>>) => (fa: TaskEither<string, A>) => TaskEither<string, A>
P.alt(TEAlt)

// $ExpectType <R, E, A>(that: Lazy<ReaderTaskEither<R, E, A>>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
P.alt(RTE.Alt)

// $ExpectType <R, A>(that: Lazy<ReaderTaskEither<R, string, A>>) => (fa: ReaderTaskEither<R, string, A>) => ReaderTaskEither<R, string, A>
P.alt(RTEAlt)

// $ExpectType <S, R, E, A>(that: Lazy<StateReaderTaskEither<S, R, E, A>>) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
P.alt(SRTE.Alt)

//
// filter
//

// $ExpectType { <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => readonly B[]; <A>(predicate: Predicate<A>): (fa: readonly A[]) => readonly A[]; }
P.filter(RA.Filterable)

//
// filterMap
//

// $ExpectType <A, B>(f: (a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
P.filterMap(RA.Filterable)

//
// partition
//

// $ExpectType { <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => Separated<readonly A[], readonly B[]>; <A>(predicate: Predicate<A>): (fa: readonly A[]) => Separated<readonly A[], readonly A[]>; }
P.partition(RA.Filterable)

//
// partitionMap
//

// $ExpectType <A, B, C>(f: (a: A) => Either<B, C>) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
P.partitionMap(RA.Filterable)

//
// filterWithIndex
//

// $ExpectType { <A, B extends A>(refinement: RefinementWithIndex<number, A, B>): (fa: readonly A[]) => readonly B[]; <A>(predicate: PredicateWithIndex<number, A>): (fa: readonly A[]) => readonly A[]; }
P.filterWithIndex(RA.FilterableWithIndex)

//
// filterMapWithIndex
//

// $ExpectType <A, B>(f: (i: number, a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
P.filterMapWithIndex(RA.FilterableWithIndex)

//
// partitionWithIndex
//

// $ExpectType { <A, B extends A>(refinement: RefinementWithIndex<number, A, B>): (fa: readonly A[]) => Separated<readonly A[], readonly B[]>; <A>(predicate: PredicateWithIndex<number, A>): (fa: readonly A[]) => Separated<readonly A[], readonly A[]>; }
P.partitionWithIndex(RA.FilterableWithIndex)

//
// partitionMapWithIndex
//

// $ExpectType <A, B, C>(f: (i: number, a: A) => Either<B, C>) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
P.partitionMapWithIndex(RA.FilterableWithIndex)

//
// promap
//

// $ExpectType <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
P.promap(R.Profunctor)

//
// compose
//

// $ExpectType <E, A>(ea: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly [B, E]
P.compose(RT.Semigroupoid)
