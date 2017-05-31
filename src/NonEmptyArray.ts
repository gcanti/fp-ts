import { HKT, HKTS } from './HKT'
import { Monad, FantasyMonad } from './Monad'
import { Comonad, FantasyComonad } from './Comonad'
import { Semigroup } from './Semigroup'
import { Foldable, FantasyFoldable } from './Foldable'
import { Applicative } from './Applicative'
import { Traversable, FantasyTraversable } from './Traversable'
import * as array from './Array'
import { Option, some, none } from './Option'

declare module './HKT' {
  interface HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray'

export type URI = typeof URI

export class NonEmptyArray<A> implements
  FantasyMonad<URI, A>,
  FantasyComonad<URI, A>,
  FantasyFoldable<A>,
  FantasyTraversable<URI, A> {

  static of = of
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly head: A, public readonly tail: Array<A>) {}
  toArray(): Array<A> {
    return [this.head].concat(this.tail)
  }
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, this.tail.concat(as))
  }
  map<B>(f: (a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }
  of<B>(b: B): NonEmptyArray<B> {
    return of(b)
  }
  ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(a => f(a).toArray(), this.tail))
  }
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return array.reduce(f, b, this.toArray())
  }
  traverse<F extends HKTS>(applicative: Applicative<F>): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<NonEmptyArray<B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((bs: Array<B>) => unsafeFromArray(bs), array.traverse<F>(applicative)<A, B>(f, this.toArray()))
  }
  extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> {
    return unsafeFromArray(array.extend(as => f(unsafeFromArray(as)), this.toArray()))
  }
  extract(): A {
    return this.head
  }
}

function unsafeFromArray<A>(as: Array<A>): NonEmptyArray<A> {
  return new NonEmptyArray(as[0], as.slice(1))
}

export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> {
  return as.length ? some(unsafeFromArray(as)) : none
}

export function map<A, B>(f: (a: A) => B, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.map(f)
}

export function ap<A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.ap(fab)
}

export function of<A>(a: A): NonEmptyArray<A> {
  return new NonEmptyArray(a, [])
}

export function chain<A, B>(f: (a: A) => NonEmptyArray<B>, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.chain(f)
}

export function concat<A>(fx: NonEmptyArray<A>, fy: NonEmptyArray<A>): NonEmptyArray<A> {
  return fx.concat(fy)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: NonEmptyArray<A>): B {
  return fa.reduce(f, b)
}

export function traverse<F extends HKTS>(applicative: Applicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: NonEmptyArray<A>) => HKT<NonEmptyArray<B>, U, V>[F] {
  return <A, B>(f: (a: A) => HKT<B>[F], ta: NonEmptyArray<A>) => ta.traverse<F>(applicative)<B>(f)
}

export function extend<A, B>(f: (fa: NonEmptyArray<A>) => B, fa: NonEmptyArray<A>): NonEmptyArray<B> {
  return fa.extend(f)
}

export function extract<A>(fa: NonEmptyArray<A>): A {
  return fa.extract()
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, reduce, traverse } as (
    Monad<URI> &
    Comonad<URI> &
    Semigroup<any> &
    Foldable<URI> &
    Traversable<URI>
  )
)
