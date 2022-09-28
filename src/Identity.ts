/**
 * ```ts
 * export type Identity<A> = A
 * ```
 *
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import * as apply from './Apply'
import type * as applicative from './Applicative'
import * as flattenable from './Flattenable'
import * as flattenableRec from './FlattenableRec'
import type * as comonad from './Comonad'
import type { Either } from './Either'
import type { Eq } from './Eq'
import type * as extendable from './Extendable'
import type * as foldable from './Foldable'
import type { LazyArg } from './function'
import { flow, identity } from './function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type * as pointed from './Pointed'
import type { Show } from './Show'
import * as traversable from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Identity<A> = A

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IdentityTypeLambda extends TypeLambda {
  readonly type: Identity<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = identity

/**
 * @category combinators
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IdentityTypeLambda> = {
  map
}

/**
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Identity<(a: A) => B>) => B = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => Identity<A> = identity

/**
 * @since 3.0.0
 */
export const unit: Identity<void> = of(undefined)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<IdentityTypeLambda> = {
  of
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Identity<B>) => (self: Identity<A>) => Identity<B> = (f) => (self) => f(self)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<IdentityTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <_>(that: _) => <A>(self: A) => A = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <A>(that: A) => <_>(self: _) => A = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IdentityTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Identity`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: A, fb: B) => C = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Identity`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: A, fb: B, fc: C) => D =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <B>(second: Identity<B>) => <A>(self: Identity<A>) => Identity<A> =
  /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <B>(second: Identity<B>) => <A>(self: Identity<A>) => Identity<B> =
  /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IdentityTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @since 3.0.0
 */
export const flatMapRec: <A, B>(f: (a: A) => Identity<Either<A, B>>) => (a: A) => B = flattenableRec.tailRec

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRec: flattenableRec.FlattenableRec<IdentityTypeLambda> = {
  flatMapRec
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IdentityTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => B = (f) => (wa) => f(wa)

/**
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>> = /*#__PURE__*/ extend(identity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Extendable: extendable.Extendable<IdentityTypeLambda> = {
  map,
  extend
}

/**
 * @since 3.0.0
 */
export const extract: <A>(wa: Identity<A>) => A = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<IdentityTypeLambda> = {
  map,
  extend,
  extract
}

/**
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(b, fa)

/**
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Identity<A>) => M = () => (f) => (fa) => f(fa)

/**
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => f(fa, b)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Identity<A>) => Kind<F, S, R, O, E, Identity<B>> =
  (F) => (f) =>
    flow(f, F.map(identity))

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<IdentityTypeLambda> = {
  traverse
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Identity<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Identity<A>> =
  /*#__PURE__*/ traversable.getDefaultSequence<IdentityTypeLambda>(traverse)

/**
 * @category combinators
 * @since 3.0.0
 */
export const combineK: <B>(second: LazyArg<Identity<B>>) => <A>(self: Identity<A>) => Identity<A | B> = () => identity

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<IdentityTypeLambda> = {
  combineK
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Identity<{}> = /*#__PURE__*/ of(_.Do)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Identity<A>) => { readonly [K in N]: A } =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } = /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Identity<B>
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Identity<B>
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ apply.bindPar(Apply)

/**
 * @category do notation
 * @since 3.0.0
 */
export const DoT: Identity<readonly []> = /*#__PURE__*/ of(_.DoT)

/**
 * @category do notation
 * @since 3.0.0
 */
export const tupled: <A>(self: Identity<A>) => readonly [A] = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTPar: <B>(fb: B) => <A extends ReadonlyArray<unknown>>(self: A) => readonly [...A, B] =
  /*#__PURE__*/ apply.bindTPar(Apply)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindT: <A extends ReadonlyArray<unknown>, B>(f: (a: A) => B) => (self: A) => readonly [...A, B] =
  /*#__PURE__*/ flattenable.bindT(Flattenable)
