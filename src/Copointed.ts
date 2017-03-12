import { HKT } from './HKT'
import { StaticFunctor } from './Functor'
import { Function1 } from './function'

export interface StaticCopointed<F> extends StaticFunctor<F> {
  extract<A>(ca: HKT<F, A>): A
}

export interface FantasyCopointed<F, A> {
  map<B>(f: Function1<A, B>): FantasyCopointed<F, B>
  extract(): A
}
