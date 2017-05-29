import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor, getCompositionStaticFunctor } from './Functor'
import { StaticFoldable, FantasyFoldable, getCompositionStaticFoldable } from './Foldable'
import { StaticApplicative } from './Applicative'
import { identity } from './function'

export interface StaticTraversable<T extends HKTS> extends StaticFunctor<T>, StaticFoldable<T> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <A, B, UF = any, UT = any, VF = any, VT = any>(f: (a: A) => HKT<B, UF, VF>[F], ta: HKT<A, UT, VT>[T]) => HKT<HKT<B, UT, VT>[T], UF, VF>[F]
}

export interface FantasyTraversable<T extends HKTS, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B, UF = any, UT = any, VF = any, VT = any>(f: (a: A) => HKT<B, UF, VF>[F]) => HKT<HKT<B, UT, VT>[T], UF, VF>[F]
}

export function sequence<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A, UF = any, UT = any, VF = any, VT = any>(tfa: HKT<HKT<A, UF, VF>[F], UT, VT>[T]) => HKT<HKT<A, UT, VT>[T], UF, VF>[F] {
  return <A>(tfa: HKT<HKT<A>[F]>[T]) => traversable.traverse<F>(applicative)<HKT<A>[F], A>(identity, tfa)
}

/** returns the composition of two traversables
 * Note: requires an implicit proof that HKT<A>[FG] ~ HKT<HKT<A>[G]>[F]
 */
export function getCompositionStaticTraversable<FG extends HKTS, F extends HKTS, G extends HKTS>(URI: FG, traversableF: StaticTraversable<F>, traversableG: StaticTraversable<G>): StaticTraversable<FG> {
  const functor = getCompositionStaticFunctor(URI, traversableF, traversableG)
  const foldable = getCompositionStaticFoldable(URI, traversableF, traversableG)

  function traverse<AP extends HKTS>(applicative: StaticApplicative<AP>): <A, B>(f: (a: A) => HKT<B>[AP], fga: HKT<HKT<A>[G]>[F]) => HKT<HKT<HKT<A>[G]>[F]>[AP] {
    return <A, B>(f: (a: A) => HKT<B>[AP], fga: HKT<HKT<A>[G]>[F]) =>
      traversableF.traverse(applicative)<HKT<A>[G], HKT<B>[G]>((ga: HKT<A>[G]) => traversableG.traverse(applicative)<A, B>(f, ga), fga)
  }

  return {
    ...functor,
    ...foldable,
    traverse
  }
}
