import { Monad, FantasyMonad } from './Monad'
import { identity, Endomorphism } from './function'
import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Distributive } from './Distributive'

export const URI = 'Reader'

export type URI = typeof URI

export class Reader<E, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _L: E
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: (e: E) => A) {}
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: (a: A) => B): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)))
  }
  of<E2, B>(b: B): Reader<E2, B> {
    return of(b)
  }
  ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> {
    return new Reader((e: E) => fab.run(e)(this.run(e)))
  }
  chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> {
    return new Reader((e: E) => f(this.run(e)).run(e))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: Reader<E, A>): Reader<E, B> {
  return fa.map(f)
}

export function of<E, A>(a: A): Reader<E, A> {
  return new Reader((e: E) => a)
}

export function ap<E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.ap(fab)
}

export function chain<E, A, B>(f: (a: A) => Reader<E, B>, fa: Reader<E, A>): Reader<E, B> {
  return fa.chain(f)
}

/** reads the current context */
export function ask<E>(): Reader<E, E> {
  return new Reader(identity)
}

/** Projects a value from the global context in a Reader */
export function asks<E, A>(f: (e: E) => A): Reader<E, A> {
  return new Reader(f)
}

/** changes the value of the local context during the execution of the action `fa` */
export function local<E, A>(f: Endomorphism<E>, fa: Reader<E, A>): Reader<E, A> {
  return new Reader((e: E) => fa.run(f(e)))
}

export class Ops {
  distribute<G extends HKT2S>(G: Functor<G>): <L, E, A>(gfa: HKT2As<G, L, Reader<E, A>>) => Reader<E, HKT2As<G, L, A>>
  distribute<G extends HKTS>(G: Functor<G>): <E, A>(gfa: HKTAs<G, Reader<E, A>>) => Reader<E, HKTAs<G, A>>
  distribute<G>(G: Functor<G>): <E, A>(gfa: HKT<G, Reader<E, A>>) => Reader<E, HKT<G, A>> {
    return gfa => new Reader(e => G.map(fa => fa.run(e), gfa))
  }
}

const ops = new Ops()
export const distribute: Ops['distribute'] = ops.distribute

export const reader: Monad<URI> & Distributive<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  distribute
}
