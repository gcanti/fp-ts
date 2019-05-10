/**
 * @file This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.
 */
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'

/**
 * @since 2.0.0
 */
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}

export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type<F, A>
}

export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfold: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}

export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfold: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>
}

export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}
