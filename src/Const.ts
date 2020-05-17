/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { BooleanAlgebra } from './BooleanAlgebra'
import { Bounded } from './Bounded'
import { Contravariant2 } from './Contravariant'
import { Eq } from './Eq'
import { identity, unsafeCoerce } from './function'
import { Functor2 } from './Functor'
import { HeytingAlgebra } from './HeytingAlgebra'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { pipeable } from './pipeable'
import { Ring } from './Ring'
import { Semigroup } from './Semigroup'
import { Semiring } from './Semiring'
import { Show } from './Show'

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
export const make: <E, A = never>(e: E) => Const<E, A> = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> {
  return {
    show: (c) => `make(${S.show(c)})`
  }
}

/**
 * @since 2.0.0
 */
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = identity

/**
 * @since 2.6.0
 */
export const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>> = identity

/**
 * @since 2.6.0
 */
export const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>> = identity as any

/**
 * @since 2.6.0
 */
export const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>> = identity as any

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
export const const_: Functor2<URI> & Contravariant2<URI> & Bifunctor2<URI> = {
  URI,
  map: unsafeCoerce,
  contramap: unsafeCoerce,
  bimap: (fea, f) => make(f(fea)),
  mapLeft: (fea, f) => make(f(fea))
}

const pipeables = /*#__PURE__*/ pipeable(const_)
const contramap = /*#__PURE__*/ (() => pipeables.contramap)()
const map = /*#__PURE__*/ (() => pipeables.map)()

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
