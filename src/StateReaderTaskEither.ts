/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as flattenable from './Flattenable'
import * as either from './Either'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import * as fromState_ from './FromState'
import * as fromTask_ from './FromTask'
import type { LazyArg } from './function'
import { SK } from './function'
import { flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { Option } from './Option'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import * as reader from './Reader'
import type { Reader } from './Reader'
import type { ReaderEither } from './ReaderEither'
import * as readerTaskEither from './ReaderTaskEither'
import type { ReaderTaskEither } from './ReaderTaskEither'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { State } from './State'
import * as stateT from './StateT'
import type { Task } from './Task'
import type { TaskEither } from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, readonly [S, A]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, S>(e: E) => StateReaderTaskEither<S, unknown, E, never> = (e) => () => readerTaskEither.left(e)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, S>(a: A) => StateReaderTaskEither<S, unknown, never, A> = /*#__PURE__*/ stateT.of(
  readerTaskEither.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask = <A, S>(ma: Task<A>): StateReaderTaskEither<S, unknown, never, A> =>
  fromReaderTaskEither(readerTaskEither.rightTask(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask = <E, S>(me: Task<E>): StateReaderTaskEither<S, unknown, E, never> =>
  fromReaderTaskEither(readerTaskEither.leftTask(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader = <R, A, S>(ma: Reader<R, A>): StateReaderTaskEither<S, R, never, A> =>
  fromReaderTaskEither(readerTaskEither.rightReader(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader = <R, E, S>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, never> =>
  fromReaderTaskEither(readerTaskEither.leftReader(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO = <A, S>(ma: IO<A>): StateReaderTaskEither<S, unknown, never, A> =>
  fromReaderTaskEither(readerTaskEither.rightIO(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO = <E, S>(me: IO<E>): StateReaderTaskEither<S, unknown, E, never> =>
  fromReaderTaskEither(readerTaskEither.leftIO(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> =
  /*#__PURE__*/ stateT.fromState(readerTaskEither.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftState: <S, E>(me: State<S, E>) => StateReaderTaskEither<S, unknown, E, never> = (me) => (s) =>
  readerTaskEither.left(me(s)[1])

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksStateReaderTaskEither =
  <R1, S, R2, E, A>(f: (r1: R1) => StateReaderTaskEither<S, R2, E, A>): StateReaderTaskEither<S, R1 & R2, E, A> =>
  (s) =>
  (r) =>
    f(r)(s)(r)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A, S>(fa: either.Either<E, A>) => StateReaderTaskEither<S, unknown, E, A> =
  /*#__PURE__*/ either.match(
    (e) => left(e),
    (a) => right(a)
  )

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A, S>(fa: reader.Reader<R, A>) => StateReaderTaskEither<S, R, never, A> = rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, S>(fa: IO<A>) => StateReaderTaskEither<S, unknown, never, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, S>(fa: Task<A>) => StateReaderTaskEither<S, unknown, never, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromState: <S, A>(fa: State<S, A>) => StateReaderTaskEither<S, unknown, never, A> =
  /*#__PURE__*/ stateT.fromState(readerTaskEither.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: <E, A, S>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, unknown, E, A> = (ma) =>
  fromReaderTaskEither(readerTaskEither.fromTaskEither(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A, S>(fa: IOEither<E, A>) => StateReaderTaskEither<S, unknown, E, A> = (ma) =>
  fromReaderTaskEither(readerTaskEither.fromIOEither(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReaderEither: <R, E, A, S>(fa: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  fromReaderTaskEither(readerTaskEither.fromReaderEither(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderTaskEither: <R, E, A, S>(fa: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ stateT.fromF(readerTaskEither.Functor)

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
export const local =
  <R2, R1>(f: (r2: R2) => R1) =>
  <S, E, A>(ma: StateReaderTaskEither<S, R1, E, A>): StateReaderTaskEither<S, R2, E, A> =>
    flow(ma, reader.local(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => IOEither<E, B>
  ): (<S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>) =>
  (...a) =>
    fromIOEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOEitherK =
  <A, E2, B>(f: (a: A) => IOEither<E2, B>) =>
  <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(fromIOEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => TaskEither<E, B>
  ): (<S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>) =>
  (...a) =>
    fromTaskEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskEitherK =
  <A, E2, B>(f: (a: A) => TaskEither<E2, B>) =>
  <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(fromTaskEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderTaskEitherK =
  <A extends ReadonlyArray<unknown>, R, E, B>(
    f: (...a: A) => ReaderTaskEither<R, E, B>
  ): (<S>(...a: A) => StateReaderTaskEither<S, R, E, B>) =>
  (...a) =>
    fromReaderTaskEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderTaskEitherK =
  <A, R, E2, B>(f: (a: A) => ReaderTaskEither<R, E2, B>) =>
  <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, flatMap<A, S, R, E2, B>(fromReaderTaskEitherK(f)))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ stateT.map(
  readerTaskEither.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B> = (f, g) => (fea) => (s) =>
  pipe(
    fea(s),
    readerTaskEither.mapBoth(f, ([s, a]) => [s, g(a)])
  )

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapError: <E, G>(
  f: (e: E) => G
) => <S, R, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A> =
  /*#__PURE__*/ bifunctor.getDefaultMapLeft<StateReaderTaskEitherTypeLambda>(mapBoth)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ stateT.flatMap(readerTaskEither.Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<StateReaderTaskEitherTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <S, R2, E2, _>(
  second: StateReaderTaskEither<S, R2, E2, _>
) => <R1, E1, A>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <S, R2, E2, A>(
  second: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, _>(self: StateReaderTaskEither<S, R1, E1, _>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(self: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, S>(a: A) => StateReaderTaskEither<S, unknown, never, A> = right

/**
 * @since 3.0.0
 */
export const unit = <S>(): StateReaderTaskEither<S, unknown, never, void> => of(undefined)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category SemigroupK
 * @since 3.0.0
 */
export const combineK =
  <S, R2, E2, B>(second: LazyArg<StateReaderTaskEither<S, R2, E2, B>>) =>
  <R1, E1, A>(self: StateReaderTaskEither<S, R1, E1, A>): StateReaderTaskEither<S, R1 & R2, E2, A | B> =>
  (r) =>
    pipe(
      self(r),
      readerTaskEither.combineK(() => second()(r))
    )

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface StateReaderTaskEitherTypeLambda extends TypeLambda {
  readonly type: StateReaderTaskEither<this['InOut1'], this['In1'], this['Out2'], this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StateReaderTaskEitherTypeLambda> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<StateReaderTaskEitherTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<StateReaderTaskEitherTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `StateReaderTaskEither`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, E1, R2, E2>(
  fa: StateReaderTaskEither<S, R1, E1, A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `StateReaderTaskEither`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, E1, R2, E2, R3, E3>(
  fa: StateReaderTaskEither<S, R1, E1, A>,
  fb: StateReaderTaskEither<S, R2, E2, B>,
  fc: StateReaderTaskEither<S, R3, E3, C>
) => StateReaderTaskEither<S, R1 & R2 & R3, E1 | E2 | E3, D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<StateReaderTaskEitherTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<StateReaderTaskEitherTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<StateReaderTaskEitherTypeLambda> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: fromState_.FromState<StateReaderTaskEitherTypeLambda> = {
  fromState
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get: <S>() => StateReaderTaskEither<S, unknown, never, S> = /*#__PURE__*/ fromState_.get(FromState)

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S>(s: S) => StateReaderTaskEither<S, unknown, never, void> = /*#__PURE__*/ fromState_.put(FromState)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S>(f: Endomorphism<S>) => StateReaderTaskEither<S, unknown, never, void> =
  /*#__PURE__*/ fromState_.modify(FromState)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateReaderTaskEither<S, unknown, never, A> =
  /*#__PURE__*/ fromState_.gets(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromStateK: <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => (...a: A) => StateReaderTaskEither<S, unknown, never, B> = /*#__PURE__*/ fromState_.fromStateK(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromState_.flatMapStateK(FromState, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<StateReaderTaskEitherTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, S, R2, E2, _>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, _>
) => <R1, E1>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tapError: <E1, S, R2, E2, _>(
  onError: (e: E1) => StateReaderTaskEither<S, R2, E2, _>
) => <R1, A>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  (onError) => (self) => (s) => {
    return pipe(
      self(s),
      readerTaskEither.tapError((e1) => onError(e1)(s))
    )
  }

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<StateReaderTaskEitherTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <S>(...x: ReadonlyArray<unknown>) => StateReaderTaskEither<S, unknown, never, void> =
  /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <S>(...x: ReadonlyArray<unknown>) => StateReaderTaskEither<S, unknown, never, void> =
  /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, never, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromIO_.flatMapIOK(FromIO, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<StateReaderTaskEitherTypeLambda> = {
  fromIO,
  fromTask
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: <S>(duration: number) => StateReaderTaskEither<S, unknown, never, void> =
  /*#__PURE__*/ fromTask_.sleep(FromTask)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @category combinators
 * @since 3.0.0
 */
export const delay: (
  duration: number
) => <S, R, E, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromTask_.delay(FromTask, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, never, B> = /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromTask_.flatMapTaskK(FromTask, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<StateReaderTaskEitherTypeLambda> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <S, R>() => StateReaderTaskEither<S, R, never, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, S>(f: (r: R) => A) => StateReaderTaskEither<S, R, never, A> =
  /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, never, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, E>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.flatMapReaderK(FromReader, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<StateReaderTaskEitherTypeLambda> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A, S, R>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B> = /*#__PURE__*/ fromEither_.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromEither_.flatMapOptionK(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E1 | E2, B> =
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flattenable)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S>(
    c: C
  ) => StateReaderTaskEither<S, unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S>(
    b: B
  ) => StateReaderTaskEither<S, unknown, E, B>
} = /*#__PURE__*/ fromEither_.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, C>
  ) => StateReaderTaskEither<S, R, E1 | E2, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <S, R, E1>(
    mb: StateReaderTaskEither<S, R, E1, B>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
} = /*#__PURE__*/ fromEither_.filter(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromEither_.filterMap(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S, R>(
    self: StateReaderTaskEither<S, R, E, C>
  ) => readonly [StateReaderTaskEither<S, R, E, C>, StateReaderTaskEither<S, R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S, R>(
    self: StateReaderTaskEither<S, R, E, B>
  ) => readonly [StateReaderTaskEither<S, R, E, B>, StateReaderTaskEither<S, R, E, B>]
} = /*#__PURE__*/ fromEither_.partition(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => <S, R>(
  self: StateReaderTaskEither<S, R, E, A>
) => readonly [StateReaderTaskEither<S, R, E, B>, StateReaderTaskEither<S, R, E, C>] =
  /*#__PURE__*/ fromEither_.partitionMap(FromEither, Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <E>(
  onNullable: LazyArg<E>
) => <A, S>(a: A) => StateReaderTaskEither<S, unknown, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullable(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.fromNullableK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.flatMapNullableK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/ stateT.evaluate(readerTaskEither.Functor)

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S> =
  /*#__PURE__*/ stateT.execute(readerTaskEither.Functor)

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  self: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category struct sequencing
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <S, R, E, A>(
  self: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <S, R2, E2, B, A, C>(
  that: StateReaderTaskEither<S, R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, C> =
  /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, S, R, E, B>(f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>> =>
  (s) =>
  (r) =>
  () =>
    _.tail(as).reduce<Promise<Either<E, [S, _.NonEmptyArray<B>]>>>(
      (acc, a, i) =>
        acc.then((esb) =>
          _.isLeft(esb)
            ? acc
            : f(
                i + 1,
                a
              )(esb.right[0])(r)().then((eb) => {
                if (_.isLeft(eb)) {
                  return eb
                }
                const [s, b] = eb.right
                esb.right[1].push(b)
                esb.right[0] = s
                return esb
              })
        ),
      f(0, _.head(as))(s)(r)().then(either.map(([s, b]) => [s, [b]]))
    )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : of(_.Zip))
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <S, R, E, A>(
  arr: ReadonlyArray<StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
