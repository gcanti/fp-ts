/**
 * `TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type { Compactable } from '@fp-ts/core/Compactable'
import * as compactable from '@fp-ts/core/Compactable'
import { flow, pipe } from '@fp-ts/core/Function'
import type { Functor } from '@fp-ts/core/Functor'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Option } from '@fp-ts/core/Option'
import type { Result } from '@fp-ts/core/Result'
import type { Traversable } from '@fp-ts/core/Traversable'

/**
 * @category model
 * @since 3.0.0
 */
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
  readonly traversePartitionMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly traverseFilterMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traversePartitionMap` implementation.
 *
 * @since 3.0.0
 */
export const traversePartitionMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Functor: Functor<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>['traversePartitionMap'] => {
  const separate = compactable.separate(Functor, Compactable)
  return (Applicative) => {
    const traverse = Traversable.traverse(Applicative)
    return (f) => flow(traverse(f), Applicative.map(separate))
  }
}

/**
 * Returns a default `traverseFilterMap` implementation.
 *
 * @since 3.0.0
 */
export const traverseFilterMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>['traverseFilterMap'] => {
  return (Applicative) => {
    const traverse = Traversable.traverse(Applicative)
    return (f) => flow(traverse(f), Applicative.map(Compactable.compact))
  }
}

/**
 * Returns a default `traverseFilter` implementation.
 *
 * @since 3.0.0
 */
export const traverseFilter = <T extends TypeLambda>(TraversableFilterable: TraversableFilterable<T>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, B>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>) => {
    const traverseFilterMap = TraversableFilterable.traverseFilterMap(Applicative)
    return (predicate) => {
      return traverseFilterMap((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? _.some(b) : _.none))
        )
      )
    }
  }

/**
 * Returns a default `traversePartition` implementation.
 *
 * @since 3.0.0
 */
export const traversePartition = <T extends TypeLambda>(TraversableFilterable: TraversableFilterable<T>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, B>]>) => {
    const traversePartitionMap = TraversableFilterable.traversePartitionMap(Applicative)
    return (predicate) => {
      return traversePartitionMap((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? _.succeed(b) : _.fail(b)))
        )
      )
    }
  }
