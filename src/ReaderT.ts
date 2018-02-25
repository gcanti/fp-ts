import { HKT, URIS, URIS2, Type, Type2 } from './HKT'
import { Functor, Functor2, Functor1 } from './Functor'
import { Applicative, Applicative1, Applicative2 } from './Applicative'
import { Chain, Chain1, Chain2 } from './Chain'
import { Monad, Monad1, Monad2 } from './Monad'

export interface ReaderT<M> {
  map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  of: <E, A>(a: A) => (e: E) => HKT<M, A>
  ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
}

export interface ReaderT1<M extends URIS> {
  map: <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  of: <E, A>(a: A) => (e: E) => Type<M, A>
  ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => Type<M, B>
  chain: <E, A, B>(f: (a: A) => (e: E) => Type<M, B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
}

export interface ReaderT2<M extends URIS2> {
  map: <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<M, L, A>) => (e: E) => Type2<M, L, B>
  of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  ap: <L, E, A, B>(fab: (e: E) => Type2<M, L, (a: A) => B>, fa: (e: E) => Type2<M, L, A>) => (e: E) => Type2<M, L, B>
  chain: <L, E, A, B>(f: (a: A) => (e: E) => Type2<M, L, B>, fa: (e: E) => Type2<M, L, A>) => (e: E) => Type2<M, L, B>
}

export function map<F extends URIS2>(
  F: Functor2<F>
): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.map(fa(e), f)
}

export function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Type2<F, L, A>
export function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Type<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
/** @function */
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> {
  return <A>(a: A) => <E>(e: E) => F.of(a)
}

export function ap<F extends URIS2>(
  F: Applicative2<F>
): <L, E, A, B>(fab: (e: E) => Type2<F, L, (a: A) => B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function ap<F extends URIS>(
  F: Applicative1<F>
): <E, A, B>(fab: (e: E) => Type<F, (a: A) => B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (fab, fa) => e => F.ap(fab(e), fa(e))
}

export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, E, A, B>(f: (a: A) => (e: E) => Type2<F, L, B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function chain<F extends URIS>(
  F: Chain1<F>
): <E, A, B>(f: (a: A) => (e: E) => Type<F, B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.chain(fa(e), a => f(a)(e))
}

export function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Type2<F, L, E>
export function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Type<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
/** @function */
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> {
  return () => F.of
}

export function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Type2<F, L, A>
export function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Type<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
/** @function */
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> {
  return f => e => F.of(f(e))
}

export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M>
/** @function */
export function getReaderT<M>(M: Monad<M>): ReaderT<M> {
  return {
    map: map(M),
    of: of(M),
    ap: ap(M),
    chain: chain(M)
  }
}
