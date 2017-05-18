import { HKT, HKTS, HKT2, HKT2S } from './HKT'

export interface StaticContravariant<F extends HKTS> {
  readonly URI: F
  contramap<A>(fa: HKT<A>[F]): <B>(f: (b: B) => A) => HKT<B>[F]
}

export interface FantasyContravariant<F extends HKTS, A> {
  contramap<B>(f: (b: B) => A): HKT<B>[F]
}

export function lift<F extends HKT2S, A, B>(contravariant: StaticContravariant<F>, f: (b: B) => A): <L>(fa: HKT2<L, A>[F]) => HKT2<L, B>[F]
export function lift<F extends HKTS, A, B>(contravariant: StaticContravariant<F>, f: (b: B) => A): (fa: HKT<A>[F]) => HKT<B>[F]
export function lift<F extends HKTS, A, B>(contravariant: StaticContravariant<F>, f: (b: B) => A): (fa: HKT<A>[F]) => HKT<B>[F] {
  return fa => contravariant.contramap(fa)(f)
}
