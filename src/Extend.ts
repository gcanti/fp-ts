import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
import { Cokleisli } from './function'
import { Functor, FantasyFunctor } from './Functor'

export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: Cokleisli<F, A, B>, ea: HKT<F, A>): HKT<F, B>
}

export interface FantasyExtend<F, A> extends FantasyFunctor<F, A> {
  extend<B>(f: Cokleisli<F, A, B>): HKT<F, B>
}

export class Ops {
  duplicate<F extends HKT2S>(extend: Extend<F>): <L, A>(ma: URI2HKT2<L, A>[F]) => URI2HKT2<L, URI2HKT2<L, A>[F]>[F]
  duplicate<F extends HKTS>(extend: Extend<F>): <A>(ma: URI2HKT<A>[F]) => URI2HKT<URI2HKT<A>[F]>[F]
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
  duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> {
    return ma => extend.extend(ma => ma, ma)
  }
}

const ops = new Ops()
export const duplicate: Ops['duplicate'] = ops.duplicate
