/**
 * @since 2.5.0
 */
import { Applicative } from './Applicative'
import { Compactable2 } from './Compactable'
import { Either, isLeft } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3 } from './Foldable'
import { FoldableWithIndex2C } from './FoldableWithIndex'
import { pipe, Predicate, Refinement } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { FunctorWithIndex2C } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
import { Show } from './Show'
import { Traversable2C } from './Traversable'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable2C } from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Option = O.Option

/**
 * @category constructors
 * @since 2.5.0
 */
export function fromMap<K, A>(m: Map<K, A>): ReadonlyMap<K, A> {
  return new Map(m)
}

/**
 * @category destructors
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
 * @since 2.5.0
 */
export function size<K, A>(d: ReadonlyMap<K, A>): number {
  return d.size
}

/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
export function isEmpty<K, A>(d: ReadonlyMap<K, A>): boolean {
  return d.size === 0
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
export function member<K>(
  E: Eq<K>
): {
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
    return O.isSome(lookupE(k, m))
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
export function elem<A>(
  E: Eq<A>
): {
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
    // tslint:disable-next-line: strict-boolean-expressions
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
 * @since 2.5.0
 */
export function keys<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<K> {
  return (m) => Array.from(m.keys()).sort(O.compare)
}

/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
export function values<A>(O: Ord<A>): <K>(m: ReadonlyMap<K, A>) => ReadonlyArray<A> {
  return (m) => Array.from(m.values()).sort(O.compare)
}

/**
 * @since 2.5.0
 */
export function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B> {
  const keysO = keys(O)
  return <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>): ReadonlyArray<B> => {
    // tslint:disable-next-line: readonly-array
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
 * @category destructors
 * @since 2.5.0
 */
export function toReadonlyArray<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]> {
  return collect(O)((k, a) => [k, a] as const)
}

/**
 * Unfolds a map into a list of key/value pairs
 *
 * @category destructors
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
  const toArrayO = toReadonlyArray(ord)
  return (d) => {
    const kas = toArrayO(d)
    const len = kas.length
    return U.unfold(0, (b) => (b < len ? O.some([kas[b], b + 1]) : O.none))
  }
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @category combinators
 * @since 2.5.0
 */
export function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (O.isNone(found)) {
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
 * @category combinators
 * @since 2.5.0
 */
export function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (O.isSome(found)) {
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
export function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (O.isNone(found)) {
      return O.none
    }
    const r = new Map(m)
    r.set(found.value[0], a)
    return O.some(r)
  }
}

/**
 * @since 2.5.0
 */
export function modifyAt<K>(
  E: Eq<K>
): <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>> {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, f) => (m) => {
    const found = lookupWithKeyE(k, m)
    if (O.isNone(found)) {
      return O.none
    }
    const r = new Map(m)
    r.set(found.value[0], f(found.value[1]))
    return O.some(r)
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
export function lookupWithKey<K>(
  E: Eq<K>
): {
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
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [ka, a] = e.value
      if (E.equals(ka, k)) {
        return O.some([ka, a])
      }
    }
    return O.none
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
export function lookup<K>(
  E: Eq<K>
): {
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
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const d2OptA = lookupWithKeyS(k, that)
      if (O.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 2.5.0
 */
export const empty: ReadonlyMap<never, never> = new Map<never, never>()

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
      if (mx === empty) {
        return my
      }
      if (my === empty) {
        return mx
      }
      const r = new Map(mx)
      const entries = my.entries()
      let e: Next<readonly [K, A]>
      // tslint:disable-next-line: strict-boolean-expressions
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const mxOptA = lookupWithKeyS(k, mx)
        if (O.isSome(mxOptA)) {
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
export function singleton<K, A>(k: K, a: A): ReadonlyMap<K, A> {
  return new Map([[k, a]])
}

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
      if (O.isSome(bOpt)) {
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
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [key, a] = e.value
    m.set(key, f(key, a))
  }
  return m
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const partitionMapWithIndex = <K, A, B, C>(f: (k: K, a: A) => Either<B, C>) => (
  fa: ReadonlyMap<K, A>
): Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>> => {
  const left = new Map<K, B>()
  const right = new Map<K, C>()
  const entries = fa.entries()
  let e: Next<readonly [K, A]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    const ei = f(k, a)
    if (isLeft(ei)) {
      left.set(k, ei.left)
    } else {
      right.set(k, ei.right)
    }
  }
  return separated(left, right)
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const partitionWithIndex = <K, A>(p: (k: K, a: A) => boolean) => (
  fa: ReadonlyMap<K, A>
): Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>> => {
  const left = new Map<K, A>()
  const right = new Map<K, A>()
  const entries = fa.entries()
  let e: Next<readonly [K, A]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    if (p(k, a)) {
      right.set(k, a)
    } else {
      left.set(k, a)
    }
  }
  return separated(left, right)
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const filterMapWithIndex = <K, A, B>(f: (k: K, a: A) => Option<B>) => (
  fa: ReadonlyMap<K, A>
): ReadonlyMap<K, B> => {
  const m = new Map<K, B>()
  const entries = fa.entries()
  let e: Next<readonly [K, A]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    const o = f(k, a)
    if (O.isSome(o)) {
      m.set(k, o.value)
    }
  }
  return m
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const filterWithIndex = <K, A>(p: (k: K, a: A) => boolean) => (m: ReadonlyMap<K, A>): ReadonlyMap<K, A> => {
  const out = new Map<K, A>()
  const entries = m.entries()
  let e: Next<readonly [K, A]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, a] = e.value
    if (p(k, a)) {
      out.set(k, a)
    }
  }
  return out
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Compactable
 * @since 2.5.0
 */
export const compact = <K, A>(fa: ReadonlyMap<K, Option<A>>): ReadonlyMap<K, A> => {
  const m = new Map<K, A>()
  const entries = fa.entries()
  let e: Next<readonly [K, Option<A>]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, oa] = e.value
    if (O.isSome(oa)) {
      m.set(k, oa.value)
    }
  }
  return m
}

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
} = <A>(predicate: Predicate<A>) => <K>(fa: ReadonlyMap<K, A>) => _filter(fa, predicate)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) => (
  fa
) => _filterMap(fa, f)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) => (fa) => _map(fa, f)

/**
 * @category FunctorWithIndex
 * @since 2.7.1
 */
export const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) => (
  fa
) => _mapWithIndex(fa, f)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(
    fa: ReadonlyMap<K, A>
  ) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
} = <A>(predicate: Predicate<A>) => <K>(fa: ReadonlyMap<K, A>) => _partition(fa, predicate)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>> = (f) => (fa) => _partitionMap(fa, f)

/**
 * @category Compactable
 * @since 2.5.0
 */
export const separate = <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
): Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>> => {
  const left = new Map<K, A>()
  const right = new Map<K, B>()
  const entries = fa.entries()
  let e: Next<readonly [K, Either<A, B>]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, ei] = e.value
    if (isLeft(ei)) {
      left.set(k, ei.left)
    } else {
      right.set(k, ei.right)
    }
  }
  return separated(left, right)
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyMap'

/**
 * @category instances
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

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
 * @category instances
 * @since 2.10.0
 */
export const getFoldable = <K>(O: Ord<K>): Foldable2C<URI, K> => {
  const FWI = getFoldableWithIndex(O)
  return {
    URI,
    _E: undefined as any,
    reduce: FWI.reduce,
    foldMap: FWI.foldMap,
    reduceRight: FWI.reduceRight
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  const keysO = keys(O)

  const reduceWithIndex = <B, A>(fa: ReadonlyMap<K, A>, b: B, f: (k: K, b: B, a: A) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa.get(k)!)
    }
    return out
  }

  const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(fa: ReadonlyMap<K, A>, f: (k: K, a: A) => M): M => {
    let out: M = M.empty
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = M.concat(out, f(k, fa.get(k)!))
    }
    return out
  }

  const reduceRightWithIndex = <B, A>(fa: ReadonlyMap<K, A>, b: B, f: (k: K, a: A, b: B) => B): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, fa.get(k)!, out)
    }
    return out
  }

  return {
    URI,
    _E: undefined as any,
    reduce: (fa, b, f) => reduceWithIndex(fa, b, (_, b, a) => f(b, a)),
    foldMap: (M) => {
      const foldMapWithIndexM = foldMapWithIndex(M)
      return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
    },
    reduceRight: (fa, b, f) => reduceRightWithIndex(fa, b, (_, a, b) => f(a, b)),
    reduceWithIndex,
    foldMapWithIndex,
    reduceRightWithIndex
  }
}

/**
 * @category instances
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
 * @category instances
 * @since 2.10.0
 */
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => {
  const FWI = getFoldableWithIndex(O)
  const keysO = keys(O)
  const traverseWithIndex = <F>(
    F: Applicative<F>
  ): (<A, B>(ta: ReadonlyMap<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, ReadonlyMap<K, B>>) => {
    return <A, B>(ta: ReadonlyMap<K, A>, f: (k: K, a: A) => HKT<F, B>) => {
      let fm: HKT<F, ReadonlyMap<K, B>> = F.of(empty)
      const ks = keysO(ta)
      const len = ks.length
      for (let i = 0; i < len; i++) {
        const key = ks[i]
        const a = ta.get(key)!
        fm = F.ap(
          F.map(fm, (m) => (b: B) => new Map(m).set(key, b)),
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
    return (ta) => traverseWithIndexF(ta, (_, a) => a)
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
 * @category instances
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
    wilt: <F>(
      F: Applicative<F>
    ): (<A, B, C>(
      wa: ReadonlyMap<K, A>,
      f: (a: A) => HKT<F, Either<B, C>>
    ) => HKT<F, Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>>) => {
      const traverseF = TWI.traverse(F)
      return (wa, f) => F.map(traverseF(wa, f), separate)
    },
    wither: <F>(
      F: Applicative<F>
    ): (<A, B>(wa: ReadonlyMap<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, ReadonlyMap<K, B>>) => {
      const traverseF = TWI.traverse(F)
      return (wa, f) => F.map(traverseF(wa, f), compact)
    }
  }
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
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
