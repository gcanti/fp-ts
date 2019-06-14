import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Separated, Compactable1 } from './Compactable'
import { Either } from './Either'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, Refinement } from './function'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { getDictionaryMonoid, Monoid } from './Monoid'
import { none, Option, some as optionSome, isSome } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Show, showString } from './Show'
import { pipeable } from './pipeable'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Foldable2v1 } from './Foldable2v'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Witherable1 } from './Witherable'
import { FoldableWithIndex1 } from './FoldableWithIndex'

/**
 * @since 1.17.0
 */
export const getShow = <A>(S: Show<A>): Show<Record<string, A>> => {
  return {
    show: r => {
      // tslint:disable-next-line: deprecation
      const elements = collect(r, (k, a) => `${showString.show(k)}: ${S.show(a)}`).join(', ')
      return elements === '' ? '{}' : `{ ${elements} }`
    }
  }
}

/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 1.10.0
 */
export const size = <A>(d: Record<string, A>): number => {
  return Object.keys(d).length
}

/**
 * Test whether a record is empty
 *
 * @since 1.10.0
 */
export const isEmpty = <A>(d: Record<string, A>): boolean => {
  return Object.keys(d).length === 0
}

function _collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B> {
  const out: Array<B> = []
  const keys = Object.keys(d).sort()
  for (const key of keys) {
    out.push(f(key, d[key]))
  }
  return out
}

/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const ob: {a: string, b: boolean} = {a: 'foo', b: false}
 * assert.deepStrictEqual(
 *   collect(ob, (key, val) => ({key: key, value: val})),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 1.10.0
 */
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (d: Record<K, A>) => Array<B>
export function collect<A, B>(f: (k: string, a: A) => B): (d: Record<string, A>) => Array<B>
/** @deprecated */
export function collect<K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B>
/** @deprecated */
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>
export function collect(...args: Array<any>): any {
  return args.length === 1 ? <A>(d: Record<string, A>) => _collect(d, args[0]) : _collect(args[0], args[1])
}

/**
 * @since 1.10.0
 */
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]> {
  // tslint:disable-next-line: deprecation
  return collect(d, (k, a: A) => [k, a])
}

/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 1.10.0
 */
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]> {
  return d => {
    const arr = toArray(d)
    const len = arr.length
    return unfoldable.unfoldr(0, b => (b < len ? optionSome([arr[b], b + 1]) : none))
  }
}

/**
 * Use `insertAt`
 *
 * @since 1.10.0
 * @deprecated
 */
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>
/** @deprecated */
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A> {
  if (d[k] === a) {
    return d
  }
  const r = Object.assign({}, d)
  r[k] = a
  return r
}

/**
 * Use `deleteAt`
 *
 * @since 1.10.0
 * @deprecated
 */
export function remove<KS extends string, K extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A>
/** @deprecated */
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A> {
  if (!hasOwnProperty(k, d)) {
    return d
  }
  const r = Object.assign({}, d)
  delete r[k]
  return r
}

function _pop<A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> {
  const a = lookup(k, d)
  // tslint:disable-next-line: deprecation
  return a.isNone() ? none : optionSome([a.value, remove(k, d)])
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.10.0
 */
export function pop<A>(k: string): (d: Record<string, A>) => Option<[A, Record<string, A>]>
/** @deprecated */
export function pop<A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]>
export function pop(...args: Array<any>): any {
  return args.length === 1 ? <A>(d: Record<string, A>) => _pop(args[0], d) : _pop(args[0], args[1])
}

/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 1.14.0
 */
export const isSubrecord = <A>(E: Eq<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => {
  for (let k in d1) {
    if (!hasOwnProperty(k, d2) || !E.equals(d1[k], d2[k])) {
      return false
    }
  }
  return true
}

/**
 * Use `isSubrecord` instead
 * @since 1.10.0
 * @deprecated
 */
export const isSubdictionary: <A>(E: Eq<A>) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = isSubrecord

/**
 * Use `getEq`
 *
 * @since 1.10.0
 * @deprecated
 */
export const getSetoid: typeof getEq = getEq

/**
 * @since 1.19.0
 */
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>>
export function getEq<A>(E: Eq<A>): Eq<Record<string, A>>
export function getEq<A>(E: Eq<A>): Eq<Record<string, A>> {
  const isSubrecordE = isSubrecord(E)
  return fromEquals((x, y) => isSubrecordE(x, y) && isSubrecordE(y, x))
}

/**
 * Returns a `Semigroup` instance for records given a `Semigroup` instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/Record'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 1.10.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>> {
  // tslint:disable-next-line: deprecation
  return getDictionaryMonoid(S)
}

/**
 * Lookup the value for a key in a record
 * @since 1.10.0
 */
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => {
  return hasOwnProperty(key, fa) ? optionSome(fa[key]) : none
}

/**
 * @since 1.10.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>
export function filter<A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>
/** @deprecated */
export function filter<A, B extends A>(fa: Record<string, A>, refinement: Refinement<A, B>): Record<string, B>
/** @deprecated */
export function filter<A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A>
export function filter(...args: Array<any>): any {
  return args.length === 1 ? <A>(fa: Record<string, A>) => record.filter(fa, args[0]) : record.filter(args[0], args[1])
}

/**
 * @since 1.10.0
 */
export const empty: Record<string, never> = {}

/**
 * Use `mapWithIndex`
 *
 * @since 1.10.0
 * @deprecated
 */
export function mapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B> {
  return record.mapWithIndex(fa, f)
}

/**
 * Map a record passing the values to the iterating function
 * @since 1.10.0
 */
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B>
/** @deprecated */
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>
/** @deprecated */
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>
export function map(...args: Array<any>): any {
  return args.length === 1 ? <A>(fa: Record<string, A>) => record.map(fa, args[0]) : record.map(args[0], args[1])
}

/**
 * Reduce object by iterating over it's values.
 *
 * @since 1.10.0
 *
 * @example
 * import { reduce } from 'fp-ts/lib/Record'
 *
 * const joinAllVals = (ob: {[k: string]: string}) => reduce(ob, '', (acc, val) => acc + val)
 *
 * assert.deepStrictEqual(joinAllVals({a: 'foo', b: 'bar'}), 'foobar')
 */
export function reduce<A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B {
  return record.reduce(fa, b, f)
}

/**
 * @since 1.10.0
 */
export function foldMap<M>(
  M: Monoid<M>
): {
  <A>(f: (a: A) => M): (fa: Record<string, A>) => M
  /** @deprecated */
  <A>(fa: Record<string, A>, f: (a: A) => M): M
}
export function foldMap<M>(M: Monoid<M>): any {
  const foldMapM = record.foldMap(M)
  return (...args: Array<any>) =>
    args.length === 1 ? <A>(fa: Record<string, A>) => foldMapM(fa, args[0]) : foldMapM(args[0], args[1])
}

/**
 * Use `reduceRight`
 *
 * @since 1.10.0
 * @deprecated
 */
export function foldr<A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B {
  return record.foldr(fa, b, f)
}

/**
 * Use `reduceWithIndex`
 *
 * @since 1.12.0
 * @deprecated
 */
export function reduceWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B {
  return record.reduceWithIndex(fa, b, f)
}

/**
 * Use `foldMapWithIndex`
 *
 * @since 1.12.0
 * @deprecated
 */
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => {
  return record.foldMapWithIndex(M)(fa, f)
}

/**
 * Use `reduceRightWithIndex`
 *
 * @since 1.12.0
 * @deprecated
 */
export function foldrWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B {
  return record.foldrWithIndex(fa, b, f)
}

/**
 * Create a record with one key/value pair
 *
 * @since 1.10.0
 */
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => {
  return { [k]: a } as any
}

/**
 * Use `traverseWithIndex`
 *
 * @since 1.10.0
 * @deprecated
 */
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
/** @deprecated */
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
/** @deprecated */
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind<F, B>) => Kind<F, Record<string, B>>
/** @deprecated */
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>> {
  return record.traverseWithIndex(F)
}

/**
 * Use `traverse2v`
 *
 * @since 1.10.0
 * @deprecated
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
/** @deprecated */
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
/** @deprecated */
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
/** @deprecated */
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
/** @deprecated */
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind<F, B>) => Kind<F, Record<string, B>>
/** @deprecated */
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>> {
  return record.traverse(F)
}

/**
 * @since 1.10.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(ta: Record<string, Kind3<F, U, L, A>>) => Kind3<F, U, L, Record<string, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(ta: Record<string, Kind3<F, U, L, A>>) => Kind3<F, U, L, Record<string, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(ta: Record<string, Kind2<F, L, A>>) => Kind2<F, L, Record<string, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A>(ta: Record<string, Kind2<F, L, A>>) => Kind2<F, L, Record<string, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <A>(ta: Record<string, Kind<F, A>>) => Kind<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> {
  return traverseWithIndex(F)((_, a) => a)
}

/**
 * @since 1.10.0
 */
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => {
  const r: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (optionA.isSome()) {
      r[key] = optionA.value
    }
  }
  return r
}

/**
 * @since 1.10.0
 */
export function partitionMap<RL, RR, A>(
  f: (a: A) => Either<RL, RR>
): (fa: Record<string, A>) => Separated<Record<string, RL>, Record<string, RR>>
/** @deprecated */
export function partitionMap<RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMap(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.partitionMap(fa, args[0])
    : record.partitionMap(args[0], args[1])
}

/**
 * @since 1.10.0
 */
export function partition<A>(
  predicate: Predicate<A>
): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>
/** @deprecated */
export function partition<A>(
  fa: Record<string, A>,
  predicate: Predicate<A>
): Separated<Record<string, A>, Record<string, A>>
export function partition(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.partition(fa, args[0])
    : record.partition(args[0], args[1])
}

/**
 * @since 1.10.0
 */
export function separate<RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> {
  return record.separate(fa)
}

/**
 * Use `record.wither`
 *
 * @since 1.10.0
 * @deprecated
 */
export function wither<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(wa: Record<string, A>, f: (a: A) => Kind3<F, U, L, Option<B>>) => Kind3<F, U, L, Record<string, B>>
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind3<F, U, L, Option<B>>) => Kind3<F, U, L, Record<string, B>>
export function wither<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(wa: Record<string, A>, f: (a: A) => Kind2<F, L, Option<B>>) => Kind2<F, L, Record<string, B>>
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind2<F, L, Option<B>>) => Kind2<F, L, Record<string, B>>
export function wither<F extends URIS>(
  F: Applicative1<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind<F, Option<B>>) => Kind<F, Record<string, B>>
export function wither<F>(
  F: Applicative<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>
export function wither<F>(
  F: Applicative<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>> {
  return record.wither(F)
}

/**
 * Use `record.wilt`
 *
 * @since 1.10.0
 * @deprecated
 */
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): <U, L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind3<F, U, L, Either<RL, RR>>
) => Kind3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind3<F, U, L, Either<RL, RR>>
) => Kind3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): <L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind2<F, L, Either<RL, RR>>
) => Kind2<F, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind2<F, L, Either<RL, RR>>
) => Kind2<F, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS>(
  F: Applicative1<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind<F, Either<RL, RR>>
) => Kind<F, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F>(
  F: Applicative<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F>(
  F: Applicative<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>> {
  return record.wilt(F)
}

/**
 * @since 1.10.0
 */
export function filterMap<A, B>(f: (a: A) => Option<B>): (fa: Record<string, A>) => Record<string, B>
/** @deprecated */
export function filterMap<A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B>
export function filterMap(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.filterMap(fa, args[0])
    : record.filterMap(args[0], args[1])
}

/**
 * Use `partitionMapWithIndex`
 *
 * @since 1.14.0
 * @deprecated
 */
export function partitionMapWithKey<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> {
  const left: Record<string, RL> = {}
  const right: Record<string, RR> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = f(key, fa[key])
    if (e.isLeft()) {
      left[key] = e.value
    } else {
      right[key] = e.value
    }
  }
  return {
    left,
    right
  }
}

/**
 * Use `partitionWithIndex`
 *
 * @since 1.14.0
 * @deprecated
 */
export function partitionWithKey<K extends string, A>(
  fa: Record<K, A>,
  predicate: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  predicate: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  predicate: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> {
  return record.partitionWithIndex(fa, predicate)
}

/**
 * Use `filterMapWithIndex`
 *
 * @since 1.14.0
 * @deprecated
 */
export function filterMapWithKey<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> {
  return record.filterMapWithIndex(fa, f)
}

/**
 * Use `filterWithIndex`
 *
 * @since 1.14.0
 * @deprecated
 */
export function filterWithKey<K extends string, A>(
  fa: Record<K, A>,
  predicate: (key: K, a: A) => boolean
): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, predicate: (key: string, a: A) => boolean): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, predicate: (key: string, a: A) => boolean): Record<string, A> {
  return record.filterWithIndex(fa, predicate)
}

/**
 * Create a record from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.10.0
 */
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K extends string, U, L, A>(ta: Kind3<F, U, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K extends string, L, A>(ta: Kind2<F, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K extends string, A>(ta: Kind<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <K extends string, A>(ta: HKT<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, onConflict: (existing: A, a: A) => A) => Record<string, A> {
  return <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => {
    return F.reduce<[string, A], Record<string, A>>(ta, {}, (b, [k, a]) => {
      b[k] = hasOwnProperty(k, b) ? f(b[k], a) : a
      return b
    })
  }
}

/**
 * Create a record from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
 * import { array, zip } from 'fp-ts/lib/Array'
 * import { identity } from 'fp-ts/lib/function'
 * import { fromFoldableMap } from 'fp-ts/lib/Record'
 *
 * // like lodash `zipObject` or ramda `zipObj`
 * export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
 *   fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * // build a record from a field
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * const users: Array<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 1.16.0
 */
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <U, L, A, K extends string>(ta: Kind3<F, U, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <L, A, K extends string>(ta: Kind2<F, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(ta: Kind<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, K extends string>(ta: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B> {
  return <A>(ta: HKT<F, A>, f: (a: A) => [string, B]) => {
    return F.reduce<A, Record<string, B>>(ta, {}, (r, a) => {
      const [k, b] = f(a)
      r[k] = hasOwnProperty(k, r) ? M.concat(r[k], b) : b
      return r
    })
  }
}

/**
 * @since 1.14.0
 */
export function every<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (!predicate(fa[k])) {
      return false
    }
  }
  return true
}

/**
 * @since 1.14.0
 */
export function some<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean {
  for (const k in fa) {
    if (predicate(fa[k])) {
      return true
    }
  }
  return false
}

/**
 * @since 1.14.0
 */
export function elem<A>(E: Eq<A>): (a: A, fa: { [key: string]: A }) => boolean {
  return (a, fa) => some(fa, x => E.equals(x, a))
}

/**
 * @since 1.12.0
 */
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  f: (key: K, a: A) => Either<RL, RR>
): (fa: Record<K, A>) => Separated<Record<string, RL>, Record<string, RR>>
/** @deprecated */
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
/** @deprecated */
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.partitionMapWithIndex(fa, args[0])
    : record.partitionMapWithIndex(args[0], args[1])
}

/**
 * @since 1.12.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
/** @deprecated */
export function partitionWithIndex<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
/** @deprecated */
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.partitionWithIndex(fa, args[0])
    : record.partitionWithIndex(args[0], args[1])
}

/**
 * @since 1.12.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: Record<K, A>) => Record<string, B>
/** @deprecated */
export function filterMapWithIndex<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
/** @deprecated */
export function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithIndex(...args: Array<any>): any {
  return args.length === 1
    ? <A>(fa: Record<string, A>) => record.filterMapWithIndex(fa, args[0])
    : record.filterMapWithIndex(args[0], args[1])
}

//
// backporting
//

/**
 * @since 1.12.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A>
/** @deprecated */
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
/** @deprecated */
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithIndex(...args: Array<any>): any {
  return args.length === 1
    ? <K extends string, A>(fa: Record<K, A>) => record.filterWithIndex(fa, args[0])
    : record.filterWithIndex(args[0], args[1])
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.19.0
 */
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A>
export function insertAt<A>(k: string, a: A): (r: Record<string, A>) => Record<string, A> {
  // tslint:disable-next-line: deprecation
  return r => insert(k, a, r)
}

/**
 * Delete a key and value from a map
 *
 * @since 1.19.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(d: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: Record<string, A>) => Record<string, A> {
  // tslint:disable-next-line: deprecation
  return r => remove(k, r)
}

declare module './HKT' {
  interface URItoKind<A> {
    Record: Record<string, A>
  }
}

/**
 * @since 1.19.0
 */
export const URI = 'Record'

/**
 * @since 1.19.0
 */
export type URI = typeof URI

/**
 * Map a record passing the keys to the iterating function
 *
 * @since 1.19.0
 */
export function mapWithIndex<K extends string, A, B>(f: (k: K, a: A) => B): (fa: Record<K, A>) => Record<K, B>
export function mapWithIndex<A, B>(f: (k: string, a: A) => B): (fa: Record<string, A>) => Record<string, B> {
  return fa => record.mapWithIndex(fa, f)
}

/**
 * @since 1.19.0
 */
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B
export function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: Record<string, A>) => B {
  return fa => record.reduceWithIndex(fa, b, f)
}

/**
 * @since 1.19.0
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
export function foldMapWithIndex<M>(M: Monoid<M>): <A>(f: (k: string, a: A) => M) => (fa: Record<string, A>) => M {
  const foldMapWithIndexM = record.foldMapWithIndex(M)
  return f => fa => foldMapWithIndexM(fa, f)
}

/**
 * @since 1.19.0
 */
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B
export function reduceRightWithIndex<A, B>(b: B, f: (k: string, a: A, b: B) => B): (fa: Record<string, A>) => B {
  return fa => record.foldrWithIndex(fa, b, f)
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @since 1.19.0
 */
export function hasOwnProperty<K extends string, A>(k: K, d: Record<K, A>): boolean {
  return _hasOwnProperty.call(d, k)
}

/**
 * @since 1.19.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(
  f: (k: K, a: A) => Kind3<F, U, L, B>
) => (ta: Record<K, A>) => Kind3<F, U, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(f: (k: K, a: A) => Kind2<F, L, B>) => (ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, L, B>) => (ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  const traverseWithIndexF = record.traverseWithIndex(F)
  return f => ta => traverseWithIndexF(ta, f)
}

/**
 * @since 1.19.0
 */
export function traverse2v<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(f: (a: A) => Kind3<F, U, L, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, U, L, Record<K, B>>
export function traverse2v<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(f: (a: A) => Kind2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverse2v<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(f: (a: A) => Kind2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverse2v<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverse2v<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverse2v<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return f => traverseWithIndexF((_, a) => f(a))
}

/**
 * @since 1.19.0
 */
export const record: FunctorWithIndex1<URI, string> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = {
  URI,
  map: (fa, f) => record.mapWithIndex(fa, (_, a) => f(a)),
  reduce: (fa, b, f) => record.reduceWithIndex(fa, b, (_, b, a) => f(b, a)),
  foldMap: M => {
    const foldMapWithIndexM = record.foldMapWithIndex(M)
    return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
  },
  foldr: (fa, b, f) => record.foldrWithIndex(fa, b, (_, a, b) => f(a, b)),
  traverse: <F>(
    F: Applicative<F>
  ): (<A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>) => {
    const traverseWithIndexF = record.traverseWithIndex(F)
    return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
  },
  sequence,
  compact: <A>(fa: Record<string, Option<A>>): Record<string, A> => {
    const r: Record<string, A> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const optionA = fa[key]
      if (isSome(optionA)) {
        r[key] = optionA.value
      }
    }
    return r
  },
  separate: <RL, RR>(fa: Record<string, Either<RL, RR>>): Separated<Record<string, RL>, Record<string, RR>> => {
    const left: Record<string, RL> = {}
    const right: Record<string, RR> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const e = fa[key]
      switch (e._tag) {
        case 'Left':
          left[key] = e.value
          break
        case 'Right':
          right[key] = e.value
          break
      }
    }
    return {
      left,
      right
    }
  },
  filter: <A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A> => {
    return record.filterWithIndex(fa, (_, a) => predicate(a))
  },
  filterMap: (fa, f) => record.filterMapWithIndex(fa, (_, a) => f(a)),
  partition: <A>(fa: Record<string, A>, predicate: Predicate<A>): Separated<Record<string, A>, Record<string, A>> => {
    return record.partitionWithIndex(fa, (_, a) => predicate(a))
  },
  partitionMap: (fa, f) => record.partitionMapWithIndex(fa, (_, a) => f(a)),
  wither: <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>) => {
    const traverseF = record.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), record.compact)
  },
  wilt: <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Record<string, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>) => {
    const traverseF = record.traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), record.separate)
  },
  mapWithIndex: <A, B>(fa: Record<string, A>, f: (k: string, a: A) => B) => {
    const out: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      out[key] = f(key, fa[key])
    }
    return out
  },
  reduceWithIndex: (fa, b, f) => {
    let out = b
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const k = keys[i]
      out = f(k, out, fa[k])
    }
    return out
  },
  foldMapWithIndex: M => (fa, f) => {
    let out = M.empty
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const k = keys[i]
      out = M.concat(out, f(k, fa[k]))
    }
    return out
  },
  foldrWithIndex: (fa, b, f) => {
    let out = b
    const keys = Object.keys(fa).sort()
    const len = keys.length
    for (let i = len - 1; i >= 0; i--) {
      const k = keys[i]
      out = f(k, fa[k], out)
    }
    return out
  },
  traverseWithIndex: <F>(F: Applicative<F>) => <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => {
    const keys = Object.keys(ta)
    if (keys.length === 0) {
      return F.of(empty)
    }
    let fr: HKT<F, Record<string, B>> = F.of({})
    for (const key of keys) {
      fr = F.ap(
        F.map(fr, r => (b: B) => {
          r[key] = b
          return r
        }),
        f(key, ta[key])
      )
    }
    return fr
  },
  partitionMapWithIndex: <RL, RR, A>(fa: Record<string, A>, f: (key: string, a: A) => Either<RL, RR>) => {
    const left: Record<string, RL> = {}
    const right: Record<string, RR> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const e = f(key, fa[key])
      switch (e._tag) {
        case 'Left':
          left[key] = e.value
          break
        case 'Right':
          right[key] = e.value
          break
      }
    }
    return {
      left,
      right
    }
  },
  partitionWithIndex: <A>(fa: Record<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
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
  },
  filterMapWithIndex: <A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>) => {
    const r: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const optionB = f(key, fa[key])
      if (isSome(optionB)) {
        r[key] = optionB.value
      }
    }
    return r
  },
  filterWithIndex: <A>(fa: Record<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) => {
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
}

const { reduceRight } = pipeable(record)

export { reduceRight }
