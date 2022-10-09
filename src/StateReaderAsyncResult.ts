/**
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as alt from './Alt'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as result from './Result'
import type { Result } from './Result'
import type { Endomorphism } from './Endomorphism'
import * as fromResult_ from './FromResult'
import * as fromSync_ from './FromSync'
import * as fromReader_ from './FromReader'
import * as fromState_ from './FromState'
import * as fromAsync_ from './FromAsync'
import { SK } from './Function'
import { flow, identity, pipe } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { Sync } from './Sync'
import type { SyncResult } from './SyncResult'
import type * as monad from './Monad'
import type { Option } from './Option'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { Reader } from './Reader'
import type { ReaderResult } from './ReaderResult'
import * as readerAsyncResult from './ReaderAsyncResult'
import type { ReaderAsyncResult } from './ReaderAsyncResult'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import type { State } from './State'
import * as stateT from './StateT'
import type { Async } from './Async'
import type { AsyncResult } from './AsyncResult'

/**
 * @category model
 * @since 3.0.0
 */
export interface StateReaderAsyncResult<S, R, E, A> {
  (s: S): ReaderAsyncResult<R, E, readonly [S, A]>
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface StateReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: StateReaderAsyncResult<this['InOut1'], this['In1'], this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E, S>(e: E) => StateReaderAsyncResult<S, unknown, E, never> = (e) => () => readerAsyncResult.fail(e)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A, S>(a: A) => StateReaderAsyncResult<S, unknown, never, A> = /*#__PURE__*/ stateT.of(
  readerAsyncResult.FromIdentity
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromAsync = <A, S>(ma: Async<A>): StateReaderAsyncResult<S, unknown, never, A> =>
  fromReaderAsyncResult(readerAsyncResult.fromAsync(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const failAsync = <E, S>(me: Async<E>): StateReaderAsyncResult<S, unknown, E, never> =>
  fromReaderAsyncResult(readerAsyncResult.failAsync(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader = <R, A, S>(ma: Reader<R, A>): StateReaderAsyncResult<S, R, never, A> =>
  fromReaderAsyncResult(readerAsyncResult.fromReader(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const failReader = <R, E, S>(me: Reader<R, E>): StateReaderAsyncResult<S, R, E, never> =>
  fromReaderAsyncResult(readerAsyncResult.failReader(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromSync = <A, S>(ma: Sync<A>): StateReaderAsyncResult<S, unknown, never, A> =>
  fromReaderAsyncResult(readerAsyncResult.fromSync(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const failSync = <E, S>(me: Sync<E>): StateReaderAsyncResult<S, unknown, E, never> =>
  fromReaderAsyncResult(readerAsyncResult.failSync(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromState: <S, A>(ma: State<S, A>) => StateReaderAsyncResult<S, unknown, never, A> =
  /*#__PURE__*/ stateT.fromState(readerAsyncResult.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const failState: <S, E>(me: State<S, E>) => StateReaderAsyncResult<S, unknown, E, never> = (me) => (s) =>
  readerAsyncResult.fail(me(s)[1])

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksStateReaderAsyncResult =
  <R1, S, R2, E, A>(f: (r1: R1) => StateReaderAsyncResult<S, R2, E, A>): StateReaderAsyncResult<S, R1 & R2, E, A> =>
  (s) =>
  (r) =>
    f(r)(s)(r)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A, S>(fa: result.Result<E, A>) => StateReaderAsyncResult<S, unknown, E, A> =
  /*#__PURE__*/ result.match(
    (e) => fail(e),
    (a) => succeed(a)
  )

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsyncResult: <E, A, S>(fa: AsyncResult<E, A>) => StateReaderAsyncResult<S, unknown, E, A> = (ma) =>
  fromReaderAsyncResult(readerAsyncResult.fromAsyncResult(ma))

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <E, A, S>(fa: SyncResult<E, A>) => StateReaderAsyncResult<S, unknown, E, A> = (ma) =>
  fromReaderAsyncResult(readerAsyncResult.fromSyncResult(ma))

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromReaderResult: <R, E, A, S>(fa: ReaderResult<R, E, A>) => StateReaderAsyncResult<S, R, E, A> = (ma) =>
  fromReaderAsyncResult(readerAsyncResult.fromReaderResult(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderAsyncResult: <R, E, A, S>(fa: ReaderAsyncResult<R, E, A>) => StateReaderAsyncResult<S, R, E, A> =
  /*#__PURE__*/ stateT.fromKind(readerAsyncResult.Functor)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local =
  <R2, R1>(f: (r2: R2) => R1) =>
  <S, E, A>(ma: StateReaderAsyncResult<S, R1, E, A>): StateReaderAsyncResult<S, R2, E, A> =>
    flow(ma, reader.local(f))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSyncResult =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => SyncResult<E, B>
  ): (<S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>) =>
  (...a) =>
    fromSyncResult(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSyncResult =
  <A, E2, B>(f: (a: A) => SyncResult<E2, B>) =>
  <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>): StateReaderAsyncResult<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(liftSyncResult(f)))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsyncResult =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => AsyncResult<E, B>
  ): (<S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>) =>
  (...a) =>
    fromAsyncResult(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsyncResult =
  <A, E2, B>(f: (a: A) => AsyncResult<E2, B>) =>
  <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>): StateReaderAsyncResult<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(liftAsyncResult(f)))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReaderAsyncResult =
  <A extends ReadonlyArray<unknown>, R, E, B>(
    f: (...a: A) => ReaderAsyncResult<R, E, B>
  ): (<S>(...a: A) => StateReaderAsyncResult<S, R, E, B>) =>
  (...a) =>
    fromReaderAsyncResult(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReaderAsyncResult =
  <A, R, E2, B>(f: (a: A) => ReaderAsyncResult<R, E2, B>) =>
  <S, E1>(ma: StateReaderAsyncResult<S, R, E1, A>): StateReaderAsyncResult<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(liftReaderAsyncResult(f)))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ stateT.map(readerAsyncResult.Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<StateReaderAsyncResultTypeLambda> = {
  of: succeed
}

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
) => <S, R>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, G, B> = (f, g) => (fea) => (s) =>
  pipe(
    fea(s),
    readerAsyncResult.mapBoth(f, ([s, a]) => [s, g(a)])
  )

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ stateT.flatMap(readerAsyncResult.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<StateReaderAsyncResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, S, R2, E2, C>(
  bfc: (b: B) => StateReaderAsyncResult<S, R2, E2, C>
) => <A, R1, E1>(
  afb: (a: A) => StateReaderAsyncResult<S, R1, E1, B>
) => (a: A) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, C> = /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<StateReaderAsyncResultTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => <S>(a: A) => StateReaderAsyncResult<S, unknown, never, A> =
  /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<StateReaderAsyncResultTypeLambda> = {
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
export const zipLeft: <S, R2, E2>(
  second: StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, E1, A>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <S, R2, E2, A>(
  second: StateReaderAsyncResult<S, R2, E2, A>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, unknown>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <S, R2, E2, A>(
  fa: StateReaderAsyncResult<S, R2, E2, A>
) => <R1, E1, B>(
  self: StateReaderAsyncResult<S, R1, E1, (a: A) => B>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatten: <S, R1, E1, R2, E2, A>(
  mma: StateReaderAsyncResult<S, R1, E1, StateReaderAsyncResult<S, R2, E2, A>>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @since 3.0.0
 */
export const orElse =
  <S, R2, E2, B>(that: StateReaderAsyncResult<S, R2, E2, B>) =>
  <R1, E1, A>(self: StateReaderAsyncResult<S, R1, E1, A>): StateReaderAsyncResult<S, R1 & R2, E2, A | B> =>
  (r) =>
    pipe(self(r), readerAsyncResult.orElse(that(r)))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StateReaderAsyncResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderAsyncResult<S, R, E, (a: A) => B>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(
  b: B
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, unknown>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <S, R, E>(self: StateReaderAsyncResult<S, R, E, unknown>) => StateReaderAsyncResult<S, R, E, void> =
  /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<StateReaderAsyncResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `StateReaderAsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, E1, R2, E2>(
  fa: StateReaderAsyncResult<S, R1, E1, A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `StateReaderAsyncResult`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, E1, R2, E2, R3, E3>(
  fa: StateReaderAsyncResult<S, R1, E1, A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>,
  fc: StateReaderAsyncResult<S, R3, E3, C>
) => StateReaderAsyncResult<S, R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<StateReaderAsyncResultTypeLambda> = {
  map,
  ap,
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<StateReaderAsyncResultTypeLambda> = {
  mapBoth
}

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(
  f: (e: E) => G
) => <S, R, A>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, G, A> =
  /*#__PURE__*/ bifunctor.mapLeft(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<StateReaderAsyncResultTypeLambda> = {
  orElse
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <S, R, E, A>(
  startWith: StateReaderAsyncResult<S, R, E, A>
) => (iterable: Iterable<StateReaderAsyncResult<S, R, E, A>>) => StateReaderAsyncResult<S, R, E, A> =
  /*#__PURE__*/ alt.firstSuccessOf(Alt)

/**
 * Returns an effect that runs the first effect and in case of failure, runs
 * each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOfNonEmpty: <S, R, E, A>(
  head: StateReaderAsyncResult<S, R, E, A>,
  ...tail: ReadonlyArray<StateReaderAsyncResult<S, R, E, A>>
) => StateReaderAsyncResult<S, R, E, A> = /*#__PURE__*/ alt.firstSuccessOfNonEmpty(Alt)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: fromState_.FromState<StateReaderAsyncResultTypeLambda> = {
  fromState
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get: <S>() => StateReaderAsyncResult<S, unknown, never, S> = /*#__PURE__*/ fromState_.get(FromState)

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S>(s: S) => StateReaderAsyncResult<S, unknown, never, void> = /*#__PURE__*/ fromState_.put(FromState)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S>(f: Endomorphism<S>) => StateReaderAsyncResult<S, unknown, never, void> =
  /*#__PURE__*/ fromState_.modify(FromState)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateReaderAsyncResult<S, unknown, never, A> =
  /*#__PURE__*/ fromState_.gets(FromState)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftState: <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => (...a: A) => StateReaderAsyncResult<S, unknown, never, B> = /*#__PURE__*/ fromState_.liftState(FromState)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapState: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E>(ma: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ fromState_.flatMapState(FromState, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<StateReaderAsyncResultTypeLambda> = {
  map,
  of: succeed,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, S, R2, E2>(
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, S, R2, E2>(
  onError: (e: E1) => StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, A>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A> =
  (onError) => (self) => (s) => {
    return pipe(
      self(s),
      readerAsyncResult.tapError((e1) => onError(e1)(s))
    )
  }

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<StateReaderAsyncResultTypeLambda> = {
  fromSync: fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <S>(...x: ReadonlyArray<unknown>) => StateReaderAsyncResult<S, unknown, never, void> =
  /*#__PURE__*/ fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <S>(...x: ReadonlyArray<unknown>) => StateReaderAsyncResult<S, unknown, never, void> =
  /*#__PURE__*/ fromSync_.logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, never, B> = /*#__PURE__*/ fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(
  f: (a: A) => Sync<B>
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ fromSync_.flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<StateReaderAsyncResultTypeLambda> = {
  fromSync: fromSync,
  fromAsync: fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: <S>(duration: number) => StateReaderAsyncResult<S, unknown, never, void> =
  /*#__PURE__*/ fromAsync_.sleep(FromAsync)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @since 3.0.0
 */
export const delay: (
  duration: number
) => <S, R, E, A>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, A> =
  /*#__PURE__*/ fromAsync_.delay(FromAsync, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, never, B> = /*#__PURE__*/ fromAsync_.liftAsync(FromAsync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapAsync: <A, B>(
  f: (a: A) => Async<B>
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ fromAsync_.flatMapAsync(FromAsync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<StateReaderAsyncResultTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <S, R>() => StateReaderAsyncResult<S, R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderResult`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, S>(f: (r: R) => A) => StateReaderAsyncResult<S, R, never, A> =
  /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <S>(...a: A) => StateReaderAsyncResult<S, R, never, B> = /*#__PURE__*/ fromReader_.liftReader(FromReader)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, E>(ma: StateReaderAsyncResult<S, R1, E, A>) => StateReaderAsyncResult<S, R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReader(FromReader, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<StateReaderAsyncResultTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A, S, R>(fa: Option<A>) => StateReaderAsyncResult<S, R, E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <S, R, E1>(self: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B> =
  /*#__PURE__*/ fromResult_.flatMapOption(FromResult, Flattenable)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E1 | E2, B> =
  /*#__PURE__*/ fromResult_.flatMapResult(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S>(
    c: C
  ) => StateReaderAsyncResult<S, unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S>(b: B) => StateReaderAsyncResult<S, unknown, E, B>
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <S, R, E1>(
    ma: StateReaderAsyncResult<S, R, E1, C>
  ) => StateReaderAsyncResult<S, R, E1 | E2, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <S, R, E1>(
    mb: StateReaderAsyncResult<S, R, E1, B>
  ) => StateReaderAsyncResult<S, R, E2 | E1, B>
} = /*#__PURE__*/ fromResult_.filter(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => <S, R>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B> =
  /*#__PURE__*/ fromResult_.filterMap(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S, R>(
    self: StateReaderAsyncResult<S, R, E, C>
  ) => readonly [StateReaderAsyncResult<S, R, E, C>, StateReaderAsyncResult<S, R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S, R>(
    self: StateReaderAsyncResult<S, R, E, B>
  ) => readonly [StateReaderAsyncResult<S, R, E, B>, StateReaderAsyncResult<S, R, E, B>]
} = /*#__PURE__*/ fromResult_.partition(FromResult, Flattenable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => <S, R>(
  self: StateReaderAsyncResult<S, R, E, A>
) => readonly [StateReaderAsyncResult<S, R, E, B>, StateReaderAsyncResult<S, R, E, C>] =
  /*#__PURE__*/ fromResult_.partitionMap(FromResult, Flattenable)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => result.Result<E, B>
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A, S>(a: A) => StateReaderAsyncResult<S, unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, NonNullable<B>> =
  /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <S, R, E1>(self: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, NonNullable<B>> =
  /*#__PURE__*/ fromResult_.flatMapNullable(FromResult, Flattenable)

/**
 * Run a computation in the `StateReaderAsyncResult` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(s: S) => <R, E, A>(ma: StateReaderAsyncResult<S, R, E, A>) => ReaderAsyncResult<R, E, A> =
  /*#__PURE__*/ stateT.evaluate(readerAsyncResult.Functor)

/**
 * Run a computation in the `StateReaderAsyncResult` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(s: S) => <R, E, A>(ma: StateReaderAsyncResult<S, R, E, A>) => ReaderAsyncResult<R, E, S> =
  /*#__PURE__*/ stateT.execute(readerAsyncResult.Functor)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(
  self: StateReaderAsyncResult<S, R, E, A>
) => StateReaderAsyncResult<S, R, E, { readonly [K in N]: A }> = /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  self: StateReaderAsyncResult<S, R, E, A>
) => StateReaderAsyncResult<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

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
export const bind: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <S, R, E, A>(
  self: StateReaderAsyncResult<S, R, E, A>
) => StateReaderAsyncResult<S, R, E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <S, R2, E2, B>(
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <S, R2, E2, B, A, C>(
  that: StateReaderAsyncResult<S, R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex =
  <A, S, R, E, B>(f: (index: number, a: A) => StateReaderAsyncResult<S, R, E, B>) =>
  (as: NonEmptyReadonlyArray<A>): StateReaderAsyncResult<S, R, E, NonEmptyReadonlyArray<B>> =>
  (s) =>
  (r) =>
  () =>
    _.tail(as).reduce<Promise<Result<E, [S, _.NonEmptyArray<B>]>>>(
      (acc, a, i) =>
        acc.then((esb) =>
          _.isFailure(esb)
            ? acc
            : f(
                i + 1,
                a
              )(esb.success[0])(r)().then((eb) => {
                if (_.isFailure(eb)) {
                  return eb
                }
                const [s, b] = eb.success
                esb.success[1].push(b)
                esb.success[0] = s
                return esb
              })
        ),
      f(0, _.head(as))(s)(r)().then(result.map(([s, b]) => [s, [b]]))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderAsyncResult<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderAsyncResult<S, R, E, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : succeed(_.emptyReadonlyArray))
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderAsyncResult<S, R, E, B>
): ((as: NonEmptyReadonlyArray<A>) => StateReaderAsyncResult<S, R, E, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderAsyncResult<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderAsyncResult<S, R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <S, R, E, A>(
  arr: ReadonlyArray<StateReaderAsyncResult<S, R, E, A>>
) => StateReaderAsyncResult<S, R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
