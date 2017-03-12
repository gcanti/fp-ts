import { HKT } from './HKT'
import { Cokleisli, identity } from './function'

export interface StaticExtend<F> {
  extend<A, B>(f: Cokleisli<F, A, B>, ea: HKT<F, A>): HKT<F, B>
}

export interface FantasyExtend<F, A> {
  extend<B>(f: Cokleisli<F, A, B>): FantasyExtend<F, B>
}

export class ExtendOps {
  extend<F, A, B>(f: Cokleisli<F, A, B>, ea: FantasyExtend<F, A>): FantasyExtend<F, B>
  extend<F, A, B>(f: Cokleisli<F, A, B>, ea: FantasyExtend<F, A>): FantasyExtend<F, B> {
    return ea.extend(f)
  }

  // TODO
  duplicate<F, A>(ma: FantasyExtend<F, A>): FantasyExtend<F, FantasyExtend<F, A>>
  duplicate<F, A>(ma: FantasyExtend<F, A>): FantasyExtend<F, FantasyExtend<F, A>> {
    return ma.extend(identity) as any
  }
}

export const ops = new ExtendOps()
