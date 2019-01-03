import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Chain, Chain1, Chain2, Chain3 } from './Chain'
import { Functor, Functor1, Functor2, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { Reader } from './Reader'

export interface ReaderT<M> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
}

export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => Type<M, B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
}

export interface ReaderT2<M extends URIS2> {
  readonly map: <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<M, L, A>) => (e: E) => Type2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Type2<M, L, (a: A) => B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
  readonly chain: <L, E, A, B>(
    f: (a: A) => (e: E) => Type2<M, L, B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
}

export interface ReaderT3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type3<M, U, L, A>) => (e: E) => Type3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Type3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Type3<M, U, L, (a: A) => B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    f: (a: A) => (e: E) => Type3<M, U, L, B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
}

/**
 * @function
 * @since 1.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type3<F, U, L, A>) => (e: E) => Type3<F, U, L, B>
export function map<F extends URIS2>(
  F: Functor2<F>
): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.map(fa(e), f)
}

/**
 * @function
 * @since 1.0.0
 */
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(a: A) => (e: E) => Type3<F, U, L, A>
export function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Type2<F, L, A>
export function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Type<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> {
  return <A>(a: A) => () => F.of(a)
}

/**
 * @function
 * @since 1.0.0
 */
export function ap<F extends URIS3>(
  F: Applicative3<F>
): <U, L, E, A, B>(
  fab: (e: E) => Type3<F, U, L, (a: A) => B>,
  fa: (e: E) => Type3<F, U, L, A>
) => (e: E) => Type3<F, U, L, B>
export function ap<F extends URIS2>(
  F: Applicative2<F>
): <L, E, A, B>(fab: (e: E) => Type2<F, L, (a: A) => B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function ap<F extends URIS>(
  F: Applicative1<F>
): <E, A, B>(fab: (e: E) => Type<F, (a: A) => B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (fab, fa) => e => F.ap(fab(e), fa(e))
}

/**
 * @function
 * @since 1.0.0
 */
export function chain<F extends URIS3>(
  F: Chain3<F>
): <U, L, E, A, B>(
  f: (a: A) => (e: E) => Type3<F, U, L, B>,
  fa: (e: E) => Type3<F, U, L, A>
) => (e: E) => Type3<F, U, L, B>
export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, E, A, B>(f: (a: A) => (e: E) => Type2<F, L, B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function chain<F extends URIS>(
  F: Chain1<F>
): <E, A, B>(f: (a: A) => (e: E) => Type<F, B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.chain(fa(e), a => f(a)(e))
}

/**
 * @function
 * @since 1.0.0
 */
export function ask<F extends URIS3>(F: Applicative3<F>): <U, L, E>() => (e: E) => Type3<F, U, L, E>
export function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Type2<F, L, E>
export function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Type<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> {
  return () => F.of
}

/**
 * @function
 * @since 1.0.0
 */
export function asks<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(f: (e: E) => A) => (e: E) => Type3<F, U, L, A>
export function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Type2<F, L, A>
export function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Type<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> {
  return f => e => F.of(f(e))
}

/**
 * @function
 * @since 1.2.0
 */
export function fromReader<F extends URIS3>(
  F: Applicative3<F>
): <E, U, L, A>(fa: Reader<E, A>) => (e: E) => Type3<F, U, L, A>
export function fromReader<F extends URIS2>(F: Applicative2<F>): <E, L, A>(fa: Reader<E, A>) => (e: E) => Type2<F, L, A>
export function fromReader<F extends URIS>(F: Applicative1<F>): <E, A>(fa: Reader<E, A>) => (e: E) => Type<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A> {
  return fa => e => F.of(fa.run(e))
}

/**
 * @function
 * @since 1.0.0
 */
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M> {
  return {
    map: map(M),
    of: of(M),
    ap: ap(M),
    chain: chain(M)
  }
}
