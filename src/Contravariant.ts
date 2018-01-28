import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'

/** @typeclass */
export interface Contravariant<F> {
  readonly URI: F
  contramap<A, B>(fa: HKT<F, A>, f: (b: B) => A): HKT<F, B>
}

export function lift<F extends HKT3S>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => <U, L>(fa: HKT3As<F, U, L, A>) => HKT3As<F, U, L, B>
export function lift<F extends HKT2S>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => <L>(fa: HKT2As<F, L, A>) => HKT2As<F, L, B>
export function lift<F extends HKTS>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => (fa: HKTAs<F, A>) => HKTAs<F, B>
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
/** @function */
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => contravariant.contramap(fa, f)
}
