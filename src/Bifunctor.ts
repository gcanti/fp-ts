import { HKT2, HKT3, URIS2, URIS3, Type2, Type3 } from './HKT'

/** @typeclass */
export interface Bifunctor<F> {
  readonly URI: F
  bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
}

export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  bimap: <L, A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
}

export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  bimap: <U, L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT3<F, U, M, B>
}

export interface Bifunctor3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  bimap: <L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT3<F, U, M, B>
}
