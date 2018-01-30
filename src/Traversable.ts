import { HKT, HKT2, HKT3, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import {
  Functor,
  Functor1,
  Functor2,
  Functor3,
  Functor2C,
  Functor3C,
  FunctorComposition,
  getFunctorComposition
} from './Functor'
import { Foldable, FoldableComposition, getFoldableComposition } from './Foldable'
import { Applicative } from './Applicative'

/** @typeclass */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}

export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <L, A, B>(ta: HKT2<T, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, L, B>>
}

export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable<T> {
  traverse: <F>(
    F: Applicative<F>
  ) => <U, L, A, B>(ta: HKT3<T, U, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, U, L, B>>
}

export interface Traversable2C<T extends URIS2, L> extends Functor2C<T, L>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT2<T, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, L, B>>
}

export interface Traversable3C<T extends URIS3, U, L> extends Functor3C<T, U, L>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT3<T, U, L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, U, L, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
}

export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition<F, G>,
    FunctorComposition<F, G> {
  traverse<H>(H: Applicative<H>): <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Type<F, Type<G, B>>>
}

export function sequence<F extends URIS3, T extends URIS>(
  F: Applicative<F>,
  T: Traversable<T>
): <U, L, A>(tfa: HKT<T, HKT3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS>(
  F: Applicative<F>,
  T: Traversable<T>
): <L, A>(tfa: HKT<T, HKT2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS, T extends URIS>(
  F: Applicative<F>,
  T: Traversable<T>
): <A>(tfa: HKT<T, HKT<F, A>>) => Type<F, Type<T, A>>
export function sequence<F, T extends URIS>(
  F: Applicative<F>,
  T: Traversable<T>
): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, Type<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
/** @function */
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
  return tfa => T.traverse(F)(tfa, fa => fa)
}

export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable<F>,
  G: Traversable<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
/** @function */
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    ...getFoldableComposition(F, G),
    traverse: H => (fga, f) => F.traverse(H)(fga, ga => G.traverse(H)(ga, a => f(a)))
  }
}
