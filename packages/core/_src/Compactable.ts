/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import { pipe } from '@fp-ts/core/Function'
import type { Functor } from '@fp-ts/core/Functor'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Option } from '@fp-ts/core/Option'
import type { Result } from '@fp-ts/core/Result'

/**
 * @category model
 * @since 3.0.0
 */
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
}

/**
 * Returns a default `separate` implementation.
 *
 * @since 3.0.0
 */
export const separate = <F extends TypeLambda>(Functor: Functor<F>, Compactable: Compactable<F>) => {
  return <S, R, O, E, A, B>(
    self: Kind<F, S, R, O, E, Result<A, B>>
  ): readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>] => {
    return [
      pipe(self, Functor.map(_.getFailure), Compactable.compact),
      pipe(self, Functor.map(_.getSuccess), Compactable.compact)
    ]
  }
}

/**
 * Returns a default `compact` composition.
 *
 * @since 3.0.0
 */
export const compactComposition = <F extends TypeLambda, G extends TypeLambda>(
  Functor: Functor<F>,
  Compactable: Compactable<G>
): (<FS, FR, FO, FE, GS, GR, GO, GE, A>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => {
  return Functor.map(Compactable.compact)
}
