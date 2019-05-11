import { HKT2, Type2, Type3, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
  readonly mapLeft: <L, A, M>(fla: HKT2<F, L, A>, f: (l: L) => M) => HKT2<F, M, A>
}

/**
 * @since 2.0.0
 */
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
  readonly mapLeft: <L, A, M>(fla: Type2<F, L, A>, f: (l: L) => M) => Type2<F, M, A>
}

/**
 * @since 2.0.0
 */
export interface Bifunctor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly bimap: <A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
  readonly mapLeft: <A, M>(fla: Type2<F, L, A>, f: (l: L) => M) => Type2<F, M, A>
}

/**
 * @since 2.0.0
 */
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <U, L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => Type3<F, U, M, B>
  readonly mapLeft: <U, L, A, M>(fla: Type3<F, U, L, A>, f: (l: L) => M) => Type3<F, U, M, A>
}
