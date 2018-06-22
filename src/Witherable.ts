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
import { identity } from './function'

/**
 * Interface for {@link Witherable.wither}
 * @since 1.7.0
 */
export interface Wither<W> {
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither1<W extends URIS> {
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<W, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither2<W extends URIS2> {
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <WL, A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <WL, A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither2C<W extends URIS2, WL> {
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}

/**
 * @see Wither
 * @since 1.7.0
 */
export interface Wither3<W extends URIS3> {
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, A, B>(
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
  <F extends URIS3, FU, FL>(F: Applicative3<F>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type3<W, WU, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type3<W, WU, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<W, WU, WL, B>>
}

/**
 * Interface for {@link Witherable.wilt}
 * @since 1.7.0
 */
export interface Wilt<W> {
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
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
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type<W, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type<W, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, Type<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type<W, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt2<W extends URIS2> {
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt2C<W extends URIS2, WL> {
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type2<W, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt3<W extends URIS3> {
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
}

/**
 * @see Wilt
 * @since 1.7.0
 */
export interface Wilt3C<W extends URIS3, WU, WL> {
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, Type3<W, WU, WL, RR>>>
}

/**
 * `Witherable` represents data structures which can be _partitioned_ with effects in some {@link Applicative} functor.
 * - {@link wilt}
 * - {@link wither}
 *
 * @typeclass
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs
 */
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
 * @typeclass
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt: Wilt1<T>
  wither: Wither1<T>
}

/**
 * @typeclass
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt: Wilt2<T>
  wither: Wither2<T>
}

/**
 * @typeclass
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt: Wilt2C<T, TL>
  wither: Wither2C<T, TL>
}

/**
 * @typeclass
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt: Wilt3<T>
  wither: Wither3<T>
}

/**
 * @typeclass
 * @since 1.7.0
 * @see Witherable
 */
export interface Witherable3C<T extends URIS3, TU, TL> extends Traversable3C<T, TU, TL>, Filterable3C<T, TU, TL> {
  wilt: Wilt3C<T, TU, TL>
  wither: Wither3C<T, TU, TL>
}

/**
 * Gets default implementation of {@link Witherable.wither} using {@link Traversable.map}, {@link Traversable.traverse} {@link Compactable.compact}.
 * @function
 * @since 1.7.0
 */
export function witherDefault<W extends URIS3, WU, WL>(
  W: Pick<Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>, 'URI' | '_U' | '_L' | 'traverse' | 'compact'>
): Wither3C<W, WU, WL>
export function witherDefault<W extends URIS3>(
  W: Pick<Traversable3<W> & Compactable3<W>, 'URI' | 'traverse' | 'compact'>
): Wither3<W>
export function witherDefault<W extends URIS2, WL>(
  W: Pick<Traversable2C<W, WL> & Compactable2C<W, WL>, 'URI' | '_L' | 'traverse' | 'compact'>
): Wither2C<W, WL>
export function witherDefault<W extends URIS2>(
  W: Pick<Traversable2<W> & Compactable2<W>, 'URI' | 'traverse' | 'compact'>
): Wither2<W>
export function witherDefault<W extends URIS>(
  W: Pick<Traversable1<W> & Compactable1<W>, 'URI' | 'traverse' | 'compact'>
): Wither1<W>
export function witherDefault<W>(W: Pick<Traversable<W> & Compactable<W>, 'URI' | 'traverse' | 'compact'>): Wither<W>
export function witherDefault<W>(W: Pick<Traversable<W> & Compactable<W>, 'URI' | 'traverse' | 'compact'>): Wither<W> {
  return <F>(F: Applicative<F>) => {
    const traverseF = W.traverse(F)
    return <A, B>(wa: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>): HKT<F, HKT<W, B>> =>
      F.map(traverseF(wa, f), W.compact)
  }
}

/**
 * Gets default implementation of {@link Witherable.wilt} using {@link Traversable.map}, {@link Traversable.traverse} and {@link Compactable.separate}
 * @function
 * @since 1.7.0
 */
export function wiltDefault<W extends URIS3, WU, WL>(
  W: Pick<Traversable3C<W, WU, WL> & Compactable3C<W, WU, WL>, 'URI' | '_U' | '_L' | 'traverse' | 'separate'>
): Wilt3C<W, WU, WL>
export function wiltDefault<W extends URIS3>(
  W: Pick<Traversable3<W> & Compactable3<W>, 'URI' | 'traverse' | 'separate'>
): Wilt3<W>
export function wiltDefault<W extends URIS2, WL>(
  W: Pick<Traversable2C<W, WL> & Compactable2C<W, WL>, 'URI' | '_L' | 'traverse' | 'separate'>
): Wilt2C<W, WL>
export function wiltDefault<W extends URIS2>(
  W: Pick<Traversable2<W> & Compactable2<W>, 'URI' | 'traverse' | 'separate'>
): Wilt2<W>
export function wiltDefault<W extends URIS>(
  W: Pick<Traversable1<W> & Compactable1<W>, 'URI' | 'traverse' | 'separate'>
): Wilt1<W>
export function wiltDefault<W>(W: Pick<Traversable<W> & Compactable<W>, 'URI' | 'traverse' | 'separate'>): Wilt<W>
export function wiltDefault<W>(W: Pick<Traversable<W> & Compactable<W>, 'URI' | 'traverse' | 'separate'>): Wilt<W> {
  return <F>(F: Applicative<F>) => {
    const traverseF = W.traverse(F)
    return <RL, RR, A>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<RL, RR>>): HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>> =>
      F.map(traverseF(wa, f), W.separate)
  }
}

/**
 * Partitions between {@link Left} and {@link Right} values in {@link Witherable} structure with effects in {@link Applicative}.
 * @function
 * @since 1.7.0
 */
export function wilted<W extends URIS3, F extends URIS3, WU, WL, FU, FL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative3C<F, FU, FL>
): <RL, RR>(
  w: Type3<W, WU, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS3, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative3<F>
): <FU, FL, RL, RR>(
  w: Type3<W, WU, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS2, WU, WL, FL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative2C<F, FL>
): <RL, RR>(
  w: Type3<W, WU, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS2, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative2<F>
): <FL, RL, RR>(
  w: Type3<W, WU, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative1<F>
): <RL, RR>(
  w: Type3<W, WU, WL, Type<F, Either<RL, RR>>>
) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative<F>
): <RL, RR>(
  w: Type3<W, WU, WL, HKT<F, Either<RL, RR>>>
) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
//
export function wilted<W extends URIS3, F extends URIS3, FU, FL>(
  W: Witherable3<W>,
  F: Applicative3C<F, FU, FL>
): <WU, WL, RL, RR>(
  w: Type3<W, WU, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS3>(
  W: Witherable3<W>,
  F: Applicative3<F>
): <WU, WL, FU, FL, RL, RR>(
  w: Type3<W, WU, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS2, FL>(
  W: Witherable3<W>,
  F: Applicative2C<F, FL>
): <WU, WL, RL, RR>(
  w: Type3<W, WU, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS2>(
  W: Witherable3<W>,
  F: Applicative2<F>
): <WU, WL, FL, RL, RR>(
  w: Type3<W, WU, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F extends URIS>(
  W: Witherable3<W>,
  F: Applicative1<F>
): <WU, WL, RL, RR>(
  w: Type3<W, WU, WL, Type<F, Either<RL, RR>>>
) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
export function wilted<W extends URIS3, F>(
  W: Witherable3<W>,
  F: Applicative<F>
): <WU, WL, RL, RR>(
  w: Type3<W, WU, WL, HKT<F, Either<RL, RR>>>
) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
//
export function wilted<W extends URIS2, F extends URIS3, WL, FU, FL>(
  W: Witherable2C<W, WL>,
  F: Applicative3C<F, FU, FL>
): <RL, RR>(
  w: Type2<W, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS3, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative3<F>
): <FU, FL, RL, RR>(
  w: Type2<W, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS2, WL, FL>(
  W: Witherable2C<W, WL>,
  F: Applicative2C<F, FL>
): <RL, RR>(
  w: Type2<W, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS2, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative2<F>
): <FL, RL, RR>(
  w: Type2<W, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative1<F>
): <RL, RR>(w: Type2<W, WL, Type<F, Either<RL, RR>>>) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative<F>
): <RL, RR>(w: Type2<W, WL, HKT<F, Either<RL, RR>>>) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
//
export function wilted<W extends URIS2, F extends URIS3, FU, FL>(
  W: Witherable2<W>,
  F: Applicative3C<F, FU, FL>
): <WL, RL, RR>(
  w: Type2<W, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS3>(
  W: Witherable2<W>,
  F: Applicative3<F>
): <WL, FU, FL, RL, RR>(
  w: Type2<W, WL, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS2, FL>(
  W: Witherable2<W>,
  F: Applicative2C<F, FL>
): <WL, RL, RR>(
  w: Type2<W, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS2>(
  W: Witherable2<W>,
  F: Applicative2<F>
): <WL, FL, RL, RR>(
  w: Type2<W, WL, Type2<F, FL, Either<RL, RR>>>
) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F extends URIS>(
  W: Witherable2<W>,
  F: Applicative1<F>
): <WL, RL, RR>(w: Type2<W, WL, Type<F, Either<RL, RR>>>) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
export function wilted<W extends URIS2, F>(
  W: Witherable2<W>,
  F: Applicative<F>
): <WL, RL, RR>(w: Type2<W, WL, HKT<F, Either<RL, RR>>>) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
//
export function wilted<W extends URIS, F extends URIS3, FU, FL>(
  W: Witherable1<W>,
  F: Applicative3C<F, FU, FL>
): <RL, RR>(w: Type<W, Type3<F, FU, FL, Either<RL, RR>>>) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W extends URIS, F extends URIS3>(
  W: Witherable1<W>,
  F: Applicative3<F>
): <FU, FL, RL, RR>(
  w: Type<W, Type3<F, FU, FL, Either<RL, RR>>>
) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W extends URIS, F extends URIS2, FL>(
  W: Witherable1<W>,
  F: Applicative2C<F, FL>
): <RL, RR>(w: Type<W, Type2<F, FL, Either<RL, RR>>>) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W extends URIS, F extends URIS2>(
  W: Witherable1<W>,
  F: Applicative2<F>
): <FL, RL, RR>(w: Type<W, Type2<F, FL, Either<RL, RR>>>) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W extends URIS, F extends URIS>(
  W: Witherable1<W>,
  F: Applicative1<F>
): <RL, RR>(w: Type<W, Type<F, Either<RL, RR>>>) => Type<F, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W extends URIS, F>(
  W: Witherable1<W>,
  F: Applicative<F>
): <RL, RR>(w: Type<W, HKT<F, Either<RL, RR>>>) => HKT<F, Separated<Type<W, RL>, Type<W, RR>>>
export function wilted<W, F extends URIS3, FU, FL>(
  W: Witherable<W>,
  F: Applicative3C<F, FU, FL>
): <RL, RR>(w: HKT<W, Type3<F, FU, FL, Either<RL, RR>>>) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F extends URIS3>(
  W: Witherable<W>,
  F: Applicative3<F>
): <FU, FL, RL, RR>(w: HKT<W, Type3<F, FU, FL, Either<RL, RR>>>) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F extends URIS2, FL>(
  W: Witherable<W>,
  F: Applicative2C<F, FL>
): <RL, RR>(w: HKT<W, Type2<F, FL, Either<RL, RR>>>) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F extends URIS2>(
  W: Witherable<W>,
  F: Applicative2<F>
): <FL, RL, RR>(w: HKT<W, Type2<F, FL, Either<RL, RR>>>) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F extends URIS>(
  W: Witherable<W>,
  F: Applicative1<F>
): <RL, RR>(w: HKT<W, Type<F, Either<RL, RR>>>) => Type<F, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F>(
  W: Witherable<W>,
  F: Applicative<F>
): <RL, RR>(w: HKT<W, HKT<F, Either<RL, RR>>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>
export function wilted<W, F>(
  W: Witherable<W>,
  F: Applicative<F>
): <RL, RR>(w: HKT<W, HKT<F, Either<RL, RR>>>) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>> {
  const wiltF = W.wilt(F)
  return w => wiltF(w, identity)
}

/**
 * Filters out all the `None` values in {@link Witherable} structure with effects in {@link Applicative}.
 * @function
 * @since 1.7.0
 */
export function withered<W extends URIS3, F extends URIS3, WU, WL, FU, FL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative3C<F, FU, FL>
): <A>(w: Type3<W, WU, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS3, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative3<F>
): <FU, FL, A>(w: Type3<W, WU, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS2, WU, WL, FL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative2C<F, FL>
): <A>(w: Type3<W, WU, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS2, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative2<F>
): <FL, A>(w: Type3<W, WU, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative1<F>
): <A>(w: Type3<W, WU, WL, Type<F, Option<A>>>) => Type<F, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F, WU, WL>(
  W: Witherable3C<W, WU, WL>,
  F: Applicative<F>
): <A>(w: Type3<W, WU, WL, HKT<F, Option<A>>>) => HKT<F, Type3<W, WU, WL, A>>
//
export function withered<W extends URIS3, F extends URIS3, FU, FL>(
  W: Witherable3<W>,
  F: Applicative3C<F, FU, FL>
): <WU, WL, A>(w: Type3<W, WU, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS3>(
  W: Witherable3<W>,
  F: Applicative3<F>
): <WU, WL, FU, FL, A>(w: Type3<W, WU, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS2, FL>(
  W: Witherable3<W>,
  F: Applicative2C<F, FL>
): <WU, WL, A>(w: Type3<W, WU, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS2>(
  W: Witherable3<W>,
  F: Applicative2<F>
): <WU, WL, FL, A>(w: Type3<W, WU, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F extends URIS>(
  W: Witherable3<W>,
  F: Applicative1<F>
): <WU, WL, A>(w: Type3<W, WU, WL, Type<F, Option<A>>>) => Type<F, Type3<W, WU, WL, A>>
export function withered<W extends URIS3, F>(
  W: Witherable3<W>,
  F: Applicative<F>
): <WU, WL, A>(w: Type3<W, WU, WL, HKT<F, Option<A>>>) => HKT<F, Type3<W, WU, WL, A>>
//
export function withered<W extends URIS2, F extends URIS3, WL, FU, FL>(
  W: Witherable2C<W, WL>,
  F: Applicative3C<F, FU, FL>
): <A>(w: Type2<W, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS3, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative3<F>
): <FU, FL, A>(w: Type2<W, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS2, WL, FL>(
  W: Witherable2C<W, WL>,
  F: Applicative2C<F, FL>
): <A>(w: Type2<W, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS2, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative2<F>
): <FL, A>(w: Type2<W, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative1<F>
): <A>(w: Type2<W, WL, Type<F, Option<A>>>) => Type<F, Type2<W, WL, A>>
export function withered<W extends URIS2, F, WL>(
  W: Witherable2C<W, WL>,
  F: Applicative<F>
): <A>(w: Type2<W, WL, HKT<F, Option<A>>>) => HKT<F, Type2<W, WL, A>>
//
export function withered<W extends URIS2, F extends URIS3, FU, FL>(
  W: Witherable2<W>,
  F: Applicative3C<F, FU, FL>
): <WL, A>(w: Type2<W, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS3>(
  W: Witherable2<W>,
  F: Applicative3<F>
): <WL, FU, FL, A>(w: Type2<W, WL, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS2, FL>(
  W: Witherable2<W>,
  F: Applicative2C<F, FL>
): <WL, A>(w: Type2<W, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS2>(
  W: Witherable2<W>,
  F: Applicative2<F>
): <WL, FL, A>(w: Type2<W, WL, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type2<W, WL, A>>
export function withered<W extends URIS2, F extends URIS>(
  W: Witherable2<W>,
  F: Applicative1<F>
): <WL, A>(w: Type2<W, WL, Type<F, Option<A>>>) => Type<F, Type2<W, WL, A>>
export function withered<W extends URIS2, F>(
  W: Witherable2<W>,
  F: Applicative<F>
): <WL, A>(w: Type2<W, WL, HKT<F, Option<A>>>) => HKT<F, Type2<W, WL, A>>
//
export function withered<W extends URIS, F extends URIS3, FU, FL>(
  W: Witherable1<W>,
  F: Applicative3C<F, FU, FL>
): <A>(w: Type<W, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type<W, A>>
export function withered<W extends URIS, F extends URIS3>(
  W: Witherable1<W>,
  F: Applicative3<F>
): <FU, FL, A>(w: Type<W, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, Type<W, A>>
export function withered<W extends URIS, F extends URIS2, FL>(
  W: Witherable1<W>,
  F: Applicative2C<F, FL>
): <A>(w: Type<W, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type<W, A>>
export function withered<W extends URIS, F extends URIS2>(
  W: Witherable1<W>,
  F: Applicative2<F>
): <FL, A>(w: Type<W, Type2<F, FL, Option<A>>>) => Type2<F, FL, Type<W, A>>
export function withered<W extends URIS, F extends URIS>(
  W: Witherable1<W>,
  F: Applicative1<F>
): <A>(w: Type<W, Type<F, Option<A>>>) => Type<F, Type<W, A>>
export function withered<W extends URIS, F>(
  W: Witherable1<W>,
  F: Applicative<F>
): <A>(w: Type<W, HKT<F, Option<A>>>) => HKT<F, Type<W, A>>
//
export function withered<W, F extends URIS3, FU, FL>(
  W: Witherable<W>,
  F: Applicative3C<F, FU, FL>
): <A>(w: HKT<W, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, HKT<W, A>>
export function withered<W, F extends URIS3>(
  W: Witherable<W>,
  F: Applicative3<F>
): <FU, FL, A>(w: HKT<W, Type3<F, FU, FL, Option<A>>>) => Type3<F, FU, FL, HKT<W, A>>
export function withered<W, F extends URIS2, FL>(
  W: Witherable<W>,
  F: Applicative2C<F, FL>
): <A>(w: HKT<W, Type2<F, FL, Option<A>>>) => Type2<F, FL, HKT<W, A>>
export function withered<W, F extends URIS2>(
  W: Witherable<W>,
  F: Applicative2<F>
): <FL, A>(w: HKT<W, Type2<F, FL, Option<A>>>) => Type2<F, FL, HKT<W, A>>
export function withered<W, F extends URIS>(
  W: Witherable<W>,
  F: Applicative1<F>
): <A>(w: HKT<W, Type<F, Option<A>>>) => Type<F, HKT<W, A>>
export function withered<W, F>(
  W: Witherable<W>,
  F: Applicative<F>
): <A>(w: HKT<W, HKT<F, Option<A>>>) => HKT<F, HKT<W, A>>
export function withered<W, F>(
  W: Witherable<W>,
  F: Applicative<F>
): <A>(w: HKT<W, HKT<F, Option<A>>>) => HKT<F, HKT<W, A>> {
  const witherF = W.wither(F)
  return w => witherF(w, identity)
}
