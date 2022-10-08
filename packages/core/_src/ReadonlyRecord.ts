/**
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type * as compactable from '@fp-ts/core/Compactable'
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import * as filterable from '@fp-ts/core/Filterable'
import * as filterableWithIndex from '@fp-ts/core/FilterableWithIndex'
import type * as foldable from '@fp-ts/core/Foldable'
import type * as foldableWithIndex from '@fp-ts/core/FoldableWithIndex'
import { identity, pipe } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type * as functorWithIndex from '@fp-ts/core/FunctorWithIndex'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type { Magma } from '@fp-ts/core/Magma'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { Option } from '@fp-ts/core/Option'
import * as option from '@fp-ts/core/Option'
import type { Ord } from '@fp-ts/core/Ord'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Show } from '@fp-ts/core/Show'
import type * as traversable from '@fp-ts/core/Traversable'
import * as traversableFilterable from '@fp-ts/core/TraversableFilterable'
import type * as traversableWithIndex from '@fp-ts/core/TraversableWithIndex'
import type { Unfoldable } from '@fp-ts/core/Unfoldable'

/**
 * @category model
 * @since 3.0.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlyRecordTypeLambda extends TypeLambda {
  readonly type: ReadonlyRecord<string, this['Out1']>
}

/**
 * Create a `ReadonlyRecord` from one key/value pair.
 *
 * @category constructors
 * @since 3.0.0
 */
export const singleton = <A>(k: string, a: A): ReadonlyRecord<string, A> => ({ [k]: a })

/**
 * Create a `ReadonlyRecord` from a `Iterable` collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromIterable = <B>(M: Magma<B>) =>
  <A>(f: (a: A) => readonly [string, B]): ((self: Iterable<A>) => ReadonlyRecord<string, B>) =>
    iterable.reduce<Record<string, B>, A>({}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _.has.call(r, k) ? M.combine(b)(r[k]) : b
      return r
    })

/**
 * Insert an element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key already exists.
 *
 * @since 3.0.0
 */
export const insertAt = <A>(k: string, a: A) =>
  (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!_.has.call(r, k)) {
      const out: Record<string, A> = Object.assign({}, r)
      out[k] = a
      return _.some(out)
    }
    return _.none
  }

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const upsertAt = <A>(k: string, a: A) =>
  (r: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (_.has.call(r, k) && r[k] === a) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return out
  }

/**
 * Change the element at the specified keys, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const updateAt = <A>(k: string, a: A): ((r: ReadonlyRecord<string, A>) => Option<ReadonlyRecord<string, A>>) =>
  modifyAt(k, () => a)

/**
 * Apply a function to the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const modifyAt = <A>(k: string, f: Endomorphism<A>) =>
  (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!has(k, r)) {
      return _.none
    }
    const a = f(r[k])
    if (a === r[k]) {
      return _.some(r)
    }
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return _.some(out)
  }

/**
 * Delete the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const deleteAt = (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!_.has.call(r, k)) {
      return _.none
    }
    const out: Record<string, A> = Object.assign({}, r)
    delete out[k]
    return _.some(out)
  }

/**
 * Delete the element at the specified key, returning the value as well as the subsequent `ReadonlyRecord`,
 * or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const pop = (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<readonly [A, ReadonlyRecord<string, A>]> =>
    pipe(
      r,
      deleteAt(k),
      option.map((out) => [r[k], out])
    )

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B): (<K extends string>(r: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>) =>
  mapWithIndex((_, a) => f(a))

/**
 * Map a `ReadonlyRecord` passing both the keys and values to the iterating function.
 *
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function mapWithIndex<A, B>(
  f: (k: string, a: A) => B
): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (r) => {
    const out: Record<string, B> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        out[k] = f(k, r[k])
      }
    }
    return out
  }
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const keys = (O: Ord<string>) =>
  <K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> =>
    (Object.keys(r) as Array<K>).sort((self, that) => O.compare(that)(self))

/**
 * @since 3.0.0
 */
export const traverseWithIndex = (
  O: Ord<string>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <K extends string, A, S, R, O, E, B>(
  f: (k: K, a: A) => Kind<F, S, R, O, E, B>
) => (r: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, ReadonlyRecord<K, B>>) => {
  const keysO = keys(O)
  return <F extends TypeLambda>(F: Applicative<F>) =>
    <K extends string, A, S, R, O, E, B>(f: (k: K, a: A) => Kind<F, S, R, O, E, B>) =>
      (r: ReadonlyRecord<K, A>) => {
        if (isEmpty(r)) {
          return F.of(empty)
        }
        let out: Kind<F, S, R, O, E, Record<string, B>> = F.of({})
        for (const key of keysO(r)) {
          out = pipe(
            out,
            F.map((r) => (b: B) => Object.assign({}, r, { [key]: b })),
            F.ap(f(key, r[key]))
          )
        }
        return out as any
      }
}

/**
 * @since 3.0.0
 */
export function traverse(
  O: Ord<string>
): <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, ReadonlyRecord<K, B>> {
  const traverseWithIndexO = traverseWithIndex(O)
  return (F) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return (f) => traverseWithIndexOF((_, a) => f(a))
  }
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence = (O: Ord<string>) => {
  const traverseO = traverse(O)
  return <F extends TypeLambda>(
    F: Applicative<F>
  ): (<K extends string, S, R, O, E, A>(
    ta: ReadonlyRecord<K, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyRecord<K, A>>) => {
    return traverseO(F)(identity)
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Result<B, C>
): (r: ReadonlyRecord<K, A>) => readonly [ReadonlyRecord<string, B>, ReadonlyRecord<string, C>] {
  return (r) => {
    const left: Record<string, B> = {}
    const right: Record<string, C> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const e = f(k, r[k])
        if (_.isFailure(e)) {
          left[k] = e.failure
        } else {
          right[k] = e.success
        }
      }
    }
    return [left, right]
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (r) => {
    if (isEmpty(r)) {
      return r
    }
    const out: Record<string, B> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const ob = f(k, r[k])
        if (_.isSome(ob)) {
          out[k] = ob.value
        }
      }
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const filterMap: <A, B>(
  f: (a: A) => option.Option<B>
) => (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: Readonly<Record<string, A>>) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>] = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact = <A>(r: ReadonlyRecord<string, Option<A>>): ReadonlyRecord<string, A> => {
  const out: Record<string, A> = {}
  for (const k in r) {
    if (_.has.call(r, k)) {
      const oa = r[k]
      if (_.isSome(oa)) {
        out[k] = oa.value
      }
    }
  }
  return out
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate = <A, B>(
  r: ReadonlyRecord<string, Result<A, B>>
): readonly [ReadonlyRecord<string, A>, ReadonlyRecord<string, B>] => {
  const left: Record<string, A> = {}
  const right: Record<string, B> = {}
  for (const k in r) {
    if (_.has.call(r, k)) {
      const e = r[k]
      if (_.isFailure(e)) {
        left[k] = e.failure
      } else {
        right[k] = e.success
      }
    }
  }
  return [left, right]
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = (O: Ord<string>): (<A>(S: Show<A>) => Show<ReadonlyRecord<string, A>>) => {
  const collectO = collect(O)
  return <A>(S: Show<A>) => {
    const f = collectO((k, a: A) => `${JSON.stringify(k)}: ${S.show(a)}`)
    return {
      show: (r: ReadonlyRecord<string, A>) => {
        const elements = f(r).join(', ')
        return elements === '' ? '{}' : `{ ${elements} }`
      }
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getEq<A, K extends string>(E: Eq<A>): Eq<ReadonlyRecord<K, A>> {
  const isSubrecordE = isSubrecord(E)
  return eq.fromEquals((that) => (self) => isSubrecordE(self)(that) && isSubrecordE(that)(self))
}

/**
 * Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.
 *
 * @example
 * import * as N from '@fp-ts/core/number'
 * import { getMonoid } from '@fp-ts/core/ReadonlyRecord'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe({ foo: 123 }, M.combine({ foo: 456 })), { foo: 579 })
 *
 * @category instances
 * @since 3.0.0
 */
export function getMonoid<A, K extends string>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    combine: (that) =>
      (self) => {
        if (isEmpty(self)) {
          return that
        }
        if (isEmpty(that)) {
          return self
        }
        const r: Record<string, A> = Object.assign({}, self)
        for (const k in that) {
          if (_.has.call(that, k)) {
            r[k] = _.has.call(self, k) ? S.combine(that[k])(self[k]) : that[k]
          }
        }
        return r
      },
    empty
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReadonlyRecordTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Readonly<Record<string, (a: A) => B>>) => Readonly<Record<string, B>> = functor
  .flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyRecordTypeLambda, string> = {
  mapWithIndex
}

// TODO: modify return type to Iterable<A>
/**
 * @category conversions
 * @since 3.0.0
 */
export const values = (O: Ord<string>): (<A>(self: ReadonlyRecord<string, A>) => ReadonlyArray<A>) =>
  collect(O)((_, a) => a)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = (O: Ord<string>): foldable.Foldable<ReadonlyRecordTypeLambda> => ({
  toIterable: values(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = (
  O: Ord<string>
): foldableWithIndex.FoldableWithIndex<ReadonlyRecordTypeLambda, string> => ({
  toEntries: toEntries(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<ReadonlyRecordTypeLambda> = {
  compact
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyRecordTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: ReadonlyRecord<string, C>
  ) => ReadonlyRecord<string, B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: ReadonlyRecord<string, B>) => ReadonlyRecord<string, B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: Readonly<Record<string, C>>
  ) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
  <B extends A, A = B>(predicate: Predicate<A>): (
    fb: Readonly<Record<string, B>>
  ) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<ReadonlyRecordTypeLambda, string> = {
  filterMapWithIndex,
  partitionMapWithIndex
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: string, a: A) => a is B): (
    fc: Readonly<Record<string, C>>
  ) => Readonly<Record<string, B>>
  <B extends A, A = B>(predicate: (i: string, a: A) => boolean): (
    fb: Readonly<Record<string, B>>
  ) => Readonly<Record<string, B>>
} = filterableWithIndex.filterWithIndex(FilterableWithIndex)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: string, a: A) => a is B): (
    fb: Readonly<Record<string, C>>
  ) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
  <B extends A, A = B>(predicate: (i: string, a: A) => boolean): (
    fb: Readonly<Record<string, B>>
  ) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
} = filterableWithIndex.partitionWithIndex(FilterableWithIndex)

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = (O: Ord<string>): traversable.Traversable<ReadonlyRecordTypeLambda> => ({
  traverse: traverse(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableWithIndex = (
  O: Ord<string>
): traversableWithIndex.TraversableWithIndex<ReadonlyRecordTypeLambda, string> => ({
  traverseWithIndex: traverseWithIndex(O)
})

/**
 * @category filtering
 * @since 3.0.0
 */
export const traverseFilterMap: (
  O: Ord<string>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, option.Option<B>>
) => (ta: Readonly<Record<string, A>>) => Kind<F, S, R, O, E, Readonly<Record<string, B>>> = (O) =>
  traversableFilterable.traverseFilterMap(getTraversable(O), Compactable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartitionMap: (
  O: Ord<string>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (
  wa: Readonly<Record<string, A>>
) => Kind<F, S, R, O, E, readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>]> = (O) =>
  traversableFilterable.traversePartitionMap(getTraversable(O), Functor, Compactable)

// TODO: traverseFilter, traversePartition

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableFilterable = (
  O: Ord<string>
): traversableFilterable.TraversableFilterable<ReadonlyRecordTypeLambda> => ({
  traverseFilterMap: traverseFilterMap(O),
  traversePartitionMap: traversePartitionMap(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  combine: union(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> => ({
  combine: getUnionSemigroup(S).combine,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  combine: intersection(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(): Magma<ReadonlyRecord<string, A>> => ({
  combine: difference
})

/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const size = <A>(r: ReadonlyRecord<string, A>): number => Object.keys(r).length

/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = <A>(r: ReadonlyRecord<string, A>): r is ReadonlyRecord<string, never> => {
  for (const k in r) {
    if (_.has.call(r, k)) {
      return false
    }
  }
  return true
}

/**
 * Map a `ReadonlyRecord` into an `ReadonlyArray`.
 *
 * @example
 * import { collect } from '@fp-ts/core/ReadonlyRecord'
 * import * as S from '@fp-ts/core/string'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect(S.Ord)((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @category conversions
 * @since 3.0.0
 */
export const collect = (
  O: Ord<string>
): (<K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>) => {
  const keysO = keys(O)
  return <K extends string, A, B>(f: (k: K, a: A) => B) =>
    (r: ReadonlyRecord<K, A>) => {
      const out: Array<B> = []
      for (const k of keysO(r)) {
        out.push(f(k, r[k]))
      }
      return out
    }
}

/**
 * Unfolds a `ReadonlyRecord` into a data structure of key/value pairs.
 *
 * @since 3.0.0
 */
export function toUnfoldable(
  O: Ord<string>
): <F extends TypeLambda>(
  U: Unfoldable<F>
) => <K extends string, A, S, R, O, E>(r: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, readonly [K, A]> {
  const toReadonlyArrayO = toEntries(O)
  return (U) =>
    (r) => {
      const as = toReadonlyArrayO(r)
      const len = as.length
      return U.unfold(0, (b) => (b < len ? _.some([as[b], b + 1]) : _.none))
    }
}

/**
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a custom type guard.
 *
 * @since 3.0.0
 */
export const has = <K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K => _.has.call(r, k)

/**
 * Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const isSubrecord = <A>(E: Eq<A>) =>
  (that: ReadonlyRecord<string, A>) =>
    (self: ReadonlyRecord<string, A>): boolean => {
      for (const k in self) {
        if (!_.has.call(that, k) || !E.equals(that[k])(self[k])) {
          return false
        }
      }
      return true
    }

/**
 * Lookup the value for a key in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const lookup = (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<A> => _.has.call(r, k) ? _.some(r[k]) : _.none

/**
 * @since 3.0.0
 */
export const empty: ReadonlyRecord<string, never> = _.emptyReadonlyRecord

/**
 * @since 3.0.0
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>> {
  return (r) => {
    for (const k in r) {
      if (!predicate(r[k])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 3.0.0
 */
export const some = <A>(predicate: (a: A) => boolean) =>
  (r: ReadonlyRecord<string, A>): boolean => {
    for (const k in r) {
      if (predicate(r[k])) {
        return true
      }
    }
    return false
  }

/**
 * Tests whether a value is a member of a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) =>
  (a: A): ((r: ReadonlyRecord<string, A>) => boolean) => {
    const predicate = E.equals(a)
    return (r) => {
      for (const k in r) {
        if (predicate(r[k])) {
          return true
        }
      }
      return false
    }
  }

/**
 * @since 3.0.0
 */
export const union = <A>(M: Magma<A>) =>
  (that: ReadonlyRecord<string, A>) =>
    (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
      if (isEmpty(self)) {
        return that
      }
      if (isEmpty(that)) {
        return self
      }
      const out: Record<string, A> = {}
      for (const k in self) {
        if (has(k, that)) {
          out[k] = M.combine(that[k])(self[k])
        } else {
          out[k] = self[k]
        }
      }
      for (const k in that) {
        if (!has(k, out)) {
          out[k] = that[k]
        }
      }
      return out
    }

/**
 * @since 3.0.0
 */
export const intersection = <A>(M: Magma<A>) =>
  (that: ReadonlyRecord<string, A>) =>
    (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
      if (isEmpty(self) || isEmpty(that)) {
        return empty
      }
      const out: Record<string, A> = {}
      for (const k in self) {
        if (has(k, that)) {
          out[k] = M.combine(that[k])(self[k])
        }
      }
      return out
    }

/**
 * @since 3.0.0
 */
export const difference = <A>(that: ReadonlyRecord<string, A>) =>
  (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (isEmpty(self)) {
      return that
    }
    if (isEmpty(that)) {
      return self
    }
    const out: Record<string, A> = {}
    for (const k in self) {
      if (!has(k, that)) {
        out[k] = self[k]
      }
    }
    for (const k in that) {
      if (!has(k, self)) {
        out[k] = that[k]
      }
    }
    return out
  }

/**
 * Converts a `ReadonlyRecord` into a `ReadonlyArray` of `[key, value]` tuples.
 *
 * @example
 * import { toEntries } from '@fp-ts/core/ReadonlyRecord'
 * import * as string from '@fp-ts/core/string'
 *
 * assert.deepStrictEqual(toEntries(string.Ord)({ a: 1, b: 2 }), [['a', 1], ['b', 2]])
 *
 * @since 3.0.0
 */
export const toEntries = (
  O: Ord<string>
): (<K extends string, A>(r: ReadonlyRecord<K, A>) => ReadonlyArray<readonly [K, A]>) => collect(O)((k, a) => [k, a])

/**
 * Converts a `ReadonlyArray` of `[key, value]` tuples into a `ReadonlyRecord`.
 *
 * @example
 * import { fromEntries } from '@fp-ts/core/ReadonlyRecord'
 *
 * assert.deepStrictEqual(fromEntries([['a', 1], ['b', 2], ['a', 3]]), { b: 2, a: 3 })
 *
 * @since 3.0.0
 */
export const fromEntries = <A>(fa: ReadonlyArray<readonly [string, A]>): ReadonlyRecord<string, A> => {
  const out: Record<string, A> = {}
  for (const a of fa) {
    out[a[0]] = a[1]
  }
  return out
}
