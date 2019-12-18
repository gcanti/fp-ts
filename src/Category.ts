/**
 * See [Getting started with fp-ts: Category](https://dev.to/gcanti/getting-started-with-fp-ts-category-4c9a)
 *
 * @since 2.0.0
 */
import { HKT2, Kind2, Kind3, URIS2, URIS3, URIS4, Kind4 } from './HKT'
import { Semigroupoid, Semigroupoid2, Semigroupoid3, Semigroupoid4 } from './Semigroupoid'

/**
 * @since 2.0.0
 */
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}

/**
 * @since 2.0.0
 */
export interface Category2<F extends URIS2> extends Semigroupoid2<F> {
  readonly id: <A>() => Kind2<F, A, A>
}

/**
 * @since 2.0.0
 */
export interface Category3<F extends URIS3> extends Semigroupoid3<F> {
  readonly id: <R, A>() => Kind3<F, R, A, A>
}

/**
 * @since 2.0.0
 */
export interface Category4<F extends URIS4> extends Semigroupoid4<F> {
  readonly id: <S, R, A>() => Kind4<F, S, R, A, A>
}
