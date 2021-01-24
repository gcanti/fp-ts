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
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Monad3C<M extends URIS3, E> extends Applicative3C<M, E>, Chain3C<M, E> {}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad4<M extends URIS4> extends Applicative4<M>, Chain4<M> {}

/**
 * @since 2.10.0
 */
export function chainFirst<M extends URIS4>(
  M: Monad4<M>
): <A, S, R, E, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirst<M extends URIS3>(
  M: Monad3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst<M extends URIS2>(
  M: Monad2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirst<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
export function chainFirst<M>(M: Monad<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A> {
  return (f) => (first) => M.chain(first, (a) => M.map(f(a), () => a))
}

/**
 * @since 2.10.0
 */
export function bind<M extends URIS4>(
  M: Monad4<M>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS3>(
  M: Monad3<M>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS3, E>(
  M: Monad3C<M, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS2>(
  M: Monad2<M>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS2, E>(
  M: Monad2C<M, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS>(
  M: Monad1<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, B>
) => (ma: Kind<M, A>) => Kind<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M>(
  M: Monad<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M>(
  M: Monad<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return (name, f) => (ma) => M.chain(ma, (a) => M.map(f(a), (b) => Object.assign({}, a, { [name]: b }) as any))
}
