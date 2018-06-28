import { HKT2, Type2, Type3, URIS2, URIS3 } from './HKT'
import { Semigroupoid, Semigroupoid2, Semigroupoid3, Semigroupoid3C } from './Semigroupoid'

/**
 * @typeclass
 * @since 1.0.0
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

export interface Category3C<F extends URIS3, U> extends Semigroupoid3C<F, U> {
  readonly id: <A>() => Type3<F, U, A, A>
}
