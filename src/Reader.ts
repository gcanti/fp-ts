/**
 * @since 3.0.0
 */
import type { Applicative2 } from './Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import type { Category2 } from './Category'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import type { Choice2 } from './Choice'
import { constant, flow, identity } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2, tupled as tupled_ } from './Functor'
import type { Monad2 } from './Monad'
import type { Pointed2 } from './Pointed'
import type { Profunctor2 } from './Profunctor'
import type { Semigroupoid2 } from './Semigroupoid'
import * as E from './Either'
import type { Strong2 } from './Strong'
import * as _ from './internal'
import type { FromReader2 } from './FromReader'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { NonEmptyArray } from './NonEmptyArray'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => Reader<R, R> = () => identity

/**
 * Projects a value from the global context in a `Reader`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = identity

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 3.0.0
 */
export const local = <R2, R1>(f: (r2: R2) => R1) => <A>(ma: Reader<R1, A>): Reader<R2, A> => (r2) => ma(f(r2))

/**
 * Less strict version of [`asksE`](#askse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const asksEW = <R1, R2, A>(f: (r1: R1) => Reader<R2, A>): Reader<R1 & R2, A> => (r) => f(r)(r)

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 3.0.0
 */
export const asksE: <R, A>(f: (r: R) => Reader<R, A>) => Reader<R, A> = asksEW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => (fa) => flow(fa, f)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B> = (fa) => (
  fab
) => (r) => fab(r)(fa(r))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply2<URI>['ap'] = apW

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed2<URI>['of'] = constant

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B> = (f) => (
  fa
) => (r) => f(fa(r))(r)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain2<URI>['chain'] = chainW

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Semigroupoid
 * @since 3.0.0
 */
export const compose: Semigroupoid2<URI>['compose'] = (bc) => (ab) => flow(ab, bc)

/**
 * @category Profunctor
 * @since 3.0.0
 */
export const promap: Profunctor2<URI>['promap'] = (f, g) => (fea) => (a) => g(fea(f(a)))

/**
 * @category Category
 * @since 3.0.0
 */
export const id: Category2<URI>['id'] = () => identity

/**
 * @category Choice
 * @since 3.0.0
 */
export const left: Choice2<URI>['left'] = (pab) => E.match((a) => _.left(pab(a)), _.right)

/**
 * @category Choice
 * @since 3.0.0
 */
export const right: Choice2<URI>['right'] = (pbc) => E.match(_.left, (b) => _.right(pbc(b)))

/**
 * @category Strong
 * @since 3.0.0
 */
export const first: Strong2<URI>['first'] = (pab) => ([a, c]) => [pab(a), c]

/**
 * @category Strong
 * @since 3.0.0
 */
export const second: Strong2<URI>['second'] = (pbc) => ([a, b]) => [a, pbc(b)]

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Reader'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Reader: Reader<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader2<URI> = {
  fromReader: identity
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
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <R2, A, B>(
  f: (a: A) => Reader<R2, B>
) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Profunctor: Profunctor2<URI> = {
  map,
  promap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Category: Category2<URI> = {
  compose,
  id
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Choice: Choice2<URI> = {
  map,
  promap,
  left,
  right
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Strong: Strong2<URI> = {
  map,
  promap,
  first,
  second
}

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

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Reader<unknown, {}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Reader<unknown, readonly []> = of(_.emptyReadonlyArray)

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

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <R2, B>(
  fb: Reader<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(fas: Reader<R1, A>) => Reader<R1 & R2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(f: (index: number, a: A) => Reader<R, B>) => (
  as: ReadonlyNonEmptyArray<A>
): Reader<R, ReadonlyNonEmptyArray<B>> => (r) => {
  const out: NonEmptyArray<B> = [f(0, _.head(as))(r)]
  for (let i = 1; i < as.length; i++) {
    out.push(f(i, as[i])(r))
  }
  return out
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
): ((as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
