/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 3.0.0
 */
import type { Either } from './Either'
import { pipe } from './Function'
import type { Functor } from './Functor'
import type { Kind, TypeClass, TypeLambda } from './HKT'
import * as _ from './internal'
import type { Option } from './Option'

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
    self: Kind<F, S, R, O, E, Either<A, B>>
  ): readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>] => {
    return [
      pipe(self, Functor.map(_.getLeft), Compactable.compact),
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
