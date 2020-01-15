/**
 * @since 2.0.0
 */
import { Eq } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { pipeable } from './pipeable'
import * as RM from './ReadonlyMap'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable2C } from './Witherable'

/* tslint:disable:readonly-array */

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Map: Map<E, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Map'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export const getShow: <K, A>(SK: Show<K>, SA: Show<A>) => Show<Map<K, A>> = RM.getShow

/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
export const size: <K, A>(d: Map<K, A>) => number = RM.size

/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
export const isEmpty: <K, A>(d: Map<K, A>) => boolean = RM.isEmpty

/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
export const member: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => boolean = RM.member

/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
export const elem: <A>(E: Eq<A>) => <K>(a: A, m: Map<K, A>) => boolean = RM.elem

/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
export const keys: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => Array<K> = RM.keys as any

/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
export const values: <A>(O: Ord<A>) => <K>(m: Map<K, A>) => Array<A> = RM.values as any

/**
 * @since 2.0.0
 */
export const collect: <K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => Array<B> = RM.collect as any

/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
export const toArray: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => Array<[K, A]> = RM.toReadonlyArray as any

/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 2.0.0
 */
export function toUnfoldable<K, F extends URIS>(O: Ord<K>, U: Unfoldable1<F>): <A>(d: Map<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> {
  return RM.toUnfoldable(O, U) as any
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export const insertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A> = RM.insertAt as any

/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export const deleteAt: <K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Map<K, A> = RM.deleteAt as any

/**
 * @since 2.0.0
 */
export const updateAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Option<Map<K, A>> = RM.updateAt as any

/**
 * @since 2.0.0
 */
export const modifyAt: <K>(
  E: Eq<K>
) => <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => Option<Map<K, A>> = RM.modifyAt as any

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export const pop: <K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]> = RM.pop as any

/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
export const lookupWithKey: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => Option<[K, A]> = RM.lookupWithKey as any

/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
export const lookup: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => Option<A> = RM.lookup

/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.0.0
 */
export const isSubmap: <K, A>(SK: Eq<K>, SA: Eq<A>) => (d1: Map<K, A>, d2: Map<K, A>) => boolean = RM.isSubmap

/**
 * @since 2.0.0
 */
export const empty = new Map<never, never>()

/**
 * @since 2.0.0
 */
export const getEq: <K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<Map<K, A>> = RM.getEq

/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.0.0
 */
export const getMonoid: <K, A>(SK: Eq<K>, SA: Semigroup<A>) => Monoid<Map<K, A>> = RM.getMonoid as any

/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
export const singleton: <K, A>(k: K, a: A) => Map<K, A> = RM.singleton as any

/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.0.0
 */
export function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, [K, A]>) => Map<K, A>
export function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A>
export function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A> {
  return RM.fromFoldable(E, M, F) as any
}

/**
 * @since 2.0.0
 */
export const getFilterableWithIndex: <K = never>() => FilterableWithIndex2C<
  URI,
  K,
  K
> = RM.getFilterableWithIndex as any

/**
 * @since 2.0.0
 */
export const getWitherable: <K>(
  O: Ord<K>
) => Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K> = RM.getWitherable as any

/**
 * @since 2.0.0
 */
export const map_: Filterable2<URI> = {
  URI,
  map: RM.readonlyMap.map as any,
  compact: RM.readonlyMap.compact as any,
  separate: RM.readonlyMap.separate as any,
  filter: RM.readonlyMap.filter as any,
  filterMap: RM.readonlyMap.filterMap as any,
  partition: RM.readonlyMap.partition as any,
  partitionMap: RM.readonlyMap.partitionMap as any
}

const { filter, filterMap, map, partition, partitionMap, compact, separate } = pipeable(map_)

export {
  /**
   * @since 2.0.0
   */
  filter,
  /**
   * @since 2.0.0
   */
  filterMap,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  partition,
  /**
   * @since 2.0.0
   */
  partitionMap,
  /**
   * @since 2.0.0
   */
  compact,
  /**
   * @since 2.0.0
   */
  separate
}
