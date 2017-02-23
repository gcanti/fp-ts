// adapted from http://okmij.org/ftp/Haskell/extensible/more.pdf

// se also (Scala) https://github.com/atnos-org/eff/tree/master/shared/src/main/scala/org/atnos/eff

import { HKT, HKTS } from './HKT'
import { FantasyMonad } from './Monad'

declare module './HKT' {
  interface HKT<A> {
    Eff: Eff<any, A>
  }
}

export const URI = 'Eff'

export type URI = typeof URI

export type Eff<R extends HKTS, A> = Pure<R, A> | Impure<R, A, any>

export class Pure<R extends HKTS, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Pure'
  readonly _R: R
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly a: A) {}
  map<B>(f: (a: A) => B): Eff<R, B> {
    return new Pure<R, B>(f(this.a))
  }
  of<B>(b: B): Eff<R, B> {
    return of<R, B>(b)
  }
  ap<B>(fab: Eff<R, (a: A) => B>): Eff<R, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => Eff<R, B>): Eff<R, B> {
    return f(this.a)
  }
}

declare module './HKT' {
  interface HKT<A> {
    Union: Union<any, A>
  }
}

export class Union<R extends HKTS, X> {
  _R: R
  _X: X
  constructor(public readonly value: HKT<X>[R]) {}
}

// import * as option from './Option'
// import * as task from './Task'

// const x = new Union<option.URI | task.URI, number>(task.of(1))

export type Arr<R extends HKTS, A, B> = (a: A) => Eff<R, B>

export class Arrs<R extends HKTS, X, A> {
  _R: R
  _X: X
  _A: A
  constructor(public readonly value: Array<Arr<R, any, any>>) {}
  append<B>(arr: Arr<R, A, B>): Arrs<R, X, B> {
    return new Arrs<R, X, B>(this.value.concat(arr))
  }
}

export class Impure<R extends HKTS, A, X> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Impure'
  readonly _R: R
  readonly _A: A
  readonly _X: X
  readonly _URI: URI
  constructor(public readonly rx: Union<R, X>, public readonly arrs: Arrs<R, X, A>) {}
  map<B>(f: (a: A) => B): Eff<R, B> {
    return this.chain(a => this.of(f(a))) // <- derived
  }
  of<B>(b: B): Eff<R, B> {
    return of<R, B>(b)
  }
  ap<B>(fab: Eff<R, (a: A) => B>): Eff<R, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => Eff<R, B>): Eff<R, B> {
    return new Impure(this.rx, this.arrs.append(f))
  }
}

export function of<R extends HKTS, A>(a: A): Eff<R, A> {
  return new Pure<R, A>(a)
}

export function send<R extends HKTS, A>(ra: HKT<A>[R]): Eff<R, A> {
  return new Impure<R, A, A>(new Union<R, A>(ra), new Arrs<R, A, A>([of]))
}
