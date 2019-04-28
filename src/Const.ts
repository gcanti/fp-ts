import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Contravariant2 } from './Contravariant'
import { phantom, unsafeCoerce, identity } from './function'
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

export type Const<L, A> = L & { readonly _A: A }

/**
 * @since 2.0.0
 */
export const make: <L>(l: L) => Const<L, never> = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getShow<L, A>(S: Show<L>): Show<Const<L, A>> {
  return {
    show: c => `make(${S.show(c)})`
  }
}

/**
 * @since 2.0.0
 */
export const getEq: <L, A>(E: Eq<L>) => Eq<Const<L, A>> = identity

const map = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getApply<L>(S: Semigroup<L>): Apply2C<URI, L> {
  return {
    URI,
    _L: phantom,
    map,
    ap: (fab, fa) => make(S.concat(fab, fa))
  }
}

/**
 * @since 2.0.0
 */
export function getApplicative<L>(M: Monoid<L>): Applicative2C<URI, L> {
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
  contramap: unsafeCoerce
}
