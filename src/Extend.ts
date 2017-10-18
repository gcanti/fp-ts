import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}

export interface FantasyExtend<F, A> extends FantasyFunctor<F, A> {
  extend<B>(f: (fa: HKT<F, A>) => B): HKT<F, B>
}

export class Ops {
  duplicate<F extends HKT3S>(
    extend: Extend<F>
  ): <U, L, A>(ma: HKT3As<F, U, L, A>) => HKT3As<F, U, L, HKT3As<F, U, L, A>>
  duplicate<F extends HKT2S>(extend: Extend<F>): <L, A>(ma: HKT2As<F, L, A>) => HKT2As<F, L, HKT2As<F, L, A>>
  duplicate<F extends HKTS>(extend: Extend<F>): <A>(ma: HKTAs<F, A>) => HKTAs<F, HKTAs<F, A>>
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> {
    return ma => extend.extend(ma => ma, ma)
  }
}

const ops = new Ops()
export const duplicate: Ops['duplicate'] = ops.duplicate
