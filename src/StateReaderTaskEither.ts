/**
 * @since 3.0.0
 */
import type * as semigroupK from './SemigroupK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as chainable from './Chainable'
import * as either from './Either'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import * as fromReader_ from './FromReader'
import * as fromState_ from './FromState'
import * as fromTask_ from './FromTask'
import type { Lazy } from './function'
import { flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import type { NonEmptyArray } from './NonEmptyArray'
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
  (s: S): ReaderTaskEither<R, E, readonly [A, S]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, S, R = unknown, A = never>(e: E) => StateReaderTaskEither<S, R, E, A> = (e) => () =>
  readerTaskEither.left(e)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, S, R = unknown, E = never>(a: A) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ stateT.of(
  readerTaskEither.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask = <A, S, R, E = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.rightTask(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask = <E, S, R, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.leftTask(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader = <R, A, S, E = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.rightReader(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader = <R, E, S, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.leftReader(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO = <A, S, R, E = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.rightIO(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO = <E, S, R, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(readerTaskEither.leftIO(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightState: <S, A, R, E = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ stateT.fromState(readerTaskEither.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftState: <S, E, R, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A> = (me) => (s) =>
  readerTaskEither.left(me(s)[0])

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
export const fromEither: <E, A, S, R = unknown>(fa: either.Either<E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ either.match(
    (e) => left(e),
    (a) => right(a)
  )

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A, S, E = never>(fa: reader.Reader<R, A>) => StateReaderTaskEither<S, R, E, A> =
  rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, S, R = unknown, E = never>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, S, R = unknown, E = never>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromState: <S, A, R = unknown, E = never>(fa: State<S, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ stateT.fromState(readerTaskEither.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: <E, A, S, R = unknown>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  fromReaderTaskEither(readerTaskEither.fromTaskEither(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A, S, R = unknown>(fa: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
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
  ): (<S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>) =>
  (...a) =>
    fromIOEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK =
  <A, E2, B>(f: (a: A) => IOEither<E2, B>) =>
  <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, chain<A, S, R, E2, B>(fromIOEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK =
  <A extends ReadonlyArray<unknown>, E, B>(
    f: (...a: A) => TaskEither<E, B>
  ): (<S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>) =>
  (...a) =>
    fromTaskEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK =
  <A, E2, B>(f: (a: A) => TaskEither<E2, B>) =>
  <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, chain<A, S, R, E2, B>(fromTaskEitherK(f)))

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
export const chainReaderTaskEitherK =
  <A, R, E2, B>(f: (a: A) => ReaderTaskEither<R, E2, B>) =>
  <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>): StateReaderTaskEither<S, R, E1 | E2, B> =>
    pipe(ma, chain<A, S, R, E2, B>(fromReaderTaskEitherK(f)))

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
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ stateT.map(
  readerTaskEither.Functor
)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B> = (f, g) => (fea) => (s) =>
  pipe(
    fea(s),
    readerTaskEither.bimap(f, ([a, s]) => [g(a), s])
  )

/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A> =
  /*#__PURE__*/ bifunctor.mapLeftDefault<StateReaderTaskEitherF>(bimap)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ stateT.ap(readerTaskEither.Monad)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, S, R = unknown, E = never>(a: A) => StateReaderTaskEither<S, R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chainable
 * @since 3.0.0
 */
export const chain: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ stateT.chain(readerTaskEither.Monad)

/**
 * Derivable from `Chainable`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = /*#__PURE__*/ chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category SemigroupK
 * @since 3.0.0
 */
export const alt =
  <S, R2, E2, B>(second: () => StateReaderTaskEither<S, R2, E2, B>) =>
  <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>): StateReaderTaskEither<S, R1 & R2, E2, A | B> =>
  (r) =>
    pipe(
      first(r),
      readerTaskEither.alt(() => second()(r))
    )

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface StateReaderTaskEitherF extends HKT {
  readonly type: StateReaderTaskEither<
    this['Invariant1'],
    this['Contravariant1'],
    this['Covariant2'],
    this['Covariant1']
  >
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<StateReaderTaskEitherF> = {
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
export const Pointed: Pointed_<StateReaderTaskEitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<StateReaderTaskEitherF> = {
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
export const apFirst: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ apply.apFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> =
  /*#__PURE__*/ apply.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<StateReaderTaskEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<StateReaderTaskEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<StateReaderTaskEitherF> = {
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: chainable.Chainable<StateReaderTaskEitherF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: fromState_.FromState<StateReaderTaskEitherF> = {
  fromState
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> = /*#__PURE__*/ fromState_.get(FromState)

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/ fromState_.put(FromState)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S, R, E = never>(f: Endomorphism<S>) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/ fromState_.modify(FromState)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, A, R = unknown, E = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromState_.gets(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromStateK: <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => <R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromState_.fromStateK(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E = never>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromState_.chainStateK(FromState, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<StateReaderTaskEitherF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chainable`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> =
  /*#__PURE__*/ chainable.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<StateReaderTaskEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <S, R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromIO_.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromIO_.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<StateReaderTaskEitherF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
) => <S, R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromTask_.fromTaskK(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromTask_.chainTaskK(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromTask_.chainFirstTaskK(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<StateReaderTaskEitherF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <S, R, E = never>() => StateReaderTaskEither<S, R, E, R> = /*#__PURE__*/ fromReader_.ask(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, S, E = never>(f: (r: R) => A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromReader_.asks(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <S, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromReader_.fromReaderK(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, E = never>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R1 & R2, E, B> =
  /*#__PURE__*/ fromReader_.chainReaderK(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, E = never>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R1 & R2, E, A> =
  /*#__PURE__*/ fromReader_.chainFirstReaderK(FromReader, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<StateReaderTaskEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A, S, R>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromEither_.fromOptionKOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromEither_.chainOptionKOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E1 | E2, B> =
  /*#__PURE__*/ fromEither_.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E1 | E2, A> =
  /*#__PURE__*/ fromEither_.chainFirstEitherK(FromEither, Chain)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <S, R = unknown>(b: B) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromEither_.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <S, R = unknown>(c: C) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/ fromEither_.fromRefinementOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <S, R, E1>(mb: StateReaderTaskEither<S, R, E1, B>) => StateReaderTaskEither<S, R, E2 | E1, B> =
  /*#__PURE__*/ fromEither_.filterOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, C>) => StateReaderTaskEither<S, R, E1 | E2, B> =
  /*#__PURE__*/ fromEither_.refineOrElse(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => either.Either<E, B>
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse: <E>(
  onNullable: Lazy<E>
) => <A, S, R = unknown>(a: A) => StateReaderTaskEither<S, R, E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.fromNullableKOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, NonNullable<B>> =
  /*#__PURE__*/ fromEither_.chainNullableKOrElse(FromEither, Chain)

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
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ chainable.bind(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, readonly [...A, B]> = /*#__PURE__*/ apply.apT(Apply)

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
    _.tail(as).reduce<Promise<Either<E, [NonEmptyArray<B>, S]>>>(
      (acc, a, i) =>
        acc.then((ebs) =>
          _.isLeft(ebs)
            ? acc
            : f(
                i + 1,
                a
              )(ebs.right[1])(r)().then((eb) => {
                if (_.isLeft(eb)) {
                  return eb
                }
                const [b, s] = eb.right
                ebs.right[0].push(b)
                ebs.right[1] = s
                return ebs
              })
        ),
      f(0, _.head(as))(s)(r)().then(either.map(([b, s]) => [[b], s]))
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
  return (as) => (_.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray))
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyNonEmptyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <S, R, E, A>(
  arr: ReadonlyArray<StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
