/**
 * @since 2.5.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { identity, Predicate, Refinement } from './function'
import { Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { isNone, isSome, none, Option, some as optionSome } from './Option'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { PipeableWilt1, PipeableWither1, Witherable1 } from './Witherable'

/**
 * @category model
 * @since 2.5.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

/**
 * @category constructors
 * @since 2.5.0
 */
export function fromRecord<K extends string, A>(r: Record<K, A>): ReadonlyRecord<K, A> {
  return Object.assign({}, r)
}

/**
 * @category destructors
 * @since 2.5.0
 */
export function toRecord<K extends string, A>(r: ReadonlyRecord<K, A>): Record<K, A> {
  return Object.assign({}, r)
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>> {
  return {
    show: (r) => {
      const elements = collect((k, a: A) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(', ')
      return elements === '' ? '{}' : `{ ${elements} }`
    }
  }
}

/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
export function size(r: ReadonlyRecord<string, unknown>): number {
  return Object.keys(r).length
}

/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
export function isEmpty(r: ReadonlyRecord<string, unknown>): boolean {
  return Object.keys(r).length === 0
}

/**
 * @since 2.5.0
 */
export function keys<K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> {
  return (Object.keys(r) as any).sort()
}

/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: ReadonlyRecord<K, A>) => ReadonlyArray<B> {
  return (r) => {
    // tslint:disable-next-line: readonly-array
    const out: Array<B> = []
    for (const key of keys(r)) {
      out.push(f(key, r[key]))
    }
    return out
  }
}

/**
 * @category destructors
 * @since 2.5.0
 */
export const toReadonlyArray: <K extends string, A>(
  r: ReadonlyRecord<K, A>
) => ReadonlyArray<readonly [K, A]> = collect((k, a) => [k, a])

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @category destructors
 * @since 2.5.0
 */
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <A>(r: ReadonlyRecord<string, A>) => HKT<F, readonly [string, A]> {
  return (r) => {
    const arr = toReadonlyArray(r)
    const len = arr.length
    return U.unfold(0, (b) => (b < len ? optionSome([arr[b], b + 1]) : none))
  }
}

/**
 * Insert or replace a key/value pair in a record
 *
 * @category combinators
 * @since 2.5.0
 */
export function insertAt<K extends string, A>(
  k: K,
  a: A
): <KS extends string>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<KS | K, A>
export function insertAt<A>(k: string, a: A): (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return (r) => {
    if (r[k] === a) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return out
  }
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @since 2.5.0
 */
export function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K {
  return _hasOwnProperty.call(r, k)
}

/**
 * Delete a key and value from a map
 *
 * @category combinators
 * @since 2.5.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return <A>(r: ReadonlyRecord<string, A>) => {
    if (!_hasOwnProperty.call(r, k)) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    delete out[k]
    return out
  }
}

/**
 * @since 2.5.0
 */
export function updateAt<A>(
  k: string,
  a: A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>> {
  return <K extends string>(r: ReadonlyRecord<K, A>) => {
    if (!hasOwnProperty(k, r)) {
      return none
    }
    if (r[k] === a) {
      return optionSome(r)
    }
    const out: Record<K, A> = Object.assign({}, r)
    out[k] = a
    return optionSome(out)
  }
}

/**
 * @since 2.5.0
 */
export function modifyAt<A>(
  k: string,
  f: (a: A) => A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>> {
  return <K extends string>(r: ReadonlyRecord<K, A>) => {
    if (!hasOwnProperty(k, r)) {
      return none
    }
    const out: Record<K, A> = Object.assign({}, r)
    out[k] = f(r[k])
    return optionSome(out)
  }
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
export function pop<K extends string>(
  k: K
): <KS extends string, A>(
  r: ReadonlyRecord<KS, A>
) => Option<readonly [A, ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>]>
export function pop(k: string): <A>(r: ReadonlyRecord<string, A>) => Option<readonly [A, ReadonlyRecord<string, A>]> {
  const deleteAtk = deleteAt(k)
  return (r) => {
    const oa = lookup(k, r)
    return isNone(oa) ? none : optionSome([oa.value, deleteAtk(r)])
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.5.0
 */
export function isSubrecord<A>(
  E: Eq<A>
): {
  (that: ReadonlyRecord<string, A>): (me: ReadonlyRecord<string, A>) => boolean
  (me: ReadonlyRecord<string, A>, that: ReadonlyRecord<string, A>): boolean
}
export function isSubrecord<A>(
  E: Eq<A>
): (
  me: ReadonlyRecord<string, A>,
  that?: ReadonlyRecord<string, A>
) => boolean | ((me: ReadonlyRecord<string, A>) => boolean) {
  return (me, that?) => {
    if (that === undefined) {
      const isSubrecordE = isSubrecord(E)
      return (that) => isSubrecordE(that, me)
    }
    for (const k in me) {
      if (!_hasOwnProperty.call(that, k) || !E.equals(me[k], that[k])) {
        return false
      }
    }
    return true
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
export function getEq<A>(E: Eq<A>): Eq<ReadonlyRecord<string, A>> {
  const isSubrecordE = isSubrecord(E)
  return fromEquals((x, y) => isSubrecordE(x)(y) && isSubrecordE(y)(x))
}

/**
 * Returns a `Semigroup` instance for records given a `Semigroup` instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/ReadonlyRecord'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @category instances
 * @since 2.5.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    concat: (x, y) => {
      if (x === empty) {
        return y
      }
      if (y === empty) {
        return x
      }
      const keys = Object.keys(y)
      const len = keys.length
      if (len === 0) {
        return x
      }
      const r: Record<string, A> = Object.assign({}, x)
      for (let i = 0; i < len; i++) {
        const k = keys[i]
        r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k]
      }
      return r
    },
    empty
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a record
 *
 * @since 2.5.0
 */
export function lookup(k: string): <A>(r: ReadonlyRecord<string, A>) => Option<A>
export function lookup<A>(k: string, r: ReadonlyRecord<string, A>): Option<A>
export function lookup<A>(
  k: string,
  r?: ReadonlyRecord<string, A>
): Option<A> | ((r: ReadonlyRecord<string, A>) => Option<A>) {
  if (r === undefined) {
    return (r) => lookup(k, r)
  }
  return _hasOwnProperty.call(r, k) ? optionSome(r[k]) : none
}

/**
 * @since 2.5.0
 */
export const empty: ReadonlyRecord<string, never> = {}

/**
 * Map a record passing the keys to the iterating function
 *
 * @category combinators
 * @since 2.5.0
 */
export function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function mapWithIndex<A, B>(
  f: (k: string, a: A) => B
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (fa) => mapWithIndex_(fa, f)
}

/**
 * Map a record passing the values to the iterating function
 *
 * @category combinators
 * @since 2.5.0
 */
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function map<A, B>(f: (a: A) => B): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return mapWithIndex((_, a) => f(a))
}

/**
 * @since 2.5.0
 */
export function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: ReadonlyRecord<string, A>) => B {
  return (fa) => reduceWithIndex_(fa, b, f)
}

/**
 * @since 2.5.0
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <A>(f: (k: string, a: A) => M) => (fa: ReadonlyRecord<string, A>) => M {
  const foldMapWithIndexM = foldMapWithIndex_(M)
  return (f) => (fa) => foldMapWithIndexM(fa, f)
}

/**
 * @since 2.5.0
 */
export function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceRightWithIndex<A, B>(
  b: B,
  f: (k: string, a: A, b: B) => B
): (fa: ReadonlyRecord<string, A>) => B {
  return (fa) => reduceRightWithIndex_(fa, b, f)
}

/**
 * Create a record with one key/value pair
 *
 * @category constructors
 * @since 2.5.0
 */
export function singleton<K extends string, A>(k: K, a: A): ReadonlyRecord<K, A> {
  return { [k]: a } as any
}

/**
 * @since 2.5.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind<F, B>
) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  const traverseWithIndexF = traverseWithIndex_(F)
  return (f) => (ta) => traverseWithIndexF(ta, f)
}

/**
 * @since 2.5.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @since 2.5.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind<F, A>>) => Kind<F, ReadonlyRecord<K, A>>
export function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: ReadonlyRecord<K, HKT<F, A>>) => HKT<F, ReadonlyRecord<K, A>>
export function sequence<F>(
  F: Applicative<F>
): <A>(ta: ReadonlyRecord<string, HKT<F, A>>) => HKT<F, ReadonlyRecord<string, A>> {
  return traverseWithIndex(F)((_, a) => a)
}

/**
 * @category Whitherable
 * @since 2.6.5
 */
export const wither: PipeableWither1<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const witherF = wither_(F)
  return (f) => (ta) => witherF(ta, f)
}

/**
 * @category Whitherable
 * @since 2.6.5
 */
export const wilt: PipeableWilt1<URI> = <F>(
  F: Applicative<F>
): (<A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (wa: ReadonlyRecord<string, A>) => HKT<F, Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>>) => {
  const wiltF = wilt_(F)
  return (f) => (ta) => wiltF(ta, f)
}

/**
 * @since 2.5.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
export function partitionMapWithIndex<A, B, C>(
  f: (key: string, a: A) => Either<B, C>
): (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> {
  return (fa) => partitionMapWithIndex_(fa, f)
}

/**
 * @since 2.5.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> {
  return (fa) => partitionWithIndex_(fa, predicateWithIndex)
}

/**
 * @category combinators
 * @since 2.5.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (fa) => filterMapWithIndex_(fa, f)
}

/**
 * @since 2.5.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return (fa) => filterWithIndex_(fa, predicateWithIndex)
}

/**
 * Create a record from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.5.0
 */
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <K extends string, R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Kind<F, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F, A>(
  M: Magma<A>,
  F: Foldable<F>
): <K extends string>(fka: HKT<F, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F, A>(
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [string, A]>) => ReadonlyRecord<string, A> {
  const fromFoldableMapM = fromFoldableMap(M, F)
  return (fka) => fromFoldableMapM(fka, identity)
}

/**
 * Create a record from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
 * import { readonlyArray, zip } from 'fp-ts/lib/ReadonlyArray'
 * import { identity } from 'fp-ts/lib/function'
 * import { ReadonlyRecord, fromFoldableMap } from 'fp-ts/lib/ReadonlyRecord'
 *
 * // like lodash `zipObject` or ramda `zipObj`
 * export const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): ReadonlyRecord<K, A> =>
 *   fromFoldableMap(getLastSemigroup<A>(), readonlyArray)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * // build a record from a field
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * const users: ReadonlyArray<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), readonlyArray)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 2.5.0
 */
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A, K extends string>(fa: Kind2<F, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Kind<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A>(fa: HKT<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B> {
  return <A>(ta: HKT<F, A>, f: (a: A) => readonly [string, B]) => {
    return F.reduce<A, Record<string, B>>(ta, {}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b
      return r
    })
  }
}

/**
 * @since 2.5.0
 */
export function every<A>(predicate: Predicate<A>): (r: ReadonlyRecord<string, A>) => boolean {
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
 * @since 2.5.0
 */
export function some<A>(predicate: (a: A) => boolean): (r: ReadonlyRecord<string, A>) => boolean {
  return (r) => {
    for (const k in r) {
      if (predicate(r[k])) {
        return true
      }
    }
    return false
  }
}

// TODO: remove non-curried overloading in v3
/**
 * @since 2.5.0
 */
export function elem<A>(
  E: Eq<A>
): {
  (a: A): (fa: ReadonlyRecord<string, A>) => boolean
  (a: A, fa: ReadonlyRecord<string, A>): boolean
}
export function elem<A>(
  E: Eq<A>
): (a: A, fa?: ReadonlyRecord<string, A>) => boolean | ((fa: ReadonlyRecord<string, A>) => boolean) {
  return (a, fa?) => {
    if (fa === undefined) {
      const elemE = elem(E)
      return (fa) => elemE(a, fa)
    }
    for (const k in fa) {
      if (E.equals(fa[k], a)) {
        return true
      }
    }
    return false
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Functor1<URI>['map'] = (fa, f) => mapWithIndex_(fa, (_, a) => f(a))
const mapWithIndex_ = <A, B>(fa: ReadonlyRecord<string, A>, f: (k: string, a: A) => B) => {
  const out: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    out[key] = f(key, fa[key])
  }
  return out
}
const reduce_: Foldable1<URI>['reduce'] = (fa, b, f) => reduceWithIndex_(fa, b, (_, b, a) => f(b, a))
const foldMap_: Foldable1<URI>['foldMap'] = (M) => {
  const foldMapWithIndexM = foldMapWithIndex_(M)
  return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
}
const reduceRight_: Foldable1<URI>['reduceRight'] = (fa, b, f) => reduceRightWithIndex_(fa, b, (_, a, b) => f(a, b))
const traverse_ = <F>(
  F: Applicative<F>
): (<A, B>(ta: ReadonlyRecord<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const traverseWithIndexF = traverseWithIndex_(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}
const filter_ = <A>(fa: ReadonlyRecord<string, A>, predicate: Predicate<A>): ReadonlyRecord<string, A> => {
  return filterWithIndex_(fa, (_, a) => predicate(a))
}
const filterMap_: Filterable1<URI>['filterMap'] = (fa, f) => filterMapWithIndex_(fa, (_, a) => f(a))
const partition_ = <A>(
  fa: ReadonlyRecord<string, A>,
  predicate: Predicate<A>
): Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> => {
  return partitionWithIndex_(fa, (_, a) => predicate(a))
}
const partitionMap_: Filterable1<URI>['partitionMap'] = (fa, f) => partitionMapWithIndex_(fa, (_, a) => f(a))
const reduceWithIndex_: FoldableWithIndex1<URI, string>['reduceWithIndex'] = (fa, b, f) => {
  let out = b
  const ks = keys(fa)
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = f(k, out, fa[k])
  }
  return out
}
const foldMapWithIndex_: FoldableWithIndex1<URI, string>['foldMapWithIndex'] = (M) => (fa, f) => {
  let out = M.empty
  const ks = keys(fa)
  const len = ks.length
  for (let i = 0; i < len; i++) {
    const k = ks[i]
    out = M.concat(out, f(k, fa[k]))
  }
  return out
}
const reduceRightWithIndex_: FoldableWithIndex1<URI, string>['reduceRightWithIndex'] = (fa, b, f) => {
  let out = b
  const ks = keys(fa)
  const len = ks.length
  for (let i = len - 1; i >= 0; i--) {
    const k = ks[i]
    out = f(k, fa[k], out)
  }
  return out
}
const partitionMapWithIndex_ = <A, B, C>(
  fa: ReadonlyRecord<string, A>,
  f: (key: string, a: A) => Either<B, C>
): Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>> => {
  const left: Record<string, B> = {}
  const right: Record<string, C> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = f(key, fa[key])
    switch (e._tag) {
      case 'Left':
        left[key] = e.left
        break
      case 'Right':
        right[key] = e.right
        break
    }
  }
  return {
    left,
    right
  }
}
const partitionWithIndex_ = <A>(fa: ReadonlyRecord<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
  const left: Record<string, A> = {}
  const right: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const a = fa[key]
    if (predicateWithIndex(key, a)) {
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
const filterMapWithIndex_ = <A, B>(fa: ReadonlyRecord<string, A>, f: (key: string, a: A) => Option<B>) => {
  const r: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionB = f(key, fa[key])
    if (isSome(optionB)) {
      r[key] = optionB.value
    }
  }
  return r
}
const filterWithIndex_ = <A>(fa: ReadonlyRecord<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
  const out: Record<string, A> = {}
  let changed = false
  for (const key in fa) {
    if (_hasOwnProperty.call(fa, key)) {
      const a = fa[key]
      if (predicateWithIndex(key, a)) {
        out[key] = a
      } else {
        changed = true
      }
    }
  }
  return changed ? out : fa
}
const traverseWithIndex_ = <F>(F: Applicative<F>) => <A, B>(
  ta: ReadonlyRecord<string, A>,
  f: (k: string, a: A) => HKT<F, B>
) => {
  const ks = keys(ta)
  if (ks.length === 0) {
    return F.of(empty)
  }
  let fr: HKT<F, Record<string, B>> = F.of({})
  for (const key of ks) {
    fr = F.ap(
      F.map(fr, (r) => (b: B) => {
        r[key] = b
        return r
      }),
      f(key, ta[key])
    )
  }
  return fr
}
const wither_ = <F>(
  F: Applicative<F>
): (<A, B>(wa: ReadonlyRecord<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const traverseF = traverse_(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}
const wilt_ = <F>(
  F: Applicative<F>
): (<A, B, C>(
  wa: ReadonlyRecord<string, A>,
  f: (a: A) => HKT<F, Either<B, C>>
) => HKT<F, Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>>) => {
  const traverseF = traverse_(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
} = <A>(predicate: Predicate<A>) => (fa: Readonly<Record<string, A>>) => filter_(fa, predicate)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filterMap: <A, B>(
  f: (a: A) => Option<B>
) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>> = (f) => (fa) => filterMap_(fa, f)

/**
 * @category Foldable
 * @since 2.5.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Readonly<Record<string, A>>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: Readonly<Record<string, A>>
  ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
  <A>(predicate: Predicate<A>): (
    fa: Readonly<Record<string, A>>
  ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, A>>>
} = <A>(predicate: Predicate<A>) => (fa: Readonly<Record<string, A>>) => partition_(fa, predicate)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>> = (f) => (
  fa
) => partitionMap_(fa, f)

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Readonly<Record<string, A>>) => B = (b, f) => (fa) =>
  reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Readonly<Record<string, A>>) => B = (b, f) => (
  fa
) => reduceRight_(fa, b, f)

/**
 * @category Compactable
 * @since 2.5.0
 */
export const compact = <A>(fa: Readonly<Record<string, Option<A>>>): Readonly<Record<string, A>> => {
  const r: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (isSome(optionA)) {
      r[key] = optionA.value
    }
  }
  return r
}

/**
 * @category Compactable
 * @since 2.5.0
 */
export const separate = <A, B>(
  fa: Readonly<Record<string, Either<A, B>>>
): Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>> => {
  const left: Record<string, A> = {}
  const right: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = fa[key]
    switch (e._tag) {
      case 'Left':
        left[key] = e.left
        break
      case 'Right':
        right[key] = e.right
        break
    }
  }
  return {
    left,
    right
  }
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyRecord'

/**
 * @category instances
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: ReadonlyRecord<string, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorRecord: Functor1<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorWithIndexRecord: FunctorWithIndex1<URI, string> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const foldableRecord: Foldable1<URI> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const foldableWithIndexRecord: FoldableWithIndex1<URI, string> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  reduceWithIndex: reduceWithIndex_,
  foldMapWithIndex: foldMapWithIndex_,
  reduceRightWithIndex: reduceRightWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const compactableRecord: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.7.0
 */
export const filterableRecord: Filterable1<URI> = {
  URI,
  map: map_,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const filterableWithIndexRecord: FilterableWithIndex1<URI, string> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  filterMapWithIndex: filterMapWithIndex_,
  filterWithIndex: filterWithIndex_,
  partitionMapWithIndex: partitionMapWithIndex_,
  partitionWithIndex: partitionWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const traversableRecord: Traversable1<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const traversableWithIndexRecord: TraversableWithIndex1<URI, string> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  reduceWithIndex: reduceWithIndex_,
  foldMapWithIndex: foldMapWithIndex_,
  reduceRightWithIndex: reduceRightWithIndex_,
  traverse: traverse_,
  sequence,
  traverseWithIndex: traverseWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const witherableRecord: Witherable1<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  wither: wither_,
  wilt: wilt_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export const readonlyRecord: FunctorWithIndex1<URI, string> &
  FoldableWithIndex1<URI, string> &
  FilterableWithIndex1<URI, string> &
  TraversableWithIndex1<URI, string> &
  Witherable1<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  mapWithIndex: mapWithIndex_,
  reduceWithIndex: reduceWithIndex_,
  foldMapWithIndex: foldMapWithIndex_,
  reduceRightWithIndex: reduceRightWithIndex_,
  filterMapWithIndex: filterMapWithIndex_,
  filterWithIndex: filterWithIndex_,
  partitionMapWithIndex: partitionMapWithIndex_,
  partitionWithIndex: partitionWithIndex_,
  traverseWithIndex: traverseWithIndex_,
  wither: wither_,
  wilt: wilt_
}
