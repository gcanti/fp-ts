/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { NonEmptyArray } from './NonEmptyArray'
import { none, Option, some } from './Option'
import { Ord } from './Ord'
import { pipeable } from './pipeable'
import * as RA from './ReadonlyArray'
import { ReadonlyRecord } from './ReadonlyRecord'
import { getJoinSemigroup, getMeetSemigroup, Semigroup } from './Semigroup'
import { Show } from './Show'
import { TraversableWithIndex1 } from './TraversableWithIndex'

declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyNonEmptyArray: ReadonlyNonEmptyArray<A>
  }
}

/**
 * @since 2.5.0
 */
export const URI = 'ReadonlyNonEmptyArray'

/**
 * @since 2.5.0
 */
export type URI = typeof URI

/**
 * @since 2.5.0
 */
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A
}

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export const cons: <A>(head: A, tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = RA.cons

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.5.0
 */
export const snoc: <A>(init: ReadonlyArray<A>, end: A) => ReadonlyNonEmptyArray<A> = RA.snoc

/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @since 2.5.0
 */
export function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> {
  return RA.isNonEmpty(as) ? some(as) : none
}

/**
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray<A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>> {
  return fromReadonlyArray(RA.fromArray(as))
}

/**
 * @since 2.5.0
 */
export const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>> = RA.getShow

/**
 * @since 2.5.0
 */
export function head<A>(nea: ReadonlyNonEmptyArray<A>): A {
  return nea[0]
}

/**
 * @since 2.5.0
 */
export function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> {
  return nea.slice(1)
}

/**
 * @since 2.5.0
 */
export const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.reverse as any

/**
 * @since 2.5.0
 */
export function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A {
  const S = getMeetSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * @since 2.5.0
 */
export function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A {
  const S = getJoinSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @since 2.5.0
 */
export function getSemigroup<A = never>(): Semigroup<ReadonlyNonEmptyArray<A>> {
  return {
    concat: concat
  }
}

/**
 * @example
 * import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @since 2.5.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>> = RA.getEq

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.5.0
 */
export function group<A>(
  E: Eq<A>
): {
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  (as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  return as => {
    const len = as.length
    if (len === 0) {
      return RA.empty
    }
    // tslint:disable-next-line: readonly-array
    const r: Array<ReadonlyNonEmptyArray<A>> = []
    let head: A = as[0]
    let nea: NonEmptyArray<A> = [head]
    for (let i = 1; i < len; i++) {
      const x = as[i]
      if (E.equals(x, head)) {
        nea.push(x)
      } else {
        r.push(nea)
        head = x
        nea = [head]
      }
    }
    r.push(nea)
    return r
  }
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.5.0
 */
export function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  const sortO = RA.sort(O)
  const groupO = group(O)
  return as => groupO(sortO(as))
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.5.0
 */
export function groupBy<A>(
  f: (a: A) => string
): (as: ReadonlyArray<A>) => ReadonlyRecord<string, ReadonlyNonEmptyArray<A>> {
  return as => {
    const r: Record<string, NonEmptyArray<A>> = {}
    for (const a of as) {
      const k = f(a)
      if (r.hasOwnProperty(k)) {
        r[k].push(a)
      } else {
        r[k] = [a]
      }
    }
    return r
  }
}

/**
 * @since 2.5.0
 */
export function last<A>(nea: ReadonlyNonEmptyArray<A>): A {
  return nea[nea.length - 1]
}

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> {
  return nea.slice(0, -1)
}

/**
 * @since 2.5.0
 */
export function sort<A>(O: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> {
  return RA.sort(O) as any
}

/**
 * @since 2.5.0
 */
export function insertAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.insertAt(i, a) as any
}

/**
 * @since 2.5.0
 */
export function updateAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.updateAt(i, a) as any
}

/**
 * @since 2.5.0
 */
export function modifyAt<A>(
  i: number,
  f: (a: A) => A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.modifyAt(i, f) as any
}

/**
 * @since 2.5.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(
  predicate: Predicate<A>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return filterWithIndex((_, a) => predicate(a))
}

/**
 * @since 2.5.0
 */
export function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return nea => fromReadonlyArray(nea.filter((a, i) => predicate(i, a)))
}

/**
 * @since 2.5.0
 */
export const of: <A>(a: A) => ReadonlyNonEmptyArray<A> = RA.of as any

/**
 * @since 2.5.0
 */
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyArray<A>): ReadonlyArray<A> {
  return fx.concat(fy)
}

/**
 * @since 2.5.0
 */
export function fold<A>(S: Semigroup<A>): (fa: ReadonlyNonEmptyArray<A>) => A {
  return fa => fa.reduce(S.concat)
}

/**
 * @since 2.5.0
 */
export const readonlyNonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = {
  URI,
  map: RA.readonlyArray.map as any,
  mapWithIndex: RA.readonlyArray.mapWithIndex as any,
  of,
  ap: RA.readonlyArray.ap as any,
  chain: RA.readonlyArray.chain as any,
  extend: RA.readonlyArray.extend as any,
  extract: head,
  reduce: RA.readonlyArray.reduce,
  foldMap: RA.readonlyArray.foldMap,
  reduceRight: RA.readonlyArray.reduceRight,
  traverse: RA.readonlyArray.traverse as any,
  sequence: RA.readonlyArray.sequence as any,
  reduceWithIndex: RA.readonlyArray.reduceWithIndex,
  foldMapWithIndex: RA.readonlyArray.foldMapWithIndex,
  reduceRightWithIndex: RA.readonlyArray.reduceRightWithIndex,
  traverseWithIndex: RA.readonlyArray.traverseWithIndex as any,
  alt: (fx, fy) => concat(fx, fy())
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
} = pipeable(readonlyNonEmptyArray)

const foldMapWithIndex = <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) =>
  fa.slice(1).reduce((s, a, i) => S.concat(s, f(i + 1, a)), f(0, fa[0]))

const foldMap = <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) =>
  fa.slice(1).reduce((s, a) => S.concat(s, f(a)), f(fa[0]))

export {
  /**
   * @since 2.5.0
   */
  ap,
  /**
   * @since 2.5.0
   */
  apFirst,
  /**
   * @since 2.5.0
   */
  apSecond,
  /**
   * @since 2.5.0
   */
  chain,
  /**
   * @since 2.5.0
   */
  chainFirst,
  /**
   * @since 2.5.0
   */
  duplicate,
  /**
   * @since 2.5.0
   */
  extend,
  /**
   * @since 2.5.0
   */
  flatten,
  /**
   * @since 2.5.0
   */
  foldMap,
  /**
   * @since 2.5.0
   */
  foldMapWithIndex,
  /**
   * @since 2.5.0
   */
  map,
  /**
   * @since 2.5.0
   */
  mapWithIndex,
  /**
   * @since 2.5.0
   */
  reduce,
  /**
   * @since 2.5.0
   */
  reduceRight,
  /**
   * @since 2.5.0
   */
  reduceRightWithIndex,
  /**
   * @since 2.5.0
   */
  reduceWithIndex
}
