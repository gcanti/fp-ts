import { HKT, HKT2, URIS, URIS2, Type, Type2 } from './HKT'
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

export interface StateT1<M extends URIS> {
  map<S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>): (s: S) => Type<M, [B, S]>
  of<S, A>(a: A): (s: S) => Type<M, [A, S]>
  ap<S, A, B>(fab: (s: S) => HKT<M, [(a: A) => B, S]>, fa: (s: S) => HKT<M, [A, S]>): (s: S) => Type<M, [B, S]>
  chain<S, A, B>(f: (a: A) => (s: S) => HKT<M, [B, S]>, fa: (s: S) => HKT<M, [A, S]>): (s: S) => Type<M, [B, S]>
}

export interface StateT2<M extends URIS2> {
  map<L, S, A, B>(f: (a: A) => B, fa: (s: S) => HKT2<M, L, [A, S]>): (s: S) => Type2<M, L, [B, S]>
  of<L, S, A>(a: A): (s: S) => Type2<M, L, [A, S]>
  ap<L, S, A, B>(
    fab: (s: S) => HKT2<M, L, [(a: A) => B, S]>,
    fa: (s: S) => HKT2<M, L, [A, S]>
  ): (s: S) => Type2<M, L, [B, S]>
  chain<L, S, A, B>(
    f: (a: A) => (s: S) => HKT2<M, L, [B, S]>,
    fa: (s: S) => HKT2<M, L, [A, S]>
  ): (s: S) => Type2<M, L, [B, S]>
}

export function map<F extends URIS2>(
  F: Functor<F>
): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => HKT2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>
export function map<F extends URIS>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.map(fa(s), ([a, s1]) => tuple(f(a), s1))
}

export function of<F extends URIS2>(F: Applicative<F>): <L, S, A>(a: A) => (s: S) => Type2<F, L, [A, S]>
export function of<F extends URIS>(F: Applicative<F>): <S, A>(a: A) => (s: S) => Type<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
/** @function */
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> {
  return a => s => F.of(tuple(a, s))
}

export function ap<F extends URIS2>(
  F: Chain<F>
): <L, S, A, B>(
  fab: (s: S) => HKT2<F, L, [(a: A) => B, S]>,
  fa: (s: S) => HKT2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function ap<F extends URIS>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (fab, fa) => chain(F)(f => map(F)(f, fa), fab) // <- derived
}

export function chain<F extends URIS2>(
  F: Chain<F>
): <L, S, A, B>(
  f: (a: A) => (s: S) => HKT2<F, L, [B, S]>,
  fa: (s: S) => HKT2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function chain<F extends URIS>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.chain(fa(s), ([a, s1]) => f(a)(s1))
}

export function get<F extends URIS2>(F: Applicative<F>): <S>() => <L>(s: S) => Type2<F, L, [S, S]>
export function get<F extends URIS>(F: Applicative<F>): <S>() => (s: S) => Type<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
/** @function */
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> {
  return () => s => F.of(tuple(s, s))
}

export function put<F extends URIS2>(F: Applicative<F>): <S>(s: S) => <L>() => Type2<F, L, [void, S]>
export function put<F extends URIS>(F: Applicative<F>): <S>(s: S) => () => Type<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
/** @function */
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]> {
  return s => () => F.of(tuple(undefined, s))
}

export function modify<F extends URIS2>(
  F: Applicative<F>
): <S>(f: Endomorphism<S>) => <L>(s: S) => Type2<F, L, [void, S]>
export function modify<F extends URIS>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => Type<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
/** @function */
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> {
  return f => s => F.of(tuple(undefined, f(s)))
}

export function gets<F extends URIS2>(F: Applicative<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<F, L, [A, S]>
export function gets<F extends URIS>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => Type<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
/** @function */
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> {
  return f => s => F.of(tuple(f(s), s))
}

export function getStateT<M extends URIS2>(M: Monad<M>): StateT2<M>
export function getStateT<M extends URIS>(M: Monad<M>): StateT1<M>
export function getStateT<M>(M: Monad<M>): StateT<M>
/** @function */
export function getStateT<M>(M: Monad<M>): StateT<M> {
  return {
    map: map(M),
    of: of(M),
    ap: ap(M),
    chain: chain(M)
  }
}
