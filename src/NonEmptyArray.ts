import { Applicative } from './Applicative'
import {
  array,
  last,
  sort,
  lookup,
  findFirst as arrayFindFirst,
  findIndex as arrayFindIndex,
  insertAt as arrayInsertAt,
  updateAt as arrayUpdateAt,
  findLast as arrayFindLast,
  findLastIndex as arrayFindLastIndex
} from './Array'

import { Comonad1 } from './Comonad'
import { Foldable2v1 } from './Foldable2v'
import { compose, toString, Refinement, Predicate } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { none, Option, some } from './Option_'
import { Ord } from './Ord'
import { fold, getJoinSemigroup, getMeetSemigroup, Semigroup } from './Semigroup'
import { Setoid, getArraySetoid, fromEquals } from './Setoid'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { TraversableWithIndex1 } from './TraversableWithIndex'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray'

export type URI = typeof URI

/**
 * Data structure which represents non-empty arrays
 * @data
 * @constructor NonEmptyArray
 * @since 1.0.0
 */
export class NonEmptyArray<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly head: A, readonly tail: Array<A>) {}

  /**
   * Converts this {@link NonEmptyArray} to a plain {@link Array}
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
   */
  toArray(): Array<A> {
    return [this.head, ...this.tail]
  }

  /**
   * Converts this {@link NonEmptyArray} to a plain {@link Array} using the given map function
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).toArrayMap(s => s.length), [1, 2, 3])
   *
   * @since 1.14.0
   */
  toArrayMap<B>(f: (a: A) => B): Array<B> {
    return [f(this.head), ...this.tail.map(a => f(a))]
  }

  /**
   * Concatenates this {@link NonEmptyArray} and passed {@link Array}
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.deepStrictEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
   */
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, [...this.tail, ...as])
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const double = (n: number): number => n * 2
   * assert.deepStrictEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
   */
  map<B>(f: (a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }

  mapWithIndex<B>(f: (i: number, a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(0, this.head), array.mapWithIndex(this.tail, (i, a) => f(i + 1, a)))
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const x = new NonEmptyArray(1, [2])
   * const double = (n: number): number => n * 2
   * assert.deepStrictEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
   */
  ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> {
    return fab.chain(f => this.map(f)) // <= derived
  }

  /**
   * Flipped version of {@link ap}
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const x = new NonEmptyArray(1, [2])
   * const double = (n: number) => n * 2
   * assert.deepStrictEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
   */
  ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> {
    return fb.ap(this)
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const x = new NonEmptyArray(1, [2])
   * const f = (a: number) => new NonEmptyArray(a, [4])
   * assert.deepStrictEqual(x.chain(f).toArray(), [1, 4, 2, 4])
   */
  chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(this.tail, a => f(a).toArray()))
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const x = new NonEmptyArray(1, [2])
   * const y = new NonEmptyArray(3, [4])
   * assert.deepStrictEqual(x.concat(y).toArray(), [1, 2, 3, 4])
   */
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * const x = new NonEmptyArray('a', ['b'])
   * assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
   */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return array.reduce(this.toArray(), b, f)
  }

  /**
   * @since 1.12.0
   */
  reduceWithIndex<B>(b: B, f: (i: number, b: B, a: A) => B): B {
    return array.reduceWithIndex(this.toArray(), b, f)
  }

  /**
   * @since 1.12.0
   */
  foldr<B>(b: B, f: (a: A, b: B) => B): B {
    return this.foldrWithIndex(b, (_, a, b) => f(a, b))
  }

  /**
   * @since 1.12.0
   */
  foldrWithIndex<B>(b: B, f: (i: number, a: A, b: B) => B): B {
    return f(0, this.head, this.tail.reduceRight((acc, a, i) => f(i + 1, a, acc), b))
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { fold, monoidSum } from 'fp-ts/lib/Monoid'
   *
   * const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
   */
  extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> {
    return unsafeFromArray(array.extend(this.toArray(), as => f(unsafeFromArray(as))))
  }

  /**
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
   */
  extract(): A {
    return this.head
  }

  /**
   * Same as {@link toString}
   */
  inspect(): string {
    return this.toString()
  }

  /**
   * Return stringified representation of this {@link NonEmptyArray}
   */
  toString(): string {
    return `new NonEmptyArray(${toString(this.head)}, ${toString(this.tail)})`
  }

  /**
   * Gets minimum of this {@link NonEmptyArray} using specified {@link Ord} instance
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { ordNumber } from 'fp-ts/lib/Ord'
   *
   * assert.strictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
   *
   * @since 1.3.0
   */
  min(ord: Ord<A>): A {
    return fold(getMeetSemigroup(ord))(this.head)(this.tail)
  }

  /**
   * Gets maximum of this {@link NonEmptyArray} using specified {@link Ord} instance
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { ordNumber } from 'fp-ts/lib/Ord'
   *
   * assert.strictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
   *
   * @since 1.3.0
   */
  max(ord: Ord<A>): A {
    return fold(getJoinSemigroup(ord))(this.head)(this.tail)
  }

  /**
   * Gets last element of this {@link NonEmptyArray}
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.strictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
   * assert.strictEqual(new NonEmptyArray(1, []).last(), 1)
   *
   * @since 1.6.0
   */
  last(): A {
    return last(this.tail).getOrElse(this.head)
  }

  /**
   * Sorts this {@link NonEmptyArray} using specified {@link Ord} instance
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { ordNumber } from 'fp-ts/lib/Ord'
   *
   * assert.deepStrictEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
   *
   * @since 1.6.0
   */
  sort(ord: Ord<A>): NonEmptyArray<A> {
    return unsafeFromArray(sort(ord)(this.toArray()))
  }

  /**
   * Reverts this {@link NonEmptyArray}
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
   *
   * @since 1.6.0
   */
  reverse(): NonEmptyArray<A> {
    return unsafeFromArray(this.toArray().reverse())
  }

  /**
   * @since 1.10.0
   */
  length(): number {
    return 1 + this.tail.length
  }

  /**
   * This function provides a safe way to read a value at a particular index from an NonEmptyArray
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some, none } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).lookup(1), some(2))
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).lookup(3), none)
   *
   * @since 1.14.0
   */

  lookup(i: number): Option<A> {
    return i === 0 ? some(this.head) : lookup(i - 1, this.tail)
  }

  /**
   * @since 1.11.0
   * @deprecated
   */
  index(i: number): Option<A> {
    return this.lookup(i)
  }

  /**
   * Find the first element which satisfies a predicate (or a refinement) function
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findFirst(x => x.a === 1), some({ a: 1, b: 1 }))
   *
   * @since 1.11.0
   */
  findFirst<B extends A>(predicate: Refinement<A, B>): Option<B>
  findFirst(predicate: Predicate<A>): Option<A>
  findFirst(predicate: Predicate<A>): Option<A> {
    return predicate(this.head) ? some(this.head) : arrayFindFirst(this.tail, predicate)
  }
  /**
   * Find the last element which satisfies a predicate function
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findLast(x => x.a === 1), some({ a: 1, b: 2 }))
   *
   * @since 1.11.0
   */
  findLast<B extends A>(predicate: Refinement<A, B>): Option<B>
  findLast(predicate: Predicate<A>): Option<A>
  findLast(predicate: Predicate<A>): Option<A> {
    const a = arrayFindLast(this.tail, predicate)
    return a.isSome() ? a : predicate(this.head) ? some(this.head) : none
  }

  /**
   * Find the first index for which a predicate holds
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some, none } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).findIndex(x => x === 2), some(1))
   * assert.deepStrictEqual(new NonEmptyArray<number>(1, []).findIndex(x => x === 2), none)
   *
   * @since 1.11.0
   */
  findIndex(predicate: Predicate<A>): Option<number> {
    if (predicate(this.head)) {
      return some(0)
    } else {
      const i = arrayFindIndex(this.tail, predicate)
      return i.isSome() ? some(i.value + 1) : none
    }
  }

  /**
   * Returns the index of the last element of the list which matches the predicate
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some, none } from 'fp-ts/lib/Option'
   *
   * interface X {
   *   a: number
   *   b: number
   * }
   * const xs: NonEmptyArray<X> = new NonEmptyArray({ a: 1, b: 0 }, [{ a: 1, b: 1 }])
   * assert.deepStrictEqual(xs.findLastIndex(x => x.a === 1), some(1))
   * assert.deepStrictEqual(xs.findLastIndex(x => x.a === 4), none)
   *
   * @since 1.11.0
   */
  findLastIndex(predicate: Predicate<A>): Option<number> {
    const i = arrayFindLastIndex(this.tail, predicate)
    return i.isSome() ? some(i.value + 1) : predicate(this.head) ? some(0) : none
  }

  /**
   * Insert an element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).insertAt(2, 5), some(new NonEmptyArray(1, [2, 5, 3, 4])))
   *
   * @since 1.11.0
   */
  insertAt(i: number, a: A): Option<NonEmptyArray<A>> {
    if (i === 0) {
      return some(new NonEmptyArray(a, this.toArray()))
    } else {
      const t = arrayInsertAt(i - 1, a, this.tail)
      return t.isSome() ? some(new NonEmptyArray(this.head, t.value)) : none
    }
  }

  /**
   * Change the element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds
   *
   * @example
   * import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
   * import { some, none } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).updateAt(1, 1), some(new NonEmptyArray(1, [1, 3])))
   * assert.deepStrictEqual(new NonEmptyArray(1, []).updateAt(1, 1), none)
   *
   * @since 1.11.0
   */

  updateAt(i: number, a: A): Option<NonEmptyArray<A>> {
    if (i === 0) {
      return this.head === a ? some(this) : some(new NonEmptyArray(a, this.tail))
    } else {
      const t = arrayUpdateAt(i - 1, a, this.tail)
      return t.isSome() ? (t.value === this.tail ? some(this) : some(new NonEmptyArray(this.head, t.value))) : none
    }
  }

  /**
   * Filter an NonEmptyArray, keeping the elements which satisfy a predicate function, creating a new NonEmptyArray or returning `None` in case the resulting NonEmptyArray would have no remaining elements.
   *
   * @since 1.11.0
   */
  filter<B extends A>(predicate: Refinement<A, B>): Option<NonEmptyArray<B>>
  filter(predicate: Predicate<A>): Option<NonEmptyArray<A>>
  filter(predicate: Predicate<A>): Option<NonEmptyArray<A>> {
    return this.filterWithIndex((_, a) => predicate(a))
  }

  /**
   * @since 1.12.0
   */
  filterWithIndex(predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>> {
    const t = array.filterWithIndex(this.tail, (i, a) => predicate(i + 1, a))
    return predicate(0, this.head) ? some(new NonEmptyArray(this.head, t)) : fromArray(t)
  }

  /**
   * @since 1.14.0
   */
  some(predicate: Predicate<A>): boolean {
    return predicate(this.head) || this.tail.some(a => predicate(a))
  }

  /**
   * @since 1.14.0
   */
  every(predicate: Predicate<A>): boolean {
    return predicate(this.head) && this.tail.every(a => predicate(a))
  }
}

const unsafeFromArray = <A>(as: Array<A>): NonEmptyArray<A> => {
  return new NonEmptyArray(as[0], as.slice(1))
}

/**
 * Builds {@link NonEmptyArray} from {@link Array} returning {@link Option#none} or {@link Option#some} depending on amount of values in passed array
 *
 * @since 1.0.0
 */
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => {
  return as.length > 0 ? some(unsafeFromArray(as)) : none
}

const map = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => B): NonEmptyArray<B> => {
  return fa.map(f)
}

const mapWithIndex = <A, B>(fa: NonEmptyArray<A>, f: (i: number, a: A) => B): NonEmptyArray<B> => {
  return fa.mapWithIndex(f)
}

const of = <A>(a: A): NonEmptyArray<A> => {
  return new NonEmptyArray(a, [])
}

const ap = <A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> => {
  return fa.chain(f)
}

const concat = <A>(fx: NonEmptyArray<A>, fy: NonEmptyArray<A>): NonEmptyArray<A> => {
  return fx.concat(fy)
}

/**
 * Builds {@link Semigroup} instance for {@link NonEmptyArray} of specified type arument
 *
 * @since 1.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => {
  return { concat }
}

/**
 *
 * @example
 * import { NonEmptyArray, getSetoid } from 'fp-ts/lib/NonEmptyArray'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * const S = getSetoid(setoidNumber)
 * assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [])), true)
 * assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [2])), false)
 *
 * @since 1.14.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<NonEmptyArray<A>> => {
  const setoidTail = getArraySetoid(S)
  return fromEquals((x, y) => S.equals(x.head, y.head) && setoidTail.equals(x.tail, y.tail))
}

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { NonEmptyArray, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   new NonEmptyArray(1, []),
 *   new NonEmptyArray(2, []),
 *   new NonEmptyArray(1, [1])
 * ])
 *
 * @since 1.7.0
 */
export const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>> => {
  const r: Array<NonEmptyArray<A>> = []
  const len = as.length
  if (len === 0) {
    return r
  }
  let head: A = as[0]
  let tail: Array<A> = []
  for (let i = 1; i < len; i++) {
    const x = as[i]
    if (S.equals(x, head)) {
      tail.push(x)
    } else {
      r.push(new NonEmptyArray(head, tail))
      head = x
      tail = []
    }
  }
  r.push(new NonEmptyArray(head, tail))
  return r
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
 *
 * @since 1.7.0
 */
export const groupSort = <A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>) => {
  return compose(
    group(O),
    sort(O)
  )
}

const reduce = <A, B>(fa: NonEmptyArray<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: NonEmptyArray<A>, f: (a: A) => M): M => {
  return fa.tail.reduce((acc, a) => M.concat(acc, f(a)), f(fa.head))
}

const foldr = <A, B>(fa: NonEmptyArray<A>, b: B, f: (a: A, b: B) => B): B => {
  return fa.foldr(b, f)
}

const reduceWithIndex = <A, B>(fa: NonEmptyArray<A>, b: B, f: (i: number, b: B, a: A) => B): B => {
  return fa.reduceWithIndex(b, f)
}

const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(fa: NonEmptyArray<A>, f: (i: number, a: A) => M): M => {
  return fa.tail.reduce((acc, a, i) => M.concat(acc, f(i + 1, a)), f(0, fa.head))
}

const foldrWithIndex = <A, B>(fa: NonEmptyArray<A>, b: B, f: (i: number, a: A, b: B) => B): B => {
  return fa.foldrWithIndex(b, f)
}

const extend = <A, B>(fa: NonEmptyArray<A>, f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> => {
  return fa.extend(f)
}

const extract = <A>(fa: NonEmptyArray<A>): A => {
  return fa.extract()
}

function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: NonEmptyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}

function sequence<F>(F: Applicative<F>): <A>(ta: NonEmptyArray<HKT<F, A>>) => HKT<F, NonEmptyArray<A>> {
  const sequenceF = array.sequence(F)
  return <A>(ta: NonEmptyArray<HKT<F, A>>) =>
    F.ap(F.map(ta.head, a => (as: Array<A>) => new NonEmptyArray(a, as)), sequenceF(ta.tail))
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { NonEmptyArray, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': new NonEmptyArray('foo', ['bar']),
 *   '6': new NonEmptyArray('foobar', [])
 * })
 *
 * @since 1.10.0
 */
export const groupBy = <A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } => {
  const r: { [key: string]: NonEmptyArray<A> } = {}
  for (const a of as) {
    const k = f(a)
    if (r.hasOwnProperty(k)) {
      r[k].tail.push(a)
    } else {
      r[k] = new NonEmptyArray(a, [])
    }
  }
  return r
}

const traverseWithIndex = <F>(
  F: Applicative<F>
): (<A, B>(ta: NonEmptyArray<A>, f: (i: number, a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>>) => {
  const traverseWithIndexF = array.traverseWithIndex(F)
  return <A, B>(ta: NonEmptyArray<A>, f: (i: number, a: A) => HKT<F, B>) => {
    const fb = f(0, ta.head)
    const fbs = traverseWithIndexF(ta.tail, (i, a) => f(i + 1, a))
    return F.ap(F.map(fb, b => (bs: Array<B>) => new NonEmptyArray(b, bs)), fbs)
  }
}

/**
 * @since 1.0.0
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = {
  URI,
  extend,
  extract,
  map,
  mapWithIndex,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  reduceWithIndex,
  foldMapWithIndex,
  foldrWithIndex,
  traverseWithIndex
}
