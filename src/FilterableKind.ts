/**
 * `FilterableKind` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Compactable } from './Compactable'
import * as compactable from './Compactable'
import type { Result } from './Result'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as _ from './internal'
import type { Option } from './Option'
import type { Traversable } from './Traversable'

/**
 * @category model
 * @since 3.0.0
 */
export interface FilterableKind<T extends TypeLambda> extends TypeClass<T> {
  readonly partitionMapKind: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly filterMapKind: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `partitionMapKind` implementation.
 *
 * @since 3.0.0
 */
export function partitionMapKind<T extends TypeLambda>(
  Traversable: Traversable<T>,
  Functor: Functor<T>,
  Compactable: Compactable<T>
): FilterableKind<T>['partitionMapKind'] {
  const separate = compactable.separate(Functor, Compactable)
  return (Applicative) => {
    const traverse = Traversable.traverse(Applicative)
    return (f) => flow(traverse(f), Applicative.map(separate))
  }
}

/**
 * Returns a default `filterMapKind` implementation.
 *
 * @since 3.0.0
 */
export function filterMapKind<T extends TypeLambda>(
  Traversable: Traversable<T>,
  Compactable: Compactable<T>
): FilterableKind<T>['filterMapKind'] {
  return (Applicative) => {
    const traverse = Traversable.traverse(Applicative)
    return (f) => flow(traverse(f), Applicative.map(Compactable.compact))
  }
}

/**
 * Returns a default `filterKind` implementation.
 *
 * @since 3.0.0
 */
export const filterKind =
  <G extends TypeLambda>(FilterableKind: FilterableKind<G>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(self: Kind<G, GS, GR, GO, GE, B>) => Kind<F, S, R, O, E, Kind<G, GS, GR, GO, GE, B>>) => {
    const filterMapKind = FilterableKind.filterMapKind(Applicative)
    return (predicate) => {
      return filterMapKind((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? _.some(b) : _.none))
        )
      )
    }
  }

/**
 * Returns a default `partitionKind` implementation.
 *
 * @since 3.0.0
 */
export const partitionKind =
  <G extends TypeLambda>(FilterableKind: FilterableKind<G>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <GS, GR, GO, GE>(
    self: Kind<G, GS, GR, GO, GE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<G, GS, GR, GO, GE, B>, Kind<G, GS, GR, GO, GE, B>]>) => {
    const partitionMapKind = FilterableKind.partitionMapKind(Applicative)
    return (predicate) => {
      return partitionMapKind((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? _.succeed(b) : _.fail(b)))
        )
      )
    }
  }
