/**
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type { Apply } from '@fp-ts/core/Apply'
import type { Async } from '@fp-ts/core/Async'
import * as async from '@fp-ts/core/Async'
import type * as bifunctor from '@fp-ts/core/Bifunctor'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { FromAsync } from '@fp-ts/core/FromAsync'
import type { FromIdentity } from '@fp-ts/core/FromIdentity'
import type { FromReader } from '@fp-ts/core/FromReader'
import type { FromSync } from '@fp-ts/core/FromSync'
import * as fromWriter_ from '@fp-ts/core/FromWriter'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Monad } from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import * as nonEmptyReadonlyArray from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Reader } from '@fp-ts/core/Reader'
import * as reader from '@fp-ts/core/Reader'
import type { ReaderAsync } from '@fp-ts/core/ReaderAsync'
import * as readerAsync from '@fp-ts/core/ReaderAsync'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Sync } from '@fp-ts/core/Sync'
import type { Writer } from '@fp-ts/core/Writer'
import * as writerT from '@fp-ts/core/WriterT'

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderAsyncWriter<R, W, A> extends Reader<R, Async<Writer<W, A>>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this['In1'], this['Out2'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderAsyncWriterFFix<W> extends TypeLambda {
  readonly type: ReaderAsyncWriter<this['In1'], W, this['Out1']>
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReader = <W>(w: W) =>
  <R, A>(fa: Reader<R, A>): ReaderAsyncWriter<R, W, A> => fromReaderAsync(w)(readerAsync.fromReader(fa))

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReaderAsync: <W>(w: W) => <R, A>(a: ReaderAsync<R, A>) => ReaderAsyncWriter<R, W, A> = writerT
  .fromKind(readerAsync.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncWriter: <W, A>(a: Async<Writer<W, A>>) => ReaderAsyncWriter<unknown, W, A> = reader.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <W>(w: W) => <A>(fa: Sync<A>) => ReaderAsyncWriter<unknown, W, A> = writerT
  .fromSync(readerAsync.Functor, readerAsync.FromSync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <W>(w: W) => <A>(fa: Async<A>) => ReaderAsyncWriter<unknown, W, A> = writerT
  .fromAsync(readerAsync.Functor, readerAsync.FromAsync)

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell: <W, R>(w: W) => ReaderAsyncWriter<R, W, void> = writerT.tell(readerAsync.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderAsyncWriter: <R1, R2, W, A>(
  f: (r1: R1) => ReaderAsyncWriter<R2, W, A>
) => ReaderAsyncWriter<R1 & R2, W, A> = reader.asksReader

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromWriter = <W, A>(fa: Writer<W, A>): ReaderAsyncWriter<unknown, W, A> => readerAsync.of(fa)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReaderWriter = <R, W, A>(fa: Reader<R, Writer<W, A>>): ReaderAsyncWriter<R, W, A> => flow(fa, async.of)

/**
 * @since 3.0.0
 */
export const fst: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsync<R, W> = writerT.fst(
  readerAsync.Functor
)

/**
 * @since 3.0.0
 */
export const snd: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsync<R, A> = writerT.snd(
  readerAsync.Functor
)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <W, A>(self: ReaderAsyncWriter<R1, W, A>) => ReaderAsyncWriter<R2, W, A> = reader.local

/**
 * @since 3.0.0
 */
export const swap: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, A, W> = writerT
  .swap(readerAsync.Functor)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsyncWriter = <A extends ReadonlyArray<unknown>, W, B>(
  f: (...a: A) => Async<Writer<W, B>>
): ((...a: A) => ReaderAsyncWriter<unknown, W, B>) => (...a) => fromAsyncWriter(f(...a))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderWriter = <A extends ReadonlyArray<unknown>, R, W, B>(
  f: (...a: A) => Reader<R, Writer<W, B>>
): ((...a: A) => ReaderAsyncWriter<R, W, B>) => flow(f, fromReaderWriter)

/**
 * @since 3.0.0
 */
export const listen: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, readonly [W, A]> = writerT
  .listen(readerAsync.Functor)

/**
 * @since 3.0.0
 */
export const pass: <R, W, A>(self: ReaderAsyncWriter<R, W, readonly [A, (w: W) => W]>) => ReaderAsyncWriter<R, W, A> =
  writerT.pass(readerAsync.Functor)

/**
 * @since 3.0.0
 */
export const listens: <W, B>(
  f: (w: W) => B
) => <R, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, readonly [A, B]> = writerT
  .listens(readerAsync.Functor)

/**
 * @since 3.0.0
 */
export const censor: <W>(f: (w: W) => W) => <R, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, A> =
  writerT.censor(readerAsync.Functor)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, B> =
  writerT.map(readerAsync.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(
  f: (e: E) => G
) => <R, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, G, A> = writerT.mapLeft(
  readerAsync.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, G, B> = writerT.mapBoth(
  readerAsync.Functor
)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ReaderAsyncWriterTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderAsyncWriterTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, E, B>(self: ReaderAsyncWriter<R, E, (a: A) => B>) => ReaderAsyncWriter<R, E, B> =
  functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIdentity = <W>(M: Monoid<W>): FromIdentity<ReaderAsyncWriterFFix<W>> => ({
  of: writerT.of(readerAsync.FromIdentity, M)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
): Apply<ReaderAsyncWriterFFix<W>> => ({
  map,
  ap: writerT.ap(Apply, Semigroup)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Monoid: Monoid<W>
): Applicative<ReaderAsyncWriterFFix<W>> => {
  const { ap } = getApply(Apply, Monoid)
  const P = getFromIdentity(Monoid)
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
export const getFlattenable = <W>(S: Semigroup<W>): Flattenable<ReaderAsyncWriterFFix<W>> => {
  return {
    map,
    flatMap: writerT.flatMap(readerAsync.Flattenable, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad<ReaderAsyncWriterFFix<W>> => {
  const P = getFromIdentity(M)
  const C = getFlattenable(M)
  return {
    map,
    of: P.of,
    flatMap: C.flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromWriter: fromWriter_.FromWriter<ReaderAsyncWriterTypeLambda> = {
  fromWriter
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftWriter: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Writer<E, B>
) => (...a: A) => ReaderAsyncWriter<unknown, E, B> = fromWriter_.liftWriter(FromWriter)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromReader = <W>(M: Monoid<W>): FromReader<ReaderAsyncWriterFFix<W>> => ({
  fromReader: fromReader(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromSync = <W>(M: Monoid<W>): FromSync<ReaderAsyncWriterFFix<W>> => ({
  fromSync: fromSync(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromAsync = <W>(M: Monoid<W>): FromAsync<ReaderAsyncWriterFFix<W>> => ({
  fromSync: fromSync(M.empty),
  fromAsync: fromAsync(M.empty)
})

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, { readonly [K in N]: A }> = functor.bindTo(
  Functor
)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderAsyncWriter<R, E, A>
) => ReaderAsyncWriter<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
  Functor
)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, E, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, readonly [A]> = functor
  .tupled(Functor)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(Apply, Semigroup))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
) =>
  <A, R, B>(f: (index: number, a: A) => ReaderAsyncWriter<R, W, B>) =>
    (as: NonEmptyReadonlyArray<A>): ReaderAsyncWriter<R, W, NonEmptyReadonlyArray<B>> => {
      // TODO
      return nonEmptyReadonlyArray.traverseWithIndex(getApply(Apply, Semigroup))(f)(as)
    }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(Apply, Monoid))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <W>(Apply: Apply<readerAsync.ReaderAsyncTypeLambda>, Monoid: Monoid<W>) =>
  <A, R, B>(
    f: (index: number, a: A) => ReaderAsyncWriter<R, W, B>
  ): ((as: ReadonlyArray<A>) => ReaderAsyncWriter<R, W, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndex(Apply, Monoid)(f)
    const P = getFromIdentity(Monoid)
    return (as) => (_.isNonEmpty(as) ? g(as) : P.of(_.emptyReadonlyArray))
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(Apply, Semigroup))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
) => {
  const traverseNonEmptyReadonlyArrayWithIndexAM = traverseNonEmptyReadonlyArrayWithIndex(Apply, Semigroup)
  return <A, R, B>(
    f: (a: A) => ReaderAsyncWriter<R, W, B>
  ): ((as: NonEmptyReadonlyArray<A>) => ReaderAsyncWriter<R, W, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexAM(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(A, M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <W>(A: Apply<readerAsync.ReaderAsyncTypeLambda>, M: Monoid<W>) => {
  const traverseReadonlyArrayWithIndexAM = traverseReadonlyArrayWithIndex(A, M)
  return <A, R, B>(
    f: (a: A) => ReaderAsyncWriter<R, W, B>
  ): ((as: ReadonlyArray<A>) => ReaderAsyncWriter<R, W, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexAM(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(A, M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <W>(
  A: Apply<readerAsync.ReaderAsyncTypeLambda>,
  M: Monoid<W>
): (<R, A>(arr: ReadonlyArray<ReaderAsyncWriter<R, W, A>>) => ReaderAsyncWriter<R, W, ReadonlyArray<A>>) =>
  traverseReadonlyArray(A, M)(identity)
