/**
 * @since 3.0.0
 */
import { Applicative } from './Applicative'
import { Compactable2 } from './Compactable'
import { Either, isLeft } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable2 } from './Filterable'
import { FilterableWithIndex2C } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3 } from './Foldable'
import { FoldableWithIndex2C } from './FoldableWithIndex'
import { Endomorphism, flow, pipe, Predicate } from './function'
import { Functor2 } from './Functor'
import { FunctorWithIndex2C } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import { snd } from './Tuple2'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable2C } from './Traversable'
import { TraversableWithIndex2C } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable2C } from './Witherable'

import Option = O.Option
import { separated, Separated } from './Separated'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Create a `ReadonlyMap` from one key/value pair.
 *
 * @category constructors
 * @since 3.0.0
 */
export const singleton = <K, A>(k: K, a: A): ReadonlyMap<K, A> => new Map([[k, a]])

/**
 * Create a `ReadonlyMap` from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @category constructors
 * @since 3.0.0
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
    return pipe(
      fka,
      F.reduce<Map<K, A>, readonly [K, A]>(new Map<K, A>(), (b, [k, a]) => {
        const oka = lookupWithKeyE(k)(b)
        if (O.isSome(oka)) {
          b.set(oka.value[0], M.concat(a)(oka.value[1]))
        } else {
          b.set(k, a)
        }
        return b
      })
    )
  }
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Insert an element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key already exists.
 *
 * @category combinators
 * @since 3.0.0
 */
export const insertAt = <K>(E: Eq<K>): (<A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const memberE = member(E)
  const upsertAtE = upsertAt(E)
  return (k, a) => {
    const memberEk = memberE(k)
    const upsertAtEka = upsertAtE(k, a)
    return (m) => (memberEk(m) ? O.none : O.some(upsertAtEka(m)))
  }
}

/**
 * Insert or replace a key/value pair in a `ReadonlyMap`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const upsertAt = <K>(E: Eq<K>): (<A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, a) => {
    const lookupWithKeyEk = lookupWithKeyE(k)
    return (m) => {
      const found = lookupWithKeyEk(m)
      if (O.isNone(found)) {
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
 * Change the element at the specified keys, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const updateAt = <K>(E: Eq<K>): (<A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const modifyAtE = modifyAt(E)
  return (k, a) => modifyAtE(k, () => a)
}

/**
 * Apply a function to the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.
 *
 * @since 3.0.0
 */
export const modifyAt = <K>(
  E: Eq<K>
): (<A>(k: K, f: Endomorphism<A>) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k, f) => {
    const lookupWithKeyEk = lookupWithKeyE(k)
    return (m) => {
      const found = lookupWithKeyEk(m)
      if (O.isNone(found)) {
        return O.none
      }
      const r = new Map(m)
      r.set(found.value[0], f(found.value[1]))
      return O.some(r)
    }
  }
}

/**
 * Delete the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const deleteAt = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const popE = pop(E)
  return (k) => {
    const popEk = popE(k)
    return (m) =>
      pipe(
        popEk(m),
        O.map(snd),
        O.getOrElse(() => m)
      )
  }
}

/**
 * Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const pop = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k) => {
    const lookupWithKeyEk = lookupWithKeyE(k)
    return (m) => {
      const found = lookupWithKeyEk(m)
      return pipe(
        found,
        O.map(([k, a]) => {
          const out = new Map(m)
          out.delete(k)
          return [a, out]
        })
      )
    }
  }
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex = <K, A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>): ReadonlyMap<K, B> => {
  const out = new Map<K, B>()
  const entries = m.entries()
  let e: Next<readonly [K, A]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [key, a] = e.value
    out.set(key, f(key, a))
  }
  return out
}

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: Compactable2<URI>['compact'] = <K, A>(m: ReadonlyMap<K, Option<A>>): ReadonlyMap<K, A> => {
  const out = new Map<K, A>()
  const entries = m.entries()
  let e: Next<readonly [K, Option<A>]>
  // tslint:disable-next-line: strict-boolean-expressions
  while (!(e = entries.next()).done) {
    const [k, oa] = e.value
    if (O.isSome(oa)) {
      out.set(k, oa.value)
    }
  }
  return out
}

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable2<URI>['separate'] = <K, A, B>(
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

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: Filterable2<URI>['filter'] = <A>(predicate: Predicate<A>) => <K>(fa: ReadonlyMap<K, A>) =>
  pipe(
    fa,
    filterWithIndex((_, a) => predicate(a))
  )

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: Filterable2<URI>['filterMap'] = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: Filterable2<URI>['partition'] = <A>(predicate: Predicate<A>) => <K>(fa: ReadonlyMap<K, A>) =>
  pipe(
    fa,
    partitionWithIndex((_, a) => predicate(a))
  )

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable2<URI>['partitionMap'] = (f) => partitionMapWithIndex((_, a) => f(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
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

/**
 * @category FilterableWithIndex
 * @since 3.0.0
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
 * @category FilterableWithIndex
 * @since 3.0.0
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
 * @category FilterableWithIndex
 * @since 3.0.0
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

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReadonlyMap'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReadonlyMap: ReadonlyMap<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>> => ({
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
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <K, A>(EK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>> => {
  const isSubmapSKSA = isSubmap(EK, SA)
  return fromEquals((second) => (first) => isSubmapSKSA(first)(second) && isSubmapSKSA(second)(first))
}

/**
 * Get a `Monoid` instance for `ReadonlyMap` given a `Semigroup` instance for its values.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <K, A>(EK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>> => {
  const lookupWithKeyS = lookupWithKey(EK)
  return {
    concat: (second) => (first) => {
      if (first === empty) {
        return second
      }
      if (second === empty) {
        return first
      }
      const r = new Map(first)
      const entries = second.entries()
      let e: Next<readonly [K, A]>
      // tslint:disable-next-line: strict-boolean-expressions
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const oka = lookupWithKeyS(k)(first)
        if (O.isSome(oka)) {
          r.set(oka.value[0], SA.concat(a)(oka.value[1]))
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
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctorWithIndex = <K = never>(): FunctorWithIndex2C<URI, K, K> => ({
  map,
  mapWithIndex
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable2<URI> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable2<URI> = {
  partitionMap,
  partition,
  filterMap,
  filter
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterableWithIndex = <K = never>(): FilterableWithIndex2C<URI, K, K> => ({
  filterWithIndex,
  filterMapWithIndex,
  partitionWithIndex,
  partitionMapWithIndex
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = <K>(O: Ord<K>): Foldable2C<URI, K> => {
  const FWI = getFoldableWithIndex(O)
  return {
    reduce: (b, f) => FWI.reduceWithIndex(b, (_, b, a) => f(b, a)),
    foldMap: (M) => {
      const foldMapWithIndexM = FWI.foldMapWithIndex(M)
      return (f) => foldMapWithIndexM((_, a) => f(a))
    },
    reduceRight: (b, f) => FWI.reduceRightWithIndex(b, (_, a, b) => f(a, b))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  const keysO = keys(O)

  const reduceWithIndex = <B, A>(b: B, f: (k: K, b: B, a: A) => B) => (fa: ReadonlyMap<K, A>): B => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa.get(k)!)
    }
    return out
  }

  const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(f: (k: K, a: A) => M) => (fa: ReadonlyMap<K, A>): M => {
    let out: M = M.empty
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = M.concat(f(k, fa.get(k)!))(out)
    }
    return out
  }

  const reduceRightWithIndex = <B, A>(b: B, f: (k: K, a: A, b: B) => B) => (fa: ReadonlyMap<K, A>): B => {
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
    reduceWithIndex,
    foldMapWithIndex,
    reduceRightWithIndex
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = <K>(O: Ord<K>): Traversable2C<URI, K> => {
  const TWI = getTraversableWithIndex(O)

  const traverse = <F>(
    F: Applicative<F>
  ): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyMap<K, A>) => HKT<F, ReadonlyMap<K, B>>) => {
    const traverseWithIndexF = TWI.traverseWithIndex(F)
    return (f) => traverseWithIndexF((_, a) => f(a))
  }

  const sequence = <F>(F: Applicative<F>): (<A>(ta: ReadonlyMap<K, HKT<F, A>>) => HKT<F, ReadonlyMap<K, A>>) => {
    return TWI.traverseWithIndex(F)((_, a) => a)
  }

  return {
    map,
    traverse,
    sequence
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => {
  const keysO = keys(O)
  const traverseWithIndex = <F>(F: Applicative<F>) => <A, B>(f: (k: K, a: A) => HKT<F, B>) => (
    ta: ReadonlyMap<K, A>
  ): HKT<F, ReadonlyMap<K, B>> => {
    let fm: HKT<F, ReadonlyMap<K, B>> = F.of(empty)
    const ks = keysO(ta)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const key = ks[i]
      const a = ta.get(key)!
      fm = pipe(
        fm,
        F.map((m) => (b: B) => new Map(m).set(key, b)),
        F.ap(f(key, a))
      )
    }
    return fm
  }
  return {
    traverseWithIndex
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => {
  const T = getTraversable(O)

  return {
    wilt: <F>(
      F: Applicative<F>
    ): (<A, B, C>(
      f: (a: A) => HKT<F, Either<B, C>>
    ) => (wa: ReadonlyMap<K, A>) => HKT<F, Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>>) => {
      const traverseF = T.traverse(F)
      return (f) => flow(traverseF(f), F.map(separate))
    },
    wither: <F>(
      F: Applicative<F>
    ): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (wa: ReadonlyMap<K, A>) => HKT<F, ReadonlyMap<K, B>>) => {
      const traverseF = T.traverse(F)
      return (f) => flow(traverseF(f), F.map(compact))
    }
  }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const size = <K, A>(d: ReadonlyMap<K, A>): number => d.size

/**
 * Test whether or not a `ReadonlyMap` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = <K, A>(d: ReadonlyMap<K, A>): boolean => d.size === 0

/**
 * Test whether or not a key exists in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const member = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => boolean) => {
  const lookupE = lookup(E)
  return (k) => {
    const lookupEk = lookupE(k)
    return (m) => O.isSome(lookupEk(m))
  }
}

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

/**
 * Tests whether a value is a member of a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A): (<K>(m: ReadonlyMap<K, A>) => boolean) => {
  const predicate = E.equals(a)
  return (m) => {
    const values = m.values()
    let e: Next<A>
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = values.next()).done) {
      const v = e.value
      if (predicate(v)) {
        return true
      }
    }
    return false
  }
}

/**
 * Get a sorted `ReadonlyArray` of the keys contained in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const keys = <K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>): ReadonlyArray<K> =>
  Array.from(m.keys()).sort((first, second) => O.compare(second)(first))

/**
 * Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const values = <A>(O: Ord<A>) => <K>(m: ReadonlyMap<K, A>): ReadonlyArray<A> =>
  Array.from(m.values()).sort((first, second) => O.compare(second)(first))

/**
 * @since 3.0.0
 */
export const collect = <K>(O: Ord<K>): (<A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B>) => {
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
 * Lookup the value for a key in a `ReadonlyMap`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 3.0.0
 */
export const lookupWithKey = <K>(E: Eq<K>) => (k: K): (<A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>) => {
  const predicate = E.equals(k)
  return <A>(m: ReadonlyMap<K, A>) => {
    const entries = m.entries()
    let e: Next<readonly [K, A]>
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      if (predicate(k)) {
        return O.some([k, a])
      }
    }
    return O.none
  }
}

/**
 * Lookup the value for a key in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const lookup = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => Option<A>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k) => {
    const lookupWithKeyEk = lookupWithKeyE(k)
    return (m) => {
      return pipe(lookupWithKeyEk(m), O.map(snd))
    }
  }
}

/**
 * Test whether or not one `ReadonlyMap` contains all of the keys and values contained in another `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const isSubmap = <K, A>(
  EK: Eq<K>,
  SA: Eq<A>
): ((second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => boolean) => {
  const lookupWithKeyS = lookupWithKey(EK)
  return (second) => (first) => {
    const entries = first.entries()
    let e: Next<readonly [K, A]>
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const oka = lookupWithKeyS(k)(second)
      if (O.isNone(oka) || !EK.equals(oka.value[0])(k) || !SA.equals(oka.value[1])(a)) {
        return false
      }
    }
    return true
  }
}

/**
 * An empty `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyMap<never, never> = new Map<never, never>()

/**
 * Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const toReadonlyArray = <K>(O: Ord<K>): (<A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]>) =>
  collect(O)((k, a) => [k, a] as const)

/**
 * Unfolds a `ReadonlyMap` into a list of key/value pairs.
 *
 * @since 3.0.0
 */
export function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
export function toUnfoldable<K, F>(
  ord: Ord<K>,
  U: Unfoldable<F>
): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]> {
  const toReadonlyArrayO = toReadonlyArray(ord)
  return (d) => {
    const arr = toReadonlyArrayO(d)
    const len = arr.length
    return U.unfold(0, (b) => (b < len ? O.some([arr[b], b + 1]) : O.none))
  }
}
