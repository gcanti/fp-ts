import { HKT, HKTS } from './HKT'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Alt } from './Alt'
import { Comonad } from './Comonad'
import { Either } from './Either'
import { ChainRec, tailRec } from './ChainRec'

declare module './HKT' {
  interface HKT<A> {
    Id: A
  }
}

export const URI = 'Id'

export type URI = typeof URI

export function equals<A>(setoid: Setoid<A>, fx: A, fy: A): boolean {
  return setoid.equals(fx, fy)
}

export function map<A, B>(f: (a: A) => B, fa: A): B {
  return f(fa)
}

export function of<A>(a: A): A {
  return a
}

export function ap<A, B>(fab: (a: A) => B, fa: A): B {
  return fab(fa)
}

export function chain<A, B>(f: (a: A) => B, fa: A): B {
  return f(fa)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: A): B {
  return f(b, fa)
}

export function alt<A>(fx: A, fy: A): A {
  return fx
}

export function traverse<F extends HKTS>(applicative: Applicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: A) => HKT<B, U, V>[F] {
  return <A, B>(f: (a: A) => HKT<B>[F], ta: A) => applicative.map(of, f(ta))
}

export function extend<A, B>(f: (ea: A) => B, ea: A): B {
  return f(ea)
}

export function extract<A>(fa: A): A {
  return fa
}

export function chainRec<A, B>(f: (a: A) => Either<A, B>, a: A): B {
  return tailRec(a => f(a), a)
}

const proof:
  Monad<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Alt<URI> &
  Comonad<URI> &
  ChainRec<URI>
= { URI, map, of, ap, chain, reduce, traverse, alt, extract, extend, chainRec }
// tslint:disable-next-line no-unused-expression
{ proof }
