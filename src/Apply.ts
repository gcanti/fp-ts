import { HKT } from './HKT'
import { StaticFunctor } from './Functor'
import { Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4 } from './function'

export interface StaticApply<F> extends StaticFunctor<F> {
  ap<A, B>(fab: HKT<F, Function1<A, B>>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyApply<F, A> {
  map<B>(f: Function1<A, B>): FantasyApply<F, B>
  ap<B>(fab: FantasyApply<F, Function1<A, B>>): FantasyApply<F, B>
}

export class ApplyOps {
  ap<F, A, B>(fab: FantasyApply<F, Function1<A, B>>, fa: FantasyApply<F, A>): FantasyApply<F, B>
  ap<F, A, B>(fab: FantasyApply<F, Function1<A, B>>, fa: FantasyApply<F, A>): FantasyApply<F, B> {
    return fa.ap(fab)
  }

  liftA2<F, A, B, C>(apply: StaticApply<F>, f: Curried2<A, B, C>): Function2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
  liftA2<F, A, B, C>(apply: StaticApply<F>, f: Curried2<A, B, C>): Function2<HKT<F, A>, HKT<F, B>, HKT<F, C>> {
    return (fa, fb) => apply.ap(apply.map(f, fa), fb)
  }

  liftA3<F, A, B, C, D>(apply: StaticApply<F>, f: Curried3<A, B, C, D>): Function3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
  liftA3<F, A, B, C, D>(apply: StaticApply<F>, f: Curried3<A, B, C, D>): Function3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>> {
    return (fa, fb, fc) => apply.ap(apply.ap(apply.map(f, fa), fb), fc)
  }

  liftA4<F, A, B, C, D, E>(apply: StaticApply<F>, f: Curried4<A, B, C, D, E>): Function4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
  liftA4<F, A, B, C, D, E>(apply: StaticApply<F>, f: Curried4<A, B, C, D, E>): Function4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> {
    return (fa, fb, fc, fd) => apply.ap(apply.ap(apply.ap(apply.map(f, fa), fb), fc), fd)
  }
}

export const ops = new ApplyOps()
