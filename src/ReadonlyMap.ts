/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Compactable2 } from './Compactable'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import { Eq, fromEquals } from './Eq'
import type { Filterable2 } from './Filterable'
import type { FilterableWithIndex2C } from './FilterableWithIndex'
import type { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3, Foldable4 } from './Foldable'
import type { FoldableWithIndex2C } from './FoldableWithIndex'
import { flow, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import type { FunctorWithIndex2C } from './FunctorWithIndex'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import type { Magma } from './Magma'
import type { Monoid } from './Monoid'
import * as O from './Option'
import type { Ord } from './Ord'
import { Predicate } from './Predicate'
import type { Semigroup } from './Semigroup'
import { separated, Separated } from './Separated'
import type { Show } from './Show'
import type { Traversable2C } from './Traversable'
import type { TraversableWithIndex2C } from './TraversableWithIndex'
import { snd } from './Tuple2'
import type { Unfoldable, Unfoldable1 } from './Unfoldable'
import { wiltDefault, Witherable2C, witherDefault } from './Witherable'

import Option = O.Option

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
 * Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.
 *
 * @category constructors
 * @since 3.0.0
 */
export function fromFoldable<F extends URIS4>(
  F: Foldable4<F>
): <K, B>(
  E: Eq<K>,
  M: Magma<B>
) => <A>(f: (a: A) => readonly [K, B]) => <S, R, E>(fka: Kind4<F, S, R, E, A>) => ReadonlyMap<K, B>
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K, B>(
  E: Eq<K>,
  M: Magma<B>
) => <A>(f: (a: A) => readonly [K, B]) => <R, E>(fka: Kind3<F, R, E, A>) => ReadonlyMap<K, B>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K, B>(E: Eq<K>, M: Magma<B>) => <A>(f: (a: A) => readonly [K, B]) => <E>(fka: Kind2<F, E, A>) => ReadonlyMap<K, B>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K, B>(E: Eq<K>, M: Magma<B>) => <A>(f: (a: A) => readonly [K, B]) => (fka: Kind<F, A>) => ReadonlyMap<K, B>
export function fromFoldable<F>(
  F: Foldable<F>
): <K, B>(E: Eq<K>, M: Magma<B>) => <A>(f: (a: A) => readonly [K, B]) => (fka: HKT<F, A>) => ReadonlyMap<K, B>
export function fromFoldable<F>(
  F: Foldable<F>
): <K, B>(E: Eq<K>, M: Magma<B>) => <A>(f: (a: A) => readonly [K, B]) => (fka: HKT<F, A>) => ReadonlyMap<K, B> {
  return <K, B>(E: Eq<K>, M: Magma<B>) => {
    const lookupWithKeyE = lookupWithKey(E)
    return <A>(f: (a: A) => readonly [K, B]) =>
      F.reduce<Map<K, B>, A>(new Map<K, B>(), (out, a) => {
        const [k, b] = f(a)
        const oka = lookupWithKeyE(k)(out)
        if (_.isSome(oka)) {
          out.set(oka.value[0], M.concat(b)(oka.value[1]))
        } else {
          out.set(k, b)
        }
        return out
      })
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
    return (m) => (memberEk(m) ? _.none : _.some(upsertAtEka(m)))
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
}

/**
 * Delete the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const deleteAt = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const popE = pop(E)
  return (k) => flow(popE(k), O.map(snd))
}

/**
 * Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`,
 * or returning `None` if the key doesn't exist.
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
  while (!(e = entries.next()).done) {
    const [k, oa] = e.value
    if (_.isSome(oa)) {
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
export function filterWithIndex<K, A, B extends A>(
  predicateWithIndex: (k: K, a: A) => a is B
): (m: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
export function filterWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
export function filterWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => ReadonlyMap<K, B> {
  return <B extends A>(m: ReadonlyMap<K, B>) => {
    const out = new Map<K, B>()
    const entries = m.entries()
    let e: Next<readonly [K, B]>
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [k, b] = e.value
      if (predicateWithIndex(k, b)) {
        out.set(k, b)
      }
    }
    return out
  }
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
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionWithIndex<K, A, B extends A>(
  predicateWithIndex: (k: K, a: A) => a is B
): (m: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
export function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>>
export function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(m: ReadonlyMap<K, B>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>> {
  return <B extends A>(m: ReadonlyMap<K, B>) => {
    const left = new Map<K, B>()
    const right = new Map<K, B>()
    const entries = m.entries()
    let e: Next<readonly [K, B]>
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
      const [k, b] = e.value
      if (predicateWithIndex(k, b)) {
        right.set(k, b)
      } else {
        left.set(k, b)
      }
    }
    return separated(left, right)
  }
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
    const entries: Array<string> = []
    m.forEach((a, k) => {
      entries.push(`[${SK.show(k)}, ${SA.show(a)}]`)
    })
    return `new Map([${entries.sort().join(', ')}])`
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <K, A>(EK: Eq<K>, EA: Eq<A>): Eq<ReadonlyMap<K, A>> => {
  const isSubmapSKSA = isSubmap(EK, EA)
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
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const r = new Map(first)
      const entries = second.entries()
      let e: Next<readonly [K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const oka = lookupWithKeyS(k)(first)
        if (_.isSome(oka)) {
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctorWithIndex = <K = never>(): FunctorWithIndex2C<URI, K, K> => ({
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
 * @since 3.0.0
 */
export const reduce = <K>(O: Ord<K>): Foldable2C<URI, K>['reduce'] => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (b, f) => reduceWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @since 3.0.0
 */
export const foldMap = <K>(O: Ord<K>): Foldable2C<URI, K>['foldMap'] => {
  const foldMapWithIndexO = foldMapWithIndex(O)
  return (M) => {
    const foldMapWithIndexOM = foldMapWithIndexO(M)
    return (f) => foldMapWithIndexOM((_, a) => f(a))
  }
}

/**
 * @since 3.0.0
 */
export const reduceRight = <K>(O: Ord<K>): Foldable2C<URI, K>['reduceRight'] => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (b, f) => reduceRightWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = <K>(O: Ord<K>): Foldable2C<URI, K> => {
  return {
    reduce: reduce(O),
    foldMap: foldMap(O),
    reduceRight: reduceRight(O)
  }
}

/**
 * @since 3.0.0
 */
export const reduceWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K>['reduceWithIndex'] => {
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
 * @since 3.0.0
 */
export const foldMapWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K>['foldMapWithIndex'] => {
  const keysO = keys(O)
  return (M) => (f) => (m) => {
    let out = M.empty
    for (const k of keysO(m)) {
      out = M.concat(f(k, m.get(k)!))(out)
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const reduceRightWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K>['reduceRightWithIndex'] => {
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
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex2C<URI, K, K> => {
  return {
    reduceWithIndex: reduceWithIndex(O),
    foldMapWithIndex: foldMapWithIndex(O),
    reduceRightWithIndex: reduceRightWithIndex(O)
  }
}

/**
 * @since 3.0.0
 */
export const traverse = <K>(O: Ord<K>): Traversable2C<URI, K>['traverse'] => {
  const traverseWithIndexO = traverseWithIndex(O)
  return <F>(F: Applicative<F>) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return <A, B>(f: (a: A) => HKT<F, B>) => traverseWithIndexOF<A, B>((_, a) => f(a))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = <K>(O: Ord<K>): Traversable2C<URI, K> => {
  return {
    map,
    traverse: traverse(O)
  }
}

/**
 * @since 3.0.0
 */
export const traverseWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K>['traverseWithIndex'] => {
  const keysO = keys(O)
  return <F>(F: Applicative<F>) => <A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyMap<K, A>) => {
    let fm: HKT<F, Map<K, B>> = F.of(new Map())
    for (const k of keysO(ta)) {
      const a = ta.get(k)!
      fm = pipe(
        fm,
        F.map((m) => (b: B) => m.set(k, b)),
        F.ap(f(k, a))
      )
    }
    return fm
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => {
  return {
    traverseWithIndex: traverseWithIndex(O)
  }
}

/**
 * @since 3.0.0
 */
export const wither = <K>(O: Ord<K>): Witherable2C<URI, K>['wither'] => {
  return witherDefault(getTraversable(O), Compactable)
}

/**
 * @since 3.0.0
 */
export const wilt = <K>(O: Ord<K>): Witherable2C<URI, K>['wilt'] => {
  return wiltDefault(getTraversable(O), Compactable)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => {
  return {
    wither: wither(O),
    wilt: wilt(O)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => ({
  concat: union(E, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <K, A>(E: Eq<K>, S: Semigroup<A>): Monoid<ReadonlyMap<K, A>> => ({
  concat: getUnionSemigroup(E, S).concat,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => ({
  concat: intersection(E, S)
})

/**
 * @category combinator
 * @since 3.0.0
 */
export const getDifferenceMagma = <K>(E: Eq<K>) => <A>(): Magma<ReadonlyMap<K, A>> => ({
  concat: difference(E)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const size = (d: ReadonlyMap<unknown, unknown>): number => d.size

/**
 * Test whether or not a `ReadonlyMap` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = (d: ReadonlyMap<unknown, unknown>): boolean => d.size === 0

/**
 * Test whether or not a key exists in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const member = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => boolean) => {
  const lookupE = lookup(E)
  return (k) => {
    const lookupEk = lookupE(k)
    return (m) => _.isSome(lookupEk(m))
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
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      if (predicate(k)) {
        return _.some([k, a])
      }
    }
    return _.none
  }
}

/**
 * Lookup the value for a key in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const lookup = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => Option<A>) => {
  const lookupWithKeyE = lookupWithKey(E)
  return (k) => flow(lookupWithKeyE(k), O.map(snd))
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
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const oka = lookupWithKeyS(k)(second)
      if (_.isNone(oka) || !EK.equals(oka.value[0])(k) || !SA.equals(oka.value[1])(a)) {
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
 * Unfolds a `ReadonlyMap` into a data structure of key/value pairs.
 *
 * @since 3.0.0
 */
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K>(o: Ord<K>) => <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<F>(
  U: Unfoldable<F>
): <K>(o: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
export function toUnfoldable<F>(
  U: Unfoldable<F>
): <K>(o: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]> {
  return (o) => {
    const toReadonlyArrayO = toReadonlyArray(o)
    return (m) => {
      const arr = toReadonlyArrayO(m)
      const len = arr.length
      return U.unfold(0, (b) => (b < len ? _.some([arr[b], b + 1]) : _.none))
    }
  }
}

/**
 * @since 3.0.0
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
        out.set(k, M.concat(oka.value)(a))
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
 * @since 3.0.0
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
        out.set(k, M.concat(oka.value)(a))
      }
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const difference = <K>(
  E: Eq<K>
): (<A>(_second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const memberE = member(E)
  return <A>(second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => {
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
