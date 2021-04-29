/**
 * @since 3.0.0
 */
import type { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import type { Either } from './Either'
import type {
  FromEither,
  FromEither1,
  FromEither2,
  FromEither2C,
  FromEither3,
  FromEither3C,
  FromEither4
} from './FromEither'
import type { FromIO, FromIO1, FromIO2, FromIO2C, FromIO3, FromIO3C, FromIO4 } from './FromIO'
import type { FromState, FromState2, FromState3, FromState3C, FromState4 } from './FromState'
import type { FromTask, FromTask1, FromTask2, FromTask2C, FromTask3, FromTask3C, FromTask4 } from './FromTask'
import type { FromThese, FromThese2, FromThese2C, FromThese3, FromThese3C, FromThese4 } from './FromThese'
import { flow, pipe } from './function'
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import type { HKT, HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import type { IO } from './IO'
import type {
  NaturalTransformation,
  NaturalTransformation11,
  NaturalTransformation12,
  NaturalTransformation22
} from './NaturalTransformation'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'
import type { Reader } from './Reader'
import type { State } from './State'
import type { Task } from './Task'
import type { These } from './These'

/**
 * @since 3.0.0
 */
export function of<F extends URIS4>(F: Pointed4<F>): <A, R, S, FR, E>(a: A) => Reader<R, Kind4<F, S, FR, E, A>>
export function of<F extends URIS3>(F: Pointed3<F>): <A, R, FR, E>(a: A) => Reader<R, Kind3<F, FR, E, A>>
export function of<F extends URIS3, E>(F: Pointed3C<F, E>): <A, R, FR>(a: A) => Reader<R, Kind3<F, FR, E, A>>
export function of<F extends URIS2>(F: Pointed2<F>): <A, R, E>(a: A) => Reader<R, Kind2<F, E, A>>
export function of<F extends URIS2, E>(F: Pointed2C<F, E>): <A, R>(a: A) => Reader<R, Kind2<F, E, A>>
export function of<F extends URIS>(F: Pointed1<F>): <A, R>(a: A) => Reader<R, Kind<F, A>>
export function of<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>>
export function of<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>> {
  return (a) => () => F.of(a)
}

/**
 * @since 3.0.0
 */
export function map<F extends URIS4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <R, S, FR, E>(fa: Reader<R, Kind4<F, S, FR, E, A>>) => Reader<R, Kind4<F, S, FR, E, B>>
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, FR, E>(fa: Reader<R, Kind3<F, FR, E, A>>) => Reader<R, Kind3<F, FR, E, B>>
export function map<F extends URIS3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <R, FR>(fa: Reader<R, Kind3<F, FR, E, A>>) => Reader<R, Kind3<F, FR, E, B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Reader<R, Kind2<F, E, A>>) => Reader<R, Kind2<F, E, B>>
export function map<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind2<F, E, A>>) => Reader<R, Kind2<F, E, B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>> {
  return (f) => (fa) => flow(fa, F.map(f))
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS4>(
  F: Apply4<F>
): <R, S, FR, E, A>(
  fa: Reader<R, Kind4<F, S, FR, E, A>>
) => <B>(fab: Reader<R, Kind4<F, S, FR, E, (a: A) => B>>) => Reader<R, Kind4<F, S, FR, E, B>>
export function ap<F extends URIS3>(
  F: Apply3<F>
): <R, FR, E, A>(
  fa: Reader<R, Kind3<F, FR, E, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, E, (a: A) => B>>) => Reader<R, Kind3<F, FR, E, B>>
export function ap<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, FR, A>(
  fa: Reader<R, Kind3<F, FR, E, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, E, (a: A) => B>>) => Reader<R, Kind3<F, FR, E, B>>
export function ap<F extends URIS2>(
  F: Apply2<F>
): <R, E, A>(
  fa: Reader<R, Kind2<F, E, A>>
) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export function ap<F extends URIS2, E>(
  F: Apply2C<F, E>
): <R, A>(fa: Reader<R, Kind2<F, E, A>>) => <B>(fab: Reader<R, Kind2<F, E, (a: A) => B>>) => Reader<R, Kind2<F, E, B>>
export function ap<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export function ap<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
export function ap<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>> {
  return (fa) => (fab) => (r) => F.ap(fa(r))(fab(r))
}

/**
 * @since 3.0.0
 */
export function chain<M extends URIS4>(
  M: Chain4<M>
): <A, R, S, FR, E, B>(
  f: (a: A) => Reader<R, Kind4<M, S, FR, E, B>>
) => (ma: Reader<R, Kind4<M, S, FR, E, A>>) => Reader<R, Kind4<M, S, FR, E, B>>
export function chain<M extends URIS3>(
  M: Chain3<M>
): <A, R, FR, E, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, E, B>>
) => (ma: Reader<R, Kind3<M, FR, E, A>>) => Reader<R, Kind3<M, FR, E, B>>
export function chain<M extends URIS3, E>(
  M: Chain3C<M, E>
): <A, R, FR, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, E, B>>
) => (ma: Reader<R, Kind3<M, FR, E, A>>) => Reader<R, Kind3<M, FR, E, B>>
export function chain<M extends URIS2>(
  M: Chain2<M>
): <A, R, E, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export function chain<M extends URIS2, E>(
  M: Chain2C<M, E>
): <A, R, B>(f: (a: A) => Reader<R, Kind2<M, E, B>>) => (ma: Reader<R, Kind2<M, E, A>>) => Reader<R, Kind2<M, E, B>>
export function chain<M extends URIS>(
  M: Chain1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export function chain<M>(
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
export function chain<M>(
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>> {
  return (f) => (ma) => (r) =>
    pipe(
      ma(r),
      M.chain((a) => f(a)(r))
    )
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function fromReader<F extends URIS4>(
  F: Pointed4<F>
): <R, A, S, FR, E>(ma: Reader<R, A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function fromReader<F extends URIS3>(
  F: Pointed3<F>
): <R, A, FR, E>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, E, A>>
export function fromReader<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <R, A, FR>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, E, A>>
export function fromReader<F extends URIS2>(F: Pointed2<F>): <R, A, E>(ma: Reader<R, A>) => Reader<R, Kind2<F, E, A>>
export function fromReader<F extends URIS2, E>(
  F: Pointed2C<F, E>
): <R, A>(ma: Reader<R, A>) => Reader<R, Kind2<F, E, A>>
export function fromReader<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
export function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>> {
  return (ma) => flow(ma, F.of)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function fromNaturalTransformation<F extends URIS2, G extends URIS2>(
  nt: NaturalTransformation22<F, G>
): <R, A, E>(f: (r: R) => Kind2<F, E, A>) => Reader<R, Kind2<G, E, A>>
export function fromNaturalTransformation<F extends URIS, G extends URIS2>(
  nt: NaturalTransformation12<F, G>
): <R, A, E>(f: (r: R) => Kind<F, A>) => Reader<R, Kind2<G, E, A>>
export function fromNaturalTransformation<F extends URIS, G extends URIS>(
  nt: NaturalTransformation11<F, G>
): <R, A>(f: (r: R) => Kind<F, A>) => Reader<R, Kind<G, A>>
export function fromNaturalTransformation<F, G>(
  nt: NaturalTransformation<F, G>
): <R, A>(f: (r: R) => HKT<F, A>) => Reader<R, HKT<G, A>>
export function fromNaturalTransformation<F, G>(
  nt: NaturalTransformation<F, G>
): <R, A>(f: (r: R) => HKT<F, A>) => Reader<R, HKT<G, A>> {
  return (f) => flow(f, nt)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asksEitherK<F extends URIS4>(
  F: FromEither4<F>
): <R, E, A, S, FR>(f: (r: R) => Either<E, A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function asksEitherK<F extends URIS3>(
  F: FromEither3<F>
): <R, E, A, FR>(f: (r: R) => Either<E, A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksEitherK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): <R, A, FR>(f: (r: R) => Either<E, A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksEitherK<F extends URIS2>(
  F: FromEither2<F>
): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, Kind2<F, E, A>>
export function asksEitherK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): <R, A>(f: (r: R) => Either<E, A>) => Reader<R, Kind2<F, E, A>>
export function asksEitherK<F extends URIS>(
  F: FromEither1<F>
): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, Kind<F, A>>
export function asksEitherK<F>(F: FromEither<F>): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, HKT2<F, E, A>>
export function asksEitherK<F>(F: FromEither<F>): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, HKT2<F, E, A>> {
  return (f) => flow(f, F.fromEither)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asksIOK<F extends URIS4>(
  F: FromIO4<F>
): <R, A, S, FR, E>(f: (r: R) => IO<A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function asksIOK<F extends URIS3>(
  F: FromIO3<F>
): <R, A, FR, E>(f: (r: R) => IO<A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksIOK<F extends URIS3, E>(
  F: FromIO3C<F, E>
): <R, A, FR>(f: (r: R) => IO<A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksIOK<F extends URIS2>(F: FromIO2<F>): <R, A, E>(f: (r: R) => IO<A>) => Reader<R, Kind2<F, E, A>>
export function asksIOK<F extends URIS2, E>(F: FromIO2C<F, E>): <R, A>(f: (r: R) => IO<A>) => Reader<R, Kind2<F, E, A>>
export function asksIOK<F extends URIS>(F: FromIO1<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, Kind<F, A>>
export function asksIOK<F>(F: FromIO<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, HKT<F, A>>
export function asksIOK<F>(F: FromIO<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, HKT<F, A>> {
  return (f) => flow(f, F.fromIO)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asksStateK<F extends URIS4>(
  F: FromState4<F>
): <R, S, A, FR, E>(f: (r: R) => State<S, A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function asksStateK<F extends URIS3>(
  F: FromState3<F>
): <R, S, A, E>(f: (r: R) => State<S, A>) => Reader<R, Kind3<F, S, E, A>>
export function asksStateK<F extends URIS3, E>(
  F: FromState3C<F, E>
): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, Kind3<F, S, E, A>>
export function asksStateK<F extends URIS2>(
  F: FromState2<F>
): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, Kind2<F, S, A>>
export function asksStateK<F>(F: FromState<F>): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, HKT2<F, S, A>>
export function asksStateK<F>(F: FromState<F>): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, HKT2<F, S, A>> {
  return (f) => flow(f, F.fromState)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asksTaskK<F extends URIS4>(
  F: FromTask4<F>
): <R, A, S, FR, E>(f: (r: R) => Task<A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function asksTaskK<F extends URIS3>(
  F: FromTask3<F>
): <R, A, FR, E>(f: (r: R) => Task<A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksTaskK<F extends URIS3, E>(
  F: FromTask3C<F, E>
): <R, A, FR>(f: (r: R) => Task<A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksTaskK<F extends URIS2>(
  F: FromTask2<F>
): <R, A, E>(f: (r: R) => Task<A>) => Reader<R, Kind2<F, E, A>>
export function asksTaskK<F extends URIS2, E>(
  F: FromTask2C<F, E>
): <R, A>(f: (r: R) => Task<A>) => Reader<R, Kind2<F, E, A>>
export function asksTaskK<F extends URIS>(F: FromTask1<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, Kind<F, A>>
export function asksTaskK<F>(F: FromTask<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, HKT<F, A>>
export function asksTaskK<F>(F: FromTask<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, HKT<F, A>> {
  return (f) => flow(f, F.fromTask)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asksTheseK<F extends URIS4>(
  F: FromThese4<F>
): <R, E, A, S, FR>(f: (r: R) => These<E, A>) => Reader<R, Kind4<F, S, FR, E, A>>
export function asksTheseK<F extends URIS3>(
  F: FromThese3<F>
): <R, E, A, FR>(f: (r: R) => These<E, A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksTheseK<F extends URIS3, E>(
  F: FromThese3C<F, E>
): <R, A, FR>(f: (r: R) => These<E, A>) => Reader<R, Kind3<F, FR, E, A>>
export function asksTheseK<F extends URIS2>(
  F: FromThese2<F>
): <R, E, A>(f: (r: R) => These<E, A>) => Reader<R, Kind2<F, E, A>>
export function asksTheseK<F extends URIS2, E>(
  F: FromThese2C<F, E>
): <R, A>(f: (r: R) => These<E, A>) => Reader<R, Kind2<F, E, A>>
export function asksTheseK<F>(F: FromThese<F>): <R, E, A>(f: (r: R) => These<E, A>) => Reader<R, HKT2<F, E, A>>
export function asksTheseK<F>(F: FromThese<F>): <R, E, A>(f: (r: R) => These<E, A>) => Reader<R, HKT2<F, E, A>> {
  return (f) => flow(f, F.fromThese)
}
