import { HKT, HKTS } from './HKT'

export interface StaticContravariant<F extends HKTS> {
  readonly URI: F
  contramap<A>(fa: HKT<A>[F]): <B>(f: (b: B) => A) => HKT<B>[F]
}

export interface FantasyContravariant<F extends HKTS, A> {
  contramap<B>(f: (b: B) => A): HKT<B>[F]
}

export function lift<F extends HKTS, A, B>(contravariant: StaticContravariant<F>, f: (b: B) => A): (fa: HKT<A>[F]) => HKT<B>[F] {
  return fa => contravariant.contramap(fa)(f)
}
