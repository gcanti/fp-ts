/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import { Either } from './Either'
import { pipe } from './function'
import { Functor, Functor1, Functor2, map } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { getLeft, getRight, Option } from './Option'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable<F> {
  readonly URI?: F
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable1<F extends URIS> {
  readonly URI?: F
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fa: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable2<F extends URIS2> {
  readonly URI?: F
  readonly compact: <E, A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly compact: <A>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(fa: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable3<F extends URIS3> {
  readonly URI?: F
  readonly compact: <R, E, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly compact: <R, A>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(fa: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Compactable4<F extends URIS4> {
  readonly URI?: F
  readonly compact: <S, R, E, A>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const separated = <A, B>(left: A, right: B): Separated<A, B> => ({ left, right })

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `compact` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function compact<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Compactable2C<G, E>
): <FE, A>(fa: Kind2<F, FE, Kind2<G, E, Option<A>>>) => Kind2<F, FE, Kind2<G, E, A>>
export function compact<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Compactable2C<G, E>
): <A>(fa: Kind<F, Kind2<G, E, Option<A>>>) => Kind<F, Kind2<G, E, A>>
export function compact<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Compactable1<G>
): <A>(fa: Kind<F, Kind<G, Option<A>>>) => Kind<F, Kind<G, A>>
export function compact<F, G>(F: Functor<F>, G: Compactable<G>): <A>(fa: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>>
export function compact<F, G>(
  F: Functor<F>,
  G: Compactable<G>
): <A>(fa: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>> {
  return F.map(G.compact)
}

/**
 * `separate` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function separate<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Compactable2C<G, E> & Functor2<G>
): <FE, A, B>(
  fge: Kind2<F, FE, Kind2<G, E, Either<A, B>>>
) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, B>>>
export function separate<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Compactable2C<G, E> & Functor2<G>
): <A, B>(fge: Kind<F, Kind2<G, E, Either<A, B>>>) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, B>>>
export function separate<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Compactable1<G> & Functor1<G>
): <A, B>(fge: Kind<F, Kind<G, Either<A, B>>>) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, B>>>
export function separate<F, G>(
  F: Functor<F>,
  G: Compactable<G> & Functor<G>
): <A, B>(fge: HKT<F, HKT<G, Either<A, B>>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>>
export function separate<F, G>(
  F: Functor<F>,
  G: Compactable<G> & Functor<G>
): <A, B>(fge: HKT<F, HKT<G, Either<A, B>>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>> {
  const _compact = compact(F, G)
  const _map = map(F, G)
  return (fge) => separated(_compact(pipe(fge, _map(getLeft))), _compact(pipe(fge, _map(getRight))))
}
