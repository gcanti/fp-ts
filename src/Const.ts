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
export type Const<W, A> = W & { readonly _A: A }

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make: <W, A = never>(w: W) => Const<W, A> = unsafeCoerce

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <W>(fa: Const<W, A>) => Const<W, B> = () => unsafeCoerce

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) => (fea: Const<W, A>) => Const<X, B> = (f) =>
  flow(f, make)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <W, G>(
  f: (w: W) => G
) => <A>(fea: Const<W, A>) => Const<G, A> = /*#__PURE__*/ mapLeftDefault<ConstF>(bimap)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ConstF extends HKT {
  readonly type: Const<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ConstFContravariant extends HKT {
  readonly type: Const<this['Covariant1'], this['Contravariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ConstFFixedW<W> extends HKT {
  readonly type: Const<W, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <W, A = never>(S: Show<W>): Show<Const<W, A>> => ({
  show: (c) => `make(${S.show(c)})`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <W, A = never>(E: Eq<W>) => Eq<Const<W, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <W, A = never>(O: Ord<W>) => Ord<Const<W, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getBounded: <W, A = never>(B: Bounded<W>) => Bounded<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup: <W, A = never>(S: Semigroup<W>) => Semigroup<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid: <W, A = never>(M: Monoid<W>) => Monoid<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemiring: <W, A = never>(S: Semiring<W>) => Semiring<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing: <W, A = never>(S: Ring<W>) => Ring<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getHeytingAlgebra: <W, A = never>(H: HeytingAlgebra<W>) => HeytingAlgebra<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getBooleanAlgebra: <W, A = never>(H: BooleanAlgebra<W>) => BooleanAlgebra<Const<W, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: Contravariant_<ConstFContravariant> = {
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
export const map: <A, B>(f: (a: A) => B) => <W>(fa: Const<W, A>) => Const<W, B> = /*#__PURE__*/ mapDefault<ConstF>(
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
export const flap: <A>(a: A) => <W, B>(fab: Const<W, (a: A) => B>) => Const<W, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply<ConstFFixedW<W>> => ({
  map,
  ap: (fa) => (fab) => make(S.concat(fa)(fab))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(M: Monoid<W>): Applicative<ConstFFixedW<W>> => {
  const A = getApply(M)
  return {
    map: A.map,
    ap: A.ap,
    of: () => make(M.empty)
  }
}
