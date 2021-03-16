/**
 * @since 3.0.0
 */
import { Applicative2 } from './Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { Endomorphism } from './Endomorphism'
import { FromState2 } from './FromState'
import { identity } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2, tupled as tupled_ } from './Functor'
import * as _ from './internal'
import { Monad2 } from './Monad'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed2 } from './Pointed'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface State<S, A> {
  (s: S): readonly [A, S]
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
export const get: <S>() => State<S, S> = () => (s) => [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S>(s: S) => State<S, void> = (s) => () => [undefined, s]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S>(f: Endomorphism<S>) => State<S, void> = (f) => (s) => [undefined, f(s)]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = (f) => (s) => [f(s), s]

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
export const map: Functor2<URI>['map'] = (f) => (fa) => (s1) => {
  const [a, s2] = fa(s1)
  return [f(a), s2]
}

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply2<URI>['ap'] = (fa) => (fab) => (s1) => {
  const [f, s2] = fab(s1)
  const [a, s3] = fa(s2)
  return [f(a), s3]
}

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed2<URI>['of'] = (a) => (s) => [a, s]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain2<URI>['chain'] = (f) => (ma) => (s1) => {
  const [a, s2] = ma(s1)
  return f(a)(s2)
}

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'State'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly State: State<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply2<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative2<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain2<URI> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad2<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: FromState2<URI> = {
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
export const evaluate = <S>(s: S) => <A>(ma: State<S, A>): A => ma(s)[0]

/**
 * Run a computation in the `State` monad discarding the result.
 *
 * @since 3.0.0
 */
export const execute = <S>(s: S) => <A>(ma: State<S, A>): S => ma(s)[1]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, S, B>(f: (index: number, a: A) => State<S, B>) => (
  as: ReadonlyNonEmptyArray<A>
): State<S, ReadonlyNonEmptyArray<B>> => (s) => {
  const [b, s2] = f(0, as[0])(s)
  const bs: NonEmptyArray<B> = [b]
  let out = s2
  for (let i = 1; i < as.length; i++) {
    const [b, s2] = f(i, as[i])(out)
    bs.push(b)
    out = s2
  }
  return [bs, out]
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, B>(
  f: (index: number, a: A) => State<S, B>
): ((as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray))
}
