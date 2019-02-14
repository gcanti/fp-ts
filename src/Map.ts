import { sort } from './Array'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Separated } from './Compactable'
import { Either } from './Either'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, tuple, Refinement } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Option, none, some } from './Option'
import { Ord } from './Ord'
import { Setoid, fromEquals } from './Setoid'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Semigroup } from './Semigroup'

/**
 * Calculate the number of key/value pairs in a Map
 *
 * @since 1.14.0
 */
export const size = <K, A>(d: Map<K, A>): number => d.size

/**
 * Test whether or not a Map is empty
 *
 * @since 1.14.0
 */
export const isEmpty = <K, A>(d: Map<K, A>): boolean => d.size === 0

/**
 * Test whether or not a key exists in a map
 *
 * @since 1.14.0
 */
export const has = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => {
  const lookupS = lookup(S)
  return (k, m) => lookupS(k, m).isSome()
}

/**
 * Test whether or not a key/value pair is a member of a map
 *
 * @since 1.14.0
 */
export const member = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((k: K, a: A, m: Map<K, A>) => boolean) => {
  const lookupSK = lookup(SK)
  return (k, a, m) => {
    const o = lookupSK(k, m)
    return o.isSome() && SA.equals(a, o.value)
  }
}

/**
 * @since 1.14.0
 */
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => {
  const sortO = sort(O)
  return m => {
    const ks = Array.from(m.keys())
    return sortO(ks)
  }
}

/**
 * @since 1.14.0
 */
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => {
  const lookupWithKeyO = lookupWithKey(O)
  const keysO = keys(O)
  return <A, B>(m: Map<K, A>, f: (k: K, a: A) => B): Array<B> => {
    const out: Array<B> = []
    const ks = keysO(m)
    for (let key of ks) {
      const o = lookupWithKeyO(key, m)
      if (o.isSome()) {
        out.push(f(key, o.value[1]))
      }
    }
    return out
  }
}

/**
 * @since 1.14.0
 */
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => {
  const collectO = collect(O)
  return <A>(m: Map<K, A>): Array<[K, A]> => collectO(m, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a Map into a list of key/value pairs
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
 * Insert or replace a key/value pair in a Map
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
    if (found.isNone()) {
      const r = new Map(m)
      m.delete(k)
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
  return (k, m) => {
    const a = lookup(S)(k, m)
    return a.isNone() ? none : some(tuple(a.value, remove(S)(k, m)))
  }
}

/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 * @since 1.14.0
 */
export const lookupWithKey = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[K, A]>) => {
  return <A>(k: K, m: Map<K, A>) => {
    const entries = m.entries()
    let e: IteratorResult<[K, A]>
    while (!(e = entries.next()).done) {
      const [ka, a] = e.value
      if (S.equals(ka, k)) {
        return some(tuple(k, a))
      }
    }
    return none
  }
}

/**
 * Lookup the value for a key in a `Map`.
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
      const d1OptA = lookupWithKeyS(k, d1)
      const d2OptA = lookupWithKeyS(k, d2)
      if (d1OptA.isNone() || d2OptA.isNone() || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
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
  return {
    concat: (mx, my) => {
      const r = new Map(mx)
      const entries = my.entries()
      let e: IteratorResult<[K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const lookupWithKeyS = lookupWithKey(SK)
        const mxOptA = lookupWithKeyS(k, mx)
        const myOptA = lookupWithKeyS(k, my)
        r.set(
          k,
          mxOptA.isSome() && myOptA.isSome() && SK.equals(k, myOptA.value[0]) ? SA.concat(mxOptA.value[1], a) : a
        )
      }
      return r
    },
    empty
  }
}

/**
 * @since 1.14.0
 */
export function filter<K, A, B extends A>(fa: Map<K, A>, p: Refinement<A, B>): Map<K, B>
export function filter<K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A>
export function filter<K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A> {
  return filterWithIndex(fa, (_, a) => p(a))
}

/**
 * @since 1.14.0
 */
export const mapWithKey = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B> => {
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
export const map = <K, A, B>(fa: Map<K, A>, f: (a: A) => B): Map<K, B> => mapWithKey(fa, (_, a) => f(a))

/**
 * @since 1.14.0
 */
export const reduce = <K, A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B): B =>
  reduceWithKey(fa, b, (_, b, a) => f(b, a))

/**
 * @since 1.14.0
 */
export const foldMap = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (a: A) => M) => M) => (fa, f) =>
  foldMapWithKey(M)(fa, (_, a) => f(a))

/**
 * @since 1.14.0
 */
export const foldr = <K, A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B): B =>
  foldrWithKey(fa, b, (_, a, b) => f(a, b))

/**
 * @since 1.14.0
 */
export const reduceWithKey = <K, A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B): B => {
  let out: B = b
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    out = f(k, out, a)
  }
  return out
}

/**
 * @since 1.14.0
 */
export const foldMapWithKey = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (k: K, a: A) => M) => M) => {
  return <K, A>(fa: Map<K, A>, f: (k: K, a: A) => M): M => {
    let out: M = M.empty
    const entries = fa.entries()
    let e: IteratorResult<[K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      out = M.concat(out, f(k, a))
    }
    return out
  }
}

/**
 * @since 1.14.0
 */
export const foldrWithKey = <K, A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B): B => {
  let out: B = b
  const entries = fa.entries()
  let e: IteratorResult<[K, A]>
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    out = f(k, a, out)
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
export const partitionMap = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => partitionMapWithIndex(fa, (_, a) => f(a))

/**
 * @since 1.14.0
 */
export const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> =>
  partitionWithIndex(fa, (_, a) => p(a))

/**
 * @since 1.14.0
 */
export const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => {
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
export const partitionMapWithIndex = <K, RL, RR, A>(
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
export const partitionWithIndex = <K, A>(
  fa: Map<K, A>,
  p: (k: K, a: A) => boolean
): Separated<Map<K, A>, Map<K, A>> => {
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
export const filterMapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Option<B>): Map<K, B> => {
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
export const filterWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Map<K, A> => {
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
 * Create a Map from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.14.0
 */
export function fromFoldable<K, F extends URIS3>(
  S: Setoid<K>,
  F: Foldable3<F>
): <U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS2>(
  S: Setoid<K>,
  F: Foldable2<F>
): <L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS>(
  S: Setoid<K>,
  F: Foldable1<F>
): <A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A> {
  return <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => {
    return F.reduce<[K, A], Map<K, A>>(ta, new Map<K, A>(), (b, [k, a]) => {
      const bOpt = lookupWithKey(S)(k, b)
      b.set(k, bOpt.isSome() ? f(bOpt.value[1], a) : a)
      return b
    })
  }
}
