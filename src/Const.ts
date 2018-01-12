import { Monoid } from './Monoid'
import { Functor, FantasyFunctor } from './Functor'
import { Contravariant, FantasyContravariant } from './Contravariant'
import { Applicative } from './Applicative'
import { Apply } from './Apply'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { identity, toString } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Const: Const<L, A>
  }
}

export const URI = 'Const'

export type URI = typeof URI

/**
 * @data
 * @constructor Const
 */
export class Const<L, A> implements FantasyFunctor<URI, A>, FantasyContravariant<URI, A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_L': L
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: L) {}
  map<B, C>(f: (b: B) => C): Const<L, C> {
    return this as any
  }
  contramap<B, C>(f: (c: C) => B): Const<L, C> {
    return this as any
  }
  fold<B>(f: (l: L) => B): B {
    return f(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Const(${toString(this.value)})`
  }
}

/** @function */
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ({
  equals: x => y => x.fold(ax => y.fold(ay => S.equals(ax)(ay)))
})

/** @function */
export const map = <L, A, B>(f: (a: A) => B, fa: Const<L, A>): Const<L, B> => {
  return fa.map(f)
}

/** @function */
export const contramap = <L, A, B>(f: (b: B) => A, fa: Const<L, A>): Const<L, B> => {
  return fa.contramap(f)
}

/** @function */
export const ap = <L>(S: Semigroup<L>) => <A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B> => {
  return new Const(S.concat(fab.fold(identity))(fa.fold(identity)))
}

/** @function */
export const getApply = <L>(S: Semigroup<L>): Apply<URI> => {
  return {
    URI,
    map,
    ap: ap(S)
  }
}

/** @function */
export const of = <L>(M: Monoid<L>) => <A>(b: A): Const<L, A> => {
  return new Const<L, any>(M.empty())
}

/** @function */
export const getApplicative = <L>(M: Monoid<L>): Applicative<URI> => {
  return {
    ...getApply(M),
    of: of(M)
  }
}

/** @instance */
export const const_: Functor<URI> & Contravariant<URI> = {
  URI,
  map,
  contramap
}
