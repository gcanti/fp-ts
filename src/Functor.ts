import { HKT, HKTAs, HKTS, HKT2As, HKT2S } from './HKT'
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
  map<A, B>(f: (a: A) => B, fa: HKTAs<F, HKTAs<G, A>>): HKTAs<F, HKTAs<G, B>>
}

export interface FunctorComposition12<F extends HKTS, G extends HKT2S> {
  map<L, A, B>(f: (a: A) => B, fa: HKTAs<F, HKT2As<G, L, A>>): HKTAs<F, HKT2As<G, L, B>>
}

export interface FunctorComposition21<F extends HKT2S, G extends HKTS> {
  map<L, A, B>(f: (a: A) => B, fa: HKT2As<F, L, HKTAs<G, A>>): HKT2As<F, L, HKTAs<G, B>>
}

export interface FunctorComposition22<F extends HKT2S, G extends HKT2S> {
  map<L, M, A, B>(f: (a: A) => B, fa: HKT2As<F, L, HKT2As<G, M, A>>): HKT2As<F, L, HKT2As<G, M, B>>
}

export class Ops {
  lift<F extends HKT2S, A, B>(F: Functor<F>, f: (a: A) => B): <L>(fa: HKT2As<F, L, A>) => HKT2As<F, L, B>
  lift<F extends HKTS, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKTAs<F, A>) => HKTAs<F, B>
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B>
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
    return fa => F.map(f, fa)
  }

  /** Ignore the return value of a computation, using the specified return value instead (`<$`) */
  voidRight<F extends HKT2S, L, A, B>(F: Functor<F>, a: A, fb: HKT2As<F, L, B>): HKT2As<F, L, A>
  voidRight<F extends HKTS, A, B>(F: Functor<F>, a: A, fb: HKTAs<F, B>): HKTAs<F, A>
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A>
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A> {
    return F.map(constant(a), fb)
  }

  /** A version of `voidRight` with its arguments flipped (`$>`) */
  voidLeft<F extends HKT2S, L, A, B>(F: Functor<F>, fa: HKT2As<F, L, A>, b: B): HKT2As<F, L, B>
  voidLeft<F extends HKTS, A, B>(F: Functor<F>, fa: HKTAs<F, A>, b: B): HKTAs<F, B>
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B>
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B> {
    return F.map(constant(b), fa)
  }

  /** Apply a value in a computational context to a value in no context.
   * Generalizes `flip`
   */
  flap<F extends HKT2S>(functor: Functor<F>): <L, A, B>(ff: HKT2As<F, L, (a: A) => B>, a: A) => HKT2As<F, L, B>
  flap<F extends HKTS>(functor: Functor<F>): <A, B>(ff: HKTAs<F, (a: A) => B>, a: A) => HKTAs<F, B>
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
