import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { State } from './State'

export interface StateT<M> {
  readonly map: <S, A, B>(fa: (s: S) => HKT<M, [A, S]>, f: (a: A) => B) => (s: S) => HKT<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => HKT<M, [(a: A) => B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
  readonly chain: <S, A, B>(
    fa: (s: S) => HKT<M, [A, S]>,
    f: (a: A) => (s: S) => HKT<M, [B, S]>
  ) => (s: S) => HKT<M, [B, S]>
  readonly get: <S>(s: S) => HKT<M, [S, S]>
  readonly put: <S>(s: S) => () => HKT<M, [void, S]>
  readonly modify: <S>(f: (s: S) => S) => (s: S) => HKT<M, [void, S]>
  readonly gets: <S, A>(f: (s: S) => A) => (s: S) => HKT<M, [A, S]>
  readonly fromState: <S, A>(fa: State<S, A>) => (s: S) => HKT<M, [A, S]>
  readonly fromM: <A>(ma: HKT<M, A>) => <S>(s: S) => HKT<M, [A, S]>
}

export interface StateT1<M extends URIS> {
  readonly map: <S, A, B>(fa: (s: S) => Type<M, [A, S]>, f: (a: A) => B) => (s: S) => Type<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => Type<M, [(a: A) => B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
  readonly chain: <S, A, B>(
    fa: (s: S) => Type<M, [A, S]>,
    f: (a: A) => (s: S) => Type<M, [B, S]>
  ) => (s: S) => Type<M, [B, S]>
  readonly get: <S>(s: S) => Type<M, [S, S]>
  readonly put: <S>(s: S) => () => Type<M, [void, S]>
  readonly modify: <S>(f: (s: S) => S) => (s: S) => Type<M, [void, S]>
  readonly gets: <S, A>(f: (s: S) => A) => (s: S) => Type<M, [A, S]>
  readonly fromState: <S, A>(fa: State<S, A>) => (s: S) => Type<M, [A, S]>
  readonly fromM: <A>(ma: Type<M, A>) => <S>(s: S) => Type<M, [A, S]>
}

export interface StateT2<M extends URIS2> {
  readonly map: <L, S, A, B>(fa: (s: S) => Type2<M, L, [A, S]>, f: (a: A) => B) => (s: S) => Type2<M, L, [B, S]>
  readonly of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>
  readonly ap: <L, S, A, B>(
    fab: (s: S) => Type2<M, L, [(a: A) => B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
  readonly chain: <L, S, A, B>(
    fa: (s: S) => Type2<M, L, [A, S]>,
    f: (a: A) => (s: S) => Type2<M, L, [B, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
  readonly get: <L, S>(s: S) => Type2<M, L, [S, S]>
  readonly put: <L, S>(s: S) => () => Type2<M, L, [void, S]>
  readonly modify: <S>(f: (s: S) => S) => <L>(s: S) => Type2<M, L, [void, S]>
  readonly gets: <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<M, L, [A, S]>
  readonly fromState: <S, A>(fa: State<S, A>) => <L>(s: S) => Type2<M, L, [A, S]>
  readonly fromM: <L, A>(ma: Type2<M, L, A>) => <S>(s: S) => Type2<M, L, [A, S]>
}

export interface StateT3<M extends URIS3> {
  readonly map: <U, L, S, A, B>(
    fa: (s: S) => Type3<M, U, L, [A, S]>,
    f: (a: A) => B
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly of: <U, L, S, A>(a: A) => (s: S) => Type3<M, U, L, [A, S]>
  readonly ap: <U, L, S, A, B>(
    fab: (s: S) => Type3<M, U, L, [(a: A) => B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly chain: <U, L, S, A, B>(
    fa: (s: S) => Type3<M, U, L, [A, S]>,
    f: (a: A) => (s: S) => Type3<M, U, L, [B, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly get: <U, L, S>(s: S) => Type3<M, U, L, [S, S]>
  readonly put: <U, L, S>(s: S) => () => Type3<M, U, L, [void, S]>
  readonly modify: <S>(f: (s: S) => S) => <U, L>(s: S) => Type3<M, U, L, [void, S]>
  readonly gets: <S, A>(f: (s: S) => A) => <U, L>(s: S) => Type3<M, U, L, [A, S]>
  readonly fromState: <S, A>(fa: State<S, A>) => <U, L>(s: S) => Type3<M, U, L, [A, S]>
  readonly fromM: <U, L, A>(ma: Type3<M, U, L, A>) => <S>(s: S) => Type3<M, U, L, [A, S]>
}

/**
 * @since 2.0.0
 */
export function getStateT<M extends URIS3>(M: Monad3<M>): StateT3<M>
export function getStateT<M extends URIS2>(M: Monad2<M>): StateT2<M>
export function getStateT<M extends URIS>(M: Monad1<M>): StateT1<M>
export function getStateT<M>(M: Monad<M>): StateT<M>
export function getStateT<M>(M: Monad<M>): StateT<M> {
  return {
    map: (fa, f) => s => M.map(fa(s), ([a, s1]) => [f(a), s1]),
    of: a => s => M.of([a, s]),
    ap: (fab, fa) => s => M.chain(fab(s), ([f, s]) => M.map(fa(s), ([a, s]) => [f(a), s])),
    chain: (fa, f) => s => M.chain(fa(s), ([a, s1]) => f(a)(s1)),
    get: s => M.of([s, s]),
    put: s => () => M.of([undefined, s]),
    modify: f => s => M.of([undefined, f(s)]),
    gets: f => s => M.of([f(s), s]),
    fromState: sa => s => M.of(sa(s)),
    fromM: ma => s => M.map(ma, a => [a, s])
  }
}
