/**
 * ```ts
 * export type Identity<A> = A
 * ```
 *
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import type * as alt from './Alt'
import * as apply from './Apply'
import type * as applicative from './Applicative'
import * as flattenable from './Flattenable'
import * as flattenableRec from './FlattenableRec'
import type * as comonad from './Comonad'
import type { Result } from './Result'
import type { Eq } from './Eq'
import type { Monoid } from './Monoid'
import type * as extendable from './Extendable'
import * as iterable from './Iterable'
import type * as foldable from './Foldable'
import { flow, identity } from './Function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import * as fromIdentity from './FromIdentity'
import type { Show } from './Show'
import * as traversable from './Traversable'

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
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
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
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Identity<(a: A) => B>) => B = /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <A>(self: Identity<A>) => Identity<B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <A>(self: A) => Identity<void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => Identity<A> = identity

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<IdentityTypeLambda> = {
  of
}

/**
 * @category sequencing
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
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(bfc: (b: B) => Identity<C>) => <A>(afb: (a: A) => Identity<B>) => (a: A) => C =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<IdentityTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Identity<A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<IdentityTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (that: Identity<unknown>) => <A>(self: Identity<A>) => Identity<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Identity<A>) => (self: Identity<unknown>) => Identity<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
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
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: A, fb: B) => C = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Identity`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: A, fb: B, fc: C) => D =
  /*#__PURE__*/ apply.lift3(Apply)

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
 * @since 3.0.0
 */
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapRec: <A, B>(f: (a: A) => Identity<Result<A, B>>) => (a: A) => B = flattenableRec.tailRec

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
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => B = (f) => (wa) => f(wa)

/**
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
 * @category conversions
 * @since 3.0.0
 */
export const toIterable: <A>(self: Identity<A>) => Iterable<A> = iterable.of

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = {
  toIterable
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Identity<A>): B =>
    f(b, self)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <M>(_: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
  (self: Identity<A>): M =>
    f(self)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  (self: Identity<A>): B =>
    f(self, b)

/**
 * @category traversing
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
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Identity<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Identity<A>> =
  /*#__PURE__*/ traversable.sequence(Traversable)

/**
 * @since 3.0.0
 */
export const orElse: <B>(that: Identity<B>) => <A>(self: Identity<A>) => Identity<A | B> = () => identity

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<IdentityTypeLambda> = {
  orElse
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Identity<{}> = /*#__PURE__*/ of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Identity<A>) => { readonly [K in N]: A } =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
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
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Identity<B>
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Identity<B>
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Identity<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Identity<A>) => readonly [A] = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(fb: B) => <A extends ReadonlyArray<unknown>>(self: A) => readonly [...A, B] =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: B, f: (a: A, b: B) => C) => (self: A) => C = /*#__PURE__*/ apply.zipWith(Apply)
