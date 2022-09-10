/**
 * @since 3.0.0
 */
import type { Applicative3C } from './Applicative'
import type { Apply2, Apply3C } from './Apply'
import type { Bifunctor3 } from './Bifunctor'
import type { Chain3C } from './Chain'
import type { FromIO3C } from './FromIO'
import type { FromReader3C } from './FromReader'
import type { FromTask3C } from './FromTask'
import { FromWriter3, fromWriterK as fromWriterK_ } from './FromWriter'
import { flow } from './function'
import { bindTo as bindTo_, flap as flap_, Functor3, tupled as tupled_ } from './Functor'
import type { IO } from './IO'
import type { Monad3C } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed3C } from './Pointed'
import type { Reader } from './Reader'
import * as R from './Reader'
import * as RT from './ReaderTask'
import type { Semigroup } from './Semigroup'
import type { Task } from './Task'
import * as T from './Task'
import type { Writer } from './Writer'
import * as WT from './WriterT'

import ReaderTask = RT.ReaderTask

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTaskWriter<R, W, A> extends Reader<R, Task<Writer<W, A>>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader = <W>(w: W) => <R, A>(fa: Reader<R, A>): ReaderTaskWriter<R, W, A> =>
  fromReaderTask(w)(RT.fromReader(fa))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderTask: <W>(
  w: W
) => <R, A>(a: ReaderTask<R, A>) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ WT.fromF(RT.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTaskWriter: <W, A, R>(a: Task<Writer<W, A>>) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ R.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: <W>(w: W) => <A, R>(fa: IO<A>) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ WT.fromIO(
  RT.Functor,
  RT.FromIO
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: <W>(w: W) => <A, R>(fa: Task<A>) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ WT.fromTask(
  RT.Functor,
  RT.FromTask
)

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell: <W, R>(w: W) => ReaderTaskWriter<R, W, void> = /*#__PURE__*/ WT.tell(RT.Pointed)

/**
 * Less strict version of [`asksReaderTaskWriter`](#asksreadertaskwriter).
 *
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskWriterW: <R1, R2, W, A>(
  f: (r1: R1) => ReaderTaskWriter<R2, W, A>
) => ReaderTaskWriter<R1 & R2, W, A> = R.asksReaderW

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskWriter: <R, W, A>(
  f: (r: R) => ReaderTaskWriter<R, W, A>
) => ReaderTaskWriter<R, W, A> = asksReaderTaskWriterW

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromWriter = <W, A, R>(w: Writer<W, A>): ReaderTaskWriter<R, W, A> => RT.of(w)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReaderWriter = <R, W, A>(fa: Reader<R, Writer<W, A>>): ReaderTaskWriter<R, W, A> => flow(fa, T.of)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const fst: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTask<R, A> = /*#__PURE__*/ WT.fst(RT.Functor)

/**
 * @since 3.0.0
 */
export const snd: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTask<R, W> = /*#__PURE__*/ WT.snd(RT.Functor)

/**
 * Alias of [`fst`](#fst).
 *
 * @since 3.0.0
 */
export const evaluate = fst

/**
 * Alias of [`snd`](#snd).
 *
 * @since 3.0.0
 */
export const execute = snd

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
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <W, A>(ma: ReaderTaskWriter<R1, W, A>) => ReaderTaskWriter<R2, W, A> = R.local

/**
 * @since 3.0.0
 */
export const swap: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, A, W> = /*#__PURE__*/ WT.swap(
  RT.Functor
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskWriterK = <A extends ReadonlyArray<unknown>, W, B>(
  f: (...a: A) => Task<Writer<W, B>>
): (<R>(...a: A) => ReaderTaskWriter<R, W, B>) => (...a) => fromTaskWriter(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderWriterK = <A extends ReadonlyArray<unknown>, R, W, B>(
  f: (...a: A) => Reader<R, Writer<W, B>>
): ((...a: A) => ReaderTaskWriter<R, W, B>) => flow(f, fromReaderWriter)

/**
 * @since 3.0.0
 */
export const listen: <R, W, A>(
  fwa: ReaderTaskWriter<R, W, A>
) => ReaderTaskWriter<R, W, readonly [A, W]> = /*#__PURE__*/ WT.listen(RT.Functor)

/**
 * @since 3.0.0
 */
export const pass: <R, W, A>(
  fwa: ReaderTaskWriter<R, W, readonly [A, (w: W) => W]>
) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ WT.pass(RT.Functor)

/**
 * @since 3.0.0
 */
export const listens: <W, B>(
  f: (w: W) => B
) => <R, A>(fwa: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, readonly [A, B]> = /*#__PURE__*/ WT.listens(
  RT.Functor
)

/**
 * @since 3.0.0
 */
export const censor: <W>(
  f: (w: W) => W
) => <R, A>(fwa: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, A> = /*#__PURE__*/ WT.censor(RT.Functor)

// -------------------------------------------------------------------------------------
// type class operations
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const map: Functor3<URI>['map'] = /*#__PURE__*/ WT.map(RT.Functor)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft: Bifunctor3<URI>['mapLeft'] = /*#__PURE__*/ WT.mapLeft(RT.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const bimap: Bifunctor3<URI>['bimap'] = /*#__PURE__*/ WT.bimap(RT.Functor)

/**
 * Maps a function over the first component of a `Writer`.
 *
 * Alias of [`map`](#map)
 *
 * @since 3.0.0
 */
export const mapFst: Functor3<URI>['map'] = map

/**
 * Maps a function over the second component of a `Writer`.
 *
 * Alias of [`mapLeft`](#mapleft)
 *
 * @since 3.0.0
 */
export const mapSnd: Bifunctor3<URI>['mapLeft'] = mapLeft

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReaderTaskWriter'

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderTaskWriter: ReaderTaskWriter<R, E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  bimap,
  mapLeft: mapSnd
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor3<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed3C<URI, W> => ({
  of: WT.of(RT.Pointed, M)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(A: Apply2<RT.URI>, S: Semigroup<W>): Apply3C<URI, W> => ({
  map,
  ap: WT.ap(A, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(A: Apply2<RT.URI>, M: Monoid<W>): Applicative3C<URI, W> => {
  const { ap } = getApply(A, M)
  const P = getPointed(M)
  return {
    map,
    ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <W>(S: Semigroup<W>): Chain3C<URI, W> => {
  return {
    map,
    chain: WT.chain(RT.Chain, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad3C<URI, W> => {
  const P = getPointed(M)
  const C = getChain(M)
  return {
    map,
    of: P.of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromWriter: FromWriter3<URI> = {
  fromWriter
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromWriterK = /*#__PURE__*/ fromWriterK_(FromWriter)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromReader = <W>(M: Monoid<W>): FromReader3C<URI, W> => ({
  fromReader: fromReader(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIO = <W>(M: Monoid<W>): FromIO3C<URI, W> => ({
  fromIO: fromIO(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromTask = <W>(M: Monoid<W>): FromTask3C<URI, W> => ({
  fromIO: fromIO(M.empty),
  fromTask: fromTask(M.empty)
})

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// TODO

// /**
//  * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
//  *
//  * @since 3.0.0
//  */
// export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, E, B>(
//   f: (index: number, a: A) => ReaderTaskWriter<R, E, B>
// ): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskWriter<R, E, ReadonlyNonEmptyArray<B>>) =>
//   flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndex(SK)))

// /**
//  * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
//  *
//  * @since 3.0.0
//  */
// export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
//   f: (index: number, a: A) => ReaderTaskWriter<R, E, B>
// ): ((as: ReadonlyArray<A>) => ReaderTaskWriter<R, E, ReadonlyArray<B>>) => {
//   const g = traverseReadonlyNonEmptyArrayWithIndex(f)
//   return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
// }

// /**
//  * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
//  *
//  * @since 3.0.0
//  */
// export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, E, B>(
//   f: (index: number, a: A) => ReaderTaskWriter<R, E, B>
// ): ((as: ReadonlyNonEmptyArray<A>) => ReaderTaskWriter<R, E, ReadonlyNonEmptyArray<B>>) =>
//   flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(TE.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)))

// /**
//  * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
//  *
//  * @since 3.0.0
//  */
// export const traverseReadonlyArrayWithIndexSeq = <A, R, E, B>(
//   f: (index: number, a: A) => ReaderTaskWriter<R, E, B>
// ): ((as: ReadonlyArray<A>) => ReaderTaskWriter<R, E, ReadonlyArray<B>>) => {
//   const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
//   return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
// }
