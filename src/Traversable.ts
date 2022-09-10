/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import { flow } from './function'
import type { Functor } from './Functor'
import type { ComposeF, HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable<T extends HKT> extends Functor<T> {
  readonly traverse: <F extends HKT>(
    F: Applicative<F>
  ) => <A, FS, FR, FE, B, TS, TR, TE>(
    f: (a: A) => Kind<F, FS, FR, FE, B>
  ) => (ta: Kind<T, TS, TR, TE, A>) => Kind<F, FS, FR, FE, Kind<T, TS, TR, TE, B>>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `traverse` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function traverse<F extends HKT, G extends HKT>(
  T: Traversable<F>,
  G: Traversable<G>
): Traversable<ComposeF<F, G>>['traverse'] {
  // TODO
  return (F) => flow(G.traverse(F), T.traverse(F)) as any
}
