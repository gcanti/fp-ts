/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

import { Foldable1 } from './Foldable'
import { Functor1 } from './Functor'
import * as A from './Array'
import { Traversable1 } from './Traversable'
import { Applicative } from './Applicative'
import { HKT } from './HKT'
import * as O from './Option'
import { pipe, pipeable } from './pipeable'
import { Filterable1 } from './Filterable'
import { Predicate, identity, flow, Refinement } from './function'
import { Separated, Compactable1 } from './Compactable'
import * as E from './Either'
import { Ord } from './Ord'
import { Eq } from './Eq'

declare module './HKT' {
  interface URItoKind<A> {
    List: List<A>
  }
}

/**
 * @since 2.1.1
 */
export const URI = 'List'

/**
 * @since 2.1.1
 */
export type URI = typeof URI

/**
 * @since 2.1.1
 */
export interface Nil {
  readonly type: 'Nil'
}

/**
 * @since 2.1.1
 */
export interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: List<A>
}

/**
 * @since 2.1.1
 */
export type List<A> = Nil | Cons<A>

/**
 * @since 2.1.1
 */
export const nil: List<never> = { type: 'Nil' }

/**
 * @since 2.1.1
 */
export function cons<A>(head: A, tail: List<A>): List<A> {
  return { type: 'Cons', head, tail }
}

/**
 * Creates a list with a single element.
 * @since 2.1.1
 */
export function singleton<A>(head: A): List<A> {
  return cons(head, nil)
}

/**
 * Create a list containing a range of integers, including both endpoints.
 * @since 2.1.1
 */
export function range(start: number, end: number): List<number> {
  if (start === end) return singleton(start)

  const step = start < end ? 1 : -1
  let out: List<number> = singleton(end)
  const len = Math.abs(end - start) + 1
  for (let i = 1; i < len; i++) {
    out = cons(end - i * step, out)
  }
  return out
}

/**
 * Gets the length of a list.
 * @since 2.1.1
 */
export function length<A>(fa: List<A>): number {
  return list.reduce(fa, 0, b => b + 1)
}

/**
 * @since 2.1.1
 */
export function isNil<A>(a: List<A>): a is Nil {
  return a.type === 'Nil'
}

/**
 * @since 2.1.1
 */
export function isCons<A>(a: List<A>): a is Cons<A> {
  return a.type === 'Cons'
}

/**
 * Appends an element to the end of a list, creating a new list.
 * @since 2.1.1
 */
export function snoc<A>(fa: List<A>, a: A): List<A> {
  return list.reduceRight(fa, singleton(a), cons)
}

/**
 * Insert an element into a sorted list, using the specified function
 * to determine the ordering of elements.
 * @since 2.1.1
 */
export function insertBy<A>(compare: Ord<A>['compare']): (a: A) => (fa: List<A>) => List<A> {
  return a => fa => {
    if (isNil(fa)) return singleton(a)

    let out: List<A> = nil
    let l: List<A> = fa
    let hasBeenInserted = false
    while (isCons(l)) {
      out = cons(l.head, out)
      if (!hasBeenInserted && compare(a, l.head) === 1) {
        out = cons(a, out)
        hasBeenInserted = true
      }
      l = l.tail
    }
    return reverse(out)
  }
}

/**
 * Insert an element into a sorted list.
 * @since 2.1.1
 */
export function insert<A>(ord: Ord<A>): (a: A) => (fa: List<A>) => List<A> {
  return insertBy(ord.compare)
}

/**
 * Gets the first element in a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function head<A>(fa: List<A>): O.Option<A> {
  return isCons(fa) ? O.some(fa.head) : O.none
}

/**
 * Gets the last element in a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function last<A>(fa: List<A>): O.Option<A> {
  if (isNil(fa)) return O.none

  let out = O.some(fa.head)
  let l = fa.tail
  while (isCons(l)) {
    out = O.some(l.head)
    l = l.tail
  }
  return out
}

/**
 * Gets all but the first element of a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function tail<A>(fa: List<A>): O.Option<List<A>> {
  if (isNil(fa)) return O.none
  return isCons(fa.tail) ? O.some(fa.tail) : O.none
}

/**
 * Gets all but the last element of a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function init<A>(fa: List<A>): O.Option<List<A>> {
  return pipe(
    unsnoc(fa),
    O.map(_ => _.init)
  )
}

/**
 * Breaks a list into its first element, and the remaining elements,
 * or `None` if the list is empty.
 * @since 2.1.1
 */
export function uncons<A>(fa: List<A>): O.Option<{ head: A; tail: List<A> }> {
  return isNil(fa) ? O.none : O.some({ head: fa.head, tail: fa.tail })
}

/**
 * Breaks a list into its last element, and the preceding elements,
 * or `None` if the list is empty.
 * @since 2.1.1
 */
export function unsnoc<A>(fa: List<A>): O.Option<{ init: List<A>; last: A }> {
  if (isNil(fa)) return O.none
  let init: List<A> = nil
  let l = fa
  while (isCons(l.tail)) {
    init = cons(l.head, init)
    l = l.tail
  }
  return O.some({ init: reverse(init), last: l.head })
}

/**
 * Gets the element at the specified index, or `None` if the index is out-of-bounds.
 * @since 2.1.1
 */
export function lookup<A>(index: number, fa: List<A>): O.Option<A> {
  if (isNil(fa)) return O.none
  let l: List<A> = fa
  for (let i = 0; i <= index; i++) {
    if (isNil(l)) return O.none
    if (i === index) return O.some(l.head)
    l = l.tail
  }
  /* istanbul ignore next */
  return O.none
}

/**
 * Finds the first index for which a predicate holds.
 * @since 2.1.1
 */
export function findIndex<A>(predicate: Predicate<A>, fa: List<A>): O.Option<number> {
  let l: List<A> = fa
  let i = 0
  while (isCons(l)) {
    if (predicate(l.head)) return O.some(i)
    l = l.tail
    i++
  }
  return O.none
}

/**
 * Finds the last index for which a predicate holds.
 * @since 2.1.1
 */
export function findLastIndex<A>(predicate: Predicate<A>, fa: List<A>): O.Option<number> {
  return O.option.map(findIndex(predicate, reverse(fa)), i => length(fa) - i - 1)
}

/**
 * Find the index of the first element equal to the specified element.
 * @since 2.1.1
 */
export function elemIndex<A>(eq: Eq<A>, a: A, fa: List<A>): O.Option<number> {
  return findIndex(b => eq.equals(a, b), fa)
}

/**
 * Find the index of the last element equal to the specified element.
 * @since 2.1.1
 */
export function elemLastIndex<A>(eq: Eq<A>, a: A, fa: List<A>): O.Option<number> {
  return findLastIndex(b => eq.equals(a, b), fa)
}

/**
 * Inserts an element into a list at the specified index, returning a new list or `None`
 * if the index is out-of-bounds.
 * @since 2.1.1
 */
export function insertAt<A>(index: number, a: A, fa: List<A>): O.Option<List<A>> {
  if (isNil(fa) && index === 0) return O.some(singleton(a))

  let l: List<A> = fa
  let i = 0
  let out: List<A> = nil
  let hasBeenInserted = false
  while (isCons(l) && i <= index) {
    if (i === index) {
      out = cons(a, out)
      hasBeenInserted = true
    }
    out = cons(l.head, out)
    l = l.tail
    i++
  }
  return hasBeenInserted ? O.some(reverse(out)) : O.none
}

/**
 * Deletes an element from a list at the specified index, returning a new
 * list or `None` if the index is out-of-bounds.
 * @since 2.1.1
 */
export function deleteAt<A>(index: number, fa: List<A>): O.Option<List<A>> {
  if (isNil(fa)) return O.none

  let l: List<A> = fa
  let i = 0
  let out: List<A> = nil
  let hasBeenDeleted = false
  while (isCons(l)) {
    if (i === index) {
      hasBeenDeleted = true
    } else {
      out = cons(l.head, out)
    }
    l = l.tail
    i++
  }
  return hasBeenDeleted ? O.some(reverse(out)) : O.none
}

/**
 * Updates an element from a list at the specified index, returning a new
 * list or `None` if the index is out-of-bounds.
 * @since 2.1.1
 */
export function updateAt<A>(index: number, a: A, fa: List<A>): O.Option<List<A>> {
  if (isNil(fa)) return O.none

  let l: List<A> = fa
  let i = 0
  let out: List<A> = nil
  let hasBeenUpdated = false
  while (isCons(l)) {
    if (i === index) {
      hasBeenUpdated = true
      out = cons(a, out)
    } else {
      out = cons(l.head, out)
    }
    l = l.tail
    i++
  }
  return hasBeenUpdated ? O.some(reverse(out)) : O.none
}

/**
 * Update the element at the specified index by applying a function
 * to the current value, returning a new list or `None` if the index is out-of-bounds.
 * @since 2.1.1
 */
export function modifyAt<A>(index: number, f: (a: A) => A, fa: List<A>): O.Option<List<A>> {
  if (isNil(fa)) return O.none

  let l: List<A> = fa
  let i = 0
  let out: List<A> = nil
  let hasBeenUpdated = false
  while (isCons(l)) {
    if (i === index) {
      hasBeenUpdated = true
      out = cons(f(l.head), out)
    } else {
      out = cons(l.head, out)
    }
    l = l.tail
    i++
  }
  return hasBeenUpdated ? O.some(reverse(out)) : O.none
}

/**
 * Updates or deletes the element at the specified index by applying a function
 * to the current value, returning a new list or `None` if the index is out-of-bounds.
 * @since 2.1.1
 */
export function alterAt<A>(index: number, f: (a: A) => O.Option<A>, fa: List<A>): O.Option<List<A>> {
  if (isNil(fa)) return O.none

  let l: List<A> = fa
  let i = 0
  let out: List<A> = nil
  let hasBeenAltered = false
  while (isCons(l)) {
    if (i === index) {
      const oA = f(l.head)
      if (O.isSome(oA)) {
        out = cons(oA.value, out)
      }
      hasBeenAltered = true
    } else {
      out = cons(l.head, out)
    }
    l = l.tail
    i++
  }
  return hasBeenAltered ? O.some(reverse(out)) : O.none
}

/**
 * Reverse a list.
 * @since 2.1.1
 */
export function reverse<A>(fa: List<A>): List<A> {
  let out: List<A> = nil
  let l = fa
  while (isCons(l)) {
    out = cons(l.head, out)
    l = l.tail
  }
  return out
}

/**
 * Flattens a list of lists.
 * @since 2.1.1
 */
export function flatten<A>(mma: List<List<A>>): List<A> {
  let out: List<A> = nil
  let outer = mma
  while (isCons(outer)) {
    let inner = outer.head
    while (isCons(inner)) {
      out = cons(inner.head, out)
      inner = inner.tail
    }
    outer = outer.tail
  }
  return reverse(out)
}

/**
 * Sort the elements of a list in increasing order, where elements
 * are compared using the specified ordering.
 * @since 2.1.1
 */
export function sort<A>(O: Ord<A>): (fa: List<A>) => List<A> {
  return flow(toArray, A.sort(O), fromArray)
}

/**
 * Takes the specified number of elements from the front of a list.
 * @since 2.1.1
 */
export function takeLeft(n: number): <A>(fa: List<A>) => List<A> {
  return <A>(fa: List<A>) => {
    if (isNil(fa)) return nil

    let out: List<A> = nil
    let i = 0
    let l: List<A> = fa
    while (isCons(l) && i < n) {
      out = cons(l.head, out)
      i++
      l = l.tail
    }
    return reverse(out)
  }
}

/**
 * Takes those elements from the front of a list which match a predicate.
 * @since 2.1.1
 */
export function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A>
export function takeLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> {
  return fa => {
    if (isNil(fa)) return nil

    let out: List<A> = nil
    let l: List<A> = fa
    while (isCons(l) && predicate(l.head)) {
      out = cons(l.head, out)
      l = l.tail
    }
    return reverse(out)
  }
}

/**
 * Takes the specified number of elements from the end of a list.
 * @since 2.1.1
 */
export function takeRight(n: number): <A>(fa: List<A>) => List<A> {
  return fa => dropLeft(length(fa) - n)(fa)
}

/**
 * Drops the specified number of elements from the front of a list.
 * @since 2.1.1
 */
export function dropLeft(n: number): <A>(fa: List<A>) => List<A> {
  return <A>(fa: List<A>) => {
    if (isNil(fa)) return nil

    let i = 0
    let l: List<A> = fa
    while (isCons(l) && i < n) {
      i++
      l = l.tail
    }
    return l
  }
}

/**
 * Drops those elements from the front of a list which match a predicate.
 * @since 2.1.1
 */
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: List<A>) => List<A> {
  return fa => {
    if (isNil(fa)) return nil

    let l: List<A> = fa
    while (isCons(l) && predicate(l.head)) {
      l = l.tail
    }
    return l
  }
}

/**
 * Takes the specified number of elements from the end of a list.
 * @since 2.1.1
 */
export function dropRight(n: number): <A>(fa: List<A>) => List<A> {
  return fa => takeLeft(length(fa) - n)(fa)
}

/**
 * Gets an array from a list.
 * @since 2.1.1
 */
export function toArray<A>(fa: List<A>): Array<A> {
  const out: Array<A> = []
  let l: List<A> = fa
  while (isCons(l)) {
    out.push(l.head)
    l = l.tail
  }
  return out
}

/**
 * Creates a list from an array
 * @since 2.1.1
 */
export function fromArray<A>(as: Array<A>): List<A> {
  return A.array.reduceRight<A, List<A>>(as, nil, cons)
}

/**
 * @since 2.1.1
 */
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> & Filterable1<URI> & Compactable1<URI> = {
  URI,
  map: <A, B>(fa: List<A>, f: (a: A) => B) => list.reduceRight<A, List<B>>(fa, nil, (a, b) => cons(f(a), b)),
  reduce: (fa, b, f) => {
    let out = b
    let l = fa
    while (isCons(l)) {
      out = f(out, l.head)
      l = l.tail
    }
    return out
  },
  foldMap: M => (fa, f) => {
    let out = M.empty
    let l = fa
    while (isCons(l)) {
      out = M.concat(out, f(l.head))
      l = l.tail
    }
    return out
  },
  reduceRight: (fa, b, f) => A.array.reduceRight(toArray(fa), b, f),
  traverse: <F>(F: Applicative<F>): (<A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) => HKT<F, List<B>>) => {
    return <A, B>(ta: List<A>, f: (a: A) => HKT<F, B>) =>
      list.reduceRight(ta, F.of<List<B>>(nil), (a, fbs) =>
        F.ap(
          F.map(fbs, bs => (b: B) => cons(b, bs)),
          f(a)
        )
      )
  },
  sequence: <F>(F: Applicative<F>) => <A>(ta: List<HKT<F, A>>): HKT<F, List<A>> => {
    return list.reduceRight(ta, F.of<List<A>>(nil), (a, fas) =>
      F.ap(
        F.map(fas, as => (a: A) => cons(a, as)),
        a
      )
    )
  },
  filter: <A>(fa: List<A>, predicate: Predicate<A>): List<A> => {
    let out: List<A> = nil
    let l = fa
    while (isCons(l)) {
      if (predicate(l.head)) {
        out = cons(l.head, out)
      }
      l = l.tail
    }
    return reverse(out)
  },
  filterMap: <A, B>(fa: List<A>, f: (a: A) => O.Option<B>): List<B> => {
    let out: List<B> = nil
    let l = fa
    while (isCons(l)) {
      const optionB = f(l.head)
      if (O.isSome(optionB)) {
        out = cons(optionB.value, out)
      }
      l = l.tail
    }
    return reverse(out)
  },
  partition: <A>(fa: List<A>, predicate: Predicate<A>): Separated<List<A>, List<A>> => {
    let left: List<A> = nil
    let right: List<A> = nil
    let l = fa
    while (isCons(l)) {
      if (predicate(l.head)) {
        right = cons(l.head, right)
      } else {
        left = cons(l.head, left)
      }
      l = l.tail
    }
    return { left: reverse(left), right: reverse(right) }
  },
  partitionMap: <A, B, C>(fa: List<A>, f: (a: A) => E.Either<B, C>): Separated<List<B>, List<C>> => {
    let left: List<B> = nil
    let right: List<C> = nil
    let l = fa
    while (isCons(l)) {
      const e = f(l.head)
      if (E.isLeft(e)) {
        left = cons(e.left, left)
      } else {
        right = cons(e.right, right)
      }
      l = l.tail
    }
    return { left: reverse(left), right: reverse(right) }
  },
  compact: fa => list.filterMap(fa, identity),
  separate: fa => list.partitionMap(fa, identity)
}

const { map, reduce, foldMap, reduceRight, filter, filterMap, partition, partitionMap, compact, separate } = pipeable(
  list
)

export {
  /**
   * @since 2.1.1
   */
  map,
  /**
   * @since 2.1.1
   */
  reduce,
  /**
   * @since 2.1.1
   */
  foldMap,
  /**
   * @since 2.1.1
   */
  reduceRight,
  /**
   * @since 2.1.1
   */
  filter,
  /**
   * @since 2.1.1
   */
  filterMap,
  /**
   * @since 2.1.1
   */
  partition,
  /**
   * @since 2.1.1
   */
  partitionMap,
  /**
   * @since 2.1.1
   */
  compact,
  /**
   * @since 2.1.1
   */
  separate
}
