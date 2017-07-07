import { Monoid } from './Monoid'
import { Functor, FantasyFunctor } from './Functor'
import { Contravariant, FantasyContravariant } from './Contravariant'
import { Applicative } from './Applicative'
import { Apply } from './Apply'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { identity, toString } from './function'

export const URI = 'Const'

export type URI = typeof URI

export class Const<L, A> implements FantasyFunctor<URI, A>, FantasyContravariant<URI, A> {
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: L) {}
  map<B, C>(f: (b: B) => C): Const<L, C> {
    return this as any
  }
  contramap<B, C>(f: (c: C) => B): Const<L, C> {
    return this as any
  }
  fold<B>(f: (l: L) => B): B {
    return f(this.value)
  }
  equals(S: Setoid<L>, fy: Const<L, A>): boolean {
    return this.fold(x => fy.fold(y => S.equals(x, y)))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Const(${toString(this.value)})`
  }
}

export function equals<L, A>(S: Setoid<L>, fx: Const<L, A>, fy: Const<L, A>): boolean {
  return fx.equals(S, fy)
}

export function getSetoid<L, A>(S: Setoid<L>): Setoid<Const<L, A>> {
  return {
    equals: (x, y) => equals(S, x, y)
  }
}

export function map<L, A, B>(f: (a: A) => B, fa: Const<L, A>): Const<L, B> {
  return fa.map(f)
}

export function contramap<L, A>(fa: Const<L, A>): <B>(f: (b: B) => A) => Const<L, B> {
  return <B>(f: (b: B) => A) => fa.contramap(f)
}

export function getApply<L>(S: Semigroup<L>): Apply<URI> {
  function ap<A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B> {
    return new Const(S.concat(fab.fold(identity), fa.fold(identity)))
  }
  return {
    URI,
    map,
    ap
  }
}

export function getApplicative<L>(M: Monoid<L>): Applicative<URI> {
  const apply = getApply(M)
  const empty = new Const<L, any>(M.empty())
  function of<A>(b: A): Const<L, A> {
    return empty
  }
  return {
    ...apply,
    of
  }
}

export const const_: Functor<URI> & Contravariant<URI> = { URI, map, contramap }
