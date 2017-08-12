//
// Code for http://www.tomharding.me/2017/07/10/fantas-eel-and-specification-19/
//

export class Fun<A, B> {
  constructor(public readonly run: (a: A) => B) {}
  static id = <A>() => new Fun<A, A>(a => a)
  compose<C>(that: Fun<B, C>): Fun<A, C> {
    return new Fun(a => that.run(this.run(a)))
  }
}

import { Monad } from '../../src/Monad'
import { HKT } from '../../src/HKT'

export class MCompose<M, A, B> {
  constructor(public readonly M: Monad<M>, public readonly run: (a: A) => HKT<M, B>) {}
  compose<C>(that: MCompose<M, B, C>): MCompose<M, A, C> {
    return new MCompose(this.M, a => this.M.chain(b => that.run(b), this.run(a)))
  }
}

export function of<M>(M: Monad<M>): <A>() => MCompose<M, A, A> {
  return () => new MCompose(M, a => M.of(a))
}
