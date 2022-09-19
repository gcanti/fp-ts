/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import { flow, identity, pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable<F extends HKT> extends Functor<F> {
  readonly traverse: <G extends HKT>(
    G: Applicative<G>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<G, S, R, W, E, B>
  ) => <FS, FR, FW, FE>(fa: Kind<F, FS, FR, FW, FE, A>) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, B>>
  readonly sequence: <G extends HKT>(
    G: Applicative<G>
  ) => <FS, FR, FW, FE, S, R, W, E, A>(
    fa: Kind<F, FS, FR, FW, FE, Kind<G, S, R, W, E, A>>
  ) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, A>>
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
export const sequenceDefault =
  <F extends HKT>(traverse: Traversable<F>['traverse']): Traversable<F>['sequence'] =>
  (G) =>
  (fa) =>
    pipe(fa, traverse(G)(identity))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `traverse` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const traverse =
  <F extends HKT, G extends HKT>(F: Traversable<F>, G: Traversable<G>) =>
  <H extends HKT>(H: Applicative<H>) =>
  <A, S, R, W, E, B>(
    f: (a: A) => Kind<H, S, R, W, E, B>
  ): (<FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Kind<H, S, R, W, E, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>>) => {
    return F.traverse(H)(G.traverse(H)(f))
  }

/**
 * `sequence` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const sequence =
  <F extends HKT, G extends HKT>(F: Traversable<F>, G: Traversable<G>) =>
  <H extends HKT>(
    H: Applicative<H>
  ): (<FS, FR, FW, FE, GS, GR, GW, GE, S, R, W, E, A>(
    fgha: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Kind<H, S, R, W, E, A>>>
  ) => Kind<H, S, R, W, E, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>>) => {
    return flow(F.map(G.sequence(H)), F.sequence(H))
  }
