import { HKT, Type, Type2, Type3, Type4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor4, Functor2C, Functor3C } from './Functor'

/**
 * A `FunctorWithIndex` is a type constructor which supports a mapping operation `map`.
 *
 * `mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.mapWithIndex(fa, (_i, a) => a) = fa`
 *
 * @typeclass
 * @since 1.12.0
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
  readonly mapWithIndex: <A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => B) => Type3<F, U, L, B>
}
