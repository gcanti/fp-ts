import { HKT } from './HKT'
import './overloadings'

export interface Contravariant<F> {
  readonly URI: F
  contramap<A>(fa: HKT<F, A>): <B>(f: (b: B) => A) => HKT<F, B>
}

export interface FantasyContravariant<F, A> {
  contramap<B>(f: (b: B) => A): HKT<F, B>
}

export class Ops {
  lift<F, A, B>(contravariant: Contravariant<F>, f: (b: B) => A): (fa: HKT<F, A>) => HKT<F, B>
  lift<F, A, B>(contravariant: Contravariant<F>, f: (b: B) => A): (fa: HKT<F, A>) => HKT<F, B> {
    return fa => contravariant.contramap(fa)(f)
  }
}

const ops = new Ops()
export const lift: Ops['lift'] = ops.lift
