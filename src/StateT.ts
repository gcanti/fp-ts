import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Chain, Chain1, Chain2, Chain3 } from './Chain'
import { Functor, Functor1, Functor2, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { State } from './State'
import { Endomorphism, tuple } from './function'

export interface StateT<M> {
  readonly map: <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => HKT<M, [(a: A) => B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
  readonly chain: <S, A, B>(
    f: (a: A) => (s: S) => HKT<M, [B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
}

export interface StateT1<M extends URIS> {
  readonly map: <S, A, B>(f: (a: A) => B, fa: (s: S) => Type<M, [A, S]>) => (s: S) => Type<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => Type<M, [(a: A) => B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
  readonly chain: <S, A, B>(
    f: (a: A) => (s: S) => Type<M, [B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
}

export interface StateT2<M extends URIS2> {
  readonly map: <L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>
  readonly of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>
  readonly ap: <L, S, A, B>(
    fab: (s: S) => Type2<M, L, [(a: A) => B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
  readonly chain: <L, S, A, B>(
    f: (a: A) => (s: S) => Type2<M, L, [B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
}

export interface StateT3<M extends URIS3> {
  readonly map: <U, L, S, A, B>(
    f: (a: A) => B,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly of: <U, L, S, A>(a: A) => (s: S) => Type3<M, U, L, [A, S]>
  readonly ap: <U, L, S, A, B>(
    fab: (s: S) => Type3<M, U, L, [(a: A) => B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly chain: <U, L, S, A, B>(
    f: (a: A) => (s: S) => Type3<M, U, L, [B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
}

/**
 * @function
 * @since 1.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <U, L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type3<F, U, L, [A, S]>) => (s: S) => Type3<F, U, L, [B, S]>
export function map<F extends URIS2>(
  F: Functor2<F>
): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>
export function map<F extends URIS>(
  F: Functor1<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.map(fa(s), ([a, s1]) => tuple(f(a), s1))
}

/**
 * @function
 * @since 1.0.0
 */
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, S, A>(a: A) => (s: S) => Type3<F, U, L, [A, S]>
export function of<F extends URIS2>(F: Applicative2<F>): <L, S, A>(a: A) => (s: S) => Type2<F, L, [A, S]>
export function of<F extends URIS>(F: Applicative1<F>): <S, A>(a: A) => (s: S) => Type<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> {
  return a => s => F.of(tuple(a, s))
}

/**
 * @function
 * @since 1.0.0
 */
export function ap<F extends URIS3>(
  F: Chain3<F>
): <U, L, S, A, B>(
  fab: (s: S) => Type3<F, U, L, [(a: A) => B, S]>,
  fa: (s: S) => Type3<F, U, L, [A, S]>
) => (s: S) => Type3<F, U, L, [B, S]>
export function ap<F extends URIS2>(
  F: Chain2<F>
): <L, S, A, B>(
  fab: (s: S) => Type2<F, L, [(a: A) => B, S]>,
  fa: (s: S) => Type2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function ap<F extends URIS>(
  F: Chain1<F>
): <S, A, B>(fab: (s: S) => Type<F, [(a: A) => B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  const mapF = map(F)
  const chainF = chain(F)
  return (fab, fa) => chainF(f => mapF(f, fa), fab) // <- derived
}

/**
 * @function
 * @since 1.0.0
 */
export function chain<F extends URIS3>(
  F: Chain3<F>
): <U, L, S, A, B>(
  f: (a: A) => (s: S) => Type3<F, U, L, [B, S]>,
  fa: (s: S) => Type3<F, U, L, [A, S]>
) => (s: S) => Type3<F, U, L, [B, S]>
export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, S, A, B>(
  f: (a: A) => (s: S) => Type2<F, L, [B, S]>,
  fa: (s: S) => Type2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function chain<F extends URIS>(
  F: Chain1<F>
): <S, A, B>(f: (a: A) => (s: S) => Type<F, [B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> {
  return (f, fa) => s => F.chain(fa(s), ([a, s1]) => f(a)(s1))
}

/**
 * @function
 * @since 1.0.0
 */
export function get<F extends URIS3>(F: Applicative3<F>): <S>() => <U, L>(s: S) => Type3<F, U, L, [S, S]>
export function get<F extends URIS2>(F: Applicative2<F>): <S>() => <L>(s: S) => Type2<F, L, [S, S]>
export function get<F extends URIS>(F: Applicative1<F>): <S>() => (s: S) => Type<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> {
  return () => s => F.of(tuple(s, s))
}

/**
 * @function
 * @since 1.0.0
 */
export function put<F extends URIS3>(F: Applicative3<F>): <S>(s: S) => <U, L>() => Type3<F, U, L, [void, S]>
export function put<F extends URIS2>(F: Applicative2<F>): <S>(s: S) => <L>() => Type2<F, L, [void, S]>
export function put<F extends URIS>(F: Applicative1<F>): <S>(s: S) => () => Type<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]> {
  return s => () => F.of(tuple(undefined, s))
}

/**
 * @function
 * @since 1.0.0
 */
export function modify<F extends URIS3>(
  F: Applicative3<F>
): <S>(f: Endomorphism<S>) => <U, L>(s: S) => Type3<F, U, L, [void, S]>
export function modify<F extends URIS2>(
  F: Applicative2<F>
): <S>(f: Endomorphism<S>) => <L>(s: S) => Type2<F, L, [void, S]>
export function modify<F extends URIS>(F: Applicative1<F>): <S>(f: Endomorphism<S>) => (s: S) => Type<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> {
  return f => s => F.of(tuple(undefined, f(s)))
}

/**
 * @function
 * @since 1.0.0
 */
export function gets<F extends URIS3>(
  F: Applicative3<F>
): <S, A>(f: (s: S) => A) => <U, L>(s: S) => Type3<F, U, L, [A, S]>
export function gets<F extends URIS2>(F: Applicative2<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<F, L, [A, S]>
export function gets<F extends URIS>(F: Applicative1<F>): <S, A>(f: (s: S) => A) => (s: S) => Type<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> {
  return f => s => F.of(tuple(f(s), s))
}

/**
 * @function
 * @since 1.2.0
 */
export function fromState<F extends URIS3>(
  F: Applicative3<F>
): <S, A, U, L>(fa: State<S, A>) => (s: S) => Type3<F, U, L, [A, S]>
export function fromState<F extends URIS2>(
  F: Applicative2<F>
): <S, A, L>(fa: State<S, A>) => (s: S) => Type2<F, L, [A, S]>
export function fromState<F extends URIS>(F: Applicative1<F>): <S, A>(fa: State<S, A>) => (s: S) => Type<F, [A, S]>
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]> {
  return fa => s => F.of(fa.run(s))
}

/**
 * @function
 * @since 1.2.0
 */
export function liftF<F extends URIS3>(
  F: Functor3<F>
): <U, L, S, A>(fa: Type3<F, U, L, A>) => (s: S) => Type3<F, U, L, [A, S]>
export function liftF<F extends URIS2>(F: Functor2<F>): <L, S, A>(fa: Type2<F, L, A>) => (s: S) => Type2<F, L, [A, S]>
export function liftF<F extends URIS>(F: Functor1<F>): <S, A>(fa: Type<F, A>) => (s: S) => Type<F, [A, S]>
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]> {
  return fa => s => F.map(fa, a => tuple(a, s))
}

/**
 * @function
 * @since 1.0.0
 */
export function getStateT<M extends URIS3>(M: Monad3<M>): StateT3<M>
export function getStateT<M extends URIS2>(M: Monad2<M>): StateT2<M>
export function getStateT<M extends URIS>(M: Monad1<M>): StateT1<M>
export function getStateT<M>(M: Monad<M>): StateT<M>
export function getStateT<M>(M: Monad<M>): StateT<M> {
  return {
    map: map(M),
    of: of(M),
    ap: ap(M),
    chain: chain(M)
  }
}
