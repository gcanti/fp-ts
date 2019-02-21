import { Applicative } from './Applicative'
import { Compactable2, Separated } from './Compactable_'
import { Either } from './Either_'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable2v2C, Foldable2v3, Foldable2v2, Foldable2v1, Foldable2v } from './Foldable2v'
import { FoldableWithIndex2C } from './FoldableWithIndex'
import { Predicate, phantom, tuple } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Option, none, some } from './Option_'
import { Ord } from './Ord'
import { Setoid, fromEquals } from './Setoid'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Semigroup } from './Semigroup_'
import { Witherable2C } from './Witherable'
import { FunctorWithIndex2C } from './FunctorWithIndex'
import { Functor2 } from './Functor'
import { Traversable2v2C } from './Traversable2v'
import { Filterable2 } from './Filterable_'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Map: Map<L, A>
  }
}

export const URI = 'Map'

export type URI = typeof URI

/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 1.14.0
 */
export const size = <K, A>(d: Map<K, A>): number => d.size

/**
 * Test whether or not a map is empty
 *
 * @since 1.14.0
 */
export const isEmpty = <K, A>(d: Map<K, A>): boolean => d.size === 0

/**
 * Test whether or not a key exists in a map
 *
 * @since 1.14.0
 */
export const member = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => {
  const lookupS = lookup(S)
  return (k, m) => lookupS(k, m).isSome()
}

/**
 * Test whether or not a value is a member of a map
 *
 * @since 1.14.0
 */
export const elem = <A>(S: Setoid<A>) => <K>(a: A, m: Map<K, A>): boolean => {
  const values = m.values()
  let e: IteratorResult<A>
  while (!(e = values.next()).done) {
    const v = e.value
    if (S.equals(a, v)) {
      return true
    }
  }
  return false
}

/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 1.14.0
 */
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => m => Array.from(m.keys()).sort(O.compare)

/**
 * Get a sorted array of the values contained in a map
 *
 * @since 1.14.0
 */
export const values = <A>(O: Ord<A>): (<K>(m: Map<K, A>) => Array<A>) => m => Array.from(m.values()).sort(O.compare)

/**
 * @since 1.14.0
 */
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => {
  const keysO = keys(O)
  return <A, B>(m: Map<K, A>, f: (k: K, a: A) => B): Array<B> => {
    const out: Array<B> = []
    const ks = keysO(m)
    for (let key of ks) {
      out.push(f(key, m.get(key)!))
    }
    return out
  }
}

/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 1.14.0
 */
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => {
  const collectO = collect(O)
  return <A>(m: Map<K, A>): Array<[K, A]> => collectO(m, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 1.14.0
 */
export function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  unfoldable: Unfoldable1<F>
): <A>(d: Map<K, A>) => Type<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> {
  const toArrayO = toArray(O)
  return d => {
    const arr = toArrayO(d)
    const len = arr.length
    return unfoldable.unfoldr(0, b => (b < len ? some(tuple(arr[b], b + 1)) : none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.14.0
 */
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => {
  const lookupS = lookupWithKey(S)
  return (k, a, m) => {
    const found = lookupS(k, m)
    if (found.isNone()) {
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
 * @since 1.14.0
 */
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => {
  const lookupS = lookupWithKey(S)
  return (k, m) => {
    const found = lookupS(k, m)
    if (found.isSome()) {
      const r = new Map(m)
      r.delete(found.value[0])
      return r
    }
    return m
  }
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.14.0
 */
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => {
  const lookupS = lookup(S)
  const removeS = remove(S)
  return (k, m) => lookupS(k, m).map(a => tuple(a, removeS(k, m)))
}

/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 1.14.0
 */
export const lookupWithKey = <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>): Option<[K, A]> => {
  const entries = m.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [ka, a] = e.value
    if (S.equals(ka, k)) {
      return some(tuple(ka, a))
    }
  }
  return none
}

/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 1.14.0
 */
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => {
  const lookupWithKeyS = lookupWithKey(S)
  return (k, m) => lookupWithKeyS(k, m).map(([_, a]) => a)
}

/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 1.14.0
 */
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => {
  const lookupWithKeyS = lookupWithKey(SK)
  return (d1: Map<K, A>, d2: Map<K, A>): boolean => {
    const entries = d1.entries()
    let e: IteratorResult<[K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const d2OptA = lookupWithKeyS(k, d2)
      if (d2OptA.isNone() || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 1.14.0
 */
export const empty = new Map<never, never>()

/**
 * @since 1.14.0
 */
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => {
  const isSubmap_ = isSubmap(SK, SA)
  return fromEquals((x, y) => isSubmap_(x, y) && isSubmap_(y, x))
}

/**
 * Gets {@link Monoid} instance for Maps given {@link Semigroup} instance for their values
 *
 * @since 1.14.0
 */
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => {
  const lookupWithKeyS = lookupWithKey(SK)
  return {
    concat: (mx, my) => {
      const r = new Map(mx)
      const entries = my.entries()
      let e: IteratorResult<[K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const mxOptA = lookupWithKeyS(k, mx)
        if (mxOptA.isSome()) {
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
 * @since 1.14.0
 */
const filter = <K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A> => filterWithIndex(fa, (_, a) => p(a))

/**
 * @since 1.14.0
 */
const mapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [key, a] = e.value
    m.set(key, f(key, a))
  }
  return m
}

/**
 * @since 1.14.0
 */
const _map = <K, A, B>(fa: Map<K, A>, f: (a: A) => B): Map<K, B> => mapWithIndex(fa, (_, a) => f(a))

/**
 * @since 1.14.0
 */
const reduce = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B) => B) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (fa, b, f) => reduceWithIndexO(fa, b, (_, b, a) => f(b, a))
}

/**
 * @since 1.14.0
 */
const foldMap = <K>(O: Ord<K>): (<M>(M: Monoid<M>) => <A>(fa: Map<K, A>, f: (a: A) => M) => M) => M => {
  const foldMapWithIndexOM = foldMapWithIndex(O)(M)
  return (fa, f) => foldMapWithIndexOM(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
const foldr = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B) => B) => {
  const foldrWithIndexO = foldrWithIndex(O)
  return (fa, b, f) => foldrWithIndexO(fa, b, (_, a, b) => f(a, b))
}

/**
 * @since 1.14.0
 */
const reduceWithIndex = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B) => B) => {
  const keysO = keys(O)
  return <A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa.get(k)!)
    }
    return out
  }
}

/**
 * @since 1.14.0
 */
const foldMapWithIndex = <K>(O: Ord<K>): (<M>(M: Monoid<M>) => <A>(fa: Map<K, A>, f: (k: K, a: A) => M) => M) => {
  const keysO = keys(O)
  return <M>(M: Monoid<M>) => <A>(fa: Map<K, A>, f: (k: K, a: A) => M): M => {
    let out: M = M.empty
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = M.concat(out, f(k, fa.get(k)!))
    }
    return out
  }
}

/**
 * @since 1.14.0
 */
const foldrWithIndex = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B) => B) => {
  const keysO = keys(O)
  return <A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, fa.get(k)!, out)
    }
    return out
  }
}

/**
 * Create a map with one key/value pair
 *
 * @since 1.14.0
 */
export const singleton = <K, A>(k: K, a: A): Map<K, A> => {
  return new Map<K, A>([[k, a]])
}

/**
 * @since 1.14.0
 */
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

/**
 * @since 1.14.0
 */
const traverse = <F>(F: Applicative<F>): (<K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
const sequence = <F>(F: Applicative<F>): (<K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return ta => traverseWithIndexF(ta, (_, a) => a)
}

/**
 * @since 1.14.0
 */
const compact = <K, A>(fa: Map<K, Option<A>>): Map<K, A> => {
  const m = new Map<K, A>()
  const entries = fa.entries()
  let e: IteratorResult<[K, Option<A>]>
  while (!(e = entries.next()).done) {
    const [k, oa] = e.value
    if (oa.isSome()) {
      m.set(k, oa.value)
    }
  }
  return m
}

/**
 * @since 1.14.0
 */
const partitionMap = <K, RL, RR, A>(fa: Map<K, A>, f: (a: A) => Either<RL, RR>): Separated<Map<K, RL>, Map<K, RR>> =>
  partitionMapWithIndex(fa, (_, a) => f(a))

/**
 * @since 1.14.0
 */
const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> =>
  partitionWithIndex(fa, (_, a) => p(a))

/**
 * @since 1.14.0
 */
const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => {
  const left = new Map<K, RL>()
  const right = new Map<K, RR>()
  const entries = fa.entries()
  let e: IteratorResult<[K, Either<RL, RR>]>
  while (!(e = entries.next()).done) {
    const [k, ei] = e.value
    if (ei.isLeft()) {
      left.set(k, ei.value)
    } else {
      right.set(k, ei.value)
    }
  }
  return {
    left,
    right
  }
}

/**
 * @since 1.14.0
 */
const wither = <F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

/**
 * @since 1.14.0
 */
const wilt = <F>(
  F: Applicative<F>
): (<K, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

/**
 * @since 1.14.0
 */
const filterMap = <K, A, B>(fa: Map<K, A>, f: (a: A) => Option<B>): Map<K, B> => {
  return filterMapWithIndex(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
const partitionMapWithIndex = <K, RL, RR, A>(
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
    if (ei.isLeft()) {
      left.set(k, ei.value)
    } else {
      right.set(k, ei.value)
    }
  }
  return {
    left,
    right
  }
}

/**
 * @since 1.14.0
 */
const partitionWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>> => {
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

/**
 * @since 1.14.0
 */
const filterMapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Option<B>): Map<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    const o = f(k, a)
    if (o.isSome()) {
      m.set(k, o.value)
    }
  }
  return m
}

/**
 * @since 1.14.0
 */
const filterWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Map<K, A> => {
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
 * Create a map from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.14.0
 */
export function fromFoldable<K, F extends URIS3>(
  S: Setoid<K>,
  F: Foldable2v3<F>
): <U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS2>(
  S: Setoid<K>,
  F: Foldable2v2<F>
): <L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS>(
  S: Setoid<K>,
  F: Foldable2v1<F>
): <A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A> {
  return <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => {
    const lookupWithKeyS = lookupWithKey(S)
    return F.reduce<[K, A], Map<K, A>>(ta, new Map<K, A>(), (b, [k, a]) => {
      const bOpt = lookupWithKeyS(k, b)
      if (bOpt.isSome()) {
        b.set(bOpt.value[0], f(bOpt.value[1], a))
      } else {
        b.set(k, a)
      }
      return b
    })
  }
}

/**
 * @since 1.14.0
 */
const compactable: Compactable2<URI> = {
  URI,
  compact,
  separate
}

/**
 * @since 1.14.0
 */
const functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @since 1.14.0
 */
const getFunctorWithIndex = <K>(): FunctorWithIndex2C<URI, K, K> => {
  return {
    _L: phantom,
    ...functor,
    mapWithIndex: mapWithIndex
  }
}

/**
 * @since 1.14.0
 */
const getFoldable = <K>(O: Ord<K>): Foldable2v2C<URI, K> => {
  return {
    URI,
    _L: phantom,
    reduce: reduce(O),
    foldMap: foldMap(O),
    foldr: foldr(O)
  }
}

/**
 * @since 1.14.0
 */
const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  return {
    ...getFoldable(O),
    reduceWithIndex: reduceWithIndex(O),
    foldMapWithIndex: foldMapWithIndex(O),
    foldrWithIndex: foldrWithIndex(O)
  }
}

/**
 * @since 1.14.0
 */
const filterable: Filterable2<URI> = {
  ...compactable,
  ...functor,
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @since 1.14.0
 */
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => {
  return {
    ...filterable,
    ...getFunctorWithIndex<K>(),
    partitionMapWithIndex,
    partitionWithIndex,
    filterMapWithIndex,
    filterWithIndex
  }
}

/**
 * @since 1.14.0
 */
const getTraversable = <K>(O: Ord<K>): Traversable2v2C<URI, K> => {
  return {
    _L: phantom,
    ...getFoldable(O),
    ...functor,
    traverse,
    sequence
  }
}

/**
 * @since 1.14.0
 */
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => {
  return {
    ...filterable,
    ...getTraversable(O),
    wilt,
    wither
  }
}

/**
 * @since 1.14.0
 */
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => {
  return {
    ...getFunctorWithIndex<K>(),
    ...getFoldableWithIndex(O),
    ...getTraversable(O),
    traverseWithIndex
  }
}

/**
 * @since 1.14.0
 */
export const map: Filterable2<URI> = {
  URI,
  ...compactable,
  ...functor,
  ...filterable
}
