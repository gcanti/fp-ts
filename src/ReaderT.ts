/**
 * @since 3.0.0
 */
import type { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import { Either } from './Either'
import {
  FromEither,
  FromEither1,
  FromEither2,
  FromEither2C,
  FromEither3,
  FromEither3C,
  FromEither4
} from './FromEither'
import { FromIO, FromIO1, FromIO2, FromIO2C, FromIO3, FromIO3C, FromIO4 } from './FromIO'
import { FromReader, FromReader2, FromReader3, FromReader3C, FromReader4 } from './FromReader'
import { FromState, FromState2, FromState3, FromState3C, FromState4 } from './FromState'
import { FromTask, FromTask1, FromTask2, FromTask2C, FromTask3, FromTask3C, FromTask4 } from './FromTask'
import { flow, pipe } from './function'
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import type { HKT, HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { IO } from './IO'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'
import type { Reader } from './Reader'
import { State } from './State'
import { Task } from './Task'

/**
 * @since 3.0.0
 */
export function of<F extends URIS4>(F: Pointed4<F>): <A, R, S, FR, FE>(a: A) => Reader<R, Kind4<F, S, FR, FE, A>>
export function of<F extends URIS3>(F: Pointed3<F>): <A, R, FR, FE>(a: A) => Reader<R, Kind3<F, FR, FE, A>>
export function of<F extends URIS3, FE>(F: Pointed3C<F, FE>): <A, R, FR>(a: A) => Reader<R, Kind3<F, FR, FE, A>>
export function of<F extends URIS2>(F: Pointed2<F>): <A, R, FE>(a: A) => Reader<R, Kind2<F, FE, A>>
export function of<F extends URIS2, FE>(F: Pointed2C<F, FE>): <A, R>(a: A) => Reader<R, Kind2<F, FE, A>>
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
): <A, B>(f: (a: A) => B) => <R, S, FR, FE>(fa: Reader<R, Kind4<F, S, FR, FE, A>>) => Reader<R, Kind4<F, S, FR, FE, B>>
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, FR, FE>(fa: Reader<R, Kind3<F, FR, FE, A>>) => Reader<R, Kind3<F, FR, FE, B>>
export function map<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(f: (a: A) => B) => <R, FR>(fa: Reader<R, Kind3<F, FR, FE, A>>) => Reader<R, Kind3<F, FR, FE, B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export function map<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
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
): <R, S, FR, FE, A>(
  fa: Reader<R, Kind4<F, S, FR, FE, A>>
) => <B>(fab: Reader<R, Kind4<F, S, FR, FE, (a: A) => B>>) => Reader<R, Kind4<F, S, FR, FE, B>>
export function ap<F extends URIS3>(
  F: Apply3<F>
): <R, FR, FE, A>(
  fa: Reader<R, Kind3<F, FR, FE, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, FE, (a: A) => B>>) => Reader<R, Kind3<F, FR, FE, B>>
export function ap<F extends URIS3, FE>(
  F: Apply3C<F, FE>
): <R, FR, A>(
  fa: Reader<R, Kind3<F, FR, FE, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, FE, (a: A) => B>>) => Reader<R, Kind3<F, FR, FE, B>>
export function ap<F extends URIS2>(
  F: Apply2<F>
): <R, FE, A>(
  fa: Reader<R, Kind2<F, FE, A>>
) => <B>(fab: Reader<R, Kind2<F, FE, (a: A) => B>>) => Reader<R, Kind2<F, FE, B>>
export function ap<F extends URIS2, FE>(
  F: Apply2C<F, FE>
): <R, A>(
  fa: Reader<R, Kind2<F, FE, A>>
) => <B>(fab: Reader<R, Kind2<F, FE, (a: A) => B>>) => Reader<R, Kind2<F, FE, B>>
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
): <A, R, S, FR, FE, B>(
  f: (a: A) => Reader<R, Kind4<M, S, FR, FE, B>>
) => (ma: Reader<R, Kind4<M, S, FR, FE, A>>) => Reader<R, Kind4<M, S, FR, FE, B>>
export function chain<M extends URIS3>(
  M: Chain3<M>
): <A, R, FR, FE, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, FE, B>>
) => (ma: Reader<R, Kind3<M, FR, FE, A>>) => Reader<R, Kind3<M, FR, FE, B>>
export function chain<M extends URIS3, FE>(
  M: Chain3C<M, FE>
): <A, R, FR, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, FE, B>>
) => (ma: Reader<R, Kind3<M, FR, FE, A>>) => Reader<R, Kind3<M, FR, FE, B>>
export function chain<M extends URIS2>(
  M: Chain2<M>
): <A, R, FE, B>(
  f: (a: A) => Reader<R, Kind2<M, FE, B>>
) => (ma: Reader<R, Kind2<M, FE, A>>) => Reader<R, Kind2<M, FE, B>>
export function chain<M extends URIS2, FE>(
  M: Chain2C<M, FE>
): <A, R, B>(f: (a: A) => Reader<R, Kind2<M, FE, B>>) => (ma: Reader<R, Kind2<M, FE, A>>) => Reader<R, Kind2<M, FE, B>>
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

/**
 * @since 3.0.0
 */
export function fromReader<F extends URIS4>(
  F: Pointed4<F>
): <R, A, S, FR, FE>(ma: Reader<R, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function fromReader<F extends URIS3>(
  F: Pointed3<F>
): <R, A, FR, FE>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function fromReader<F extends URIS3, FE>(
  F: Pointed3C<F, FE>
): <R, A, FR>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function fromReader<F extends URIS2>(F: Pointed2<F>): <R, A, FE>(ma: Reader<R, A>) => Reader<R, Kind2<F, FE, A>>
export function fromReader<F extends URIS2, FE>(
  F: Pointed2C<F, FE>
): <R, A>(ma: Reader<R, A>) => Reader<R, Kind2<F, FE, A>>
export function fromReader<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
export function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>> {
  return (ma) => flow(ma, F.of)
}

export function asksEitherK<F extends URIS4>(
  F: FromEither4<F>
): <R, FE, A, S, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function asksEitherK<F extends URIS3>(
  F: FromEither3<F>
): <R, FE, A, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksEitherK<F extends URIS3, FE>(
  F: FromEither3C<F, FE>
): <R, A, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksEitherK<F extends URIS2>(
  F: FromEither2<F>
): <R, FE, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind2<F, FE, A>>
export function asksEitherK<F extends URIS2, FE>(
  F: FromEither2C<F, FE>
): <R, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind2<F, FE, A>>
export function asksEitherK<F extends URIS>(
  F: FromEither1<F>
): <R, FE, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind<F, A>>
export function asksEitherK<F>(F: FromEither<F>): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, HKT2<F, E, A>>
export function asksEitherK<F>(F: FromEither<F>): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, HKT2<F, E, A>> {
  return (f) => flow(f, F.fromEither)
}

export function asksIOK<F extends URIS4>(
  F: FromIO4<F>
): <R, A, S, FR, FE>(f: (r: R) => IO<A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function asksIOK<F extends URIS3>(
  F: FromIO3<F>
): <R, A, FR, FE>(f: (r: R) => IO<A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksIOK<F extends URIS3, FE>(
  F: FromIO3C<F, FE>
): <R, A, FR>(f: (r: R) => IO<A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksIOK<F extends URIS2>(F: FromIO2<F>): <R, A, FE>(f: (r: R) => IO<A>) => Reader<R, Kind2<F, FE, A>>
export function asksIOK<F extends URIS2, FE>(
  F: FromIO2C<F, FE>
): <R, A>(f: (r: R) => IO<A>) => Reader<R, Kind2<F, FE, A>>
export function asksIOK<F extends URIS>(F: FromIO1<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, Kind<F, A>>
export function asksIOK<F>(F: FromIO<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, HKT<F, A>>
export function asksIOK<F>(F: FromIO<F>): <R, A>(f: (r: R) => IO<A>) => Reader<R, HKT<F, A>> {
  return (f) => flow(f, F.fromIO)
}

export function asksReaderK<F extends URIS4>(
  F: FromReader4<F>
): <R, FR, A, S, FE>(f: (r: R) => Reader<FR, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function asksReaderK<F extends URIS3>(
  F: FromReader3<F>
): <R, FR, A, FE>(f: (r: R) => Reader<FR, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksReaderK<F extends URIS3, FE>(
  F: FromReader3C<F, FE>
): <R, FR, A>(f: (r: R) => Reader<FR, A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksReaderK<F extends URIS2>(
  F: FromReader2<F>
): <R, FR, A>(f: (r: R) => Reader<FR, A>) => Reader<R, Kind2<F, FR, A>>
export function asksReaderK<F>(F: FromReader<F>): <R, FR, A>(f: (r: R) => Reader<FR, A>) => Reader<R, HKT2<F, FR, A>>
export function asksReaderK<F>(F: FromReader<F>): <R, FR, A>(f: (r: R) => Reader<FR, A>) => Reader<R, HKT2<F, FR, A>> {
  return (f) => flow(f, F.fromReader)
}

export function asksStateK<F extends URIS4>(
  F: FromState4<F>
): <R, S, A, FR, FE>(f: (r: R) => State<S, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function asksStateK<F extends URIS3>(
  F: FromState3<F>
): <R, S, A, FE>(f: (r: R) => State<S, A>) => Reader<R, Kind3<F, S, FE, A>>
export function asksStateK<F extends URIS3, FE>(
  F: FromState3C<F, FE>
): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, Kind3<F, S, FE, A>>
export function asksStateK<F extends URIS2>(
  F: FromState2<F>
): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, Kind2<F, S, A>>
export function asksStateK<F>(F: FromState<F>): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, HKT2<F, S, A>>
export function asksStateK<F>(F: FromState<F>): <R, S, A>(f: (r: R) => State<S, A>) => Reader<R, HKT2<F, S, A>> {
  return (f) => flow(f, F.fromState)
}

export function asksTaskK<F extends URIS4>(
  F: FromTask4<F>
): <R, A, S, FR, FE>(f: (r: R) => Task<A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export function asksTaskK<F extends URIS3>(
  F: FromTask3<F>
): <R, A, FR, FE>(f: (r: R) => Task<A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksTaskK<F extends URIS3, FE>(
  F: FromTask3C<F, FE>
): <R, A, FR>(f: (r: R) => Task<A>) => Reader<R, Kind3<F, FR, FE, A>>
export function asksTaskK<F extends URIS2>(
  F: FromTask2<F>
): <R, A, FE>(f: (r: R) => Task<A>) => Reader<R, Kind2<F, FE, A>>
export function asksTaskK<F extends URIS2, FE>(
  F: FromTask2C<F, FE>
): <R, A>(f: (r: R) => Task<A>) => Reader<R, Kind2<F, FE, A>>
export function asksTaskK<F extends URIS>(F: FromTask1<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, Kind<F, A>>
export function asksTaskK<F>(F: FromTask<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, HKT<F, A>>
export function asksTaskK<F>(F: FromTask<F>): <R, A>(f: (r: R) => Task<A>) => Reader<R, HKT<F, A>> {
  return (f) => flow(f, F.fromTask)
}
