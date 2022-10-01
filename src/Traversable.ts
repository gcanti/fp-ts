/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import { identity } from './Function'
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Traversable<F extends TypeLambda> extends TypeClass<F> {
  readonly traverse: <G extends TypeLambda>(
    G: Applicative<G>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<G, S, R, O, E, B>
  ) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, B>>
}

// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a default `sequence` implementation from `traverse`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const getDefaultSequence =
  <F extends TypeLambda>(traverse: Traversable<F>['traverse']) =>
  <G extends TypeLambda>(
    G: Applicative<G>
  ): (<FS, FR, FO, FE, S, R, O, E, A>(
    fa: Kind<F, FS, FR, FO, FE, Kind<G, S, R, O, E, A>>
  ) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, A>>) => {
    return traverse(G)(identity)
  }

// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------

/**
 * @category compositions
 * @since 3.0.0
 */
export const getTraverseComposition =
  <F extends TypeLambda, G extends TypeLambda>(TraversableF: Traversable<F>, TraversableG: Traversable<G>) =>
  <H extends TypeLambda>(H: Applicative<H>) =>
  <A, S, R, O, E, B>(
    f: (a: A) => Kind<H, S, R, O, E, B>
  ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
    fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) => {
    return TraversableF.traverse(H)(TraversableG.traverse(H)(f))
  }
