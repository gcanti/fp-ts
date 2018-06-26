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
import { Either } from './Either'
import { Predicate } from './function'
import { Option } from './Option'
import { Setoid } from './Setoid'

/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @typeclass
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partition: <A>(fa: Type<F, A>, p: Predicate<A>) => Separated<Type<F, A>, Type<F, A>>
  readonly filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  readonly filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: <U, L, A>(
    fa: Type3<F, U, L, A>,
    p: Predicate<A>
  ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable3C<F extends URIS3, U, L> extends Functor3C<F, U, L>, Compactable3C<F, U, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMap: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

export function span<F extends URIS3, U, L>(
  F: Filterable3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
export function span<F extends URIS3>(
  F: Filterable3<F>
): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
export function span<F extends URIS2, L>(
  F: Filterable2C<F, L>
): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
export function span<F extends URIS2>(
  F: Filterable2<F>
): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
export function span<F extends URIS>(
  F: Filterable1<F>
): <A>(fa: Type<F, A>, p: Predicate<A>) => Separated<Type<F, A>, Type<F, A>>
export function span<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>>
/**
 * Split {@link Filterable} structure into two parts:
 * Left: the longest initial substructure for which all elements satisfy the specified predicate
 * Right: the remaining elements
 * @function
 * @since 1.7.0
 */
export function span<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>> {
  return (fa, p) => {
    let collectLeft = true
    return F.partition(fa, a => {
      if (collectLeft) {
        if (p(a)) {
          return false
        }
        collectLeft = false
      }
      return true
    })
  }
}

export function takeWhile<F extends URIS3, U, L>(
  F: Filterable3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
export function takeWhile<F extends URIS3>(
  F: Filterable3<F>
): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
export function takeWhile<F extends URIS2, L>(
  F: Filterable2C<F, L>
): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
export function takeWhile<F extends URIS2>(
  F: Filterable2<F>
): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
export function takeWhile<F extends URIS>(F: Filterable1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
export function takeWhile<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
/**
 * Gets the longest initial {@link Filterable} substructure for which all element satisfy the specified predicate, creating a new {@link Filterable} structure
 */
export function takeWhile<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A> {
  return (fa, p) => {
    let done = false
    return F.filter(fa, a => {
      if (!done) {
        if (p(a)) {
          return true
        }
        done = true
      }
      return false
    })
  }
}

export function dropWhile<F extends URIS3, U, L>(
  F: Filterable3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
export function dropWhile<F extends URIS3>(
  F: Filterable3<F>
): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
export function dropWhile<F extends URIS2, L>(
  F: Filterable2C<F, L>
): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
export function dropWhile<F extends URIS2>(
  F: Filterable2<F>
): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
export function dropWhile<F extends URIS>(F: Filterable1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
export function dropWhile<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
/**
 * Removes the longest initial {@link Filterable} substructure for which all element satisfy the specified predicate, creating a new {@link Filterable} structure
 * @function
 * @since 1.7.0
 */
export function dropWhile<F>(F: Filterable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A> {
  const spanF = span(F)
  return (fa, p) => spanF(fa, p).right
}

export function unique<F extends URIS3, U, L, A>(
  F: Filterable3C<F, U, L>,
  S: Setoid<A>
): (fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
export function unique<F extends URIS3, A>(
  F: Filterable3<F>,
  S: Setoid<A>
): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
export function unique<F extends URIS2, L, A>(
  F: Filterable2C<F, L>,
  S: Setoid<A>
): (fa: Type2<F, L, A>) => Type2<F, L, A>
export function unique<F extends URIS2, A>(F: Filterable2<F>, S: Setoid<A>): <L>(fa: Type2<F, L, A>) => Type2<F, L, A>
export function unique<F extends URIS, A>(F: Filterable1<F>, S: Setoid<A>): (fa: Type<F, A>) => Type<F, A>
export function unique<F, A>(F: Filterable<F>, S: Setoid<A>): (fa: HKT<F, A>) => HKT<F, A>
/**
 * Remove duplicates from {@link Filterable} structure, keeping the first occurance of an element given {@link Setoid} for it.
 * @function
 * @since 1.7.0
 */
export function unique<F, A>(F: Filterable<F>, S: Setoid<A>): (fa: HKT<F, A>) => HKT<F, A> {
  return fa => {
    const repeations: A[] = []
    return F.filter(fa, a => {
      if (repeations.find(a_ => S.equals(a, a_))) {
        return false
      }
      repeations.push(a)
      return true
    })
  }
}
