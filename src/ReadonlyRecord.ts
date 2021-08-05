/**
 * @since 2.5.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1 } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable as FoldableHKT, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { flow, identity, pipe, SK } from './function'
import { flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import * as _ from './internal'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { Predicate } from './Predicate'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
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
 * @category model
 * @since 2.5.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 2.5.0
 */
export const fromRecord = <K extends string, A>(r: Record<K, A>): ReadonlyRecord<K, A> => Object.assign({}, r)

/**
 * @category interop
 * @since 2.5.0
 */
export const toRecord = <K extends string, A>(r: ReadonlyRecord<K, A>): Record<K, A> => Object.assign({}, r)

/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`,
 *
 * @since 2.5.0
 */
export const size = <A>(r: ReadonlyRecord<string, A>): number => Object.keys(r).length

/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @since 2.5.0
 */
export const isEmpty = <A>(r: ReadonlyRecord<string, A>): boolean => {
  for (const k in r) {
    if (_.has.call(r, k)) {
      return false
    }
  }
  return true
}

const keys_ = (O: Ord<string>) => <K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> =>
  (Object.keys(r) as any).sort(O.compare)

/**
 * @since 2.5.0
 */
export const keys: <K extends string>(r: ReadonlyRecord<K, unknown>) => ReadonlyArray<K> =
  /*#__PURE__*/
  keys_(S.Ord)

/**
 * Map a `ReadonlyRecord` into an `ReadonlyArray`.
 *
 * @example
 * import { collect } from 'fp-ts/ReadonlyRecord'
 * import { Ord } from 'fp-ts/string'
 *
 * const x: { readonly a: string, readonly b: boolean } = { a: 'c', b: false }
 * assert.deepStrictEqual(
 *   collect(Ord)((key, val) => ({ key: key, value: val }))(x),
 *   [{ key: 'a', value: 'c' }, { key: 'b', value: false }]
 * )
 *
 * @since 2.5.0
 */
export function collect(
  O: Ord<string>
): <K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>
export function collect<A, B>(
  O: Ord<string> | ((k: string, a: A) => B)
):
  | (<K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>)
  | ((r: ReadonlyRecord<string, A>) => ReadonlyArray<B>) {
  if (typeof O === 'function') {
    return collect(S.Ord)(O)
  }
  const keysO = keys_(O)
  return <K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => {
    const out: Array<B> = []
    for (const key of keysO(r)) {
      out.push(f(key, r[key]))
    }
    return out
  }
}

/**
 * Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.
 *
 * @since 2.5.0
 */
export const toReadonlyArray: <K extends string, A>(r: ReadonlyRecord<K, A>) => ReadonlyArray<readonly [K, A]> =
  /*#__PURE__*/
  collect(S.Ord)((k, a) => [k, a])

/**
 * Unfolds a `ReadonlyRecord` into a list of key/value pairs.
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
    const sas = toReadonlyArray(r)
    const len = sas.length
    return U.unfold(0, (b) => (b < len ? _.some([sas[b], b + 1]) : _.none))
  }
}

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.10.0
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
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @since 2.10.0
 */
export const has = <K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K => _.has.call(r, k)

/**
 * Delete a key and value from a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.5.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return <A>(r: ReadonlyRecord<string, A>) => {
    if (!_.has.call(r, k)) {
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
export const updateAt = <A>(k: string, a: A) => <K extends string>(
  r: ReadonlyRecord<K, A>
): Option<ReadonlyRecord<K, A>> => {
  if (!has(k, r)) {
    return _.none
  }
  if (r[k] === a) {
    return _.some(r)
  }
  const out: Record<K, A> = Object.assign({}, r)
  out[k] = a
  return _.some(out)
}

/**
 * @since 2.5.0
 */
export const modifyAt = <A>(k: string, f: (a: A) => A) => <K extends string>(
  r: ReadonlyRecord<K, A>
): Option<ReadonlyRecord<K, A>> => {
  if (!has(k, r)) {
    return _.none
  }
  const next = f(r[k])
  if (next === r[k]) {
    return _.some(r)
  }
  const out: Record<K, A> = Object.assign({}, r)
  out[k] = next
  return _.some(out)
}

/**
 * Delete a key and value from a `ReadonlyRecord`, returning the value as well as the subsequent `ReadonlyRecord`.
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
    return _.isNone(oa) ? _.none : _.some([oa.value, deleteAtk(r)])
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.
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
      if (!_.has.call(that, k) || !E.equals(me[k], that[k])) {
        return false
      }
    }
    return true
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `ReadonlyRecord`.
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
  return _.has.call(r, k) ? _.some(r[k]) : _.none
}

/**
 * @since 2.5.0
 */
export const empty: ReadonlyRecord<string, never> = {}

/**
 * Map a `ReadonlyRecord` passing the keys to the iterating function.
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
 * Map a `ReadonlyRecord` passing the values to the iterating function.
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
export function reduceWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: ReadonlyRecord<K, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceWithIndex<A, B>(
  ...args: [Ord<string>] | [B, (k: string, b: B, a: A) => B]
):
  | ((b: B, f: (k: string, b: B, a: A) => B) => (fa: ReadonlyRecord<string, A>) => B)
  | ((fa: ReadonlyRecord<string, A>) => B) {
  if (args.length === 2) {
    return reduceWithIndex(S.Ord)(...args)
  }
  const keysO = keys_(args[0])
  return (b, f) => (fa) => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa[k])
    }
    return out
  }
}

/**
 * @since 2.5.0
 */
export function foldMapWithIndex(
  O: Ord<string>
): <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
export function foldMapWithIndex<M>(
  O: Ord<string> | Monoid<M>
):
  | ((M: Monoid<M>) => <A>(f: (k: string, a: A) => M) => (fa: ReadonlyRecord<string, A>) => M)
  | (<A>(f: (k: string, a: A) => M) => (fa: ReadonlyRecord<string, A>) => M) {
  if ('compare' in O) {
    const keysO = keys_(O)
    return (M: Monoid<M>) => <A>(f: (k: string, a: A) => M) => (fa: ReadonlyRecord<string, A>) => {
      let out: M = M.empty
      const ks = keysO(fa)
      const len = ks.length
      for (let i = 0; i < len; i++) {
        const k = ks[i]
        out = M.concat(out, f(k, fa[k]))
      }
      return out
    }
  }
  return foldMapWithIndex(S.Ord)(O)
}

/**
 * @since 2.5.0
 */
export function reduceRightWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: ReadonlyRecord<K, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceRightWithIndex<A, B>(
  ...args: [Ord<string>] | [B, (k: string, a: A, b: B) => B]
):
  | ((b: B, f: (k: string, a: A, b: B) => B) => (fa: ReadonlyRecord<string, A>) => B)
  | ((fa: ReadonlyRecord<string, A>) => B) {
  if (args.length === 2) {
    return reduceRightWithIndex(S.Ord)(...args)
  }
  const keysO = keys_(args[0])
  return (b, f) => (fa) => {
    let out: B = b
    const ks = keysO(fa)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, fa[k], out)
    }
    return out
  }
}

/**
 * Create a `ReadonlyRecord` with one key/value pair.
 *
 * @category constructors
 * @since 2.5.0
 */
export const singleton = <A>(k: string, a: A): ReadonlyRecord<string, A> => ({ [k]: a })

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
  const traverseWithIndexOF = _traverseWithIndex(S.Ord)(F)
  return (f) => (ta) => traverseWithIndexOF(ta, f)
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
  const traverseOF = _traverse(S.Ord)(F)
  return (f) => (ta) => traverseOF(ta, f)
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
  return _sequence(S.Ord)(F)
}

/**
 * @category Witherable
 * @since 2.6.5
 */
export const wither: PipeableWither1<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (fa: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>>) => {
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
) => (fa: ReadonlyRecord<string, A>) => HKT<F, Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>>) => {
  const traverseF = traverse(F)
  return (f) => (fa) => F.map(pipe(fa, traverseF(f)), separate)
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
  return (r) => {
    const left: Record<string, B> = {}
    const right: Record<string, C> = {}
    for (const k in r) {
      if (_.has.call(r, k)) {
        const e = f(k, r[k])
        switch (e._tag) {
          case 'Left':
            left[k] = e.left
            break
          case 'Right':
            right[k] = e.right
            break
        }
      }
    }
    return separated(left, right)
  }
}

/**
 * @since 2.5.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: ReadonlyRecord<K, B>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> {
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
 * @category combinators
 * @since 2.5.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
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
 * @since 2.5.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: ReadonlyRecord<K, B>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return (fa) => {
    const out: Record<string, A> = {}
    let changed = false
    for (const key in fa) {
      if (_.has.call(fa, key)) {
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

/**
 * Create a `ReadonlyRecord` from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.5.0
 */
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, readonly [string, A]>) => ReadonlyRecord<string, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [string, A]>) => ReadonlyRecord<string, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [string, A]>) => ReadonlyRecord<string, A>
export function fromFoldable<F, A>(
  M: Magma<A>,
  F: FoldableHKT<F>
): (fka: HKT<F, readonly [string, A]>) => ReadonlyRecord<string, A>
export function fromFoldable<F, A>(
  M: Magma<A>,
  F: FoldableHKT<F>
): (fka: HKT<F, readonly [string, A]>) => ReadonlyRecord<string, A> {
  const fromFoldableMapM = fromFoldableMap(M, F)
  return (fka) => fromFoldableMapM(fka, identity)
}

/**
 * Create a `ReadonlyRecord` from a foldable collection using the specified functions to:
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { last } from 'fp-ts/Semigroup'
 * import { Foldable, zip } from 'fp-ts/ReadonlyArray'
 * import { identity } from 'fp-ts/function'
 * import { ReadonlyRecord, fromFoldableMap } from 'fp-ts/ReadonlyRecord'
 *
 * export const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): ReadonlyRecord<K, A> =>
 *   fromFoldableMap(last<A>(), Foldable)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * interface User {
 *   readonly id: string
 *   readonly name: string
 * }
 *
 * const users: ReadonlyArray<User> = [
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
 * @since 2.5.0
 */
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A>(fa: Kind2<F, E, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A>(fa: Kind<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B> {
  return <A>(ta: HKT<F, A>, f: (a: A) => readonly [string, B]) => {
    return F.reduce<A, Record<string, B>>(ta, {}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _.has.call(r, k) ? M.concat(r[k], b) : b
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

/**
 * @category combinators
 * @since 2.11.0
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
      out[k] = M.concat(first[k], second[k])
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
 * @category combinators
 * @since 2.11.0
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
      out[k] = M.concat(first[k], second[k])
    }
  }
  return out
}

/**
 * @category combinators
 * @since 2.11.0
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

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/** @internal */
export const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
/** @internal */
/* istanbul ignore next */
export const _mapWithIndex: FunctorWithIndex1<URI, string>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
/** @internal */
/* istanbul ignore next */
export const _reduce: (O: Ord<string>) => Foldable1<URI>['reduce'] = (O: Ord<string>) => {
  const reduceO = reduce(O)
  return (fa, b, f) => pipe(fa, reduceO(b, f))
}
/** @internal */
export const _foldMap: (O: Ord<string>) => Foldable1<URI>['foldMap'] = (O) => (M) => {
  const foldMapM = foldMap(O)(M)
  return (fa, f) => pipe(fa, foldMapM(f))
}
/** @internal */
/* istanbul ignore next */
export const _reduceRight: (O: Ord<string>) => Foldable1<URI>['reduceRight'] = (O) => {
  const reduceRightO = reduceRight(O)
  return (fa, b, f) => pipe(fa, reduceRightO(b, f))
}
/** @internal */
/* istanbul ignore next */
export const _filter = <A>(fa: ReadonlyRecord<string, A>, predicate: Predicate<A>): ReadonlyRecord<string, A> =>
  pipe(fa, filter(predicate))
/** @internal */
/* istanbul ignore next */
export const _filterMap: Filterable1<URI>['filterMap'] = (fa, f) => pipe(fa, filterMap(f))
/** @internal */
/* istanbul ignore next */
export const _partition = <A>(
  fa: ReadonlyRecord<string, A>,
  predicate: Predicate<A>
): Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> => pipe(fa, partition(predicate))
/** @internal */
/* istanbul ignore next */
export const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))
/** @internal */
/* istanbul ignore next */
export const _reduceWithIndex: (O: Ord<string>) => FoldableWithIndex1<URI, string>['reduceWithIndex'] = (O) => {
  const reduceWithIndexO = reduceWithIndex(O)
  return (fa, b, f) => pipe(fa, reduceWithIndexO(b, f))
}
/** @internal */
export const _foldMapWithIndex: (O: Ord<string>) => FoldableWithIndex1<URI, string>['foldMapWithIndex'] = (O) => {
  const foldMapWithIndexO = foldMapWithIndex(O)
  return (M) => {
    const foldMapWithIndexM = foldMapWithIndexO(M)
    return (fa, f) => pipe(fa, foldMapWithIndexM(f))
  }
}
/** @internal */
/* istanbul ignore next */
export const _reduceRightWithIndex: (O: Ord<string>) => FoldableWithIndex1<URI, string>['reduceRightWithIndex'] = (
  O
) => {
  const reduceRightWithIndexO = reduceRightWithIndex(O)
  return (fa, b, f) => pipe(fa, reduceRightWithIndexO(b, f))
}
/** @internal */
/* istanbul ignore next */
export const _partitionMapWithIndex = <A, B, C>(
  fa: ReadonlyRecord<string, A>,
  f: (key: string, a: A) => Either<B, C>
): Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> => pipe(fa, partitionMapWithIndex(f))
/** @internal */
/* istanbul ignore next */
export const _partitionWithIndex = <A>(
  fa: ReadonlyRecord<string, A>,
  predicateWithIndex: PredicateWithIndex<string, A>
) => pipe(fa, partitionWithIndex(predicateWithIndex))
/** @internal */
/* istanbul ignore next */
export const _filterMapWithIndex = <A, B>(fa: ReadonlyRecord<string, A>, f: (key: string, a: A) => Option<B>) =>
  pipe(fa, filterMapWithIndex(f))
/** @internal */
/* istanbul ignore next */
export const _filterWithIndex = <A>(fa: ReadonlyRecord<string, A>, predicateWithIndex: PredicateWithIndex<string, A>) =>
  pipe(fa, filterWithIndex(predicateWithIndex))
/** @internal */
export const _traverse = (
  O: Ord<string>
): (<F>(
  F: Applicative<F>
) => <A, B>(ta: ReadonlyRecord<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const traverseWithIndexO = _traverseWithIndex(O)
  return (F) => {
    const traverseWithIndexOF = traverseWithIndexO(F)
    return (ta, f) => traverseWithIndexOF(ta, flow(SK, f))
  }
}
/** @internal */
export const _sequence = (
  O: Ord<string>
): (<F>(F: Applicative<F>) => <A>(ta: ReadonlyRecord<string, HKT<F, A>>) => HKT<F, ReadonlyRecord<string, A>>) => {
  const traverseO = _traverse(O)
  return (F) => {
    const traverseOF = traverseO(F)
    return (ta) => traverseOF(ta, identity)
  }
}
const _traverseWithIndex = (O: Ord<string>) => <F>(
  F: Applicative<F>
): (<A, B>(ta: ReadonlyRecord<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const keysO = keys_(O)
  return <A, B>(ta: ReadonlyRecord<string, A>, f: (k: string, a: A) => HKT<F, B>) => {
    const ks = keysO(ta)
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
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: ReadonlyRecord<string, B>) => ReadonlyRecord<string, B>
  <A>(predicate: Predicate<A>): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A>
} = <A>(predicate: Predicate<A>): ((fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A>) =>
  filterWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filterMap: <A, B>(
  f: (a: A) => Option<B>
) => (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: ReadonlyRecord<string, A>
  ) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
  <A>(predicate: Predicate<A>): <B extends A>(
    fb: ReadonlyRecord<string, B>
  ) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, B>>
  <A>(predicate: Predicate<A>): (
    fa: ReadonlyRecord<string, A>
  ) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
} = <A>(
  predicate: Predicate<A>
): ((fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category Foldable
 * @since 2.5.0
 */
export function reduce(O: Ord<string>): <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyRecord<string, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: ReadonlyRecord<string, A>) => B
export function reduce<A, B>(
  ...args: [Ord<string>] | [B, (b: B, a: A) => B]
): ((b: B, f: (b: B, a: A) => B) => (fa: ReadonlyRecord<string, A>) => B) | ((fa: ReadonlyRecord<string, A>) => B) {
  if (args.length === 1) {
    const reduceWithIndexO = reduceWithIndex(args[0])
    return (b: B, f: (b: B, a: A) => B) => reduceWithIndexO(b, (_, b, a) => f(b, a))
  }
  return reduce(S.Ord)(...args)
}

/**
 * @category Foldable
 * @since 2.5.0
 */
export function foldMap(
  O: Ord<string>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
export function foldMap<M>(
  O: Ord<string> | Monoid<M>
):
  | ((M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M)
  | (<A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M) {
  if ('compare' in O) {
    const foldMapWithIndexO = foldMapWithIndex(O)
    return (M: Monoid<M>) => {
      const foldMapWithIndexM = foldMapWithIndexO(M)
      return <A>(f: (a: A) => M): ((fa: ReadonlyRecord<string, A>) => M) => foldMapWithIndexM((_, a) => f(a))
    }
  }
  return foldMap(S.Ord)(O)
}

/**
 * @category Foldable
 * @since 2.5.0
 */
export function reduceRight(O: Ord<string>): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyRecord<string, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: ReadonlyRecord<string, A>) => B
export function reduceRight<A, B>(
  ...args: [Ord<string>] | [B, (a: A, b: B) => B]
): ((b: B, f: (a: A, b: B) => B) => (fa: ReadonlyRecord<string, A>) => B) | ((fa: ReadonlyRecord<string, A>) => B) {
  if (args.length === 1) {
    const reduceRightWithIndexO = reduceRightWithIndex(args[0])
    return (b: B, f: (a: A, b: B) => B) => reduceRightWithIndexO(b, (_, b, a) => f(b, a))
  }
  return reduceRight(S.Ord)(...args)
}

/**
 * @category Compactable
 * @since 2.5.0
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
 * @since 2.5.0
 */
export const separate = <A, B>(
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
 * @since 2.5.0
 */
export function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<ReadonlyRecord<string, A>>
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @category instances
 * @deprecated
 */
export function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>>
export function getShow<A>(
  O: Ord<string> | Show<A>
): ((S: Show<A>) => Show<ReadonlyRecord<string, A>>) | Show<ReadonlyRecord<string, A>> {
  if ('compare' in O) {
    return (S: Show<A>) => ({
      show: (r: ReadonlyRecord<string, A>) => {
        const elements = collect(O)((k, a: A) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(', ')
        return elements === '' ? '{}' : `{ ${elements} }`
      }
    })
  }
  return getShow(S.Ord)(O)
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
 * Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/ReadonlyRecord'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @category instances
 * @since 2.5.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    concat: (first, second) => {
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const r: Record<string, A> = Object.assign({}, first)
      for (const k in second) {
        if (_.has.call(second, k)) {
          r[k] = _.has.call(first, k) ? S.concat(first[k], second[k]) : second[k]
        }
      }
      return r
    },
    empty
  }
}

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
  /*#__PURE__*/
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
export const getUnionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => {
  const unionS = union(S)
  return {
    concat: (first, second) => unionS(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> => ({
  concat: getUnionSemigroup(S).concat,
  empty
})

/**
 * @category instances
 * @since 2.11.0
 */
export const getIntersectionSemigroup = <A>(S: Semigroup<A>): Semigroup<ReadonlyRecord<string, A>> => {
  const intersectionS = intersection(S)
  return {
    concat: (first, second) => intersectionS(second)(first)
  }
}

/**
 * @category instances
 * @since 2.11.0
 */
export const getDifferenceMagma = <A>(): Magma<ReadonlyRecord<string, A>> => ({
  concat: (first, second) => difference(second)(first)
})

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

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
 * Use `getTraversableWithIndex` instead.
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

const _wither = witherDefault(Traversable, Compactable)
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
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
export const insertAt: <A>(k: string, a: A) => (r: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> = upsertAt

/**
 * Use [`has`](#has) instead.
 *
 * @since 2.5.0
 * @deprecated
 */
export function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K
export function hasOwnProperty<K extends string>(this: any, k: string, r?: ReadonlyRecord<K, unknown>): k is K {
  return _.has.call(r === undefined ? this : r, k)
}

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
export const readonlyRecord: FunctorWithIndex1<URI, string> &
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
