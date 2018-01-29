import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor, FunctorComposition, getFunctorComposition } from './Functor'
import { Foldable, FoldableComposition, getFoldableComposition } from './Foldable'
import { Applicative } from './Applicative'

/** @typeclass */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
}

export interface TraversableComposition11<F extends HKTS, G extends HKTS>
  extends FoldableComposition<F, G>,
    FunctorComposition<F, G> {
  traverse<H>(
    H: Applicative<H>
  ): <A, B>(fga: HKTAs<F, HKTAs<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKTAs<F, HKTAs<G, B>>>
}

export function sequence<F extends HKT3S, T extends HKTS>(
  F: Applicative<F>,
  T: Traversable<T>
): <U, L, A>(tfa: HKTAs<T, HKT3As<F, U, L, A>>) => HKT3As<F, U, L, HKTAs<T, A>>
export function sequence<F extends HKT2S, T extends HKTS>(
  F: Applicative<F>,
  T: Traversable<T>
): <L, A>(tfa: HKTAs<T, HKT2As<F, L, A>>) => HKT2As<F, L, HKTAs<T, A>>
export function sequence<F extends HKTS, T extends HKTS>(
  F: Applicative<F>,
  T: Traversable<T>
): <A>(tfa: HKTAs<T, HKTAs<F, A>>) => HKTAs<F, HKTAs<T, A>>
export function sequence<F, T extends HKTS>(
  F: Applicative<F>,
  T: Traversable<T>
): <A>(tfa: HKTAs<T, HKT<F, A>>) => HKT<F, HKTAs<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
/** @function */
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
  return tfa => T.traverse(F)(tfa, fa => fa)
}

export function getTraversableComposition<F extends HKTS, G extends HKTS>(
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
