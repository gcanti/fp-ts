import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3, Traversable3C } from './Traversable'
import { Applicative } from './Applicative'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C } from './Filterable'
import { Either } from './Either'
import { Separated } from './Compactable'

/**
 * `Witherable` represents data structures which can be _partitioned_ with effects in some {@link Applicative} functor.
 * - {@link wilt}
 * - {@link wither}
 *
 * @typeclass
 * @since 1.6.3
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs
 */
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, A>(ta: HKT<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<T, RL>, HKT<T, RR>>>
  /**
   * Filter a structure  with effects
   */
  readonly wither: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<T, B>>
}

export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, A>(ta: Type<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Type<T, RL>, Type<T, RR>>>
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<T, B>>
}

export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, L, A>(
    ta: Type2<T, L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, L, RL>, Type2<T, L, RR>>>
  readonly wither: <F>(
    F: Applicative<F>
  ) => <L, A, B>(ta: Type2<T, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, L, B>>
}

export interface Witherable2C<T extends URIS2, L> extends Traversable2C<T, L>, Filterable2C<T, L> {
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, A>(
    ta: Type2<T, L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, L, RL>, Type2<T, L, RR>>>
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type2<T, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, L, B>>
}

export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, U, L, A>(
    ta: Type3<T, U, L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, U, L, RL>, Type3<T, U, L, RR>>>
  readonly wither: <F>(
    F: Applicative<F>
  ) => <U, L, A, B>(ta: Type3<T, U, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, U, L, B>>
}

export interface Witherable3C<T extends URIS3, U, L> extends Traversable3C<T, U, L>, Filterable3C<T, U, L> {
  readonly wilt: <F>(
    F: Applicative<F>
  ) => <RL, RR, A>(
    ta: Type3<T, U, L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, U, L, RL>, Type3<T, U, L, RR>>>
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type3<T, U, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, U, L, B>>
}
