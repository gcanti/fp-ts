import { HKT, HKTS } from './HKT'
import { Applicative } from './Applicative'
import { Monad, FantasyMonad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { Comonad, FantasyComonad } from './Comonad'
import { Either } from './Either'
import { ChainRec, tailRec } from './ChainRec'

declare module './HKT' {
  interface HKT<A> {
    Identity: Identity<A>
  }
}

export const URI = 'Identity'

export type URI = typeof URI

export class Identity<A> implements
  FantasyMonad<URI, A>,
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
  chain<B>(f: (a: A) => Identity<B>): Identity<B> {
    return f(this.extract())
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKTS>(applicative: Applicative<F>): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<Identity<B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map<B, Identity<B>>(of, f(this.value))
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
    return `Identity(${JSON.stringify(this.value)})`
  }
}

export function equals<A>(setoid: Setoid<A>, fx: Identity<A>, fy: Identity<A>): boolean {
  return fx.equals(setoid, fy as Identity<A>)
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

export function traverse<F extends HKTS>(applicative: Applicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: Identity<A>) => HKT<Identity<B>, U, V>[F] {
  return <A, B>(f: (a: A) => HKT<B>[F], ta: Identity<A>) => ta.traverse<F>(applicative)<B>(f)
}

export function extend<A, B>(f: (ea: Identity<A>) => B, ea: Identity<A>): Identity<B> {
  return ea.extend(f)
}

export function extract<A>(fa: Identity<A>): A {
  return fa.extract()
}

export function chainRec<A, B>(f: (a: A) => Identity<Either<A, B>>, a: A): Identity<B> {
  return new Identity(tailRec(a => f(a).extract(), a))
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, alt, extract, extend, chainRec } as (
    Monad<URI> &
    Foldable<URI> &
    Traversable<URI> &
    Alt<URI> &
    Comonad<URI> &
    ChainRec<URI>
  )
)
