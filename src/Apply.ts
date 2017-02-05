import { HKT } from './HKT'
import { Functor } from './Functor'
import { Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4 } from './function'

export type Ap<F> = <A, B>(fab: HKT<F, Function1<A, B>>, fa: HKT<F, A>) => HKT<F, B>;

export interface Apply<F> extends Functor<F> {
  ap: Ap<F>
}

export function liftA2<F, A, B, C>(apply: Apply<F>, f: Curried2<A, B, C>): Function2<HKT<F, A>, HKT<F, B>, HKT<F, C>> {
  return (fa, fb) => apply.ap(apply.map(f, fa), fb)
}

export function liftA3<F, A, B, C, D>(apply: Apply<F>, f: Curried3<A, B, C, D>): Function3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>> {
  return (fa, fb, fc) => apply.ap(apply.ap(apply.map(f, fa), fb), fc)
}

export function liftA4<F, A, B, C, D, E>(apply: Apply<F>, f: Curried4<A, B, C, D, E>): Function4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> {
  return (fa, fb, fc, fd) => apply.ap(apply.ap(apply.ap(apply.map(f, fa), fb), fc), fd)
}
