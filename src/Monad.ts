/**
 * `Monad` instances represent type constructors which support sequential composition.
 *
 * Instances must satisfy the following laws in addition to the `Functor`:
 *
 * 1. Associativity: `flow(M.chain(afb), M.chain(bfc)) <-> M.chain(flow(afb, M.chain(bfc)))`
 * 2. Left identity: `pipe(M.of(a), M.chain(f)) <-> f(a)`
 * 3. Right identity: `pipe(fa, M.chain(M.of)) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = f => A.chain(flow(f, A.of))`
 *
 * @since 3.0.0
 */
import { pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad<M> extends Functor<M> {
  readonly of: <A>(a: A) => HKT<M, A>
  readonly chain: <A, B>(f: (a: A) => HKT<M, B>) => (fa: HKT<M, A>) => HKT<M, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad1<M extends URIS> extends Functor1<M> {
  readonly of: <A>(a: A) => Kind<M, A>
  readonly chain: <A, B>(f: (a: A) => Kind<M, B>) => (fa: Kind<M, A>) => Kind<M, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad2<M extends URIS2> extends Functor2<M> {
  readonly of: <E, A>(a: A) => Kind2<M, E, A>
  readonly chain: <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (fa: Kind2<M, E, A>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad2C<M extends URIS2, E> extends Functor2C<M, E> {
  readonly of: <A>(a: A) => Kind2<M, E, A>
  readonly chain: <A, B>(f: (a: A) => Kind2<M, E, B>) => (fa: Kind2<M, E, A>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad3<M extends URIS3> extends Functor3<M> {
  readonly of: <R, E, A>(a: A) => Kind3<M, R, E, A>
  readonly chain: <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (fa: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad3C<M extends URIS3, E> extends Functor3C<M, E> {
  readonly of: <R, A>(a: A) => Kind3<M, R, E, A>
  readonly chain: <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (fa: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad4<M extends URIS4> extends Functor4<M> {
  readonly of: <S, R, E, A>(a: A) => Kind4<M, S, R, E, A>
  readonly chain: <A, S, R, E, B>(
    f: (a: A) => Kind4<M, S, R, E, B>
  ) => (fa: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
}

/**
 * @since 3.0.0
 */
export function chainFirst_<M extends URIS4>(
  M: Monad4<M>
): <S, R, E, A, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirst_<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst_<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst_<M extends URIS2>(
  M: Monad2<M>
): <E, A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst_<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst_<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirst_<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
export function chainFirst_<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A> {
  return (f) =>
    M.chain((a) =>
      pipe(
        f(a),
        M.map(() => a)
      )
    )
}
