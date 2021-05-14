/**
 * @since 3.0.0
 */
import type { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import type { Compactable1 } from './Compactable'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import { Eq, fromEquals } from './Eq'
import type { Filterable1 } from './Filterable'
import type { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import type { Foldable as Foldable_, Foldable1, Foldable2, Foldable3, Foldable4 } from './Foldable'
import type { FoldableWithIndex1 } from './FoldableWithIndex'
import { pipe } from './function'
import { flap as flap_, Functor1 } from './Functor'
import type { FunctorWithIndex1 } from './FunctorWithIndex'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import type { Magma } from './Magma'
import type { Monoid } from './Monoid'
import * as O from './Option'
import { Ord } from './Ord'
import type { Predicate } from './Predicate'
import type { Semigroup } from './Semigroup'
import { separated, Separated } from './Separated'
import type { Show } from './Show'
import type { Traversable1 } from './Traversable'
import type { TraversableWithIndex1 } from './TraversableWithIndex'
import type { Unfoldable, Unfoldable1 } from './Unfoldable'
import { wiltDefault, Witherable1, witherDefault } from './Witherable'

import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

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
export function fromFoldable<F extends URIS4>(
  F: Foldable4<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <S, R, E>(r: Kind4<F, S, R, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <R, E>(r: Kind3<F, R, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => <E>(r: Kind2<F, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (r: Kind<F, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F>(
  F: Foldable_<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (r: HKT<F, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F>(
  F: Foldable_<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (r: HKT<F, A>) => ReadonlyRecord<string, B> {
  return <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) =>
    F.reduce<Record<string, B>, A>({}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _.has.call(r, k) ? M.concat(b)(r[k]) : b
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
export const insertAt = <A>(k: string, a: A) => (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
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
export const upsertAt = <A>(k: string, a: A) => (r: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
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
export const modifyAt = <A>(k: string, f: Endomorphism<A>) => (
  r: ReadonlyRecord<string, A>
): Option<ReadonlyRecord<string, A>> => {
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
export const deleteAt = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
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
export const pop = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<readonly [A, ReadonlyRecord<string, A>]> =>
  pipe(
    r,
    deleteAt(k),
    O.map((out) => [r[k], out])
  )

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a `ReadonlyRecord` passing the values to the iterating function.
 *
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
export const keys = (O: Ord<string>) => <K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> =>
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
      out = M.concat(f(k, r[k]))(out)
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
export function traverseWithIndex(
  O: Ord<string>
): {
  <F extends URIS3>(F: Applicative3<F>): <K extends string, A, R, E, B>(
    f: (k: K, a: A) => Kind3<F, R, E, B>
  ) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <K extends string, A, R, B>(
    f: (k: K, a: A) => Kind3<F, R, E, B>
  ) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
  <F extends URIS2>(F: Applicative2<F>): <K extends string, A, E, B>(
    f: (k: K, a: A) => Kind2<F, E, B>
  ) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <K extends string, A, B>(
    f: (k: K, a: A) => Kind2<F, E, B>
  ) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
  <F extends URIS>(F: Applicative1<F>): <K extends string, A, B>(
    f: (k: K, a: A) => Kind<F, B>
  ) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
  <F>(F: Applicative<F>): <K extends string, A, B>(
    f: (k: K, a: A) => HKT<F, B>
  ) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
}
export function traverseWithIndex(
  O: Ord<string>
): <F>(
  F: Applicative<F>
) => <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  const keysO = keys(O)
  return <F>(F: Applicative<F>) => <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => {
    if (isEmpty(ta)) {
      return F.of(empty)
    }
    let out: HKT<F, Record<string, B>> = F.of({})
    for (const key of keysO(ta)) {
      out = pipe(
        out,
        F.map((r) => (b: B) => {
          r[key] = b
          return r
        }),
        F.ap(f(key, ta[key]))
      )
    }
    return out
  }
}

/**
 * @since 3.0.0
 */
export function traverse(
  O: Ord<string>
): {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, B>
  ) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
}
export function traverse(
  O: Ord<string>
): <F>(
  F: Applicative<F>
) => <A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  const traverseWithIndexO = traverseWithIndex(O)
  return (F) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return (f) => traverseWithIndexOF((_, a) => f(a))
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (r: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> {
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
    return separated(left, right)
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (r: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(r: ReadonlyRecord<K, B>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (r: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (r: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> {
  return (r) => {
    const left: Record<string, A> = {}
    const right: Record<string, A> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const a = r[k]
        if (predicateWithIndex(k, a)) {
          right[k] = a
        } else {
          left[k] = a
        }
      }
    }
    return separated(left, right)
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
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(r: ReadonlyRecord<K, B>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return (r) => {
    const out: Record<string, A> = {}
    let changed = false
    for (const key in r) {
      if (_.has.call(r, key)) {
        const a = r[key]
        if (predicateWithIndex(key, a)) {
          out[key] = a
        } else {
          changed = true
        }
      }
    }
    return changed ? out : r
  }
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: Filterable1<URI>['filter'] = <A>(
  predicate: Predicate<A>
): ((r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A>) => filterWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: Filterable1<URI>['filterMap'] = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: Filterable1<URI>['partition'] = <A>(
  predicate: Predicate<A>
): ((r: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable1<URI>['partitionMap'] = (f) => partitionMapWithIndex((_, a) => f(a))

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
 * @category Foldable
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
export const compact: Compactable1<URI>['compact'] = <A>(
  r: ReadonlyRecord<string, Option<A>>
): ReadonlyRecord<string, A> => {
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
export const separate: Compactable1<URI>['separate'] = <A, B>(
  r: ReadonlyRecord<string, Either<A, B>>
): Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>> => {
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
  return separated(left, right)
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReadonlyRecord'

declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyRecord: ReadonlyRecord<string, A>
  }
}

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
  return fromEquals((second) => (first) => isSubrecordE(first)(second) && isSubrecordE(second)(first))
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
 * assert.deepStrictEqual(pipe({ foo: 123 }, M.concat({ foo: 456 })), { foo: 579 })
 *
 * @category instances
 * @since 3.0.0
 */
export function getMonoid<A, K extends string>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    concat: (second) => (first) => {
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const r: Record<string, A> = Object.assign({}, first)
      for (const k in second) {
        if (_.has.call(second, k)) {
          r[k] = _.has.call(first, k) ? S.concat(second[k])(first[k]) : second[k]
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
export const Functor: Functor1<URI> = {
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
export const FunctorWithIndex: FunctorWithIndex1<URI, string> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldable = (O: Ord<string>): Foldable1<URI> => ({
  reduce: reduce(O),
  foldMap: foldMap(O),
  reduceRight: reduceRight(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFoldableWithIndex = (O: Ord<string>): FoldableWithIndex1<URI, string> => ({
  reduceWithIndex: reduceWithIndex(O),
  foldMapWithIndex: foldMapWithIndex(O),
  reduceRightWithIndex: reduceRightWithIndex(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable1<URI> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable1<URI> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, string> = {
  filterMapWithIndex,
  filterWithIndex,
  partitionMapWithIndex,
  partitionWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversable = (O: Ord<string>): Traversable1<URI> => ({
  map,
  traverse: traverse(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getTraversableWithIndex = (O: Ord<string>): TraversableWithIndex1<URI, string> => ({
  traverseWithIndex: traverseWithIndex(O)
})

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither = (O: Ord<string>): Witherable1<URI>['wither'] => witherDefault(getTraversable(O), Compactable)

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt = (O: Ord<string>): Witherable1<URI>['wilt'] => wiltDefault(getTraversable(O), Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const getWitherable = (O: Ord<string>): Witherable1<URI> => ({
  wither: wither(O),
  wilt: wilt(O)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  concat: union(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> => ({
  concat: getUnionSemigroup(S).concat,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => ({
  concat: intersection(S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(): Magma<ReadonlyRecord<string, A>> => ({
  concat: difference
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
export const isEmpty = <A>(r: ReadonlyRecord<string, A>): boolean => {
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
  return <K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => {
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
): {
  <F extends URIS>(U: Unfoldable1<F>): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
  <F>(U: Unfoldable<F>): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
}
export function toUnfoldable(
  O: Ord<string>
): <F>(U: Unfoldable<F>) => <A>(r: ReadonlyRecord<string, A>) => HKT<F, readonly [string, A]> {
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
export const isSubrecord = <A>(E: Eq<A>) => (second: ReadonlyRecord<string, A>) => (
  first: ReadonlyRecord<string, A>
): boolean => {
  for (const k in first) {
    if (!_.has.call(second, k) || !E.equals(second[k])(first[k])) {
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
export const lookup = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<A> =>
  _.has.call(r, k) ? _.some(r[k]) : _.none

/**
 * An empty `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyRecord<string, never> = _.emptyRecord

/**
 * @since 3.0.0
 */
export const every = <A>(predicate: Predicate<A>) => (r: ReadonlyRecord<string, A>): boolean => {
  for (const k in r) {
    if (!predicate(r[k])) {
      return false
    }
  }
  return true
}

/**
 * @since 3.0.0
 */
export const some = <A>(predicate: (a: A) => boolean) => (r: ReadonlyRecord<string, A>): boolean => {
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
export const elem = <A>(E: Eq<A>) => (a: A): ((r: ReadonlyRecord<string, A>) => boolean) => {
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
export const union = <A>(M: Magma<A>) => (second: ReadonlyRecord<string, A>) => (
  first: ReadonlyRecord<string, A>
): ReadonlyRecord<string, A> => {
  if (isEmpty(first)) {
    return second
  }
  if (isEmpty(second)) {
    return first
  }
  const out: Record<string, A> = {}
  for (const k in first) {
    if (has(k, second)) {
      out[k] = M.concat(second[k])(first[k])
    } else {
      out[k] = first[k]
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
export const intersection = <A>(M: Magma<A>) => (second: ReadonlyRecord<string, A>) => (
  first: ReadonlyRecord<string, A>
): ReadonlyRecord<string, A> => {
  if (isEmpty(first) || isEmpty(second)) {
    return empty
  }
  const out: Record<string, A> = {}
  for (const k in first) {
    if (has(k, second)) {
      out[k] = M.concat(second[k])(first[k])
    }
  }
  return out
}

/**
 * @since 3.0.0
 */
export const difference = <A>(second: ReadonlyRecord<string, A>) => (
  first: ReadonlyRecord<string, A>
): ReadonlyRecord<string, A> => {
  if (isEmpty(first)) {
    return second
  }
  if (isEmpty(second)) {
    return first
  }
  const out: Record<string, A> = {}
  for (const k in first) {
    if (!has(k, second)) {
      out[k] = first[k]
    }
  }
  for (const k in second) {
    if (!has(k, first)) {
      out[k] = second[k]
    }
  }
  return out
}
