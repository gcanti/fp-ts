import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Either } from './Either'

/**
 * `Separated` type which holds `left` and `right` parts
 * @since 1.7.0
 */
export type Separated<A, B> = {
  readonly left: A
  readonly right: B
}

/**
 * @typeclass
 * `Compactable` represents data structures which can be _compacted_/_filtered_.
 * This is a generalization of catOptions as a new function `compact`. `compact` has relations with {@link Functor}, {@link Applicative}, {@link Monad}, {@link Plus}, and {@link Traversable} in that we can use these classes to provide the ability to operate on a data type by eliminating intermediate Nones. This is useful for representing the filtering out of values, or failure.
 * - {@link compact}
 * - {@link separate}
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Compactable.purs
 */
export interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts data structure unwrapping inner {@link Option}
   * @since 1.7.0
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates data structure moving inner {@link Left} to the left side and inner {@link Right} to the right side of {@link Separated}
   * @since 1.7.0
   */
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, Type<F, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly compact: <A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}
