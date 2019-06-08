import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Contravariant2 } from './Contravariant'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Eq, fromEquals } from './Eq'
import { toString } from './function'
import { Show } from './Show'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Const: Const<L, A>
  }
}

export const URI = 'Const'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Const<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  /**
   * Use `make`
   *
   * @deprecated
   */
  constructor(readonly value: L) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): Const<L, B> {
    return this as any
  }
  /** @obsolete */
  contramap<B>(f: (b: B) => A): Const<L, B> {
    return this as any
  }
  /** @obsolete */
  fold<B>(f: (l: L) => B): B {
    return f(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `make(${toString(this.value)})`
  }
}

/**
 * @since 1.17.0
 */
export const getShow = <L, A>(S: Show<L>): Show<Const<L, A>> => {
  return {
    show: c => `make(${S.show(c.value)})`
  }
}

/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const getSetoid: <L, A>(S: Eq<L>) => Eq<Const<L, A>> = getEq

/**
 * @since 1.19.0
 */
export function getEq<L, A>(S: Eq<L>): Eq<Const<L, A>> {
  return fromEquals((x, y) => S.equals(x.value, y.value))
}

/**
 * @since 1.0.0
 */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  return {
    URI,
    _L: undefined as any,
    map: const_.map,
    ap: (fab, fa) => make(S.concat(fab.value, fa.value))
  }
}

/**
 * @since 1.0.0
 */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: () => make(M.empty)
  }
}

/**
 * @since 1.0.0
 */
export const const_: Functor2<URI> & Contravariant2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  contramap: (fa, f) => fa.contramap(f)
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function make<L>(l: L): Const<L, never> {
  // tslint:disable-next-line: deprecation
  return new Const(l)
}

const { contramap, map } = pipeable(const_)

export { contramap, map }
