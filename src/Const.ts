import { Monoid } from './Monoid'
import { Functor2 } from './Functor'
import { Contravariant2 } from './Contravariant'
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
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
export class Const<L, A> {
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Const<L, B> {
    return new Const(this.value)
  }
  contramap<B>(f: (b: B) => A): Const<L, B> {
    return new Const(this.value)
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
  equals: (x, y) => x.fold(ax => y.fold(ay => S.equals(ax, ay)))
})

const map = <L, A, B>(fa: Const<L, A>, f: (a: A) => B): Const<L, B> => {
  return fa.map(f)
}

const contramap = <L, A, B>(fa: Const<L, A>, f: (b: B) => A): Const<L, B> => {
  return fa.contramap(f)
}

const ap = <L>(S: Semigroup<L>) => <A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B> => {
  return new Const(S.concat(fab.fold(identity), fa.fold(identity)))
}

/** @function */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  return {
    URI,
    map,
    ap: ap(S)
  }
}

const of = <L>(M: Monoid<L>) => <A>(b: A): Const<L, A> => {
  return new Const<L, any>(M.empty)
}

/** @function */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: of(M)
  }
}

/** @instance */
export const const_: Functor2<URI> & Contravariant2<URI> = {
  URI,
  map,
  contramap
}
