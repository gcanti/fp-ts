import { Applicative } from './Applicative'
import { Compactable2, Separated } from './Compactable'
import { Either, isLeft } from './Either'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable2C, Foldable3, Foldable2, Foldable1, Foldable } from './Foldable'
import { FoldableWithIndex2C } from './FoldableWithIndex'
import { Predicate, phantom } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Option, none, some, isSome, isNone, option } from './Option'
import { Ord } from './Ord'
import { Eq, fromEquals } from './Eq'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Semigroup } from './Semigroup'
import { Witherable2C } from './Witherable'
import { FunctorWithIndex2C } from './FunctorWithIndex'
import { Functor2 } from './Functor'
import { Traversable2C } from './Traversable'
import { Filterable2 } from './Filterable'
import { Show } from './Show'
import { Magma } from './Magma'

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
export function collect<K>(O: Ord<K>): <A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B> {
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
 * @since 2.0.0
 */
export function toArray<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<[K, A]> {
  const collectO = collect(O)
  return m => collectO(m, (k, a) => [k, a])
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
export function insert<K>(E: Eq<K>): <A>(k: K, a: A, m: Map<K, A>) => Map<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a, m) => {
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
export function remove<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Map<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, m) => {
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
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export function pop<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]> {
  const lookupE = lookup(E)
  const removeE = remove(E)
  return (k, m) => option.map(lookupE(k, m), a => [a, removeE(k, m)])
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

const filter = <K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A> => filterWithIndex(fa, (_, a) => p(a))

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

const reduce = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B) => B) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (fa, b, f) => reduceWithIndexO(fa, b, (_, b, a) => f(b, a))
}

const foldMap = <K>(O: Ord<K>): (<M>(M: Monoid<M>) => <A>(fa: Map<K, A>, f: (a: A) => M) => M) => M => {
  const foldMapWithIndexOM = foldMapWithIndex(O)(M)
  return (fa, f) => foldMapWithIndexOM(fa, (_, a) => f(a))
}

const reduceRight = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B) => B) => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (fa, b, f) => reduceRightWithIndexO(fa, b, (_, a, b) => f(a, b))
}

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

const reduceRightWithIndex = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B) => B) => {
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

const compact = <K, A>(fa: Map<K, Option<A>>): Map<K, A> => {
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
}

const partitionMap = <K, RL, RR, A>(fa: Map<K, A>, f: (a: A) => Either<RL, RR>): Separated<Map<K, RL>, Map<K, RR>> =>
  partitionMapWithIndex(fa, (_, a) => f(a))

const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> =>
  partitionWithIndex(fa, (_, a) => p(a))

const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => {
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
}

const wither = <F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

const wilt = <F>(
  F: Applicative<F>
): (<K, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

const filterMap = <K, A, B>(fa: Map<K, A>, f: (a: A) => Option<B>): Map<K, B> => {
  return filterMapWithIndex(fa, (_, a) => f(a))
}

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

const filterMapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Option<B>): Map<K, B> => {
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

const compactable: Compactable2<URI> = {
  URI,
  compact,
  separate
}

const functor: Functor2<URI> = {
  URI,
  map: (fa, f) => mapWithIndex(fa, (_, a) => f(a))
}

const getFunctorWithIndex = <K>(): FunctorWithIndex2C<URI, K, K> => {
  return {
    _L: phantom,
    ...functor,
    mapWithIndex: mapWithIndex
  }
}

const getFoldable = <K>(O: Ord<K>): Foldable2C<URI, K> => {
  return {
    URI,
    _L: phantom,
    reduce: reduce(O),
    foldMap: foldMap(O),
    reduceRight: reduceRight(O)
  }
}

const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  return {
    ...getFoldable(O),
    reduceWithIndex: reduceWithIndex(O),
    foldMapWithIndex: foldMapWithIndex(O),
    reduceRightWithIndex: reduceRightWithIndex(O)
  }
}

const filterable: Filterable2<URI> = {
  ...compactable,
  ...functor,
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @since 2.0.0
 */
export function getFilterableWithIndex<K>(): FilterableWithIndex2C<URI, K, K> {
  return {
    ...filterable,
    ...getFunctorWithIndex<K>(),
    partitionMapWithIndex,
    partitionWithIndex,
    filterMapWithIndex,
    filterWithIndex
  }
}

const getTraversable = <K>(O: Ord<K>): Traversable2C<URI, K> => {
  return {
    _L: phantom,
    ...getFoldable(O),
    ...functor,
    traverse,
    sequence
  }
}

/**
 * @since 2.0.0
 */
export function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> {
  return {
    ...filterable,
    ...getTraversable(O),
    wilt,
    wither
  }
}

/**
 * @since 2.0.0
 */
export function getTraversableWithIndex<K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> {
  return {
    ...getFunctorWithIndex<K>(),
    ...getFoldableWithIndex(O),
    ...getTraversable(O),
    traverseWithIndex
  }
}

/**
 * @since 2.0.0
 */
export const map: Filterable2<URI> = {
  URI,
  ...compactable,
  ...functor,
  ...filterable
}
