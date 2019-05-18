import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad3 } from './Monad'
import { Reader } from './Reader'

/**
 * @since 2.0.0
 */
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM<M> {
  readonly map: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => B) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT<M, R, (a: A) => B>, ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => ReaderT<M, R, B>) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT<M, R, A>) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Type<M, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM1<M extends URIS> {
  readonly map: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => B) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT1<M, R, (a: A) => B>, ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => ReaderT1<M, R, B>) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT1<M, R, A>) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Type<M, A>) => ReaderT1<M, R, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT2<M extends URIS2, R, L, A> {
  (r: R): Type2<M, L, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM2<M extends URIS2> {
  readonly map: <R, L, A, B>(ma: ReaderT2<M, R, L, A>, f: (a: A) => B) => ReaderT2<M, R, L, B>
  readonly of: <R, L, A>(a: A) => ReaderT2<M, R, L, A>
  readonly ap: <R, L, A, B>(mab: ReaderT2<M, R, L, (a: A) => B>, ma: ReaderT2<M, R, L, A>) => ReaderT2<M, R, L, B>
  readonly chain: <R, L, A, B>(ma: ReaderT2<M, R, L, A>, f: (a: A) => ReaderT2<M, R, L, B>) => ReaderT2<M, R, L, B>
  readonly ask: <R, L>() => ReaderT2<M, R, L, R>
  readonly asks: <R, L, A>(f: (r: R) => A) => ReaderT2<M, R, L, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <L, A>(ma: ReaderT2<M, R, L, A>) => ReaderT2<M, Q, L, A>
  readonly fromReader: <R, L, A>(ma: Reader<R, A>) => ReaderT2<M, R, L, A>
  readonly fromM: <R, L, A>(ma: Type2<M, L, A>) => ReaderT2<M, R, L, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT3<M extends URIS3, R, U, L, A> {
  (r: R): Type3<M, U, L, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM3<M extends URIS3> {
  readonly map: <R, U, L, A, B>(ma: ReaderT3<M, R, U, L, A>, f: (a: A) => B) => ReaderT3<M, R, U, L, B>
  readonly of: <R, U, L, A>(a: A) => ReaderT3<M, R, U, L, A>
  readonly ap: <R, U, L, A, B>(
    mab: ReaderT3<M, R, U, L, (a: A) => B>,
    ma: ReaderT3<M, R, U, L, A>
  ) => ReaderT3<M, R, U, L, B>
  readonly chain: <R, U, L, A, B>(
    ma: ReaderT3<M, R, U, L, A>,
    f: (a: A) => ReaderT3<M, R, U, L, B>
  ) => ReaderT3<M, R, U, L, B>
  readonly ask: <R, U, L>() => ReaderT3<M, R, U, L, R>
  readonly asks: <R, U, L, A>(f: (r: R) => A) => ReaderT3<M, R, U, L, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <U, L, A>(ma: ReaderT3<M, R, U, L, A>) => ReaderT3<M, Q, U, L, A>
  readonly fromReader: <R, U, L, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, L, A>
  readonly fromM: <R, U, L, A>(ma: Type3<M, U, L, A>) => ReaderT3<M, R, U, L, A>
}

/**
 * @since 2.0.0
 */
export function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M> {
  return {
    map: (ma, f) => e => M.map(ma(e), f),
    of: a => () => M.of(a),
    ap: (mab, ma) => e => M.ap(mab(e), ma(e)),
    chain: (ma, f) => e => M.chain(ma(e), a => f(a)(e)),
    ask: () => M.of,
    asks: f => e => M.map(M.of(e), f),
    local: f => ma => d => ma(f(d)),
    fromReader: ma => e => M.of(ma(e)),
    fromM: ma => () => ma
  }
}
