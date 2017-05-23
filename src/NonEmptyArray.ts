import { HKT, HKTS } from './HKT'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticSemigroup } from './Semigroup'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticApplicative } from './Applicative'
import { StaticTraversable, FantasyTraversable } from './Traversable'
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
  FantasyFoldable<A>,
  FantasyTraversable<URI, A> {

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
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<NonEmptyArray<B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((bs: Array<B>) => unsafeFromArray(bs), array.traverse<F>(applicative)<A, B>(f, this.toArray()))
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

export function traverse<F extends HKTS>(applicative: StaticApplicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: NonEmptyArray<A>) => HKT<NonEmptyArray<B>, U, V>[F] {
  return <A, B>(f: (a: A) => HKT<B>[F], ta: NonEmptyArray<A>) => ta.traverse<F>(applicative)<B>(f)
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, concat, reduce, traverse } as (
    StaticMonad<URI> &
    StaticSemigroup<any> &
    StaticFoldable<URI> &
    StaticTraversable<URI>
  )
)
