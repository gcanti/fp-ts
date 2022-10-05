/**
 * The `Record` module enables dealing with Typescript's `Record<K, T>`
 * type in a functional way, basically treating it as a `Functor` in `T`.
 *
 * @since 2.0.0
 */
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4
} from './Applicative'
import * as A from './Array'
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
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { Predicate } from './Predicate'
import * as RR from './ReadonlyRecord'
import { Refinement } from './Refinement'
import * as Se from './Semigroup'
import { Separated } from './Separated'
import { Show } from './Show'
import * as S from './string'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { PipeableWilt1, PipeableWither1, wiltDefault, Witherable1, witherDefault } from './Witherable'

import Semigroup = Se.Semigroup

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `Record`.
 *
 * @example
 * import { size } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(size({ a: true, b: 2, c: "three" }), 3);
 *
 * @since 2.0.0
 */
export const size: <A>(r: Record<string, A>) => number = RR.size

/**
 * Test whether a `Record` is empty.
 *
 * @example
 * import { isEmpty } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(isEmpty({}), true);
 * assert.deepStrictEqual(isEmpty({ a: 3 }), false);
 *
 * @since 2.0.0
 */
export const isEmpty: <A>(r: Record<string, A>) => boolean = RR.isEmpty

const keys_ =
  (O: Ord<string>) =>
  <K extends string>(r: Record<K, unknown>): Array<K> =>
    (Object.keys(r) as any).sort(O.compare)

/**
 * The keys of a `Record`, sorted alphabetically.
 *
 * @example
 * import { keys } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(keys({ c: 1, a: 2, b: 3 }), ["a", "b", "c"]);
 *
 * @since 2.0.0
 */
export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> = /*#__PURE__*/ keys_(S.Ord)

/**
 * Map a `Record` into an `Array`.
 * It passes each key/value pair to the iterating function and collects
 * the results in an array, sorted alphabetically by the original key.
 *
 * @example
 * import { collect } from 'fp-ts/Record'
 * import { Ord } from 'fp-ts/string'
 *
 * const f = <A>(k: string, a: A) => `${k.toUpperCase()}-${a}`;
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(
 *   collect(Ord)(f)(x),
 *   [
 *     "A-foo",
 *     "B-false",
 *     "C-3",
 *   ]
 * );
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
  return <K extends string, A, B>(f: (k: K, a: A) => B) =>
    (r: Record<K, A>) => {
      const out: Array<B> = []
      for (const key of keysO(r)) {
        out.push(f(key, r[key]))
      }
      return out
    }
}

/**
 * Get a sorted `Array` of the key/value pairs contained in a `Record`.
 * Sorted alphabetically by key.
 *
 * @example
 * import { toArray } from 'fp-ts/Record'
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(toArray(x), [
 *   ["a", "foo"],
 *   ["b", false],
 *   ["c", 3],
 * ]);
 *
 * @category conversions
 * @since 2.0.0
 */
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> = /*#__PURE__*/ collect(S.Ord)((k, a) => [
  k,
  a
])

/**
 * Unfolds a `Record` into a list of key/value pairs.
 *
 * Given an `Unfoldable` class type `U` such as `array` or `readonlyArray`,
 * it uses the `unfold` function to create an instance of `U`,
 * providing an iterating function that iterates over each
 * key/value pair in the record sorted alphabetically by key.
 *
 * @example
 * import { array, readonlyArray } from 'fp-ts'
 * import { toUnfoldable } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(toUnfoldable(array)({ b: 2, a: 1 }),[ [ 'a', 1 ], [ 'b', 2 ]])
 * assert.deepStrictEqual(toUnfoldable(readonlyArray)({ b: 2, a: 1 }),[ [ 'a', 1 ], [ 'b', 2 ]])
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
 * @example
 * import { upsertAt } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(upsertAt("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
 * assert.deepStrictEqual(upsertAt("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
 *
 * @since 2.10.0
 */
export const upsertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A> = RR.upsertAt

/**
 * Test whether or not a key exists in a `Record`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @example
 * import { has } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(has("a", { a: 1, b: 2 }), true);
 * assert.deepStrictEqual(has("c", { a: 1, b: 2 }), false);
 *
 * @since 2.10.0
 */
export const has: <K extends string>(k: string, r: Record<K, unknown>) => k is K = RR.has

/**
 * Delete a key and value from a `Record`.
 *
 * @example
 * import { deleteAt } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(deleteAt("a")({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(deleteAt("c")({ a: 1, b: 2 }), { a: 1, b: 2 });
 *
 * @since 2.0.0
 */
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
export function deleteAt(k: string): <A>(r: Record<string, A>) => Record<string, A> {
  return <A>(r: Record<string, A>) => {
    if (!_.has.call(r, k)) {
      return r
    }
    const out: Record<string, A> = Object.assign({}, r)
    delete out[k]
    return out
  }
}

/**
 * Replace a key/value pair in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing a new `Record`
 * with the entry updated, otherwise it returns `None`
 *
 * @example
 * import { updateAt } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(updateAt("a", 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }));
 * assert.deepStrictEqual(updateAt("c", 3)({ a: 1, b: 2 }), option.none);
 *
 * @since 2.0.0
 */
export const updateAt = <A>(k: string, a: A): (<K extends string>(r: Record<K, A>) => Option<Record<K, A>>) =>
  modifyAt(k, () => a)

/**
 * Applies a mapping function to one spcific key/value pair in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing a new `Record`
 * with the entry updated, otherwise it returns `None`
 *
 * @example
 * import { modifyAt } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(modifyAt("a", (x: number) => x * 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }));
 * assert.deepStrictEqual(modifyAt("c", (x: number) => x * 3)({ a: 1, b: 2 }), option.none);
 *
 * @since 2.0.0
 */
export const modifyAt =
  <A>(k: string, f: (a: A) => A) =>
  <K extends string>(r: Record<K, A>): Option<Record<K, A>> => {
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
 * @returns If the specified key exists it returns an `Option` containing a new `Record`
 * with the entry removed, otherwise it returns `None`
 *
 * @example
 * import { pop } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(pop("a")({ a: 1, b: 2, c: 3 }), option.some([1, { b: 2, c: 3 }]));
 * assert.deepStrictEqual(pop("x")({ a: 1, b: 2, c: 3 }), option.none);
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
 * Test whether one `Record` contains all of the keys and values
 * contained in another `Record`.
 *
 * @example
 * import { isSubrecord } from 'fp-ts/Record'
 * import { string } from 'fp-ts'
 *
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", b: "bar", c: "baz" }),
 *   true
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", c: "baz" }),
 *   true
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", b: "not-bar", c: "baz" }),
 *   false
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar" })({ a: "foo", b: "bar", c: "baz" }),
 *   false
 * );
 *
 * @since 2.0.0
 */
export const isSubrecord: <A>(E: Eq<A>) => {
  (that: Record<string, A>): (me: Record<string, A>) => boolean
  (me: Record<string, A>, that: Record<string, A>): boolean
} = RR.isSubrecord

// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing the value,
 * otherwise it returns `None`
 *
 * @example
 * import { lookup } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(lookup("b")({ a: "foo", b: "bar" }), option.some("bar"));
 * assert.deepStrictEqual(lookup("c")({ a: "foo", b: "bar" }), option.none);
 *
 * @since 2.0.0
 */
export const lookup: {
  (k: string): <A>(r: Record<string, A>) => Option<A>
  <A>(k: string, r: Record<string, A>): Option<A>
} = RR.lookup

/**
 * Map a `Record` passing the key/value pairs to the iterating function.
 *
 * @example
 * import { mapWithIndex } from "fp-ts/Record";
 *
 * const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`;
 * assert.deepStrictEqual(mapWithIndex(f)({ a: 3, b: 5 }), { a: "A-3", b: "B-5" });
 *
 * @since 2.0.0
 */
export const mapWithIndex: <K extends string, A, B>(f: (k: K, a: A) => B) => (fa: Record<K, A>) => Record<K, B> =
  RR.mapWithIndex

/**
 * Map a `Record` passing the values to the iterating function.
 *
 * @example
 * import { map } from "fp-ts/Record";
 *
 * const f = (n: number) => `-${n}-`;
 * assert.deepStrictEqual(map(f)({ a: 3, b: 5 }), { a: "-3-", b: "-5-" });
 *
 * @category mapping
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <K extends string>(fa: Record<K, A>) => Record<K, B> = RR.map

/**
 * Reduces a `Record` passing each key/value pair to the iterating function.
 * Entries are processed in the order, sorted by key according to
 * the given `Ord`.
 *
 * @example
 * import { reduceWithIndex } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(reduceWithIndex(Ord)([] as string[], (k, b, a) => [...b, `${k}-${a}`])(x), [
 *   "a-foo",
 *   "b-false",
 *   "c-3",
 * ]);
 *
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
export function reduceWithIndex<A, B>(
  ...args: [Ord<string>] | [B, (k: string, b: B, a: A) => B]
): ((b: B, f: (k: string, b: B, a: A) => B) => (fa: Record<string, A>) => B) | ((fa: Record<string, A>) => B) {
  return args.length === 1 ? RR.reduceWithIndex(args[0]) : RR.reduceWithIndex(S.Ord)(...args)
}

/**
 * Map and fold a `Record`.
 * Map the `Record` passing each key/value pair to the iterating function.
 * Then fold the results using the provided `Monoid`.
 *
 * @example
 * import { foldMapWithIndex } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 * import { Monoid } from "fp-ts/Monoid";
 *
 * const m: Monoid<string> = { empty: "", concat: (x: string, y: string) => (x ? `${x} -> ${y}` : `${y}`) };
 * const f = (k:string, a: number) => `${k}-${a}`
 * const x = { c: 3, a: 1, b: 2 };
 * assert.deepStrictEqual(foldMapWithIndex(Ord)(m)(f)(x), "a-1 -> b-2 -> c-3");
 *
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
export function foldMapWithIndex<M>(
  O: Ord<string> | Monoid<M>
):
  | ((M: Monoid<M>) => <A>(f: (k: string, a: A) => M) => (fa: Record<string, A>) => M)
  | (<A>(f: (k: string, a: A) => M) => (fa: Record<string, A>) => M) {
  return 'compare' in O ? RR.foldMapWithIndex(O) : RR.foldMapWithIndex(S.Ord)(O)
}

/**
 * Same as `reduceWithIndex`, but reduce starting from the right
 * (i.e. in reverse order, from the last to the first entry according to
 * the given `Ord`).
 *
 * @example
 * import { reduceRightWithIndex } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(reduceRightWithIndex(Ord)([] as string[], (k, a, b) => [...b, `${k}-${a}`])(x), [
 *   "c-3",
 *   "b-false",
 *   "a-foo",
 * ]);
 *
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
export function reduceRightWithIndex<A, B>(
  ...args: [Ord<string>] | [B, (k: string, a: A, b: B) => B]
): ((b: B, f: (k: string, a: A, b: B) => B) => (fa: Record<string, A>) => B) | ((fa: Record<string, A>) => B) {
  return args.length === 1 ? RR.reduceRightWithIndex(args[0]) : RR.reduceRightWithIndex(S.Ord)(...args)
}

/**
 * Create a `Record` with one key/value pair.
 *
 * @example
 * import { singleton } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(singleton("a", 1), { a: 1 });
 *
 * @since 2.0.0
 */
export const singleton: <A>(k: string, a: A) => Record<string, A> = RR.singleton

/**
 * @since 2.0.0
 */
export function traverseWithIndex<F extends URIS4>(
  F: Applicative4<F>
): <K extends string, S, R, E, A, B>(
  f: (k: K, a: A) => Kind4<F, S, R, E, B>
) => (ta: Record<K, A>) => Kind4<F, S, R, E, Record<K, B>>
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
export function traverse<F extends URIS4>(
  F: Applicative4<F>
): <S, R, E, A, B>(
  f: (a: A) => Kind4<F, S, R, E, B>
) => <K extends string>(ta: Record<K, A>) => Kind4<F, S, R, E, Record<K, B>>
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
 * `Record` sequencing,
 * i.e., take a `Record` in which elements are monads
 * and return a monad of a `Record` of the base types.
 * The following example for instance shows sequencing
 * a `Record<string, Option<number>>`
 * into an `Option<Record<string, number>>`.
 *
 * `sequence` in `Record` is equivalent to `sequenceS` in `Apply.ts`.
 *
 * @example
 * import { sequence } from "fp-ts/Record";
 * import { option } from "fp-ts";
 * import { sequenceS } from "fp-ts/Apply";
 *
 * assert.deepStrictEqual(
 *   sequence(option.Applicative)({ a: option.some(1), b: option.some(2) }),
 *   option.some({ a: 1, b: 2 })
 * );
 * assert.deepStrictEqual(sequence(option.Applicative)({ a: option.some(1), b: option.none }), option.none);
 * assert.deepStrictEqual(
 *   sequence(option.Applicative)({ a: option.some(1), b: option.some(2) }),
 *   sequenceS(option.Applicative)({ a: option.some(1), b: option.some(2) })
 * );
 *
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
 * @category filtering
 * @since 2.6.5
 */
export const wither: PipeableWither1<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (fa: Record<string, A>) => HKT<F, Record<string, B>>) => {
  const traverseF = traverse(F)
  return (f) => (fa) => F.map(pipe(fa, traverseF(f)), compact)
}

/**
 * @category filtering
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
 * Maps a `Record` with a function returning an `Either` and
 * partitions the resulting `Record` into `Left`s and `Right`s.
 *
 * @example
 * import { partitionMapWithIndex } from "fp-ts/Record"
 * import { either } from "fp-ts"
 *
 * const f = (key: string, a: number) =>
 *   a >= 0 ? either.right(`${key} is >= 0 (${a})`) : either.left(`${key} is < 0 (${a})`);
 * assert.deepStrictEqual(partitionMapWithIndex(f)({ a: -1, b: 2, c: 123 }), {
 *   left: {
 *     a: "a is < 0 (-1)",
 *   },
 *   right: {
 *     b: "b is >= 0 (2)",
 *     c: "c is >= 0 (123)",
 *   },
 * });
 *
 * @since 2.0.0
 */
export const partitionMapWithIndex: <K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
) => (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>> = RR.partitionMapWithIndex

/**
 * Partition a `Record` into two parts according to a predicate
 * that takes a key and a value.
 *
 * @example
 * import { partitionWithIndex } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(
 *   partitionWithIndex((key: string, a: number) => key.length <= 1 && a > 0)({ a: -1, b: 2, ccc: 7 }),
 *   {
 *     left: {
 *       a: -1,
 *       ccc: 7,
 *     },
 *     right: {
 *       b: 2,
 *     },
 *   }
 * );
 *
 * @since 2.0.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: Record<K, B>) => Separated<Record<string, B>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>> {
  return RR.partitionWithIndex(predicateWithIndex)
}

/**
 * Maps a `Record` with an iterating function that takes key and value and
 * returns an `Option`, keeping only the `Some` values and discarding `None`s.
 *
 * @example
 * import { filterMapWithIndex } from "fp-ts/Record"
 * import { option } from "fp-ts"
 *
 * const f = (key: string, a: number) => (a >= 0 ? option.some(`${key}${a}`) : option.none);
 * assert.deepStrictEqual(filterMapWithIndex(f)({ a: -1, b: 2, c: 3 }), {
 *   b: "b2",
 *   c: "c3",
 * });
 *
 * @since 2.0.0
 */
export const filterMapWithIndex: <K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
) => (fa: Record<K, A>) => Record<string, B> = RR.filterMapWithIndex

/**
 * Produce a new `Record` keeping only the entries that satisfy
 * a predicate taking key and value as input.
 *
 * @example
 * import { filterWithIndex } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(
 *   filterWithIndex((s: string, v: number) => s.length <= 1 && v > 0)({ a: 1, b: -2, ccc: 3 }),
 *   {
 *     a: 1,
 *   }
 * );
 *
 * @since 2.0.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: Record<K, B>) => Record<string, B>
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
 * Alias of [`toArray`](#toArray).
 *
 * @example
 * import { toEntries } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(toEntries({ b: 2, a: 1 }), [['a', 1], ['b', 2]])
 *
 * @since 2.12.0
 * @category conversions
 */
export const toEntries = toArray

/**
 * Converts an `Array` of `[key, value]` tuples into a `Record`.
 *
 * @example
 * import { fromEntries } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(fromEntries([['a', 1], ['b', 2], ['a', 3]]), { b: 2, a: 3 })
 *
 * @since 2.12.0
 * @category conversions
 */
export const fromEntries = <A>(fa: Array<[string, A]>): Record<string, A> => fromFoldable(Se.last<A>(), A.Foldable)(fa)

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
 * Test if every value in a `Record` satisfies the predicate.
 *
 * @example
 * import { every } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: 2 }), true);
 * assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: -1 }), false);
 *
 * @since 2.0.0
 */
export const every: {
  <A, B extends A>(refinement: Refinement<A, B>): Refinement<Record<string, A>, Record<string, B>>
  <A>(predicate: Predicate<A>): Predicate<Record<string, A>>
} = RR.every as any

/**
 * Test if at least one value in a `Record` satisfies the predicate.
 *
 * @example
 * import { some } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: 1, b: -2 }), true);
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: -1, b: -2 }), false);
 *
 * @since 2.0.0
 */
export const some: <A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean = RR.some

// TODO: remove non-curried overloading in v3
/**
 * Given an `Eq` checks if a `Record` contains an entry with
 * value equal to a provided value.
 *
 * @example
 * import { elem } from "fp-ts/Record"
 * import { number } from "fp-ts"
 *
 * assert.deepStrictEqual(elem(number.Eq)(123, { foo: 123, bar: 234 }), true);
 * assert.deepStrictEqual(elem(number.Eq)(-7, { foo: 123, bar: 234 }), false);
 *
 * @since 2.0.0
 */
export const elem: <A>(E: Eq<A>) => {
  (a: A): (fa: Record<string, A>) => boolean
  (a: A, fa: Record<string, A>): boolean
} = RR.elem

/**
 * Union of two `Record`s.
 * Takes two `Record`s and produces a `Record` combining all the
 * entries of the two inputs.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements with the same key.
 *
 * @example
 * import { union } from "fp-ts/Record";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(union(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4, b: 2, c: 3 });
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(union(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 });
 *
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
 * Intersection of two `Record`s.
 * Takes two `Record`s and produces a `Record` combining only the
 * entries of the two inputswith the same key.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements.
 *
 * @example
 * import { intersection } from "fp-ts/Record";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(intersection(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4});
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(intersection(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1});
 *
 * @since 2.11.0
 */
export const intersection =
  <A>(M: Magma<A>) =>
  (second: Record<string, A>) =>
  (first: Record<string, A>): Record<string, A> => {
    if (isEmpty(first) || isEmpty(second)) {
      return {}
    }
    return RR.intersection(M)(second)(first)
  }

/**
 * Difference between two `Record`s.
 * Takes two `Record`s and produces a `Record` composed by the
 * entries of the two inputs, removing the entries with the same
 * key in both inputs.
 *
 * @example
 * import { difference } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(difference({ a: 1 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3, c: 3 })({ a: 1, b: 2 }), { b: 2, c: 3 });
 *
 * @since 2.11.0
 */
export const difference =
  <A>(second: Record<string, A>) =>
  (first: Record<string, A>): Record<string, A> => {
    if (isEmpty(first)) {
      return { ...second }
    }
    if (isEmpty(second)) {
      return { ...first }
    }
    return RR.difference(second)(first)
  }

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
const _traverseWithIndex =
  (O: Ord<string>) =>
  <F>(
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

/**
 * Given a `Predicate`, it produces a new `Record` keeping only the entries with a
 * value that satisfies the provided predicate.
 *
 * @example
 * import { filter } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(filter((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo",
 *   b: "bar",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Record<string, B>) => Record<string, B>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>
} = RR.filter

/**
 * Maps a `Record` with an iterating function that returns an `Option`
 * and it keeps only the `Some` values discarding the `None`s.
 *
 * @example
 * import { filterMap } from "fp-ts/Record"
 * import { option } from "fp-ts"
 *
 * const f = (s: string) => s.length < 4 ? option.some(`${s} is short`): option.none
 * assert.deepStrictEqual(filterMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo is short",
 *   b: "bar is short",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B> = RR.filterMap

/**
 * Partition a `Record` into two parts according to a `Predicate`.
 *
 * @example
 * import { partition } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(partition((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left:{
 *     c: "verylong"
 *   },
 *   right: {
 *     a: "foo",
 *     b: "bar",
 *   },
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: Record<string, A>
  ) => Separated<Record<string, A>, Record<string, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Record<string, B>) => Separated<Record<string, B>, Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>
} = RR.partition

/**
 * Maps a `Record` with a function returning an `Either` and
 * partitions the resulting `Record` into `Left`s and `Right`s.
 *
 * @example
 * import { partitionMap } from "fp-ts/Record"
 * import { either } from "fp-ts"
 *
 * const f = (s: string) => (s.length < 4 ? either.right(`${s} is short`) : either.left(`${s} is not short`));
 * assert.deepStrictEqual(partitionMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left: {
 *     c: "verylong is not short",
 *   },
 *   right: {
 *     a: "foo is short",
 *     b: "bar is short",
 *   },
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>> = RR.partitionMap

/**
 * Reduces a `Record` passing each value to the iterating function.
 * Entries are processed in order, sorted by key according to
 * the given `Ord`.
 *
 * @example
 * import { reduce } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(reduce(Ord)([] as string[], (b, a) => [...b, `-${a}-`])(x), [
 *   "-foo-",
 *   "-false-",
 *   "-3-",
 * ]);
 *
 * @category folding
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
  return args.length === 1 ? RR.reduce(args[0]) : RR.reduce(S.Ord)(...args)
}

/**
 * Map and fold a `Record`.
 * Map the `Record` passing each value to the iterating function.
 * Then fold the results using the provided `Monoid`.
 *
 * @example
 * import { foldMap } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 * import { Monoid } from "fp-ts/Monoid";
 *
 * const m: Monoid<string> = { empty: "", concat: (x: string, y: string) => (x ? `${x} -> ${y}` : `${y}`) };
 * const f = (a: number) => `-${a}-`;
 * const x = { c: 3, a: 1, b: 2 };
 * assert.deepStrictEqual(foldMap(Ord)(m)(f)(x), "-1- -> -2- -> -3-");
 *
 * @category folding
 * @since 2.0.0
 */
export function foldMap(O: Ord<string>): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
export function foldMap<M>(
  O: Ord<string> | Monoid<M>
):
  | ((M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M)
  | (<A>(f: (a: A) => M) => (fa: Record<string, A>) => M) {
  return 'compare' in O ? RR.foldMap(O) : RR.foldMap(S.Ord)(O)
}

/**
 * Same as `reduce` but entries are processed _from the right_,
 * i.e. in reverse order, from the last to the first entry, according to
 * the given `Ord`.
 *
 * @example
 * import { reduceRight } from "fp-ts/Record";
 * import { Ord } from "fp-ts/string";
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(reduceRight(Ord)([] as string[], (a, b) => [...b, `-${a}-`])(x), [
 *   "-3-",
 *   "-false-",
 *   "-foo-",
 * ]);
 *
 * @category folding
 * @since 2.0.0
 */
export function reduceRight(O: Ord<string>): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @deprecated
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: Record<string, A>) => B
export function reduceRight<A, B>(
  ...args: [Ord<string>] | [B, (a: A, b: B) => B]
): ((b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B) | ((fa: Record<string, A>) => B) {
  return args.length === 1 ? RR.reduceRight(args[0]) : RR.reduceRight(S.Ord)(...args)
}

/**
 * Compact a `Record` of `Option`s discarding the `None` values and
 * keeping the `Some` values.
 *
 * @example
 * import { compact } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(compact({ a: option.some("foo"), b: option.none, c: option.some("bar") }), {
 *   a: "foo",
 *   c: "bar",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
export const compact: <A>(fa: Record<string, Option<A>>) => Record<string, A> = RR.compact

/**
 * Separate a `Record` of `Either`s into `Left`s and `Right`s.
 *
 * @example
 * import { separate } from 'fp-ts/Record'
 * import { either } from 'fp-ts'
 *
 * assert.deepStrictEqual(
 *   separate({ a: either.right("foo"), b: either.left("bar"), c: either.right("baz") }),
 *   {
 *     right: {
 *       a: "foo",
 *       c: "baz",
 *     },
 *     left: {
 *       b: "bar",
 *     },
 *   }
 * );
 *
 * @category filtering
 * @since 2.0.0
 */
export const separate: <A, B>(fa: Record<string, Either<A, B>>) => Separated<Record<string, A>, Record<string, B>> =
  RR.separate

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Record'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Record<string, A>
  }
}

/**
 * Produces a `Show` for a `Record`, given a `Show` for the base type
 * (a `Show` produces a human-readable representation of an instance).
 * `Record` entries are sorted by key with the provided `Ord`.
 *
 * @example
 * import { getShow } from "fp-ts/Record"
 * import { Show } from "fp-ts/Show"
 * import { Ord } from "fp-ts/string"
 *
 * const sNumber: Show<number> = { show: (n: number) => `${n}` };
 * const sRecord: Show<Record<string, number>> = getShow(Ord)(sNumber);
 * assert.deepStrictEqual(sRecord.show({ b: 2, a: 1 }), '{ "a": 1, "b": 2 }');
 *
 * @category instances
 * @since 2.0.0
 */
export function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<Record<string, A>>
/**
 * Use the overload constrained by `Ord` instead.
 *
 * @category zone of death
 * @deprecated
 */
export function getShow<A>(S: Show<A>): Show<Record<string, A>>
export function getShow<A>(
  O: Ord<string> | Show<A>
): ((S: Show<A>) => Show<Record<string, A>>) | Show<Record<string, A>> {
  return 'compare' in O ? RR.getShow(O) : RR.getShow(S.Ord)(O)
}

/**
 * Given an `Eq` for the base type, it produces an `Eq`
 * for a `Record` of that base type.
 *
 * @example
 * import { getEq } from "fp-ts/Record";
 * import { string } from "fp-ts";
 * import { Eq } from "fp-ts/Eq";
 *
 * const eq: Eq<Record<string, string>> = getEq(string.Eq);
 * assert.deepStrictEqual(eq.equals({ a: "foo" }, { b: "bar" }), false);
 * assert.deepStrictEqual(eq.equals({ a: "foo" }, { a: "foo" }), true);
 *
 * @category instances
 * @since 2.0.0
 */
export const getEq: <K extends string, A>(E: Eq<A>) => Eq<Record<K, A>> = RR.getEq

/**
 * Returns a `Monoid` instance for `Record`s, given a `Semigroup`
 * instance for the base type.
 * The `Monoid` makes the union of two `Record`s comining the
 * overlapping entries with the provided `Semigroup`.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/Record'
 *
 * const M = getMonoid(SemigroupSum);
 * assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579 , bar: 234, baz: 567 });
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
 * Takes a value and a `Record` of functions and returns a
 * `Record` by applying each function to the input value.
 *
 * @example
 * import { flap } from "fp-ts/Record"
 *
 * const fab = { x: (n: number) => `${n} times 2`, y: (n: number) => `${n * 2}` };
 * assert.deepStrictEqual(flap(3)(fab), {
 *   x: "3 times 2",
 *   y: "6",
 * });
 *
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

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
 * Produces a `Foldable` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category folding
 * @since 2.11.0
 */
export const getFoldable = (O: Ord<string>): Foldable1<URI> => ({
  URI,
  reduce: _reduce(O),
  foldMap: _foldMap(O),
  reduceRight: _reduceRight(O)
})

/**
 * Produces a `FoldableWithIndex1` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category folding
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
 * Produces a `Traversable` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category traversing
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
 * Produces a `TraversableWithIndex` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category traversing
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
 * @category filtering
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
 * Given a `Semigroup` in the base type, it produces a `Semigroup`
 * in the `Record` of the base type.
 * The resulting `Semigroup` concatenates two `Record`s by
 * `union`.
 *
 * @example
 * import { getUnionSemigroup } from "fp-ts/Record"
 * import { Semigroup } from "fp-ts/Semigroup"
 *
 * const sNumber: Semigroup<number> = { concat: (x, y) => x - y };
 * const sRecord: Semigroup<Record<string, number>> = getUnionSemigroup(sNumber);
 * assert.deepStrictEqual(sRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { a: 1, b: -1, c: 4 });
 *
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
 * Same as `getMonoid`.
 * Returns a `Monoid` instance for `Record`s given a `Semigroup`
 * instance for the base type.
 * The `Monoid` makes the union of two `Record`s combining the
 * entries that have the same key with the provided `Semigroup`.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getUnionMonoid } from 'fp-ts/Record'
 *
 * const M = getUnionMonoid(SemigroupSum);
 * assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579 , bar: 234, baz: 567 });
 *
 * @category instances
 * @since 2.11.0
 */
export const getUnionMonoid = <A>(S: Semigroup<A>): Monoid<Record<string, A>> => ({
  concat: getUnionSemigroup(S).concat,
  empty: {}
})

/**
 * Given a `Semigroup` in the base type, it produces a `Semigroup`
 * in the `Record` of the base type.
 * The resulting `Semigroup` concatenates two `Record`s by
 * `intersection`.
 *
 * @example
 * import { getIntersectionSemigroup } from "fp-ts/Record"
 * import { Semigroup } from "fp-ts/Semigroup"
 *
 * const sNumber: Semigroup<number> = { concat: (x, y) => x - y };
 * const sRecord: Semigroup<Record<string, number>> = getIntersectionSemigroup(sNumber);
 * assert.deepStrictEqual(sRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { b: -1 });
 *
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
 * Produces a `Magma` with a `concat` function that combines
 * two `Record`s by making the `difference`.
 *
 * @example
 * import { getDifferenceMagma, difference } from "fp-ts/Record"
 * import { Magma } from "fp-ts/Magma"
 *
 * const r1 = { a: 3, c: 3 };
 * const r2 = { a: 1, b: 2 };
 * const m: Magma<Record<string, number>> = getDifferenceMagma<number>();
 * assert.deepStrictEqual(m.concat(r1, r2), difference(r2)(r1));
 * assert.deepStrictEqual(m.concat(r1, r2), { c: 3, b: 2 });
 *
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
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord)
}

/**
 * Use `getFoldableWithIndex` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, string> = {
  URI,
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord),
  reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(S.Ord),
  foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(S.Ord)
}

/**
 * Use `getTraversable` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const Traversable: Traversable1<URI> = {
  URI,
  map: _map,
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord),
  traverse: /*#__PURE__*/ _traverse(S.Ord),
  sequence
}

/**
 * Use the `getTraversableWithIndex` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, string> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord),
  reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(S.Ord),
  foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(S.Ord),
  traverse: /*#__PURE__*/ _traverse(S.Ord),
  sequence,
  traverseWithIndex: /*#__PURE__*/ _traverseWithIndex(S.Ord)
}

const _wither = /*#__PURE__*/ witherDefault(Traversable, Compactable)
const _wilt = /*#__PURE__*/ wiltDefault(Traversable, Compactable)

/**
 * Use `getWitherable` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const Witherable: Witherable1<URI> = {
  URI,
  map: _map,
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord),
  traverse: /*#__PURE__*/ _traverse(S.Ord),
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
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const empty: Record<string, never> = {}

/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const insertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A> = upsertAt

/**
 * Use [`has`](#has) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const hasOwnProperty: <K extends string>(k: string, r: Record<K, unknown>) => k is K = RR.hasOwnProperty

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `R.Functor` instead of `R.record`
 * (where `R` is from `import R from 'fp-ts/Record'`)
 *
 * @category zone of death
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
  reduce: /*#__PURE__*/ _reduce(S.Ord),
  foldMap: /*#__PURE__*/ _foldMap(S.Ord),
  reduceRight: /*#__PURE__*/ _reduceRight(S.Ord),
  traverse: /*#__PURE__*/ _traverse(S.Ord),
  sequence,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap,
  mapWithIndex: _mapWithIndex,
  reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(S.Ord),
  foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(S.Ord),
  reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(S.Ord),
  filterMapWithIndex: _filterMapWithIndex,
  filterWithIndex: _filterWithIndex,
  partitionMapWithIndex: _partitionMapWithIndex,
  partitionWithIndex: _partitionWithIndex,
  traverseWithIndex: /*#__PURE__*/ _traverseWithIndex(S.Ord),
  wither: _wither,
  wilt: _wilt
}
