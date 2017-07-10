import { HKT } from './HKT'
import { Cokleisli } from './function'
import { Functor, FantasyFunctor } from './Functor'
import './overloadings'

export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: Cokleisli<F, A, B>, ea: HKT<F, A>): HKT<F, B>
}

export interface FantasyExtend<F, A> extends FantasyFunctor<F, A> {
  extend<B>(f: Cokleisli<F, A, B>): HKT<F, B>
}

export class Ops {
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> {
    return ma => extend.extend(ma => ma, ma)
  }
}

const ops = new Ops()
export const duplicate: Ops['duplicate'] = ops.duplicate
