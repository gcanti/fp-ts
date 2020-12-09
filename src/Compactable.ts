/**
 * `Compactable` represents data structures which can be _compacted_/_filtered_.
 *
 * @since 2.0.0
 */
import { Either } from './Either'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Option } from './Option'

/**
 * A `Separated` type which holds `left` and `right` parts.
 *
 * @since 2.0.0
 */
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts a data structure unwrapping inner Option
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates a data structure moving inner Left to the left side and inner Right to the right side of Separated
   */
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fa: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable2C<F extends URIS2, E> {
  readonly URI: F
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <R, E, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Compactable3C<F extends URIS3, E> {
  readonly URI: F
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Compactable4<F extends URIS4> {
  readonly URI: F
  readonly compact: <S, R, E, A>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}
