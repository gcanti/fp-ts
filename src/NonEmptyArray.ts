/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import { pipeable } from './pipeable'
import * as RNEA from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'

/* tslint:disable:readonly-array */

declare module './HKT' {
  interface URItoKind<A> {
    readonly NonEmptyArray: NonEmptyArray<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'NonEmptyArray'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/* tslint:disable:readonly-keyword */
/**
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
/* tslint:enable:readonly-keyword */

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = RNEA.cons as any

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = RNEA.snoc as any

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>> = RNEA.fromArray as any

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = RNEA.getShow

/**
 * @since 2.0.0
 */
export const head: <A>(nea: NonEmptyArray<A>) => A = RNEA.head

/**
 * @since 2.0.0
 */
export const tail: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.tail as any

/**
 * @since 2.0.0
 */
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.reverse as any

/**
 * @since 2.0.0
 */
export const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.min

/**
 * @since 2.0.0
 */
export const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.max

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>> = RNEA.getSemigroup as any

/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = RNEA.getEq

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
export function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  return RNEA.group(E) as any
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export const groupSort: <A>(O: Ord<A>) => (as: Array<A>) => Array<NonEmptyArray<A>> = RNEA.groupSort as any

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export const groupBy: <A>(
  f: (a: A) => string
) => (as: Array<A>) => Record<string, NonEmptyArray<A>> = RNEA.groupBy as any

/**
 * @since 2.0.0
 */
export const last: <A>(nea: NonEmptyArray<A>) => A = RNEA.last

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export const init: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.init as any

/**
 * @since 2.0.0
 */
export const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.sort as any

/**
 * @since 2.0.0
 */
export const insertAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.insertAt as any

/**
 * @since 2.0.0
 */
export const updateAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.updateAt as any

/**
 * @since 2.0.0
 */
export const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.modifyAt as any

/**
 * @since 2.0.0
 */
export function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A> {
  const l = nea.length
  const as = Array(l)
  for (let i = 0; i < l; i++) {
    as[i] = nea[i]
  }
  return as as any
}

/**
 * @since 2.0.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> {
  return RNEA.filter(predicate) as any
}

/**
 * @since 2.0.0
 */
export const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.filterWithIndex as any

/**
 * @since 2.0.0
 */
export const of: <A>(a: A) => NonEmptyArray<A> = RNEA.of as any

/**
 * @since 2.2.0
 */
export function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
export function concat<A>(fx: Array<A>, fy: Array<A>): Array<A> {
  return RNEA.concat(fx as any, fy as any) as any
}

/**
 * @since 2.5.0
 */
export const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A = RNEA.fold

/**
 * @since 2.0.0
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = {
  URI,
  map: RNEA.readonlyNonEmptyArray.map as any,
  mapWithIndex: RNEA.readonlyNonEmptyArray.mapWithIndex as any,
  of,
  ap: RNEA.readonlyNonEmptyArray.ap as any,
  chain: RNEA.readonlyNonEmptyArray.chain as any,
  extend: RNEA.readonlyNonEmptyArray.extend as any,
  extract: head,
  reduce: RNEA.readonlyNonEmptyArray.reduce,
  foldMap: RNEA.readonlyNonEmptyArray.foldMap,
  reduceRight: RNEA.readonlyNonEmptyArray.reduceRight,
  traverse: RNEA.readonlyNonEmptyArray.traverse as any,
  sequence: RNEA.readonlyNonEmptyArray.sequence as any,
  reduceWithIndex: RNEA.readonlyNonEmptyArray.reduceWithIndex,
  foldMapWithIndex: RNEA.readonlyNonEmptyArray.foldMapWithIndex,
  reduceRightWithIndex: RNEA.readonlyNonEmptyArray.reduceRightWithIndex,
  traverseWithIndex: RNEA.readonlyNonEmptyArray.traverseWithIndex as any,
  alt: RNEA.readonlyNonEmptyArray.alt as any
}

const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  map,
  mapWithIndex,
  reduce,
  reduceRight,
  reduceRightWithIndex,
  reduceWithIndex
} = pipeable(nonEmptyArray)

const foldMapWithIndex = RNEA.foldMapWithIndex

const foldMap = RNEA.foldMap

export {
  /**
   * @since 2.0.0
   */
  ap,
  /**
   * @since 2.0.0
   */
  apFirst,
  /**
   * @since 2.0.0
   */
  apSecond,
  /**
   * @since 2.0.0
   */
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  duplicate,
  /**
   * @since 2.0.0
   */
  extend,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  foldMapWithIndex,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  mapWithIndex,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight,
  /**
   * @since 2.0.0
   */
  reduceRightWithIndex,
  /**
   * @since 2.0.0
   */
  reduceWithIndex
}
