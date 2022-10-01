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
import type * as foldableWithIndex from './FoldableWithIndex'
import { identity, pipe } from './f'
import * as functor from './Functor'
import type * as functorWithIndex from './FunctorWithIndex'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type { Magma } from './Magma'
import type { Monoid } from './Monoid'
import * as option from './Option'
import type { Ord } from './Ord'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import type * as traversable from './Traversable'
import type * as traversableWithIndex from './TraversableWithIndex'
import type { Unfoldable } from './Unfoldable'
import * as filterableKind from './FilterableKind'
import * as string from './string'
import type { Eq } from './Eq'
import type { Option } from './Option'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlyRecordTypeLambda extends TypeLambda {
  readonly type: ReadonlyRecord<string, this['Out1']>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Create a `ReadonlyRecord` from one key/value pair.
 *
 * @category constructors
 * @since 3.0.0
 */
export const singleton = <A>(k: string, a: A): ReadonlyRecord<string, A> => ({ [k]: a })

/**
 * Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.
 *
 * @category constructors
 * @since 3.0.0
 */
export function fromFoldable<F extends TypeLambda>(
  F: Foldable<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <S, R, O, E>(r: Kind<F, S, R, O, E, A>) => ReadonlyRecord<string, B> {
  return <B>(M: Magma<B>) =>
    <A>(f: (a: A) => readonly [string, B]) =>
      F.reduce<Record<string, B>, A>({}, (r, a) => {
        const [k, b] = f(a)
        r[k] = _.has.call(r, k) ? M.combine(b)(r[k]) : b
        return r
      })
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Insert an element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key already exists.
 *
 * @category combinators
 * @since 3.0.0
 */
export const insertAt =
  <A>(k: string, a: A) =>
  (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!_.has.call(r, k)) {
      const out: Record<string, A> = Object.assign({}, r)
      out[k] = a
      return _.some(out)
    }
    return _.none
  }

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const upsertAt =
  <A>(k: string, a: A) =>
  (r: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (_.has.call(r, k) && r[k] === a) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return out
  }

/**
 * Change the element at the specified keys, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const updateAt = <A>(k: string, a: A): ((r: ReadonlyRecord<string, A>) => Option<ReadonlyRecord<string, A>>) =>
  modifyAt(k, () => a)

/**
 * Apply a function to the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const modifyAt =
  <A>(k: string, f: Endomorphism<A>) =>
  (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!has(k, r)) {
      return _.none
    }
    const a = f(r[k])
    if (a === r[k]) {
      return _.some(r)
    }
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return _.some(out)
  }

/**
 * Delete the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const deleteAt =
  (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
    if (!_.has.call(r, k)) {
      return _.none
    }
    const out: Record<string, A> = Object.assign({}, r)
    delete out[k]
    return _.some(out)
  }

/**
 * Delete the element at the specified key, returning the value as well as the subsequent `ReadonlyRecord`,
 * or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const pop =
  (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<readonly [A, ReadonlyRecord<string, A>]> =>
    pipe(
      r,
      deleteAt(k),
      option.map((out) => [r[k], out])
    )

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B): (<K extends string>(r: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>) =>
  mapWithIndex((_, a) => f(a))

/**
 * Map a `ReadonlyRecord` passing both the keys and values to the iterating function.
 *
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function mapWithIndex<A, B>(
  f: (k: string, a: A) => B
): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (r) => {
    const out: Record<string, B> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        out[k] = f(k, r[k])
      }
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const keys =
  (O: Ord<string>) =>
  <K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> =>
    (Object.keys(r) as Array<K>).sort((first, second) => O.compare(second)(first))

/**
 * @since 3.0.0
 */
export const reduceWithIndex = (
  O: Ord<string>
): (<B, K extends string, A>(b: B, f: (k: K, b: B, a: A) => B) => (r: ReadonlyRecord<K, A>) => B) => {
  const keysO = keys(O)
  return (b, f) => (r) => {
    let out = b
    for (const k of keysO(r)) {
      out = f(k, out, r[k])
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const foldMapWithIndex = (
  O: Ord<string>
): (<M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (r: ReadonlyRecord<K, A>) => M) => {
  const keysO = keys(O)
  return (M) => (f) => (r) => {
    let out = M.empty
    for (const k of keysO(r)) {
      out = M.combine(f(k, r[k]))(out)
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const reduceRightWithIndex = (
  O: Ord<string>
): (<B, K extends string, A>(b: B, f: (k: K, a: A, b: B) => B) => (r: ReadonlyRecord<K, A>) => B) => {
  const keysO = keys(O)
  return (b, f) => (r) => {
    let out = b
    const ks = keysO(r)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, r[k], out)
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export const traverseWithIndex = (
  O: Ord<string>
): (<F extends TypeLambda>(
  F: Applicative<F>
) => <K extends string, A, S, R, O, E, B>(
  f: (k: K, a: A) => Kind<F, S, R, O, E, B>
) => (r: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, ReadonlyRecord<K, B>>) => {
  const keysO = keys(O)
  return <F extends TypeLambda>(F: Applicative<F>) =>
    <K extends string, A, S, R, O, E, B>(f: (k: K, a: A) => Kind<F, S, R, O, E, B>) =>
    (r: ReadonlyRecord<K, A>) => {
      if (isEmpty(r)) {
        return F.of(empty)
      }
      let out: Kind<F, S, R, O, E, Record<string, B>> = F.of({})
      for (const key of keysO(r)) {
        out = pipe(
          out,
          F.map((r) => (b: B) => Object.assign({}, r, { [key]: b })),
          F.ap(f(key, r[key]))
        )
      }
      return out as any
    }
}

/**
 * @since 3.0.0
 */
export function traverse(
  O: Ord<string>
): <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, ReadonlyRecord<K, B>> {
  const traverseWithIndexO = traverseWithIndex(O)
  return (F) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return (f) => traverseWithIndexOF((_, a) => f(a))
  }
}

/**
 * @since 3.0.0
 */
export const sequence = (O: Ord<string>) => {
  const traverseO = traverse(O)
  return <F extends TypeLambda>(
    F: Applicative<F>
  ): (<K extends string, S, R, O, E, A>(
    ta: ReadonlyRecord<K, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyRecord<K, A>>) => {
    return traverseO(F)(identity)
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (r: ReadonlyRecord<K, A>) => readonly [ReadonlyRecord<string, B>, ReadonlyRecord<string, C>] {
  return (r) => {
    const left: Record<string, B> = {}
    const right: Record<string, C> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const e = f(k, r[k])
        if (_.isLeft(e)) {
          left[k] = e.left
        } else {
          right[k] = e.right
        }
      }
    }
    return [left, right]
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (r) => {
    if (isEmpty(r)) {
      return r
    }
    const out: Record<string, B> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const ob = f(k, r[k])
        if (_.isSome(ob)) {
          out[k] = ob.value
        }
      }
    }
    return out
  }
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(
  f: (a: A) => option.Option<B>
) => (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>] = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @since 3.0.0
 */
export const reduce = (O: Ord<string>): (<B, A>(b: B, f: (b: B, a: A) => B) => (r: ReadonlyRecord<string, A>) => B) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (b, f) => reduceWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @since 3.0.0
 */
export const foldMap = (
  O: Ord<string>
): (<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (r: ReadonlyRecord<string, A>) => M) => {
  const foldMapWithIndexO = foldMapWithIndex(O)
  return (M) => {
    const foldMapWithIndexOM = foldMapWithIndexO(M)
    return (f) => foldMapWithIndexOM((_, a) => f(a))
  }
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight = (
  O: Ord<string>
): (<B, A>(b: B, f: (a: A, b: B) => B) => (r: ReadonlyRecord<string, A>) => B) => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (b, f) => reduceRightWithIndexO(b, (_, b, a) => f(b, a))
}

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact = <A>(r: ReadonlyRecord<string, Option<A>>): ReadonlyRecord<string, A> => {
  const out: Record<string, A> = {}
  for (const k in r) {
    if (_.has.call(r, k)) {
      const oa = r[k]
      if (_.isSome(oa)) {
        out[k] = oa.value
      }
    }
  }
  return out
}

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate = <A, B>(
  r: ReadonlyRecord<string, Either<A, B>>
): readonly [ReadonlyRecord<string, A>, ReadonlyRecord<string, B>] => {
  const left: Record<string, A> = {}
  const right: Record<string, B> = {}
  for (const k in r) {
    if (_.has.call(r, k)) {
      const e = r[k]
      if (_.isLeft(e)) {
        left[k] = e.left
      } else {
        right[k] = e.right
      }
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
export const getShow = (O: Ord<string>): (<A>(S: Show<A>) => Show<ReadonlyRecord<string, A>>) => {
  const collectO = collect(O)
  return <A>(S: Show<A>) => {
    const f = collectO((k, a: A) => `${JSON.stringify(k)}: ${S.show(a)}`)
    return {
      show: (r: ReadonlyRecord<string, A>) => {
        const elements = f(r).join(', ')
        return elements === '' ? '{}' : `{ ${elements} }`
      }
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getEq<A, K extends string>(E: Eq<A>): Eq<ReadonlyRecord<K, A>> {
  const isSubrecordE = isSubrecord(E)
  return eq.fromEquals((second) => (first) => isSubrecordE(first)(second) && isSubrecordE(second)(first))
}

/**
 * Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/ReadonlyRecord'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe({ foo: 123 }, M.combine({ foo: 456 })), { foo: 579 })
 *
 * @category instances
 * @since 3.0.0
 */
export function getMonoid<A, K extends string>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    combine: (second) => (first) => {
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const r: Record<string, A> = Object.assign({}, first)
      for (const k in second) {
        if (_.has.call(second, k)) {
          r[k] = _.has.call(first, k) ? S.combine(second[k])(first[k]) : second[k]
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
export const Functor: functor.Functor<ReadonlyRecordTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Readonly<Record<string, (a: A) => B>>) => Readonly<Record<string, B>> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyRecordTypeLambda, string> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = (O: Ord<string>): Foldable<ReadonlyRecordTypeLambda> => ({
  reduce: reduce(O),
  foldMap: foldMap(O),
  reduceRight: reduceRight(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = (
  O: Ord<string>
): foldableWithIndex.FoldableWithIndex<ReadonlyRecordTypeLambda, string> => ({
  reduceWithIndex: reduceWithIndex(O),
  foldMapWithIndex: foldMapWithIndex(O),
  reduceRightWithIndex: reduceRightWithIndex(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<ReadonlyRecordTypeLambda> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyRecordTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: ReadonlyRecord<string, C>
  ) => ReadonlyRecord<string, B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: ReadonlyRecord<string, B>) => ReadonlyRecord<string, B>
} = /*#__PURE__*/ filterable.getFilterDerivation(Filterable)

/**
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: Readonly<Record<string, C>>
  ) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
  <B extends A, A = B>(predicate: Predicate<A>): (
    fb: Readonly<Record<string, B>>
  ) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
} = /*#__PURE__*/ filterable.getPartitionDerivation(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<ReadonlyRecordTypeLambda, string> = {
  filterMapWithIndex,
  partitionMapWithIndex
}

/**
 * @since 3.0.0
 */
export const filterWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: string, a: A) => a is B): (
    fc: Readonly<Record<string, C>>
  ) => Readonly<Record<string, B>>
  <B extends A, A = B>(predicate: (i: string, a: A) => boolean): (
    fb: Readonly<Record<string, B>>
  ) => Readonly<Record<string, B>>
} = /*#__PURE__*/ filterableWithIndex.filterWithIndex(FilterableWithIndex)

/**
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: string, a: A) => a is B): (
    fb: Readonly<Record<string, C>>
  ) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
  <B extends A, A = B>(predicate: (i: string, a: A) => boolean): (
    fb: Readonly<Record<string, B>>
  ) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
} = /*#__PURE__*/ filterableWithIndex.partitionWithIndex(FilterableWithIndex)

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = (O: Ord<string>): traversable.Traversable<ReadonlyRecordTypeLambda> => ({
  traverse: traverse(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableWithIndex = (
  O: Ord<string>
): traversableWithIndex.TraversableWithIndex<ReadonlyRecordTypeLambda, string> => ({
  traverseWithIndex: traverseWithIndex(O)
})

/**
 * @since 3.0.0
 */
export const getFilterMapKind: (
  O: Ord<string>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, option.Option<B>>
) => (ta: Readonly<Record<string, A>>) => Kind<F, S, R, O, E, Readonly<Record<string, B>>> = (O) =>
  filterableKind.getDefaultFilterMapKind(getTraversable(O), Compactable)

/**
 * @since 3.0.0
 */
export const getPartitionMapKind: (
  O: Ord<string>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
) => (
  wa: Readonly<Record<string, A>>
) => Kind<F, S, R, O, E, readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>]> = (O) =>
  filterableKind.getDefaultPartitionMapKind(getTraversable(O), Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterableKind = (O: Ord<string>): filterableKind.FilterableKind<ReadonlyRecordTypeLambda> => ({
  filterMapKind: getFilterMapKind(O),
  partitionMapKind: getPartitionMapKind(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  combine: union(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> => ({
  combine: getUnionSemigroup(S).combine,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  combine: intersection(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(): Magma<ReadonlyRecord<string, A>> => ({
  combine: difference
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const size = <A>(r: ReadonlyRecord<string, A>): number => Object.keys(r).length

/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = <A>(r: ReadonlyRecord<string, A>): r is ReadonlyRecord<string, never> => {
  for (const k in r) {
    if (_.has.call(r, k)) {
      return false
    }
  }
  return true
}

/**
 * Map a `ReadonlyRecord` into an `ReadonlyArray`.
 *
 * @example
 * import { collect } from 'fp-ts/ReadonlyRecord'
 * import * as S from 'fp-ts/string'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect(S.Ord)((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 3.0.0
 */
export const collect = (
  O: Ord<string>
): (<K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>) => {
  const keysO = keys(O)
  return <K extends string, A, B>(f: (k: K, a: A) => B) =>
    (r: ReadonlyRecord<K, A>) => {
      const out: Array<B> = []
      for (const k of keysO(r)) {
        out.push(f(k, r[k]))
      }
      return out
    }
}

/**
 * Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const toReadonlyArray = (
  O: Ord<string>
): (<K extends string, A>(r: ReadonlyRecord<K, A>) => ReadonlyArray<readonly [K, A]>) => collect(O)((k, a) => [k, a])

/**
 * Unfolds a `ReadonlyRecord` into a data structure of key/value pairs.
 *
 * @since 3.0.0
 */
export function toUnfoldable(
  O: Ord<string>
): <F extends TypeLambda>(
  U: Unfoldable<F>
) => <K extends string, A, S, R, O, E>(r: ReadonlyRecord<K, A>) => Kind<F, S, R, O, E, readonly [K, A]> {
  const toReadonlyArrayO = toReadonlyArray(O)
  return (U) => (r) => {
    const as = toReadonlyArrayO(r)
    const len = as.length
    return U.unfold(0, (b) => (b < len ? _.some([as[b], b + 1]) : _.none))
  }
}

/**
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a custom type guard.
 *
 * @since 3.0.0
 */
export const has = <K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K => _.has.call(r, k)

/**
 * Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const isSubrecord =
  <A>(E: Eq<A>) =>
  (second: ReadonlyRecord<string, A>) =>
  (self: ReadonlyRecord<string, A>): boolean => {
    for (const k in self) {
      if (!_.has.call(second, k) || !E.equals(second[k])(self[k])) {
        return false
      }
    }
    return true
  }

/**
 * Lookup the value for a key in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const lookup =
  (k: string) =>
  <A>(r: ReadonlyRecord<string, A>): Option<A> =>
    _.has.call(r, k) ? _.some(r[k]) : _.none

/**
 * An empty `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyRecord<string, never> = _.Do

/**
 * @since 3.0.0
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>> {
  return (r) => {
    for (const k in r) {
      if (!predicate(r[k])) {
        return false
      }
    }
    return true
  }
}

/**
 * @since 3.0.0
 */
export const some =
  <A>(predicate: (a: A) => boolean) =>
  (r: ReadonlyRecord<string, A>): boolean => {
    for (const k in r) {
      if (predicate(r[k])) {
        return true
      }
    }
    return false
  }

/**
 * Tests whether a value is a member of a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const elem =
  <A>(E: Eq<A>) =>
  (a: A): ((r: ReadonlyRecord<string, A>) => boolean) => {
    const predicate = E.equals(a)
    return (r) => {
      for (const k in r) {
        if (predicate(r[k])) {
          return true
        }
      }
      return false
    }
  }

/**
 * @since 3.0.0
 */
export const union =
  <A>(M: Magma<A>) =>
  (second: ReadonlyRecord<string, A>) =>
  (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (isEmpty(self)) {
      return second
    }
    if (isEmpty(second)) {
      return self
    }
    const out: Record<string, A> = {}
    for (const k in self) {
      if (has(k, second)) {
        out[k] = M.combine(second[k])(self[k])
      } else {
        out[k] = self[k]
      }
    }
    for (const k in second) {
      if (!has(k, out)) {
        out[k] = second[k]
      }
    }
    return out
  }

/**
 * @since 3.0.0
 */
export const intersection =
  <A>(M: Magma<A>) =>
  (second: ReadonlyRecord<string, A>) =>
  (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (isEmpty(self) || isEmpty(second)) {
      return empty
    }
    const out: Record<string, A> = {}
    for (const k in self) {
      if (has(k, second)) {
        out[k] = M.combine(second[k])(self[k])
      }
    }
    return out
  }

/**
 * @since 3.0.0
 */
export const difference =
  <A>(second: ReadonlyRecord<string, A>) =>
  (self: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
    if (isEmpty(self)) {
      return second
    }
    if (isEmpty(second)) {
      return self
    }
    const out: Record<string, A> = {}
    for (const k in self) {
      if (!has(k, second)) {
        out[k] = self[k]
      }
    }
    for (const k in second) {
      if (!has(k, self)) {
        out[k] = second[k]
      }
    }
    return out
  }

/**
 * Converts a `ReadonlyRecord` into a `ReadonlyArray` of `[key, value]` tuples.
 *
 * @example
 * import { toEntries } from 'fp-ts/ReadonlyRecord'
 *
 * assert.deepStrictEqual(toEntries({ a: 1, b: 2 }), [['a', 1], ['b', 2]])
 *
 * @since 3.0.0
 */
export const toEntries = toReadonlyArray(string.Ord)

/**
 * Converts a `ReadonlyArray` of `[key, value]` tuples into a `ReadonlyRecord`.
 *
 * @example
 * import { fromEntries } from 'fp-ts/ReadonlyRecord'
 *
 * assert.deepStrictEqual(fromEntries([['a', 1], ['b', 2], ['a', 3]]), { b: 2, a: 3 })
 *
 * @since 3.0.0
 */
export const fromEntries = <A>(fa: ReadonlyArray<readonly [string, A]>): ReadonlyRecord<string, A> => {
  const out: Record<string, A> = {}
  for (const a of fa) {
    out[a[0]] = a[1]
  }
  return out
}
