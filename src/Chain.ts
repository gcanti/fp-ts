/**
 * @since 3.0.0
 */
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import { pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain<M> extends Functor<M> {
  readonly chain: <A, B>(f: (a: A) => HKT<M, B>) => (ma: HKT<M, A>) => HKT<M, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain1<M extends URIS> extends Functor1<M> {
  readonly chain: <A, B>(f: (a: A) => Kind<M, B>) => (ma: Kind<M, A>) => Kind<M, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain2<M extends URIS2> extends Functor2<M> {
  readonly chain: <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain2C<M extends URIS2, E> extends Functor2C<M, E> {
  readonly chain: <A, B>(f: (a: A) => Kind2<M, E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain3<M extends URIS3> extends Functor3<M> {
  readonly chain: <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain3C<M extends URIS3, E> extends Functor3C<M, E> {
  readonly chain: <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Chain4<M extends URIS4> extends Functor4<M> {
  readonly chain: <A, S, R, E, B>(
    f: (a: A) => Kind4<M, S, R, E, B>
  ) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// derivables
// -------------------------------------------------------------------------------------

/**
 * @category derivables
 * @since 3.0.0
 */
export function ap<F extends URIS4>(M: Chain4<F>): Apply4<F>['ap']
export function ap<F extends URIS3>(M: Chain3<F>): Apply3<F>['ap']
export function ap<F extends URIS3, E>(M: Chain3C<F, E>): Apply3C<F, E>['ap']
export function ap<F extends URIS2>(M: Chain2<F>): Apply2<F>['ap']
export function ap<F extends URIS2, E>(M: Chain2C<F, E>): Apply2C<F, E>['ap']
export function ap<F extends URIS>(M: Chain1<F>): Apply1<F>['ap']
export function ap<F>(M: Chain<F>): Apply<F>['ap']
export function ap<F>(M: Chain<F>): Apply<F>['ap'] {
  return (fa) => M.chain((f) => pipe(fa, M.map(f)))
}

/**
 * @category derivables
 * @since 3.0.0
 */
export function chainFirst<M extends URIS4>(
  M: Chain4<M>
): <A, S, R, E, B>(f: (a: A) => Kind4<M, S, R, E, B>) => (first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirst<M extends URIS3>(
  M: Chain3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst<M extends URIS3, E>(
  M: Chain3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, B>) => (first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirst<M extends URIS2>(
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst<M extends URIS2, E>(
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirst<M extends URIS>(
  M: Chain1<M>
): <A, B>(f: (a: A) => Kind<M, B>) => (first: Kind<M, A>) => Kind<M, A>
export function chainFirst<M>(M: Chain<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A>
export function chainFirst<M>(M: Chain<M>): <A, B>(f: (a: A) => HKT<M, B>) => (first: HKT<M, A>) => HKT<M, A> {
  return (f) =>
    M.chain((a) =>
      pipe(
        f(a),
        M.map(() => a)
      )
    )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function bind<M extends URIS4>(
  M: Chain4<M>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS3>(
  M: Chain3<M>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS3, E>(
  M: Chain3C<M, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS2>(
  M: Chain2<M>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS2, E>(
  M: Chain2C<M, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, A>) => Kind2<M, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M extends URIS>(
  M: Chain1<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, B>
) => (ma: Kind<M, A>) => Kind<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M>(
  M: Chain<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function bind<M>(
  M: Chain<M>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT<M, B>
) => (ma: HKT<M, A>) => HKT<M, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return (name, f) =>
    M.chain((a) =>
      pipe(
        f(a),
        M.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )
}
