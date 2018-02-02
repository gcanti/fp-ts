import { HKT, Type, URIS, Type2, URIS2, URIS3, Type3 } from './HKT'
import { constant } from './function'

/** @typeclass */
export interface Functor<F> {
  readonly URI: F
  map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  readonly URI: F
  map: <A, B>(fa: Type<F, A>, f: (a: A) => B) => Type<F, B>
}

export interface Functor2<F extends URIS2> {
  readonly URI: F
  map: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}

export interface Functor3<F extends URIS3> {
  readonly URI: F
  map: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => B) => Type3<F, U, L, B>
}

export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  map: <A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}

export interface Functor3C<F extends URIS3, U, L> {
  readonly URI: F
  map: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => B) => Type3<F, U, L, B>
}

export interface FunctorComposition<F, G> {
  map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}

export interface FunctorComposition11<F extends URIS, G extends URIS> {
  map: <A, B>(fa: Type<F, Type<G, A>>, f: (a: A) => B) => Type<F, Type<G, B>>
}

export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  map: <L, A, B>(fa: Type<F, Type2<G, L, A>>, f: (a: A) => B) => Type<F, Type2<G, L, B>>
}

export interface FunctorComposition12C<F extends URIS, G extends URIS2, L> {
  map: <A, B>(fa: Type<F, Type2<G, L, A>>, f: (a: A) => B) => Type<F, Type2<G, L, B>>
}

export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  map: <L, A, B>(fa: Type2<F, L, Type<G, A>>, f: (a: A) => B) => Type2<F, L, Type<G, B>>
}

export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  map: <L, M, A, B>(fa: Type2<F, L, Type2<G, M, A>>, f: (a: A) => B) => Type2<F, L, Type2<G, M, B>>
}

/**
 * Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function lift<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(f: (a: A) => B) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function lift<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function lift<F extends URIS2, L>(
  F: Functor2C<F, L>
): <A, B>(f: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
/**
 * Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(fa, f)
}

/** Ignore the return value of a computation, using the specified return value instead (`<$`) */
export function voidRight<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(a: A, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function voidRight<F extends URIS3>(
  F: Functor3<F>
): <U, L, A, B>(a: A, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function voidRight<F extends URIS2, L>(F: Functor2C<F, L>): <A, B>(a: A, fb: Type2<F, L, B>) => Type2<F, L, A>
export function voidRight<F extends URIS2>(F: Functor2<F>): <L, A, B>(a: A, fb: Type2<F, L, B>) => Type2<F, L, A>
export function voidRight<F extends URIS>(F: Functor1<F>): <A, B>(a: A, fb: Type<F, B>) => Type<F, A>
export function voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A>
/**
 * Ignore the return value of a computation, using the specified return value instead (`<$`)
 * @function
 */
export function voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A> {
  return (a, fb) => F.map(fb, constant(a))
}

/** A version of `voidRight` with its arguments flipped (`$>`) */
export function voidLeft<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, b: B) => Type3<F, U, L, B>
export function voidLeft<F extends URIS3>(
  F: Functor3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, b: B) => Type3<F, U, L, B>
export function voidLeft<F extends URIS2, L>(F: Functor2C<F, L>): <A, B>(fa: Type2<F, L, A>, b: B) => Type2<F, L, B>
export function voidLeft<F extends URIS2>(F: Functor2<F>): <L, A, B>(fa: Type2<F, L, A>, b: B) => Type2<F, L, B>
export function voidLeft<F extends URIS>(F: Functor1<F>): <A, B>(fa: Type<F, A>, b: B) => Type<F, B>
export function voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B>
/**
 * A version of `voidRight` with its arguments flipped (`$>`)
 * @function
 */
export function voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B> {
  return (fa, b) => F.map(fa, constant(b))
}

/** Apply a value in a computational context to a value in no context. Generalizes `flip` */
export function flap<F extends URIS3, U, L>(
  functor: Functor3C<F, U, L>
): <A, B>(a: A, ff: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
export function flap<F extends URIS3>(
  functor: Functor3<F>
): <U, L, A, B>(a: A, ff: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
export function flap<F extends URIS2, L>(
  functor: Functor2C<F, L>
): <A, B>(a: A, ff: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
export function flap<F extends URIS2>(
  functor: Functor2<F>
): <L, A, B>(a: A, ff: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
export function flap<F extends URIS>(functor: Functor1<F>): <A, B>(a: A, ff: Type<F, (a: A) => B>) => Type<F, B>
export function flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B>
/**
 * Apply a value in a computational context to a value in no context. Generalizes `flip`
 * @function
 */
export function flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B> {
  return (a, ff) => functor.map(ff, f => f(a))
}

export function getFunctorComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): FunctorComposition22<F, G>
export function getFunctorComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): FunctorComposition21<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): FunctorComposition12<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): FunctorComposition11<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
/** @function */
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> {
  return {
    map: (fa, f) => F.map(fa, ga => G.map(ga, f))
  }
}
