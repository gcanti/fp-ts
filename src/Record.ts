import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { FilterableWithIndex1 } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement, identity } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { none, Option, some as optionSome, isNone, isSome } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Show, showString } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

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
      const elements = collect(r, (k, a) => `${showString.show(k)}: ${S.show(a)}`).join(', ')
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
 * const ob: {a: string, b: boolean} = {a: 'foo', b: false}
 * assert.deepStrictEqual(
 *   collect(ob, (key, val) => ({key: key, value: val})),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
export function collect<K extends string, A, B>(r: Record<K, A>, f: (k: K, a: A) => B): Array<B> {
  const out: Array<B> = []
  for (const key of keys(r)) {
    out.push(f(key, r[key]))
  }
  return out
}

/**
 * @since 2.0.0
 */
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]> {
  return collect(d, (k, a: A) => [k, a])
}

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 2.0.0
 */
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]> {
  return d => {
    const arr = toArray(d)
    const len = arr.length
    return unfoldable.unfold(0, b => (b < len ? optionSome([arr[b], b + 1]) : none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A> {
  if (d[k] === a) {
    return d
  }
  const r = Object.assign({}, d)
  r[k] = a
  return r
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @since 2.0.0
 */
export function hasOwnProperty<K extends string, A>(k: K, d: Record<K, A>): boolean {
  return _hasOwnProperty.call(d, k)
}

/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export function remove<K extends string, KS extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A> {
  if (!hasOwnProperty(k, d)) {
    return d
  }
  const r = Object.assign({}, d)
  delete r[k]
  return r
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export function pop<K extends string, KS extends string, A>(
  k: K,
  d: Record<KS, A>
): Option<[A, Record<Exclude<KS, K>, A>]>
export function pop<A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> {
  const a = lookup(k, d)
  return isNone(a) ? none : optionSome([a.value, remove(k, d)])
}

/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export function isSubrecord<A>(E: Eq<A>): (d1: Record<string, A>, d2: Record<string, A>) => boolean {
  return (d1, d2) => {
    for (let k in d1) {
      if (!hasOwnProperty(k, d2) || !E.equals(d1[k], d2[k])) {
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
        r[k] = hasOwnProperty(k, x) ? S.concat(x[k], y[k]) : y[k]
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
export function lookup<A>(k: string, fa: Record<string, A>): Option<A> {
  return hasOwnProperty(k, fa) ? optionSome(fa[k]) : none
}

/**
 * @since 2.0.0
 */
export function filter<A, B extends A>(fa: Record<string, A>, refinement: Refinement<A, B>): Record<string, B>
export function filter<A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A>
export function filter<A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A> {
  return filterWithIndex(fa, (_, a) => predicate(a))
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
export function mapWithIndex<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>
export function mapWithIndex<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B> {
  const r: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    r[key] = f(key, fa[key])
  }
  return r
}

/**
 * Map a record passing the values to the iterating function
 *
 * @since 2.0.0
 */
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B> {
  return mapWithIndex(fa, (_, a) => f(a))
}

const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => {
  return reduceWithIndex(fa, b, (_, b, a) => f(b, a))
}

const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
}

const reduceRight = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => {
  return reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
}

/**
 * @since 2.0.0
 */
export function reduceWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B
export function reduceWithIndex<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B {
  let out: B = b
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    out = f(k, out, fa[k])
  }
  return out
}

/**
 * @since 2.0.0
 */
export function foldMapWithIndex<M>(M: Monoid<M>): <K extends string, A>(fa: Record<K, A>, f: (k: K, a: A) => M) => M
export function foldMapWithIndex<M>(M: Monoid<M>): <A>(fa: Record<string, A>, f: (k: string, a: A) => M) => M {
  return (fa, f) => {
    let out: M = M.empty
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const k = keys[i]
      out = M.concat(out, f(k, fa[k]))
    }
    return out
  }
}

/**
 * @since 2.0.0
 */
export function reduceRightWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B
export function reduceRightWithIndex<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B {
  let out: B = b
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = len - 1; i >= 0; i--) {
    const k = keys[i]
    out = f(k, fa[k], out)
  }
  return out
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
  ta: Record<K, A>,
  f: (k: K, a: A) => Type3<F, U, L, B>
) => Type3<F, U, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type<F, B>) => Type<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>> {
  return <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => {
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
  }
}

/**
 * @since 2.0.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(ta: Record<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type<F, B>) => Type<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
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
  const traverseWithIndexF = traverseWithIndex(F)
  return ta => traverseWithIndexF(ta, (_, a) => a)
}

const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => {
  const r: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (isSome(optionA)) {
      r[key] = optionA.value
    }
  }
  return r
}

const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => {
  return partitionMapWithIndex(fa, (_, a) => f(a))
}

const partition = <A>(
  fa: Record<string, A>,
  predicate: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => {
  return partitionWithIndex(fa, (_, a) => predicate(a))
}

const separate = <RL, RR>(fa: Record<string, Either<RL, RR>>): Separated<Record<string, RL>, Record<string, RR>> => {
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
}

function wither<F>(
  F: Applicative<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>> {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

function wilt<F>(
  F: Applicative<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>> {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => {
  return filterMapWithIndex(fa, (_, a) => f(a))
}

/**
 * @since 2.0.0
 */
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> {
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
}

/**
 * @since 2.0.0
 */
export function partitionWithIndex<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> {
  const left: Record<string, A> = {}
  const right: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const a = fa[key]
    if (p(key, a)) {
      right[key] = a
    } else {
      left[key] = a
    }
  }
  return {
    left,
    right
  }
}

/**
 * @since 2.0.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B> {
  const r: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionB = f(key, fa[key])
    if (isSome(optionB)) {
      r[key] = optionB.value
    }
  }
  return r
}

/**
 * @since 2.0.0
 */
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> {
  const r: Record<string, A> = {}
  let changed = false
  for (const key in fa) {
    if (hasOwnProperty(key, fa)) {
      const a = fa[key]
      if (p(key, a)) {
        r[key] = a
      } else {
        changed = true
      }
    }
  }
  return changed ? r : fa
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
      r[k] = hasOwnProperty(k, r) ? M.concat(r[k], b) : b
      return r
    })
  }
}

/**
 * @since 2.0.0
 */
export function every<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (!predicate(fa[k])) {
      return false
    }
  }
  return true
}

/**
 * @since 2.0.0
 */
export function some<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (predicate(fa[k])) {
      return true
    }
  }
  return false
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, fa: Record<string, A>) => boolean {
  return (a, fa) => some(fa, x => E.equals(x, a))
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
  map,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  wither,
  wilt,
  mapWithIndex: mapWithIndex,
  reduceWithIndex: reduceWithIndex,
  foldMapWithIndex: foldMapWithIndex,
  reduceRightWithIndex: reduceRightWithIndex,
  traverseWithIndex: traverseWithIndex,
  partitionMapWithIndex: partitionMapWithIndex,
  partitionWithIndex: partitionWithIndex,
  filterMapWithIndex: filterMapWithIndex,
  filterWithIndex: filterWithIndex
}
