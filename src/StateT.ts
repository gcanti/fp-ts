import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
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
  map<S, A, B>(f: (a: A) => B, fa: (s: S) => HKTAs<M, [A, S]>): (s: S) => HKTAs<M, [B, S]>
  of<S, A>(a: A): (s: S) => HKTAs<M, [A, S]>
  ap<S, A, B>(fab: (s: S) => HKTAs<M, [(a: A) => B, S]>, fa: (s: S) => HKTAs<M, [A, S]>): (s: S) => HKTAs<M, [B, S]>
  chain<S, A, B>(f: (a: A) => (s: S) => HKTAs<M, [B, S]>, fa: (s: S) => HKTAs<M, [A, S]>): (s: S) => HKTAs<M, [B, S]>
}

export interface StateT2<M extends HKT2S> {
  map<L, S, A, B>(f: (a: A) => B, fa: (s: S) => HKT2As<M, L, [A, S]>): (s: S) => HKT2As<M, L, [B, S]>
  of<L, S, A>(a: A): (s: S) => HKT2As<M, L, [A, S]>
  ap<L, S, A, B>(
    fab: (s: S) => HKT2As<M, L, [(a: A) => B, S]>,
    fa: (s: S) => HKT2As<M, L, [A, S]>
  ): (s: S) => HKT2As<M, L, [B, S]>
  chain<L, S, A, B>(
    f: (a: A) => (s: S) => HKT2As<M, L, [B, S]>,
    fa: (s: S) => HKT2As<M, L, [A, S]>
  ): (s: S) => HKT2As<M, L, [B, S]>
}

export function map<F extends HKT2S>(
  F: Functor<F>
): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => HKT2As<F, L, [A, S]>) => (s: S) => HKT2As<F, L, [B, S]>
export function map<F extends HKTS>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKTAs<F, [A, S]>) => (s: S) => HKTAs<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.map(fa(s), ([a, s1]) => tuple(f(a), s1))
}

export function of<F extends HKT2S>(F: Applicative<F>): <L, S, A>(a: A) => (s: S) => HKT2As<F, L, [A, S]>
export function of<F extends HKTS>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKTAs<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
/** @function */
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> {
  return a => s => F.of(tuple(a, s))
}

export function ap<F extends HKT2S>(
  F: Chain<F>
): <L, S, A, B>(
  fab: (s: S) => HKT2As<F, L, [(a: A) => B, S]>,
  fa: (s: S) => HKT2As<F, L, [A, S]>
) => (s: S) => HKT2As<F, L, [B, S]>
export function ap<F extends HKTS>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKTAs<F, [(a: A) => B, S]>, fa: (s: S) => HKTAs<F, [A, S]>) => (s: S) => HKTAs<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (fab, fa) => chain(F)(f => map(F)(f, fa), fab) // <- derived
}

export function chain<F extends HKT2S>(
  F: Chain<F>
): <L, S, A, B>(
  f: (a: A) => (s: S) => HKT2As<F, L, [B, S]>,
  fa: (s: S) => HKT2As<F, L, [A, S]>
) => (s: S) => HKT2As<F, L, [B, S]>
export function chain<F extends HKTS>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKTAs<F, [B, S]>, fa: (s: S) => HKTAs<F, [A, S]>) => (s: S) => HKTAs<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
/** @function */
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.chain(([a, s1]) => f(a)(s1), fa(s))
}

export function get<F extends HKT2S>(F: Applicative<F>): <S>() => <L>(s: S) => HKT2As<F, L, [S, S]>
export function get<F extends HKTS>(F: Applicative<F>): <S>() => (s: S) => HKTAs<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
/** @function */
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> {
  return () => s => F.of(tuple(s, s))
}

export function put<F extends HKT2S>(F: Applicative<F>): <S>(s: S) => <L>() => HKT2As<F, L, [void, S]>
export function put<F extends HKTS>(F: Applicative<F>): <S>(s: S) => () => HKTAs<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
/** @function */
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]> {
  return s => () => F.of(tuple(undefined, s))
}

export function modify<F extends HKT2S>(
  F: Applicative<F>
): <S>(f: Endomorphism<S>) => <L>(s: S) => HKT2As<F, L, [void, S]>
export function modify<F extends HKTS>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKTAs<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
/** @function */
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> {
  return f => s => F.of(tuple(undefined, f(s)))
}

export function gets<F extends HKT2S>(F: Applicative<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => HKT2As<F, L, [A, S]>
export function gets<F extends HKTS>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKTAs<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
/** @function */
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> {
  return f => s => F.of(tuple(f(s), s))
}

export function getStateT<M extends HKT2S>(M: Monad<M>): StateT2<M>
export function getStateT<M extends HKTS>(M: Monad<M>): StateT1<M>
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
