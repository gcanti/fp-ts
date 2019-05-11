import { HKT, Type, URIS } from './HKT'
import { Monad, Monad1 } from './Monad'

/**
 * @since 2.0.0
 */
export interface ContT<M, R, A> {
  (c: (a: A) => HKT<M, R>): HKT<M, R>
}

/**
 * @since 2.0.0
 */
export interface ContM<M> {
  readonly map: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => B) => ContT<M, R, B>
  readonly of: <R, A>(a: A) => ContT<M, R, A>
  readonly ap: <R, A, B>(mab: ContT<M, R, (a: A) => B>, ma: ContT<M, R, A>) => ContT<M, R, B>
  readonly chain: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => ContT<M, R, B>) => ContT<M, R, B>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ContT<M, R, A>
}

/**
 * @since 2.0.0
 */
export interface ContT1<M extends URIS, R, A> {
  (c: (a: A) => Type<M, R>): Type<M, R>
}

/**
 * @since 2.0.0
 */
export interface ContM1<M extends URIS> {
  readonly map: <R, A, B>(ma: ContT1<M, R, A>, f: (a: A) => B) => ContT1<M, R, B>
  readonly of: <R, A>(a: A) => ContT1<M, R, A>
  readonly ap: <R, A, B>(mab: ContT1<M, R, (a: A) => B>, ma: ContT1<M, R, A>) => ContT1<M, R, B>
  readonly chain: <R, A, B>(ma: ContT1<M, R, A>, f: (a: A) => ContT1<M, R, B>) => ContT1<M, R, B>
  readonly fromM: <R, A>(ma: Type<M, A>) => ContT1<M, R, A>
}

/**
 * @since 2.0.0
 */
export function getContM<M extends URIS>(M: Monad1<M>): ContM1<M>
export function getContM<M>(M: Monad<M>): ContM<M>
export function getContM<M>(M: Monad<M>): ContM<M> {
  return {
    map: (ma, f) => c => ma(a => c(f(a))),
    of: a => c => c(a),
    ap: (mab, ma) => c => mab(f => ma(a => c(f(a)))),
    chain: (ma, f) => c => ma(a => f(a)(c)),
    fromM: ma => c => M.chain(ma, c)
  }
}
