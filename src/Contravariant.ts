import { HKT } from './HKT'
import { Function1 } from './function'

export interface StaticContravariant<F> {
  contramap<A, B>(f: Function1<B, A>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyContravariant<F, A> extends HKT<F, A> {
  contramap<B>(f: Function1<B, A>): FantasyContravariant<F, B>
}

export class ContravariantOps {
  contramap<F, A, B>(f: Function1<B, A>, fa: FantasyContravariant<F, A>): FantasyContravariant<F, B>
  contramap<F, A, B>(f: Function1<B, A>, fa: FantasyContravariant<F, A>): FantasyContravariant<F, B> {
    return fa.contramap(f)
  }

  lift<F, A, B>(contravariant: StaticContravariant<F>, f: Function1<B, A>): Function1<HKT<F, A>, HKT<F, B>>
  lift<F, A, B>(contravariant: StaticContravariant<F>, f: Function1<B, A>): Function1<HKT<F, A>, HKT<F, B>> {
    return fa => contravariant.contramap(f, fa)
  }
}

export const ops = new ContravariantOps()
