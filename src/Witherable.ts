import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3, Traversable3C } from './Traversable'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
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
