/**
 * @since 3.0.0
 */
import type { Alt as Alt_ } from './Alt'
import type { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { Bifunctor as Bifunctor_, mapLeftDefault } from './Bifunctor'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import * as E from './Either'
import type { Endomorphism } from './Endomorphism'
import {
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither as FromEither_,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader as FromReader_,
  fromReaderK as fromReaderK_
} from './FromReader'
import {
  chainStateK as chainStateK_,
  FromState as FromState_,
  fromStateK as fromStateK_,
  get as get_,
  gets as gets_,
  modify as modify_,
  put as put_
} from './FromState'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask as FromTask_,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, Lazy, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type { IOEither } from './IOEither'
import type { Monad as Monad_ } from './Monad'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import * as R from './Reader'
import type { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { State } from './State'
import * as ST from './StateT'
import type { Task } from './Task'
import type { TaskEither } from './TaskEither'

import Either = E.Either
import Reader = R.Reader
import ReaderTaskEither = RTE.ReaderTaskEither

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
export const left: <E, S, R, A = never>(e: E) => StateReaderTaskEither<S, R, E, A> = (e) => () => RTE.left(e)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, S, R = unknown, E = never>(a: A) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ ST.of(
  RTE.Pointed
)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask = <A, S, R, E = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.rightTask(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask = <E, S, R, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.leftTask(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader = <R, A, S, E = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.rightReader(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader = <R, E, S, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.leftReader(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO = <A, S, R, E = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.rightIO(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO = <E, S, R, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> =>
  fromReaderTaskEither(RTE.leftIO(me))

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightState: <S, A, R, E = never>(
  ma: State<S, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ ST.fromState(RTE.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftState: <S, E, R, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A> = (me) => (s) =>
  RTE.left(me(s)[0])

/**
 * Less strict version of [`asksStateReaderTaskEitherK`](#asksstatereadertaskeitherk).
 *
 * @category constructors
 * @since 3.0.0
 */
export const asksStateReaderTaskEitherW = <R1, S, R2, E, A>(
  f: (r1: R1) => StateReaderTaskEither<S, R2, E, A>
): StateReaderTaskEither<S, R1 & R2, E, A> => (s) => (r) => f(r)(s)(r)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksStateReaderTaskEither: <R, S, E, A>(
  f: (r: R) => StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = asksStateReaderTaskEitherW

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <E, A, S, R>(fa: E.Either<E, A>) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ E.match(
  (e) => left(e),
  right
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A, S, E>(fa: R.Reader<R, A>) => StateReaderTaskEither<S, R, E, A> = rightReader

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, S, R, E>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A> = rightIO

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: <A, S, R, E>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A> = rightTask

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromState: <S, A, R, E>(fa: State<S, A>) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ ST.fromState(
  RTE.Pointed
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: <E, A, S, R>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  fromReaderTaskEither(RTE.fromTaskEither(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <E, A, S, R>(fa: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  fromReaderTaskEither(RTE.fromIOEither(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReaderEither: <R, E, A, S>(fa: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  fromReaderTaskEither(RTE.fromReaderEither(ma))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderTaskEither: <R, E, A, S>(
  fa: ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ ST.fromF(RTE.Functor)

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
export const local = <R2, R1>(f: (r2: R2) => R1) => <S, E, A>(
  ma: StateReaderTaskEither<S, R1, E, A>
): StateReaderTaskEither<S, R2, E, A> => flow(ma, R.local(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): (<S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>) => (...a) => fromIOEither(f(...a))

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherKW = <A, E2, B>(f: (a: A) => IOEither<E2, B>) => <S, R, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chain<A, S, R, E2, B>(fromIOEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => TaskEither<E, B>
): (<S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>) => (...a) => fromTaskEither(f(...a))

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherKW = <A, E2, B>(f: (a: A) => TaskEither<E2, B>) => <S, R, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chain<A, S, R, E2, B>(fromTaskEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainTaskEitherKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderTaskEitherK = <A extends ReadonlyArray<unknown>, R, E, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): (<S>(...a: A) => StateReaderTaskEither<S, R, E, B>) => (...a) => fromReaderTaskEither(f(...a))

/**
 * Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderTaskEitherKW = <A, R, E2, B>(f: (a: A) => ReaderTaskEither<R, E2, B>) => <S, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chain<A, S, R, E2, B>(fromReaderTaskEitherK(f)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderTaskEitherK: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainReaderTaskEitherKW

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
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ ST.map(
  RTE.Functor
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
    RTE.bimap(f, ([a, s]) => [g(a), s])
  )

/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(
  fea: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, G, A> = /*#__PURE__*/ mapLeftDefault<StateReaderTaskEitherF>(bimap)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(
  fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> = /*#__PURE__*/ ST.ap(RTE.Monad)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, S, R = unknown, E = never>(a: A) => StateReaderTaskEither<S, R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  ma: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> = /*#__PURE__*/ ST.chain(RTE.Monad)

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = /*#__PURE__*/ chain(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A> = flattenW

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW = <S, R2, E2, B>(second: () => StateReaderTaskEither<S, R2, E2, B>) => <R1, E1, A>(
  first: StateReaderTaskEither<S, R1, E1, A>
): StateReaderTaskEither<S, R1 & R2, E2, A | B> => (r) =>
  pipe(
    first(r),
    RTE.altW(() => second()(r))
  )

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <S, R, E, A>(
  second: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = altW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
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

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<StateReaderTaskEitherF> = {
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
) => <S, R, E, B>(
  fab: StateReaderTaskEither<S, R, E, (a: A) => B>
) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ flap_(Functor)

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
export const Apply: Apply_<StateReaderTaskEitherF> = {
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
export const apFirst: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ apFirst_(Apply)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirstW: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(
  first: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ apSecond_(Apply)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecondW: <S, R2, E2, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(
  first: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> = apSecond as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<StateReaderTaskEitherF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<StateReaderTaskEitherF> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<StateReaderTaskEitherF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<StateReaderTaskEitherF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromState: FromState_<StateReaderTaskEitherF> = {
  fromState
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> = /*#__PURE__*/ get_(FromState)

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> = /*#__PURE__*/ put_(FromState)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S, R, E = never>(
  f: Endomorphism<S>
) => StateReaderTaskEither<S, R, E, void> = /*#__PURE__*/ modify_(FromState)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, R, E = never, A = never>(
  f: (s: S) => A
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ gets_(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromStateK: <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => <R, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromStateK_(FromState)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E = never>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainStateK_(FromState, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<StateReaderTaskEitherF> = {
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
export const chainFirst: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  first: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<StateReaderTaskEitherF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <S, R, E>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainIOK_(
  FromIO,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(
  first: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_<StateReaderTaskEitherF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
) => <S, R, E>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(
  first: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(
  first: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ chainFirstTaskK_(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader_<StateReaderTaskEitherF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <S, R, E = never>() => StateReaderTaskEither<S, R, E, R> = /*#__PURE__*/ ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, S, E = never>(f: (r: R) => A) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ asks_(
  FromReader
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <S, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => <S, E = never>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainReaderK`](#chainReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <S, R2, E = never>(
  ma: StateReaderTaskEither<S, R2, E, A>
) => StateReaderTaskEither<S, R1 & R2, E, B> = chainReaderK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => <S, E = never>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ chainFirstReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <S, R2, E = never>(
  ma: StateReaderTaskEither<S, R2, E, A>
) => StateReaderTaskEither<S, R2, E, A> = chainFirstReaderK as any

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither_<StateReaderTaskEitherF> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(
  onNone: Lazy<E>
) => <A, S, R>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ fromOption_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainOptionK_(
  FromEither,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ chainEitherK_(
  FromEither,
  Chain
)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E1 | E2, B> = chainEitherK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = /*#__PURE__*/ chainFirstEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
) => StateReaderTaskEither<S, R, E1 | E2, A> = chainFirstEitherK as any

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, B>
  <A>(predicate: Predicate<A>): <B extends A, S, R>(b: B) => StateReaderTaskEither<S, R, A, B>
  <A>(predicate: Predicate<A>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: StateReaderTaskEither<S, R, E, B>
  ) => StateReaderTaskEither<S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
} = /*#__PURE__*/ filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1, B extends A>(
    mb: StateReaderTaskEither<S, R, E1, B>
  ) => StateReaderTaskEither<S, R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => E.Either<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> = /*#__PURE__*/ fromEitherK_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A> = /*#__PURE__*/ ST.evaluate(
  RTE.Functor
)

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S> = /*#__PURE__*/ ST.execute(
  RTE.Functor
)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => StateReaderTaskEither<S, R, E, B>
) => (
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<
  S,
  R,
  E,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = /*#__PURE__*/ bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<
  S,
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(
  Apply
)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<
  S,
  R1 & R2,
  E1 | E2,
  { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A extends ReadonlyArray<unknown>>(
  fas: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [...A, B]> = /*#__PURE__*/ apT_(Apply)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: ReadonlyNonEmptyArray<A>): StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>> => (s) => (r) => () =>
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
    f(0, _.head(as))(s)(r)().then(E.map(([b, s]) => [[b], s]))
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
