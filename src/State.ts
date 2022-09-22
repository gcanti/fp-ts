/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import type { Endomorphism } from './Endomorphism'
import type { FromState as FromState_ } from './FromState'
import { identity } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type * as pointed from './Pointed'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface State<S, A> {
  (s: S): readonly [S, A]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get =
  <S>(): State<S, S> =>
  (s) =>
    [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put =
  <S>(s: S): State<S, void> =>
  () =>
    [s, undefined]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify =
  <S>(f: Endomorphism<S>): State<S, void> =>
  (s) =>
    [f(s), undefined]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets =
  <S, A>(f: (s: S) => A): State<S, A> =>
  (s) =>
    [s, f(s)]

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  <S>(self: State<S, A>): State<S, B> =>
  (s1) => {
    const [s2, a] = self(s1)
    return [s2, f(a)]
  }

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap =
  <S, A>(fa: State<S, A>) =>
  <B>(self: State<S, (a: A) => B>): State<S, B> =>
  (s1) => {
    const [s2, f] = self(s1)
    const [s3, a] = fa(s2)
    return [s3, f(a)]
  }

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of =
  <A, S>(a: A): State<S, A> =>
  (s) =>
    [s, a]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap =
  <A, S, B>(f: (a: A) => State<S, B>) =>
  (self: State<S, A>): State<S, B> =>
  (s1) => {
    const [s2, a] = self(s1)
    return f(a)(s2)
  }

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <S, A>(mma: State<S, State<S, A>>) => State<S, A> = /*#__PURE__*/ flatMap(identity)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface StateF extends HKT {
  readonly type: State<this['Invariant1'], this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StateF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(fab: State<S, (a: A) => B>) => State<S, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<StateF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<StateF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <S, B>(second: State<S, B>) => <A>(self: State<S, A>) => State<S, A> =
  /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <S, B>(second: State<S, B>) => <A>(self: State<S, A>) => State<S, B> =
  /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<StateF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<StateF> = {
  map,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<StateF> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: FromState_<StateF> = {
  fromState: identity
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `State` monad, discarding the final state.
 *
 * @since 3.0.0
 */
export const evaluate =
  <S>(s: S) =>
  <A>(ma: State<S, A>): A =>
    ma(s)[1]

/**
 * Run a computation in the `State` monad discarding the result.
 *
 * @since 3.0.0
 */
export const execute =
  <S>(s: S) =>
  <A>(ma: State<S, A>): S =>
    ma(s)[0]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <S, A>(fa: State<S, A>) => State<S, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S>(fa: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (ma: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (fa: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled: <S, A>(fa: State<S, A>) => State<S, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <S, B>(
  fb: State<S, B>
) => <A extends ReadonlyArray<unknown>>(fas: State<S, A>) => State<S, readonly [...A, B]> =
  /*#__PURE__*/ apply.apT(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, S, B>(f: (index: number, a: A) => State<S, B>) =>
  (as: ReadonlyNonEmptyArray<A>): State<S, ReadonlyNonEmptyArray<B>> => {
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
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, B>(f: (index: number, a: A) => State<S, B>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as: ReadonlyArray<A>): State<S, ReadonlyArray<B>> => {
    return _.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray)
  }
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, S, B>(
  f: (a: A) => State<S, B>
): ((as: ReadonlyNonEmptyArray<A>) => State<S, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, S, B>(
  f: (a: A) => State<S, B>
): ((as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
