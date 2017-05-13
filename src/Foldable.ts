import { HKT, HKTS } from './HKT'
import { StaticMonoid } from './Monoid'

export interface StaticFoldable<F extends HKTS> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<A>[F]): B
}

export interface FantasyFoldable<A> {
  reduce<B>(f: (b: B, a: A) => B, b: B): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F extends HKTS, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: (a: A) => M, fa: HKT<A>[F]): M
export function foldMap<F extends HKTS, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: (a: A) => M, fa: HKT<A>[F]): M {
  return foldable.reduce((acc, x: A) => monoid.concat(f(x), acc), monoid.empty(), fa)
}

export function toArray<F extends HKTS, A>(foldable: StaticFoldable<F>, fa: HKT<A>[F]): Array<A> {
  return foldable.reduce<A, Array<A>>((b, a) => b.concat([a]), [], fa)
}

/** returns the composition of two foldables */
export function getFoldableComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(foldableF: StaticFoldable<F>, foldableG: StaticFoldable<G>) => StaticFoldable<FG> {
  return <F extends HKTS, G extends HKTS>(foldableF: StaticFoldable<F>, foldableG: StaticFoldable<G>) => {
    function reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<HKT<A>[G]>[F]): B {
      return foldableF.reduce<HKT<A>[G], B>((b, ga) => foldableG.reduce(f, b, ga), b, fga)
    }

    return {
      URI,
      reduce
    }
  }
}

/**
 * Fold a data structure, accumulating values in some `Monoid`,
 * combining adjacent elements using the specified separator
 */
export function intercalate<F extends HKTS, M>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>): (sep: M, fm: HKT<M>[F]) => M {
  return (sep, fm) => {
    function go({ init, acc }: { init: boolean, acc: M }, x: M): { init: boolean, acc: M } {
      return init ?
        { init: false, acc: x } :
        { init: false, acc: monoid.concat(monoid.concat(acc, sep), x) }
    }
    return foldable.reduce(go, { init: true, acc: monoid.empty() }, fm).acc
  }
}
