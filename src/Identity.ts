import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Monad, FantasyMonad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { Comonad, FantasyComonad } from './Comonad'
import { Either } from './Either'
import { ChainRec, tailRec } from './ChainRec'
import { toString } from './function'

declare module './HKT' {
  interface URIHKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

export class Identity<A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlt<URI, A>,
    FantasyComonad<URI, A> {
  static of = of
  static extract = extract
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
  of<B>(b: B): Identity<B> {
    return of(b)
  }
  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return this.map(fab.extract())
  }
  ap_<B, C>(this: Identity<(a: B) => C>, fb: Identity<B>): Identity<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.extract())
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(
    applicative: Applicative<F>
  ): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, Identity<B>>
  traverse<F extends HKTS>(applicative: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Identity<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>> {
    return f => applicative.map(a => of(a), f(this.value))
  }
  alt(fx: Identity<A>): Identity<A> {
    return this
  }
  extract(): A {
    return this.value
  }
  extend<B>(f: (ea: Identity<A>) => B): Identity<B> {
    return of(f(this))
  }
  fold<B>(f: (a: A) => B): B {
    return f(this.value)
  }
  equals(setoid: Setoid<A>, fy: Identity<A>): boolean {
    return setoid.equals(this.value, fy.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Identity(${toString(this.value)})`
  }
}

export function equals<A>(setoid: Setoid<A>, fx: Identity<A>, fy: Identity<A>): boolean {
  return fx.equals(setoid, fy as Identity<A>)
}

export function getSetoid<A>(setoid: Setoid<A>): Setoid<Identity<A>> {
  return {
    equals: (x, y) => equals(setoid, x, y)
  }
}

export function map<A, B>(f: (a: A) => B, fa: Identity<A>): Identity<B> {
  return fa.map(f)
}

export function of<A>(a: A): Identity<A> {
  return new Identity(a)
}

export function ap<A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Identity<B>, fa: Identity<A>): Identity<B> {
  return fa.chain(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Identity<A>): B {
  return fa.reduce(f, b)
}

export function alt<A>(fx: Identity<A>, fy: Identity<A>): Identity<A> {
  return fx.alt(fy)
}

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Identity<A>) => HKT2As<F, L, Identity<B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Identity<A>) => HKTAs<F, Identity<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Identity<A>) => HKT<F, Identity<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Identity<A>) => HKT<F, Identity<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export function extend<A, B>(f: (ea: Identity<A>) => B, ea: Identity<A>): Identity<B> {
  return ea.extend(f)
}

export function extract<A>(fa: Identity<A>): A {
  return fa.extract()
}

export function chainRec<A, B>(f: (a: A) => Identity<Either<A, B>>, a: A): Identity<B> {
  return new Identity(tailRec(a => f(a).extract(), a))
}

export const identity: Monad<URI> & Foldable<URI> & Traversable<URI> & Alt<URI> & Comonad<URI> & ChainRec<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  alt,
  extract,
  extend,
  chainRec
}
