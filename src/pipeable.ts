/**
 * @since 2.0.0
 */
import { Alt, Alt1, Alt2, Alt2C, Alt3, Alt3C, Alt4 } from './Alt'
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import { Bifunctor, Bifunctor2, Bifunctor3, Bifunctor3C, Bifunctor4 } from './Bifunctor'
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  Compactable4,
  Separated
} from './Compactable'
import {
  Contravariant,
  Contravariant1,
  Contravariant2,
  Contravariant2C,
  Contravariant3,
  Contravariant3C,
  Contravariant4
} from './Contravariant'
import { Either } from './Either'
import { Extend, Extend1, Extend2, Extend2C, Extend3, Extend3C, Extend4 } from './Extend'
import {
  Filterable,
  Filterable1,
  Filterable2,
  Filterable2C,
  Filterable3,
  Filterable3C,
  Filterable4
} from './Filterable'
import {
  FilterableWithIndex,
  FilterableWithIndex1,
  FilterableWithIndex2,
  FilterableWithIndex2C,
  FilterableWithIndex3,
  FilterableWithIndex3C,
  FilterableWithIndex4,
  PredicateWithIndex,
  RefinementWithIndex
} from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3, Foldable3C, Foldable4 } from './Foldable'
import {
  FoldableWithIndex,
  FoldableWithIndex1,
  FoldableWithIndex2,
  FoldableWithIndex2C,
  FoldableWithIndex3,
  FoldableWithIndex3C,
  FoldableWithIndex4
} from './FoldableWithIndex'
import { identity, Lazy, pipe as pipeFromFunctionModule, Predicate, Refinement } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3,
  FunctorWithIndex3C,
  FunctorWithIndex4
} from './FunctorWithIndex'
import { HKT, HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import {
  MonadThrow,
  MonadThrow1,
  MonadThrow2,
  MonadThrow2C,
  MonadThrow3,
  MonadThrow3C,
  MonadThrow4
} from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Profunctor, Profunctor2, Profunctor2C, Profunctor3, Profunctor3C, Profunctor4 } from './Profunctor'
import {
  Semigroupoid,
  Semigroupoid2,
  Semigroupoid2C,
  Semigroupoid3,
  Semigroupoid3C,
  Semigroupoid4
} from './Semigroupoid'

// TODO: remove module in v3

/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow) from `function` module instead.
 *
 * @since 2.0.0
 */
export const pipe = pipeFromFunctionModule

/**
 * @since 2.0.0
 */
export interface PipeableFunctor<F> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctor1<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctor2C<F extends URIS2, E> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableFunctor3C<F extends URIS3, E> {
  readonly map: <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctor4<F extends URIS4> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant<F> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant1<F extends URIS> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant2<F extends URIS2> {
  readonly contramap: <A, B>(f: (b: B) => A) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant2C<F extends URIS2, E> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant3<F extends URIS3> {
  readonly contramap: <A, B>(f: (b: B) => A) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableContravariant3C<F extends URIS3, E> {
  readonly contramap: <A, B>(f: (b: B) => A) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableContravariant4<F extends URIS4> {
  readonly contramap: <A, B>(f: (b: B) => A) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex<F, I> extends PipeableFunctor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex1<F extends URIS, I> extends PipeableFunctor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex2<F extends URIS2, I> extends PipeableFunctor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex2C<F extends URIS2, I, E> extends PipeableFunctor2C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex3<F extends URIS3, I> extends PipeableFunctor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableFunctorWithIndex3C<F extends URIS3, I, E> extends PipeableFunctor3C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableFunctorWithIndex4<F extends URIS4, I> extends PipeableFunctor4<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply<F> extends PipeableFunctor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
  readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>
  readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply1<F extends URIS> extends PipeableFunctor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
  readonly apFirst: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, A>
  readonly apSecond: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
  readonly apFirst: <E, B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly apSecond: <E, B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply2C<F extends URIS2, E> extends PipeableFunctor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
  readonly apFirst: <B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly apSecond: <B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
  readonly apFirst: <R, E, B>(fb: Kind3<F, R, E, B>) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly apSecond: <R, E, B>(fb: Kind3<F, R, E, B>) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableApply3C<F extends URIS3, E> extends PipeableFunctor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
  readonly apFirst: <R, B>(fb: Kind3<F, R, E, B>) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly apSecond: <R, B>(fb: Kind3<F, R, E, B>) => <A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableApply4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
  readonly apFirst: <S, R, E, B>(fb: Kind4<F, S, R, E, B>) => <A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly apSecond: <S, R, E, B>(fb: Kind4<F, S, R, E, B>) => <A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain<F> extends PipeableApply<F> {
  readonly chain: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, A>
  readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain1<F extends URIS> extends PipeableApply1<F> {
  readonly chain: <A, B>(f: (a: A) => Kind<F, B>) => (ma: Kind<F, A>) => Kind<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => Kind<F, B>) => (ma: Kind<F, A>) => Kind<F, A>
  readonly flatten: <A>(mma: Kind<F, Kind<F, A>>) => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <E, A, B>(f: (a: A) => Kind2<F, E, B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly chainFirst: <E, A, B>(f: (a: A) => Kind2<F, E, B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly flatten: <E, A>(mma: Kind2<F, E, Kind2<F, E, A>>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain2C<F extends URIS2, E> extends PipeableApply2C<F, E> {
  readonly chain: <A, B>(f: (a: A) => Kind2<F, E, B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly chainFirst: <A, B>(f: (a: A) => Kind2<F, E, B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  readonly flatten: <A>(mma: Kind2<F, E, Kind2<F, E, A>>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly chainFirst: <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly flatten: <R, E, A>(mma: Kind3<F, R, E, Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}

/**
 * @since 2.2.0
 */
export interface PipeableChain3C<F extends URIS3, E> extends PipeableApply3C<F, E> {
  readonly chain: <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly chainFirst: <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => (ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly flatten: <R, A>(mma: Kind3<F, R, E, Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableChain4<F extends URIS4> extends PipeableApply4<F> {
  readonly chain: <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly chainFirst: <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly flatten: <S, R, E, A>(mma: Kind4<F, S, R, E, Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend<F> extends PipeableFunctor<F> {
  readonly extend: <A, B>(f: (wa: HKT<F, A>) => B) => (wa: HKT<F, A>) => HKT<F, B>
  readonly duplicate: <A>(wa: HKT<F, A>) => HKT<F, HKT<F, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend1<F extends URIS> extends PipeableFunctor1<F> {
  readonly extend: <A, B>(f: (wa: Kind<F, A>) => B) => (wa: Kind<F, A>) => Kind<F, B>
  readonly duplicate: <A>(wa: Kind<F, A>) => Kind<F, Kind<F, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <E, A, B>(f: (wa: Kind2<F, E, A>) => B) => (wa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly duplicate: <E, A>(wa: Kind2<F, E, A>) => Kind2<F, E, Kind2<F, E, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend2C<F extends URIS2, E> extends PipeableFunctor2C<F, E> {
  readonly extend: <A, B>(f: (wa: Kind2<F, E, A>) => B) => (wa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly duplicate: <A>(wa: Kind2<F, E, A>) => Kind2<F, E, Kind2<F, E, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <R, E, A, B>(f: (wa: Kind3<F, R, E, A>) => B) => (wa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly duplicate: <R, E, A>(wa: Kind3<F, R, E, A>) => Kind3<F, R, E, Kind3<F, R, E, A>>
}

/**
 * @since 2.2.0
 */
export interface PipeableExtend3C<F extends URIS3, E> extends PipeableFunctor3C<F, E> {
  readonly extend: <R, A, B>(f: (wa: Kind3<F, R, E, A>) => B) => (wa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly duplicate: <R, A>(wa: Kind3<F, R, E, A>) => Kind3<F, R, E, Kind3<F, R, E, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableExtend4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind4<F, S, R, E, A>) => B
  ) => (wa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly duplicate: <S, R, E, A>(wa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, Kind4<F, S, R, E, A>>
}

/**
 * @since 2.0.0
 */
export interface PipeableBifunctor<F> {
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: HKT2<F, E, A>) => HKT2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: HKT2<F, E, A>) => HKT2<F, G, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Kind2<F, E, A>) => Kind2<F, G, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @since 2.2.0
 */
export interface PipeableBifunctor3C<F extends URIS3, E> {
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableBifunctor4<F extends URIS4> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable1<F extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable2<F extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable2C<F extends URIS2, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable3<F extends URIS3> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 2.2.0
 */
export interface PipeableFoldable3C<F extends URIS3, E> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldable4<F extends URIS4> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex<F, I> extends PipeableFoldable<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex1<F extends URIS, I> extends PipeableFoldable1<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex2<F extends URIS2, I> extends PipeableFoldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <E>(fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <E>(fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <E>(fa: Kind2<F, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex2C<F extends URIS2, I, E> extends PipeableFoldable2C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex3<F extends URIS3, I> extends PipeableFoldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R, E>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R, E>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 2.2.0
 */
export interface PipeableFoldableWithIndex3C<F extends URIS3, I, E> extends PipeableFoldable3C<F, E> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <R>(fa: Kind3<F, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <R>(fa: Kind3<F, R, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableFoldableWithIndex4<F extends URIS4, I> extends PipeableFoldable4<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => B
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt<F> {
  readonly alt: <A>(that: Lazy<HKT<F, A>>) => (fa: HKT<F, A>) => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt1<F extends URIS> {
  readonly alt: <A>(that: Lazy<Kind<F, A>>) => (fa: Kind<F, A>) => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt2<F extends URIS2> {
  readonly alt: <E, A>(that: Lazy<Kind2<F, E, A>>) => (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt2C<F extends URIS2, E> {
  readonly alt: <A>(that: Lazy<Kind2<F, E, A>>) => (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt3<F extends URIS3> {
  readonly alt: <R, E, A>(that: Lazy<Kind3<F, R, E, A>>) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.2.0
 */
export interface PipeableAlt3C<F extends URIS3, E> {
  readonly alt: <R, A>(that: Lazy<Kind3<F, R, E, A>>) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableAlt4<F extends URIS4> {
  readonly alt: <S, R, E, A>(that: Lazy<Kind4<F, S, R, E, A>>) => (fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable<F> {
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable1<F extends URIS> {
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fa: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable2<F extends URIS2> {
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable2C<F extends URIS2, E> {
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable3<F extends URIS3> {
  readonly compact: <R, E, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @since 2.2.0
 */
export interface PipeableCompactable3C<F extends URIS3, E> {
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableCompactable4<F extends URIS4> {
  readonly compact: <S, R, E, A>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable<F> extends PipeableCompactable<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable1<F extends URIS> extends PipeableCompactable1<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
    <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable2<F extends URIS2> extends PipeableCompactable2<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable2C<F extends URIS2, E> extends PipeableCompactable2C<F, E> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable3<F extends URIS3> extends PipeableCompactable3<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}

/**
 * @since 2.2.0
 */
export interface PipeableFilterable3C<F extends URIS3, E> extends PipeableCompactable3C<F, E> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterable4<F extends URIS4> extends PipeableCompactable4<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
    <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    <A>(predicate: Predicate<A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
  }
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex<F, I> extends PipeableFilterable<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex1<F extends URIS, I> extends PipeableFilterable1<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind<F, A>) => Kind<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Kind<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex2<F extends URIS2, I> extends PipeableFilterable2<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex2C<F extends URIS2, I, E> extends PipeableFilterable2C<F, E> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind2<F, E, A>
    ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex3<F extends URIS3, I> extends PipeableFilterable3<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}

/**
 * @since 2.2.0
 */
export interface PipeableFilterableWithIndex3C<F extends URIS3, I, E> extends PipeableFilterable3C<F, E> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R>(
      fa: Kind3<F, R, E, A>
    ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableFilterableWithIndex4<F extends URIS4, I> extends PipeableFilterable4<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
      fa: Kind4<F, S, R, E, A>
    ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
  }
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
}

/**
 * @since 2.0.0
 */
export interface PipeableProfunctor<F> {
  readonly promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: HKT2<F, E, A>) => HKT2<F, D, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableProfunctor2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Kind2<F, E, A>) => Kind2<F, D, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableProfunctor2C<F extends URIS2, E> extends PipeableFunctor2C<F, E> {
  readonly promap: <A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Kind2<F, E, A>) => Kind2<F, D, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableProfunctor3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly promap: <R, E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableProfunctor3C<F extends URIS3, E> extends PipeableFunctor3C<F, E> {
  readonly promap: <R, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableProfunctor4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly promap: <S, R, E, A, D, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => (fbc: Kind4<F, S, R, E, A>) => Kind4<F, S, R, D, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid<F> {
  readonly compose: <E, A>(la: HKT2<F, E, A>) => <B>(ab: HKT2<F, A, B>) => HKT2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid2<F extends URIS2> {
  readonly compose: <E, A>(la: Kind2<F, E, A>) => <B>(ab: Kind2<F, A, B>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid2C<F extends URIS2, E> {
  readonly compose: <A>(la: Kind2<F, E, A>) => <B>(ab: Kind2<F, A, B>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid3<F extends URIS3> {
  readonly compose: <R, E, A>(la: Kind3<F, R, E, A>) => <B>(ab: Kind3<F, R, A, B>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface PipeableSemigroupoid3C<F extends URIS3, E> {
  readonly compose: <R, A>(la: Kind3<F, R, E, A>) => <B>(ab: Kind3<F, R, A, B>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableSemigroupoid4<F extends URIS4> {
  readonly compose: <S, R, E, A>(la: Kind4<F, S, R, E, A>) => <B>(ab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow<F> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => HKT<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT<F, A>) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT<F, A>) => HKT<F, A>
  }
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow1<F extends URIS> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind<F, A>) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind<F, A>) => Kind<F, A>
  }
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow2<F extends URIS2> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow2C<F extends URIS2, E> {
  readonly fromOption: (onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow3<F extends URIS3> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => Kind3<F, R, E, A>
  readonly fromEither: <R, E, A>(ma: Either<E, A>) => Kind3<F, R, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => Kind3<F, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
}

/**
 * @since 2.2.0
 */
export interface PipeableMonadThrow3C<F extends URIS3, E> {
  readonly fromOption: (onNone: Lazy<E>) => <R, A>(ma: Option<A>) => Kind3<F, R, E, A>
  readonly fromEither: <R, A>(ma: Either<E, A>) => Kind3<F, R, E, A>
  readonly fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => Kind3<F, U, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
  }
  readonly filterOrElse: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
      ma: Kind3<F, R, E, A>
    ) => Kind3<F, R, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
  }
}

/**
 * @since 2.0.0
 */
export interface PipeableMonadThrow4<F extends URIS4> {
  readonly fromOption: <E>(onNone: Lazy<E>) => <S, R, A>(ma: Option<A>) => Kind4<F, S, R, E, A>
  readonly fromEither: <S, R, E, A>(ma: Either<E, A>) => Kind4<F, S, R, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
      ma: Kind4<F, S, R, E, A>
    ) => Kind4<F, S, R, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
  }
}

const isFunctor = <F>(I: any): I is Functor<F> => typeof I.map === 'function'
const isContravariant = <F>(I: any): I is Contravariant<F> => typeof I.contramap === 'function'
const isFunctorWithIndex = <F>(I: any): I is FunctorWithIndex<F, unknown> => typeof I.mapWithIndex === 'function'
const isApply = <F>(I: any): I is Apply<F> => typeof I.ap === 'function'
const isChain = <F>(I: any): I is Chain<F> => typeof I.chain === 'function'
const isBifunctor = <F>(I: any): I is Bifunctor<F> => typeof I.bimap === 'function'
const isExtend = <F>(I: any): I is Extend<F> => typeof I.extend === 'function'
const isFoldable = <F>(I: any): I is Foldable<F> => typeof I.reduce === 'function'
const isFoldableWithIndex = <F>(I: any): I is FoldableWithIndex<F, unknown> => typeof I.reduceWithIndex === 'function'
const isAlt = <F>(I: any): I is Alt<F> => typeof I.alt === 'function'
const isCompactable = <F>(I: any): I is Compactable<F> => typeof I.compact === 'function'
const isFilterable = <F>(I: any): I is Filterable<F> => typeof I.filter === 'function'
const isFilterableWithIndex = <F>(I: any): I is FilterableWithIndex<F, unknown> =>
  typeof I.filterWithIndex === 'function'
const isProfunctor = <F>(I: any): I is Profunctor<F> => typeof I.promap === 'function'
const isSemigroupoid = <F>(I: any): I is Semigroupoid<F> => typeof I.compose === 'function'
const isMonadThrow = <F>(I: any): I is MonadThrow<F> => typeof I.throwError === 'function'

/**
 * @since 2.0.0
 */
export function pipeable<F extends URIS4, I>(
  I: { readonly URI: F } & I
): (I extends Chain4<F>
  ? PipeableChain4<F>
  : I extends Apply4<F>
  ? PipeableApply4<F>
  : I extends Functor4<F>
  ? PipeableFunctor4<F>
  : {}) &
  (I extends Contravariant4<F> ? PipeableContravariant4<F> : {}) &
  (I extends FunctorWithIndex4<F, infer Ix> ? PipeableFunctorWithIndex4<F, Ix> : {}) &
  (I extends Bifunctor4<F> ? PipeableBifunctor4<F> : {}) &
  (I extends Extend4<F> ? PipeableExtend4<F> : {}) &
  (I extends FoldableWithIndex4<F, infer Ix>
    ? PipeableFoldableWithIndex4<F, Ix>
    : I extends Foldable4<F>
    ? PipeableFoldable4<F>
    : {}) &
  (I extends Alt4<F> ? PipeableAlt4<F> : {}) &
  (I extends FilterableWithIndex4<F, infer Ix>
    ? PipeableFilterableWithIndex4<F, Ix>
    : I extends Filterable4<F>
    ? PipeableFilterable4<F>
    : I extends Compactable4<F>
    ? PipeableCompactable4<F>
    : {}) &
  (I extends Profunctor4<F> ? PipeableProfunctor4<F> : {}) &
  (I extends Semigroupoid4<F> ? PipeableSemigroupoid4<F> : {}) &
  (I extends MonadThrow4<F> ? PipeableMonadThrow4<F> : {})
export function pipeable<F extends URIS3, I>(
  I: { readonly URI: F } & I
): (I extends Chain3<F>
  ? PipeableChain3<F>
  : I extends Apply3<F>
  ? PipeableApply3<F>
  : I extends Functor3<F>
  ? PipeableFunctor3<F>
  : {}) &
  (I extends Contravariant3<F> ? PipeableContravariant3<F> : {}) &
  (I extends FunctorWithIndex3<F, infer Ix> ? PipeableFunctorWithIndex3<F, Ix> : {}) &
  (I extends Bifunctor3<F> ? PipeableBifunctor3<F> : {}) &
  (I extends Extend3<F> ? PipeableExtend3<F> : {}) &
  (I extends FoldableWithIndex3<F, infer Ix>
    ? PipeableFoldableWithIndex3<F, Ix>
    : I extends Foldable3<F>
    ? PipeableFoldable3<F>
    : {}) &
  (I extends Alt3<F> ? PipeableAlt3<F> : {}) &
  (I extends FilterableWithIndex3<F, infer Ix>
    ? PipeableFilterableWithIndex3<F, Ix>
    : I extends Filterable3<F>
    ? PipeableFilterable3<F>
    : I extends Compactable3<F>
    ? PipeableCompactable3<F>
    : {}) &
  (I extends Profunctor3<F> ? PipeableProfunctor3<F> : {}) &
  (I extends Semigroupoid3<F> ? PipeableSemigroupoid3<F> : {}) &
  (I extends MonadThrow3<F> ? PipeableMonadThrow3<F> : {})
export function pipeable<F extends URIS3, I, E>(
  I: { readonly URI: F } & I
): (I extends Chain3C<F, E>
  ? PipeableChain3C<F, E>
  : I extends Apply3C<F, E>
  ? PipeableApply3C<F, E>
  : I extends Functor3C<F, E>
  ? PipeableFunctor3C<F, E>
  : {}) &
  (I extends Contravariant3C<F, E> ? PipeableContravariant3C<F, E> : {}) &
  (I extends FunctorWithIndex3C<F, infer Ix, E> ? PipeableFunctorWithIndex3C<F, Ix, E> : {}) &
  (I extends Bifunctor3C<F, E> ? PipeableBifunctor3C<F, E> : {}) &
  (I extends Extend3C<F, E> ? PipeableExtend3C<F, E> : {}) &
  (I extends FoldableWithIndex3C<F, infer Ix, E>
    ? PipeableFoldableWithIndex3C<F, Ix, E>
    : I extends Foldable3C<F, E>
    ? PipeableFoldable3C<F, E>
    : {}) &
  (I extends Alt3C<F, E> ? PipeableAlt3C<F, E> : {}) &
  (I extends FilterableWithIndex3C<F, infer Ix, E>
    ? PipeableFilterableWithIndex3C<F, Ix, E>
    : I extends Filterable3C<F, E>
    ? PipeableFilterable3C<F, E>
    : I extends Compactable3C<F, E>
    ? PipeableCompactable3C<F, E>
    : {}) &
  (I extends Profunctor3C<F, E> ? PipeableProfunctor3C<F, E> : {}) &
  (I extends Semigroupoid3C<F, E> ? PipeableSemigroupoid3C<F, E> : {}) &
  (I extends MonadThrow3C<F, E> ? PipeableMonadThrow3C<F, E> : {})
export function pipeable<F extends URIS2, I, E>(
  I: { readonly URI: F; readonly _E: E } & I
): (I extends Chain2C<F, E>
  ? PipeableChain2C<F, E>
  : I extends Apply2C<F, E>
  ? PipeableApply2C<F, E>
  : I extends Functor2C<F, E>
  ? PipeableFunctor2C<F, E>
  : {}) &
  (I extends Contravariant2C<F, E> ? PipeableContravariant2C<F, E> : {}) &
  (I extends FunctorWithIndex2C<F, infer Ix, E> ? PipeableFunctorWithIndex2C<F, Ix, E> : {}) &
  (I extends Extend2C<F, E> ? PipeableExtend2C<F, E> : {}) &
  (I extends FoldableWithIndex2C<F, infer Ix, E>
    ? PipeableFoldableWithIndex2C<F, Ix, E>
    : I extends Foldable2C<F, E>
    ? PipeableFoldable2C<F, E>
    : {}) &
  (I extends Alt2C<F, E> ? PipeableAlt2C<F, E> : {}) &
  (I extends FilterableWithIndex2C<F, infer Ix, E>
    ? PipeableFilterableWithIndex2C<F, Ix, E>
    : I extends Filterable2C<F, E>
    ? PipeableFilterable2C<F, E>
    : I extends Compactable2C<F, E>
    ? PipeableCompactable2C<F, E>
    : {}) &
  (I extends Profunctor2C<F, E> ? PipeableProfunctor2C<F, E> : {}) &
  (I extends Semigroupoid2C<F, E> ? PipeableSemigroupoid2C<F, E> : {}) &
  (I extends MonadThrow2C<F, E> ? PipeableMonadThrow2C<F, E> : {})
export function pipeable<F extends URIS2, I>(
  I: { readonly URI: F } & I
): (I extends Chain2<F>
  ? PipeableChain2<F>
  : I extends Apply2<F>
  ? PipeableApply2<F>
  : I extends Functor2<F>
  ? PipeableFunctor2<F>
  : {}) &
  (I extends Contravariant2<F> ? PipeableContravariant2<F> : {}) &
  (I extends FunctorWithIndex2<F, infer Ix> ? PipeableFunctorWithIndex2<F, Ix> : {}) &
  (I extends Bifunctor2<F> ? PipeableBifunctor2<F> : {}) &
  (I extends Extend2<F> ? PipeableExtend2<F> : {}) &
  (I extends FoldableWithIndex2<F, infer Ix>
    ? PipeableFoldableWithIndex2<F, Ix>
    : I extends Foldable2<F>
    ? PipeableFoldable2<F>
    : {}) &
  (I extends Alt2<F> ? PipeableAlt2<F> : {}) &
  (I extends FilterableWithIndex2<F, infer Ix>
    ? PipeableFilterableWithIndex2<F, Ix>
    : I extends Filterable2<F>
    ? PipeableFilterable2<F>
    : I extends Compactable2<F>
    ? PipeableCompactable2<F>
    : {}) &
  (I extends Profunctor2<F> ? PipeableProfunctor2<F> : {}) &
  (I extends Semigroupoid2<F> ? PipeableSemigroupoid2<F> : {}) &
  (I extends MonadThrow2<F> ? PipeableMonadThrow2<F> : {})
export function pipeable<F extends URIS, I>(
  I: { readonly URI: F } & I
): (I extends Chain1<F>
  ? PipeableChain1<F>
  : I extends Apply1<F>
  ? PipeableApply1<F>
  : I extends Functor1<F>
  ? PipeableFunctor1<F>
  : {}) &
  (I extends Contravariant1<F> ? PipeableContravariant1<F> : {}) &
  (I extends FunctorWithIndex1<F, infer Ix> ? PipeableFunctorWithIndex1<F, Ix> : {}) &
  (I extends Extend1<F> ? PipeableExtend1<F> : {}) &
  (I extends FoldableWithIndex1<F, infer Ix>
    ? PipeableFoldableWithIndex1<F, Ix>
    : I extends Foldable1<F>
    ? PipeableFoldable1<F>
    : {}) &
  (I extends Alt1<F> ? PipeableAlt1<F> : {}) &
  (I extends FilterableWithIndex1<F, infer Ix>
    ? PipeableFilterableWithIndex1<F, Ix>
    : I extends Filterable1<F>
    ? PipeableFilterable1<F>
    : I extends Compactable1<F>
    ? PipeableCompactable1<F>
    : {}) &
  (I extends MonadThrow1<F> ? PipeableMonadThrow1<F> : {})
export function pipeable<F, I>(
  I: { readonly URI: F } & I
): (I extends Chain<F>
  ? PipeableChain<F>
  : I extends Apply<F>
  ? PipeableApply<F>
  : I extends Functor<F>
  ? PipeableFunctor<F>
  : {}) &
  (I extends Contravariant<F> ? PipeableContravariant<F> : {}) &
  (I extends FunctorWithIndex<F, infer Ix> ? PipeableFunctorWithIndex<F, Ix> : {}) &
  (I extends Bifunctor<F> ? PipeableBifunctor<F> : {}) &
  (I extends Extend<F> ? PipeableExtend<F> : {}) &
  (I extends FoldableWithIndex<F, infer Ix>
    ? PipeableFoldableWithIndex<F, Ix>
    : I extends Foldable<F>
    ? PipeableFoldable<F>
    : {}) &
  (I extends Alt<F> ? PipeableAlt<F> : {}) &
  (I extends FilterableWithIndex<F, infer Ix>
    ? PipeableFilterableWithIndex<F, Ix>
    : I extends Filterable<F>
    ? PipeableFilterable<F>
    : I extends Compactable<F>
    ? PipeableCompactable<F>
    : {}) &
  (I extends Profunctor<F> ? PipeableProfunctor<F> : {}) &
  (I extends Semigroupoid<F> ? PipeableSemigroupoid<F> : {}) &
  (I extends MonadThrow<F> ? PipeableMonadThrow<F> : {})
export function pipeable<F, I>(I: { readonly URI: F } & I): Record<string, unknown> {
  const r: any = {}
  if (isFunctor<F>(I)) {
    const map: PipeableFunctor<F>['map'] = (f) => (fa) => I.map(fa, f)
    r.map = map
  }
  if (isContravariant<F>(I)) {
    const contramap: PipeableContravariant<F>['contramap'] = (f) => (fa) => I.contramap(fa, f)
    r.contramap = contramap
  }
  if (isFunctorWithIndex<F>(I)) {
    const mapWithIndex: PipeableFunctorWithIndex<F, unknown>['mapWithIndex'] = (f) => (fa) => I.mapWithIndex(fa, f)
    r.mapWithIndex = mapWithIndex
  }
  if (isApply<F>(I)) {
    const ap: PipeableApply<F>['ap'] = (fa) => (fab) => I.ap(fab, fa)
    const apFirst: PipeableApply<F>['apFirst'] = (fb) => (fa) =>
      I.ap(
        I.map(fa, (a) => () => a),
        fb
      )
    r.ap = ap
    r.apFirst = apFirst
    r.apSecond = <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>): HKT<F, B> =>
      I.ap(
        I.map(fa, () => (b: B) => b),
        fb
      )
  }
  if (isChain<F>(I)) {
    const chain: PipeableChain<F>['chain'] = (f) => (ma) => I.chain(ma, f)
    const chainFirst: PipeableChain<F>['chainFirst'] = (f) => (ma) => I.chain(ma, (a) => I.map(f(a), () => a))
    const flatten: PipeableChain<F>['flatten'] = (mma) => I.chain(mma, identity)
    r.chain = chain
    r.chainFirst = chainFirst
    r.flatten = flatten
  }
  if (isBifunctor<F>(I)) {
    const bimap: PipeableBifunctor<F>['bimap'] = (f, g) => (fa) => I.bimap(fa, f, g)
    const mapLeft: PipeableBifunctor<F>['mapLeft'] = (f) => (fa) => I.mapLeft(fa, f)
    r.bimap = bimap
    r.mapLeft = mapLeft
  }
  if (isExtend<F>(I)) {
    const extend: PipeableExtend<F>['extend'] = (f) => (wa) => I.extend(wa, f)
    const duplicate: PipeableExtend<F>['duplicate'] = (wa) => I.extend(wa, identity)
    r.extend = extend
    r.duplicate = duplicate
  }
  if (isFoldable<F>(I)) {
    const reduce: PipeableFoldable<F>['reduce'] = (b, f) => (fa) => I.reduce(fa, b, f)
    const foldMap: PipeableFoldable<F>['foldMap'] = (M) => {
      const foldMapM = I.foldMap(M)
      return (f) => (fa) => foldMapM(fa, f)
    }
    const reduceRight: PipeableFoldable<F>['reduceRight'] = (b, f) => (fa) => I.reduceRight(fa, b, f)
    r.reduce = reduce
    r.foldMap = foldMap
    r.reduceRight = reduceRight
  }
  if (isFoldableWithIndex<F>(I)) {
    const reduceWithIndex: PipeableFoldableWithIndex<F, unknown>['reduceWithIndex'] = (b, f) => (fa) =>
      I.reduceWithIndex(fa, b, f)
    const foldMapWithIndex: PipeableFoldableWithIndex<F, unknown>['foldMapWithIndex'] = (M) => {
      const foldMapM = I.foldMapWithIndex(M)
      return (f) => (fa) => foldMapM(fa, f)
    }
    const reduceRightWithIndex: PipeableFoldableWithIndex<F, unknown>['reduceRightWithIndex'] = (b, f) => (fa) =>
      I.reduceRightWithIndex(fa, b, f)
    r.reduceWithIndex = reduceWithIndex
    r.foldMapWithIndex = foldMapWithIndex
    r.reduceRightWithIndex = reduceRightWithIndex
  }
  if (isAlt<F>(I)) {
    const alt: PipeableAlt<F>['alt'] = (that) => (fa) => I.alt(fa, that)
    r.alt = alt
  }
  if (isCompactable<F>(I)) {
    r.compact = I.compact
    r.separate = I.separate
  }
  if (isFilterable<F>(I)) {
    const filter: PipeableFilterable<F>['filter'] = <A>(predicate: Predicate<A>) => (fa: HKT<F, A>) =>
      I.filter(fa, predicate)
    const filterMap: PipeableFilterable<F>['filterMap'] = (f) => (fa) => I.filterMap(fa, f)
    const partition: PipeableFilterable<F>['partition'] = <A>(predicate: Predicate<A>) => (fa: HKT<F, A>) =>
      I.partition(fa, predicate)
    const partitionMap: PipeableFilterable<F>['partitionMap'] = (f) => (fa) => I.partitionMap(fa, f)
    r.filter = filter
    r.filterMap = filterMap
    r.partition = partition
    r.partitionMap = partitionMap
  }
  if (isFilterableWithIndex<F>(I)) {
    const filterWithIndex: PipeableFilterableWithIndex<F, unknown>['filterWithIndex'] = <A>(
      predicateWithIndex: PredicateWithIndex<unknown, A>
    ) => (fa: HKT<F, A>) => I.filterWithIndex(fa, predicateWithIndex)
    const filterMapWithIndex: PipeableFilterableWithIndex<F, unknown>['filterMapWithIndex'] = (f) => (fa) =>
      I.filterMapWithIndex(fa, f)
    const partitionWithIndex: PipeableFilterableWithIndex<F, unknown>['partitionWithIndex'] = <A>(
      predicateWithIndex: PredicateWithIndex<unknown, A>
    ) => (fa: HKT<F, A>) => I.partitionWithIndex(fa, predicateWithIndex)
    const partitionMapWithIndex: PipeableFilterableWithIndex<F, unknown>['partitionMapWithIndex'] = (f) => (fa) =>
      I.partitionMapWithIndex(fa, f)
    r.filterWithIndex = filterWithIndex
    r.filterMapWithIndex = filterMapWithIndex
    r.partitionWithIndex = partitionWithIndex
    r.partitionMapWithIndex = partitionMapWithIndex
  }
  if (isProfunctor<F>(I)) {
    const promap: PipeableProfunctor<F>['promap'] = (f, g) => (fa) => I.promap(fa, f, g)
    r.promap = promap
  }
  if (isSemigroupoid<F>(I)) {
    const compose: PipeableSemigroupoid<F>['compose'] = (that) => (fa) => I.compose(fa, that)
    r.compose = compose
  }
  if (isMonadThrow<F>(I)) {
    const fromOption: PipeableMonadThrow<F>['fromOption'] = (onNone) => (ma) =>
      ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value)
    const fromEither: PipeableMonadThrow<F>['fromEither'] = (ma) =>
      ma._tag === 'Left' ? I.throwError(ma.left) : I.of(ma.right)
    const fromPredicate: PipeableMonadThrow<F>['fromPredicate'] = <E, A>(
      predicate: Predicate<A>,
      onFalse: (a: A) => E
    ) => (a: A) => (predicate(a) ? I.of(a) : I.throwError(onFalse(a)))
    const filterOrElse: PipeableMonadThrow<F>['filterOrElse'] = <E, A>(
      predicate: Predicate<A>,
      onFalse: (a: A) => E
    ) => (ma: HKT<F, A>) => I.chain(ma, (a) => (predicate(a) ? I.of(a) : I.throwError(onFalse(a))))
    r.fromOption = fromOption
    r.fromEither = fromEither
    r.fromPredicate = fromPredicate
    r.filterOrElse = filterOrElse
  }
  return r
}
