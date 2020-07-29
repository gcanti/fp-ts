/**
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative as ApplicativeHKT, Applicative1 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Filter1, Filterable1, Partition1 } from './Filterable'
import {
  FilterableWithIndex1,
  PartitionWithIndex1,
  PredicateWithIndex,
  RefinementWithIndex
} from './FilterableWithIndex'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { identity, Lazy, Predicate, Refinement, pipe, bind_ } from './function'
import { Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { isSome, none, Option, some } from './Option'
import { fromCompare, getMonoid as getOrdMonoid, Ord, ordNumber } from './Ord'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable1 } from './Unfoldable'
import { PipeableWilt1, PipeableWither1, Witherable1 } from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray<A>(as: Array<A>): ReadonlyArray<A> {
  const l = as.length
  if (l === 0) {
    return empty
  }
  const ras = Array(l)
  for (let i = 0; i < l; i++) {
    ras[i] = as[i]
  }
  return ras
}

/**
 * @category destructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function toArray<A>(ras: ReadonlyArray<A>): Array<A> {
  const l = ras.length
  const as = Array(l)
  for (let i = 0; i < l; i++) {
    as[i] = ras[i]
  }
  return as
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getShow<A>(S: Show<A>): Show<ReadonlyArray<A>> {
  return {
    show: (as) => `[${as.map(S.show).join(', ')}]`
  }
}

const concat = <A>(x: ReadonlyArray<A>, y: ReadonlyArray<A>): ReadonlyArray<A> => {
  const lenx = x.length
  if (lenx === 0) {
    return y
  }
  const leny = y.length
  if (leny === 0) {
    return x
  }
  const r = Array(lenx + leny)
  for (let i = 0; i < lenx; i++) {
    r[i] = x[i]
  }
  for (let i = 0; i < leny; i++) {
    r[i + lenx] = y[i]
  }
  return r
}

/**
 * Returns a `Monoid` for `ReadonlyArray<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
export function getMonoid<A = never>(): Monoid<ReadonlyArray<A>> {
  return {
    concat,
    empty
  }
}

/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/Eq'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
export function getEq<A>(E: Eq<A>): Eq<ReadonlyArray<A>> {
  return {
    equals: (xs, ys) => xs === ys || (xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])))
  }
}

/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import { ordString } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
export function getOrd<A>(O: Ord<A>): Ord<ReadonlyArray<A>> {
  return fromCompare((a, b) => {
    const aLen = a.length
    const bLen = b.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      const ordering = O.compare(a[i], b[i])
      if (ordering !== 0) {
        return ordering
      }
    }
    return ordNumber.compare(aLen, bLen)
  })
}

/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
export function makeBy<A>(n: number, f: (i: number) => A): ReadonlyArray<A> {
  // tslint:disable-next-line: readonly-array
  const r: Array<A> = []
  for (let i = 0; i < n; i++) {
    r.push(f(i))
  }
  return r
}

/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.5.0
 */
export function range(start: number, end: number): ReadonlyArray<number> {
  return makeBy(end - start + 1, (i) => start + i)
}

/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
export function replicate<A>(n: number, a: A): ReadonlyArray<A> {
  return makeBy(n, () => a)
}

/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @category Monad
 * @since 2.5.0
 */
export function flatten<A>(mma: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A> {
  let rLen = 0
  const len = mma.length
  for (let i = 0; i < len; i++) {
    rLen += mma[i].length
  }
  const r = Array(rLen)
  let start = 0
  for (let i = 0; i < len; i++) {
    const arr = mma[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      r[j + start] = arr[j]
    }
    start += l
  }
  return r
}

/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.5.0
 */
export function foldLeft<A, B>(
  onNil: Lazy<B>,
  onCons: (head: A, tail: ReadonlyArray<A>) => B
): (as: ReadonlyArray<A>) => B {
  return (as) => (isEmpty(as) ? onNil() : onCons(as[0], as.slice(1)))
}

/**
 * Break an array into its initial elements and the last element
 *
 * @category destructors
 * @since 2.5.0
 */
export function foldRight<A, B>(
  onNil: Lazy<B>,
  onCons: (init: ReadonlyArray<A>, last: A) => B
): (as: ReadonlyArray<A>) => B {
  return (as) => (isEmpty(as) ? onNil() : onCons(as.slice(0, as.length - 1), as[as.length - 1]))
}

/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 * ```
 *
 * @category combinators
 * @since 2.5.0
 */
export function scanLeft<A, B>(b: B, f: (b: B, a: A) => B): (as: ReadonlyArray<A>) => ReadonlyArray<B> {
  return (as) => {
    const l = as.length
    // tslint:disable-next-line: readonly-array
    const r: Array<B> = new Array(l + 1)
    r[0] = b
    for (let i = 0; i < l; i++) {
      r[i + 1] = f(r[i], as[i])
    }
    return r
  }
}

/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.5.0
 */
export function scanRight<A, B>(b: B, f: (a: A, b: B) => B): (as: ReadonlyArray<A>) => ReadonlyArray<B> {
  return (as) => {
    const l = as.length
    // tslint:disable-next-line: readonly-array
    const r: Array<B> = new Array(l + 1)
    r[l] = b
    for (let i = l - 1; i >= 0; i--) {
      r[i] = f(as[i], r[i + 1])
    }
    return r
  }
}

/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.5.0
 */
export function isEmpty<A>(as: ReadonlyArray<A>): boolean {
  return as.length === 0
}

/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category guards
 * @since 2.5.0
 */
export function isNonEmpty<A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A> {
  return as.length > 0
}

/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
export function isOutOfBound<A>(i: number, as: ReadonlyArray<A>): boolean {
  return i < 0 || i >= as.length
}

// TODO: remove non-curried overloading in v3
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.5.0
 */
export function lookup(i: number): <A>(as: ReadonlyArray<A>) => Option<A>
export function lookup<A>(i: number, as: ReadonlyArray<A>): Option<A>
export function lookup<A>(i: number, as?: ReadonlyArray<A>): Option<A> | (<A>(as: ReadonlyArray<A>) => Option<A>) {
  return as === undefined ? (as) => lookup(i, as) : isOutOfBound(i, as) ? none : some(as[i])
}

// TODO: remove non-curried overloading in v3
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 2.5.0
 */
export function cons<A>(head: A): (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export function cons<A>(head: A, tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function cons<A>(
  head: A,
  tail?: ReadonlyArray<A>
): ReadonlyNonEmptyArray<A> | ((tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>) {
  if (tail === undefined) {
    return (tail) => cons(head, tail)
  }
  const len = tail.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i + 1] = tail[i]
  }
  r[0] = head
  return (r as unknown) as ReadonlyNonEmptyArray<A>
}

// TODO: curry and make data-last in v3
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export function snoc<A>(init: ReadonlyArray<A>, end: A): ReadonlyNonEmptyArray<A> {
  const len = init.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = init[i]
  }
  r[len] = end
  return (r as unknown) as ReadonlyNonEmptyArray<A>
}

/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
export function head<A>(as: ReadonlyArray<A>): Option<A> {
  return isEmpty(as) ? none : some(as[0])
}

/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
export function last<A>(as: ReadonlyArray<A>): Option<A> {
  return lookup(as.length - 1, as)
}

/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
export function tail<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> {
  return isEmpty(as) ? none : some(as.slice(1))
}

/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
export function init<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> {
  const len = as.length
  return len === 0 ? none : some(as.slice(0, len - 1))
}

/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export function takeLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => as.slice(0, n)
}

/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.5.0
 */
export function takeRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => (n === 0 ? empty : as.slice(-n))
}

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { takeLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
 *
 * @category combinators
 * @since 2.5.0
 */
export function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => {
    const i = spanIndexUncurry(as, predicate)
    const init = Array(i)
    for (let j = 0; j < i; j++) {
      init[j] = as[j]
    }
    return init
  }
}

const spanIndexUncurry = <A>(as: ReadonlyArray<A>, predicate: Predicate<A>): number => {
  const l = as.length
  let i = 0
  for (; i < l; i++) {
    if (!predicate(as[i])) {
      break
    }
  }
  return i
}

/**
 * @since 2.5.0
 */
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}

/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @since 2.5.0
 */
export function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Spanned<B, A>
export function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A>
export function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A> {
  return (as) => {
    const i = spanIndexUncurry(as, predicate)
    const init = Array(i)
    for (let j = 0; j < i; j++) {
      init[j] = as[j]
    }
    const l = as.length
    const rest = Array(l - i)
    for (let j = i; j < l; j++) {
      rest[j - i] = as[j]
    }
    return { init, rest }
  }
}

/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.5.0
 */
export function dropLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => as.slice(n, as.length)
}

/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export function dropRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => as.slice(0, as.length - n)
}

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 2.5.0
 */
export function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => {
    const i = spanIndexUncurry(as, predicate)
    const l = as.length
    const rest = Array(l - i)
    for (let j = i; j < l; j++) {
      rest[j - i] = as[j]
    }
    return rest
  }
}

/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
export function findIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number> {
  return (as) => {
    const len = as.length
    for (let i = 0; i < len; i++) {
      if (predicate(as[i])) {
        return some(i)
      }
    }
    return none
  }
}

/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findFirst((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 1 }))
 *
 * @since 2.5.0
 */
export function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
export function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A> {
  return (as) => {
    const len = as.length
    for (let i = 0; i < len; i++) {
      if (predicate(as[i])) {
        return some(as[i])
      }
    }
    return none
  }
}

/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
export function findFirstMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B> {
  return (as) => {
    const len = as.length
    for (let i = 0; i < len; i++) {
      const v = f(as[i])
      if (isSome(v)) {
        return v
      }
    }
    return none
  }
}

/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
 *
 * @since 2.5.0
 */
export function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
export function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A> {
  return (as) => {
    const len = as.length
    for (let i = len - 1; i >= 0; i--) {
      if (predicate(as[i])) {
        return some(as[i])
      }
    }
    return none
  }
}

/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
export function findLastMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B> {
  return (as) => {
    const len = as.length
    for (let i = len - 1; i >= 0; i--) {
      const v = f(as[i])
      if (isSome(v)) {
        return v
      }
    }
    return none
  }
}

/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
export function findLastIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number> {
  return (as) => {
    const len = as.length
    for (let i = len - 1; i >= 0; i--) {
      if (predicate(as[i])) {
        return some(i)
      }
    }
    return none
  }
}

/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
export function insertAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>> {
  return (as) => (i < 0 || i > as.length ? none : some(unsafeInsertAt(i, a, as)))
}

/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
export function updateAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>> {
  return (as) => (isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, a, as)))
}

/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
export function deleteAt(i: number): <A>(as: ReadonlyArray<A>) => Option<ReadonlyArray<A>> {
  return (as) => (isOutOfBound(i, as) ? none : some(unsafeDeleteAt(i, as)))
}

/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
export function modifyAt<A>(i: number, f: (a: A) => A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>> {
  return (as) => (isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, f(as[i]), as)))
}

/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.5.0
 */
export function reverse<A>(as: ReadonlyArray<A>): ReadonlyArray<A> {
  if (isEmpty(as)) {
    return as
  }
  return as.slice().reverse()
}

/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export function rights<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<A> {
  // tslint:disable-next-line: readonly-array
  const r: Array<A> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a._tag === 'Right') {
      r.push(a.right)
    }
  }
  return r
}

/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
export function lefts<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<E> {
  // tslint:disable-next-line: readonly-array
  const r: Array<E> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a._tag === 'Left') {
      r.push(a.left)
    }
  }
  return r
}

/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export const sort = <B>(O: Ord<B>) => <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  isEmpty(as) ? as : as.slice().sort(O.compare)

// TODO: curry and make data-last in v3
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.5.0
 */
export function zipWith<A, B, C>(fa: ReadonlyArray<A>, fb: ReadonlyArray<B>, f: (a: A, b: B) => C): ReadonlyArray<C> {
  // tslint:disable-next-line: readonly-array
  const fc: Array<C> = []
  const len = Math.min(fa.length, fb.length)
  for (let i = 0; i < len; i++) {
    fc[i] = f(fa[i], fb[i])
  }
  return fc
}

// TODO: remove non-curried overloading in v3
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @category combinators
 * @since 2.5.0
 */
export function zip<B>(bs: ReadonlyArray<B>): <A>(as: ReadonlyArray<A>) => ReadonlyArray<readonly [A, B]>
export function zip<A, B>(as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<readonly [A, B]>
export function zip<A, B>(
  as: ReadonlyArray<A>,
  bs?: ReadonlyArray<B>
): ReadonlyArray<readonly [A, B]> | ((bs: ReadonlyArray<B>) => ReadonlyArray<readonly [B, A]>) {
  if (bs === undefined) {
    return (bs) => zip(bs, as)
  }
  return zipWith(as, bs, (a, b) => [a, b])
}

/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
export function unzip<A, B>(as: ReadonlyArray<readonly [A, B]>): readonly [ReadonlyArray<A>, ReadonlyArray<B>] {
  // tslint:disable-next-line: readonly-array
  const fa: Array<A> = []
  // tslint:disable-next-line: readonly-array
  const fb: Array<B> = []

  for (let i = 0; i < as.length; i++) {
    fa[i] = as[i][0]
    fb[i] = as[i][1]
  }

  return [fa, fb]
}

/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export function rotate(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => {
    const len = as.length
    if (n === 0 || len <= 1 || len === Math.abs(n)) {
      return as
    } else if (n < 0) {
      return rotate(len + n)(as)
    } else {
      return as.slice(-n).concat(as.slice(0, len - n))
    }
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `ReadonlyArray<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(0)), false)
 *
 * @since 2.5.0
 */
export function elem<A>(
  E: Eq<A>
): {
  (a: A): (as: ReadonlyArray<A>) => boolean
  (a: A, as: ReadonlyArray<A>): boolean
}
export function elem<A>(E: Eq<A>): (a: A, as?: ReadonlyArray<A>) => boolean | ((as: ReadonlyArray<A>) => boolean) {
  return (a, as?) => {
    if (as === undefined) {
      const elemE = elem(E)
      return (as) => elemE(a, as)
    }
    const predicate = (element: A) => E.equals(element, a)
    let i = 0
    const len = as.length
    for (; i < len; i++) {
      if (predicate(as[i])) {
        return true
      }
    }
    return false
  }
}

/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
export function uniq<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  const elemS = elem(E)
  return (as) => {
    // tslint:disable-next-line: readonly-array
    const r: Array<A> = []
    const len = as.length
    let i = 0
    for (; i < len; i++) {
      const a = as[i]
      if (!elemS(a, r)) {
        r.push(a)
      }
    }
    return len === r.length ? as : r
  }
}

/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = ord.contramap(ordString, (p: Person) => p.name)
 * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.5.0
 */
export function sortBy<B>(ords: ReadonlyArray<Ord<B>>): <A extends B>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
  const M = getOrdMonoid<B>()
  return sort(ords.reduce(M.concat, M.empty))
}

/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/Eq'
 * import { chop, spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.5.0
 */
export const chop = <A, B>(f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, ReadonlyArray<A>]) => (
  as: ReadonlyArray<A>
): ReadonlyArray<B> => {
  // tslint:disable-next-line: readonly-array
  const result: Array<B> = []
  let cs: ReadonlyArray<A> = as
  while (isNonEmpty(cs)) {
    const [b, c] = f(cs)
    result.push(b)
    cs = c
  }
  return result
}

/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
export function splitAt(n: number): <A>(as: ReadonlyArray<A>) => readonly [ReadonlyArray<A>, ReadonlyArray<A>] {
  return (as) => [as.slice(0, n), as.slice(n)]
}

/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.5.0
 */
export function chunksOf(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>> {
  const f = chop(splitAt(n))
  return (as) => (as.length === 0 ? empty : isOutOfBound(n - 1, as) ? [as] : f(as))
}

/**
 * Array comprehension
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/ReadonlyArray'
 * import { tuple } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @since 2.5.0
 */
export function comprehension<A, B, C, D, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>, ReadonlyArray<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): ReadonlyArray<R>
export function comprehension<A, B, C, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): ReadonlyArray<R>
export function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
): ReadonlyArray<R>
export function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g?: (a: A) => R
): ReadonlyArray<R>
export function comprehension<R>(
  input: ReadonlyArray<ReadonlyArray<any>>,
  f: (...xs: ReadonlyArray<any>) => R,
  g: (...xs: ReadonlyArray<any>) => boolean = () => true
): ReadonlyArray<R> {
  const go = (scope: ReadonlyArray<any>, input: ReadonlyArray<ReadonlyArray<any>>): ReadonlyArray<R> => {
    if (input.length === 0) {
      return g(...scope) ? [f(...scope)] : empty
    } else {
      return chain_(input[0], (x) => go(snoc(scope, x), input.slice(1)))
    }
  }
  return go(empty, input)
}

// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(eqNumber)([2, 3])), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
export function union<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
export function union<A>(
  E: Eq<A>
): (xs: ReadonlyArray<A>, ys?: ReadonlyArray<A>) => ReadonlyArray<A> | ((ys: ReadonlyArray<A>) => ReadonlyArray<A>) {
  const elemE = elem(E)
  return (xs, ys?) => {
    if (ys === undefined) {
      const unionE = union(E)
      return (ys) => unionE(ys, xs)
    }
    return concat(
      xs,
      ys.filter((a) => !elemE(a, xs))
    )
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(eqNumber)([2, 3])), [2])
 *
 * @category combinators
 * @since 2.5.0
 */
export function intersection<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
export function intersection<A>(
  E: Eq<A>
): (xs: ReadonlyArray<A>, ys?: ReadonlyArray<A>) => ReadonlyArray<A> | ((ys: ReadonlyArray<A>) => ReadonlyArray<A>) {
  const elemE = elem(E)
  return (xs, ys?) => {
    if (ys === undefined) {
      const intersectionE = intersection(E)
      return (ys) => intersectionE(ys, xs)
    }
    return xs.filter((a) => elemE(a, ys))
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(eqNumber)([2, 3])), [1])
 *
 * @category combinators
 * @since 2.5.0
 */
export function difference<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
export function difference<A>(
  E: Eq<A>
): (xs: ReadonlyArray<A>, ys?: ReadonlyArray<A>) => ReadonlyArray<A> | ((ys: ReadonlyArray<A>) => ReadonlyArray<A>) {
  const elemE = elem(E)
  return (xs, ys?) => {
    if (ys === undefined) {
      const differenceE = difference(E)
      return (ys) => differenceE(ys, xs)
    }
    return xs.filter((a) => !elemE(a, ys))
  }
}

/**
 * @category Applicative
 * @since 2.5.0
 */
export const of = <A>(a: A): ReadonlyArray<A> => [a]

/**
 * @category Alternative
 * @since 2.7.0
 */
export const zero: Alternative1<URI>['zero'] = () => empty

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Monad1<URI>['map'] = (fa, f) => fa.map((a) => f(a))
const mapWithIndex_: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => fa.map((a, i) => f(i, a))
const ap_: Monad1<URI>['ap'] = (fab, fa) => flatten(map_(fab, (f) => map_(fa, f)))
const chainWithIndex_: <A, B>(fa: ReadonlyArray<A>, f: (i: number, a: A) => ReadonlyArray<B>) => ReadonlyArray<B> = (
  fa,
  f
) => {
  let outLen = 0
  const l = fa.length
  const temp = new Array(l)
  for (let i = 0; i < l; i++) {
    const e = fa[i]
    const arr = f(i, e)
    outLen += arr.length
    temp[i] = arr
  }
  const out = Array(outLen)
  let start = 0
  for (let i = 0; i < l; i++) {
    const arr = temp[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      out[j + start] = arr[j]
    }
    start += l
  }
  return out
}
const chain_: <A, B>(fa: ReadonlyArray<A>, f: (a: A) => ReadonlyArray<B>) => ReadonlyArray<B> = (fa, f) =>
  chainWithIndex_(fa, (_index, a) => f(a))
const filterMap_: Filterable1<URI>['filterMap'] = (as, f) => filterMapWithIndex_(as, (_, a) => f(a))
const filter_: Filter1<URI> = <A>(as: ReadonlyArray<A>, predicate: Predicate<A>) => as.filter(predicate)
const partitionWithIndex_: PartitionWithIndex1<URI, number> = <A>(
  fa: ReadonlyArray<A>,
  predicateWithIndex: (i: number, a: A) => boolean
): Separated<ReadonlyArray<A>, ReadonlyArray<A>> => {
  // tslint:disable-next-line: readonly-array
  const left: Array<A> = []
  // tslint:disable-next-line: readonly-array
  const right: Array<A> = []
  for (let i = 0; i < fa.length; i++) {
    const a = fa[i]
    if (predicateWithIndex(i, a)) {
      right.push(a)
    } else {
      left.push(a)
    }
  }
  return {
    left,
    right
  }
}
const partition_: Partition1<URI> = <A>(
  fa: ReadonlyArray<A>,
  predicate: Predicate<A>
): Separated<ReadonlyArray<A>, ReadonlyArray<A>> => {
  return partitionWithIndex_(fa, (_, a) => predicate(a))
}
const partitionMap_: Filterable1<URI>['partitionMap'] = (fa, f) => partitionMapWithIndex_(fa, (_, a) => f(a))
const partitionMapWithIndex_ = <A, B, C>(
  fa: ReadonlyArray<A>,
  f: (i: number, a: A) => Either<B, C>
): Separated<ReadonlyArray<B>, ReadonlyArray<C>> => {
  // tslint:disable-next-line: readonly-array
  const left: Array<B> = []
  // tslint:disable-next-line: readonly-array
  const right: Array<C> = []
  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i])
    if (e._tag === 'Left') {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return {
    left,
    right
  }
}
const alt_: Alt1<URI>['alt'] = (fa, that) => concat(fa, that())
const reduce_: Foldable1<URI>['reduce'] = (fa, b, f) => reduceWithIndex_(fa, b, (_, b, a) => f(b, a))
const foldMap_: Foldable1<URI>['foldMap'] = (M) => {
  const foldMapWithIndexM = foldMapWithIndex_(M)
  return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
}
const reduceRight_: Foldable1<URI>['reduceRight'] = (fa, b, f) => reduceRightWithIndex_(fa, b, (_, a, b) => f(a, b))
const reduceWithIndex_: FoldableWithIndex1<URI, number>['reduceWithIndex'] = (fa, b, f) => {
  const l = fa.length
  let r = b
  for (let i = 0; i < l; i++) {
    r = f(i, r, fa[i])
  }
  return r
}
const foldMapWithIndex_: FoldableWithIndex1<URI, number>['foldMapWithIndex'] = (M) => (fa, f) =>
  fa.reduce((b, a, i) => M.concat(b, f(i, a)), M.empty)
const reduceRightWithIndex_: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = (fa, b, f) =>
  fa.reduceRight((b, a, i) => f(i, a, b), b)
const filterMapWithIndex_ = <A, B>(fa: ReadonlyArray<A>, f: (i: number, a: A) => Option<B>): ReadonlyArray<B> => {
  // tslint:disable-next-line: readonly-array
  const result: Array<B> = []
  for (let i = 0; i < fa.length; i++) {
    const optionB = f(i, fa[i])
    if (isSome(optionB)) {
      result.push(optionB.value)
    }
  }
  return result
}
const filterWithIndex_ = <A>(
  fa: ReadonlyArray<A>,
  predicateWithIndex: (i: number, a: A) => boolean
): ReadonlyArray<A> => {
  return fa.filter((a, i) => predicateWithIndex(i, a))
}
const extend_: Extend1<URI>['extend'] = (fa, f) => fa.map((_, i, as) => f(as.slice(i)))
const traverse_ = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(ta: ReadonlyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex_(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}
const traverseWithIndex_ = <F>(F: ApplicativeHKT<F>) => <A, B>(
  ta: ReadonlyArray<A>,
  f: (i: number, a: A) => HKT<F, B>
): HKT<F, ReadonlyArray<B>> => {
  return reduceWithIndex_(ta, F.of<ReadonlyArray<B>>(zero()), (i, fbs, a) =>
    F.ap(
      F.map(fbs, (bs) => (b: B) => snoc(bs, b)),
      f(i, a)
    )
  )
}
const wither_ = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(ta: ReadonlyArray<A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseF = traverse_(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}
const wilt_ = <F>(
  F: ApplicativeHKT<F>
): (<A, B, C>(
  wa: ReadonlyArray<A>,
  f: (a: A) => HKT<F, Either<B, C>>
) => HKT<F, Separated<ReadonlyArray<B>, ReadonlyArray<C>>>) => {
  const traverseF = traverse_(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.5.0
 */
export const alt: <A>(that: Lazy<ReadonlyArray<A>>) => (fa: ReadonlyArray<A>) => ReadonlyArray<A> = (that) => (fa) =>
  alt_(fa, that)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.5.0
 */
export const ap: <A>(fa: ReadonlyArray<A>) => <B>(fab: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B> = (fa) => (
  fab
) => ap_(fab, fa)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.5.0
 */
export const apFirst: <B>(fb: ReadonlyArray<B>) => <A>(fa: ReadonlyArray<A>) => ReadonlyArray<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.5.0
 */
export const apSecond = <B>(fb: ReadonlyArray<B>) => <A>(fa: ReadonlyArray<A>): ReadonlyArray<B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
export const chain: <A, B>(f: (a: A) => ReadonlyArray<B>) => (ma: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (ma) =>
  chain_(ma, f)

/**
 * @since 2.7.0
 */
export const chainWithIndex: <A, B>(
  f: (i: number, a: A) => ReadonlyArray<B>
) => (ma: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (ma) => chainWithIndex_(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.5.0
 */
export const chainFirst: <A, B>(f: (a: A) => ReadonlyArray<B>) => (ma: ReadonlyArray<A>) => ReadonlyArray<A> = (f) => (
  ma
) => chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Extend
 * @since 2.5.0
 */
export const duplicate: <A>(wa: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>> = (wa) => extend_(wa, identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (fa) => map_(fa, f)

/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (
  fa
) => mapWithIndex_(fa, f)

/**
 * @category Compactable
 * @since 2.5.0
 */
export const compact: <A>(fa: ReadonlyArray<Option<A>>) => ReadonlyArray<A> = (as) => filterMap_(as, identity)

/**
 * @category Compactable
 * @since 2.5.0
 */
export const separate = <A, B>(fa: ReadonlyArray<Either<A, B>>): Separated<ReadonlyArray<A>, ReadonlyArray<B>> => {
  // tslint:disable-next-line: readonly-array
  const left: Array<A> = []
  // tslint:disable-next-line: readonly-array
  const right: Array<B> = []
  for (const e of fa) {
    if (e._tag === 'Left') {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return {
    left,
    right
  }
}

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
} = <A>(predicate: Predicate<A>) => (fa: ReadonlyArray<A>) => filter_(fa, predicate)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (fa) =>
  filterMap_(fa, f)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
} = <A>(predicate: Predicate<A>) => (fa: ReadonlyArray<A>) => partition_(fa, predicate)

/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
} = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (fa: ReadonlyArray<A>) =>
  partitionWithIndex_(fa, predicateWithIndex)

/**
 * @category Filterable
 * @since 2.5.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<B>, ReadonlyArray<C>> = (f) => (fa) => partitionMap_(fa, f)

/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<B>, ReadonlyArray<C>> = (f) => (fa) =>
  partitionMapWithIndex_(fa, f)

/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => Option<B>
) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (fa) => filterMapWithIndex_(fa, f)

/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
export const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
} = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (fa: ReadonlyArray<A>): ReadonlyArray<A> =>
  filterWithIndex_(fa, predicateWithIndex)

/**
 * @category Extend
 * @since 2.5.0
 */
export const extend: <A, B>(f: (fa: ReadonlyArray<A>) => B) => (wa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (
  ma
) => extend_(ma, f)

/**
 * @category Foldable
 * @since 2.5.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyArray<A>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: ReadonlyArray<A>) => M = (
  M
) => {
  const foldMapWithIndexM = foldMapWithIndex_(M)
  return (f) => (fa) => foldMapWithIndexM(fa, f)
}

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B = (b, f) => (fa) =>
  reduce_(fa, b, f)

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B = (b, f) => (
  fa
) => reduceWithIndex_(fa, b, f)

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B = (
  b,
  f
) => (fa) => reduceRightWithIndex_(fa, b, f)

/**
 * @category Traversable
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseF = traverse_(F)
  return (f) => (ta) => traverseF(ta, f)
}

/**
 * @category Traversable
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(F: ApplicativeHKT<F>) => <A>(
  ta: ReadonlyArray<HKT<F, A>>
): HKT<F, ReadonlyArray<A>> => {
  return reduce_(ta, F.of(zero()), (fas, fa) =>
    F.ap(
      F.map(fas, (as) => (a: A) => snoc(as, a)),
      fa
    )
  )
}

/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (i: number, a: A) => HKT<F, B>) => (ta: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex_(F)
  return (f) => (ta) => traverseWithIndexF(ta, f)
}

/**
 * @category Witherable
 * @since 2.6.5
 */
export const wither: PipeableWither1<URI> = <F>(
  F: ApplicativeHKT<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) => {
  const witherF = wither_(F)
  return (f) => (ta) => witherF(ta, f)
}

/**
 * @category Witherable
 * @since 2.6.5
 */
export const wilt: PipeableWilt1<URI> = <F>(
  F: ApplicativeHKT<F>
): (<A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (wa: ReadonlyArray<A>) => HKT<F, Separated<ReadonlyArray<B>, ReadonlyArray<C>>>) => {
  const wiltF = wilt_(F)
  return (f) => (ta) => wiltF(ta, f)
}

/**
 * @category Unfoldable
 * @since 2.6.6
 */
export const unfold = <A, B>(b: B, f: (b: B) => Option<readonly [A, B]>): ReadonlyArray<A> => {
  // tslint:disable-next-line: readonly-array
  const ret: Array<A> = []
  let bb: B = b
  while (true) {
    const mt = f(bb)
    if (isSome(mt)) {
      const [a, b] = mt.value
      ret.push(a)
      bb = b
    } else {
      break
    }
  }
  return ret
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyArray'

/**
 * @category instances
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: ReadonlyArray<A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Unfoldable: Unfoldable1<URI> = {
  URI,
  unfold
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: map_,
  alt: alt_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  alt: alt_,
  zero
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Extend: Extend1<URI> = {
  URI,
  map: map_,
  extend: extend_
}

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
export const FilterableWithIndex: FilterableWithIndex1<URI, number> = {
  URI,
  map: map_,
  mapWithIndex: mapWithIndex_,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  partitionMapWithIndex: partitionMapWithIndex_,
  partitionWithIndex: partitionWithIndex_,
  filterMapWithIndex: filterMapWithIndex_,
  filterWithIndex: filterWithIndex_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
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
export const Traversable: Traversable1<URI> = {
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
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
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
export const Witherable: Witherable1<URI> = {
  URI,
  map: map_,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  wither: wither_,
  wilt: wilt_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export const readonlyArray: FunctorWithIndex1<URI, number> &
  Monad1<URI> &
  Unfoldable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  FilterableWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  TraversableWithIndex1<URI, number> &
  Witherable1<URI> = {
  URI,
  compact,
  separate,
  map: map_,
  ap: ap_,
  of,
  chain: chain_,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  mapWithIndex: mapWithIndex_,
  partitionMapWithIndex: partitionMapWithIndex_,
  partitionWithIndex: partitionWithIndex_,
  filterMapWithIndex: filterMapWithIndex_,
  filterWithIndex: filterWithIndex_,
  alt: alt_,
  zero,
  unfold,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  reduceWithIndex: reduceWithIndex_,
  foldMapWithIndex: foldMapWithIndex_,
  reduceRightWithIndex: reduceRightWithIndex_,
  traverseWithIndex: traverseWithIndex_,
  extend: extend_,
  wither: wither_,
  wilt: wilt_
}

// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------

/**
 * @category unsafe
 * @since 2.5.0
 */
export function unsafeInsertAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A> {
  const xs = as.slice()
  xs.splice(i, 0, a)
  return xs
}

/**
 * @category unsafe
 * @since 2.5.0
 */
export function unsafeUpdateAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A> {
  if (as[i] === a) {
    return as
  } else {
    const xs = as.slice()
    xs[i] = a
    return xs
  }
}

/**
 * @category unsafe
 * @since 2.5.0
 */
export function unsafeDeleteAt<A>(i: number, as: ReadonlyArray<A>): ReadonlyArray<A> {
  const xs = as.slice()
  xs.splice(i, 1)
  return xs
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * An empty array
 *
 * @since 2.5.0
 */
export const empty: ReadonlyArray<never> = []

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N) => <A>(fa: ReadonlyArray<A>): ReadonlyArray<{ [K in N]: A }> =>
  pipe(
    fa,
    map((a) => bind_({}, name, a))
  )

/**
 * @since 2.8.0
 */
export const bind = <N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => ReadonlyArray<B>) => (
  fa: ReadonlyArray<A>
): ReadonlyArray<{ [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
  pipe(
    fa,
    chain((a) =>
      pipe(
        f(a),
        map((b) => bind_(a, name, b))
      )
    )
  )
