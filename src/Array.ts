import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monoid } from './Monoid'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Unfoldable } from './Unfoldable'
import { Traversable } from './Traversable'
import { Alternative } from './Alternative'
import { Plus } from './Plus'
import { liftA2 } from './Apply'
import { Option, fromNullable } from './Option'
import * as option from './Option'
import { Ord, toNativeComparator } from './Ord'
import { Extend } from './Extend'
import { Predicate, identity, constant, Lazy, Endomorphism, Refinement, tuple } from './function'

// Adapted from https://github.com/purescript/purescript-arrays

declare global {
  interface Array<T> {
    _URI: URI
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

export const empty: Lazy<Array<any>> = constant([])

export const concat = <A>(x: Array<A>) => (y: Array<A>): Array<A> => x.concat(y)

export const map = <A, B>(f: (a: A) => B, fa: Array<A>): Array<B> => fa.map(f)

export const of = <A>(a: A): Array<A> => [a]

export const ap = <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
  fab.reduce((acc, f) => acc.concat(fa.map(f)), [] as Array<B>)

export const chain = <A, B>(f: (a: A) => Array<B>, fa: Array<A>): Array<B> =>
  fa.reduce((acc, a) => acc.concat(f(a)), [] as Array<B>)

export const reduce = <A, B>(f: (b: B, a: A) => B, b: B, fa: Array<A>): B => fa.reduce(f, b)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Array<A>) => HKT2As<F, L, Array<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Array<A>) => HKTAs<F, Array<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Array<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Array<A>) => HKT<F, Array<B>> {
    const liftedSnoc: <A>(fa: HKT<F, Array<A>>) => (fb: HKT<F, A>) => HKT<F, Array<A>> = liftA2(F)(snoc)
    return (f, ta) => reduce((fab, a) => liftedSnoc(fab)(f(a)), F.of(empty()), ta)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const zero = empty

export const alt = <A>(x: Array<A>, y: Array<A>): Array<A> => x.concat(y)

export const unfoldr = <A, B>(f: (b: B) => Option<[A, B]>, b: B): Array<A> => {
  const ret: Array<A> = []
  let bb = b
  while (true) {
    const mt = f(bb)
    if (option.isSome(mt)) {
      const [a, b] = mt.value
      ret.push(a)
      bb = b
    } else {
      break
    }
  }
  return ret
}

export const extend = <A, B>(f: (fa: Array<A>) => B, fa: Array<A>): Array<B> => fa.map((_, i, as) => f(as.slice(i)))

/** Break an array into its first element and remaining elements */
export const fold = <A, B>(nil: Lazy<B>, cons: (head: A, tail: Array<A>) => B, as: Array<A>): B =>
  as.length === 0 ? nil() : cons(as[0], as.slice(1))

/** Get the number of elements in an array */
export const length = <A>(as: Array<A>): number => as.length

/** Test whether an array is empty */
export const isEmpty = <A>(as: Array<A>): boolean => length(as) === 0

/** Test whether an array contains a particular index */
export const isOutOfBound = (i: number) => <A>(as: Array<A>): boolean => i < 0 || i >= as.length

/** This function provides a safe way to read a value at a particular index from an array */
export const index = (i: number) => <A>(as: Array<A>): Option<A> =>
  isOutOfBound(i)(as) ? option.none : option.some(as[i])

/** Attaches an element to the front of an array, creating a new array */
export const cons = <A>(a: A) => (as: Array<A>): Array<A> => [a].concat(as)

/** Append an element to the end of an array, creating a new array */
export const snoc = <A>(as: Array<A>) => (a: A): Array<A> => as.concat([a])

/** Get the first element in an array, or `None` if the array is empty */
export const head = <A>(as: Array<A>): Option<A> => (isEmpty(as) ? option.none : option.some(as[0]))

/** Get the last element in an array, or `None` if the array is empty */
export const last = <A>(as: Array<A>): Option<A> => index(length(as) - 1)(as)

/**
 * Get all but the first element of an array, creating a new array, or
 * `None` if the array is empty
 */
export const tail = <A>(as: Array<A>): Option<Array<A>> => {
  const len = as.length
  return len === 0 ? option.none : option.some(as.slice(1))
}

/** Extract a subarray by a start and end index */
export const slice = (start: number, end: number) => <A>(as: Array<A>): Array<A> => as.slice(start, end)

/**
 * Get all but the last element of an array, creating a new array, or
 * `None` if the array is empty
 */
export const init = <A>(as: Array<A>): Option<Array<A>> => {
  const len = as.length
  return len === 0 ? option.none : option.some(as.slice(0, len - 1))
}

/** Keep only a number of elements from the start of an array, creating a new array */
export const take = (n: number) => <A>(as: Array<A>): Array<A> => slice(0, n)(as)

/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 */
export const span = <A>(predicate: Predicate<A>) => (as: Array<A>): { init: Array<A>; rest: Array<A> } => {
  const init: Array<A> = []
  let i = 0
  for (; i < as.length; i++) {
    if (predicate(as[i])) {
      init.push(as[i])
    } else {
      break
    }
  }
  return { init, rest: as.slice(i) }
}

/**
 * Calculate the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 */
export const takeWhile = <A>(predicate: Predicate<A>) => (as: Array<A>): Array<A> => span(predicate)(as).init

/** Drop a number of elements from the start of an array, creating a new array */
export const drop = (n: number) => <A>(as: Array<A>): Array<A> => slice(n, length(as))(as)

/**
 * Remove the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 */
export const dropWhile = <A>(predicate: Predicate<A>) => (as: Array<A>): Array<A> => span(predicate)(as).rest

/** Find the first index for which a predicate holds */
export const findIndex = <A>(predicate: Predicate<A>) => (as: Array<A>): Option<number> => {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return option.some(i)
    }
  }
  return option.none
}

/** Find the first element which satisfies a predicate function */
export const findFirst = <A>(predicate: Predicate<A>) => (as: Array<A>): Option<A> => fromNullable(as.find(predicate))

/** Find the last element which satisfies a predicate function */
export const findLast = <A>(predicate: Predicate<A>) => (as: Array<A>): Option<A> => {
  const len = as.length
  let a: A | null = null
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      a = as[i]
      break
    }
  }
  return fromNullable(a)
}

/** Filter an array, keeping the elements which satisfy a predicate function, creating a new array */
export const filter = <A>(predicate: Predicate<A>) => (as: Array<A>): Array<A> => as.filter(predicate)

export const refine = <A>(as: Array<A>) => <B extends A>(refinement: Refinement<A, B>): Array<B> =>
  as.filter(refinement)

export const copy = <A>(as: Array<A>): Array<A> => as.slice()

export const unsafeInsertAt = (i: number) => <A>(a: A) => (as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs.splice(i, 0, a)
  return xs
}

/**
 * Insert an element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 */
export const insertAt = (i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>> =>
  i < 0 || i > as.length ? option.none : option.some(unsafeInsertAt(i)(a)(as))

export const unsafeUpdateAt = (i: number) => <A>(a: A) => (as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs[i] = a
  return xs
}

/**
 * Change the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 */
export const updateAt = (i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>> =>
  isOutOfBound(i)(as) ? option.none : option.some(unsafeUpdateAt(i)(a)(as))

export const unsafeDeleteAt = (i: number) => <A>(as: Array<A>): Array<A> => {
  const xs = copy(as)
  xs.splice(i, 1)
  return xs
}

/**
 * Delete the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 */
export const deleteAt = (i: number) => <A>(as: Array<A>): Option<Array<A>> =>
  isOutOfBound(i)(as) ? option.none : option.some(unsafeDeleteAt(i)(as))

/**
 * Apply a function to the element at the specified index, creating a new
 * array, or returning `None` if the index is out of bounds
 */
export const modifyAt = (i: number) => <A>(f: Endomorphism<A>) => (as: Array<A>): Option<Array<A>> =>
  isOutOfBound(i)(as) ? option.none : updateAt(i)(f(as[i]))(as)

/** Reverse an array, creating a new array */
export const reverse = <A>(as: Array<A>): Array<A> => copy(as).reverse()

/**
 * Apply a function to each element in an array, keeping only the results
 * which contain a value, creating a new array
 */
export const mapOption = <A, B>(f: (a: A) => Option<B>) => (as: Array<A>): Array<B> =>
  chain(a => f(a).fold(empty, of), as)

/**
 * Filter an array of optional values, keeping only the elements which contain
 * a value, creating a new array
 */
export const catOptions = <A>(as: Array<Option<A>>): Array<A> => mapOption<Option<A>, A>(identity)(as)

/** Sort the elements of an array in increasing order, creating a new array */
export const sort = <A>(ord: Ord<A>) => (as: Array<A>): Array<A> => copy(as).sort(toNativeComparator(ord.compare))

/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array.
 * If one input array is short, excess elements of the longer array are discarded.
 */
export const zipWith = <A, B, C>(f: (a: A, b: B) => C) => (fa: Array<A>) => (fb: Array<B>): Array<C> => {
  const fc = []
  const len = Math.min(fa.length, fb.length)
  for (let i = 0; i < len; i++) {
    fc[i] = f(fa[i], fb[i])
  }
  return fc
}

/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 */
export const zip = <A>(fa: Array<A>) => <B>(fb: Array<B>): Array<[A, B]> => zipWith<A, B, [A, B]>(tuple)(fa)(fb)

export const array: Monoid<Array<any>> &
  Monad<URI> &
  Foldable<URI> &
  Unfoldable<URI> &
  Traversable<URI> &
  Alternative<URI> &
  Plus<URI> &
  Extend<URI> = {
  URI,
  empty,
  concat,
  map,
  of,
  ap,
  chain,
  reduce,
  unfoldr,
  traverse,
  zero,
  alt,
  extend
}
