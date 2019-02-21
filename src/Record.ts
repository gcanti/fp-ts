import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Separated } from './Compactable_'
import { Either } from './Either_'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, tuple, Refinement } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { getDictionaryMonoid, Monoid } from './Monoid'
import { none, Option, some as optionSome } from './Option_'
import { Setoid, fromEquals } from './Setoid'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Semigroup } from './Semigroup_'

/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 1.10.0
 */
export const size = <A>(d: Record<string, A>): number => {
  return Object.keys(d).length
}

/**
 * Test whether a record is empty
 *
 * @since 1.10.0
 */
export const isEmpty = <A>(d: Record<string, A>): boolean => {
  return Object.keys(d).length === 0
}

/**
 * @since 1.10.0
 */
export function collect<K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B>
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B> {
  const out: Array<B> = []
  const keys = Object.keys(d).sort()
  for (const key of keys) {
    out.push(f(key, d[key]))
  }
  return out
}

/**
 * @since 1.10.0
 */
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]> {
  return collect(d, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 1.10.0
 */
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]> {
  return d => {
    const arr = toArray(d)
    const len = arr.length
    return unfoldable.unfoldr(0, b => (b < len ? optionSome(tuple(arr[b], b + 1)) : none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.10.0
 */
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A> {
  if (d[k] === a) {
    return d
  }
  const r = Object.assign({}, d)
  r[k] = a
  return r
}

/**
 * Delete a key and value from a map
 *
 * @since 1.10.0
 */
export function remove<KS extends string, K extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A> {
  if (!d.hasOwnProperty(k)) {
    return d
  }
  const r = Object.assign({}, d)
  delete r[k]
  return r
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.10.0
 */
export const pop = <A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> => {
  const a = lookup(k, d)
  return a.isNone() ? none : optionSome(tuple(a.value, remove(k, d)))
}

/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 1.14.0
 */
export const isSubrecord = <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => {
  for (let k in d1) {
    if (!d2.hasOwnProperty(k) || !S.equals(d1[k], d2[k])) {
      return false
    }
  }
  return true
}

/**
 * Use {@link isSubrecord} instead
 * @since 1.10.0
 * @deprecated
 */
export const isSubdictionary: <A>(
  S: Setoid<A>
) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = isSubrecord

/**
 * @since 1.10.0
 */
export function getSetoid<K extends string, A>(S: Setoid<A>): Setoid<Record<K, A>>
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>>
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>> {
  const isSubrecordS = isSubrecord(S)
  return fromEquals((x, y) => isSubrecordS(x, y) && isSubrecordS(y, x))
}

/**
 * Returns a {@link Semigroup} instance for records given a {@link Semigroup} instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/Record'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 1.10.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>> {
  // tslint:disable-next-line: deprecation
  return getDictionaryMonoid(S)
}

/**
 * Lookup the value for a key in a dictionary
 * @since 1.10.0
 */
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => {
  return fa.hasOwnProperty(key) ? optionSome(fa[key]) : none
}

/**
 * @since 1.10.0
 */
export function filter<A, B extends A>(fa: Record<string, A>, p: Refinement<A, B>): Record<string, B>
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A> {
  return filterWithKey(fa, (_, a) => p(a))
}

/**
 * @since 1.10.0
 */
export const empty: Record<string, never> = {}

/**
 * @since 1.10.0
 */
export function mapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B> {
  const r: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    r[key] = f(key, fa[key])
  }
  return r
}

/**
 * @since 1.10.0
 */
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B> {
  return mapWithKey(fa, (_, a) => f(a))
}

/**
 * @since 1.10.0
 */
export const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => {
  return reduceWithKey(fa, b, (_, b, a) => f(b, a))
}

/**
 * @since 1.10.0
 */
export const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => {
  const foldMapWithKeyM = foldMapWithKey(M)
  return (fa, f) => foldMapWithKeyM(fa, (_, a) => f(a))
}

/**
 * @since 1.10.0
 */
export const foldr = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => {
  return foldrWithKey(fa, b, (_, a, b) => f(a, b))
}

/**
 * @since 1.12.0
 */
export function reduceWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B {
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
 * @since 1.12.0
 */
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => {
  let out: M = M.empty
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    out = M.concat(out, f(k, fa[k]))
  }
  return out
}

/**
 * @since 1.12.0
 */
export function foldrWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B {
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
 * Create a dictionary with one key/value pair
 *
 * @since 1.10.0
 */
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => {
  return { [k]: a } as any
}

/**
 * @since 1.10.0
 */
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type<F, B>) => Type<F, Record<string, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverseWithKey<F>(
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
 * @since 1.10.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type<F, B>) => Type<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>> {
  const traverseWithKeyF = traverseWithKey(F)
  return (ta, f) => traverseWithKeyF(ta, (_, a) => f(a))
}

/**
 * @since 1.10.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <A>(ta: Record<string, Type<F, A>>) => Type<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> {
  const traverseWithKeyF = traverseWithKey(F)
  return ta => traverseWithKeyF(ta, (_, a) => a)
}

/**
 * @since 1.10.0
 */
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => {
  const r: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (optionA.isSome()) {
      r[key] = optionA.value
    }
  }
  return r
}

/**
 * @since 1.10.0
 */
export const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => {
  return partitionMapWithKey(fa, (_, a) => f(a))
}

/**
 * @since 1.10.0
 */
export const partition = <A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => {
  return partitionWithKey(fa, (_, a) => p(a))
}

/**
 * @since 1.10.0
 */
export const separate = <RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> => {
  const left: Record<string, RL> = {}
  const right: Record<string, RR> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = fa[key]
    if (e.isLeft()) {
      left[key] = e.value
    } else {
      right[key] = e.value
    }
  }
  return {
    left,
    right
  }
}

/**
 * @since 1.10.0
 */
export function wither<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>)
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>)
export function wither<F extends URIS2>(
  F: Applicative2<F>
): (<L, A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>)
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>)
export function wither<F extends URIS>(
  F: Applicative1<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Record<string, B>>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

/**
 * @since 1.10.0
 */
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): (<L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS>(
  F: Applicative1<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

/**
 * @since 1.10.0
 */
export const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => {
  return filterMapWithKey(fa, (_, a) => f(a))
}

/**
 * @since 1.14.0
 */
export function partitionMapWithKey<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> {
  const left: Record<string, RL> = {}
  const right: Record<string, RR> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = f(key, fa[key])
    if (e.isLeft()) {
      left[key] = e.value
    } else {
      right[key] = e.value
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
export function partitionWithKey<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
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
 * @since 1.14.0
 */
export function filterMapWithKey<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> {
  const r: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionB = f(key, fa[key])
    if (optionB.isSome()) {
      r[key] = optionB.value
    }
  }
  return r
}

/**
 * @since 1.14.0
 */
export function filterWithKey<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> {
  const r: Record<string, A> = {}
  let changed = false
  for (const key in fa) {
    if (fa.hasOwnProperty(key)) {
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
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.10.0
 */
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K extends string, U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K extends string, L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K extends string, A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <K extends string, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A> {
  return <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => {
    return F.reduce<[string, A], Record<string, A>>(ta, {}, (b, [k, a]) => {
      b[k] = b.hasOwnProperty(k) ? f(b[k], a) : a
      return b
    })
  }
}

/**
 * @since 1.14.0
 */
export function every<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (!predicate(fa[k])) {
      return false
    }
  }
  return true
}

/**
 * @since 1.14.0
 */
export function some<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (predicate(fa[k])) {
      return true
    }
  }
  return false
}

/**
 * @since 1.14.0
 */
export function elem<A>(S: Setoid<A>): (a: A, fa: { [key: string]: A }) => boolean {
  return (a, fa) => some(fa, x => S.equals(x, a))
}

/**
 * Use {@link partitionMapWithKey} instead
 * @since 1.12.0
 * @deprecated
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
  return partitionMapWithKey(fa, f)
}

/**
 * Use {@link partitionWithKey} instead
 * @since 1.12.0
 * @deprecated
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
  return partitionWithKey(fa, p)
}

/**
 * Use {@link filterMapWithKey} instead
 * @since 1.12.0
 * @deprecated
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
  return filterMapWithKey(fa, f)
}

/**
 * Use {@link filterWithKey} instead
 * @since 1.12.0
 * @deprecated
 */
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> {
  return filterWithKey(fa, p)
}
