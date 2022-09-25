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
import type { HKT, Kind } from './HKT'
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
export interface Identityλ extends HKT {
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
export const Functor: functor.Functor<Identityλ> = {
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
export const Pointed: pointed.Pointed<Identityλ> = {
  of
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = (fa) => (fab) => fab(fa)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<Identityλ> = {
  map,
  ap
}

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
export const Applicative: applicative.Applicative<Identityλ> = {
  map,
  ap,
  of
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<B> = (f) => (ma) => f(ma)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<Identityλ> = {
  map,
  flatMap
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
export const FlattenableRec: flattenableRec.FlattenableRec<Identityλ> = {
  flatMapRec
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<Identityλ> = {
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
export const Extendable: extendable.Extendable<Identityλ> = {
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
export const Comonad: comonad.Comonad<Identityλ> = {
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
export const Foldable: foldable.Foldable<Identityλ> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const traverse: <F extends HKT>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B>(f: (a: A) => Kind<F, S, R, W, E, B>) => (ta: Identity<A>) => Kind<F, S, R, W, E, Identity<B>> =
  (F) => (f) =>
    flow(f, F.map(identity))

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<Identityλ> = {
  traverse
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const sequence: <F extends HKT>(
  F: applicative.Applicative<F>
) => <S, R, W, E, A>(fas: Identity<Kind<F, S, R, W, E, A>>) => Kind<F, S, R, W, E, Identity<A>> =
  /*#__PURE__*/ traversable.sequence<Identityλ>(Traversable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const combineK: <B>(second: LazyArg<Identity<B>>) => <A>(self: Identity<A>) => Identity<A | B> = () => identity

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<Identityλ> = {
  combineK
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Identity<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(fa: Identity<A>) => { readonly [K in N]: A } =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } = /*#__PURE__*/ functor.let(Functor)

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
) => (ma: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Identity<B>
) => (fa: Identity<A>) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B } =
  /*#__PURE__*/ apply.bindPar(Apply)

/**
 * @category do notation
 * @since 3.0.0
 */
export const ApT: Identity<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @category do notation
 * @since 3.0.0
 */
export const tupled: <A>(fa: Identity<A>) => readonly [A] = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category do notation
 * @since 3.0.0
 */
export const apT: <B>(fb: B) => <A extends ReadonlyArray<unknown>>(fas: A) => readonly [...A, B] =
  /*#__PURE__*/ apply.apT(Apply)
