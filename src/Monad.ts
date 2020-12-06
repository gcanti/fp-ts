/**
 * The `Monad` type class combines the operations of the `Chain` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:
 *
 * 1. Left identity: `M.chain(M.of(a), f) <-> f(a)`
 * 2. Right identity: `M.chain(fa, M.of) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`
 *
 * @since 2.0.0
 */
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4
} from './Applicative'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad<F> extends Applicative<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad1<M extends URIS> extends Applicative1<M> {
  readonly chain: <A, B>(fa: Kind<M, A>, f: (a: A) => Kind<M, B>) => Kind<M, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2<M extends URIS2> extends Applicative2<M> {
  readonly chain: <E, A, B>(fa: Kind2<M, E, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2C<M extends URIS2, E> extends Applicative2C<M, E> {
  readonly chain: <A, B>(fa: Kind2<M, E, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad3<M extends URIS3> extends Applicative3<M> {
  readonly chain: <R, E, A, B>(fa: Kind3<M, R, E, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Monad3C<M extends URIS3, E> extends Applicative3C<M, E> {
  readonly chain: <R, A, B>(fa: Kind3<M, R, E, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad4<M extends URIS4> extends Applicative4<M> {
  readonly chain: <S, R, E, A, B>(fa: Kind4<M, S, R, E, A>, f: (a: A) => Kind4<M, S, R, E, B>) => Kind4<M, S, R, E, B>
}
