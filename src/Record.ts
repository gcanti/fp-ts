/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1 } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable as FoldableHKT, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { pipe } from './function'
import { flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import * as _ from './internal'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { Predicate } from './Predicate'
import * as RR from './ReadonlyRecord'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import { Separated } from './Separated'
import { Show } from './Show'
import * as S from './string'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { PipeableWilt1, PipeableWither1, wiltDefault, Witherable1, witherDefault } from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `Record`.
 *
 * @since 2.0.0
 */
export const size: (r: Record<string, unknown>) => number = RR.size

/**
 * Test whether a `Record` is empty.
 *
 * @since 2.0.0
 */
export const isEmpty: (r: Record<string, unknown>) => boolean = RR.isEmpty

const keys_ = (O: Ord<string>) => <K extends string>(r: Record<K, unknown>): Array<K> =>
  (Object.keys(r) as any).sort(O.compare)

/**
 * @since 2.0.0
 */
export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> =
  /*#__PURE__*/
  keys_(S.Ord)

/**
 * Map a `Record` into an `Array`.
 *
 * @example
 * import { collect } from 'fp-ts/Record'
 * import { Ord } from 'fp-ts/string'
 *
 * const x: { readonly a: string, readonly b: boolean } = { a: 'c', b: false }
 * assert.deepStrictEqual(
 *   collect(Ord)((key, val) => ({ key: key, value: val }))(x),
 *   [{ key: 'a', value: 'c' }, { key: 'b', value: false }]
 * )
 *
 * @since 2.0.0
 */
export function collect(O: Ord<string>): <K extends string, A, B>(f: (k: K, a: A) => B) => (r: Record<K, A>) => Array<B>
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: Record<K, A>) => Array<B>
export function collect<A, B>(
  O: Ord<string> | ((k: string, a: A) => B)
):
  | (<K extends string, A, B>(f: (k: K, a: A) => B) => (r: Record<K, A>) => Array<B>)
  | ((r: Record<string, A>) => Array<B>) {
  if (typeof O === 'function') {
    return collect(S.Ord)(O)
  }
  const keysO = keys_(O)
  return <K extends string, A, B>(f: (k: K, a: A) => B) => (r: Record<K, A>) => {
    const out: Array<B> = []
    for (const key of keysO(r)) {
      out.push(f(key, r[key]))
    }
    return out
  }
}

/**
 * Get a sorted `Array` of the key/value pairs contained in a `Record`.
 *
 * @since 2.0.0
 */
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> =
  /*#__PURE__*/
  collect(S.Ord)((k, a) => [k, a])

/**
 * Unfolds a `Record` into a list of key/value pairs.
 *
 * @since 2.0.0
 */
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <A>(r: Record<string, A>) => HKT<F, [string, A]> {
  return (r) => {
    const sas = toArray(r)
    const len = sas.length
    return U.unfold(0, (b) => (b < len ? _.some([sas[b], b + 1]) : _.none))
  }
}

/**
 * Insert or replace a key/value pair in a `Record`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const upsertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A> = RR.upsertAt

/**
 * Test whether or not a key exists in a `Record`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @since 2.10.0
 */
export const has: <K extends string>(k: string, r: Record<K, unknown>) => k is K = RR.has

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Delete a key and value from a `Record`.
 *
 * @since 2.0.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: Record<string, A>) => Record<string, A> {
  return <A>(r: Record<string, A>) => {
    if (!_hasOwnProperty.call(r, k)) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    delete out[k]
    return out
  }
}

/**
 * @since 2.0.0
 */
export const updateAt = <A>(k: string, a: A): (<K extends string>(r: Record<K, A>) => Option<Record<K, A>>) =>
  modifyAt(k, () => a)

/**
 * @since 2.0.0
 */
export const modifyAt = <A>(k: string, f: (a: A) => A) => <K extends string>(r: Record<K, A>): Option<Record<K, A>> => {
  if (!has(k, r)) {
    return _.none
  }
  const out: Record<K, A> = Object.assign({}, r)
  out[k] = f(r[k])
  return _.some(out)
}

/**
 * Delete a key and value from a `Record`, returning the value as well as the subsequent `Record`.
 *
 * @since 2.0.0
 */
export function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]>
export function pop(k: string): <A>(r: Record<string, A>) => Option<[A, Record<string, A>]> {
  const deleteAtk = deleteAt(k)
  return (r) => {
    const oa = lookup(k, r)
    return _.isNone(oa) ? _.none : _.some([oa.value, deleteAtk(r)])
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether one `Record` contains all of the keys and values contained in another `Record`.
 *
 * @since 2.0.0
 */
export const isSubrecord: <A>(
  E: Eq<A>
) => {
  (that: Record<string, A>): (me: Record<string, A>) => boolean
  (me: Record<string, A>, that: Record<string, A>): boolean
} = RR.isSubrecord

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Record`.
 *
 * @since 2.0.0
 */
export const lookup: {
  (k: string): <A>(r: Record<string, A>) => Option<A>
  <A>(k: string, r: Record<string, A>): Option<A>
} = RR.lookup

/**
 * Map a `Record` passing the keys to the iterating function.
 *
 * @since 2.0.0
 */
export const mapWithIndex: <K extends string, A, B>(f: (k: K, a: A) => B) => (fa: Record<K, A>) => Record<K, B> =
  RR.mapWithIndex

/**
 * Map a `Record` passing the values to the iterating function.
 *
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <K extends string>(fa: Record<K, A>) => Record<K, B> = RR.map

/**
 * @since 2.0.0
 */
export function reduceWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: Record<K, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B
export function reduceWithIndex(
  ...args: [Ord<string>] | [unknown, (k: unknown, b: unknown, a: unknown) => unknown]
):
  | ((b: unknown, f: (k: unknown, b: unknown, a: unknown) => unknown) => (fa: Record<string, unknown>) => unknown)
  | ((fa: Record<string, unknown>) => unknown) {
  if (args.length === 2) {
    // tslint:disable-next-line: deprecation
    return RR.reduceWithIndex(args[0], args[1])
  }
  return RR.reduceWithIndex(args[0])
}

/**
 * @since 2.0.0
 */
export function foldMapWithIndex(
  O: Ord<string>
): <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
export function foldMapWithIndex(
  arg: Ord<string> | Monoid<unknown>
):
  | ((M: Monoid<unknown>) => (f: (k: string, a: unknown) => unknown) => (fa: Record<string, unknown>) => unknown)
  | ((f: (k: string, a: unknown) => unknown) => (fa: Record<string, unknown>) => unknown) {
  if ('compare' in arg) {
    return RR.foldMapWithIndex(arg)
  }
  // tslint:disable-next-line: deprecation
  return RR.foldMapWithIndex(arg)
}

/**
 * @since 2.0.0
 */
export function reduceRightWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: Record<K, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B
export function reduceRightWithIndex(
  ...args: [Ord<string>] | [unknown, (k: string, a: unknown, b: unknown) => unknown]
):
  | ((b: unknown, f: (k: string, a: unknown, b: unknown) => unknown) => (fa: Record<string, unknown>) => unknown)
  | ((fa: Record<string, unknown>) => unknown) {
  if (args.length === 2) {
    // tslint:disable-next-line: deprecation
    return RR.reduceRightWithIndex(args[0], args[1])
  }
  return RR.reduceRightWithIndex(args[0])
}

/**
 * Create a `Record` with one key/value pair.
 *
 * @since 2.0.0
 */
export const singleton: <A>(k: string, a: A) => Record<string, A> = RR.singleton

/**
 * @since 2.0.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  return RR.traverseWithIndex(F)
}

/**
 * @since 2.0.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Record<string, A>) => HKT<F, Record<string, B>> {
  return RR.traverse(F)
}

/**
 * @since 2.0.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Kind<F, A>>) => Kind<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> {
  return RR.sequence(F)
}

/**
 * @category Witherable
 * @since 2.6.5
 */
export const wither: PipeableWither1<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (fa: Record<string, A>) => HKT<F, Record<string, B>>) => {
  const traverseF = traverse(F)
  return (f) => (fa) => F.map(pipe(fa, traverseF(f)), compact)
}

/**
 * @category Witherable
 * @since 2.6.5
 */
export const wilt: PipeableWilt1<URI> = <F>(
  F: Applicative<F>
): (<A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (fa: Record<string, A>) => HKT<F, Separated<Record<string, B>, Record<string, C>>>) => {
  const traverseF = traverse(F)
  return (f) => (fa) => F.map(pipe(fa, traverseF(f)), separate)
}

/**
 * @since 2.0.0
 */
export const partitionMapWithIndex: <K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
) => (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>> = RR.partitionMapWithIndex

/**
 * @since 2.0.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>> {
  return RR.partitionWithIndex(predicateWithIndex)
}

/**
 * @since 2.0.0
 */
export const filterMapWithIndex: <K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
) => (fa: Record<K, A>) => Record<string, B> = RR.filterMapWithIndex

/**
 * @since 2.0.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: Record<string, A>) => Record<string, A> {
  return RR.filterWithIndex(predicateWithIndex)
}

/**
 * Create a `Record` from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.0.0
 */
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, [string, A]>) => Record<string, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, [string, A]>) => Record<string, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, [string, A]>) => Record<string, A>
export function fromFoldable<F, A>(M: Magma<A>, F: FoldableHKT<F>): (fka: HKT<F, [string, A]>) => Record<string, A>
export function fromFoldable<F, A>(M: Magma<A>, F: FoldableHKT<F>): (fka: HKT<F, [string, A]>) => Record<string, A> {
  return RR.fromFoldable(M, F)
}

/**
 * Create a `Record` from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { last } from 'fp-ts/Semigroup'
 * import { Foldable, zip } from 'fp-ts/Array'
 * import { identity } from 'fp-ts/function'
 * import { fromFoldableMap } from 'fp-ts/Record'
 *
 * export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
 *   fromFoldableMap(last<A>(), Foldable)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * interface User {
 *   readonly id: string
 *   readonly name: string
 * }
 *
 * const users: Array<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(last<User>(), Foldable)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 2.0.0
 */
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => [string, B]) => Record<string, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A>(fa: Kind2<F, E, A>, f: (a: A) => [string, B]) => Record<string, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A>(fa: Kind<F, A>, f: (a: A) => [string, B]) => Record<string, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B> {
  return RR.fromFoldableMap(M, F)
}

/**
 * @since 2.0.0
 */
export const every: <A>(predicate: Predicate<A>) => (r: Record<string, A>) => boolean = RR.every

/**
 * @since 2.0.0
 */
export const some: <A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean = RR.some

// TODO: remove non-curried overloading in v3
/**
 * @since 2.0.0
 */
export const elem: <A>(
  E: Eq<A>
) => {
  (a: A): (fa: Record<string, A>) => boolean
  (a: A, fa: Record<string, A>): boolean
} = RR.elem

/**
 * @category combinators
 * @since 2.11.0
 */
export const union = <A>(
  M: Magma<A>
): ((second: Record<string, A>) => (first: Record<string, A>) => Record<string, A>) => {
  const unionM = RR.union(M)
  return (second) => (first) => {
    if (isEmpty(first)) {
      return { ...second }
    }
    if (isEmpty(second)) {
      return { ...first }
    }
    return unionM(second)(first)
  }
}

/**
 * @category combinators
 * @since 2.11.0
 */
export const intersection = <A>(M: Magma<A>) => (second: Record<string, A>) => (
  first: Record<string, A>
): Record<string, A> => {
  if (isEmpty(first) || isEmpty(second)) {
    return {}
  }
  return RR.intersection(M)(second)(first)
}

/**
 * @category combinators
 * @since 2.11.0
 */
export const difference = <A>(second: Record<string, A>) => (first: Record<string, A>): Record<string, A> => {
  if (isEmpty(first)) {
    return { ...second }
  }
  if (isEmpty(second)) {
    return { ...first }
  }
  return RR.difference(second)(first)
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map = RR._map
const _mapWithIndex = RR._mapWithIndex
const _reduce = RR._reduce
const _foldMap = RR._foldMap
const _reduceRight = RR._reduceRight
const _filter = RR._filter
const _filterMap = RR._filterMap
const _partition = RR._partition
const _partitionMap = RR._partitionMap
const _reduceWithIndex = RR._reduceWithIndex
const _foldMapWithIndex = RR._foldMapWithIndex
const _reduceRightWithIndex = RR._reduceRightWithIndex
const _partitionMapWithIndex = RR._partitionMapWithIndex
const _partitionWithIndex = RR._partitionWithIndex
const _filterMapWithIndex = RR._filterMapWithIndex
const _filterWithIndex = RR._filterWithIndex
const _traverse = RR._traverse
const _sequence = RR._sequence
const _traverseWithIndex = (O: Ord<string>) => <F>(
  F: Applicative<F>
): (<A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>) => {
  const keysO = keys_(O)
  return <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => {
    const ks = keysO(ta)
    if (ks.length === 0) {
      return F.of({})
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
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Filterable
 * @since 2.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>
} = RR.filter

/**
 * @category Filterable
 * @since 2.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B> = RR.filterMap

/**
 * @category Foldable
 * @since 2.0.0
 */
export function foldMap(O: Ord<string>): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
export function foldMap(
  O: Ord<string> | Monoid<unknown>
):
  | ((M: Monoid<unknown>) => (f: (a: unknown) => unknown) => (fa: Record<string, unknown>) => unknown)
  | ((f: (a: unknown) => unknown) => (fa: Record<string, unknown>) => unknown) {
  if ('compare' in O) {
    return RR.foldMap(O)
  }
  // tslint:disable-next-line: deprecation
  return RR.foldMap(O)
}

/**
 * @category Filterable
 * @since 2.0.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: Record<string, A>
  ) => Separated<Record<string, A>, Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>
} = RR.partition

/**
 * @category Filterable
 * @since 2.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>> = RR.partitionMap

/**
 * @category Foldable
 * @since 2.0.0
 */
export function reduce(O: Ord<string>): <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: Record<string, A>) => B
export function reduce<A, B>(
  ...args: [Ord<string>] | [B, (b: B, a: A) => B]
): ((b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B) | ((fa: Record<string, A>) => B) {
  return args.length === 2 ? RR.reduce(S.Ord)(...args) : RR.reduce(args[0])
}

/**
 * @category Foldable
 * @since 2.0.0
 */
export function reduceRight(O: Ord<string>): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: Record<string, A>) => B
export function reduceRight(
  ...args: [Ord<string>] | [unknown, (a: unknown, b: unknown) => unknown]
):
  | ((b: unknown, f: (a: unknown, b: unknown) => unknown) => (fa: Record<string, unknown>) => unknown)
  | ((fa: Record<string, unknown>) => unknown) {
  if (args.length === 2) {
    // tslint:disable-next-line: deprecation
    return RR.reduceRight(args[0], args[1])
  }
  return RR.reduceRight(args[0])
}

/**
 * @category Compactable
 * @since 2.0.0
 */
export const compact: <A>(fa: Record<string, Option<A>>) => Record<string, A> = RR.compact

/**
 * @category Compactable
 * @since 2.0.0
 */
export const separate: <A, B>(fa: Record<string, Either<A, B>>) => Separated<Record<string, A>, Record<string, B>> =
  RR.separate

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Record'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Record<string, A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<Record<string, A>>
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @category instances
 * @deprecated
 */
export function getShow<A>(S: Show<A>): Show<Record<string, A>>
export function getShow(
  arg: Ord<string> | Show<unknown>
): ((S: Show<unknown>) => Show<Record<string, unknown>>) | Show<Record<string, unknown>> {
  if ('compare' in arg) {
    return RR.getShow(arg)
  }
  // tslint:disable-next-line: deprecation
  return RR.getShow(arg)
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq: <K extends string, A>(E: Eq<A>) => Eq<Record<K, A>> = RR.getEq

/**
 * Returns a `Monoid` instance for `Record`s given a `Semigroup` instance for their values.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/Record'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @category instances
 * @since 2.0.0
 */
export const getMonoid: <K extends string, A>(S: Semigroup<A>) => Monoid<Record<K, A>> = RR.getMonoid

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor1<URI> = {
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
 * @since 2.7.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, string> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getFoldable = (O: Ord<string>): Foldable1<URI> => ({
  URI,
  reduce: _reduce(O),
  foldMap: _foldMap(O),
  reduceRight: _reduceRight(O)
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getFoldableWithIndex = (O: Ord<string>): FoldableWithIndex1<URI, string> => ({
  URI,
  reduce: _reduce(O),
  foldMap: _foldMap(O),
  reduceRight: _reduceRight(O),
  reduceWithIndex: _reduceWithIndex(O),
  foldMapWithIndex: _foldMapWithIndex(O),
  reduceRightWithIndex: _reduceRightWithIndex(O)
})

/**
 * @category instances
 * @since 2.7.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Filterable: Filterable1<URI> = {
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
 * @since 2.7.0
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, string> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap,
  filterMapWithIndex: _filterMapWithIndex,
  filterWithIndex: _filterWithIndex,
  partitionMapWithIndex: _partitionMapWithIndex,
  partitionWithIndex: _partitionWithIndex
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getTraversable = (O: Ord<string>): Traversable1<URI> => ({
  URI,
  map: _map,
  reduce: _reduce(O),
  foldMap: _foldMap(O),
  reduceRight: _reduceRight(O),
  traverse: _traverse(O),
  sequence: _sequence(O)
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getTraversableWithIndex = (O: Ord<string>): TraversableWithIndex1<URI, string> => ({
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  reduce: _reduce(O),
  foldMap: _foldMap(O),
  reduceRight: _reduceRight(O),
  reduceWithIndex: _reduceWithIndex(O),
  foldMapWithIndex: _foldMapWithIndex(O),
  reduceRightWithIndex: _reduceRightWithIndex(O),
  traverse: _traverse(O),
  sequence: _sequence(O),
  traverseWithIndex: _traverseWithIndex(O)
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getWitherable = (O: Ord<string>): Witherable1<URI> => {
  const T = getTraversable(O)
  return {
    URI,
    map: _map,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    traverse: T.traverse,
    sequence: T.sequence,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: witherDefault(T, Compactable),
    wilt: wiltDefault(T, Compactable)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getUnionSemigroup = <A>(S: Semigroup<A>): Semigroup<Record<string, A>> => {
  const unionS = union(S)
  return {
    concat: (first, second) => unionS(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<Record<string, A>> => ({
  concat: getUnionSemigroup(S).concat,
  empty: {}
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getIntersectionSemigroup = <A>(S: Semigroup<A>): Semigroup<Record<string, A>> => {
  const intersectionS = intersection(S)
  return {
    concat: (first, second) => intersectionS(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getDifferenceMagma = <A>(): Magma<Record<string, A>> => ({
  concat: (first, second) => difference(second)(first)
})

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `getFoldable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord)
}

/**
 * Use `getFoldableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, string> = {
  URI,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord),
  reduceWithIndex: _reduceWithIndex(S.Ord),
  foldMapWithIndex: _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: _reduceRightWithIndex(S.Ord)
}

/**
 * Use `getTraversable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const Traversable: Traversable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord),
  traverse: _traverse(S.Ord),
  sequence
}

/**
 * Use the `getTraversableWithIndex` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, string> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord),
  reduceWithIndex: _reduceWithIndex(S.Ord),
  foldMapWithIndex: _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: _reduceRightWithIndex(S.Ord),
  traverse: _traverse(S.Ord),
  sequence,
  traverseWithIndex: _traverseWithIndex(S.Ord)
}

// tslint:disable-next-line: deprecation
const _wither = witherDefault(Traversable, Compactable)
// tslint:disable-next-line: deprecation
const _wilt = wiltDefault(Traversable, Compactable)

/**
 * Use `getWitherable` instead.
 *
 * @category instances
 * @since 2.7.0
 * @deprecated
 */
export const Witherable: Witherable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord),
  traverse: _traverse(S.Ord),
  sequence,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap,
  wither: _wither,
  wilt: _wilt
}

/**
 * Use a new `{}` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const empty: Record<string, never> = {}

/**
 * Use `upsertAt` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const insertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A> = upsertAt

/**
 * Use `has` instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const hasOwnProperty: <K extends string>(k: string, r: Record<K, unknown>) => k is K = RR.has

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const record: FunctorWithIndex1<URI, string> &
  FoldableWithIndex1<URI, string> &
  FilterableWithIndex1<URI, string> &
  TraversableWithIndex1<URI, string> &
  Witherable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce(S.Ord),
  foldMap: _foldMap(S.Ord),
  reduceRight: _reduceRight(S.Ord),
  traverse: _traverse(S.Ord),
  sequence,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap,
  mapWithIndex: _mapWithIndex,
  reduceWithIndex: _reduceWithIndex(S.Ord),
  foldMapWithIndex: _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: _reduceRightWithIndex(S.Ord),
  filterMapWithIndex: _filterMapWithIndex,
  filterWithIndex: _filterWithIndex,
  partitionMapWithIndex: _partitionMapWithIndex,
  partitionWithIndex: _partitionWithIndex,
  traverseWithIndex: _traverseWithIndex(S.Ord),
  wither: _wither,
  wilt: _wilt
}
