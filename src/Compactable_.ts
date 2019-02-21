import { Either } from './Either_'
import {
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition12C,
  FunctorComposition21,
  FunctorComposition22,
  FunctorComposition22C,
  FunctorComposition2C1,
  FunctorComposition3C1
} from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option_'

/**
 * A `Separated` type which holds `left` and `right` parts.
 *
 * @interface
 * @since 1.7.0
 */
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}

/**
 * `Compactable` represents data structures which can be _compacted_/_filtered_. This is a generalization of
 * `catOptions` as a new function `compact`. `compact` has relations with {@link Functor}, {@link Applicative},
 * {@link Monad}, {@link Plus}, and {@link Traversable} in that we can use these classes to provide the ability to
 * operate on a data type by eliminating intermediate `None`s. This is useful for representing the filtering out of
 * values, or failure.
 *
 * @typeclass
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Compactable.purs
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

export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, Type<F, B>>
}

export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface Compactable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

export interface Compactable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly compact: <A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

export interface CompactableComposition<F, G> extends FunctorComposition<F, G> {
  readonly compact: <A>(fga: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>>
  readonly separate: <A, B>(fge: HKT<F, HKT<G, Either<A, B>>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>>
}

export interface CompactableComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  readonly compact: <A>(fga: Type<F, Type<G, Option<A>>>) => Type<F, Type<G, A>>
  readonly separate: <A, B>(fge: Type<F, Type<G, Either<A, B>>>) => Separated<Type<F, Type<G, A>>, Type<F, Type<G, B>>>
}

export interface CompactableComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  readonly compact: <LG, A>(fga: Type<F, Type2<G, LG, Option<A>>>) => Type<F, Type2<G, LG, A>>
  readonly separate: <LG, A, B>(
    fge: Type<F, Type2<G, LG, Either<A, B>>>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, B>>>
}

export interface CompactableComposition12C<F extends URIS, G extends URIS2, LG>
  extends FunctorComposition12C<F, G, LG> {
  readonly compact: <A>(fga: Type<F, Type2<G, LG, Option<A>>>) => Type<F, Type2<G, LG, A>>
  readonly separate: <A, B>(
    fge: Type<F, Type2<G, LG, Either<A, B>>>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, B>>>
}

export interface CompactableComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  readonly compact: <LF, A>(fga: Type2<F, LF, Type<G, Option<A>>>) => Type2<F, LF, Type<G, A>>
  readonly separate: <LF, A, B>(
    fge: Type2<F, LF, Type<G, Either<A, B>>>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, B>>>
}

export interface CompactableComposition2C1<F extends URIS2, G extends URIS, LF>
  extends FunctorComposition2C1<F, G, LF> {
  readonly compact: <A>(fga: Type2<F, LF, Type<G, Option<A>>>) => Type2<F, LF, Type<G, A>>
  readonly separate: <A, B>(
    fge: Type2<F, LF, Type<G, Either<A, B>>>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, B>>>
}

export interface CompactableComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  readonly compact: <LF, LG, A>(fga: Type2<F, LF, Type2<G, LG, Option<A>>>) => Type2<F, LF, Type2<G, LG, A>>
  readonly separate: <LF, LG, A, B>(
    fge: Type2<F, LF, Type2<G, LG, Either<A, B>>>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, B>>>
}

export interface CompactableComposition22C<F extends URIS2, G extends URIS2, LG>
  extends FunctorComposition22C<F, G, LG> {
  readonly compact: <LF, A>(fga: Type2<F, LF, Type2<G, LG, Option<A>>>) => Type2<F, LF, Type2<G, LG, A>>
  readonly separate: <LF, A, B>(
    fge: Type2<F, LF, Type2<G, LG, Either<A, B>>>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, B>>>
}

export interface CompactableComposition3C1<F extends URIS3, G extends URIS, UF, LF>
  extends FunctorComposition3C1<F, G, UF, LF> {
  readonly compact: <A>(fga: Type3<F, UF, LF, Type<G, Option<A>>>) => Type3<F, UF, LF, Type<G, A>>
  readonly separate: <A, B>(
    fge: Type3<F, UF, LF, Type<G, Either<A, B>>>
  ) => Separated<Type3<F, UF, LF, Type<G, A>>, Type3<F, UF, LF, Type<G, B>>>
}
