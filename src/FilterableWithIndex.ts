import { Separated } from './Compactable'
import { Either } from './Either'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3 } from './Filterable'
import {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3
} from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'

type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

interface FilterWithIndex<F, I> {
  <A, B extends A>(fa: HKT<F, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): HKT<F, B>
  <A>(fa: HKT<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): HKT<F, A>
}

interface PartitionWithIndex<F, I> {
  <A, B extends A>(fa: HKT<F, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<HKT<F, A>, HKT<F, B>>
  <A>(fa: HKT<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableWithIndex<F, I> extends FunctorWithIndex<F, I>, Filterable<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => Option<B>) => HKT<F, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}

interface FilterWithIndex1<F extends URIS, I> {
  <A, B extends A>(fa: Type<F, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Type<F, B>
  <A>(fa: Type<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Type<F, A>
}

interface PartitionWithIndex1<F extends URIS, I> {
  <A, B extends A>(fa: Type<F, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<Type<F, A>, Type<F, B>>
  <A>(fa: Type<F, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<Type<F, A>, Type<F, A>>
}

export interface FilterableWithIndex1<F extends URIS, I> extends FunctorWithIndex1<F, I>, Filterable1<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: Type<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partitionWithIndex: PartitionWithIndex1<F, I>
  readonly filterMapWithIndex: <A, B>(fa: Type<F, A>, f: (i: I, a: A) => Option<B>) => Type<F, B>
  readonly filterWithIndex: FilterWithIndex1<F, I>
}

interface FilterWithIndex2<F extends URIS2, I> {
  <L, A, B extends A>(fa: Type2<F, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Type2<F, L, B>
  <L, A>(fa: Type2<F, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Type2<F, L, A>
}

interface PartitionWithIndex2<F extends URIS2, I> {
  <L, A, B extends A>(fa: Type2<F, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<
    Type2<F, L, A>,
    Type2<F, L, B>
  >
  <L, A>(fa: Type2<F, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<Type2<F, L, A>, Type2<F, L, A>>
}

export interface FilterableWithIndex2<F extends URIS2, I> extends FunctorWithIndex2<F, I>, Filterable2<F> {
  readonly partitionMapWithIndex: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex2<F, I>
  readonly filterMapWithIndex: <L, A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: FilterWithIndex2<F, I>
}

interface FilterWithIndex2C<F extends URIS2, I, L> {
  <A, B extends A>(fa: Type2<F, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Type2<F, L, B>
  <A>(fa: Type2<F, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Type2<F, L, A>
}

interface PartitionWithIndex2C<F extends URIS2, I, L> {
  <A, B extends A>(fa: Type2<F, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<
    Type2<F, L, A>,
    Type2<F, L, B>
  >
  <A>(fa: Type2<F, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<Type2<F, L, A>, Type2<F, L, A>>
}

export interface FilterableWithIndex2C<F extends URIS2, I, L> extends FunctorWithIndex2C<F, I, L>, Filterable2C<F, L> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex2C<F, I, L>
  readonly filterMapWithIndex: <A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: FilterWithIndex2C<F, I, L>
}

interface FilterWithIndex3<F extends URIS3, I> {
  <U, L, A, B extends A>(fa: Type3<F, U, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Type3<F, U, L, B>
  <U, L, A>(fa: Type3<F, U, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Type3<F, U, L, A>
}

interface PartitionWithIndex3<F extends URIS3, I> {
  <U, L, A, B extends A>(fa: Type3<F, U, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<
    Type3<F, U, L, A>,
    Type3<F, U, L, B>
  >
  <U, L, A>(fa: Type3<F, U, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<
    Type3<F, U, L, A>,
    Type3<F, U, L, A>
  >
}

export interface FilterableWithIndex3<F extends URIS3, I> extends FunctorWithIndex3<F, I>, Filterable3<F> {
  readonly partitionMapWithIndex: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex3<F, I>
  readonly filterMapWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filterWithIndex: FilterWithIndex3<F, I>
}
