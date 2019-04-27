import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Contravariant2 } from './Contravariant'
import { phantom } from './function'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Show } from './Show'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Const: Const<L, A>
  }
}

export const URI = 'Const'

export type URI = typeof URI

export type Const<L, A> = L & { A: A }

/**
 * @since 2.0.0
 */
export const make = <L>(l: L): Const<L, never> => {
  return l as any
}

/**
 * @since 2.0.0
 */
export const getShow = <L, A>(S: Show<L>): Show<Const<L, A>> => {
  return {
    show: c => `make(${S.show(c)})`
  }
}

/**
 * @since 2.0.0
 */
export function getEq<L, A>(E: Eq<L>): Eq<Const<L, A>> {
  return E
}

const map = <L, A, B>(fa: Const<L, A>, _: (a: A) => B): Const<L, B> => {
  return fa as any
}

/**
 * @since 2.0.0
 */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  const ap = <A, B>(fab: Const<L, (a: A) => B>, fa: Const<L, A>): Const<L, B> => {
    return make(S.concat(fab, fa))
  }

  return {
    URI,
    _L: phantom,
    map,
    ap
  }
}

/**
 * @since 2.0.0
 */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: () => make(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const const_: Functor2<URI> & Contravariant2<URI> = {
  URI,
  map,
  contramap: fa => fa as any
}
