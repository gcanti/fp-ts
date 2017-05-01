import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { StaticFunctor, FantasyFunctor, getFunctorComposition } from './Functor'
import { StaticFoldable, FantasyFoldable, getFoldableComposition } from './Foldable'
import { StaticApplicative } from './Applicative'
import { identity } from './function'

export interface StaticTraversable<T extends HKTS> extends StaticFunctor<T>, StaticFoldable<T> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <A, B>(f: (a: A) => HKT<B>[F], ta: HKT<A>[T]) => HKT<HKT<B>[T]>[F]
}

export interface FantasyTraversable<T extends HKTS, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<HKT<B>[T]>[F]
}

export function sequence<F extends HKT2S, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <L, A>(tfa: HKT<HKT2<L, A>[F]>[T]) => HKT2<L, HKT<A>[T]>[F]
export function sequence<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A>(tfa: HKT<HKT<A>[F]>[T]) => HKT<HKT<A>[T]>[F]
export function sequence<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A>(tfa: HKT<HKT<A>[F]>[T]) => HKT<HKT<A>[T]>[F] {
  return <A>(tfa: HKT<HKT<A>[F]>[T]) => traversable.traverse<F>(applicative)<HKT<A>[F], A>(identity, tfa)
}

/** returns the composition of two traversables */
export function getTraversableComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(traversableF: StaticTraversable<F>, traversableG: StaticTraversable<G>) => StaticTraversable<FG> {
  return <F extends HKTS, G extends HKTS>(traversableF: StaticTraversable<F>, traversableG: StaticTraversable<G>) => {
    const functor = getFunctorComposition(URI)(traversableF, traversableG)
    const foldable = getFoldableComposition(URI)(traversableF, traversableG)

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
}
