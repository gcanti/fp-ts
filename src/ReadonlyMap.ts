/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type * as compactable from './Compactable'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import * as eq from './Eq'
import * as filterable from './Filterable'
import * as filterableWithIndex from './FilterableWithIndex'
import type { Foldable } from './Foldable'
import type { FoldableWithIndex } from './FoldableWithIndex'
import { flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { FunctorWithIndex } from './FunctorWithIndex'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type { Magma } from './Magma'
import type { Monoid } from './Monoid'
import * as option from './Option'
import type { Ord } from './Ord'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import type { Traversable } from './Traversable'
import type { TraversableWithIndex } from './TraversableWithIndex'
import * as writer from './Writer'
import type { Unfoldable } from './Unfoldable'
import * as filterableKind from './FilterableKind'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'
import type { Eq } from './Eq'
import type { Option } from './Option'

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
export function fromFoldable<F extends TypeLambda>(
  F: Foldable<F>
): <K, B>(
  E: Eq<K>,
  M: Magma<B>
) => <A>(f: (a: A) => readonly [K, B]) => <S, R, O, E>(fka: Kind<F, S, R, O, E, A>) => ReadonlyMap<K, B> {
  return <K, B>(E: Eq<K>, M: Magma<B>) => {
    const lookupWithKeyE = lookupWithKey(E)
    return <A>(f: (a: A) => readonly [K, B]) =>
      F.reduce<Map<K, B>, A>(new Map<K, B>(), (out, a) => {
        const [k, b] = f(a)
        const oka = lookupWithKeyE(k)(out)
        if (_.isSome(oka)) {
          out.set(oka.value[0], M.combine(b)(oka.value[1]))
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
  return (k) => flow(popE(k), option.map(writer.snd))
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
        option.map(([k, a]) => {
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
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (f) =>
  mapWithIndex((_, a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex =
  <K, A, B>(f: (k: K, a: A) => B) =>
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
 * @category Compactable
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
 * @category Compactable
 * @since 3.0.0
 */
export const separate = <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
): readonly [ReadonlyMap<K, A>, ReadonlyMap<K, B>] => {
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
  return [left, right]
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => option.Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B> = (
  f
) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>] = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
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
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionMapWithIndex =
  <K, A, B, C>(f: (k: K, a: A) => Either<B, C>) =>
  (fa: ReadonlyMap<K, A>): readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>] => {
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
  return eq.fromEquals((second) => (first) => isSubmapSKSA(first)(second) && isSubmapSKSA(second)(first))
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
    combine: (second) => (first) => {
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
          r.set(oka.value[0], Semigroup.combine(a)(oka.value[1]))
        } else {
          r.set(k, a)
        }
      }
      return r
    },
    empty: emptyKind()
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
export const flap: <A>(a: A) => <K, B>(fab: ReadonlyMap<K, (a: A) => B>) => ReadonlyMap<K, B> =
  /*#__PURE__*/ functor.flap(Functor)

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
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyMapTypeLambda> = {
  partitionMap,
  filterMap
}

/**
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <B extends A, A = B>(predicate: Predicate<A>): <K>(fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(
    fc: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <K>(
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

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
 * @since 3.0.0
 */
export const filterWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
} = /*#__PURE__*/ filterableWithIndex.filterWithIndex(FilterableWithIndex_)

/**
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (
    fb: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
} = /*#__PURE__*/ filterableWithIndex.partitionWithIndex(FilterableWithIndex_)

/**
 * @since 3.0.0
 */
export const reduce: <K>(O: Ord<K>) => <B, A>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyMap<K, A>) => B = (O) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (b, f) => reduceWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @since 3.0.0
 */
export const foldMap: <K>(O: Ord<K>) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyMap<K, A>) => M = (
  O
) => {
  const foldMapWithIndexO = foldMapWithIndex(O)
  return (M) => {
    const foldMapWithIndexOM = foldMapWithIndexO(M)
    return (f) => foldMapWithIndexOM((_, a) => f(a))
  }
}

/**
 * @since 3.0.0
 */
export const reduceRight: <K>(O: Ord<K>) => <B, A>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyMap<K, A>) => B = (
  O
) => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (b, f) => reduceRightWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = <K>(O: Ord<K>): Foldable<ReadonlyMapTypeLambdaFix<K>> => {
  return {
    reduce: reduce(O),
    foldMap: foldMap(O),
    reduceRight: reduceRight(O)
  }
}

/**
 * @since 3.0.0
 */
export const reduceWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, b: B, a: A) => B) => (fa: ReadonlyMap<K, A>) => B = (O) => {
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
export const foldMapWithIndex: <K>(
  O: Ord<K>
) => <M>(M: Monoid<M>) => <A>(f: (i: K, a: A) => M) => (fa: ReadonlyMap<K, A>) => M = (O) => {
  const keysO = keys(O)
  return (M) => (f) => (m) => {
    let out = M.empty
    for (const k of keysO(m)) {
      out = M.combine(f(k, m.get(k)!))(out)
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const reduceRightWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, a: A, b: B) => B) => (fa: ReadonlyMap<K, A>) => B = (O) => {
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
export const getFoldableWithIndex = <K>(O: Ord<K>): FoldableWithIndex<ReadonlyMapTypeLambdaFix<K>, K> => {
  return {
    reduceWithIndex: reduceWithIndex(O),
    foldMapWithIndex: foldMapWithIndex(O),
    reduceRightWithIndex: reduceRightWithIndex(O)
  }
}

/**
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
 * @since 3.0.0
 */
export const getFilterMapE = <K>(
  O: Ord<K>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, option.Option<B>>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>>) => {
  const C: compactable.Compactable<ReadonlyMapTypeLambdaFix<K>> = { compact, separate }
  return filterableKind.getDefaultFilterMapKind(getTraversable(O), C)
}

/**
 * @since 3.0.0
 */
export const getPartitionMapE = <K>(
  O: Ord<K>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
) => (wa: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>]>) => {
  const C: compactable.Compactable<ReadonlyMapTypeLambdaFix<K>> = { compact, separate }
  return filterableKind.getDefaultPartitionMapKind(getTraversable(O), C)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterableKind = <K>(O: Ord<K>): filterableKind.FilterableKind<ReadonlyMapTypeLambdaFix<K>> => {
  return {
    filterMapKind: getFilterMapE(O),
    partitionMapKind: getPartitionMapE(O)
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
  empty: emptyKind()
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <K, A>(E: Eq<K>, S: Semigroup<A>): Semigroup<ReadonlyMap<K, A>> => ({
  combine: intersection(E, S)
})

/**
 * @category combinator
 * @since 3.0.0
 */
export const getDifferenceMagma =
  <K>(E: Eq<K>) =>
  <A>(): Magma<ReadonlyMap<K, A>> => ({
    combine: difference(E)
  })

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
export const elem =
  <A>(E: Eq<A>) =>
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
 * @since 3.0.0
 */
export const keys =
  <K>(O: Ord<K>) =>
  <A>(m: ReadonlyMap<K, A>): ReadonlyArray<K> =>
    Array.from(m.keys()).sort((first, second) => O.compare(second)(first))

/**
 * Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.
 *
 * @since 3.0.0
 */
export const values =
  <A>(O: Ord<A>) =>
  <K>(m: ReadonlyMap<K, A>): ReadonlyArray<A> =>
    Array.from(m.values()).sort((first, second) => O.compare(second)(first))

/**
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
export const lookupWithKey =
  <K>(E: Eq<K>) =>
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
): ((second: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => boolean) => {
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

const empty = new Map<never, never>()

/**
 * @since 3.0.0
 */
export const emptyKind: <K>() => ReadonlyMap<K, never> = () => empty

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
): ((second: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
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
        out.set(k, M.combine(oka.value)(a))
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
): ((second: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>) => {
  const lookupE = lookup(E)
  return (second) => (first) => {
    if (isEmpty(first) || isEmpty(second)) {
      return emptyKind()
    }
    const out: Map<K, A> = new Map()
    const entries = first.entries()
    let e: Next<readonly [K, A]>
    while (!(e = entries.next()).done) {
      const [k, a] = e.value
      const oka = lookupE(k)(second)
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
  return <A>(second: ReadonlyMap<K, A>) =>
    (self: ReadonlyMap<K, A>) => {
      if (isEmpty(self)) {
        return second
      }
      if (isEmpty(second)) {
        return self
      }
      const out: Map<K, A> = new Map()
      const firstEntries = self.entries()
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
        if (!memberE(k)(self)) {
          out.set(k, a)
        }
      }
      return out
    }
}
