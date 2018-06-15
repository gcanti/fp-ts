import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  Separated
} from './Compactable'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Either, left, right } from './Either'
import { Predicate } from './function'
import { none, Option, some } from './Option'

export type Partitioned<A, B> = {
  no: A
  yes: B
}
/**
 * @function
 * @since 1.6.3
 */
export const partitioned = <A, B>(no: A, yes: B): Partitioned<A, B> => ({
  no,
  yes
})

/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 * - {@link partitionMap}
 * - {@link partition}
 * - {@link filterMap}
 * - {@link filter}
 *
 * @typeclass
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 * @since 1.6.3
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on boolean predicate.
   */
  partition: <A>(fa: HKT<F, A>, p: Predicate<A>) => Partitioned<HKT<F, A>, HKT<F, A>>
  /**
   * Map over a data structure and filter based on a maybe.
   */
  filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean.
   */
  filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  partition: <A>(fa: Type<F, A>, p: Predicate<A>) => Partitioned<Type<F, A>, Type<F, A>>
  filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  partition: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Partitioned<Type2<F, L, A>, Type2<F, L, A>>
  filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  partition: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Partitioned<Type2<F, L, A>, Type2<F, L, A>>
  filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  partitionMap: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  partition: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Partitioned<Type3<F, U, L, A>, Type3<F, U, L, A>>
  filterMap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  filter: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

export interface Filterable3C<F extends URIS3, U, L> extends Functor3C<F, U, L>, Compactable3C<F, U, L> {
  partitionMap: <RL, RR, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  partition: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Partitioned<Type3<F, U, L, A>, Type3<F, U, L, A>>
  filterMap: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  filter: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

/**
 * @function
 * @since 1.6.3
 */
export const eitherBool = <A>(p: Predicate<A>) => (a: A): Either<A, A> => (p(a) ? right(a) : left(a))

/**
 * @function
 * @since 1.6.3
 */
export const optionBool = <A>(p: Predicate<A>) => (a: A): Option<A> => (p(a) ? some(a) : none)
