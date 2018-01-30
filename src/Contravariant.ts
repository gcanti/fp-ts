import { HKT, HKT2, HKT3, URIS, URIS2, Type, Type2, URIS3, Type3 } from './HKT'

/** @typeclass */
export interface Contravariant<F> {
  readonly URI: F
  contramap<A, B>(fa: HKT<F, A>, f: (b: B) => A): HKT<F, B>
}

export interface Contravariant2<F, L> {
  readonly URI: F
  contramap<A, B>(fa: HKT2<F, L, A>, f: (b: B) => A): HKT2<F, L, B>
}

export interface Contravariant3<F, U, L> {
  readonly URI: F
  contramap<A, B>(fa: HKT3<F, U, L, A>, f: (b: B) => A): HKT3<F, U, L, B>
}

export function lift<F extends URIS3>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => <U, L>(fa: HKT3<F, U, L, A>) => Type3<F, U, L, B>
export function lift<F extends URIS2>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => <L>(fa: HKT2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS>(
  contravariant: Contravariant<F>
): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => Type<F, B>
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
/** @function */
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => contravariant.contramap(fa, f)
}
