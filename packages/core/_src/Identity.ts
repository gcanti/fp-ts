/**
 * ```ts
 * export type Identity<A> = A
 * ```
 *
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type * as comonad from '@fp-ts/core/Comonad'
import type { Eq } from '@fp-ts/core/Eq'
import type * as extendable from '@fp-ts/core/Extendable'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as flattenableRec from '@fp-ts/core/FlattenableRec'
import * as foldable from '@fp-ts/core/Foldable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import { flow, identity } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { Result } from '@fp-ts/core/Result'
import type { Show } from '@fp-ts/core/Show'
import * as traversable from '@fp-ts/core/Traversable'

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
export const flap: <A>(a: A) => <B>(fab: Identity<(a: A) => B>) => B = functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <A>(self: Identity<A>) => Identity<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <A>(self: A) => Identity<void> = functor.unit(Functor)

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
  flattenable.composeKleisli(Flattenable)

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
export const idKleisli: <A>() => (a: A) => Identity<A> = fromIdentity.idKleisli(FromIdentity)

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
export const zipLeft: (that: Identity<unknown>) => <A>(self: Identity<A>) => Identity<A> = flattenable
  .zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Identity<A>) => (self: Identity<unknown>) => Identity<A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = flattenable.ap(
  Flattenable
)

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
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: A, fb: B) => C = apply.lift2(Apply)

/**
 * Lifts a ternary function into `Identity`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: A, fb: B, fc: C) => D = apply.lift3(
  Apply
)

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
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = flatMap(identity)

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
export const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>> = extend(identity)

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
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: Identity<A>) => B = foldable.reduce(
  Foldable
)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: Identity<A>) => M = foldable
  .foldMap(Foldable)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (self: Identity<A>) => B = foldable
  .reduceRight(Foldable)

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Identity<A>) => Kind<F, S, R, O, E, Identity<B>> =
  (F) => (f) => flow(f, F.map(identity))

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
) => <S, R, O, E, A>(fas: Identity<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Identity<A>> = traversable.sequence(
  Traversable
)

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
export const Do: Identity<{}> = of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Identity<A>) => { readonly [K in N]: A } = functor.bindTo(
  Functor
)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } = functor.let(Functor)

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
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Identity<B>
) => (self: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Identity<readonly []> = of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Identity<A>) => readonly [A] = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(fb: B) => <A extends ReadonlyArray<unknown>>(self: A) => readonly [...A, B] = apply
  .zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: B, f: (a: A, b: B) => C) => (self: A) => C = apply.zipWith(Apply)
