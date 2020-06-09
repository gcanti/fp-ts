/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Bifunctor4 } from './Bifunctor'
import { Either } from './Either'
import { identity, pipe, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad4 } from './Monad'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Option } from './Option'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import { Task } from './Task'
import { TaskEither } from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import ReaderTaskEither = RTE.ReaderTaskEither

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'StateReaderTaskEither'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: StateReaderTaskEither<S, R, E, A>
  }
}

/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export function left<S, R, E = never, A = never>(e: E): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.left(e))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A> = (a) => (s) =>
  RTE.right([a, s])

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightTask(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftTask(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromTaskEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightReader(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftReader(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromIOEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromReaderEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightIO(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftIO(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> = (sa) => (
  s
) => RTE.right(sa(s))

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftState<S, R, E = never, A = never>(me: State<S, E>): StateReaderTaskEither<S, R, E, A> {
  return (s) => RTE.left(me(s)[0])
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> = (
  fa
) => (s) =>
  pipe(
    fa,
    RTE.map((a) => [a, s])
  )

/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> = () => (s) => RTE.right([s, s])

/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> = (s) => () =>
  RTE.right([undefined, s])

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void> = (f) => (s) =>
  RTE.right([undefined, f(s)])

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> = (f) => (s) =>
  RTE.right([f(s), s])

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <S, R, E, A>(ma: Either<E, A>) => StateReaderTaskEither<S, R, E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A> = (
  onNone
) => (ma) => (ma._tag === 'None' ? left(onNone()) : right(ma.value))

/**
 * @category constructors
 * @since 2.4.4
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    a: A
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <S, R>(a: A): StateReaderTaskEither<S, R, E, A> =>
  predicate(a) ? right(a) : left(onFalse(a))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromEitherK(f))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromIOEitherK(f))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromTaskEither(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromTaskEitherK(f))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromReaderTaskEither(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function chainReaderTaskEitherK<R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> {
  return chain<any, any, E, A, B>(fromReaderTaskEitherK(f))
}

/**
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainEitherK as any

/**
 * @category combinators
 * @since 2.6.1
 */
export const chainTaskEitherKW: <D, A, B>(
  f: (a: A) => TaskEither<D, B>
) => <S, R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainTaskEitherK as any

/**
 * @category combinators
 * @since 2.6.1
 */
export const chainReaderTaskEitherKW: <R, D, A, B>(
  f: (a: A) => ReaderTaskEither<R, D, B>
) => <S, E>(
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E | D, B> = chainReaderTaskEitherK as any

/**
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW: <R, D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E | D, B> = chainIOEitherK as any

/**
 * @category combinators
 * @since 2.4.4
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <S, R>(
  ma: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, A> =>
  pipe(
    ma,
    chain((a) => (predicate(a) ? right(a) : left(onFalse(a))))
  )

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) => (fa) => (s1) =>
  pipe(
    fa(s1),
    RTE.map(([a, s2]) => [f(a), s2])
  )

/**
 * @category Bifunctor
 * @since 2.6.2
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B> = (f, g) => (fa) =>
  bimap_(fa, f, g)

/**
 * @category Bifunctor
 * @since 2.6.2
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A> = (f) => (fa) =>
  mapLeft_(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B> = (fa) => (fab) => (
  s1
) =>
  pipe(
    fab(s1),
    RTE.chain(([f, s2]) =>
      pipe(
        fa(s2),
        RTE.map(([a, s3]) => [f(a), s3])
      )
    )
  )

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst = <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(
  fa: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <S, R, E, B>(fb: StateReaderTaskEither<S, R, E, B>) => <A>(
  fa: StateReaderTaskEither<S, R, E, A>
): StateReaderTaskEither<S, R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = (f) => (ma) => (s1) =>
  pipe(
    ma(s1),
    RTE.chain(([a, s2]) => f(a)(s2))
  )

/**
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <S, Q, D, A, B>(
  f: (a: A) => StateReaderTaskEither<S, Q, D, B>
) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R & Q, E | D, B> = chain as any

/**
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Alt
 * @since 2.6.2
 */
export const alt: <S, R, E, A>(
  that: () => StateReaderTaskEither<S, R, E, A>
) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = (that) => (fa) => (s) =>
  pipe(
    fa(s),
    RTE.alt(() => that()(s))
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const map_: Monad4<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const ap_: Monad4<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const chain_: Monad4<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
const of = right
/* istanbul ignore next */
const alt_: <S, R, E, A>(
  fx: StateReaderTaskEither<S, R, E, A>,
  fy: () => StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A> = (fx, fy) => (s) =>
  pipe(
    fx(s),
    RTE.alt(() => fy()(s))
  )

const bimap_: <S, R, E, A, G, B>(
  fea: StateReaderTaskEither<S, R, E, A>,
  f: (e: E) => G,
  g: (a: A) => B
) => StateReaderTaskEither<S, R, G, B> = (fea, f, g) => (s) =>
  pipe(
    fea(s),
    RTE.bimap(f, ([a, s]) => [g(a), s])
  )

const mapLeft_: <S, R, E, A, G>(
  fea: StateReaderTaskEither<S, R, E, A>,
  f: (e: E) => G
) => StateReaderTaskEither<S, R, G, A> = (fea, f) => (s) => pipe(fea(s), RTE.mapLeft(f))

/**
 * @since 2.0.0
 */
export const stateReaderTaskEither: Monad4<URI> & Bifunctor4<URI> & Alt4<URI> & MonadTask4<URI> & MonadThrow4<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_,
  bimap: bimap_,
  mapLeft: mapLeft_,
  alt: alt_,
  fromIO: rightIO,
  fromTask: rightTask,
  throwError: left
}

/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = {
  URI,
  map: map_,
  of,
  ap: (fab, fa) =>
    pipe(
      fab,
      chain((f) => pipe(fa, map(f)))
    ),
  chain: chain_,
  bimap: bimap_,
  mapLeft: mapLeft_,
  alt: alt_,
  fromIO: rightIO,
  fromTask: rightTask,
  throwError: left
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>> {
  return ma(s)(r)()
}
/* tslint:enable:readonly-array */

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A> = (
  fsa,
  s
) =>
  pipe(
    fsa(s),
    RTE.map(([a]) => a)
  )

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S> = (
  fsa,
  s
) =>
  pipe(
    fsa(s),
    RTE.map(([_, s]) => s)
  )
