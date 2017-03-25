import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticApplicative } from './Applicative'
import { identity } from './function'

export interface StaticTraversable<T extends HKTS> extends StaticFunctor<T>, StaticFoldable<T> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>/*, x?: never*/): <A, B>(f: (a: A) => HKT<B>[F], ta: HKT<A>[T]) => HKT<HKT<B>[T]>[F]
}

export interface FantasyTraversable<T extends HKTS, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse<F extends HKTS>(applicative: StaticApplicative<F>/*, x?: never*/): <B>(f: (a: A) => HKT<B>[F]) => HKT<HKT<B>[T]>[F]
}

export function sequence<F extends HKT2S, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A, P1>(tfa: HKT<HKT2<P1, A>[F]>[T]) => HKT2<P1, HKT<A>[T]>[F]
export function sequence<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A>(tfa: HKT<HKT<A>[F]>[T]) => HKT<HKT<A>[T]>[F]
export function sequence<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, traversable: StaticTraversable<T>): <A>(tfa: HKT<HKT<A>[F]>[T]) => HKT<HKT<A>[T]>[F] {
  return <A>(tfa: HKT<HKT<A>[F]>[T]) => traversable.traverse<F>(applicative)<HKT<A>[F], A>(identity, tfa)
}
