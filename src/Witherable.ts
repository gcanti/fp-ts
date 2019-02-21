import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option_'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3, Traversable3C } from './Traversable'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C } from './Filterable_'
import { Either } from './Either_'
import { Separated } from './Compactable_'

/**
 * `Witherable` represents data structures which can be _partitioned_ with effects in some {@link Applicative} functor.
 *
 * `wilt` signature (see {@link Compactable} `Separated`):
 *
 * ```ts
 * <F>(F: Applicative<F>) => <RL, RR, A>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>
 * ```
 *
 * `wither` signature:
 *
 * ```ts
 * <F>(F: Applicative<F>) => <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
 * ```
 *
 * @typeclass
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs
 */
// tslint:disable-next-line: deprecation
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  wither: Wither<T>
}

/**
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt: Wilt1<T>
  wither: Wither1<T>
}

/**
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt: Wilt2<T>
  wither: Wither2<T>
}

/**
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt: Wilt2C<T, TL>
  wither: Wither2C<T, TL>
}

/**
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt: Wilt3<T>
  wither: Wither3<T>
}

/**
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable3C<T extends URIS3, TU, TL> extends Traversable3C<T, TU, TL>, Filterable3C<T, TU, TL> {
  wilt: Wilt3C<T, TU, TL>
  wither: Wither3C<T, TU, TL>
}

/**
 * Interface for `Witherable.wither`
 * @since 1.7.0
 */
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<W, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <WL, A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither2C<W extends URIS2, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Type3<W, WU, WL, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither3C<W extends URIS3, WU, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type3<W, WU, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<W, WU, WL, B>>
}

/**
 * Interface for `Witherable.wilt`
 * @since 1.7.0
 */
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type<W, RL>, Type<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type<W, RL>, Type<W, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt2C<W extends URIS2, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt3C<W extends URIS3, WU, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
}
