import { HKT, HKTS, HKT2S, HKT2, HKTAs, HKT2As, HKT3, HKT3S, HKT3As } from './HKT'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Alt } from './Alt'
import { Comonad } from './Comonad'
import { Either } from './Either'
import { ChainRec, tailRec } from './ChainRec'
import { toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

/**
 * @data
 * @constructor Identity
 */
export class Identity<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return this.map(fab.extract())
  }
  ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.extract())
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT3S>(
    applicative: Applicative<F>
  ): <U, L, B>(f: (a: A) => HKT3<F, U, L, B>) => HKT3As<F, U, L, Identity<B>>
  traverse<F extends HKT2S>(
    applicative: Applicative<F>
  ): <L, B>(f: (a: A) => HKT2<F, L, B>) => HKT2As<F, L, Identity<B>>
  traverse<F extends HKTS>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Identity<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>>
  traverse<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>> {
    return f => applicative.map(f(this.value), a => of(a))
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
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Identity(${toString(this.value)})`
  }
}

/** @function */
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<Identity<A>> => {
  return {
    equals: (x, y) => setoid.equals(x.value, y.value)
  }
}

const map = <A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): Identity<A> => {
  return new Identity(a)
}

const ap = <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>): Identity<B> => {
  return fa.chain(f)
}

const reduce = <A, B>(fa: Identity<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const alt = <A>(fx: Identity<A>, fy: Identity<A>): Identity<A> => {
  return fx.alt(fy)
}

const extend = <A, B>(f: (ea: Identity<A>) => B, ea: Identity<A>): Identity<B> => {
  return ea.extend(f)
}

const extract = <A>(fa: Identity<A>): A => {
  return fa.extract()
}

/** @function */
export const chainRec = <A, B>(a: A, f: (a: A) => Identity<Either<A, B>>): Identity<B> => {
  return new Identity(tailRec(a => f(a).extract(), a))
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<URI, A>, f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>>
function traverse<F>(F: Applicative<F>): <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>) => HKT<F, Identity<B>> {
  return (ta, f) => ta.traverse(F)(f)
}

/** @instance */
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
