/**
 * @since 3.0.0
 */
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import type { FromState as FromState_ } from '@fp-ts/core/FromState'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'

/**
 * @category model
 * @since 3.0.0
 */
export interface State<S, A> {
  (s: S): readonly [S, A]
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface StateTypeLambda extends TypeLambda {
  readonly type: State<this['InOut1'], this['Out1']>
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get = <S>(): State<S, S> => (s) => [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put = <S>(s: S): State<S, void> => () => [s, undefined]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify = <S>(f: Endomorphism<S>): State<S, void> => (s) => [f(s), undefined]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets = <S, A>(f: (s: S) => A): State<S, A> => (s) => [s, f(s)]

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  <S>(self: State<S, A>): State<S, B> =>
    (s1) => {
      const [s2, a] = self(s1)
      return [s2, f(a)]
    }

/**
 * @since 3.0.0
 */
export const of = <A, S>(a: A): State<S, A> => (s) => [s, a]

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<StateTypeLambda> = {
  of
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, S, B>(f: (a: A) => State<S, B>) => (self: State<S, A>) => State<S, B> = (f) =>
  (self) =>
    (s1) => {
      const [s2, a] = self(s1)
      return f(a)(s2)
    }

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<StateTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, S, C>(
  bfc: (b: B) => State<S, C>
) => <A>(afb: (a: A) => State<S, B>) => (a: A) => State<S, C> = flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<StateTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => <S>(a: A) => State<S, A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<StateTypeLambda> = {
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
export const zipLeft: <S>(that: State<S, unknown>) => <A>(self: State<S, A>) => State<S, A> = flattenable
  .zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <S, A>(that: State<S, A>) => (self: State<S, unknown>) => State<S, A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <S, A>(fa: State<S, A>) => <B>(self: State<S, (a: A) => B>) => State<S, B> = flattenable
  .ap(Flattenable)

/**
 * @since 3.0.0
 */
export const unit = <S>(): State<S, void> => of(undefined)

/**
 * @since 3.0.0
 */
export const flatten: <S, A>(mma: State<S, State<S, A>>) => State<S, A> = flatMap(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StateTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(fab: State<S, (a: A) => B>) => State<S, B> = functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<StateTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `State`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => <S>(fa: State<S, A>, fb: State<S, B>) => State<S, C> = apply
  .lift2(Apply)

/**
 * Lifts a ternary function into `State`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S>(fa: State<S, A>, fb: State<S, B>, fc: State<S, C>) => State<S, D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<StateTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<StateTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: FromState_<StateTypeLambda> = {
  fromState: identity
}

/**
 * Run a computation in the `State` monad, discarding the final state.
 *
 * @since 3.0.0
 */
export const evaluate = <S>(s: S) => <A>(ma: State<S, A>): A => ma(s)[1]

/**
 * Run a computation in the `State` monad discarding the result.
 *
 * @since 3.0.0
 */
export const execute = <S>(s: S) => <A>(self: State<S, A>): S => self(s)[0]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <S, A>(self: State<S, A>) => State<S, { readonly [K in N]: A }> =
  functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S>(self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
  Functor
)

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
export const bind: <N extends string, A extends object, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable.bind(
  Flattenable
)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply.bindRight(
  Apply
)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <S, A>(self: State<S, A>) => State<S, readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <S, B>(
  fb: State<S, B>
) => <A extends ReadonlyArray<unknown>>(self: State<S, A>) => State<S, readonly [...A, B]> = apply
  .zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <S, B, A, C>(that: State<S, B>, f: (a: A, b: B) => C) => (self: State<S, A>) => State<S, C> =
  apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, S, B>(f: (index: number, a: A) => State<S, B>) =>
  (as: NonEmptyReadonlyArray<A>): State<S, NonEmptyReadonlyArray<B>> => {
    return (s) => {
      const [s2, b] = f(0, _.head(as))(s)
      const bs: _.NonEmptyArray<B> = [b]
      let out = s2
      for (let i = 1; i < as.length; i++) {
        const [s2, b] = f(i, as[i])(out)
        bs.push(b)
        out = s2
      }
      return [out, bs]
    }
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, B>(f: (index: number, a: A) => State<S, B>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as: ReadonlyArray<A>): State<S, ReadonlyArray<B>> => {
    return _.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray)
  }
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, S, B>(
  f: (a: A) => State<S, B>
): ((as: NonEmptyReadonlyArray<A>) => State<S, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, S, B>(
  f: (a: A) => State<S, B>
): ((as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
