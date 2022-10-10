/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import { identity } from '../Function'
import type { TypeLambda, Kind, TypeClass } from '../HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traverse` composition.
 *
 * @since 3.0.0
 */
export const traverseComposition =
  <F extends TypeLambda, G extends TypeLambda>(TraversableF: Traversable<F>, TraversableG: Traversable<G>) =>
  <H extends TypeLambda>(H: Applicative<H>) =>
  <A, S, R, O, E, B>(
    f: (a: A) => Kind<H, S, R, O, E, B>
  ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
    fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
    TraversableF.traverse(H)(TraversableG.traverse(H)(f))

/**
 * @since 3.0.0
 */
export const sequence =
  <T extends TypeLambda>(Traversable: Traversable<T>) =>
  <F extends TypeLambda>(
    G: Applicative<F>
  ): (<TS, TR, TO, TE, S, R, O, E, A>(
    self: Kind<T, TS, TR, TO, TE, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, A>>) =>
    Traversable.traverse(G)(identity)
