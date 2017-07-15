import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
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
  map<E, A, B>(f: (a: A) => B, fa: (e: E) => URI2HKT<A>[M]): (e: E) => URI2HKT<B>[M]
  of<E, A>(a: A): (e: E) => URI2HKT<A>[M]
  ap<E, A, B>(fab: (e: E) => URI2HKT<(a: A) => B>[M], fa: (e: E) => URI2HKT<A>[M]): (e: E) => URI2HKT<B>[M]
  chain<E, A, B>(f: (a: A) => (e: E) => URI2HKT<B>[M], fa: (e: E) => URI2HKT<A>[M]): (e: E) => URI2HKT<B>[M]
}

export interface ReaderT2<M extends HKT2S> {
  map<L, E, A, B>(f: (a: A) => B, fa: (e: E) => URI2HKT2<L, A>[M]): (e: E) => URI2HKT2<L, B>[M]
  of<L, E, A>(a: A): (e: E) => URI2HKT2<L, A>[M]
  ap<L, E, A, B>(
    fab: (e: E) => URI2HKT2<L, (a: A) => B>[M],
    fa: (e: E) => URI2HKT2<L, A>[M]
  ): (e: E) => URI2HKT2<L, B>[M]
  chain<L, E, A, B>(
    f: (a: A) => (e: E) => URI2HKT2<L, B>[M],
    fa: (e: E) => URI2HKT2<L, A>[M]
  ): (e: E) => URI2HKT2<L, B>[M]
}

export class Ops {
  map<F extends HKT2S>(
    F: Functor<F>
  ): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => URI2HKT2<L, A>[F]) => (e: E) => URI2HKT2<L, B>[F]
  map<F extends HKTS>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => URI2HKT<A>[F]) => (e: E) => URI2HKT<B>[F]
  map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
  map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
    return (f, fa) => e => F.map(f, fa(e))
  }

  of<F extends HKT2S>(F: Applicative<F>): <L, E, A>(a: A) => (e: E) => URI2HKT2<L, A>[F]
  of<F extends HKTS>(F: Applicative<F>): <E, A>(a: A) => (e: E) => URI2HKT<A>[F]
  of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
  of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> {
    return <A>(a: A) => <E>(e: E) => F.of(a)
  }

  ap<F extends HKT2S>(
    F: Applicative<F>
  ): <L, E, A, B>(
    fab: (e: E) => URI2HKT2<L, (a: A) => B>[F],
    fa: (e: E) => URI2HKT2<L, A>[F]
  ) => (e: E) => URI2HKT2<L, B>[F]
  ap<F extends HKTS>(
    F: Applicative<F>
  ): <E, A, B>(fab: (e: E) => URI2HKT<(a: A) => B>[F], fa: (e: E) => URI2HKT<A>[F]) => (e: E) => URI2HKT<B>[F]
  ap<F>(
    F: Applicative<F>
  ): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
  ap<F>(
    F: Applicative<F>
  ): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
    return (fab, fa) => e => F.ap(fab(e), fa(e))
  }

  chain<F extends HKT2S>(
    F: Chain<F>
  ): <L, E, A, B>(
    f: (a: A) => (e: E) => URI2HKT2<L, B>[F],
    fa: (e: E) => URI2HKT2<L, A>[F]
  ) => (e: E) => URI2HKT2<L, B>[F]
  chain<F extends HKTS>(
    F: Chain<F>
  ): <E, A, B>(f: (a: A) => (e: E) => URI2HKT<B>[F], fa: (e: E) => URI2HKT<A>[F]) => (e: E) => URI2HKT<B>[F]
  chain<F>(F: Chain<F>): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
  chain<F>(F: Chain<F>): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> {
    return (f, fa) => e => F.chain(a => f(a)(e), fa(e))
  }

  ask<F extends HKT2S>(F: Applicative<F>): <L, E>() => (e: E) => URI2HKT2<L, E>[F]
  ask<F extends HKTS>(F: Applicative<F>): <E>() => (e: E) => URI2HKT<E>[F]
  ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
  ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> {
    return () => e => F.of(e)
  }

  asks<F extends HKT2S>(F: Applicative<F>): <L, E, A>(f: (e: E) => A) => (e: E) => URI2HKT2<L, A>[F]
  asks<F extends HKTS>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => URI2HKT<A>[F]
  asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
  asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> {
    return f => e => F.of(f(e))
  }

  getReaderT<M extends HKT2S>(M: Monad<M>): ReaderT2<M>
  getReaderT<M extends HKTS>(M: Monad<M>): ReaderT1<M>
  getReaderT<M>(M: Monad<M>): ReaderT<M>
  getReaderT<M>(M: Monad<M>): ReaderT<M> {
    return {
      map: this.map(M),
      of: this.of(M),
      ap: this.ap(M),
      chain: this.chain(M)
    }
  }
}

const ops = new Ops()
export const map: Ops['map'] = ops.map
export const of: Ops['of'] = ops.of
export const ap: Ops['ap'] = ops.ap
export const chain: Ops['chain'] = ops.chain
export const ask: Ops['ask'] = ops.ask
export const asks: Ops['asks'] = ops.asks
export const getReaderT: Ops['getReaderT'] = ops.getReaderT
