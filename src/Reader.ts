/**
 * The `Reader` monad (also called the Environment monad). Represents a computation, which can read values from a shared environment,
 * pass values from function to function, and execute sub-computations in a modified environment.
 * Using `Reader` monad for such computations is often clearer and easier than using the `State` monad.
 *
 * In this example the `Reader` monad provides access to variable bindings. `Bindings` are a map of `number` variables.
 * The variable count contains number of variables in the bindings. You can see how to run a `Reader` monad and retrieve
 * data from it, how to access the `Reader` data with `ask` and `asks`.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 * import * as R from 'fp-ts/Reader'
 * import * as RR from 'fp-ts/ReadonlyRecord'
 *
 * interface Bindings extends RR.ReadonlyRecord<string, number> {}
 *
 * // The Reader monad, which implements this complicated check.
 * const isCountCorrect: R.Reader<Bindings, boolean> = pipe(
 *   R.Do,
 *   R.bind('count', () => R.asks(lookupVar('count'))),
 *   R.bind('bindings', () => R.ask()),
 *   R.map(({ count, bindings }) => count === RR.size(bindings))
 * )
 *
 * // The selector function to use with 'asks'.
 * // Returns value of the variable with specified name.
 * const lookupVar = (name: string) => (bindings: Bindings): number =>
 *   pipe(
 *     bindings,
 *     RR.lookup(name),
 *     O.getOrElse(() => 0)
 *   )
 *
 * const sampleBindings: Bindings = { count: 3, a: 1, b: 2 }
 *
 * assert.deepStrictEqual(isCountCorrect(sampleBindings), true)
 *
 * @since 2.0.0
 */
import { Applicative2, getApplicativeMonoid } from './Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_, getApplySemigroup } from './Apply'
import { Category2 } from './Category'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { Choice2 } from './Choice'
import * as E from './Either'
import { constant, flow, identity, pipe } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import { Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed2 } from './Pointed'
import { Profunctor2 } from './Profunctor'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { Strong2 } from './Strong'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R>() => Reader<R, R> = () => identity

/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = identity

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as R from 'fp-ts/Reader'
 * import * as string from 'fp-ts/string'
 *
 * const calculateContentLen: R.Reader<string, number> = pipe(
 *   R.Do,
 *   R.bind('content', () => R.ask<string>()),
 *   R.map(({ content }) => string.size(content))
 * )
 *
 * // Calls calculateContentLen after adding a prefix to the Reader content.
 * const calculateModifiedContentLen: R.Reader<string, number> = pipe(
 *   calculateContentLen,
 *   R.local((s) => 'Prefix ' + s)
 * )
 *
 * const s = '12345'
 *
 * assert.deepStrictEqual(
 *   "Modified 's' length: " + calculateModifiedContentLen(s) + '\n' + "Original 's' length: " + calculateContentLen(s),
 *   "Modified 's' length: 12\nOriginal 's' length: 5"
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: Reader<R1, A>) => Reader<R2, A> = (f) => (ma) => (r2) =>
  ma(f(r2))

/**
 * Less strict version of [`asksReader`](#asksreader).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category combinators
 * @since 2.11.0
 */
export const asksReaderW =
  <R1, R2, A>(f: (r1: R1) => Reader<R2, A>): Reader<R1 & R2, A> =>
  (r) =>
    f(r)(r)

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 2.11.0
 */
export const asksReader: <R, A>(f: (r: R) => Reader<R, A>) => Reader<R, A> = asksReaderW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
const _compose: Category2<URI>['compose'] = (bc, ab) => pipe(bc, compose(ab))
const _promap: Profunctor2<URI>['promap'] = (fea, f, g) => pipe(fea, promap(f, g))

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
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> = (f) => (fa) => (r) => f(fa(r))

/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B> =
  (fa) => (fab) => (r) =>
    fab(r)(fa(r))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> = apW

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of: <R = unknown, A = never>(a: A) => Reader<R, A> = constant

/**
 * Less strict version of [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R2, A, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B> =
  (f) => (fa) => (r) =>
    f(fa(r))(r)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B> = chainW

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category combinators
 * @since 2.11.0
 */
export const flattenW: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A> =
  /*#__PURE__*/ chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A> = flattenW

/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C> = (ab) => (bc) => flow(ab, bc)

/**
 * @category Profunctor
 * @since 2.0.0
 */
export const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fea: Reader<E, A>) => Reader<D, B> =
  (f, g) => (fea) => (a) =>
    g(fea(f(a)))

/**
 * @category Category
 * @since 2.0.0
 */
export const id: Category2<URI>['id'] = () => identity

/**
 * @category Strong
 * @since 2.10.0
 */
export const first: Strong2<URI>['first'] =
  (pab) =>
  ([a, c]) =>
    [pab(a), c]

/**
 * @category Strong
 * @since 2.10.0
 */
export const second: Strong2<URI>['second'] =
  (pbc) =>
  ([a, b]) =>
    [a, pbc(b)]

/**
 * @category Choice
 * @since 2.10.0
 */
export const left: Choice2<URI>['left'] = (pab) => E.fold((a) => _.left(pab(a)), E.right)

/**
 * @category Choice
 * @since 2.10.0
 */
export const right: Choice2<URI>['right'] = (pbc) => E.fold(E.left, (b) => _.right(pbc(b)))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Reader'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Reader<E, A>
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
 * Less strict version of [`apFirst`](#apfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apFirstW: <R2, B>(second: Reader<R2, B>) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, A> =
  apFirst as any

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
 * Less strict version of [`apSecond`](#apsecond).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apSecondW: <R2, B>(second: Reader<R2, B>) => <R1, A>(first: Reader<R1, A>) => Reader<R1 & R2, B> =
  apSecond as any

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
  of,
  ap: _ap,
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
export const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (first: Reader<R, A>) => Reader<R, A> =
  /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.11.0
 */
export const chainFirstW: <R2, A, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, A> =
  chainFirst as any

/**
 * @category instances
 * @since 2.7.0
 */
export const Profunctor: Profunctor2<URI> = {
  URI,
  map: _map,
  promap: _promap
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Category: Category2<URI> = {
  URI,
  compose: _compose,
  id
}

/**
 * @category instances
 * @since 2.8.3
 */
export const Strong: Strong2<URI> = {
  URI,
  map: _map,
  promap: _promap,
  first,
  second
}

/**
 * @category instances
 * @since 2.8.3
 */
export const Choice: Choice2<URI> = {
  URI,
  map: _map,
  promap: _promap,
  left,
  right
}

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

/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.8.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: Reader<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.8.0
 */
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const ApT: Reader<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, R, B>(f: (index: number, a: A) => Reader<R, B>) =>
  (as: ReadonlyNonEmptyArray<A>): Reader<R, ReadonlyNonEmptyArray<B>> =>
  (r) => {
    const out: NonEmptyArray<B> = [f(0, _.head(as))(r)]
    for (let i = 1; i < as.length; i++) {
      out.push(f(i, as[i])(r))
    }
    return out
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
): ((as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * @since 2.9.0
 */
export const traverseArray = <R, A, B>(
  f: (a: A) => Reader<R, B>
): ((as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<Reader<R, A>>) => Reader<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `R.Functor` instead of `R.reader`
 * (where `R` is from `import R from 'fp-ts/Reader'`)
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  promap: _promap,
  compose: _compose,
  id,
  first,
  second,
  left,
  right
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup: <R, A>(S: Semigroup<A>) => Semigroup<Reader<R, A>> = /*#__PURE__*/ getApplySemigroup(Apply)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getMonoid: <R, A>(M: Monoid<A>) => Monoid<Reader<R, A>> = /*#__PURE__*/ getApplicativeMonoid(Applicative)
