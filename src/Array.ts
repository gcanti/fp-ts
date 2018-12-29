import { Alternative1 } from './Alternative'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Extend1 } from './Extend'
import { FilterableWithIndex1 } from './FilterableWithIndex'
import { Foldable2v1 } from './Foldable2v'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { concat, Endomorphism, identity, Predicate, Refinement, tuple } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { none, Option, some } from './Option'
import { getSemigroup, Ord, ordNumber } from './Ord'
import { Ordering } from './Ordering'
import { Plus1 } from './Plus'
import { getArraySetoid, Setoid } from './Setoid'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

// Adapted from https://github.com/purescript/purescript-arrays

declare global {
  interface Array<T> {
    /** phantom property added by `fp-ts` */
    _URI: URI
    /** phantom property added by `fp-ts` */
    _A: T
  }
}

declare module './HKT' {
  interface URI2HKT<A> {
    Array: Array<A>
  }
}

export const URI = 'Array'

export type URI = typeof URI

/**
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @function
 * @since 1.0.0
 */
export const getMonoid = <A = never>(): Monoid<Array<A>> => {
  return {
    concat,
    empty
  }
}

/**
 * Derives a Setoid over the Array of a given element type from the Setoid of that type. The derived setoid defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given setoid `S`. In case of
 * arrays of different lengths, the result is non equality.
 *
 *
 * @example
 * import { ordString } from 'fp-ts/lib/Ord'
 *
 * const O = getArraySetoid(ordString)
 * assert.strictEqual(O.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(O.equals(['a'], []), false)
 *
 * @constant
 * @since 1.0.0
 */
export const getSetoid: <A>(S: Setoid<A>) => Setoid<Array<A>> = getArraySetoid

/**
 * Derives an `Ord` over the Array of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 *
 * @example
 * import { getOrd } from 'fp-ts/lib/Array'
 * import { ordString } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 * @function
 * @since 1.2.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<Array<A>> => {
  return {
    ...getSetoid(O),
    compare: (a: Array<A>, b: Array<A>): Ordering => {
      const aLen = a.length
      const bLen = b.length
      const len = Math.min(aLen, bLen)
      for (let i = 0; i < len; i++) {
        const order = O.compare(a[i], b[i])
        if (order !== 0) {
          return order
        }
      }
      return ordNumber.compare(aLen, bLen)
    }
  }
}

const map = <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => {
  return fa.map(a => f(a))
}

const mapWithIndex = <A, B>(fa: Array<A>, f: (index: number, a: A) => B): Array<B> => {
  return fa.map((a, i) => f(i, a))
}

const of = <A>(a: A): Array<A> => {
  return [a]
}

const ap = <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> => {
  return flatten(map(fab, f => map(fa, f)))
}

const chain = <A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B> => {
  let resLen = 0
  const l = fa.length
  const temp = new Array(l)
  for (let i = 0; i < l; i++) {
    const e = fa[i]
    const arr = f(e)
    resLen += arr.length
    temp[i] = arr
  }
  const r = Array(resLen)
  let start = 0
  for (let i = 0; i < l; i++) {
    const arr = temp[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      r[j + start] = arr[j]
    }
    start += l
  }
  return r
}

const reduce = <A, B>(fa: Array<A>, b: B, f: (b: B, a: A) => B): B => {
  return reduceWithIndex(fa, b, (_, b, a) => f(b, a))
}

const foldMap = <M>(M: Monoid<M>): (<A>(fa: Array<A>, f: (a: A) => M) => M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
}

const reduceRight = <A, B>(fa: Array<A>, b: B, f: (a: A, b: B) => B): B => {
  return foldrWithIndex(fa, b, (_, a, b) => f(a, b))
}

const reduceWithIndex = <A, B>(fa: Array<A>, b: B, f: (i: number, b: B, a: A) => B): B => {
  const l = fa.length
  let r = b
  for (let i = 0; i < l; i++) {
    r = f(i, r, fa[i])
  }
  return r
}

const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(fa: Array<A>, f: (i: number, a: A) => M): M => {
  return fa.reduce((b, a, i) => M.concat(b, f(i, a)), M.empty)
}

const foldrWithIndex = <A, B>(fa: Array<A>, b: B, f: (i: number, a: A, b: B) => B): B => {
  return fa.reduceRight((b, a, i) => f(i, a, b), b)
}

/**
 * Use {@link array}`.traverse` instead
 * @function
 * @since 1.0.0
 * @deprecated
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Array<A>, f: (a: A) => Type<F, B>) => Type<F, Array<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Array<HKT<F, A>>): HKT<F, Array<A>> => {
  return reduce(ta, F.of<Array<A>>(zero()), (fas, fa) => F.ap(F.map(fas, as => (a: A) => snoc(as, a)), fa))
}

/**
 * An empty array
 *
 * @constant
 * @since 1.9.0
 */
export const empty: Array<never> = []

const zero = <A>(): Array<A> => empty

const alt = concat

const unfoldr = <A, B>(b: B, f: (b: B) => Option<[A, B]>): Array<A> => {
  const ret: Array<A> = []
  let bb = b
  while (true) {
    const mt = f(bb)
    if (mt.isSome()) {
      const [a, b] = mt.value
      ret.push(a)
      bb = b
    } else {
      break
    }
  }
  return ret
}

/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/lib/Array'
 *
 * const double = (n: number): number => n * 2
 * assert.deepEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @function
 * @since 1.10.0
 */
export const makeBy = <A>(n: number, f: (i: number) => A): Array<A> => {
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
 * import { range } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @function
 * @since 1.10.0
 */
export const range = (start: number, end: number): Array<number> => {
  return makeBy(end - start + 1, i => start + i)
}

/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @function
 * @since 1.10.0
 */
export const replicate = <A>(n: number, a: A): Array<A> => {
  return makeBy(n, () => a)
}

const extend = <A, B>(fa: Array<A>, f: (fa: Array<A>) => B): Array<B> => {
  return fa.map((_, i, as) => f(as.slice(i)))
}

/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @function
 * @since 1.0.0
 */
export const flatten = <A>(ffa: Array<Array<A>>): Array<A> => {
  let rLen = 0
  const len = ffa.length
  for (let i = 0; i < len; i++) {
    rLen += ffa[i].length
  }
  const r = Array(rLen)
  let start = 0
  for (let i = 0; i < len; i++) {
    const arr = ffa[i]
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
 * import { fold } from 'fp-ts/lib/Array'
 *
 * const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @function
 * @since 1.0.0
 */
export const fold = <A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B => {
  return isEmpty(as) ? b : cons(as[0], as.slice(1))
}

/**
 * Lazy version of {@link fold}
 * @function
 * @since 1.0.0
 */
export const foldL = <A, B>(as: Array<A>, nil: () => B, cons: (head: A, tail: Array<A>) => B): B => {
  return isEmpty(as) ? nil() : cons(as[0], as.slice(1))
}

/**
 * Break an array into its initial elements and the last element
 * @function
 * @since 1.7.0
 * @param as
 * @param b
 * @param cons
 */
export const foldr = <A, B>(as: Array<A>, b: B, cons: (init: Array<A>, last: A) => B): B => {
  return isEmpty(as) ? b : cons(as.slice(0, as.length - 1), as[as.length - 1])
}

/**
 * Lazy version of {@link foldr}
 * @function
 * @since 1.7.0
 * @param as
 * @param nil
 * @param cons
 */
export const foldrL = <A, B>(as: Array<A>, nil: () => B, cons: (init: Array<A>, last: A) => B): B => {
  return isEmpty(as) ? nil() : cons(as.slice(0, as.length - 1), as[as.length - 1])
}

/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from 'fp-ts/lib/Array'
 *
 * scanLeft([1, 2, 3], 10, (b, a) => b - a) // [ 10, 9, 7, 4 ]
 * ```
 *
 * @function
 * @since 1.1.0
 */
export const scanLeft = <A, B>(as: Array<A>, b: B, f: ((b: B, a: A) => B)): Array<B> => {
  const l = as.length
  const r: Array<B> = new Array(l + 1)
  r[0] = b
  for (let i = 0; i < l; i++) {
    r[i + 1] = f(r[i], as[i])
  }
  return r
}

/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(scanRight([1, 2, 3], 10, (a, b) => b - a), [ 4, 5, 7, 10 ])
 *
 * @function
 * @since 1.1.0
 */
export const scanRight = <A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B> => {
  const l = as.length
  const r: Array<B> = new Array(l + 1)
  r[l] = b
  for (let i = l - 1; i >= 0; i--) {
    r[i] = f(as[i], r[i + 1])
  }
  return r
}

/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/lib/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @function
 * @since 1.0.0
 */
export const isEmpty = <A>(as: Array<A>): boolean => {
  return as.length === 0
}

/**
 * Test whether an array contains a particular index
 * @function
 * @since 1.0.0
 */
export const isOutOfBound = <A>(i: number, as: Array<A>): boolean => {
  return i < 0 || i >= as.length
}

/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { index } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(index(1, [1, 2, 3]), some(2))
 * assert.deepEqual(index(3, [1, 2, 3]), none)
 *
 * @function
 * @since 1.0.0
 */
export const index = <A>(i: number, as: Array<A>): Option<A> => {
  return isOutOfBound(i, as) ? none : some(as[i])
}

/**
 * Attaches an element to the front of an array, creating a new array
 *
 * @example
 * import { cons } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
 *
 * @function
 * @since 1.0.0
 */
export const cons = <A>(a: A, as: Array<A>): Array<A> => {
  const len = as.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i + 1] = as[i]
  }
  r[0] = a
  return r
}

/**
 * Append an element to the end of an array, creating a new array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @function
 * @since 1.0.0
 */
export const snoc = <A>(as: Array<A>, a: A): Array<A> => {
  const len = as.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = as[i]
  }
  r[len] = a
  return r
}

/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(head([1, 2, 3]), some(1))
 * assert.deepEqual(head([]), none)
 *
 * @function
 * @since 1.0.0
 */
export const head = <A>(as: Array<A>): Option<A> => {
  return isEmpty(as) ? none : some(as[0])
}

/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(last([1, 2, 3]), some(3))
 * assert.deepEqual(last([]), none)
 *
 * @function
 * @since 1.0.0
 */
export const last = <A>(as: Array<A>): Option<A> => {
  return index(as.length - 1, as)
}

/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepEqual(tail([]), none)
 *
 * @function
 * @since 1.0.0
 */
export const tail = <A>(as: Array<A>): Option<Array<A>> => {
  return isEmpty(as) ? none : some(as.slice(1))
}

/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepEqual(init([]), none)
 *
 * @function
 * @since 1.0.0
 */
export const init = <A>(as: Array<A>): Option<Array<A>> => {
  const len = as.length
  return len === 0 ? none : some(as.slice(0, len - 1))
}

/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { take } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(take(2, [1, 2, 3]), [1, 2])
 *
 * @function
 * @since 1.0.0
 */
export const take = <A>(n: number, as: Array<A>): Array<A> => {
  return as.slice(0, n)
}

/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeEnd } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(takeEnd(2, [1, 2, 3, 4, 5]), [4, 5])
 *
 * @function
 * @since 1.10.0
 */
export const takeEnd = <A>(n: number, as: Array<A>): Array<A> => {
  return n === 0 ? empty : as.slice(-n)
}

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { takeWhile } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
 *
 * @function
 * @since 1.0.0
 */
export function takeWhile<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A> {
  const i = spanIndexUncurry(as, predicate)
  const init = Array(i)
  for (let j = 0; j < i; j++) {
    init[j] = as[j]
  }
  return init
}

const spanIndexUncurry = <A>(as: Array<A>, predicate: Predicate<A>): number => {
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
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { span } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @function
 * @since 1.0.0
 */
export function span<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): { init: Array<B>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> } {
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

/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { drop } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(drop(2, [1, 2, 3]), [3])
 *
 * @function
 * @since 1.0.0
 */
export const drop = <A>(n: number, as: Array<A>): Array<A> => {
  return as.slice(n, as.length)
}

/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropEnd } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(dropEnd(2, [1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @function
 * @since 1.10.0
 */
export const dropEnd = <A>(n: number, as: Array<A>): Array<A> => {
  return as.slice(0, as.length - n)
}

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropWhile } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
 *
 * @function
 * @since 1.0.0
 */
export const dropWhile = <A>(as: Array<A>, predicate: Predicate<A>): Array<A> => {
  const i = spanIndexUncurry(as, predicate)
  const l = as.length
  const rest = Array(l - i)
  for (let j = i; j < l; j++) {
    rest[j - i] = as[j]
  }
  return rest
}

/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(findIndex([1, 2, 3], x => x === 2), some(1))
 * assert.deepEqual(findIndex([], x => x === 2), none)
 *
 * @function
 * @since 1.0.0
 */
export const findIndex = <A>(as: Array<A>, predicate: Predicate<A>): Option<number> => {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return some(i)
    }
  }
  return none
}

/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
 *
 * @function
 * @since 1.0.0
 */
export function findFirst<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A> {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return some(as[i])
    }
  }
  return none
}

/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
 *
 * @function
 * @since 1.0.0
 */
export function findLast<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A> {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return some(as[i])
    }
  }
  return none
}

/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepEqual(findLastIndex(xs, x => x.a === 1), some(1))
 * assert.deepEqual(findLastIndex(xs, x => x.a === 4), none)
 *
 * @function
 * @since 1.10.0
 */
export const findLastIndex = <A>(as: Array<A>, predicate: Predicate<A>): Option<number> => {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return some(i)
    }
  }
  return none
}

/**
 * Use {@link filter} instead
 * @function
 * @since 1.0.0
 * @deprecated
 */
export const refine = <A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B> => {
  return filter(as, refinement)
}

/**
 * @function
 * @since 1.0.0
 */
export const copy = <A>(as: Array<A>): Array<A> => {
  const l = as.length
  const r = Array(l)
  for (let i = 0; i < l; i++) {
    r[i] = as[i]
  }
  return r
}

/**
 * @function
 * @since 1.0.0
 */
export const unsafeInsertAt = <A>(i: number, a: A, as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs.splice(i, 0, a)
  return xs
}

/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @function
 * @since 1.0.0
 */
export const insertAt = <A>(i: number, a: A, as: Array<A>): Option<Array<A>> => {
  return i < 0 || i > as.length ? none : some(unsafeInsertAt(i, a, as))
}

/**
 * @function
 * @since 1.0.0
 */
export const unsafeUpdateAt = <A>(i: number, a: A, as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs[i] = a
  return xs
}

/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(updateAt(1, 1, [1, 2, 3]), some([1, 1, 3]))
 * assert.deepEqual(updateAt(1, 1, []), none)
 *
 * @function
 * @since 1.0.0
 */
export const updateAt = <A>(i: number, a: A, as: Array<A>): Option<Array<A>> => {
  return isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, a, as))
}

/**
 * @function
 * @since 1.0.0
 */
export const unsafeDeleteAt = <A>(i: number, as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs.splice(i, 1)
  return xs
}

/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(deleteAt(0, [1, 2, 3]), some([2, 3]))
 * assert.deepEqual(deleteAt(1, []), none)
 *
 * @function
 * @since 1.0.0
 */
export const deleteAt = <A>(i: number, as: Array<A>): Option<Array<A>> => {
  return isOutOfBound(i, as) ? none : some(unsafeDeleteAt(i, as))
}

/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepEqual(modifyAt([1, 2, 3], 1, double), some([1, 4, 3]))
 * assert.deepEqual(modifyAt([], 1, double), none)
 *
 * @function
 * @since 1.0.0
 */
export const modifyAt = <A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>> => {
  return isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, f(as[i]), as))
}

/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @function
 * @since 1.0.0
 */
export const reverse = <A>(as: Array<A>): Array<A> => {
  return copy(as).reverse()
}

/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/lib/Array'
 * import { right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @function
 * @since 1.0.0
 */
export const rights = <L, A>(as: Array<Either<L, A>>): Array<A> => {
  const r: Array<A> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a.isRight()) {
      r.push(a.value)
    }
  }
  return r
}

/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/lib/Array'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @function
 * @since 1.0.0
 */
export const lefts = <L, A>(as: Array<Either<L, A>>): Array<L> => {
  const r: Array<L> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a.isLeft()) {
      r.push(a.value)
    }
  }
  return r
}

/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/lib/Array'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @function
 * @since 1.0.0
 */
export const sort = <A>(O: Ord<A>) => (as: Array<A>): Array<A> => {
  return copy(as).sort(O.compare)
}

/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @function
 * @since 1.0.0
 */
export const zipWith = <A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C> => {
  const fc = []
  const len = Math.min(fa.length, fb.length)
  for (let i = 0; i < len; i++) {
    fc[i] = f(fa[i], fb[i])
  }
  return fc
}

/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @function
 * @since 1.0.0
 */
export const zip = <A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]> => {
  return zipWith(fa, fb, tuple)
}

/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @function
 * @since 1.13.0
 */
export const unzip = <A, B>(as: Array<[A, B]>): [Array<A>, Array<B>] => {
  const fa = []
  const fb = []

  for (let i = 0; i < as.length; i++) {
    fa[i] = as[i][0]
    fb[i] = as[i][1]
  }

  return tuple(fa, fb)
}

/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @function
 * @since 1.0.0
 */
export const rotate = <A>(n: number, xs: Array<A>): Array<A> => {
  const len = xs.length
  if (n === 0 || len <= 1 || len === Math.abs(n)) {
    return xs
  } else if (n < 0) {
    return rotate(len + n, xs)
  } else {
    return xs.slice(-n).concat(xs.slice(0, len - n))
  }
}

/**
 * Test if a value is a member of an array. Takes a `Setoid<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { member } from 'fp-ts/lib/Array'
 * import { setoidString, setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.strictEqual(member(setoidString)(['thing one', 'thing two', 'cat in the hat'], 'thing two'), true)
 * assert.strictEqual(member(setoidNumber)([1, 2, 3], 1), true)
 * assert.strictEqual(member(setoidNumber)([1, 2, 3], 4), false)
 *
 * @function
 * @since 1.3.0
 */
export const member = <A>(S: Setoid<A>) => (as: Array<A>, a: A): boolean => {
  const predicate = (e: A) => S.equals(e, a)
  let i = 0
  const len = as.length
  for (; i < len; i++) {
    if (predicate(as[i])) {
      return true
    }
  }
  return false
}

/**
 * Remove duplicates from an array, keeping the first occurance of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepEqual(uniq(setoidNumber)([1, 2, 1]), [1, 2])
 *
 * @function
 * @since 1.3.0
 */
export const uniq = <A>(S: Setoid<A>): ((as: Array<A>) => Array<A>) => {
  const memberS = member(S)
  return as => {
    const r: Array<A> = []
    const len = as.length
    let i = 0
    for (; i < len; i++) {
      const a = as[i]
      if (!memberS(r, a)) {
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
 * import { sortBy } from 'fp-ts/lib/Array'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = contramap((p: Person) => p.name, ordString)
 * const byAge = contramap((p: Person) => p.age, ordNumber)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * if (sortByNameByAge.isSome()) {
 *   const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 *   assert.deepEqual(sortByNameByAge.value(persons), [
 *     { name: 'a', age: 1 },
 *     { name: 'b', age: 2 },
 *     { name: 'b', age: 3 },
 *     { name: 'c', age: 2 }
 *   ])
 * }
 *
 * @function
 * @since 1.3.0
 */
export const sortBy = <A>(ords: Array<Ord<A>>): Option<Endomorphism<Array<A>>> => {
  return fold(ords, none, (head, tail) => some(sortBy1(head, tail)))
}

/**
 * Non failing version of {@link sortBy}
 * @example
 * import { sortBy1 } from 'fp-ts/lib/Array'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = contramap((p: Person) => p.name, ordString)
 * const byAge = contramap((p: Person) => p.age, ordNumber)
 *
 * const sortByNameByAge = sortBy1(byName, [byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @function
 * @since 1.3.0
 */
export const sortBy1 = <A>(head: Ord<A>, tail: Array<Ord<A>>): Endomorphism<Array<A>> => {
  return sort(tail.reduce(getSemigroup<A>().concat, head))
}

/**
 * Apply a function to each element in an array, keeping only the results which contain a value, creating a new array.
 *
 * Alias of {@link Filterable}'s `filterMap`
 *
 * @example
 * import { mapOption } from 'fp-ts/lib/Array'
 * import { Option, some, none } from 'fp-ts/lib/Option'
 *
 * const f = (n: number): Option<number> => (n % 2 === 0 ? none : some(n))
 * assert.deepEqual(mapOption([1, 2, 3], f), [1, 3])
 *
 * @function
 * @since 1.0.0
 */
export const mapOption = <A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B> => {
  return filterMapWithIndex(as, (_, a) => f(a))
}

/**
 * Filter an array of optional values, keeping only the elements which contain a value, creating a new array.
 *
 * Alias of {@link Compactable}'s `compact`
 *
 * @example
 * import { catOptions } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(catOptions([some(1), none, some(3)]), [1, 3])
 *
 * @function
 * @since 1.0.0
 */
export const catOptions = <A>(as: Array<Option<A>>): Array<A> => {
  return mapOption(as, identity)
}

/**
 * @example
 * import { array } from 'fp-ts/lib/Array'
 * import { left, right } from 'fp-ts/lib/Either'
 * import { identity } from 'fp-ts/lib/function'
 *
 * assert.deepEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), { left: ['foo'], right: [1, 2] })
 *
 * @function
 * @since 1.0.0
 */
export const partitionMap = <A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): Separated<Array<L>, Array<R>> => {
  return partitionMapWithIndex(fa, (_, a) => f(a))
}

/**
 * Filter an array, keeping the elements which satisfy a predicate function, creating a new array
 * @function
 * @since 1.0.0
 */
export function filter<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>
export function filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
export function filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A> {
  return as.filter(predicate)
}

/**
 * @function
 * @since 1.12.0
 */
export function partition<A, B extends A>(fa: Array<A>, p: Refinement<A, B>): Separated<Array<A>, Array<B>>
export function partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>>
export function partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>> {
  return partitionWithIndex(fa, (_, a) => p(a))
}

const compact = catOptions

const separate = <RL, RR>(fa: Array<Either<RL, RR>>): Separated<Array<RL>, Array<RR>> => {
  const left: Array<RL> = []
  const right: Array<RR> = []
  for (const e of fa) {
    if (e.isLeft()) {
      left.push(e.value)
    } else {
      right.push(e.value)
    }
  }
  return {
    left,
    right
  }
}

const filterMap = mapOption

const wither = <F>(F: Applicative<F>): (<A, B>(ta: Array<A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Array<B>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

const wilt = <F>(
  F: Applicative<F>
): (<RL, RR, A>(wa: Array<A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Array<RL>, Array<RR>>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
 * import { chop, span } from 'fp-ts/lib/Array'
 *
 * const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<Array<A>> => {
 *   return chop(as, as => {
 *     const { init, rest } = span(as, a => S.equals(a, as[0]))
 *     return [init, rest]
 *   })
 * }
 * assert.deepEqual(group(setoidNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @function
 * @since 1.10.0
 */
export const chop = <A, B>(as: Array<A>, f: (as: Array<A>) => [B, Array<A>]): Array<B> => {
  const result: Array<B> = []
  let cs: Array<A> = as
  while (cs.length > 0) {
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
 * import { split } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(split(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @function
 * @since 1.10.0
 */
export const split = <A>(n: number, as: Array<A>): [Array<A>, Array<A>] => {
  return [as.slice(0, n), as.slice(n)]
}

/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf([], n)` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(xs, n).concat(chunksOf(ys, n)) == chunksOf(xs.concat(ys)), n)
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/lib/Array'
 *
 * assert.deepEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
 *
 * @function
 * @since 1.10.0
 */
export const chunksOf = <A>(as: Array<A>, n: number): Array<Array<A>> => {
  return isOutOfBound(n - 1, as) ? [as] : chop(as, as => split(n, as))
}

/**
 * Array comprehension
 *
 * ```
 * [ g(x, y, ...) | x ← xs, y ← ys, ..., f(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/lib/Array'
 * import { tuple } from 'fp-ts/lib/function'
 *
 * assert.deepEqual(comprehension([[1, 2, 3], ['a', 'b']], (a, b) => (a + b.length) % 2 === 0, tuple), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @function
 * @since 1.10.0
 */
export function comprehension<A, B, C, D, R>(
  input: [Array<A>, Array<B>, Array<C>, Array<D>],
  f: (a: A, b: B, c: C, d: D) => boolean,
  g: (a: A, b: B, c: C, d: D) => R
): Array<R>
export function comprehension<A, B, C, R>(
  input: [Array<A>, Array<B>, Array<C>],
  f: (a: A, b: B, c: C) => boolean,
  g: (a: A, b: B, c: C) => R
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>
export function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => boolean,
  g: (a: A, b: B) => R
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>
export function comprehension<R>(
  input: Array<Array<any>>,
  f: (...xs: Array<any>) => boolean,
  g: (...xs: Array<any>) => R
): Array<R> {
  const go = (scope: Array<any>, input: Array<Array<any>>): Array<R> => {
    if (input.length === 0) {
      return f(...scope) ? [g(...scope)] : empty
    } else {
      return chain(input[0], x => go(snoc(scope, x), input.slice(1)))
    }
  }
  return go(empty, input)
}

/**
 * Creates an array of unique values, in order, from all given arrays using a {@link Setoid} for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepEqual(union(setoidNumber)([1, 2], [2, 3]), [1, 2, 3])
 *
 * @function
 * @since 1.12.0
 */
export const union = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => {
  const memberS = member(S)
  return (xs, ys) => concat(xs, ys.filter(a => !memberS(xs, a)))
}

/**
 * Creates an array of unique values that are included in all given arrays using a {@link Setoid} for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepEqual(intersection(setoidNumber)([1, 2], [2, 3]), [2])
 *
 * @function
 * @since 1.12.0
 */
export const intersection = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => {
  const memberS = member(S)
  return (xs, ys) => xs.filter(a => memberS(ys, a))
}

/**
 * Creates an array of array values not included in the other given array using a {@link Setoid} for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepEqual(difference(setoidNumber)([1, 2], [2, 3]), [1])
 *
 * @function
 * @since 1.12.0
 */
export const difference = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => {
  const memberS = member(S)
  return (xs, ys) => xs.filter(a => !memberS(ys, a))
}

const traverseWithIndex = <F>(F: Applicative<F>) => <A, B>(
  ta: Array<A>,
  f: (i: number, a: A) => HKT<F, B>
): HKT<F, Array<B>> => {
  return reduceWithIndex(ta, F.of<Array<B>>(zero()), (i, fbs, a) =>
    F.ap(F.map(fbs, bs => (b: B) => snoc(bs, b)), f(i, a))
  )
}

const partitionMapWithIndex = <RL, RR, A>(
  fa: Array<A>,
  f: (i: number, a: A) => Either<RL, RR>
): Separated<Array<RL>, Array<RR>> => {
  const left: Array<RL> = []
  const right: Array<RR> = []
  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i])
    if (e.isLeft()) {
      left.push(e.value)
    } else {
      right.push(e.value)
    }
  }
  return {
    left,
    right
  }
}

const partitionWithIndex = <A>(fa: Array<A>, p: (i: number, a: A) => boolean): Separated<Array<A>, Array<A>> => {
  const left: Array<A> = []
  const right: Array<A> = []
  for (let i = 0; i < fa.length; i++) {
    const a = fa[i]
    if (p(i, a)) {
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

const filterMapWithIndex = <A, B>(fa: Array<A>, f: (i: number, a: A) => Option<B>): Array<B> => {
  const result: Array<B> = []
  for (let i = 0; i < fa.length; i++) {
    const optionB = f(i, fa[i])
    if (optionB.isSome()) {
      result.push(optionB.value)
    }
  }
  return result
}

const filterWithIndex = <A>(fa: Array<A>, p: (i: number, a: A) => boolean): Array<A> => {
  return fa.filter((a, i) => p(i, a))
}

/**
 * @instance
 * @since 1.0.0
 */
export const array: Monad1<URI> &
  Foldable2v1<URI> &
  Unfoldable1<URI> &
  TraversableWithIndex1<URI, number> &
  Alternative1<URI> &
  Plus1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, number> &
  Witherable1<URI> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = {
  URI,
  map,
  mapWithIndex,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr: reduceRight,
  unfoldr,
  traverse,
  sequence,
  zero,
  alt,
  extend,
  wither,
  wilt,
  reduceWithIndex,
  foldMapWithIndex,
  foldrWithIndex,
  traverseWithIndex,
  partitionMapWithIndex,
  partitionWithIndex,
  filterMapWithIndex,
  filterWithIndex
}
