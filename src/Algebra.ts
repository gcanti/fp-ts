/**
 * F-algebras generalize the notion of algebraic structure.
 * Catamorphisms provide generalizations of folds of lists to arbitrary algebraic data types, which can be described as initial F-Algebras.
 * @since 2.5.4
 */
import { Functor1, Functor, Functor2, Functor3, Functor4 } from './Functor'
import { URIS, Kind, HKT, Kind2, URIS2, URIS3, Kind3, URIS4, Kind4 } from './HKT'

/**
 * @since 2.5.4
 */
export interface Algebra<F, A> {
  (_: HKT<F, A>): A
}

/**
 * @since 2.5.4
 */
export interface Algebra1<F extends URIS, A> {
  (_: Kind<F, A>): A
}

/**
 * @since 2.5.4
 */
export interface Algebra2<F extends URIS2, E, A> {
  (_: Kind2<F, E, A>): A
}

/**
 * @since 2.5.4
 */
export interface Algebra3<F extends URIS3, R, E, A> {
  (_: Kind3<F, R, E, A>): A
}

/**
 * @since 2.5.4
 */
export interface Algebra4<F extends URIS4, S, R, E, A> {
  (_: Kind4<F, S, R, E, A>): A
}

/**
 * Abstractly specify the initial algebra of a Functor F as its fixed point.
 * @since 2.5.4
 */
export interface Fix<F> {
  readonly unfix: HKT<F, Fix<F>>
}

/**
 * @since 2.5.4
 */
export interface Fix1<F extends URIS> {
  readonly unfix: Kind<F, Fix1<F>>
}

/**
 * @since 2.5.4
 */
export interface Fix2<F extends URIS2, E> {
  readonly unfix: Kind2<F, E, Fix2<F, E>>
}

/**
 * @since 2.5.4
 */
export interface Fix3<F extends URIS3, R, E> {
  readonly unfix: Kind3<F, R, E, Fix3<F, R, E>>
}

/**
 * @since 2.5.4
 */
export interface Fix4<F extends URIS4, S, R, E> {
  readonly unfix: Kind4<F, S, R, E, Fix4<F, S, R, E>>
}

/**
 * Construct a fixed point (invariant) for an F-Algebra.
 * @since 2.5.4
 */
export function fix<F extends URIS>(unfix: Kind<F, Fix1<F>>): Fix1<F>
export function fix<F extends URIS2, E>(unfix: Kind2<F, E, Fix2<F, E>>): Fix2<F, E>
export function fix<F extends URIS3, R, E>(unfix: Kind3<F, R, E, Fix3<F, R, E>>): Fix3<F, R, E>
export function fix<F extends URIS4, S, R, E>(unfix: Kind4<F, S, R, E, Fix4<F, S, R, E>>): Fix4<F, S, R, E>
export function fix<F>(unfix: HKT<F, Fix<F>>): Fix<F> {
  return {
    unfix
  }
}

function cata_<F>(
  F: Functor<F>
): {
  <A>(alg: Algebra<F, A>): (_: Fix<F>) => A
} {
  return (alg) => (_) => alg(F.map(_.unfix, (_) => cata_(F)(alg)(_)))
}

/**
 * Recursively defined catamorphism provide generalizations of folds of lists to arbitrary initial F-Algebras.
 * @since 2.5.4
 */
export function cata<F extends URIS>(F: Functor1<F>): <A>(alg: Algebra1<F, A>) => (_: Fix1<F>) => A
export function cata<F extends URIS2, E>(F: Functor2<F>): <A>(alg: Algebra2<F, E, A>) => (_: Fix2<F, E>) => A
export function cata<F extends URIS3, R, E>(F: Functor3<F>): <A>(alg: Algebra3<F, R, E, A>) => (_: Fix3<F, R, E>) => A
export function cata<F extends URIS4, S, R, E>(
  F: Functor4<F>
): <A>(alg: Algebra4<F, S, R, E, A>) => (_: Fix4<F, S, R, E>) => A
export function cata<F>(F: Functor<F>): <A>(alg: Algebra<F, A>) => (_: Fix<F>) => A {
  return cata_(F)
}
