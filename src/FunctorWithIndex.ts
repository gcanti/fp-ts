import { constant } from './function'
import { HKT, Type, Type2, Type3, Type4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import {
  Functor,
  Functor1,
  Functor2,
  Functor3,
  Functor4,
  Functor2C,
  Functor3C,
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition12C,
  FunctorComposition21,
  FunctorComposition2C1,
  FunctorComposition22,
  FunctorComposition22C,
  FunctorComposition3C1,
  getFunctorComposition
} from './Functor'

/**
 * A `FunctorWithIndex` is a type constructor which supports a mapping operation `map`.
 *
 * `mapWithIndex` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.mapWithIndex(fa, (_i, a) => a) = fa`
 * 2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) = F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`
 *
 * @typeclass
 * @since 1.0.0
 */

export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => B) => HKT<F, B>
}

export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(fa: Type<F, A>, f: (i: I, a: A) => B) => Type<F, B>
}

export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <L, A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => B) => Type2<F, L, B>
}

export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => B) => Type3<F, U, L, B>
}

export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <X, U, L, A, B>(fa: Type4<F, X, U, L, A>, f: (i: I, a: A) => B) => Type4<F, X, U, L, B>
}

export interface FunctorWithIndex2C<F extends URIS2, L, I> extends Functor2C<F, L> {
  readonly mapWithIndex: <A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => B) => Type2<F, L, B>
}

export interface FunctorWithIndex3C<F extends URIS3, U, L, I> extends Functor3C<F, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly mapWithIndex: <A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => B) => Type3<F, U, L, B>
}

export interface FunctorWithIndexComposition<F, G, I> extends FunctorComposition<F, G> {
  readonly mapWithIndex: <A, B>(fa: HKT<F, HKT<G, A>>, f: (i: I, a: A) => B) => HKT<F, HKT<G, B>>
}

export interface FunctorWithIndexComposition11<F extends URIS, G extends URIS, I> extends FunctorComposition11<F, G> {
  readonly mapWithIndex: <A, B>(fa: Type<F, Type<G, A>>, f: (i: I, a: A) => B) => Type<F, Type<G, B>>
}

export interface FunctorWithIndexComposition12<F extends URIS, G extends URIS2, I> extends FunctorComposition12<F, G> {
  readonly mapWithIndex: <L, A, B>(fa: Type<F, Type2<G, L, A>>, f: (i: I, a: A) => B) => Type<F, Type2<G, L, B>>
}

export interface FunctorWithIndexComposition12C<F extends URIS, G extends URIS2, L, I>
  extends FunctorComposition12C<F, G, L> {
  readonly mapWithIndex: <A, B>(fa: Type<F, Type2<G, L, A>>, f: (i: I, a: A) => B) => Type<F, Type2<G, L, B>>
}

export interface FunctorWithIndexComposition21<F extends URIS2, G extends URIS, I> extends FunctorComposition21<F, G> {
  readonly mapWithIndex: <L, A, B>(fa: Type2<F, L, Type<G, A>>, f: (i: I, a: A) => B) => Type2<F, L, Type<G, B>>
}

export interface FunctorWithIndexComposition2C1<F extends URIS2, G extends URIS, L, I>
  extends FunctorComposition2C1<F, G, L> {
  readonly mapWithIndex: <A, B>(fa: Type2<F, L, Type<G, A>>, f: (i: I, a: A) => B) => Type2<F, L, Type<G, B>>
}

export interface FunctorWithIndexComposition22<F extends URIS2, G extends URIS2, I> extends FunctorComposition22<F, G> {
  readonly mapWithIndex: <L, M, A, B>(
    fa: Type2<F, L, Type2<G, M, A>>,
    f: (i: I, a: A) => B
  ) => Type2<F, L, Type2<G, M, B>>
}

export interface FunctorWithIndexComposition22C<F extends URIS2, G extends URIS2, M>
  extends FunctorComposition22C<F, G, M> {
  readonly mapWithIndex: <L, A, B>(
    fa: Type2<F, L, Type2<G, M, A>>,
    f: (i: number, a: A) => B
  ) => Type2<F, L, Type2<G, M, B>>
}

export interface FunctorWithIndexComposition3C1<F extends URIS3, G extends URIS, U, L>
  extends FunctorComposition3C1<F, G, U, L> {
  readonly mapWithIndex: <A, B>(fa: Type3<F, U, L, Type<G, A>>, f: (i: number, a: A) => B) => Type3<F, U, L, Type<G, B>>
}

/**
 * @function
 * @since 1.0.0
 */
export function getFunctorWithIndexComposition<F extends URIS2, G extends URIS2>(
  F: FunctorWithIndex2<F, any>,
  G: FunctorWithIndex2<G, any>
): FunctorWithIndexComposition22<F, G, any>
export function getFunctorWithIndexComposition<F extends URIS2, G extends URIS>(
  F: FunctorWithIndex2<F, any>,
  G: FunctorWithIndex1<G, any>
): FunctorWithIndexComposition21<F, G, any>
export function getFunctorWithIndexComposition<F extends URIS, G extends URIS2>(
  F: FunctorWithIndex1<F, any>,
  G: FunctorWithIndex2<G, any>
): FunctorWithIndexComposition12<F, G, any>
export function getFunctorWithIndexComposition<F extends URIS, G extends URIS>(
  F: FunctorWithIndex1<F, any>,
  G: FunctorWithIndex1<G, any>
): FunctorWithIndexComposition11<F, G, any>
export function getFunctorWithIndexComposition<F, G>(
  F: FunctorWithIndex<F, any>,
  G: FunctorWithIndex<G, any>
): FunctorWithIndexComposition<F, G, any>
export function getFunctorWithIndexComposition<F, G>(
  F: FunctorWithIndex<F, any>,
  G: FunctorWithIndex<G, any>
): FunctorWithIndexComposition<F, G, any> {
  return {
    ...getFunctorComposition(F, G),
    mapWithIndex: (fa, f) => F.mapWithIndex(fa, (_i, ga) => G.mapWithIndex(ga, f))
  }
}
