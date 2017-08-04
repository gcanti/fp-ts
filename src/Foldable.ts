import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monoid, getEndomorphismMonoid } from './Monoid'
import { Applicative } from './Applicative'
import { applyFirst } from './Apply'

export interface Foldable<F> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B
}

export interface FantasyFoldable<A> {
  reduce<B>(f: (b: B, a: A) => B, b: B): B
}

export interface FoldableComposition<F, G> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<F, HKT<G, A>>): B
}

export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> {
  return {
    reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<F, HKT<G, A>>): B {
      return F.reduce((b, ga) => G.reduce(f, b, ga), b, fga)
    }
  }
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F, M>(foldable: Foldable<F>, monoid: Monoid<M>): <A>(f: (a: A) => M, fa: HKT<F, A>) => M {
  return (f, fa) => foldable.reduce((acc, x) => monoid.concat(acc, f(x)), monoid.empty(), fa)
}

export function toArray<F>(foldable: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A> {
  return fa => foldable.reduce((b, a) => b.concat([a]), [] as Array<any>, fa)
}

/** A default implementation of `foldr` using `foldMap` */
export function foldr<F extends HKTS, A, B>(foldable: Foldable<F>, f: (a: A, b: B) => B, b: B, fa: HKT<F, A>): B {
  return foldMap(foldable, getEndomorphismMonoid<B>())(a => b => f(a, b), fa)(b)
}

type Acc<M> = { init: boolean; acc: M }

/**
 * Fold a data structure, accumulating values in some `Monoid`,
 * combining adjacent elements using the specified separator
 */
export function intercalate<F, M>(foldable: Foldable<F>, monoid: Monoid<M>): (sep: M, fm: HKT<F, M>) => M {
  return (sep, fm) => {
    function go({ init, acc }: Acc<M>, x: M): Acc<M> {
      return init ? { init: false, acc: x } : { init: false, acc: monoid.concat(monoid.concat(acc, sep), x) }
    }
    return foldable.reduce(go, { init: true, acc: monoid.empty() }, fm).acc
  }
}

export class Ops {
  traverse_<M extends HKT2S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <L, A, B>(f: (a: A) => HKT2As<M, L, B>, fa: HKT<F, A>) => HKT2As<M, L, void>
  traverse_<M extends HKTS, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <A, B>(f: (a: A) => HKTAs<M, B>, fa: HKT<F, A>) => HKTAs<M, void>
  traverse_<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
  traverse_<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> {
    return (f, fa) => toArray(F)(fa).reduce((mu, a) => applyFirst(M)(mu, f(a)), M.of(undefined))
  }

  sequence_<M extends HKT2S, F>(
    M: Applicative<M>,
    F: Foldable<F>
  ): <L, A>(fa: HKT<F, HKT2As<M, L, A>>) => HKT2As<M, L, void>
  sequence_<M extends HKTS, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKTAs<M, A>>) => HKTAs<M, void>
  sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
  sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> {
    return fa => this.traverse_(M, F)(x => x, fa)
  }
}

const ops = new Ops()
export const traverse_: Ops['traverse_'] = ops.traverse_
export const sequence_: Ops['sequence_'] = ops.sequence_
