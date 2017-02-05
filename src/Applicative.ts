import { PointedFunctor } from './PointedFunctor'
import { compose as composeFunctor } from './Functor'
import { Apply } from './Apply'
import { HKT, from, to } from './HKT'
import { Function1 } from './function'

export interface Applicative<F> extends PointedFunctor<F>, Apply<F> {}

export function compose<F, G>(f: Applicative<F>, g: Applicative<G>): Applicative<HKT<F, G>> {

  const { map } = composeFunctor(f, g)

  function ap<A, B>(fgab: HKT<HKT<F, G>, Function1<A, B>>, fga: HKT<HKT<F, G>, A>): HKT<HKT<F, G>, B> {
    return to(f.ap(f.map(h => (ga: HKT<G, A>) => g.ap(h, ga), from(fgab)), from(fga)))
  }

  function of<A>(a: A): HKT<HKT<F, G>, A> {
    return to(f.of(g.of(a)))
  }

  return {  map, ap, of }
}
