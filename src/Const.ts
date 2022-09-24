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
import * as bifunctor from './Bifunctor'
import type { BooleanAlgebra } from './BooleanAlgebra'
import type { Bounded } from './Bounded'
import type * as contravariant from './Contravariant'
import type { Eq } from './Eq'
import { identity, unsafeCoerce } from './function'
import * as functor from './Functor'
import type { HeytingAlgebra } from './HeytingAlgebra'
import type { HKT } from './HKT'
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
 * @since 3.0.0
 */
export declare const phantom: unique symbol

/**
 * @category model
 * @since 3.0.0
 */
export type Const</** in out */ S, /** out */ A> = S & { readonly [phantom]: A }

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstF extends HKT {
  readonly type: Const<this['Invariant1'], this['Covariant1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstFCovariantS extends HKT {
  readonly type: Const<this['Covariant2'], this['Covariant1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstFContravariantA extends HKT {
  readonly type: Const<this['Invariant1'], this['Contravariant1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstFFixedS<S> extends HKT {
  readonly type: Const<S, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make: <S>(s: S) => Const<S, never> = unsafeCoerce

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B> = () => unsafeCoerce

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth: <S, T, A, B>(f: (s: S) => T, g: (a: A) => B) => (self: Const<S, A>) => Const<T, B> =
  (f) => (fea) => {
    return make(f(fea))
  }

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <S, G>(f: (s: S) => G) => <A>(self: Const<S, A>) => Const<G, A> =
  /*#__PURE__*/ bifunctor.getDefaultMapLeft<ConstFCovariantS>(mapBoth)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <S, A>(S: Show<S>): Show<Const<S, A>> => ({
  show: (c) => `make(${S.show(c)})`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <S, A>(E: Eq<S>) => Eq<Const<S, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <S, A>(O: Ord<S>) => Ord<Const<S, A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getBounded: <S, A>(B: Bounded<S>) => Bounded<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup: <S, A>(S: Semigroup<S>) => Semigroup<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid: <S, A>(M: Monoid<S>) => Monoid<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemiring: <S, A>(S: Semiring<S>) => Semiring<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing: <S, A>(S: Ring<S>) => Ring<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getHeytingAlgebra: <S, A>(H: HeytingAlgebra<S>) => HeytingAlgebra<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const getBooleanAlgebra: <S, A>(H: BooleanAlgebra<S>) => BooleanAlgebra<Const<S, A>> = identity as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ConstFContravariantA> = {
  contramap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ConstFCovariantS> = {
  mapBoth,
  mapLeft
}

/**
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B> =
  /*#__PURE__*/ bifunctor.getDefaultMap<ConstFCovariantS>(mapBoth)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ConstFCovariantS> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <S>(S: Semigroup<S>): Apply<ConstFFixedS<S>> => ({
  map,
  ap: (fa) => (fab) => make(S.combine(fa)(fab))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <S>(M: Monoid<S>): Applicative<ConstFFixedS<S>> => {
  const A = getApply(M)
  return {
    map: A.map,
    ap: A.ap,
    of: () => make(M.empty)
  }
}
