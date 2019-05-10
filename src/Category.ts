import { HKT2, Type2, Type3, URIS2, URIS3, URIS4, Type4 } from './HKT'
import { Semigroupoid, Semigroupoid2, Semigroupoid3, Semigroupoid4 } from './Semigroupoid'

/**
 * @since 2.0.0
 */
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}

export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Type2<F, A, A>
}

export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <U, A>() => Type3<F, U, A, A>
}

export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <X, U, A>() => Type4<F, X, U, A, A>
}
