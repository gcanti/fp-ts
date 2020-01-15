/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { pipeable } from './pipeable'
import * as RR from './ReadonlyRecord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

/* tslint:disable:readonly-array */

declare module './HKT' {
  interface URItoKind<A> {
    readonly Record: Record<string, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Record'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Record<string, A>> = RR.getShow

/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export const size: (r: Record<string, unknown>) => number = RR.size

/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export const isEmpty: (r: Record<string, unknown>) => boolean = RR.isEmpty

/**
 * @since 2.0.0
 */
export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> = RR.keys as any

/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
export const collect: <K extends string, A, B>(
  f: (k: K, a: A) => B
) => (r: Record<K, A>) => Array<B> = RR.collect as any

/**
 * @since 2.0.0
 */
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> = RR.toReadonlyArray as any

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 2.0.0
 */
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <A>(r: Record<string, A>) => HKT<F, [string, A]> {
  return RR.toUnfoldable(U) as any
}

/**
 * Insert or replace a key/value pair in a record
 *
 * @since 2.0.0
 */
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A>
export function insertAt<A>(k: string, a: A): (r: Record<string, A>) => Record<string, A> {
  return RR.insertAt(k, a) as any
}

/**
 * @since 2.0.0
 */
export const hasOwnProperty: <K extends string>(k: string, r: Record<K, unknown>) => k is K = RR.hasOwnProperty

/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: Record<string, A>) => Record<string, A> {
  return RR.deleteAt(k) as any
}

/**
 * @since 2.0.0
 */
export const updateAt: <A>(k: string, a: A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>> = RR.updateAt

/**
 * @since 2.0.0
 */
export const modifyAt: <A>(k: string, f: (a: A) => A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>> =
  RR.modifyAt

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]>
export function pop(k: string): <A>(r: Record<string, A>) => Option<[A, Record<string, A>]> {
  return RR.pop(k) as any
}

/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export const isSubrecord: <A>(E: Eq<A>) => (x: Record<string, A>, y: Record<string, A>) => boolean = RR.isSubrecord

/**
 * @since 2.0.0
 */
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>>
export function getEq<A>(E: Eq<A>): Eq<Record<string, A>> {
  return RR.getEq(E)
}

/**
 * Returns a `Semigroup` instance for records given a `Semigroup` instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/Record'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 2.0.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>> {
  return RR.getMonoid(S)
}

/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export const lookup: <A>(k: string, r: Record<string, A>) => Option<A> = RR.lookup

/**
 * @since 2.0.0
 */
export const empty: Record<string, never> = {}

/**
 * Map a record passing the keys to the iterating function
 *
 * @since 2.0.0
 */
export function mapWithIndex<K extends string, A, B>(f: (k: K, a: A) => B): (fa: Record<K, A>) => Record<K, B>
export function mapWithIndex<A, B>(f: (k: string, a: A) => B): (fa: Record<string, A>) => Record<string, B> {
  return RR.mapWithIndex(f)
}

/**
 * Map a record passing the values to the iterating function
 *
 * @since 2.0.0
 */
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B>
export function map<A, B>(f: (a: A) => B): (fa: Record<string, A>) => Record<string, B> {
  return RR.map(f)
}

/**
 * @since 2.0.0
 */
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B
export function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: Record<string, A>) => B {
  return RR.reduceWithIndex(b, f)
}

/**
 * @since 2.0.0
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
export function foldMapWithIndex<M>(M: Monoid<M>): <A>(f: (k: string, a: A) => M) => (fa: Record<string, A>) => M {
  return RR.foldMapWithIndex(M)
}

/**
 * @since 2.0.0
 */
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B
export function reduceRightWithIndex<A, B>(b: B, f: (k: string, a: A, b: B) => B): (fa: Record<string, A>) => B {
  return RR.reduceRightWithIndex(b, f)
}

/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export const singleton: <K extends string, A>(k: K, a: A) => Record<K, A> = RR.singleton

/**
 * @since 2.0.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  return RR.traverseWithIndex(F)
}

/**
 * @since 2.0.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  return RR.traverse(F)
}

/**
 * @since 2.0.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Kind<F, A>>) => Kind<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> {
  return RR.sequence(F)
}

/**
 * @since 2.0.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>>
export function partitionMapWithIndex<A, B, C>(
  f: (key: string, a: A) => Either<B, C>
): (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>> {
  return RR.partitionMapWithIndex(f)
}

/**
 * @since 2.0.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>> {
  return RR.partitionWithIndex(predicateWithIndex)
}

/**
 * @since 2.0.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: Record<K, A>) => Record<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (fa: Record<string, A>) => Record<string, B> {
  return RR.filterMapWithIndex(f)
}

/**
 * @since 2.0.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: Record<string, A>) => Record<string, A> {
  return RR.filterWithIndex(predicateWithIndex)
}

/**
 * Create a record from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.0.0
 */
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <K extends string, R, E>(fka: Kind3<F, R, E, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, E>(fka: Kind2<F, E, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Kind<F, [K, A]>) => Record<K, A>
export function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): <K extends string>(fka: HKT<F, [K, A]>) => Record<K, A>
export function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [string, A]>) => Record<string, A> {
  return RR.fromFoldable(M, F)
}

/**
 * Create a record from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
 * import { array, zip } from 'fp-ts/lib/Array'
 * import { identity } from 'fp-ts/lib/function'
 * import { fromFoldableMap } from 'fp-ts/lib/Record'
 *
 * // like lodash `zipObject` or ramda `zipObj`
 * export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
 *   fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * // build a record from a field
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * const users: Array<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 2.0.0
 */
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A, K extends string>(fa: Kind2<F, E, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Kind<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A>(fa: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B> {
  return RR.fromFoldableMap(M, F)
}

/**
 * @since 2.0.0
 */
export const every: <A>(predicate: Predicate<A>) => (r: Record<string, A>) => boolean = RR.every

/**
 * @since 2.0.0
 */
export const some: <A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean = RR.some

/**
 * @since 2.0.0
 */
export const elem: <A>(E: Eq<A>) => (a: A, fa: Record<string, A>) => boolean = RR.elem

/**
 * @since 2.0.0
 */
export const record: FunctorWithIndex1<URI, string> &
  Foldable1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = {
  URI,
  map: RR.readonlyRecord.map as any,
  reduce: RR.readonlyRecord.reduce as any,
  foldMap: RR.readonlyRecord.foldMap as any,
  reduceRight: RR.readonlyRecord.reduceRight as any,
  traverse: RR.readonlyRecord.traverse as any,
  sequence,
  compact: RR.readonlyRecord.compact as any,
  separate: RR.readonlyRecord.separate as any,
  filter: RR.readonlyRecord.filter as any,
  filterMap: RR.readonlyRecord.filterMap as any,
  partition: RR.readonlyRecord.partition as any,
  partitionMap: RR.readonlyRecord.partitionMap as any,
  wither: RR.readonlyRecord.wither as any,
  wilt: RR.readonlyRecord.wilt as any,
  mapWithIndex: RR.readonlyRecord.mapWithIndex as any,
  reduceWithIndex: RR.readonlyRecord.reduceWithIndex as any,
  foldMapWithIndex: RR.readonlyRecord.foldMapWithIndex as any,
  reduceRightWithIndex: RR.readonlyRecord.reduceRightWithIndex as any,
  traverseWithIndex: RR.readonlyRecord.traverseWithIndex as any,
  partitionMapWithIndex: RR.readonlyRecord.partitionMapWithIndex as any,
  partitionWithIndex: RR.readonlyRecord.partitionWithIndex as any,
  filterMapWithIndex: RR.readonlyRecord.filterMapWithIndex as any,
  filterWithIndex: RR.readonlyRecord.filterWithIndex as any
}

const { filter, filterMap, foldMap, partition, partitionMap, reduce, reduceRight, compact, separate } = pipeable(record)

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
  foldMap,
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
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight,
  /**
   * @since 2.0.0
   */
  compact,
  /**
   * @since 2.0.0
   */
  separate
}
