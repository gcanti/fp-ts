import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { identity, Predicate } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { isNone, isSome, none, Option, some as optionSome } from './Option'
import { Semigroup } from './Semigroup'
import { Show, showString } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT<A> {
    Record: Record<string, A>
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
export function getShow<A>(S: Show<A>): Show<Record<string, A>> {
  return {
    show: r => {
      const elements = collect((k, a: A) => `${showString.show(k)}: ${S.show(a)}`)(r).join(', ')
      return elements === '' ? '{}' : `{ ${elements} }`
    }
  }
}

/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export function size(r: Record<string, unknown>): number {
  return Object.keys(r).length
}

/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export function isEmpty(r: Record<string, unknown>): boolean {
  return Object.keys(r).length === 0
}

const unorderedKeys = <K extends string>(r: Record<K, unknown>): Array<K> => Object.keys(r) as any

/**
 * @since 2.0.0
 */
export function keys<K extends string>(r: Record<K, unknown>): Array<K> {
  return unorderedKeys(r).sort()
}

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
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: Record<K, A>) => Array<B> {
  return r => {
    const out: Array<B> = []
    for (const key of keys(r)) {
      out.push(f(key, r[key]))
    }
    return out
  }
}

/**
 * @since 2.0.0
 */
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> = collect((k, a) => [k, a])

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 2.0.0
 */
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Type<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(r: Record<string, A>) => HKT<F, [string, A]> {
  return r => {
    const arr = toArray(r)
    const len = arr.length
    return unfoldable.unfold(0, b => (b < len ? optionSome([arr[b], b + 1]) : none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A>
export function insertAt<A>(k: string, a: A): (r: Record<string, A>) => Record<string, A> {
  return r => {
    if (r[k] === a) {
      return r
    }
    const out = Object.assign({}, r)
    out[k] = a
    return out
  }
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @since 2.0.0
 */
export function hasOwnProperty<K extends string>(k: K, r: Record<K, unknown>): boolean {
  return _hasOwnProperty.call(r, k)
}

/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: Record<string, A>) => Record<string, A> {
  return r => {
    if (!_hasOwnProperty.call(r, k)) {
      return r
    }
    const out = Object.assign({}, r)
    delete out[k]
    return out
  }
}

/**
 * @since 2.0.0
 */
export function updateAt<K extends string, A>(k: K, a: A): (r: Record<K, A>) => Option<Record<K, A>> {
  return r => {
    if (!hasOwnProperty(k, r)) {
      return none
    }
    if (r[k] === a) {
      return optionSome(r)
    }
    const out = Object.assign({}, r)
    out[k] = a
    return optionSome(out)
  }
}

/**
 * @since 2.0.0
 */
export function modifyAt<K extends string, A>(k: K, f: (a: A) => A): (r: Record<K, A>) => Option<Record<K, A>> {
  return r => {
    if (!hasOwnProperty(k, r)) {
      return none
    }
    const out = Object.assign({}, r)
    out[k] = f(r[k])
    return optionSome(out)
  }
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]>
export function pop(k: string): <A>(r: Record<string, A>) => Option<[A, Record<string, A>]> {
  const deleteAtk = deleteAt(k)
  return r => {
    const oa = lookup(k, r)
    return isNone(oa) ? none : optionSome([oa.value, deleteAtk(r)])
  }
}

/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export function isSubrecord<A>(E: Eq<A>): (x: Record<string, A>, y: Record<string, A>) => boolean {
  return (x, y) => {
    for (const k in x) {
      if (!_hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 2.0.0
 */
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>>
export function getEq<A>(E: Eq<A>): Eq<Record<string, A>> {
  const isSubrecordE = isSubrecord(E)
  return fromEquals((x, y) => isSubrecordE(x, y) && isSubrecordE(y, x))
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
  return {
    concat: (x, y) => {
      if (x === empty) {
        return y
      }
      if (y === empty) {
        return x
      }
      const keys = Object.keys(y)
      const len = keys.length
      if (len === 0) {
        return x
      }
      const r: Record<string, A> = { ...x }
      for (let i = 0; i < len; i++) {
        const k = keys[i]
        r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k]
      }
      return r
    },
    empty
  }
}

/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export function lookup<A>(k: string, r: Record<string, A>): Option<A> {
  return _hasOwnProperty.call(r, k) ? optionSome(r[k]) : none
}

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
  return fa => record.mapWithIndex(fa, f)
}

/**
 * Map a record passing the values to the iterating function
 *
 * @since 2.0.0
 */
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B>
export function map<A, B>(f: (a: A) => B): (fa: Record<string, A>) => Record<string, B> {
  return mapWithIndex((_, a) => f(a))
}

/**
 * @since 2.0.0
 */
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B
export function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: Record<string, A>) => B {
  return fa => record.reduceWithIndex(fa, b, f)
}

/**
 * @since 2.0.0
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
export function foldMapWithIndex<M>(M: Monoid<M>): <A>(f: (k: string, a: A) => M) => (fa: Record<string, A>) => M {
  const foldMapWithIndexM = record.foldMapWithIndex(M)
  return f => fa => foldMapWithIndexM(fa, f)
}

/**
 * @since 2.0.0
 */
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B
export function reduceRightWithIndex<A, B>(b: B, f: (k: string, a: A, b: B) => B): (fa: Record<string, A>) => B {
  return fa => record.reduceRightWithIndex(fa, b, f)
}

/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export function singleton<K extends string, A>(k: K, a: A): Record<K, A> {
  return { [k]: a } as any
}

/**
 * @since 2.0.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(
  f: (k: K, a: A) => Type3<F, U, L, B>
) => (ta: Record<K, A>) => Type3<F, U, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(f: (k: K, a: A) => Type2<F, L, B>) => (ta: Record<K, A>) => Type2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A, B>(f: (k: K, a: A) => Type2<F, L, B>) => (ta: Record<K, A>) => Type2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Type<F, B>) => (ta: Record<K, A>) => Type<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  const traverseWithIndexF = record.traverseWithIndex(F)
  return f => ta => traverseWithIndexF(ta, f)
}

/**
 * @since 2.0.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => <K extends string>(ta: Record<K, A>) => Type3<F, U, L, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(f: (a: A) => Type2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(f: (a: A) => Type2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Type<F, B>) => <K extends string>(ta: Record<K, A>) => Type<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return f => traverseWithIndexF((_, a) => f(a))
}

/**
 * @since 2.0.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A>(ta: Record<K, Type3<F, U, L, A>>) => Type3<F, U, L, Record<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Type<F, A>>) => Type<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> {
  return traverseWithIndex(F)((_, a) => a)
}

/**
 * @since 2.0.0
 */
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  f: (key: K, a: A) => Either<RL, RR>
): (fa: Record<K, A>) => Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  f: (key: string, a: A) => Either<RL, RR>
): (fa: Record<string, A>) => Separated<Record<string, RL>, Record<string, RR>> {
  return fa => record.partitionMapWithIndex(fa, f)
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
  return fa => record.partitionWithIndex(fa, predicateWithIndex)
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
  return fa => record.filterMapWithIndex(fa, f)
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
  return fa => record.filterWithIndex(fa, predicateWithIndex)
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
): <K extends string, U, L>(fka: Type3<F, U, L, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, L>(fka: Type2<F, L, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Type<F, [K, A]>) => Record<K, A>
export function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): <K extends string>(fka: HKT<F, [K, A]>) => Record<K, A>
export function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [string, A]>) => Record<string, A> {
  const fromFoldableMapM = fromFoldableMap(M, F)
  return fka => fromFoldableMapM(fka, identity)
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
): <U, L, A, K extends string>(fa: Type3<F, U, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <L, A, K extends string>(fa: Type2<F, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Type<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A>(fa: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B> {
  return <A>(ta: HKT<F, A>, f: (a: A) => [string, B]) => {
    return F.reduce<A, Record<string, B>>(ta, {}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b
      return r
    })
  }
}

/**
 * @since 2.0.0
 */
export function every<A>(predicate: Predicate<A>): (r: Record<string, A>) => boolean {
  return r => {
    for (const k in r) {
      if (!predicate(r[k])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 2.0.0
 */
export function some<A>(predicate: (a: A) => boolean): (r: Record<string, A>) => boolean {
  return r => {
    for (const k in r) {
      if (predicate(r[k])) {
        return true
      }
    }
    return false
  }
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, fa: Record<string, A>) => boolean {
  return (a, fa) => {
    for (const k in fa) {
      if (E.equals(fa[k], a)) {
        return true
      }
    }
    return false
  }
}

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
  map: (fa, f) => record.mapWithIndex(fa, (_, a) => f(a)),
  reduce: (fa, b, f) => record.reduceWithIndex(fa, b, (_, b, a) => f(b, a)),
  foldMap: M => {
    const foldMapWithIndexM = record.foldMapWithIndex(M)
    return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
  },
  reduceRight: (fa, b, f) => record.reduceRightWithIndex(fa, b, (_, a, b) => f(a, b)),
  traverse: <F>(
    F: Applicative<F>
  ): (<A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>) => {
    const traverseWithIndexF = record.traverseWithIndex(F)
    return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
  },
  sequence,
  compact: <A>(fa: Record<string, Option<A>>): Record<string, A> => {
    const r: Record<string, A> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const optionA = fa[key]
      if (isSome(optionA)) {
        r[key] = optionA.value
      }
    }
    return r
  },
  separate: <RL, RR>(fa: Record<string, Either<RL, RR>>): Separated<Record<string, RL>, Record<string, RR>> => {
    const left: Record<string, RL> = {}
    const right: Record<string, RR> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const e = fa[key]
      switch (e._tag) {
        case 'Left':
          left[key] = e.left
          break
        case 'Right':
          right[key] = e.right
          break
      }
    }
    return {
      left,
      right
    }
  },
  filter: <A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A> => {
    return record.filterWithIndex(fa, (_, a) => predicate(a))
  },
  filterMap: (fa, f) => record.filterMapWithIndex(fa, (_, a) => f(a)),
  partition: <A>(fa: Record<string, A>, predicate: Predicate<A>): Separated<Record<string, A>, Record<string, A>> => {
    return record.partitionWithIndex(fa, (_, a) => predicate(a))
  },
  partitionMap: (fa, f) => record.partitionMapWithIndex(fa, (_, a) => f(a)),
  wither: <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>) => {
    const traverseF = record.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), record.compact)
  },
  wilt: <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Record<string, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>) => {
    const traverseF = record.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), record.separate)
  },
  mapWithIndex: <A, B>(fa: Record<string, A>, f: (k: string, a: A) => B) => {
    const out: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      out[key] = f(key, fa[key])
    }
    return out
  },
  reduceWithIndex: (fa, b, f) => {
    let out = b
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const k = keys[i]
      out = f(k, out, fa[k])
    }
    return out
  },
  foldMapWithIndex: M => (fa, f) => {
    let out = M.empty
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const k = keys[i]
      out = M.concat(out, f(k, fa[k]))
    }
    return out
  },
  reduceRightWithIndex: (fa, b, f) => {
    let out = b
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = len - 1; i >= 0; i--) {
      const k = keys[i]
      out = f(k, fa[k], out)
    }
    return out
  },
  traverseWithIndex: <F>(F: Applicative<F>) => <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => {
    const keys = Object.keys(ta)
    if (keys.length === 0) {
      return F.of(empty)
    }
    let fr: HKT<F, Record<string, B>> = F.of({})
    for (const key of keys) {
      fr = F.ap(
        F.map(fr, r => (b: B) => {
          r[key] = b
          return r
        }),
        f(key, ta[key])
      )
    }
    return fr
  },
  partitionMapWithIndex: <RL, RR, A>(fa: Record<string, A>, f: (key: string, a: A) => Either<RL, RR>) => {
    const left: Record<string, RL> = {}
    const right: Record<string, RR> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const e = f(key, fa[key])
      switch (e._tag) {
        case 'Left':
          left[key] = e.left
          break
        case 'Right':
          right[key] = e.right
          break
      }
    }
    return {
      left,
      right
    }
  },
  partitionWithIndex: <A>(fa: Record<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
    const left: Record<string, A> = {}
    const right: Record<string, A> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const a = fa[key]
      if (predicateWithIndex(key, a)) {
        right[key] = a
      } else {
        left[key] = a
      }
    }
    return {
      left,
      right
    }
  },
  filterMapWithIndex: <A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>) => {
    const r: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const optionB = f(key, fa[key])
      if (isSome(optionB)) {
        r[key] = optionB.value
      }
    }
    return r
  },
  filterWithIndex: <A>(fa: Record<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
    const out: Record<string, A> = {}
    let changed = false
    for (const key in fa) {
      if (_hasOwnProperty.call(fa, key)) {
        const a = fa[key]
        if (predicateWithIndex(key, a)) {
          out[key] = a
        } else {
          changed = true
        }
      }
    }
    return changed ? out : fa
  }
}

const { filter, filterMap, foldMap, partition, partitionMap, reduce, reduceRight, compact, separate } = pipeable(record)

export { filter, filterMap, foldMap, partition, partitionMap, reduce, reduceRight, compact, separate }
