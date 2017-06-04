import { HKT, HKTS } from './HKT'
import { Functor, FantasyFunctor, getCompositionFunctor } from './Functor'
import { Foldable, FantasyFoldable, getCompositionFoldable } from './Foldable'
import { Applicative } from './Applicative'
import { identity } from './function'

export interface Traversable<T extends HKTS> extends Functor<T>, Foldable<T> {
  traverse<F extends HKTS>(
    applicative: Applicative<F>
  ): <A, B, UF = any, UT = any, VF = any, VT = any>(
    f: (a: A) => HKT<B, UF, VF>[F],
    ta: HKT<A, UT, VT>[T]
  ) => HKT<HKT<B, UT, VT>[T], UF, VF>[F]
}

export interface FantasyTraversable<T extends HKTS, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse<F extends HKTS>(
    applicative: Applicative<F>
  ): <B, UF = any, UT = any, VF = any, VT = any>(f: (a: A) => HKT<B, UF, VF>[F]) => HKT<HKT<B, UT, VT>[T], UF, VF>[F]
}

export function sequence<F extends HKTS, T extends HKTS>(
  applicative: Applicative<F>,
  traversable: Traversable<T>
): <A, UF = any, UT = any, VF = any, VT = any>(
  tfa: HKT<HKT<A, UF, VF>[F], UT, VT>[T]
) => HKT<HKT<A, UT, VT>[T], UF, VF>[F] {
  return <A>(tfa: HKT<HKT<A>[F]>[T]) => traversable.traverse<F>(applicative)<HKT<A>[F], A>(identity, tfa)
}

/** returns the composition of two traversables
 * Note: requires an implicit proof that HKT<A>[FG] ~ HKT<HKT<A>[G]>[F]
 */
export function getCompositionTraversable<FG extends HKTS, F extends HKTS, G extends HKTS>(
  URI: FG,
  traversableF: Traversable<F>,
  traversableG: Traversable<G>
): Traversable<FG> {
  const functor = getCompositionFunctor(URI, traversableF, traversableG)
  const foldable = getCompositionFoldable(URI, traversableF, traversableG)

  function traverse<AP extends HKTS>(
    applicative: Applicative<AP>
  ): <A, B>(f: (a: A) => HKT<B>[AP], fga: HKT<HKT<A>[G]>[F]) => HKT<HKT<HKT<A>[G]>[F]>[AP] {
    return <A, B>(f: (a: A) => HKT<B>[AP], fga: HKT<HKT<A>[G]>[F]) =>
      traversableF.traverse(applicative)<HKT<A>[G], HKT<B>[G]>(
        (ga: HKT<A>[G]) => traversableG.traverse(applicative)<A, B>(f, ga),
        fga
      )
  }

  return {
    ...functor,
    ...foldable,
    traverse
  }
}
