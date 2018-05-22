//
// Code for http://www.tomharding.me/2017/07/10/fantas-eel-and-specification-19/
//

export class Fun<A, B> {
  constructor(readonly run: (a: A) => B) {}
  static id = <A>() => new Fun<A, A>(a => a)
  compose<C>(that: Fun<B, C>): Fun<A, C> {
    return new Fun(a => that.run(this.run(a)))
  }
}

import { Monad } from '../src/Monad'
import { HKT } from '../src/HKT'

export class MCompose<M, A, B> {
  constructor(readonly M: Monad<M>, readonly run: (a: A) => HKT<M, B>) {}
  compose<C>(that: MCompose<M, B, C>): MCompose<M, A, C> {
    return new MCompose(this.M, a => this.M.chain(this.run(a), b => that.run(b)))
  }
}

export const of = <M>(M: Monad<M>) => <A>(): MCompose<M, A, A> => new MCompose(M, a => M.of(a))
