import { HKT2, URIS2, URIS3, Type2, Type3 } from './HKT'

/** @typeclass */
export interface Semigroupoid<F> {
  readonly URI: F
  compose: <L, A, B>(bc: HKT2<F, A, B>, ab: HKT2<F, L, A>) => HKT2<F, L, B>
}

export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  compose: <L, A, B>(bc: Type2<F, A, B>, ab: Type2<F, L, A>) => Type2<F, L, B>
}

export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  compose: <U, L, A, B>(bc: Type3<F, U, A, B>, ab: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface Semigroupoid3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  compose: <L, A, B>(bc: Type3<F, U, A, B>, ab: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
