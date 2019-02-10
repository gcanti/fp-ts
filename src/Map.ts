import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Separated } from './Compactable'
import { Either } from './Either'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, tuple, Refinement } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { getMapMonoid, Monoid } from './Monoid'
import { Option, none, some } from './Option'
import { Setoid, fromEquals } from './Setoid'
import { Unfoldable } from './Unfoldable'
import { Semigroup } from './Semigroup'

/**
 * Calculate the number of key/value pairs in a Map
 *
 * @since 1.14.0
 */
export const size = <K, A>(d: Map<K, A>): number => {
  return d.size
}

/**
 * Test whether a Map is empty
 *
 * @since 1.14.0
 */
export const isEmpty = <K, A>(d: Map<K, A>): boolean => {
  return d.size === 0
}

/**
 * @since 1.14.0
 */
export const keys = <K, A>(d: Map<K, A>): Array<K> => {
  return Array.from(d.keys())
}

/**
 * @since 1.14.0
 */
export const unsafeLookup = <K, A>(k: K, d: Map<K, A>): A => {
  return d.get(k)!
}

/**
 * @since 1.14.0
 */
export function collect<K, A, B>(d: Map<K, A>, f: (k: K, a: A) => B): Array<B> {
  const out: Array<B> = []
  const ks = keys(d).sort()
  for (let key of ks) {
    const lookup = d.get(key)
    if (lookup !== undefined) {
      out.push(f(key, lookup))
    }
  }
  return out
}

/**
 * @since 1.14.0
 */
export function toArray<K, A>(d: Map<K, A>): Array<[K, A]> {
  return collect(d, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a Map into a list of key/value pairs
 *
 * @since 1.14.0
 */
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <K, A>(d: Map<K, A>): HKT<F, [K, A]> => {
  const arr = toArray(d)
  const len = arr.length
  return unfoldable.unfoldr(0, b => (b < len ? some(tuple(arr[b], b + 1)) : none))
}

/**
 * Insert or replace a key/value pair in a Map
 *
 * @since 1.14.0
 */
export function insert<KS, K extends KS, A>(k: K, a: A, d: Map<KS, A>): Map<KS | K, A>
export function insert<K, A>(k: K, a: A, d: Map<K, A>): Map<K, A> {
  const m = new Map(d)
  m.set(k, a)
  return m
}

/**
 * Delete a key and value from a map
 *
 * @since 1.14.0
 */
export function remove<KS, K extends KS, A>(k: K, d: Map<KS, A>): Map<KS extends K ? KS : Exclude<KS, K>, A>
export function remove<K, A>(k: K, d: Map<K, A>): Map<K, A> {
  const m = new Map(d)
  m.delete(k)
  return m
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.14.0
 */
export const pop = <K, A>(k: K, d: Map<K, A>): Option<[A, Map<K, A>]> => {
  const a = lookup(k, d)
  return a.isNone() ? none : some(tuple(a.value, remove(k, d)))
}

/**
 * Test whether one Map contains all of the keys and values contained in another Map
 *
 * @since 1.14.0
 */
export const isSubmap = <K, A>(S: Setoid<A>) => (d1: Map<K, A>, d2: Map<K, A>): boolean => {
  for (let k of keys(d1)) {
    if (!d2.has(k) || !S.equals(unsafeLookup(k, d1), unsafeLookup(k, d2))) {
      return false
    }
  }
  return true
}

/**
 * @since 1.14.0
 */
export const getSetoid = <K, A>(S: Setoid<A>): Setoid<Map<K, A>> => {
  const isSubmapS = isSubmap(S)
  return fromEquals((x, y) => isSubmapS(x, y) && isSubmapS(y, x))
}
/**
 * @since 1.14.0
 */
export const getMonoid = <K, A>(S: Semigroup<A>): Monoid<Map<K, A>> => {
  return getMapMonoid(S)
}

/**
 * Lookup the value for a key in a Map
 * @since 1.14.0
 */
export const lookup = <K, A>(key: K, fa: Map<K, A>): Option<A> => {
  return fa.has(key) ? some(unsafeLookup(key, fa)) : none
}

/**
 * @since 1.14.0
 */
export function filter<K, A, B extends A>(fa: Map<K, A>, p: Refinement<A, B>): Map<K, B>
export function filter<K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A> {
  return filterWithIndex(fa, (_, a) => p(a))
}

/**
 * @since 1.14.0
 */
export const empty = new Map<never, never>()

/**
 * @since 1.14.0
 */
export function mapWithKey<K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B> {
  const m = new Map<K, B>()
  const ks = keys(fa)
  for (let key of ks) {
    m.set(key, f(key, unsafeLookup(key, fa)))
  }
  return m
}

/**
 * @since 1.14.0
 */
export function map<K, A, B>(fa: Map<K, A>, f: (a: A) => B): Map<K, B> {
  return mapWithKey(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export const reduce = <K, A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B): B => {
  return reduceWithKey(fa, b, (_, b, a) => f(b, a))
}

/**
 * @since 1.14.0
 */
export const foldMap = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (a: A) => M) => M) => {
  const foldMapWithKeyM = foldMapWithKey(M)
  return (fa, f) => foldMapWithKeyM(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export const foldr = <K, A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B): B => {
  return foldrWithKey(fa, b, (_, a, b) => f(a, b))
}

/**
 * @since 1.14.0
 */
export function reduceWithKey<K, A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B): B {
  let out: B = b
  const ks = keys(fa).sort()
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = f(k, out, unsafeLookup(k, fa))
  }
  return out
}

/**
 * @since 1.14.0
 */
export const foldMapWithKey = <M>(M: Monoid<M>) => <K, A>(fa: Map<K, A>, f: (k: K, a: A) => M): M => {
  let out: M = M.empty
  const ks = keys(fa).sort()
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = M.concat(out, f(k, unsafeLookup(k, fa)))
  }
  return out
}

/**
 * @since 1.14.0
 */
export function foldrWithKey<K, A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B): B {
  let out: B = b
  const ks = keys(fa).sort()
  const len = ks.length
  for (let i = len - 1; i >= 0; i--) {
    const k = ks[i]
    out = f(k, unsafeLookup(k, fa), out)
  }
  return out
}

/**
 * Create a Map with one key/value pair
 *
 * @since 1.14.0
 */
export const singleton = <K, A>(k: K, a: A): Map<K, A> => {
  return new Map<K, A>([[k, a]])
}

/**
 * @since 1.14.0
 */
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <K, U, L, A, B>(ta: Map<K, A>, f: (k: K, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Map<K, B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <K, L, A, B>(ta: Map<K, A>, f: (k: K, a: A) => Type2<F, L, B>) => Type2<F, L, Map<K, B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => Type<F, B>) => Type<F, Map<K, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Map<K, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Map<K, B>> {
  return <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => {
    let fm: HKT<F, Map<K, B>> = F.of(empty)
    const ks = keys(ta)
    for (let key of ks) {
      fm = F.ap(F.map(fm, m => (b: B) => insert(key, b, m)), f(key, unsafeLookup(key, ta)))
    }
    return fm
  }
}

/**
 * @since 1.14.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <K, U, L, A, B>(ta: Map<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Map<K, B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <K, A, B>(ta: Map<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Map<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <K, L, A, B>(ta: Map<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Map<K, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K, A, B>(ta: Map<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Map<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <K, A, B>(ta: Map<K, A>, f: (a: A) => Type<F, B>) => Type<F, Map<K, B>>
export function traverse<F>(F: Applicative<F>): <K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>>
export function traverse<F>(F: Applicative<F>): <K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>> {
  const traverseWithKeyF = traverseWithKey(F)
  return (ta, f) => traverseWithKeyF(ta, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K, U, L, A>(ta: Map<K, Type3<F, U, L, A>>) => Type3<F, U, L, Map<K, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <K, A>(ta: Map<K, Type3<F, U, L, A>>) => Type3<F, U, L, Map<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K, L, A>(ta: Map<K, Type2<F, L, A>>) => Type2<F, L, Map<K, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K, A>(ta: Map<K, Type2<F, L, A>>) => Type2<F, L, Map<K, A>>
export function sequence<F extends URIS>(F: Applicative1<F>): <K, A>(ta: Map<K, Type<F, A>>) => Type<F, Map<K, A>>
export function sequence<F>(F: Applicative<F>): <K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>>
export function sequence<F>(F: Applicative<F>): <K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>> {
  const traverseWithKeyF = traverseWithKey(F)
  return ta => traverseWithKeyF(ta, (_, a) => a)
}

/**
 * @since 1.14.0
 */
export const compact = <K, A>(fa: Map<K, Option<A>>): Map<K, A> => {
  const m = new Map<K, A>()
  const ks = keys(fa)
  for (let key of ks) {
    const optionA = unsafeLookup(key, fa)
    if (optionA.isSome()) {
      m.set(key, optionA.value)
    }
  }
  return m
}

/**
 * @since 1.14.0
 */
export const partitionMap = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => {
  return partitionMapWithIndex(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> => {
  return partitionWithIndex(fa, (_, a) => p(a))
}

/**
 * @since 1.14.0
 */
export const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => {
  const left = new Map<K, RL>()
  const right = new Map<K, RR>()
  const ks = keys(fa)
  for (let key of ks) {
    const e = unsafeLookup(key, fa)
    if (e.isLeft()) {
      left.set(key, e.value)
    } else {
      right.set(key, e.value)
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
export function wither<F extends URIS3>(
  F: Applicative3<F>
): (<K, U, L, A, B>(wa: Map<K, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Map<K, B>>)
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Map<K, B>>)
export function wither<F extends URIS2>(
  F: Applicative2<F>
): (<K, L, A, B>(wa: Map<K, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Map<K, B>>)
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Map<K, B>>)
export function wither<F extends URIS>(
  F: Applicative1<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Map<K, B>>)
export function wither<F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>)
export function wither<F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

/**
 * @since 1.14.0
 */
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): (<K, U, L, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<K, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): (<K, L, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<K, RL, RR, A>(
  wa: Map<K, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F extends URIS>(
  F: Applicative1<F>
): (<K, RL, RR, A>(wa: Map<K, A>, f: (a: A) => Type<F, Either<RL, RR>>) => Type<F, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<K, RL, RR, A>(wa: Map<K, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<K, RL, RR, A>(wa: Map<K, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

/**
 * @since 1.14.0
 */
export const filterMap = <K, A, B>(fa: Map<K, A>, f: (a: A) => Option<B>): Map<K, B> => {
  return filterMapWithIndex(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export function partitionMapWithIndex<K, RL, RR, A>(
  fa: Map<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>>
export function partitionMapWithIndex<K, RL, RR, A>(
  fa: Map<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>>
export function partitionMapWithIndex<K, RL, RR, A>(
  fa: Map<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> {
  const left = new Map<K, RL>()
  const right = new Map<K, RR>()
  const ks = keys(fa)
  for (let key of ks) {
    const e = f(key, unsafeLookup(key, fa))
    if (e.isLeft()) {
      left.set(key, e.value)
    } else {
      right.set(key, e.value)
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
export function partitionWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>>
export function partitionWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>>
export function partitionWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>> {
  const left = new Map<K, A>()
  const right = new Map<K, A>()
  const ks = keys(fa)
  for (let key of ks) {
    const a = unsafeLookup(key, fa)
    if (p(key, a)) {
      right.set(key, a)
    } else {
      left.set(key, a)
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
export function filterMapWithIndex<K, A, B>(fa: Map<K, A>, f: (key: K, a: A) => Option<B>): Map<K, B> {
  const m = new Map<K, B>()
  const ks = keys(fa)
  for (let key of ks) {
    const optionB = f(key, unsafeLookup(key, fa))
    if (optionB.isSome()) {
      m.set(key, optionB.value)
    }
  }
  return m
}

/**
 * @since 1.14.0
 */
export function filterWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Map<K, A> {
  const m = new Map<K, A>()
  const ks = keys(fa)
  for (let key of ks) {
    const a = unsafeLookup(key, fa)
    if (p(key, a)) {
      m.set(key, a)
    }
  }
  return m
}

/**
 * Create a Map from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.14.0
 */
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K, U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K, L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K, A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
// tslint:disable-next-line: deprecation
export function fromFoldable<F>(F: Foldable<F>): <K, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
// tslint:disable-next-line: deprecation
export function fromFoldable<F>(F: Foldable<F>): <K, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A> {
  return <K, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => {
    return F.reduce<[K, A], Map<K, A>>(ta, new Map<K, A>(), (b, [k, a]) => {
      b.set(k, b.has(k) ? f(unsafeLookup(k, b), a) : a)
      return b
    })
  }
}
