/**
 * @file Data structure which represents non-empty arrays
 */
import { Monad1 } from './Monad'
import * as A from './Array'
import { Comonad1 } from './Comonad'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { TraversableWithIndex1, TraverseWithIndex1 } from './TraversableWithIndex'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Ord } from './Ord'
import { getMeetSemigroup, getJoinSemigroup, Semigroup } from './Semigroup'
import { Option, some, none } from './Option'
import { Setoid } from './Setoid'
import { compose, Predicate, Refinement } from './function'
import { Traverse1 } from './Traversable'
import { Sequence1 } from './Traversable2v'
import { array } from '.'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray2v: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray2v'

export type URI = typeof URI

/**
 * @since 1.15.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
  map: <B>(f: (a: A, index: number, nea: NonEmptyArray<A>) => B) => NonEmptyArray<B>
  concat: (as: Array<A>) => NonEmptyArray<A>
  reverse: () => NonEmptyArray<A>
}

/**
 * @since 1.15.0
 */
export function make<A>(head: A, tail: Array<A>): NonEmptyArray<A> {
  return [head, ...tail] as any
}

/**
 * @since 1.15.0
 */
export function head<A>(nea: NonEmptyArray<A>): A {
  return nea[0]
}

/**
 * @since 1.15.0
 */
export function tail<A>(nea: NonEmptyArray<A>): Array<A> {
  return nea.slice(1)
}

/**
 * @since 1.15.0
 */
export function min<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A {
  const S = getMeetSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * @since 1.15.0
 */
export function max<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A {
  const S = getJoinSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 1.15.0
 */
export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> {
  return as.length > 0 ? some(as as any) : none
}

/**
 * Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.
 *
 * @since 1.15.0
 */
export function fromNonEmptyArray<A>(as: Array<A> & { 0: A }): NonEmptyArray<A> {
  return as as any
}

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 1.15.0
 */
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => {
  return {
    concat: (x, y) => x.concat(y)
  }
}

/**
 * @example
 * import { fromNonEmptyArray, getSetoid, make } from 'fp-ts/lib/NonEmptyArray2v'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * const S = getSetoid(setoidNumber)
 * assert.strictEqual(S.equals(make(1, [2]), fromNonEmptyArray([1, 2])), true)
 * assert.strictEqual(S.equals(make(1, [2]), fromNonEmptyArray([1, 3])), false)
 *
 * @since 1.15.0
 */
export function getSetoid<A>(S: Setoid<A>): Setoid<NonEmptyArray<A>> {
  return A.getSetoid(S)
}

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { make, group } from 'fp-ts/lib/NonEmptyArray2v'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   make(1, []),
 *   make(2, []),
 *   make(1, [1])
 * ])
 *
 * @since 1.15.0
 */
export const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>> => {
  const len = as.length
  if (len === 0) {
    return A.empty
  }
  const r: Array<NonEmptyArray<A>> = []
  let head: A = as[0]
  let nea = fromNonEmptyArray([head])
  for (let i = 1; i < len; i++) {
    const x = as[i]
    if (S.equals(x, head)) {
      nea.push(x)
    } else {
      r.push(nea)
      head = x
      nea = fromNonEmptyArray([head])
    }
  }
  r.push(nea)
  return r
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { make, groupSort } from 'fp-ts/lib/NonEmptyArray2v'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [make(1, [1, 1]), make(2, [])])
 *
 * @since 1.15.0
 */
export const groupSort = <A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>) => {
  return compose(
    group(O),
    A.sort(O)
  )
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { make, groupBy } from 'fp-ts/lib/NonEmptyArray2v'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': make('foo', ['bar']),
 *   '6': make('foobar', [])
 * })
 *
 * @since 1.15.0
 */
export const groupBy = <A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } => {
  const r: { [key: string]: NonEmptyArray<A> } = {}
  for (const a of as) {
    const k = f(a)
    if (r.hasOwnProperty(k)) {
      r[k].push(a)
    } else {
      r[k] = make(a, [])
    }
  }
  return r
}

/**
 * @since 1.15.0
 */
export function last<A>(nea: NonEmptyArray<A>): A {
  return nea[nea.length - 1]
}

/**
 * @since 1.15.0
 */
export function sort<A>(O: Ord<A>): (nea: NonEmptyArray<A>) => NonEmptyArray<A> {
  return A.sort(O) as any
}

/**
 * @since 1.15.0
 */
export function findFirst<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>
export function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> {
  return A.findFirst(nea, predicate)
}

/**
 * @since 1.15.0
 */
export function findLast<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>
export function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> {
  return A.findLast(nea, predicate)
}

/**
 * @since 1.15.0
 */
export function findIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> {
  return A.findIndex(nea, predicate)
}

/**
 * @since 1.15.0
 */
export function findLastIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> {
  return A.findLastIndex(nea, predicate)
}

/**
 * @since 1.15.0
 */
export function insertAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> {
  return A.insertAt(i, a, nea) as any
}

/**
 * @since 1.15.0
 */
export function updateAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> {
  return A.updateAt(i, a, nea) as any
}

/**
 * @since 1.15.0
 */
export function filter<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<NonEmptyArray<A>>
export function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>>
export function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>> {
  return filterWithIndex(nea, (_, a) => predicate(a))
}

/**
 * @since 1.15.0
 */
export function filterWithIndex<A>(
  nea: NonEmptyArray<A>,
  predicate: (i: number, a: A) => boolean
): Option<NonEmptyArray<A>> {
  return fromArray(nea.filter((a, i) => predicate(i, a)))
}

const mapWithIndex = <A, B>(fa: NonEmptyArray<A>, f: (i: number, a: A) => B): NonEmptyArray<B> => {
  return fa.map((a, i) => f(i, a))
}

/**
 * Append an element to the end of an non empty array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray2v'
 *
 * assert.deepStrictEqual(snoc(fromNonEmptyArray([1, 2, 3]), 4), [1, 2, 3, 4])
 *
 * @since 1.16.0
 */
export const snoc: <A>(as: NonEmptyArray<A>, a: A) => NonEmptyArray<A> = array.snoc as any

/**
 * Append an element to the front of an non empty array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray2v'
 *
 * assert.deepStrictEqual(cons(1, fromNonEmptyArray([2, 3, 4])), [1, 2, 3, 4])
 *
 * @since 1.16.0
 */
export const cons: <A>(a: A, as: NonEmptyArray<A>) => NonEmptyArray<A> = array.cons as any

/**
 * @since 1.15.0
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = {
  URI,
  map: A.array.map as <A, B>(fa: NonEmptyArray<A>, f: (a: A) => B) => any,
  mapWithIndex,
  of: A.array.of as <A>(a: A) => NonEmptyArray<A>,
  ap: A.array.ap as <A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>) => any,
  chain: A.array.chain as <A, B>(fa: NonEmptyArray<A>, f: (a: A) => NonEmptyArray<B>) => any,
  extend: A.array.extend as <A, B>(ea: any, f: (fa: NonEmptyArray<A>) => B) => NonEmptyArray<B>,
  extract: head,
  reduce: A.array.reduce,
  foldMap: A.array.foldMap,
  foldr: A.array.foldr,
  traverse: A.array.traverse as Traverse1<any>,
  sequence: A.array.sequence as Sequence1<any>,
  reduceWithIndex: A.array.reduceWithIndex,
  foldMapWithIndex: A.array.foldMapWithIndex,
  foldrWithIndex: A.array.foldrWithIndex,
  traverseWithIndex: A.array.traverseWithIndex as TraverseWithIndex1<any, number>
}
