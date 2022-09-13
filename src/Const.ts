/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import { Bifunctor as Bifunctor_, mapDefault, mapLeftDefault } from './Bifunctor'
import type { BooleanAlgebra } from './BooleanAlgebra'
import type { Bounded } from './Bounded'
import type { Contravariant as Contravariant_ } from './Contravariant'
import type { Eq } from './Eq'
import { flow, identity, unsafeCoerce } from './function'
import { flap as flap_, Functor as Functor_ } from './Functor'
import type { HeytingAlgebra } from './HeytingAlgebra'
import { HKT } from './HKT'
import type { Monoid } from './Monoid'
import type { Ord } from './Ord'
import type { Ring } from './Ring'
import type { Semigroup } from './Semigroup'
import type { Semiring } from './Semiring'
import type { Show } from './Show'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Const<E, A> = E & { readonly _A: A }

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make: <E, A = never>(e: E) => Const<E, A> = unsafeCoerce

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B> = () => unsafeCoerce

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Const<E, A>) => Const<G, B> = (f) =>
  flow(f, make)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <A>(fea: Const<E, A>) => Const<G, A> = /*#__PURE__*/ mapLeftDefault<ConstF>(bimap)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface ConstF extends HKT {
  readonly type: Const<this['Covariant2'], this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface ConstFR extends HKT {
  readonly type: Const<this['Covariant1'], this['Contravariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface ConstFE<E> extends HKT {
  readonly type: Const<E, this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(S: Show<E>): Show<Const<E, A>> => ({
  show: (c) => `make(${S.show(c)})`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: Contravariant_<ConstFR> = {
  contramap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<ConstF> = {
  bimap,
  mapLeft
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B> = /*#__PURE__*/ mapDefault<ConstF>(
  bimap
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<ConstF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Const<E, (a: A) => B>) => Const<E, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(S: Semigroup<E>): Apply<ConstFE<E>> => ({
  map,
  ap: (fa) => (fab) => make(S.concat(fa)(fab))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(M: Monoid<E>): Applicative<ConstFE<E>> => {
  const A = getApply(M)
  return {
    map: A.map,
    ap: A.ap,
    of: () => make(M.empty)
  }
}
