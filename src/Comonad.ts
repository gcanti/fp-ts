import { StaticExtend } from './Extend'
import { StaticCopointed } from './Copointed'
import { Cokleisli, Function1 } from './function'

export interface StaticComonad<F> extends StaticExtend<F>, StaticCopointed<F> {}

export interface FantasyComonad<F, A> {
  map<B>(f: Function1<A, B>): FantasyComonad<F, B>
  extract(): A
  extend<B>(f: Cokleisli<F, A, B>): FantasyComonad<F, B>
}
