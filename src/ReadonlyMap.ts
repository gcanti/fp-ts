/**
 * @since 2.5.0
 */
import { Applicative } from './Applicative'
import { Compactable2 } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3 } from './Foldable'
import { FoldableWithIndex2C } from './FoldableWithIndex'
import { pipe, SK } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { FunctorWithIndex2C } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import * as _ from './internal'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import { Predicate } from './Predicate'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
import { Show } from './Show'
import { Traversable2C } from './Traversable'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { wiltDefault, Witherable2C, witherDefault } from './Witherable'

import Option = O.Option

/**
 * @category conversions
 * @since 2.5.0
 */
export const fromMap = <K, A>(m: Map<K, A>): ReadonlyMap<K, A> => new Map(m)

/**
 * @category conversions
 * @since 2.5.0
 */
export function toMap<K, A>(m: ReadonlyMap<K, A>): Map<K, A> {
  return new Map(m)
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>> {
  return {
    show: (m) => {
      const entries: Array<string> = []
      m.forEach((a, k) => {
        entries.push(`[${SK.show(k)}, ${SA.show(a)}]`)
      })
      return `new Map([${entries.sort().join(', ')}])`
    }
  }
}

/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
export const size = <K, A>(m: ReadonlyMap<K, A>): number => m.size

/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
export const isEmpty = <K, A>(m: ReadonlyMap<K, A>): boolean => m.size === 0

// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
export function member<K>(E: Eq<K>): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => boolean
  <A>(k: K, m: ReadonlyMap<K, A>): boolean
}
export function member<K>(E: Eq<K>): <A>(k: K, m?: ReadonlyMap<K, A>) => boolean | ((m: ReadonlyMap<K, A>) => boolean) {
  const lookupE = lookup(E)
  return (k, m?) => {
    if (m === undefined) {
      const memberE = member(E)
      return (m) => memberE(k, m)
    }
    return _.isSome(lookupE(k, m))
  }
}

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
export function elem<A>(E: Eq<A>): {
  (a: A): <K>(m: ReadonlyMap<K, A>) => boolean
  <K>(a: A, m: ReadonlyMap<K, A>): boolean
}
export function elem<A>(E: Eq<A>): <K>(a: A, m?: ReadonlyMap<K, A>) => boolean | ((m: ReadonlyMap<K, A>) => boolean) {
  return (a, m?) => {
    if (m === undefined) {
      const elemE = elem(E)
      return (m) => elemE(a, m)
    }
    const values = m.values()
    let e: Next<A>
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
 * Get a sorted `ReadonlyArray` of the keys contained in a `ReadonlyMap`.
 *
 * @since 2.5.0
 */
export const keys =
  <K>(O: Ord<K>) =>
  <A>(m: ReadonlyMap<K, A>): ReadonlyArray<K> =>
    Array.from(m.keys()).sort(O.compare)

/**
 * Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.
 *
 * @since 2.5.0
 */
export const values =
  <A>(O: Ord<A>) =>
  <K>(m: ReadonlyMap<K, A>): ReadonlyArray<A> =>
    Array.from(m.values()).sort(O.compare)

/**
 * @since 2.5.0
 */
export function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B> {
  const keysO = keys(O)
  return <A, B>(f: (k: K, a: A) => B) =>
    (m: ReadonlyMap<K, A>): ReadonlyArray<B> => {
      const out: Array<B> = []
      const ks = keysO(m)
      for (const key of ks) {
        out.push(f(key, m.get(key)!))
      }
      return out
    }
}

/**
 * Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyMap`.
 *
 * @category conversions
 * @since 2.5.0
 */
export const toReadonlyArray = <K>(O: Ord<K>): (<A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]>) =>
  collect(O)((k, a) => [k, a] as const)

/**
 * Unfolds a map into a list of key/value pairs
 *
 * @category conversions
 * @since 2.5.0
 */
export function toUnfoldable<K, F extends URIS>(
  ord: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<K, F>(ord: Ord<K>, U: Unfoldable<F>): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
export function toUnfoldable<K, F>(
  ord: Ord<K>,
  U: Unfoldable<F>
): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]> {
  const toReadonlyArrayO = toReadonlyArray(ord)
  return (d) => {
    const kas = toReadonlyArrayO(d)
    const len = kas.length
    return U.unfold(0, (b) => (b < len ? _.some([kas[b], b + 1]) : _.none))
  }
}

/**
 * Insert or replace a key/value pair in a `ReadonlyMap`.
 *
 * @since 2.10.0
 */
export const upsertAt = <K>(E: Eq<K>): (<A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => {
    const lookupWithKeyEk = lookupWithKeyE(k)
    return (m) => {
      const found = lookupWithKeyEk(m)
      if (_.isNone(found)) {
        const out = new Map(m)
        out.set(k, a)
        return out
      } else if (found.value[1] !== a) {
        const out = new Map(m)
        out.set(found.value[0], a)
        return out
      }
      return m
    }
  }
}

/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
export const deleteAt = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (_.isSome(found)) {
      const r = new Map(m)
      r.delete(found.value[0])
      return r
    }
    return m
  }
}

/**
 * @since 2.5.0
 */
export const updateAt = <K>(E: Eq<K>): (<A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const modifyAtE = modifyAt(E)
  return (k, a) => modifyAtE(k, () => a)
}

/**
 * @since 2.5.0
 */
export const modifyAt = <K>(
  E: Eq<K>
): (<A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, f) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (_.isNone(found)) {
      return _.none
    }
    const [fk, fv] = found.value
    const next = f(fv)
    if (next === fv) {
      return _.some(m)
    }
    const r = new Map(m)
    r.set(fk, next)
    return _.some(r)
  }
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export function pop<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]> {
  const lookupE = lookup(E)
  const deleteAtE = deleteAt(E)
  return (k) => {
    const deleteAtEk = deleteAtE(k)
    return (m) =>
      pipe(
        lookupE(k, m),
        O.map((a) => [a, deleteAtEk(m)])
      )
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
export function lookupWithKey<K>(E: Eq<K>): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<readonly [K, A]>
}
export function lookupWithKey<K>(
  E: Eq<K>
): <A>(k: K, m?: ReadonlyMap<K, A>) => Option<readonly [K, A]> | ((m: ReadonlyMap<K, A>) => Option<readonly [K, A]>) {
  return <A>(k: K, m?: ReadonlyMap<K, A>) => {
    if (m === undefined) {
      const lookupWithKeyE = lookupWithKey(E)
      return (m) => lookupWithKeyE(k, m)
    }
    const entries = m.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [ka, a] = e.value
      if (E.equals(ka, k)) {
        return _.some([ka, a])
      }
    }
    return _.none
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
export function lookup<K>(E: Eq<K>): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<A>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<A>
}
export function lookup<K>(
  E: Eq<K>
): <A>(k: K, m?: ReadonlyMap<K, A>) => Option<A> | ((m: ReadonlyMap<K, A>) => Option<A>) {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, m?) => {
    if (m === undefined) {
      const lookupE = lookup(E)
      return (m) => lookupE(k, m)
    }
    return pipe(
      lookupWithKeyE(k, m),
      O.map(([_, a]) => a)
    )
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether or not one `Map` contains all of the keys and values contained in another `Map`
 *
 * @since 2.5.0
 */
export function isSubmap<K, A>(
  SK: Eq<K>,
  SA: Eq<A>
): {
  (that: ReadonlyMap<K, A>): (me: ReadonlyMap<K, A>) => boolean
  (me: ReadonlyMap<K, A>, that: ReadonlyMap<K, A>): boolean
}
export function isSubmap<K, A>(
  SK: Eq<K>,
  SA: Eq<A>
): (me: ReadonlyMap<K, A>, that?: ReadonlyMap<K, A>) => boolean | ((me: ReadonlyMap<K, A>) => boolean) {
  const lookupWithKeyS = lookupWithKey(SK)
  return (me: ReadonlyMap<K, A>, that?: ReadonlyMap<K, A>) => {
    if (that === undefined) {
      const isSubmapSKSA = isSubmap(SK, SA)
      return (that) => isSubmapSKSA(that, me)
    }
    const entries = me.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const d2OptA = lookupWithKeyS(k, that)
      if (_.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 2.5.0
 */
export const empty: ReadonlyMap<never, never> =
  // the type annotation here is intended (otherwise it doesn't type-check)
  new Map<never, never>()

/**
 * @category instances
 * @since 2.5.0
 */
export function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>> {
  const isSubmapSKSA = isSubmap(SK, SA)
  return fromEquals((x, y) => isSubmapSKSA(x, y) && isSubmapSKSA(y, x))
}

/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @category instances
 * @since 2.5.0
 */
export function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>> {
  const lookupWithKeyS = lookupWithKey(SK)
  return {
    concat: (mx, my) => {
      if (isEmpty(mx)) {
        return my
      }
      if (isEmpty(my)) {
        return mx
      }
      const r = new Map(mx)
      const entries = my.entries()
      let e: Next<readonly [K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const mxOptA = lookupWithKeyS(k, mx)
        if (_.isSome(mxOptA)) {
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
 * @category constructors
 * @since 2.5.0
 */
export const singleton = <K, A>(k: K, a: A): ReadonlyMap<K, A> => new Map([[k, a]])

/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @category constructors
 * @since 2.5.0
 */
export function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A> {
  return (fka: HKT<F, readonly [K, A]>) => {
    const lookupWithKeyE = lookupWithKey(E)
    return F.reduce<readonly [K, A], Map<K, A>>(fka, new Map<K, A>(), (b, [k, a]) => {
      const bOpt = lookupWithKeyE(k, b)
      if (_.isSome(bOpt)) {
        b.set(bOpt.value[0], M.concat(bOpt.value[1], a))
      } else {
        b.set(k, a)
      }
      return b
    })
  }
}

const _mapWithIndex = <K, A, B>(fa: ReadonlyMap<K, A>, f: (k: K, a: A) => B): ReadonlyMap<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: Next<readonly [K, A]>
  while (!(e = entries.next()).done) {
    const [key, a] = e.value
    m.set(key, f(key, a))
  }
  return m
}

/**
 * @since 2.10.0
 */
export const partitionMapWithIndex =
  <K, A, B, C>(f: (k: K, a: A) => Either<B, C>) =>
  (fa: ReadonlyMap<K, A>): Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>> => {
    const left = new Map<K, B>()
    const right = new Map<K, C>()
    const entries = fa.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const ei = f(k, a)
      if (_.isLeft(ei)) {
        left.set(k, ei.left)
      } else {
        right.set(k, ei.right)
      }
    }
    return separated(left, right)
  }

/**
 * @since 2.10.0
 */
export function partitionWithIndex<K, A, B extends A>(
  predicateWithIndex: (k: K, a: A) => a is B
): (m: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
export function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>>
export function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): (m: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
export function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): (m: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>> {
  return (m: ReadonlyMap<K, A>) => {
    const left = new Map<K, A>()
    const right = new Map<K, A>()
    const entries = m.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      if (predicateWithIndex(k, a)) {
        right.set(k, a)
      } else {
        left.set(k, a)
      }
    }
    return separated(left, right)
  }
}

/**
 * @since 2.10.0
 */
export const filterMapWithIndex =
  <K, A, B>(f: (k: K, a: A) => Option<B>) =>
  (fa: ReadonlyMap<K, A>): ReadonlyMap<K, B> => {
    const m = new Map<K, B>()
    const entries = fa.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const o = f(k, a)
      if (_.isSome(o)) {
        m.set(k, o.value)
      }
    }
    return m
  }

/**
 * @since 2.10.0
 */
export function filterWithIndex<K, A, B extends A>(
  predicateWithIndex: (k: K, a: A) => a is B
): (m: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
export function filterWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
export function filterWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
export function filterWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> {
  return (m: ReadonlyMap<K, A>) => {
    const out = new Map<K, A>()
    const entries = m.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      if (predicateWithIndex(k, a)) {
        out.set(k, a)
      }
    }
    return out
  }
}

const _map: Functor2<URI>['map'] = (fa, f) => _mapWithIndex(fa, (_, a) => f(a))
const _filter: Filterable2<URI>['filter'] = <K, A>(fa: ReadonlyMap<K, A>, p: Predicate<A>) =>
  _filterWithIndex(fa, (_, a) => p(a))
const _filterMap: Filterable2<URI>['filterMap'] = (fa, f) => _filterMapWithIndex(fa, (_, a) => f(a))
const _partition: Filterable2<URI>['partition'] = <K, A>(fa: ReadonlyMap<K, A>, predicate: Predicate<A>) =>
  _partitionWithIndex(fa, (_, a) => predicate(a))
const _partitionMap: Filterable2<URI>['partitionMap'] = (fa, f) => _partitionMapWithIndex(fa, (_, a) => f(a))
const _filterWithIndex = <K, A>(fa: ReadonlyMap<K, A>, p: (k: K, a: A) => boolean) => pipe(fa, filterWithIndex(p))
const _filterMapWithIndex = <K, A, B>(fa: ReadonlyMap<K, A>, f: (k: K, a: A) => Option<B>) =>
  pipe(fa, filterMapWithIndex(f))
const _partitionWithIndex = <K, A>(fa: ReadonlyMap<K, A>, p: (k: K, a: A) => boolean) => pipe(fa, partitionWithIndex(p))
const _partitionMapWithIndex = <K, A, B, C>(fa: ReadonlyMap<K, A>, f: (k: K, a: A) => Either<B, C>) =>
  pipe(fa, partitionMapWithIndex(f))

/**
 * @category filtering
 * @since 2.5.0
 */
export const compact = <K, A>(fa: ReadonlyMap<K, Option<A>>): ReadonlyMap<K, A> => {
  const m = new Map<K, A>()
  const entries = fa.entries()
  let e: Next<readonly [K, Option<A>]>
  while (!(e = entries.next()).done) {
    const [k, oa] = e.value
    if (_.isSome(oa)) {
      m.set(k, oa.value)
    }
  }
  return m
}

/**
 * @category filtering
 * @since 2.5.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
  <A>(predicate: Predicate<A>): <K, B extends A>(fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
} =
  <A>(predicate: Predicate<A>) =>
  <K>(fa: ReadonlyMap<K, A>) =>
    _filter(fa, predicate)

/**
 * @category filtering
 * @since 2.5.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> =
  (f) => (fa) =>
    _filterMap(fa, f)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) => (fa) => _map(fa, f)

/**
 * @category mapping
 * @since 2.7.1
 */
export const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> =
  (f) => (fa) =>
    _mapWithIndex(fa, f)

/**
 * @category filtering
 * @since 2.5.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(
    fa: ReadonlyMap<K, A>
  ) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
  <A>(predicate: Predicate<A>): <K, B extends A>(
    fb: ReadonlyMap<K, B>
  ) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
} =
  <A>(predicate: Predicate<A>) =>
  <K>(fa: ReadonlyMap<K, A>) =>
    _partition(fa, predicate)

/**
 * @category filtering
 * @since 2.5.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>> = (f) => (fa) => _partitionMap(fa, f)

/**
 * @category filtering
 * @since 2.5.0
 */
export const separate = <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
): Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>> => {
  const left = new Map<K, A>()
  const right = new Map<K, B>()
  const entries = fa.entries()
  let e: Next<readonly [K, Either<A, B>]>
  while (!(e = entries.next()).done) {
    const [k, ei] = e.value
    if (_.isLeft(ei)) {
      left.set(k, ei.left)
    } else {
      right.set(k, ei.right)
    }
  }
  return separated(left, right)
}

/**
 * @category type lambdas
 * @since 2.5.0
 */
export const URI = 'ReadonlyMap'

/**
 * @category type lambdas
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReadonlyMap<E, A>
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getUnionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => {
  const unionES = union(E, S)
  return {
    concat: (first, second) => unionES(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getUnionMonoid = <K, A>(E: Eq<K>, S: Semigroup<A>): Monoid<ReadonlyMap<K, A>> => ({
  concat: getUnionSemigroup(E, S).concat,
  empty
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getIntersectionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => {
  const intersectionES = intersection(E, S)
  return {
    concat: (first, second) => intersectionES(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getDifferenceMagma =
  <K>(E: Eq<K>) =>
  <A>(): Magma<ReadonlyMap<K, A>> => {
    const differenceE = difference(E)
    return {
      concat: (first, second) => differenceE(second)(first)
    }
  }

/**
 * @category filtering
 * @since 2.5.0
 */
export function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K> {
  return {
    URI,
    _E: undefined as any,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const getFunctorWithIndex = <K = never>(): FunctorWithIndex2C<URI, K, K> => ({
  URI,
  _E: undefined as any,
  map: _map,
  mapWithIndex: _mapWithIndex
})

/**
 * @category instances
 * @since 2.7.0
 */
export const Compactable: Compactable2<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Filterable: Filterable2<URI> = {
  URI,
  map: _map,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap
}

/**
 * @category folding
 * @since 2.11.0
 */
export const reduce = <K>(O: Ord<K>): (<B, A>(b: B, f: (b: B, a: A) => B) => (m: ReadonlyMap<K, A>) => B) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (b, f) => reduceWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @category folding
 * @since 2.11.0
 */
export const foldMap = <K>(O: Ord<K>): (<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (m: ReadonlyMap<K, A>) => M) => {
  const foldMapWithIndexO = foldMapWithIndex(O)
  return (M) => {
    const foldMapWithIndexOM = foldMapWithIndexO(M)
    return (f) => foldMapWithIndexOM((_, a) => f(a))
  }
}

/**
 * @category folding
 * @since 2.11.0
 */
export const reduceRight = <K>(O: Ord<K>): (<B, A>(b: B, f: (a: A, b: B) => B) => (m: ReadonlyMap<K, A>) => B) => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (b, f) => reduceRightWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @category folding
 * @since 2.10.0
 */
export const getFoldable = <K>(O: Ord<K>): Foldable2C<URI, K> => {
  const reduceO = reduce(O)
  const foldMapO = foldMap(O)
  const reduceRightO = reduceRight(O)
  return {
    URI,
    _E: undefined as any,
    reduce: (fa, b, f) => pipe(fa, reduceO(b, f)),
    foldMap: (M) => {
      const foldMapOM = foldMapO(M)
      return (fa, f) => pipe(fa, foldMapOM(f))
    },
    reduceRight: (fa, b, f) => pipe(fa, reduceRightO(b, f))
  }
}

/**
 * @category folding
 * @since 2.11.0
 */
export const reduceWithIndex = <K>(
  O: Ord<K>
): (<B, A>(b: B, f: (k: K, b: B, a: A) => B) => (m: ReadonlyMap<K, A>) => B) => {
  const keysO = keys(O)
  return (b, f) => (m) => {
    let out = b
    for (const k of keysO(m)) {
      out = f(k, out, m.get(k)!)
    }
    return out
  }
}

/**
 * @category folding
 * @since 2.11.0
 */
export const foldMapWithIndex = <K>(
  O: Ord<K>
): (<M>(M: Monoid<M>) => <A>(f: (k: K, a: A) => M) => (m: ReadonlyMap<K, A>) => M) => {
  const keysO = keys(O)
  return (M) => (f) => (m) => {
    let out = M.empty
    for (const k of keysO(m)) {
      out = M.concat(out, f(k, m.get(k)!))
    }
    return out
  }
}

/**
 * @category folding
 * @since 2.11.0
 */
export const reduceRightWithIndex = <K>(
  O: Ord<K>
): (<B, A>(b: B, f: (k: K, a: A, b: B) => B) => (m: ReadonlyMap<K, A>) => B) => {
  const keysO = keys(O)
  return (b, f) => (m) => {
    let out = b
    const ks = keysO(m)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, m.get(k)!, out)
    }
    return out
  }
}

/**
 * @category folding
 * @since 2.10.0
 */
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  const F = getFoldable(O)
  const reduceWithIndexO = reduceWithIndex(O)
  const foldMapWithIndexO = foldMapWithIndex(O)
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return {
    URI,
    _E: undefined as any,
    reduce: F.reduce,
    foldMap: F.foldMap,
    reduceRight: F.reduceRight,
    reduceWithIndex: (fa, b, f) => pipe(fa, reduceWithIndexO(b, f)),
    foldMapWithIndex: (M) => {
      const foldMapWithIndexOM = foldMapWithIndexO(M)
      return (fa, f) => pipe(fa, foldMapWithIndexOM(f))
    },
    reduceRightWithIndex: (fa, b, f) => pipe(fa, reduceRightWithIndexO(b, f))
  }
}

/**
 * @category traversing
 * @since 2.10.0
 */
export const getTraversable = <K>(O: Ord<K>): Traversable2C<URI, K> => {
  const TWI = getTraversableWithIndex(O)
  const F = getFoldable(O)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    reduce: F.reduce,
    foldMap: F.foldMap,
    reduceRight: F.reduceRight,
    traverse: TWI.traverse,
    sequence: TWI.sequence
  }
}

/**
 * @category traversing
 * @since 2.10.0
 */
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => {
  const FWI = getFoldableWithIndex(O)
  const keysO = keys(O)
  const traverseWithIndex = <F>(
    F: Applicative<F>
  ): (<A, B>(ta: ReadonlyMap<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, ReadonlyMap<K, B>>) => {
    return <A, B>(ta: ReadonlyMap<K, A>, f: (k: K, a: A) => HKT<F, B>) => {
      let fm: HKT<F, Map<K, B>> = F.of(new Map())
      const ks = keysO(ta)
      const len = ks.length
      for (let i = 0; i < len; i++) {
        const key = ks[i]
        const a = ta.get(key)!
        fm = F.ap(
          F.map(fm, (m) => (b: B) => m.set(key, b)),
          f(key, a)
        )
      }
      return fm
    }
  }
  const traverse = <F>(
    F: Applicative<F>
  ): (<A, B>(ta: ReadonlyMap<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, ReadonlyMap<K, B>>) => {
    const traverseWithIndexF = traverseWithIndex(F)
    return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
  }

  const sequence = <F>(F: Applicative<F>): (<A>(ta: ReadonlyMap<K, HKT<F, A>>) => HKT<F, ReadonlyMap<K, A>>) => {
    const traverseWithIndexF = traverseWithIndex(F)
    return (ta) => traverseWithIndexF(ta, SK)
  }
  return {
    URI,
    _E: undefined as any,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: FWI.reduce,
    foldMap: FWI.foldMap,
    reduceRight: FWI.reduceRight,
    reduceWithIndex: FWI.reduceWithIndex,
    foldMapWithIndex: FWI.foldMapWithIndex,
    reduceRightWithIndex: FWI.reduceRightWithIndex,
    traverse,
    sequence,
    traverseWithIndex
  }
}

/**
 * @category filtering
 * @since 2.5.0
 */
export function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K> {
  const TWI = getTraversableWithIndex(O)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    reduce: TWI.reduce,
    foldMap: TWI.foldMap,
    reduceRight: TWI.reduceRight,
    traverse: TWI.traverse,
    sequence: TWI.sequence,
    mapWithIndex: _mapWithIndex,
    reduceWithIndex: TWI.reduceWithIndex,
    foldMapWithIndex: TWI.foldMapWithIndex,
    reduceRightWithIndex: TWI.reduceRightWithIndex,
    traverseWithIndex: TWI.traverseWithIndex,
    wilt: wiltDefault(TWI, Compactable),
    wither: witherDefault(TWI, Compactable)
  }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const union = <K, A>(
  E: Eq<K>,
  M: Magma<A>
): ((second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupE = lookup(E)
  return (second) => (first) => {
    if (isEmpty(first)) {
      return second
    }
    if (isEmpty(second)) {
      return first
    }
    const out: Map<K, A> = new Map()
    const firstEntries = first.entries()
    let e: Next<readonly [K, A]>
    while (!(e = firstEntries.next()).done) {
      const [k, a] = e.value
      const oka = lookupE(k)(second)
      if (_.isSome(oka)) {
        out.set(k, M.concat(a, oka.value))
      } else {
        out.set(k, a)
      }
    }
    const secondEntries = second.entries()
    while (!(e = secondEntries.next()).done) {
      const [k, a] = e.value
      const oka = lookupE(k)(out)
      if (_.isNone(oka)) {
        out.set(k, a)
      }
    }
    return out
  }
}

/**
 * @since 2.11.0
 */
export const intersection = <K, A>(
  E: Eq<K>,
  M: Magma<A>
): ((second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupE = lookup(E)
  return (second) => (first) => {
    if (isEmpty(first) || isEmpty(second)) {
      return empty
    }
    const out: Map<K, A> = new Map()
    const entries = first.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const oka = lookupE(k)(second)
      if (_.isSome(oka)) {
        out.set(k, M.concat(a, oka.value))
      }
    }
    return out
  }
}

/**
 * @since 2.11.0
 */
export const difference = <K>(
  E: Eq<K>
): (<A>(_second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const memberE = member(E)
  return <A>(second: ReadonlyMap<K, A>) =>
    (first: ReadonlyMap<K, A>) => {
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const out: Map<K, A> = new Map()
      const firstEntries = first.entries()
      let e: Next<readonly [K, A]>
      while (!(e = firstEntries.next()).done) {
        const [k, a] = e.value
        if (!memberE(k)(second)) {
          out.set(k, a)
        }
      }
      const secondEntries = second.entries()
      while (!(e = secondEntries.next()).done) {
        const [k, a] = e.value
        if (!memberE(k)(first)) {
          out.set(k, a)
        }
      }
      return out
    }
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 @category zone of death
 * @since 2.5.0
 * @deprecated
 */
export const insertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> = upsertAt

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RM.Functor` instead of `RM.readonlyMap`
 * (where `RM` is from `import RM from 'fp-ts/ReadonlyMap'`)
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
export const readonlyMap: Filterable2<URI> = {
  URI,
  map: _map,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap
}
