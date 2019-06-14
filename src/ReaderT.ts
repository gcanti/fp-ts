import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Chain, Chain1, Chain2, Chain3 } from './Chain'
import { Functor, Functor1, Functor2, Functor3 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { Reader } from './Reader'

export interface ReaderT2v<M> {
  readonly map: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => B) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => (e: E) => HKT<M, B>) => (e: E) => HKT<M, B>
}

export interface ReaderT2v1<M extends URIS> {
  readonly map: <E, A, B>(fa: (e: E) => Kind<M, A>, f: (a: A) => B) => (e: E) => Kind<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Kind<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Kind<M, (a: A) => B>, fa: (e: E) => Kind<M, A>) => (e: E) => Kind<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => Kind<M, A>, f: (a: A) => (e: E) => Kind<M, B>) => (e: E) => Kind<M, B>
}

export interface ReaderT2v2<M extends URIS2> {
  readonly map: <L, E, A, B>(fa: (e: E) => Kind2<M, L, A>, f: (a: A) => B) => (e: E) => Kind2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Kind2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Kind2<M, L, (a: A) => B>,
    fa: (e: E) => Kind2<M, L, A>
  ) => (e: E) => Kind2<M, L, B>
  readonly chain: <L, E, A, B>(
    fa: (e: E) => Kind2<M, L, A>,
    f: (a: A) => (e: E) => Kind2<M, L, B>
  ) => (e: E) => Kind2<M, L, B>
}

export interface ReaderT2v3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(fa: (e: E) => Kind3<M, U, L, A>, f: (a: A) => B) => (e: E) => Kind3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Kind3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Kind3<M, U, L, (a: A) => B>,
    fa: (e: E) => Kind3<M, U, L, A>
  ) => (e: E) => Kind3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    fa: (e: E) => Kind3<M, U, L, A>,
    f: (a: A) => (e: E) => Kind3<M, U, L, B>
  ) => (e: E) => Kind3<M, U, L, B>
}

/**
 * @since 1.2.0
 */
export function fromReader<F extends URIS3>(
  F: Applicative3<F>
): <E, U, L, A>(fa: Reader<E, A>) => (e: E) => Kind3<F, U, L, A>
export function fromReader<F extends URIS2>(F: Applicative2<F>): <E, L, A>(fa: Reader<E, A>) => (e: E) => Kind2<F, L, A>
export function fromReader<F extends URIS>(F: Applicative1<F>): <E, A>(fa: Reader<E, A>) => (e: E) => Kind<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A> {
  return fa => e => F.of(fa.run(e))
}

/**
 * @since 1.14.0
 */
export function getReaderT2v<M extends URIS3>(M: Monad3<M>): ReaderT2v3<M>
export function getReaderT2v<M extends URIS2>(M: Monad2<M>): ReaderT2v2<M>
export function getReaderT2v<M extends URIS>(M: Monad1<M>): ReaderT2v1<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M> {
  return {
    map: (fa, f) => e => M.map(fa(e), f),
    of: a => () => M.of(a),
    ap: (fab, fa) => e => M.ap(fab(e), fa(e)),
    chain: (fa, f) => e => M.chain(fa(e), a => f(a)(e))
  }
}

/** @deprecated */
export interface ReaderT<M> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
}

/** @deprecated */
export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => Kind<M, A>) => (e: E) => Kind<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Kind<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Kind<M, (a: A) => B>, fa: (e: E) => Kind<M, A>) => (e: E) => Kind<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => Kind<M, B>, fa: (e: E) => Kind<M, A>) => (e: E) => Kind<M, B>
}

/** @deprecated */
export interface ReaderT2<M extends URIS2> {
  readonly map: <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Kind2<M, L, A>) => (e: E) => Kind2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Kind2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Kind2<M, L, (a: A) => B>,
    fa: (e: E) => Kind2<M, L, A>
  ) => (e: E) => Kind2<M, L, B>
  readonly chain: <L, E, A, B>(
    f: (a: A) => (e: E) => Kind2<M, L, B>,
    fa: (e: E) => Kind2<M, L, A>
  ) => (e: E) => Kind2<M, L, B>
}

/** @deprecated */
export interface ReaderT3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Kind3<M, U, L, A>) => (e: E) => Kind3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Kind3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Kind3<M, U, L, (a: A) => B>,
    fa: (e: E) => Kind3<M, U, L, A>
  ) => (e: E) => Kind3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    f: (a: A) => (e: E) => Kind3<M, U, L, B>,
    fa: (e: E) => Kind3<M, U, L, A>
  ) => (e: E) => Kind3<M, U, L, B>
}

/**
 * Use `map2v` instead
 * @since 1.0.0
 * @deprecated
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Kind3<F, U, L, A>) => (e: E) => Kind3<F, U, L, B>
/** @deprecated */
export function map<F extends URIS2>(
  F: Functor2<F>
): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Kind2<F, L, A>) => (e: E) => Kind2<F, L, B>
/** @deprecated */
export function map<F extends URIS>(
  F: Functor1<F>
): <E, A, B>(f: (a: A) => B, fa: (e: E) => Kind<F, A>) => (e: E) => Kind<F, B>
/** @deprecated */
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @deprecated */
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.map(fa(e), f)
}

/**
 * Use `getReaderT2v` instead
 * @since 1.0.0
 * @deprecated
 */
export function chain<F extends URIS3>(
  F: Chain3<F>
): <U, L, E, A, B>(
  f: (a: A) => (e: E) => Kind3<F, U, L, B>,
  fa: (e: E) => Kind3<F, U, L, A>
) => (e: E) => Kind3<F, U, L, B>
/** @deprecated */
export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, E, A, B>(f: (a: A) => (e: E) => Kind2<F, L, B>, fa: (e: E) => Kind2<F, L, A>) => (e: E) => Kind2<F, L, B>
/** @deprecated */
export function chain<F extends URIS>(
  F: Chain1<F>
): <E, A, B>(f: (a: A) => (e: E) => Kind<F, B>, fa: (e: E) => Kind<F, A>) => (e: E) => Kind<F, B>
/** @deprecated */
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @deprecated */
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.chain(fa(e), a => f(a)(e))
}

/**
 * Use `getReaderT2v` instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getReaderT<M>(M: Monad<M>): ReaderT<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getReaderT<M>(M: Monad<M>): ReaderT<M> {
  return {
    // tslint:disable-next-line: deprecation
    map: map(M),
    // tslint:disable-next-line: deprecation
    of: of(M),
    // tslint:disable-next-line: deprecation
    ap: ap(M),
    // tslint:disable-next-line: deprecation
    chain: chain(M)
  }
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(a: A) => (e: E) => Kind3<F, U, L, A>
/** @deprecated */
export function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Kind2<F, L, A>
/** @deprecated */
export function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Kind<F, A>
/** @deprecated */
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
/** @deprecated */
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> {
  return <A>(a: A) => () => F.of(a)
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function ap<F extends URIS3>(
  F: Applicative3<F>
): <U, L, E, A, B>(
  fab: (e: E) => Kind3<F, U, L, (a: A) => B>,
  fa: (e: E) => Kind3<F, U, L, A>
) => (e: E) => Kind3<F, U, L, B>
/** @deprecated */
export function ap<F extends URIS2>(
  F: Applicative2<F>
): <L, E, A, B>(fab: (e: E) => Kind2<F, L, (a: A) => B>, fa: (e: E) => Kind2<F, L, A>) => (e: E) => Kind2<F, L, B>
/** @deprecated */
export function ap<F extends URIS>(
  F: Applicative1<F>
): <E, A, B>(fab: (e: E) => Kind<F, (a: A) => B>, fa: (e: E) => Kind<F, A>) => (e: E) => Kind<F, B>
/** @deprecated */
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @deprecated */
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (fab, fa) => e => F.ap(fab(e), fa(e))
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function ask<F extends URIS3>(F: Applicative3<F>): <U, L, E>() => (e: E) => Kind3<F, U, L, E>
/** @deprecated */
export function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Kind2<F, L, E>
/** @deprecated */
export function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Kind<F, E>
/** @deprecated */
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
/** @deprecated */
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> {
  return () => F.of
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function asks<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(f: (e: E) => A) => (e: E) => Kind3<F, U, L, A>
/** @deprecated */
export function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Kind2<F, L, A>
/** @deprecated */
export function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Kind<F, A>
/** @deprecated */
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
/** @deprecated */
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> {
  return f => e => F.of(f(e))
}
