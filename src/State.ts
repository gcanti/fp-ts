/**
 * @since 2.0.0
 */
import { Applicative2 } from './Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { FromState2 } from './FromState'
import { identity, pipe } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed2 } from './Pointed'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = () => (s) => [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export const put: <S>(s: S) => State<S, void> = (s) => () => [undefined, s]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = (f) => (s) => [undefined, f(s)]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = (f) => (s) => [f(s), s]

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (f) => (fa) => (s1) => {
  const [a, s2] = fa(s1)
  return [f(a), s2]
}

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B> = (fa) => (fab) => (s1) => {
  const [f, s2] = fab(s1)
  const [a, s3] = fa(s2)
  return [f(a), s3]
}

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of: <S, A>(a: A) => State<S, A> = (a) => (s) => [a, s]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B> = (f) => (ma) => (s1) => {
  const [a, s2] = ma(s1)
  return f(a)(s2)
}

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> = /*#__PURE__*/ chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'State'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: State<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <S, A, B>(f: (a: A) => State<S, B>) => (ma: State<S, A>) => State<S, A> =
  /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 2.11.0
 */
export const FromState: FromState2<URI> = {
  URI,
  fromState: identity
}
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.8.0
 */
export const evaluate =
  <S>(s: S) =>
  <A>(ma: State<S, A>): A =>
    ma(s)[0]

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.8.0
 */
export const execute =
  <S>(s: S) =>
  <A>(ma: State<S, A>): S =>
    ma(s)[1]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @since 2.8.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, S, B>(f: (index: number, a: A) => State<S, B>) =>
  (as: ReadonlyNonEmptyArray<A>): State<S, ReadonlyNonEmptyArray<B>> =>
  (s) => {
    const [b, s2] = f(0, _.head(as))(s)
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
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, B>(
  f: (index: number, a: A) => State<S, B>
): ((as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray))
}

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * @since 2.9.0
 */
export const traverseArray = <A, S, B>(
  f: (a: A) => State<S, B>
): ((as: ReadonlyArray<A>) => State<S, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`evaluate`](#evaluate) instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const evalState: <S, A>(ma: State<S, A>, s: S) => A = (ma, s) => ma(s)[0]

/**
 * Use [`execute`](#execute) instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const execState: <S, A>(ma: State<S, A>, s: S) => S = (ma, s) => ma(s)[1]

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `S.Functor` instead of `S.state`
 * (where `S` is from `import S from 'fp-ts/State'`)
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const state: Monad2<URI> = Monad
