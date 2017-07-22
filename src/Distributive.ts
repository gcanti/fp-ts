import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'

// adapted from https://github.com/purescript/purescript-distributive

/** Categorical dual of `Traversable`:
 *
 * - `distribute` is the dual of `sequence` - it zips an arbitrary collection of containers.
 * - `collect` is the dual of `traverse` - it traverses an arbitrary collection of values.
 *
 * Laws:
 *
 * - `distribute = collect id`
 * - `distribute <<< distribute = id`
 * - `collect f = distribute <<< map f`
 * - `map f = unwrap <<< collect (Identity <<< f)`
 * - `map distribute <<< collect f = unwrap <<< collect (Compose <<< f)`
 */
export interface Distributive<F> extends Functor<F> {
  distribute<G>(G: Functor<G>): <A>(gfa: HKT<G, HKT<F, A>>) => HKT<F, HKT<G, A>>
}

export class Ops {
  /** A default implementation of `collect`, based on `distribute` */
  collect<G extends HKTS, F extends HKT2S>(
    G: Functor<G>,
    F: Distributive<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ga: HKTAs<G, A>) => HKT2As<F, L, HKTAs<G, B>>
  collect<G extends HKTS, F extends HKTS>(
    G: Functor<G>,
    F: Distributive<F>
  ): <A, B>(f: (a: A) => HKTAs<F, B>, ga: HKTAs<G, A>) => HKTAs<F, HKTAs<G, B>>
  collect<G, F>(G: Functor<G>, F: Distributive<F>): <A, B>(f: (a: A) => HKT<F, B>, ga: HKT<G, A>) => HKT<F, HKT<G, B>> {
    return (f, ga) => F.distribute(G)(G.map(f, ga))
  }

  /** Zip an arbitrary collection of containers and summarize the results */
  cotraverse<G extends HKTS, F extends HKT2S>(
    G: Functor<G>,
    F: Distributive<F>
  ): <L, A, B>(f: (ga: HKTAs<G, A>) => B, gfa: HKTAs<G, HKT2As<F, L, A>>) => HKT2As<F, L, B>
  cotraverse<G extends HKTS, F extends HKTS>(
    G: Functor<G>,
    F: Distributive<F>
  ): <A, B>(f: (ga: HKTAs<G, A>) => B, gfa: HKTAs<G, HKTAs<F, A>>) => HKTAs<F, B>
  cotraverse<G, F>(
    G: Functor<G>,
    F: Distributive<F>
  ): <A, B>(f: (ga: HKT<G, A>) => B, gfa: HKT<G, HKT<F, A>>) => HKT<F, B> {
    return (f, gfa) => F.map(ga => f(ga), F.distribute(G)(gfa))
  }
}

const ops = new Ops()
export const collect: Ops['collect'] = ops.collect
export const cotraverse: Ops['cotraverse'] = ops.cotraverse
