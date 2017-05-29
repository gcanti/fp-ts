import { HKT, HKTS } from './HKT'
import { Monoid } from './Monoid'
import { Applicative } from './Applicative'
import { applyFirst } from './Apply'
import { identity } from './function'

export interface Foldable<F extends HKTS> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<A>[F]): B
}

export interface FantasyFoldable<A> {
  reduce<B>(f: (b: B, a: A) => B, b: B): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F extends HKTS, M>(foldable: Foldable<F>, monoid: Monoid<M>): <A>(f: (a: A) => M, fa: HKT<A>[F]) => M {
  return <A>(f: (a: A) => M, fa: HKT<A>[F]) => foldable.reduce((acc, x: A) => monoid.concat(acc, f(x)), monoid.empty(), fa)
}

export function toArray<F extends HKTS>(foldable: Foldable<F>): <A>(fa: HKT<A>[F]) => Array<A> {
  return <A>(fa: HKT<A>[F]) => foldable.reduce<A, Array<A>>((b, a) => b.concat([a]), [], fa)
}

/** returns the composition of two foldables
 * Note: requires an implicit proof that HKT<A>[FG] ~ HKT<HKT<A>[G]>[F]
 */
export function getCompositionFoldable<FG extends HKTS, F extends HKTS, G extends HKTS>(URI: FG, foldableF: Foldable<F>, foldableG: Foldable<G>): Foldable<FG> {
  function reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<HKT<A>[G]>[F]): B {
    return foldableF.reduce<HKT<A>[G], B>((b, ga) => foldableG.reduce(f, b, ga), b, fga)
  }

  return {
    URI,
    reduce
  }
}

/**
 * Fold a data structure, accumulating values in some `Monoid`,
 * combining adjacent elements using the specified separator
 */
export function intercalate<F extends HKTS, M>(foldable: Foldable<F>, monoid: Monoid<M>): (sep: M, fm: HKT<M>[F]) => M {
  return (sep, fm) => {
    function go({ init, acc }: { init: boolean, acc: M }, x: M): { init: boolean, acc: M } {
      return init ?
        { init: false, acc: x } :
        { init: false, acc: monoid.concat(monoid.concat(acc, sep), x) }
    }
    return foldable.reduce(go, { init: true, acc: monoid.empty() }, fm).acc
  }
}

export function traverse_<M extends HKTS, F extends HKTS>(applicative: Applicative<M>, foldable: Foldable<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[M], fa: HKT<A, U, V>[F]) => HKT<void, U, V>[M] {
  return <A, B>(f: (a: A) => HKT<B>[M], fa: HKT<A>[F]) => toArray(foldable)<A>(fa)
    .reduce((mu, a) => applyFirst(applicative)<undefined, B>(mu, f(a)), applicative.of(undefined))
}

export function sequence_<M extends HKTS, F extends HKTS>(applicative: Applicative<M>, foldable: Foldable<F>): <A, U = any, V = any>(fa: HKT<A, U, V>[F]) => HKT<void, U, V>[M] {
  const t = traverse_(applicative, foldable)
  return <A>(fa: HKT<A>[F]) => t(identity, fa)
}
