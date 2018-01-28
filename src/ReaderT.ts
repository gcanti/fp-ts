import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Chain } from './Chain'
import { Monad } from './Monad'

export interface ReaderT<M> {
  map<E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>): (e: E) => HKT<M, B>
  of<E, A>(a: A): (e: E) => HKT<M, A>
  ap<E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>): (e: E) => HKT<M, B>
  chain<E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>): (e: E) => HKT<M, B>
}

export interface ReaderT1<M extends HKTS> {
  map<E, A, B>(f: (a: A) => B, fa: (e: E) => HKTAs<M, A>): (e: E) => HKTAs<M, B>
  of<E, A>(a: A): (e: E) => HKTAs<M, A>
  ap<E, A, B>(fab: (e: E) => HKTAs<M, (a: A) => B>, fa: (e: E) => HKTAs<M, A>): (e: E) => HKTAs<M, B>
  chain<E, A, B>(f: (a: A) => (e: E) => HKTAs<M, B>, fa: (e: E) => HKTAs<M, A>): (e: E) => HKTAs<M, B>
}

export interface ReaderT2<M extends HKT2S> {
  map<L, E, A, B>(f: (a: A) => B, fa: (e: E) => HKT2As<M, L, A>): (e: E) => HKT2As<M, L, B>
  of<L, E, A>(a: A): (e: E) => HKT2As<M, L, A>
  ap<L, E, A, B>(fab: (e: E) => HKT2As<M, L, (a: A) => B>, fa: (e: E) => HKT2As<M, L, A>): (e: E) => HKT2As<M, L, B>
  chain<L, E, A, B>(f: (a: A) => (e: E) => HKT2As<M, L, B>, fa: (e: E) => HKT2As<M, L, A>): (e: E) => HKT2As<M, L, B>
}

export function map<F extends HKT2S>(
  F: Functor<F>
): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => HKT2As<F, L, A>) => (e: E) => HKT2As<F, L, B>
export function map<F extends HKTS>(
  F: Functor<F>
): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKTAs<F, A>) => (e: E) => HKTAs<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.map(fa(e), f)
}

export function of<F extends HKT2S>(F: Applicative<F>): <L, E, A>(a: A) => (e: E) => HKT2As<F, L, A>
export function of<F extends HKTS>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKTAs<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
/** @function */
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> {
  return <A>(a: A) => <E>(e: E) => F.of(a)
}

export function ap<F extends HKT2S>(
  F: Applicative<F>
): <L, E, A, B>(fab: (e: E) => HKT2As<F, L, (a: A) => B>, fa: (e: E) => HKT2As<F, L, A>) => (e: E) => HKT2As<F, L, B>
export function ap<F extends HKTS>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKTAs<F, (a: A) => B>, fa: (e: E) => HKTAs<F, A>) => (e: E) => HKTAs<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (fab, fa) => e => F.ap(fab(e), fa(e))
}

export function chain<F extends HKT2S>(
  F: Chain<F>
): <L, E, A, B>(f: (a: A) => (e: E) => HKT2As<F, L, B>, fa: (e: E) => HKT2As<F, L, A>) => (e: E) => HKT2As<F, L, B>
export function chain<F extends HKTS>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKTAs<F, B>, fa: (e: E) => HKTAs<F, A>) => (e: E) => HKTAs<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
/** @function */
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
  return (f, fa) => e => F.chain(fa(e), a => f(a)(e))
}

export function ask<F extends HKT2S>(F: Applicative<F>): <L, E>() => (e: E) => HKT2As<F, L, E>
export function ask<F extends HKTS>(F: Applicative<F>): <E>() => (e: E) => HKTAs<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
/** @function */
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> {
  return () => e => F.of(e)
}

export function asks<F extends HKT2S>(F: Applicative<F>): <L, E, A>(f: (e: E) => A) => (e: E) => HKT2As<F, L, A>
export function asks<F extends HKTS>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKTAs<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
/** @function */
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> {
  return f => e => F.of(f(e))
}

export function getReaderT<M extends HKT2S>(M: Monad<M>): ReaderT2<M>
export function getReaderT<M extends HKTS>(M: Monad<M>): ReaderT1<M>
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
