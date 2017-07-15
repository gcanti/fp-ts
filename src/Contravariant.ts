import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'

export interface Contravariant<F> {
  readonly URI: F
  contramap<A>(fa: HKT<F, A>): <B>(f: (b: B) => A) => HKT<F, B>
}

export interface FantasyContravariant<F, A> {
  contramap<B>(f: (b: B) => A): HKT<F, B>
}

export class Ops {
  lift<F extends HKT2S, A, B>(
    contravariant: Contravariant<F>,
    f: (b: B) => A
  ): <L>(fa: URI2HKT2<L, A>[F]) => URI2HKT2<L, B>[F]
  lift<F extends HKTS, A, B>(contravariant: Contravariant<F>, f: (b: B) => A): (fa: URI2HKT<A>[F]) => URI2HKT<B>[F]
  lift<F, A, B>(contravariant: Contravariant<F>, f: (b: B) => A): (fa: HKT<F, A>) => HKT<F, B>
  lift<F, A, B>(contravariant: Contravariant<F>, f: (b: B) => A): (fa: HKT<F, A>) => HKT<F, B> {
    return fa => contravariant.contramap(fa)(f)
  }
}

const ops = new Ops()
export const lift: Ops['lift'] = ops.lift
