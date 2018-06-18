import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3, Traversable3C } from './Traversable'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C } from './Filterable'
import { Either } from './Either'
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  Separated
} from './Compactable'

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
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <RL, RR, A>(
    ta: HKT<T, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, RL, RR, A>(
    ta: HKT<T, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <RL, RR, A>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, RL, RR, A>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <RL, RR, A>(ta: HKT<T, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(ta: HKT<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<T, RL>, HKT<T, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(ta: HKT<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<T, RL>, HKT<T, RR>>>

  /**
   * Filter a structure  with effects
   */
  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: HKT<T, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, HKT<T, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: HKT<T, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, HKT<T, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: HKT<T, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, HKT<T, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: HKT<T, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, HKT<T, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: HKT<T, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, HKT<T, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<T, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<T, B>>
}

export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <RL, RR, A>(
    ta: Type<T, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, RL, RR, A>(
    ta: Type<T, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <RL, RR, A>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, RL, RR, A>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <RL, RR, A>(ta: Type<T, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(ta: Type<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Type<T, RL>, Type<T, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(ta: Type<T, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Type<T, RL>, Type<T, RR>>>

  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type<T, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type<T, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type<T, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type<T, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type<T, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<T, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<T, B>>
}

export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <TL, FU, FL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <TL, FL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <TL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <TL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <TL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>

  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type2<T, TL, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <TL, FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<T, TL, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <TL, FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<T, TL, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type2<T, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, TL, B>>
}

export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(
    ta: Type2<T, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<T, TL, RL>, Type2<T, TL, RR>>>

  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type2<T, TL, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type2<T, TL, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<T, TL, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<T, TL, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type2<T, TL, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, TL, B>>
  wither<F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, TL, B>>
}

export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TU, TL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <TU, TL, FU, FL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TU, TL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <TU, TL, FL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <TU, TL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <TU, TL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <TU, TL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>

  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TU, TL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <TU, TL, FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <TU, TL, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type3<T, TU, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, TU, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, TU, TL, B>>
}

export interface Witherable3C<T extends URIS3, TU, TL> extends Traversable3C<T, TU, TL>, Filterable3C<T, TU, TL> {
  wilt<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F extends URIS>(
    F: Applicative1<F>
  ): <RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>
  wilt<F>(
    F: Applicative<F>
  ): <RL, RR, A>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<T, TU, TL, RL>, Type3<T, TU, TL, RR>>>

  wither<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type3<T, TU, TL, B>>
  wither<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type3<T, TU, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, TU, TL, B>>
  wither<F>(
    F: Applicative<F>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, TU, TL, B>>
}

/**
 * A default implementation of {@link Witherable.wither} using {@link Compactable.compact}.
 * @function
 * @since 1.6.3
 */
export function witherDefault<W extends URIS3, F extends URIS3, FU, FL>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative3C<F, FU, FL>
): (<WU, WL, A, B>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Option<B>>
) => Type3<F, FU, FL, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F extends URIS3, FU, FL>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative3C<F, FU, FL>
): (<WL, A, B>(wa: Type2<W, WL, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F extends URIS3, FU, FL>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative3C<F, FU, FL>
): (<A, B>(wa: Type<W, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type<W, B>>)
export function witherDefault<W, F extends URIS3, FU, FL>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative3C<F, FU, FL>
): (<A, B>(wa: HKT<W, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, HKT<W, B>>)

export function witherDefault<W extends URIS3, F extends URIS3>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative3<F>
): (<WU, WL, FU, FL, A, B>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Option<B>>
) => Type3<F, FU, FL, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F extends URIS3>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative3<F>
): (<WL, FU, FL, A, B>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Option<B>>
) => Type3<F, FU, FL, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F extends URIS3>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative3<F>
): (<FU, FL, A, B>(wa: Type<W, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, Type<W, B>>)
export function witherDefault<W, F extends URIS3>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative3<F>
): (<FU, FL, A, B>(wa: HKT<W, A>, f: (a: A) => Type3<F, FU, FL, Option<B>>) => Type3<F, FU, FL, HKT<W, B>>)

export function witherDefault<W extends URIS3, F extends URIS2, FL>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative2C<F, FL>
): (<WU, WL, A, B>(wa: Type3<W, WU, WL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F extends URIS2, FL>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative2C<F, FL>
): (<WL, A, B>(wa: Type2<W, WL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F extends URIS2, FL>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative2C<F, FL>
): (<A, B>(wa: Type<W, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type<W, B>>)
export function witherDefault<W, F extends URIS2, FL>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative2C<F, FL>
): (<A, B>(wa: HKT<W, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, HKT<W, B>>)

export function witherDefault<W extends URIS3, F extends URIS2>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative2<F>
): (<WU, WL, FL, A, B>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type2<F, FL, Option<B>>
) => Type2<F, FL, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F extends URIS2>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative2<F>
): (<WL, FL, A, B>(wa: Type2<W, WL, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F extends URIS2>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative2<F>
): (<FL, A, B>(wa: Type<W, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, Type<W, B>>)
export function witherDefault<W, F extends URIS2>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative2<F>
): (<FL, A, B>(wa: HKT<W, A>, f: (a: A) => Type2<F, FL, Option<B>>) => Type2<F, FL, HKT<W, B>>)

export function witherDefault<W extends URIS3, F extends URIS>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative1<F>
): (<WU, WL, A, B>(wa: Type3<W, WU, WL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F extends URIS>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative1<F>
): (<WL, A, B>(wa: Type2<W, WL, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F extends URIS>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative1<F>
): (<A, B>(wa: Type<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type<W, B>>)
export function witherDefault<W, F extends URIS>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative1<F>
): (<A, B>(wa: HKT<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, HKT<W, B>>)

export function witherDefault<W extends URIS3, F>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative<F>
): (<WU, WL, A, B>(wa: Type3<W, WU, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<W, WU, WL, B>>)
export function witherDefault<W extends URIS2, F>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative<F>
): (<WL, A, B>(wa: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>)
export function witherDefault<W extends URIS, F>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative<F>
): (<A, B>(wa: Type<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<W, B>>)
export function witherDefault<W, F>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative<F>
): (<A, B>(wa: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>)
export function witherDefault<W, F>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative<F>
): (<A, B>(wa: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>) {
  const traverse = W.traverse(F)
  return (wa, f) => F.map(traverse(wa, f), W.compact)
}

/**
 * A default implementation of {@link Witherable.wilt} using {@link Compactable.separate}
 * @function
 * @since 1.6.3
 */
export function wiltDefault<W extends URIS3, F extends URIS3, WU, WL>(
  W: Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>,
  F: Applicative3<F>
): (<FU, FL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS3, F extends URIS3>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative3<F>
): (<WU, WL, FU, FL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS3, WL>(
  W: Traversable2C<W, WL> & Compactable2C<W, WL>,
  F: Applicative3<F>
): (<FU, FL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS3>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative3<F>
): (<WL, FU, FL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS, F extends URIS3>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative3<F>
): (<FU, FL, RL, RR, A>(
  wa: Type<W, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>)
export function wiltDefault<W, F extends URIS3>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative3<F>
): (<FU, FL, RL, RR, A>(
  wa: HKT<W, A>,
  f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>)

export function wiltDefault<W extends URIS3, F extends URIS2, WU, WL, FL>(
  W: Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>,
  F: Applicative2C<F, FL>
): (<RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS3, F extends URIS2, FL>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative2C<F, FL>
): (<WU, WL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS2, WL, FL>(
  W: Traversable2C<W, WL> & Compactable2C<W, WL>,
  F: Applicative2C<F, FL>
): (<RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS2, FL>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative2C<F, FL>
): (<WL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS, F extends URIS2, FL>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative2C<F, FL>
): (<RL, RR, A>(
  wa: Type<W, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>)
export function wiltDefault<W, F extends URIS2, FL>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative2C<F, FL>
): (<RL, RR, A>(
  wa: HKT<W, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>)

export function wiltDefault<W extends URIS3, F extends URIS2, WU, WL>(
  W: Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>,
  F: Applicative2<F>
): (<FL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS3, F extends URIS2>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative2<F>
): (<WU, WL, FL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS2, WL>(
  W: Traversable2C<W, WL> & Compactable2C<W, WL>,
  F: Applicative2<F>
): (<FL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS2>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative2<F>
): (<WL, FL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS, F extends URIS2>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative2<F>
): (<FL, RL, RR, A>(
  wa: Type<W, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>)
export function wiltDefault<W, F extends URIS2>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative2<F>
): (<FL, RL, RR, A>(
  wa: HKT<W, A>,
  f: (a: A) => Type2<F, FL, Either<RL, RR>>
) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>)

export function wiltDefault<W extends URIS3, F extends URIS, WU, WL>(
  W: Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>,
  F: Applicative1<F>
): (<RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS3, F extends URIS>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative1<F>
): (<WU, WL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS, WL>(
  W: Traversable2C<W, WL> & Compactable2C<W, WL>,
  F: Applicative1<F>
): (<RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS2, F extends URIS>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative1<F>
): (<WL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS, F extends URIS>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative1<F>
): (<RL, RR, A>(wa: Type<W, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<Type<W, RL>, Type<W, RR>>>)
export function wiltDefault<W, F extends URIS>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative1<F>
): (<RL, RR, A>(wa: HKT<W, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<HKT<W, RL>, HKT<W, RR>>>)

export function wiltDefault<W extends URIS3, WU, WL, F>(
  W: Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>,
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS3, F>(
  W: Traversable3<W> & Compactable3<W>,
  F: Applicative<F>
): (<WU, WL, RL, RR, A>(
  wa: Type3<W, WU, WL, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>)
export function wiltDefault<W extends URIS2, F, WL>(
  W: Traversable2C<W, WL> & Compactable2C<W, WL>,
  F: Applicative<F>
): (<WL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS2, F>(
  W: Traversable2<W> & Compactable2<W>,
  F: Applicative<F>
): (<WL, RL, RR, A>(
  wa: Type2<W, WL, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>)
export function wiltDefault<W extends URIS, F>(
  W: Traversable1<W> & Compactable1<W>,
  F: Applicative<F>
): (<RL, RR, A>(wa: Type<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Type<W, RL>, Type<W, RR>>>)
export function wiltDefault<W, F>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative<F>
): (<RL, RR, A>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>)
export function wiltDefault<W, F>(
  W: Traversable<W> & Compactable<W>,
  F: Applicative<F>
): (<RL, RR, A>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>) {
  const traverse = W.traverse(F)
  return (tc, f) => F.map(traverse(tc, f), W.separate)
}
