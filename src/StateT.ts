import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Chain } from './Chain'
import { Monad } from './Monad'
import { Endomorphism, tuple } from './function'

export interface StateT<M> {
  map<S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>): (s: S) => HKT<M, [B, S]>
  of<S, A>(a: A): (s: S) => HKT<M, [A, S]>
  ap<S, A, B>(fab: (s: S) => HKT<M, [(a: A) => B, S]>, fa: (s: S) => HKT<M, [A, S]>): (s: S) => HKT<M, [B, S]>
  chain<S, A, B>(f: (a: A) => (s: S) => HKT<M, [B, S]>, fa: (s: S) => HKT<M, [A, S]>): (s: S) => HKT<M, [B, S]>
}

export interface StateT1<M extends HKTS> {
  map<S, A, B>(f: (a: A) => B, fa: (s: S) => URI2HKT<[A, S]>[M]): (s: S) => URI2HKT<[B, S]>[M]
  of<S, A>(a: A): (s: S) => URI2HKT<[A, S]>[M]
  ap<S, A, B>(
    fab: (s: S) => URI2HKT<[(a: A) => B, S]>[M],
    fa: (s: S) => URI2HKT<[A, S]>[M]
  ): (s: S) => URI2HKT<[B, S]>[M]
  chain<S, A, B>(
    f: (a: A) => (s: S) => URI2HKT<[B, S]>[M],
    fa: (s: S) => URI2HKT<[A, S]>[M]
  ): (s: S) => URI2HKT<[B, S]>[M]
}

export interface StateT2<M extends HKT2S> {
  map<L, S, A, B>(f: (a: A) => B, fa: (s: S) => URI2HKT2<L, [A, S]>[M]): (s: S) => URI2HKT2<L, [B, S]>[M]
  of<L, S, A>(a: A): (s: S) => URI2HKT2<L, [A, S]>[M]
  ap<L, S, A, B>(
    fab: (s: S) => URI2HKT2<L, [(a: A) => B, S]>[M],
    fa: (s: S) => URI2HKT2<L, [A, S]>[M]
  ): (s: S) => URI2HKT2<L, [B, S]>[M]
  chain<L, S, A, B>(
    f: (a: A) => (s: S) => URI2HKT2<L, [B, S]>[M],
    fa: (s: S) => URI2HKT2<L, [A, S]>[M]
  ): (s: S) => URI2HKT2<L, [B, S]>[M]
}

export class Ops {
  map<F extends HKT2S>(
    F: Functor<F>
  ): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => URI2HKT2<L, [A, S]>[F]) => (s: S) => URI2HKT2<L, [B, S]>[F]
  map<F extends HKTS>(
    F: Functor<F>
  ): <S, A, B>(f: (a: A) => B, fa: (s: S) => URI2HKT<[A, S]>[F]) => (s: S) => URI2HKT<[B, S]>[F]
  map<F>(F: Functor<F>): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
  map<F>(F: Functor<F>): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
    return (f, fa) => s => F.map(([a, s1]) => tuple(f(a), s1), fa(s))
  }

  of<F extends HKT2S>(F: Applicative<F>): <L, S, A>(a: A) => (s: S) => URI2HKT2<L, [A, S]>[F]
  of<F extends HKTS>(F: Applicative<F>): <S, A>(a: A) => (s: S) => URI2HKT<[A, S]>[F]
  of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
  of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> {
    return a => s => F.of(tuple(a, s))
  }

  ap<F extends HKT2S>(
    F: Chain<F>
  ): <L, S, A, B>(
    fab: (s: S) => URI2HKT2<L, [(a: A) => B, S]>[F],
    fa: (s: S) => URI2HKT2<L, [A, S]>[F]
  ) => (s: S) => URI2HKT2<L, [B, S]>[F]
  ap<F extends HKTS>(
    F: Chain<F>
  ): <S, A, B>(
    fab: (s: S) => URI2HKT<[(a: A) => B, S]>[F],
    fa: (s: S) => URI2HKT<[A, S]>[F]
  ) => (s: S) => URI2HKT<[B, S]>[F]
  ap<F>(
    F: Chain<F>
  ): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
  ap<F>(
    F: Chain<F>
  ): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
    return (fab, fa) => this.chain(F)(f => this.map(F)(f, fa), fab) // <- derived
  }

  chain<F extends HKT2S>(
    F: Chain<F>
  ): <L, S, A, B>(
    f: (a: A) => (s: S) => URI2HKT2<L, [B, S]>[F],
    fa: (s: S) => URI2HKT2<L, [A, S]>[F]
  ) => (s: S) => URI2HKT2<L, [B, S]>[F]
  chain<F extends HKTS>(
    F: Chain<F>
  ): <S, A, B>(
    f: (a: A) => (s: S) => URI2HKT<[B, S]>[F],
    fa: (s: S) => URI2HKT<[A, S]>[F]
  ) => (s: S) => URI2HKT<[B, S]>[F]
  chain<F>(
    F: Chain<F>
  ): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
  chain<F>(
    F: Chain<F>
  ): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
    return (f, fa) => s => F.chain(([a, s1]) => f(a)(s1), fa(s))
  }

  get<F extends HKT2S>(F: Applicative<F>): <L, S>() => (s: S) => URI2HKT2<L, [S, S]>[F]
  get<F extends HKTS>(F: Applicative<F>): <S>() => (s: S) => URI2HKT<[S, S]>[F]
  get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
  get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> {
    return () => s => F.of(tuple(s, s))
  }

  put<F extends HKT2S>(F: Applicative<F>): <L, S>(s: S) => (s: S) => URI2HKT2<L, [void, S]>[F]
  put<F extends HKTS>(F: Applicative<F>): <S>(s: S) => (s: S) => URI2HKT<[void, S]>[F]
  put<F>(F: Applicative<F>): <S>(s: S) => (s: S) => HKT<F, [void, S]>
  put<F>(F: Applicative<F>): <S>(s: S) => (s: S) => HKT<F, [void, S]> {
    return s => () => F.of(tuple(undefined, s))
  }

  modify<F extends HKT2S>(F: Applicative<F>): <L, S>(f: Endomorphism<S>) => (s: S) => URI2HKT2<L, [void, S]>[F]
  modify<F extends HKTS>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => URI2HKT<[void, S]>[F]
  modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
  modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> {
    return f => s => F.of(tuple(undefined, f(s)))
  }

  gets<F extends HKT2S>(F: Applicative<F>): <L, S, A>(f: (s: S) => A) => (s: S) => URI2HKT2<L, [A, S]>[F]
  gets<F extends HKTS>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => URI2HKT<[A, S]>[F]
  gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
  gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> {
    return f => s => F.of(tuple(f(s), s))
  }

  getStateT<M extends HKT2S>(M: Monad<M>): StateT2<M>
  getStateT<M extends HKTS>(M: Monad<M>): StateT1<M>
  getStateT<M>(M: Monad<M>): StateT<M>
  getStateT<M>(M: Monad<M>): StateT<M> {
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
export const get: Ops['get'] = ops.get
export const put: Ops['put'] = ops.put
export const modify: Ops['modify'] = ops.modify
export const gets: Ops['gets'] = ops.gets
export const getStateT: Ops['getStateT'] = ops.getStateT
