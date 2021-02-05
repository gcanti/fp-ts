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
import { identity, pipe, unsafeCoerce } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { HeytingAlgebra } from './HeytingAlgebra'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Ring } from './Ring'
import { Semigroup } from './Semigroup'
import { Semiring } from './Semiring'
import { Show } from './Show'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export type Const<E, A> = E & { readonly _A: A }

/**
 * @category constructors
 * @since 2.0.0
 */
export const make: <E, A = never>(e: E) => Const<E, A> = unsafeCoerce

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> {
  return {
    show: (c) => `make(${S.show(c)})`
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = identity

/**
 * @category instances
 * @since 2.6.0
 */
export const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>> = identity

/**
 * @category instances
 * @since 2.6.0
 */
export const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.6.0
 */
export const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 2.0.0
 */
export function getApply<E>(S: Semigroup<E>): Apply2C<URI, E> {
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => make(S.concat(fab, fa))
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E> {
  const A = getApply(M)
  return {
    URI,
    _E: undefined as any,
    map: A.map,
    ap: A.ap,
    of: () => make(M.empty)
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _contramap: Contravariant2<URI>['contramap'] = (fa, f) => pipe(fa, contramap(f))
/* istanbul ignore next */
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 2.0.0
 */
export const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B> = () => unsafeCoerce

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B> = () => unsafeCoerce

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Const<E, A>) => Const<G, B> = (f) => (fa) =>
  make(f(fa))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Const<E, A>) => Const<G, A> = (f) => (fa) => make(f(fa))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Const'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Const<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Contravariant: Contravariant2<URI> = {
  URI,
  contramap: _contramap
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

// -------------------------------------------------------------------------------------
// derivables
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const const_: Functor2<URI> & Contravariant2<URI> & Bifunctor2<URI> = {
  URI,
  map: _map,
  contramap: _contramap,
  bimap: _bimap,
  mapLeft: _mapLeft
}
