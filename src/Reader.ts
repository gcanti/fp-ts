/**
 * @since 3.0.0
 */
import type { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import type { Category as Category_ } from './Category'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import type { Choice as Choice_ } from './Choice'
import { constant, flow, identity } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import type { Monad as Monad_ } from './Monad'
import type { Pointed as Pointed_ } from './Pointed'
import type { Profunctor as Profunctor_ } from './Profunctor'
import * as E from './Either'
import type { Strong as Strong_ } from './Strong'
import * as _ from './internal'
import type { FromReader as FromReader_ } from './FromReader'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { NonEmptyArray } from './NonEmptyArray'
import { HKT } from './HKT'

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

/**
 * Less strict version of [`asksReaderK`](#asksreaderk).
 *
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderW = <R1, R2, A>(f: (r1: R1) => Reader<R2, A>): Reader<R1 & R2, A> => (r) => f(r)(r)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReader: <R, A>(f: (r: R) => Reader<R, A>) => Reader<R, A> = asksReaderW

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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> = (f) => (fa) => flow(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B> = (fa) => (
  fab
) => (r) => fab(r)(fa(r))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown>(a: A) => Reader<R, A> = constant

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B> = (f) => (
  fa
) => (r) => f(fa(r))(r)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A> = /*#__PURE__*/ chain(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> = flattenW

/**
 * @category Semigroupoid
 * @since 3.0.0
 */
export const compose: <B, C>(bc: Reader<B, C>) => <A>(ab: Reader<A, B>) => Reader<A, C> = (bc) => (ab) => flow(ab, bc)

/**
 * @category Profunctor
 * @since 3.0.0
 */
export const promap: <Q, R, A, B>(f: (d: Q) => R, g: (a: A) => B) => (pea: Reader<R, A>) => Reader<Q, B> = (f, g) => (
  fea
) => (a) => g(fea(f(a)))

/**
 * @category Category
 * @since 3.0.0
 */
export const id: <A>() => Reader<A, A> = () => identity

/**
 * @category Choice
 * @since 3.0.0
 */
export const left: <A, B, C>(pab: Reader<A, B>) => Reader<E.Either<A, C>, E.Either<B, C>> = (pab) =>
  E.match((a) => _.left(pab(a)), _.right)

/**
 * @category Choice
 * @since 3.0.0
 */
export const right: <B, C, A>(pbc: Reader<B, C>) => Reader<E.Either<A, B>, E.Either<A, C>> = (pbc) =>
  E.match(_.left, (b) => _.right(pbc(b)))

/**
 * @category Strong
 * @since 3.0.0
 */
export const first: <A, B, C>(pab: Reader<A, B>) => Reader<readonly [A, C], readonly [B, C]> = (pab) => ([a, c]) => [
  pab(a),
  c
]

/**
 * @category Strong
 * @since 3.0.0
 */
export const second: <B, C, A>(pab: Reader<B, C>) => Reader<readonly [A, B], readonly [A, C]> = (pbc) => ([a, b]) => [
  a,
  pbc(b)
]

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface ReaderF extends HKT {
  readonly type: Reader<this['Contravariant1'], this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader_<ReaderF> = {
  fromReader: identity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<ReaderF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<ReaderF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply_<ReaderF> = {
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
export const apFirst: <R, B>(second: Reader<R, B>) => <A>(first: Reader<R, A>) => Reader<R, A> = /*#__PURE__*/ apFirst_(
  Apply
)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirstW: <R2, B>(
  second: Reader<R2, B>
) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, A> = apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <R, B>(
  second: Reader<R, B>
) => <A>(first: Reader<R, A>) => Reader<R, B> = /*#__PURE__*/ apSecond_(Apply)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecondW: <R2, B>(
  second: Reader<R2, B>
) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, B> = apSecond as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<ReaderF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<ReaderF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<ReaderF> = {
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
export const chainFirst: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (first: Reader<R, A>) => Reader<R, A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Profunctor: Profunctor_<ReaderF> = {
  map,
  promap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Category: Category_<ReaderF> = {
  compose,
  id
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Choice: Choice_<ReaderF> = {
  map,
  promap,
  left,
  right
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Strong: Strong_<ReaderF> = {
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
export const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: Reader<R, A>) => Reader<R, { readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Reader<R, B>
) => (
  ma: Reader<R, A>
) => Reader<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Reader<R2, B>
) => <R1>(
  fa: Reader<R1, A>
) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Reader<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R, B>
) => (
  fa: Reader<R, A>
) => Reader<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(Apply)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(
  fa: Reader<R1, A>
) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Reader<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <R, A>(fa: Reader<R, A>) => Reader<R, readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <R, B>(
  fb: Reader<R, B>
) => <A extends ReadonlyArray<unknown>>(fas: Reader<R, A>) => Reader<R, readonly [...A, B]> = /*#__PURE__*/ apT_(Apply)

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
