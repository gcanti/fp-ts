import { HKT, HKTS } from './HKT'

export interface Contravariant<F extends HKTS> {
  readonly URI: F
  contramap<A, U = any, V = any>(fa: HKT<A, U, V>[F]): <B>(f: (b: B) => A) => HKT<B, U, V>[F]
}

export interface FantasyContravariant<F extends HKTS, A> {
  contramap<B, U = any, V = any>(f: (b: B) => A): HKT<B, U, V>[F]
}

export function lift<F extends HKTS, A, B>(
  contravariant: Contravariant<F>,
  f: (b: B) => A
): <U = any, V = any>(fa: HKT<A, U, V>[F]) => HKT<B, U, V>[F] {
  return (fa: HKT<A>[F]) => contravariant.contramap(fa)(f)
}
