/**
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type * as compactable from '@fp-ts/core/Compactable'
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import * as filterable from '@fp-ts/core/Filterable'
import * as filterableWithIndex from '@fp-ts/core/FilterableWithIndex'
import type * as foldable from '@fp-ts/core/Foldable'
import type { FoldableWithIndex } from '@fp-ts/core/FoldableWithIndex'
import { flow, identity, pipe } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { FunctorWithIndex } from '@fp-ts/core/FunctorWithIndex'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as interable from '@fp-ts/core/Iterable'
import type { Magma } from '@fp-ts/core/Magma'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { Option } from '@fp-ts/core/Option'
import * as option from '@fp-ts/core/Option'
import type { Ord } from '@fp-ts/core/Ord'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Show } from '@fp-ts/core/Show'
import type { Traversable } from '@fp-ts/core/Traversable'
import * as traversableFilterable from '@fp-ts/core/TraversableFilterable'
import type { TraversableWithIndex } from '@fp-ts/core/TraversableWithIndex'
import type { Unfoldable } from '@fp-ts/core/Unfoldable'
import * as writer from '@fp-ts/core/Writer'

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlyMapTypeLambda extends TypeLambda {
  readonly type: ReadonlyMap<this['InOut1'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlyMapTypeLambdaFix<K> extends TypeLambda {
  readonly type: ReadonlyMap<K, this['Out1']>
}

/**
 * Create a `ReadonlyMap` from one key/value pair.
 *
 * @category constructors
 * @since 3.0.0
 */
export const singleton = <K, A>(k: K, a: A): ReadonlyMap<K, A> => new Map([[k, a]])

/**
 * Create a `ReadonlyMap` from a `Iterable` collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromIterable = <K, B>(E: Eq<K>, M: Magma<B>) => {
  const lookupWithKey_ = lookupWithKey(E)
  return <A>(f: (a: A) => readonly [K, B]): ((self: Iterable<A>) => ReadonlyMap<K, B>) =>
    interable.reduce<Map<K, B>, A>(new Map<K, B>(), (out, a) => {
      const [k, b] = f(a)
      const oka = lookupWithKey_(k)(out)
      if (_.isSome(oka)) {
        out.set(oka.value[0], M.combine(b)(oka.value[1]))
      } else {
        out.set(k, b)
      }
      return out
    })
}

/**
 * Insert an element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key already exists.
 *
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
 * @since 3.0.0
 */
export const deleteAt = <K>(E: Eq<K>): ((k: K) => <A>(m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>) => {
  const popE = pop(E)
  return (k) => flow(popE(k), option.map(writer.snd))
}

/**
 * Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`,
 * or returning `None` if the key doesn't exist.
 *
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
        option.map(([k, a]) => {
          const out = new Map(m)
          out.delete(k)
          return [a, out]
        })
      )
    }
  }
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) =>
  mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex = <K, A, B>(f: (k: K, a: A) => B) =>
  (m: ReadonlyMap<K, A>): ReadonlyMap<K, B> => {
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
 * @category filtering
 * @since 3.0.0
 */
export const compact = <K, A>(m: ReadonlyMap<K, Option<A>>): ReadonlyMap<K, A> => {
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
 * @category filtering
 * @since 3.0.0
 */
export const separate = <K, A, B>(
  fa: ReadonlyMap<K, Result<A, B>>
): readonly [ReadonlyMap<K, A>, ReadonlyMap<K, B>] => {
  const left = new Map<K, A>()
  const right = new Map<K, B>()
  const entries = fa.entries()
  let e: Next<readonly [K, Result<A, B>]>
  while (!(e = entries.next()).done) {
    const [k, ei] = e.value
    if (_.isFailure(ei)) {
      left.set(k, ei.failure)
    } else {
      right.set(k, ei.success)
    }
  }
  return [left, right]
}

/**
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (
  f
) => filterMapWithIndex((_, a) => f(a))

/**
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>] = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const filterMapWithIndex = <K, A, B>(f: (k: K, a: A) => Option<B>) =>
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
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionMapWithIndex = <K, A, B, C>(f: (k: K, a: A) => Result<B, C>) =>
  (fa: ReadonlyMap<K, A>): readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>] => {
    const left = new Map<K, B>()
    const right = new Map<K, C>()
    const entries = fa.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const ei = f(k, a)
      if (_.isFailure(ei)) {
        left.set(k, ei.failure)
      } else {
        right.set(k, ei.success)
      }
    }
    return [left, right]
  }

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <K, A>(SemigroupK: Show<K>, SemigroupA: Show<A>): Show<ReadonlyMap<K, A>> => ({
  show: (m) => {
    const entries: Array<string> = []
    m.forEach((a, k) => {
      entries.push(`[${SemigroupK.show(k)}, ${SemigroupA.show(a)}]`)
    })
    return `new Map([${entries.sort().join(', ')}])`
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <K, A>(EqK: Eq<K>, EqA: Eq<A>): Eq<ReadonlyMap<K, A>> => {
  const isSubmapSKSA = isSubmap(EqK, EqA)
  return eq.fromEquals((that) => (self) => isSubmapSKSA(self)(that) && isSubmapSKSA(that)(self))
}

/**
 * Get a `Monoid` instance for `ReadonlyMap` given a `Semigroup` instance for its values.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <K, A>(Eq: Eq<K>, Semigroup: Semigroup<A>): Monoid<ReadonlyMap<K, A>> => {
  const lookupWithKeyS = lookupWithKey(Eq)
  return {
    combine: (that) =>
      (self) => {
        if (isEmpty(self)) {
          return that
        }
        if (isEmpty(that)) {
          return self
        }
        const r = new Map(self)
        const entries = that.entries()
        let e: Next<readonly [K, A]>
        while (!(e = entries.next()).done) {
          const [k, a] = e.value
          const oka = lookupWithKeyS(k)(self)
          if (_.isSome(oka)) {
            r.set(oka.value[0], Semigroup.combine(a)(oka.value[1]))
          } else {
            r.set(k, a)
          }
        }
        return r
      },
    empty: empty()
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReadonlyMapTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <K, B>(fab: ReadonlyMap<K, (a: A) => B>) => ReadonlyMap<K, B> = functor
  .flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFunctorWithIndex = <K>(): FunctorWithIndex<ReadonlyMapTypeLambdaFix<K>, K> => ({
  mapWithIndex
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<ReadonlyMapTypeLambda> = {
  compact
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyMapTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <B extends A, A = B>(predicate: Predicate<A>): <K>(fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(
    fc: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <K>(
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterableWithIndex = <K>(): filterableWithIndex.FilterableWithIndex<
  ReadonlyMapTypeLambdaFix<K>,
  K
> => ({
  filterMapWithIndex,
  partitionMapWithIndex
})

const FilterableWithIndex_ = getFilterableWithIndex<any>()

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
} = filterableWithIndex.filterWithIndex(FilterableWithIndex_)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (
    fb: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
} = filterableWithIndex.partitionWithIndex(FilterableWithIndex_)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = <K>(O: Ord<K>): foldable.Foldable<ReadonlyMapTypeLambdaFix<K>> => {
  return {
    toIterable: collect(O)((_, a) => a)
  }
}

/**
 * @category folding
 * @since 3.0.0
 */
export const toEntries = <K>(O: Ord<K>) => {
  const keys_ = keys(O)
  return <A>(self: ReadonlyMap<K, A>): Iterable<readonly [K, A]> => {
    return {
      *[Symbol.iterator]() {
        for (const k of keys_(self)) {
          yield [k, self.get(k)!]
        }
      }
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex<ReadonlyMapTypeLambdaFix<K>, K> => {
  return {
    toEntries: toEntries(O)
  }
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>> = (O) => {
  const traverseWithIndexO = traverseWithIndex(O)
  return (F) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return (f) => traverseWithIndexOF((_, a) => f(a))
  }
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence = <K>(O: Ord<K>) => {
  const traverseO = traverse(O)
  return <F extends TypeLambda>(
    F: Applicative<F>
  ): (<S, R, O, E, A>(ta: ReadonlyMap<K, Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, ReadonlyMap<K, A>>) =>
    traverseO(F)(identity)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = <K>(O: Ord<K>): Traversable<ReadonlyMapTypeLambdaFix<K>> => {
  return {
    traverse: traverse(O)
  }
}

/**
 * @since 3.0.0
 */
export const traverseWithIndex: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (i: K, a: A) => Kind<F, S, R, O, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>> = <K>(O: Ord<K>) => {
  const keysO = keys(O)
  return <F extends TypeLambda>(F: Applicative<F>) =>
    <A, S, R, O, E, B>(f: (k: K, a: A) => Kind<F, S, R, O, E, B>) =>
      (ta: ReadonlyMap<K, A>) => {
        let fm: Kind<F, S, R, O, E, Map<K, B>> = F.of(new Map())
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
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex<ReadonlyMapTypeLambdaFix<K>, K> => {
  return {
    traverseWithIndex: traverseWithIndex(O)
  }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const traverseFilterMap = <K>(
  O: Ord<K>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, option.Option<B>>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>>) => {
  const C: compactable.Compactable<ReadonlyMapTypeLambdaFix<K>> = { compact }
  return traversableFilterable.traverseFilterMap(getTraversable(O), C)
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartitionMap = <K>(
  O: Ord<K>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (wa: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>]>) => {
  const C: compactable.Compactable<ReadonlyMapTypeLambdaFix<K>> = { compact }
  const F: functor.Functor<ReadonlyMapTypeLambdaFix<K>> = { map }
  return traversableFilterable.traversePartitionMap(getTraversable(O), F, C)
}

// TODO: traverseFilter, traversePartition

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableFilterable = <K>(
  O: Ord<K>
): traversableFilterable.TraversableFilterable<ReadonlyMapTypeLambdaFix<K>> => {
  return {
    traverseFilterMap: traverseFilterMap(O),
    traversePartitionMap: traversePartitionMap(O)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => ({
  combine: union(E, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <K, A>(E: Eq<K>, S: Semigroup<A>): Monoid<ReadonlyMap<K, A>> => ({
  combine: getUnionSemigroup(E, S).combine,
  empty: empty()
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => ({
  combine: intersection(E, S)
})

/**
 * @since 3.0.0
 */
export const getDifferenceMagma = <K>(E: Eq<K>) =>
  <A>(): Magma<ReadonlyMap<K, A>> => ({
    combine: difference(E)
  })

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
export const elem = <A>(E: Eq<A>) =>
  (a: A): (<K>(m: ReadonlyMap<K, A>) => boolean) => {
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
 * @category conversions
 * @since 3.0.0
 */
export const keys = <K>(O: Ord<K>) =>
  <A>(m: ReadonlyMap<K, A>): ReadonlyArray<K> => Array.from(m.keys()).sort((self, that) => O.compare(that)(self))

// TODO: this lookes weird, should require an `Ord<K>`
/**
 * Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.
 *
 * @category conversions
 * @since 3.0.0
 */
export const values = <A>(O: Ord<A>) =>
  <K>(m: ReadonlyMap<K, A>): ReadonlyArray<A> => Array.from(m.values()).sort((self, that) => O.compare(that)(self))

/**
 * @category conversions
 * @since 3.0.0
 */
export const collect = <K>(O: Ord<K>): (<A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B>) => {
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
 * Lookup the value for a key in a `ReadonlyMap`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 3.0.0
 */
export const lookupWithKey = <K>(E: Eq<K>) =>
  (k: K): (<A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>) => {
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
  return (k) => flow(lookupWithKeyE(k), option.map(writer.snd))
}

/**
 * Test whether or not one `ReadonlyMap` contains all of the keys and values contained in another `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const isSubmap = <K, A>(
  EK: Eq<K>,
  SA: Eq<A>
): ((that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => boolean) => {
  const lookupWithKeyS = lookupWithKey(EK)
  return (that) =>
    (self) => {
      const entries = self.entries()
      let e: Next<readonly [K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const oka = lookupWithKeyS(k)(that)
        if (_.isNone(oka) || !EK.equals(oka.value[0])(k) || !SA.equals(oka.value[1])(a)) {
          return false
        }
      }
      return true
    }
}

/**
 * @since 3.0.0
 */
export const empty: <K>() => ReadonlyMap<K, never> = () => _.emptyReadonlyMap

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
export function toUnfoldable<F extends TypeLambda>(
  U: Unfoldable<F>
): <K>(o: Ord<K>) => <A, S, R, O, E>(d: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, readonly [K, A]> {
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
): ((that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupE = lookup(E)
  return (that) =>
    (self) => {
      if (isEmpty(self)) {
        return that
      }
      if (isEmpty(that)) {
        return self
      }
      const out: Map<K, A> = new Map()
      const firstEntries = self.entries()
      let e: Next<readonly [K, A]>
      while (!(e = firstEntries.next()).done) {
        const [k, a] = e.value
        const oka = lookupE(k)(that)
        if (_.isSome(oka)) {
          out.set(k, M.combine(oka.value)(a))
        } else {
          out.set(k, a)
        }
      }
      const secondEntries = that.entries()
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
): ((that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupE = lookup(E)
  return (that) =>
    (self) => {
      if (isEmpty(self) || isEmpty(that)) {
        return empty()
      }
      const out: Map<K, A> = new Map()
      const entries = self.entries()
      let e: Next<readonly [K, A]>
      while (!(e = entries.next()).done) {
        const [k, a] = e.value
        const oka = lookupE(k)(that)
        if (_.isSome(oka)) {
          out.set(k, M.combine(oka.value)(a))
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
): (<A>(_second: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const memberE = member(E)
  return <A>(that: ReadonlyMap<K, A>) =>
    (self: ReadonlyMap<K, A>) => {
      if (isEmpty(self)) {
        return that
      }
      if (isEmpty(that)) {
        return self
      }
      const out: Map<K, A> = new Map()
      const firstEntries = self.entries()
      let e: Next<readonly [K, A]>
      while (!(e = firstEntries.next()).done) {
        const [k, a] = e.value
        if (!memberE(k)(that)) {
          out.set(k, a)
        }
      }
      const secondEntries = that.entries()
      while (!(e = secondEntries.next()).done) {
        const [k, a] = e.value
        if (!memberE(k)(self)) {
          out.set(k, a)
        }
      }
      return out
    }
}
