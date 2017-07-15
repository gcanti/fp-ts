import { HKT, URI2HKT, HKTS, URI2HKT2, HKT2S } from './HKT'
import { constant } from './function'

export interface Functor<F> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyFunctor<F, A> {
  map<B>(f: (a: A) => B): HKT<F, B>
}

export interface FunctorComposition<F, G> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>>
}

export interface FunctorComposition11<F extends HKTS, G extends HKTS> {
  map<A, B>(f: (a: A) => B, fa: URI2HKT<URI2HKT<A>[G]>[F]): URI2HKT<URI2HKT<B>[G]>[F]
}

export interface FunctorComposition12<F extends HKTS, G extends HKT2S> {
  map<L, A, B>(f: (a: A) => B, fa: URI2HKT<URI2HKT2<L, A>[G]>[F]): URI2HKT<URI2HKT2<L, B>[G]>[F]
}

export interface FunctorComposition21<F extends HKT2S, G extends HKTS> {
  map<L, A, B>(f: (a: A) => B, fa: URI2HKT2<L, URI2HKT<A>[G]>[F]): URI2HKT2<L, URI2HKT<B>[G]>[F]
}

export interface FunctorComposition22<F extends HKT2S, G extends HKT2S> {
  map<L, M, A, B>(f: (a: A) => B, fa: URI2HKT2<L, URI2HKT2<M, A>[G]>[F]): URI2HKT2<L, URI2HKT2<M, B>[G]>[F]
}

export class Ops {
  lift<F extends HKT2S, A, B>(F: Functor<F>, f: (a: A) => B): <L>(fa: URI2HKT2<L, A>[F]) => URI2HKT2<L, B>[F]
  lift<F extends HKTS, A, B>(F: Functor<F>, f: (a: A) => B): (fa: URI2HKT<A>[F]) => URI2HKT<B>[F]
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B>
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
    return fa => F.map(f, fa)
  }

  /** Ignore the return value of a computation, using the specified return value instead (`<$`) */
  voidRight<F extends HKT2S, L, A, B>(F: Functor<F>, a: A, fb: URI2HKT2<L, B>[F]): URI2HKT2<L, A>[F]
  voidRight<F extends HKTS, A, B>(F: Functor<F>, a: A, fb: URI2HKT<B>[F]): URI2HKT<A>[F]
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A>
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A> {
    return F.map(constant(a), fb)
  }

  /** A version of `voidRight` with its arguments flipped (`$>`) */
  voidLeft<F extends HKT2S, L, A, B>(F: Functor<F>, fa: URI2HKT2<L, A>[F], b: B): URI2HKT2<L, B>[F]
  voidLeft<F extends HKTS, A, B>(F: Functor<F>, fa: URI2HKT<A>[F], b: B): URI2HKT<B>[F]
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B>
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B> {
    return F.map(constant(b), fa)
  }

  /** Apply a value in a computational context to a value in no context.
   * Generalizes `flip`
   */
  flap<F extends HKT2S>(functor: Functor<F>): <L, A, B>(ff: URI2HKT2<L, (a: A) => B>[F], a: A) => URI2HKT2<L, B>[F]
  flap<F extends HKTS>(functor: Functor<F>): <A, B>(ff: URI2HKT<(a: A) => B>[F], a: A) => URI2HKT<B>[F]
  flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>, a: A) => HKT<F, B>
  flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>, a: A) => HKT<F, B> {
    return (ff, a) => functor.map(f => f(a), ff)
  }

  getFunctorComposition<F extends HKT2S, G extends HKT2S>(F: Functor<F>, G: Functor<G>): FunctorComposition22<F, G>
  getFunctorComposition<F extends HKT2S, G extends HKTS>(F: Functor<F>, G: Functor<G>): FunctorComposition21<F, G>
  getFunctorComposition<F extends HKTS, G extends HKT2S>(F: Functor<F>, G: Functor<G>): FunctorComposition12<F, G>
  getFunctorComposition<F extends HKTS, G extends HKTS>(F: Functor<F>, G: Functor<G>): FunctorComposition11<F, G>
  getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
  getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> {
    return {
      map<A, B>(f: (a: A) => B, fa: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> {
        return F.map(ga => G.map(f, ga), fa)
      }
    }
  }
}

const ops = new Ops()
export const lift: Ops['lift'] = ops.lift
export const voidRight: Ops['voidRight'] = ops.voidRight
export const voidLeft: Ops['voidLeft'] = ops.voidLeft
export const flap: Ops['flap'] = ops.flap
export const getFunctorComposition: Ops['getFunctorComposition'] = ops.getFunctorComposition
