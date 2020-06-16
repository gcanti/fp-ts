/**
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from './Monad'
import { Reader } from './Reader'

// TODO: remove module in v3

/**
 * @category model
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
  readonly local: <R, A, Q>(ma: ReaderT<M, R, A>, f: (d: Q) => R) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Kind<M, A>
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
  readonly local: <R, A, Q>(ma: ReaderT1<M, R, A>, f: (d: Q) => R) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Kind<M, A>) => ReaderT1<M, R, A>
}

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderT2<M extends URIS2, R, E, A> {
  (r: R): Kind2<M, E, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM2<M extends URIS2> {
  readonly map: <R, E, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => B) => ReaderT2<M, R, E, B>
  readonly of: <R, E, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, E, A, B>(mab: ReaderT2<M, R, E, (a: A) => B>, ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly chain: <R, E, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => ReaderT2<M, R, E, B>) => ReaderT2<M, R, E, B>
  readonly ask: <R, E>() => ReaderT2<M, R, E, R>
  readonly asks: <R, E, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R, E, A, Q>(ma: ReaderT2<M, R, E, A>, f: (d: Q) => R) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, E, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, E, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}

/**
 * @since 2.2.0
 */
export interface ReaderM2C<M extends URIS2, E> {
  readonly map: <R, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => B) => ReaderT2<M, R, E, B>
  readonly of: <R, A>(a: A) => ReaderT2<M, R, E, A>
  readonly ap: <R, A, B>(mab: ReaderT2<M, R, E, (a: A) => B>, ma: ReaderT2<M, R, E, A>) => ReaderT2<M, R, E, B>
  readonly chain: <R, A, B>(ma: ReaderT2<M, R, E, A>, f: (a: A) => ReaderT2<M, R, E, B>) => ReaderT2<M, R, E, B>
  readonly ask: <R>() => ReaderT2<M, R, E, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT2<M, R, E, A>
  readonly local: <R, A, Q>(ma: ReaderT2<M, R, E, A>, f: (d: Q) => R) => ReaderT2<M, Q, E, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT2<M, R, E, A>
  readonly fromM: <R, A>(ma: Kind2<M, E, A>) => ReaderT2<M, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderT3<M extends URIS3, R, U, E, A> {
  (r: R): Kind3<M, U, E, A>
}

/**
 * @since 2.0.0
 */
export interface ReaderM3<M extends URIS3> {
  readonly map: <R, U, E, A, B>(ma: ReaderT3<M, R, U, E, A>, f: (a: A) => B) => ReaderT3<M, R, U, E, B>
  readonly of: <R, U, E, A>(a: A) => ReaderT3<M, R, U, E, A>
  readonly ap: <R, U, E, A, B>(
    mab: ReaderT3<M, R, U, E, (a: A) => B>,
    ma: ReaderT3<M, R, U, E, A>
  ) => ReaderT3<M, R, U, E, B>
  readonly chain: <R, U, E, A, B>(
    ma: ReaderT3<M, R, U, E, A>,
    f: (a: A) => ReaderT3<M, R, U, E, B>
  ) => ReaderT3<M, R, U, E, B>
  readonly ask: <R, U, E>() => ReaderT3<M, R, U, E, R>
  readonly asks: <R, U, E, A>(f: (r: R) => A) => ReaderT3<M, R, U, E, A>
  readonly local: <R, U, E, A, Q>(ma: ReaderT3<M, R, U, E, A>, f: (d: Q) => R) => ReaderT3<M, Q, U, E, A>
  readonly fromReader: <R, U, E, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, E, A>
  readonly fromM: <R, U, E, A>(ma: Kind3<M, U, E, A>) => ReaderT3<M, R, U, E, A>
}

/**
 * @since 2.0.0
 */
export function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export function getReaderM<M extends URIS2, E>(M: Monad2C<M, E>): ReaderM2C<M, E>
export function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M> {
  return {
    map: (ma, f) => (r) => M.map(ma(r), f),
    of: (a) => () => M.of(a),
    ap: (mab, ma) => (r) => M.ap(mab(r), ma(r)),
    chain: (ma, f) => (r) => M.chain(ma(r), (a) => f(a)(r)),
    ask: () => M.of,
    asks: (f) => (r) => M.map(M.of(r), f),
    local: (ma, f) => (q) => ma(f(q)),
    fromReader: (ma) => (r) => M.of(ma(r)),
    fromM: (ma) => () => ma
  }
}
