import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'

export interface Contravariant<F> {
  readonly URI: F
  contramap<A, B>(f: (b: B) => A, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyContravariant<F, A> {
  contramap<B>(f: (b: B) => A): HKT<F, B>
}

export class Ops {
  lift<F extends HKT3S>(
    contravariant: Contravariant<F>
  ): <A, B>(f: (b: B) => A) => <U, L>(fa: HKT3As<F, U, L, A>) => HKT3As<F, U, L, B>
  lift<F extends HKT2S>(
    contravariant: Contravariant<F>
  ): <A, B>(f: (b: B) => A) => <L>(fa: HKT2As<F, L, A>) => HKT2As<F, L, B>
  lift<F extends HKTS>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKTAs<F, A>) => HKTAs<F, B>
  lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
  lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B> {
    return f => fa => contravariant.contramap(f, fa)
  }
}

const ops = new Ops()
export const lift: Ops['lift'] = ops.lift
