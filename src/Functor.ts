import { HKT, HKT2, HKTAs, HKTS, HKT2As, HKT2S, HKT3S, HKT3As, HKT3 } from './HKT'
import { constant } from './function'

/** @typeclass */
export interface Functor<F> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyFunctor<F, A> {
  map<B>(f: (a: A) => B): HKT<F, B>
}

export interface FunctorComposition<F, G> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>>
}

export interface FunctorComposition11<F extends HKTS, G extends HKTS> {
  map<A, B>(f: (a: A) => B, fa: HKTAs<F, HKTAs<G, A>>): HKTAs<F, HKTAs<G, B>>
}

export interface FunctorComposition12<F extends HKTS, G extends HKT2S> {
  map<L, A, B>(f: (a: A) => B, fa: HKTAs<F, HKT2As<G, L, A>>): HKTAs<F, HKT2As<G, L, B>>
}

export interface FunctorComposition21<F extends HKT2S, G extends HKTS> {
  map<L, A, B>(f: (a: A) => B, fa: HKT2As<F, L, HKTAs<G, A>>): HKT2As<F, L, HKTAs<G, B>>
}

export interface FunctorComposition22<F extends HKT2S, G extends HKT2S> {
  map<L, M, A, B>(f: (a: A) => B, fa: HKT2As<F, L, HKT2As<G, M, A>>): HKT2As<F, L, HKT2As<G, M, B>>
}

/**
 * Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
 */
export function lift<F extends HKT3S>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <U, L>(fa: HKT3As<F, U, L, A>) => HKT3As<F, U, L, B>
export function lift<F extends HKT2S>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <L>(fa: HKT2As<F, L, A>) => HKT2As<F, L, B>
export function lift<F extends HKTS>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKTAs<F, A>) => HKTAs<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
/**
 * Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(f, fa)
}

/** Ignore the return value of a computation, using the specified return value instead (`<$`) */
export function voidRight<F extends HKT3S>(
  F: Functor<F>
): <A>(a: A) => <U, L, B>(fb: HKT3<F, U, L, B>) => HKT3As<F, U, L, A>
export function voidRight<F extends HKT2S>(F: Functor<F>): <A>(a: A) => <L, B>(fb: HKT2<F, L, B>) => HKT2As<F, L, A>
export function voidRight<F extends HKTS>(F: Functor<F>): <A>(a: A) => <B>(fb: HKT<F, B>) => HKTAs<F, A>
export function voidRight<F>(F: Functor<F>): <A>(a: A) => <B>(fb: HKT<F, B>) => HKT<F, A>
/**
 * Ignore the return value of a computation, using the specified return value instead (`<$`)
 * @function
 */
export function voidRight<F>(F: Functor<F>): <A>(a: A) => <B>(fb: HKT<F, B>) => HKT<F, A> {
  return a => fb => F.map(constant(a), fb)
}

/** A version of `voidRight` with its arguments flipped (`$>`) */
export function voidLeft<F extends HKT3S>(
  F: Functor<F>
): <U, L, A>(fa: HKT3<F, U, L, A>) => <B>(b: B) => HKT3As<F, U, L, B>
export function voidLeft<F extends HKT2S>(F: Functor<F>): <L, A>(fa: HKT2<F, L, A>) => <B>(b: B) => HKT2As<F, L, B>
export function voidLeft<F extends HKTS>(F: Functor<F>): <A>(fa: HKT<F, A>) => <B>(b: B) => HKTAs<F, B>
export function voidLeft<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => <B>(b: B) => HKT<F, B>
/**
 * A version of `voidRight` with its arguments flipped (`$>`)
 * @function
 */
export function voidLeft<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => <B>(b: B) => HKT<F, B> {
  return fa => b => F.map(constant(b), fa)
}

/** Apply a value in a computational context to a value in no context. Generalizes `flip` */
export function flap<F extends HKT3S>(
  functor: Functor<F>
): <U, L, A, B>(ff: HKT3As<F, U, L, (a: A) => B>) => (a: A) => HKT3As<F, U, L, B>
export function flap<F extends HKT2S>(
  functor: Functor<F>
): <L, A, B>(ff: HKT2As<F, L, (a: A) => B>) => (a: A) => HKT2As<F, L, B>
export function flap<F extends HKTS>(functor: Functor<F>): <A, B>(ff: HKTAs<F, (a: A) => B>) => (a: A) => HKTAs<F, B>
export function flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>) => (a: A) => HKT<F, B>
/**
 * Apply a value in a computational context to a value in no context. Generalizes `flip`
 * @function
 */
export function flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>) => (a: A) => HKT<F, B> {
  return ff => a => functor.map(f => f(a), ff)
}

export function getFunctorComposition<F extends HKT2S, G extends HKT2S>(
  F: Functor<F>,
  G: Functor<G>
): FunctorComposition22<F, G>
export function getFunctorComposition<F extends HKT2S, G extends HKTS>(
  F: Functor<F>,
  G: Functor<G>
): FunctorComposition21<F, G>
export function getFunctorComposition<F extends HKTS, G extends HKT2S>(
  F: Functor<F>,
  G: Functor<G>
): FunctorComposition12<F, G>
export function getFunctorComposition<F extends HKTS, G extends HKTS>(
  F: Functor<F>,
  G: Functor<G>
): FunctorComposition11<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
/** @function */
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> {
  return {
    map: (f, fa) => F.map(ga => G.map(f, ga), fa)
  }
}
