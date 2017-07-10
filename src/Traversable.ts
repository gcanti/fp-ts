import { HKT } from './HKT'
import { Functor, FantasyFunctor, FunctorComposition, getFunctorComposition } from './Functor'
import { Foldable, FantasyFoldable, FoldableComposition, getFoldableComposition } from './Foldable'
import { Applicative } from './Applicative'
import { identity } from './function'
import './overloadings'

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<F>(applicative: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}

export interface FantasyTraversable<T, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  traverse<H>(H: Applicative<H>): <A, B>(f: (a: A) => HKT<H, B>, fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>>
}

export class Ops {
  sequence<F, T>(
    applicative: Applicative<F>,
    traversable: Traversable<T>
  ): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
  sequence<F, T>(
    applicative: Applicative<F>,
    traversable: Traversable<T>
  ): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
    return <A>(tfa: HKT<T, HKT<F, A>>) => traversable.traverse(applicative)<HKT<F, A>, A>(identity, tfa)
  }

  getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
    const { map } = getFunctorComposition(F, G)
    const { reduce } = getFoldableComposition(F, G)

    function traverse<H>(
      H: Applicative<H>
    ): <A, B>(f: (a: A) => HKT<H, B>, fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>> {
      return (f, fga) => F.traverse(H)(ga => G.traverse(H)(a => f(a), ga), fga)
    }

    return {
      map,
      reduce,
      traverse
    }
  }
}

const ops = new Ops()
export const sequence: Ops['sequence'] = ops.sequence
