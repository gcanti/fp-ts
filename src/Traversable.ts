import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor, FantasyFunctor, FunctorComposition, getFunctorComposition } from './Functor'
import { Foldable, FantasyFoldable, FoldableComposition, getFoldableComposition } from './Foldable'
import { Applicative } from './Applicative'

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}

export interface FantasyTraversable<T, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse: <F>(F: Applicative<F>) => <B>(f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(f: (a: A) => HKT<H, B>, fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>>
}

export interface TraversableComposition11<F extends HKTS, G extends HKTS>
  extends FoldableComposition<F, G>,
    FunctorComposition<F, G> {
  traverse<H extends HKTS>(
    H: Applicative<H>
  ): <A, B>(f: (a: A) => HKT<H, B>, fga: HKTAs<F, HKTAs<G, A>>) => HKTAs<H, HKTAs<F, HKTAs<G, B>>>
  traverse<H>(
    H: Applicative<H>
  ): <A, B>(f: (a: A) => HKT<H, B>, fga: HKTAs<F, HKTAs<G, A>>) => HKT<H, HKTAs<F, HKTAs<G, B>>>
}

export class Ops {
  sequence<F extends HKT3S, T extends HKTS>(
    F: Applicative<F>,
    T: Traversable<T>
  ): <U, L, A>(tfa: HKTAs<T, HKT3As<F, U, L, A>>) => HKT3As<F, U, L, HKTAs<T, A>>
  sequence<F extends HKT2S, T extends HKTS>(
    F: Applicative<F>,
    T: Traversable<T>
  ): <L, A>(tfa: HKTAs<T, HKT2As<F, L, A>>) => HKT2As<F, L, HKTAs<T, A>>
  sequence<F extends HKTS, T extends HKTS>(
    F: Applicative<F>,
    T: Traversable<T>
  ): <A>(tfa: HKTAs<T, HKTAs<F, A>>) => HKTAs<F, HKTAs<T, A>>
  sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
  sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
    return tfa => T.traverse(F)(fa => fa, tfa)
  }

  getTraversableComposition<F extends HKTS, G extends HKTS>(
    F: Traversable<F>,
    G: Traversable<G>
  ): TraversableComposition11<F, G>
  getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
  getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
    return {
      ...getFunctorComposition(F, G),
      ...getFoldableComposition(F, G),
      traverse: H => (f, fga) => F.traverse(H)(ga => G.traverse(H)(a => f(a), ga), fga)
    }
  }
}

const ops = new Ops()
export const sequence: Ops['sequence'] = ops.sequence
export const getTraversableComposition: Ops['getTraversableComposition'] = ops.getTraversableComposition
