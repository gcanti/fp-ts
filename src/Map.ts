import { Applicative } from './Applicative'
import { Separated } from './Compactable'
import { Either, isLeft } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { isNone, isSome, none, Option, option, some } from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable2C } from './Witherable'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Map: Map<L, A>
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
export function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<Map<K, A>> {
  return {
    show: m => {
      let elements = ''
      m.forEach((a, k) => {
        elements += `[${SK.show(k)}, ${SA.show(a)}], `
      })
      if (elements !== '') {
        elements = elements.substring(0, elements.length - 2)
      }
      return `new Map([${elements}])`
    }
  }
}

/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
export function size<K, A>(d: Map<K, A>): number {
  return d.size
}

/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
export function isEmpty<K, A>(d: Map<K, A>): boolean {
  return d.size === 0
}

/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
export function member<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => boolean {
  const lookupE = lookup(E)
  return (k, m) => isSome(lookupE(k, m))
}

/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): <K>(a: A, m: Map<K, A>) => boolean {
  return (a, m) => {
    const values = m.values()
    let e: IteratorResult<A>
    while (!(e = values.next()).done) {
      const v = e.value
      if (E.equals(a, v)) {
        return true
      }
    }
    return false
  }
}

/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
export function keys<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<K> {
  return m => Array.from(m.keys()).sort(O.compare)
}

/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
export function values<A>(O: Ord<A>): <K>(m: Map<K, A>) => Array<A> {
  return m => Array.from(m.values()).sort(O.compare)
}

/**
 * @since 2.0.0
 */
export function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => Array<B> {
  const keysO = keys(O)
  return <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>): Array<B> => {
    const out: Array<B> = []
    const ks = keysO(m)
    for (const key of ks) {
      out.push(f(key, m.get(key)!))
    }
    return out
  }
}

/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
export function toArray<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<[K, A]> {
  return collect(O)((k, a) => [k, a])
}

/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 2.0.0
 */
export function toUnfoldable<K, F extends URIS>(O: Ord<K>, U: Unfoldable1<F>): <A>(d: Map<K, A>) => Type<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> {
  const toArrayO = toArray(O)
  return d => {
    const arr = toArrayO(d)
    const len = arr.length
    return U.unfold(0, b => (b < len ? some([arr[b], b + 1]) : none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => m => {
    const found = lookupWithKeyE(k, m)
    if (isNone(found)) {
      const r = new Map(m)
      r.set(k, a)
      return r
    } else if (found.value[1] !== a) {
      const r = new Map(m)
      r.set(found.value[0], a)
      return r
    }
    return m
  }
}

/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: Map<K, A>) => Map<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return k => m => {
    const found = lookupWithKeyE(k, m)
    if (isSome(found)) {
      const r = new Map(m)
      r.delete(found.value[0])
      return r
    }
    return m
  }
}

/**
 * @since 2.0.0
 */
export function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: Map<K, A>) => Option<Map<K, A>> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => m => {
    const found = lookupWithKeyE(k, m)
    if (isNone(found)) {
      return none
    }
    const r = new Map(m)
    r.set(found.value[0], a)
    return some(r)
  }
}

/**
 * @since 2.0.0
 */
export function modifyAt<K>(E: Eq<K>): <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => Option<Map<K, A>> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, f) => m => {
    const found = lookupWithKeyE(k, m)
    if (isNone(found)) {
      return none
    }
    const r = new Map(m)
    r.set(found.value[0], f(found.value[1]))
    return some(r)
  }
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export function pop<K>(E: Eq<K>): (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]> {
  const lookupE = lookup(E)
  const deleteAtE = deleteAt(E)
  return k => {
    const deleteAtEk = deleteAtE(k)
    return m => option.map(lookupE(k, m), a => [a, deleteAtEk(m)])
  }
}

/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
export function lookupWithKey<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<[K, A]> {
  return <A>(k: K, m: Map<K, A>) => {
    const entries = m.entries()
    let e: IteratorResult<[K, A]>
    while (!(e = entries.next()).done) {
      const [ka, a] = e.value
      if (E.equals(ka, k)) {
        return some([ka, a])
      }
    }
    return none
  }
}

/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
export function lookup<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, m) => option.map(lookupWithKeyE(k, m), ([_, a]) => a)
}

/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.0.0
 */
export function isSubmap<K, A>(SK: Eq<K>, SA: Eq<A>): (d1: Map<K, A>, d2: Map<K, A>) => boolean {
  const lookupWithKeyS = lookupWithKey(SK)
  return (d1: Map<K, A>, d2: Map<K, A>): boolean => {
    const entries = d1.entries()
    let e: IteratorResult<[K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const d2OptA = lookupWithKeyS(k, d2)
      if (isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 2.0.0
 */
export const empty = new Map<never, never>()

/**
 * @since 2.0.0
 */
export function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<Map<K, A>> {
  const isSubmap_ = isSubmap(SK, SA)
  return fromEquals((x, y) => isSubmap_(x, y) && isSubmap_(y, x))
}

/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.0.0
 */
export function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<Map<K, A>> {
  const lookupWithKeyS = lookupWithKey(SK)
  return {
    concat: (mx, my) => {
      if (mx === empty) {
        return my
      }
      if (my === empty) {
        return mx
      }
      const r = new Map(mx)
      const entries = my.entries()
      let e: IteratorResult<[K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const mxOptA = lookupWithKeyS(k, mx)
        if (isSome(mxOptA)) {
          r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a))
        } else {
          r.set(k, a)
        }
      }
      return r
    },
    empty
  }
}

/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
export function singleton<K, A>(k: K, a: A): Map<K, A> {
  return new Map([[k, a]])
}

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
): <U, L>(fka: Type3<F, U, L, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <L>(fka: Type2<F, L, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Type<F, [K, A]>) => Map<K, A>
export function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A>
export function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A> {
  return (fka: HKT<F, [K, A]>) => {
    const lookupWithKeyE = lookupWithKey(E)
    return F.reduce<[K, A], Map<K, A>>(fka, new Map<K, A>(), (b, [k, a]) => {
      const bOpt = lookupWithKeyE(k, b)
      if (isSome(bOpt)) {
        b.set(bOpt.value[0], M.concat(bOpt.value[1], a))
      } else {
        b.set(k, a)
      }
      return b
    })
  }
}

const _mapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [key, a] = e.value
    m.set(key, f(key, a))
  }
  return m
}

const _partitionMapWithIndex = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (k: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => {
  const left = new Map<K, RL>()
  const right = new Map<K, RR>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    const ei = f(k, a)
    if (isLeft(ei)) {
      left.set(k, ei.left)
    } else {
      right.set(k, ei.right)
    }
  }
  return {
    left,
    right
  }
}

const _partitionWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>> => {
  const left = new Map<K, A>()
  const right = new Map<K, A>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    if (p(k, a)) {
      right.set(k, a)
    } else {
      left.set(k, a)
    }
  }
  return {
    left,
    right
  }
}

const _filterMapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Option<B>): Map<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    const o = f(k, a)
    if (isSome(o)) {
      m.set(k, o.value)
    }
  }
  return m
}

const _filterWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Map<K, A> => {
  const m = new Map<K, A>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    if (p(k, a)) {
      m.set(k, a)
    }
  }
  return m
}

/**
 * @since 2.0.0
 */
export function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K> {
  return {
    ...map_,
    _L: undefined as any,
    mapWithIndex: _mapWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
  }
}

/**
 * @since 2.0.0
 */
export function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K> {
  const keysO = keys(O)

  const reduceWithIndex = <A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa.get(k)!)
    }
    return out
  }

  const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(fa: Map<K, A>, f: (k: K, a: A) => M): M => {
    let out: M = M.empty
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = M.concat(out, f(k, fa.get(k)!))
    }
    return out
  }

  const reduceRightWithIndex = <A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, fa.get(k)!, out)
    }
    return out
  }

  const traverseWithIndex = <F>(
    F: Applicative<F>
  ): (<K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Map<K, B>>) => {
    return <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => {
      let fm: HKT<F, Map<K, B>> = F.of(empty)
      const entries = ta.entries()
      let e: IteratorResult<[K, A]>
      while (!(e = entries.next()).done) {
        const [key, a] = e.value
        fm = F.ap(F.map(fm, m => (b: B) => new Map(m).set(key, b)), f(key, a))
      }
      return fm
    }
  }

  const traverse = <F>(F: Applicative<F>): (<K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>>) => {
    const traverseWithIndexF = traverseWithIndex(F)
    return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
  }

  const sequence = <F>(F: Applicative<F>): (<K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>>) => {
    const traverseWithIndexF = traverseWithIndex(F)
    return ta => traverseWithIndexF(ta, (_, a) => a)
  }

  return {
    ...map_,
    _L: undefined as any,
    reduce: (fa, b, f) => reduceWithIndex(fa, b, (_, b, a) => f(b, a)),
    foldMap: M => {
      const foldMapWithIndexM = foldMapWithIndex(M)
      return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
    },
    reduceRight: (fa, b, f) => reduceRightWithIndex(fa, b, (_, a, b) => f(a, b)),
    traverse,
    sequence,
    mapWithIndex: _mapWithIndex,
    reduceWithIndex,
    foldMapWithIndex,
    reduceRightWithIndex,
    traverseWithIndex,
    wilt: <F>(
      F: Applicative<F>
    ): (<K, RL, RR, A>(
      wa: Map<K, A>,
      f: (a: A) => HKT<F, Either<RL, RR>>
    ) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>) => {
      const traverseF = traverse(F)
      return (wa, f) => F.map(traverseF(wa, f), map_.separate)
    },
    wither: <F>(F: Applicative<F>): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>) => {
      const traverseF = traverse(F)
      return (wa, f) => F.map(traverseF(wa, f), map_.compact)
    }
  }
}

/**
 * @since 2.0.0
 */
export const map_: Filterable2<URI> = {
  URI,
  map: (fa, f) => _mapWithIndex(fa, (_, a) => f(a)),
  compact: <K, A>(fa: Map<K, Option<A>>): Map<K, A> => {
    const m = new Map<K, A>()
    const entries = fa.entries()
    let e: IteratorResult<[K, Option<A>]>
    while (!(e = entries.next()).done) {
      const [k, oa] = e.value
      if (isSome(oa)) {
        m.set(k, oa.value)
      }
    }
    return m
  },
  separate: <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => {
    const left = new Map<K, RL>()
    const right = new Map<K, RR>()
    const entries = fa.entries()
    let e: IteratorResult<[K, Either<RL, RR>]>
    while (!(e = entries.next()).done) {
      const [k, ei] = e.value
      if (isLeft(ei)) {
        left.set(k, ei.left)
      } else {
        right.set(k, ei.right)
      }
    }
    return {
      left,
      right
    }
  },
  filter: <K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A> => _filterWithIndex(fa, (_, a) => p(a)),
  filterMap: (fa, f) => _filterMapWithIndex(fa, (_, a) => f(a)),
  partition: <K, A>(fa: Map<K, A>, predicate: Predicate<A>): Separated<Map<K, A>, Map<K, A>> =>
    _partitionWithIndex(fa, (_, a) => predicate(a)),
  partitionMap: (fa, f) => _partitionMapWithIndex(fa, (_, a) => f(a))
}

const { filter, filterMap, map, partition, partitionMap, compact, separate } = pipeable(map_)

export { filter, filterMap, map, partition, partitionMap, compact, separate }
