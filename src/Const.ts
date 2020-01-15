/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Contravariant2 } from './Contravariant'
import { unsafeCoerce, identity } from './function'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Show } from './Show'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Const: Const<E, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Const'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Const<E, A> = E & { readonly _A: A }

/**
 * @since 2.0.0
 */
export const make: <E, A = never>(l: E) => Const<E, A> = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> {
  return {
    show: c => `make(${S.show(c)})`
  }
}

/**
 * @since 2.0.0
 */
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = identity

/**
 * @since 2.0.0
 */
export function getApply<E>(S: Semigroup<E>): Apply2C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map: const_.map,
    ap: (fab, fa) => make(S.concat(fab, fa))
  }
}

/**
 * @since 2.0.0
 */
export function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E> {
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
  map: unsafeCoerce,
  contramap: unsafeCoerce
}

const { contramap, map } = pipeable(const_)

export {
  /**
   * @since 2.0.0
   */
  contramap,
  /**
   * @since 2.0.0
   */
  map
}
