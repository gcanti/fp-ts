import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { State } from './State'

/**
 * @since 2.0.0
 */
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}

/**
 * @since 2.0.0
 */
export interface StateM<M> {
  readonly map: <S, A, B>(fa: StateT<M, S, A>, f: (a: A) => B) => StateT<M, S, B>
  readonly of: <S, A>(a: A) => StateT<M, S, A>
  readonly ap: <S, A, B>(fab: StateT<M, S, (a: A) => B>, fa: StateT<M, S, A>) => StateT<M, S, B>
  readonly chain: <S, A, B>(fa: StateT<M, S, A>, f: (a: A) => StateT<M, S, B>) => StateT<M, S, B>
  readonly get: <S>() => StateT<M, S, S>
  readonly put: <S>(s: S) => StateT<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT<M, S, A>
  readonly fromM: <S, A>(ma: HKT<M, A>) => StateT<M, S, A>
  readonly evalState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, A>
  readonly execState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, S>
}

/**
 * @since 2.0.0
 */
export interface StateT1<M extends URIS, S, A> {
  (s: S): Type<M, [A, S]>
}

/**
 * @since 2.0.0
 */
export interface StateM1<M extends URIS> {
  readonly map: <S, A, B>(fa: StateT1<M, S, A>, f: (a: A) => B) => StateT1<M, S, B>
  readonly of: <S, A>(a: A) => StateT1<M, S, A>
  readonly ap: <S, A, B>(fab: StateT1<M, S, (a: A) => B>, fa: StateT1<M, S, A>) => StateT1<M, S, B>
  readonly chain: <S, A, B>(fa: StateT1<M, S, A>, f: (a: A) => StateT1<M, S, B>) => StateT1<M, S, B>
  readonly get: <S>() => StateT1<M, S, S>
  readonly put: <S>(s: S) => StateT1<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT1<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT1<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT1<M, S, A>
  readonly fromM: <S, A>(ma: Type<M, A>) => StateT1<M, S, A>
  readonly evalState: <S, A>(ma: StateT1<M, S, A>, s: S) => Type<M, A>
  readonly execState: <S, A>(ma: StateT1<M, S, A>, s: S) => Type<M, S>
}

/**
 * @since 2.0.0
 */
export interface StateT2<M extends URIS2, S, L, A> {
  (s: S): Type2<M, L, [A, S]>
}

/**
 * @since 2.0.0
 */
export interface StateM2<M extends URIS2> {
  readonly map: <S, L, A, B>(fa: StateT2<M, S, L, A>, f: (a: A) => B) => StateT2<M, S, L, B>
  readonly of: <S, L, A>(a: A) => StateT2<M, S, L, A>
  readonly ap: <S, L, A, B>(fab: StateT2<M, S, L, (a: A) => B>, fa: StateT2<M, S, L, A>) => StateT2<M, S, L, B>
  readonly chain: <S, L, A, B>(fa: StateT2<M, S, L, A>, f: (a: A) => StateT2<M, S, L, B>) => StateT2<M, S, L, B>
  readonly get: <L, S>() => StateT2<M, S, L, S>
  readonly put: <L, S>(s: S) => StateT2<M, S, L, void>
  readonly modify: <L, S>(f: (s: S) => S) => StateT2<M, S, L, void>
  readonly gets: <S, L, A>(f: (s: S) => A) => StateT2<M, S, L, A>
  readonly fromState: <S, L, A>(fa: State<S, A>) => StateT2<M, S, L, A>
  readonly fromM: <S, L, A>(ma: Type2<M, L, A>) => StateT2<M, S, L, A>
  readonly evalState: <S, L, A>(ma: StateT2<M, S, L, A>, s: S) => Type2<M, L, A>
  readonly execState: <S, L, A>(ma: StateT2<M, S, L, A>, s: S) => Type2<M, L, S>
}

/**
 * @since 2.0.0
 */
export interface StateT3<M extends URIS3, S, U, L, A> {
  (s: S): Type3<M, U, L, [A, S]>
}

/**
 * @since 2.0.0
 */
export interface StateM3<M extends URIS3> {
  readonly map: <S, U, L, A, B>(fa: StateT3<M, S, U, L, A>, f: (a: A) => B) => StateT3<M, S, U, L, B>
  readonly of: <S, U, L, A>(a: A) => StateT3<M, S, U, L, A>
  readonly ap: <S, U, L, A, B>(
    fab: StateT3<M, S, U, L, (a: A) => B>,
    fa: StateT3<M, S, U, L, A>
  ) => StateT3<M, S, U, L, B>
  readonly chain: <S, U, L, A, B>(
    fa: StateT3<M, S, U, L, A>,
    f: (a: A) => StateT3<M, S, U, L, B>
  ) => StateT3<M, S, U, L, B>
  readonly get: <U, L, S>() => StateT3<M, S, U, L, S>
  readonly put: <U, L, S>(s: S) => StateT3<M, S, U, L, void>
  readonly modify: <U, L, S>(f: (s: S) => S) => StateT3<M, S, U, L, void>
  readonly gets: <S, U, L, A>(f: (s: S) => A) => StateT3<M, S, U, L, A>
  readonly fromState: <S, U, L, A>(fa: State<S, A>) => StateT3<M, S, U, L, A>
  readonly fromM: <S, U, L, A>(ma: Type3<M, U, L, A>) => StateT3<M, S, U, L, A>
  readonly evalState: <S, U, L, A>(ma: StateT3<M, S, U, L, A>, s: S) => Type3<M, U, L, A>
  readonly execState: <S, U, L, A>(ma: StateT3<M, S, U, L, A>, s: S) => Type3<M, U, L, S>
}

/**
 * @since 2.0.0
 */
export function getStateM<M extends URIS3>(M: Monad3<M>): StateM3<M>
export function getStateM<M extends URIS2>(M: Monad2<M>): StateM2<M>
export function getStateM<M extends URIS>(M: Monad1<M>): StateM1<M>
export function getStateM<M>(M: Monad<M>): StateM<M>
export function getStateM<M>(M: Monad<M>): StateM<M> {
  return {
    map: (fa, f) => s => M.map(fa(s), ([a, s1]) => [f(a), s1]),
    of: a => s => M.of([a, s]),
    ap: (fab, fa) => s => M.chain(fab(s), ([f, s]) => M.map(fa(s), ([a, s]) => [f(a), s])),
    chain: (fa, f) => s => M.chain(fa(s), ([a, s1]) => f(a)(s1)),
    get: () => s => M.of([s, s]),
    put: s => () => M.of([undefined, s]),
    modify: f => s => M.of([undefined, f(s)]),
    gets: f => s => M.of([f(s), s]),
    fromState: sa => s => M.of(sa(s)),
    fromM: ma => s => M.map(ma, a => [a, s]),
    evalState: (ma, s) => M.map(ma(s), ([a]) => a),
    execState: (ma, s) => M.map(ma(s), ([_, s]) => s)
  }
}
