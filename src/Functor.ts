import { HKT } from './HKT'
import { constant } from './function'
import './overloadings'

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

export class Ops {
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B>
  lift<F, A, B>(F: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
    return fa => F.map(f, fa)
  }

  /** Ignore the return value of a computation, using the specified return value instead (`<$`) */
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A>
  voidRight<F, A, B>(F: Functor<F>, a: A, fb: HKT<F, B>): HKT<F, A> {
    return F.map(constant(a), fb)
  }

  /** A version of `voidRight` with its arguments flipped (`$>`) */
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B>
  voidLeft<F, A, B>(F: Functor<F>, fa: HKT<F, A>, b: B): HKT<F, B> {
    return F.map(constant(b), fa)
  }

  /** Apply a value in a computational context to a value in no context.
   * Generalizes `flip`
   */
  flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>, a: A) => HKT<F, B>
  flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>, a: A) => HKT<F, B> {
    return (ff, a) => functor.map(f => f(a), ff)
  }

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
