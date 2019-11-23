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
import { Predicate, identity, flow } from './function'
import { Separated, Compactable1 } from './Compactable'
import * as E from './Either'
import { Ord } from './Ord'
import { Eq } from './Eq'

declare module './HKT' {
  interface URItoKind<A> {
    LinkedList: LinkedList<A>
  }
}

/**
 * @since 2.1.1
 */
export const URI = 'LinkedList'

/**
 * @since 2.1.1
 */
export type URI = typeof URI

interface Nil {
  readonly type: 'Nil'
}

interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: LinkedList<A>
}

/**
 * @since 2.1.1
 */
export type LinkedList<A> = Nil | Cons<A>

/**
 * @since 2.1.1
 */
export const nil: Nil = { type: 'Nil' }

/**
 * @since 2.1.1
 */
export function cons<A>(head: A, tail: LinkedList<A>): LinkedList<A> {
  return { type: 'Cons', head, tail }
}

/**
 * Creates a list with a single element.
 * @since 2.1.1
 */
export function singleton<A>(head: A): LinkedList<A> {
  return cons(head, nil)
}

/**
 * Create a list containing a range of integers, including both endpoints.
 * @since 2.1.1
 */
export function range(start: number, end: number): LinkedList<number> {
  if (start === end) return singleton(start)

  const step = start < end ? 1 : -1
  let out: LinkedList<number> = singleton(end)
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
export function length<A>(fa: LinkedList<A>): number {
  return linkedList.reduce(fa, 0, b => b + 1)
}

/**
 * @since 2.1.1
 */
export function isNil<A>(a: LinkedList<A>): a is Nil {
  return a.type === 'Nil'
}

/**
 * @since 2.1.1
 */
export function isCons<A>(a: LinkedList<A>): a is Cons<A> {
  return a.type === 'Cons'
}

/**
 * Appends an element to the end of a list, creating a new list.
 * @since 2.1.1
 */
export function snoc<A>(fa: LinkedList<A>, a: A): LinkedList<A> {
  return linkedList.reduceRight(fa, singleton(a), cons)
}

/**
 * Insert an element into a sorted list, using the specified function
 * to determine the ordering of elements.
 * @since 2.1.1
 */
export function insertBy<A>(compare: Ord<A>['compare']): (a: A) => (fa: LinkedList<A>) => LinkedList<A> {
  return a => fa => {
    if (isNil(fa)) return singleton(a)

    let out: LinkedList<A> = nil
    let l: LinkedList<A> = fa
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
export function insert<A>(ord: Ord<A>): (a: A) => (fa: LinkedList<A>) => LinkedList<A> {
  return insertBy(ord.compare)
}

/**
 * Gets the first element in a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function head<A>(fa: LinkedList<A>): O.Option<A> {
  return isCons(fa) ? O.some(fa.head) : O.none
}

/**
 * Gets the last element in a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function last<A>(fa: LinkedList<A>): O.Option<A> {
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
export function tail<A>(fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa)) return O.none
  return isCons(fa.tail) ? O.some(fa.tail) : O.none
}

/**
 * Gets all but the last element of a list, or `None` if the list is empty.
 * @since 2.1.1
 */
export function init<A>(fa: LinkedList<A>): O.Option<LinkedList<A>> {
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
export function uncons<A>(fa: LinkedList<A>): O.Option<{ head: A; tail: LinkedList<A> }> {
  return isNil(fa) ? O.none : O.some({ head: fa.head, tail: fa.tail })
}

/**
 * Breaks a list into its last element, and the preceding elements,
 * or `None` if the list is empty.
 * @since 2.1.1
 */
export function unsnoc<A>(fa: LinkedList<A>): O.Option<{ init: LinkedList<A>; last: A }> {
  if (isNil(fa)) return O.none
  let init: LinkedList<A> = nil
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
export function index<A>(fa: LinkedList<A>, index: number): O.Option<A> {
  if (isNil(fa)) return O.none
  let l: LinkedList<A> = fa
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
export function findIndex<A>(predicate: Predicate<A>, fa: LinkedList<A>): O.Option<number> {
  let l: LinkedList<A> = fa
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
export function findLastIndex<A>(predicate: Predicate<A>, fa: LinkedList<A>): O.Option<number> {
  return O.option.map(findIndex(predicate, reverse(fa)), i => length(fa) - i - 1)
}

/**
 * Find the index of the first element equal to the specified element.
 * @since 2.1.1
 */
export function elemIndex<A>(eq: Eq<A>, a: A, fa: LinkedList<A>): O.Option<number> {
  return findIndex(b => eq.equals(a, b), fa)
}

/**
 * Find the index of the last element equal to the specified element.
 * @since 2.1.1
 */
export function elemLastIndex<A>(eq: Eq<A>, a: A, fa: LinkedList<A>): O.Option<number> {
  return findLastIndex(b => eq.equals(a, b), fa)
}

/**
 * Inserts an element into a list at the specified index, returning a new list or `None`
 * if the index is out-of-bounds.
 * @since 2.1.1
 */
export function insertAt<A>(index: number, a: A, fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa) && index === 0) return O.some(singleton(a))

  let l: LinkedList<A> = fa
  let i = 0
  let out: LinkedList<A> = nil
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
export function deleteAt<A>(index: number, fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa)) return O.none

  let l: LinkedList<A> = fa
  let i = 0
  let out: LinkedList<A> = nil
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
export function updateAt<A>(index: number, a: A, fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa)) return O.none

  let l: LinkedList<A> = fa
  let i = 0
  let out: LinkedList<A> = nil
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
export function modifyAt<A>(index: number, f: (a: A) => A, fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa)) return O.none

  let l: LinkedList<A> = fa
  let i = 0
  let out: LinkedList<A> = nil
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
export function alterAt<A>(index: number, f: (a: A) => O.Option<A>, fa: LinkedList<A>): O.Option<LinkedList<A>> {
  if (isNil(fa)) return O.none

  let l: LinkedList<A> = fa
  let i = 0
  let out: LinkedList<A> = nil
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
export function reverse<A>(fa: LinkedList<A>): LinkedList<A> {
  let out: LinkedList<A> = nil
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
export function flatten<A>(mma: LinkedList<LinkedList<A>>): LinkedList<A> {
  let out: LinkedList<A> = nil
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
export function sort<A>(O: Ord<A>): (fa: LinkedList<A>) => LinkedList<A> {
  return flow(
    toArray,
    A.sort(O),
    fromArray
  )
}

/**
 * Gets an array from a list.
 * @since 2.1.1
 */
export function toArray<A>(fa: LinkedList<A>): Array<A> {
  const out: Array<A> = []
  let l: LinkedList<A> = fa
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
export function fromArray<A>(as: Array<A>): LinkedList<A> {
  return A.array.reduceRight<A, LinkedList<A>>(as, nil, cons)
}

/**
 * @since 2.1.1
 */
export const linkedList: Functor1<URI> & Foldable1<URI> & Traversable1<URI> & Filterable1<URI> & Compactable1<URI> = {
  URI,
  map: <A, B>(fa: LinkedList<A>, f: (a: A) => B) =>
    linkedList.reduceRight<A, LinkedList<B>>(fa, nil, (a, b) => cons(f(a), b)),
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
  traverse: <F>(F: Applicative<F>): (<A, B>(ta: LinkedList<A>, f: (a: A) => HKT<F, B>) => HKT<F, LinkedList<B>>) => {
    return <A, B>(ta: LinkedList<A>, f: (a: A) => HKT<F, B>) =>
      linkedList.reduceRight(ta, F.of<LinkedList<B>>(nil), (a, fbs) =>
        F.ap(F.map(fbs, bs => (b: B) => cons(b, bs)), f(a))
      )
  },
  sequence: <F>(F: Applicative<F>) => <A>(ta: LinkedList<HKT<F, A>>): HKT<F, LinkedList<A>> => {
    return linkedList.reduceRight(ta, F.of<LinkedList<A>>(nil), (a, fas) =>
      F.ap(F.map(fas, as => (a: A) => cons(a, as)), a)
    )
  },
  filter: <A>(fa: LinkedList<A>, predicate: Predicate<A>): LinkedList<A> => {
    let out: LinkedList<A> = nil
    let l = fa
    while (isCons(l)) {
      if (predicate(l.head)) {
        out = cons(l.head, out)
      }
      l = l.tail
    }
    return reverse(out)
  },
  filterMap: <A, B>(fa: LinkedList<A>, f: (a: A) => O.Option<B>): LinkedList<B> => {
    let out: LinkedList<B> = nil
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
  partition: <A>(fa: LinkedList<A>, predicate: Predicate<A>): Separated<LinkedList<A>, LinkedList<A>> => {
    let left: LinkedList<A> = nil
    let right: LinkedList<A> = nil
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
  partitionMap: <A, B, C>(fa: LinkedList<A>, f: (a: A) => E.Either<B, C>): Separated<LinkedList<B>, LinkedList<C>> => {
    let left: LinkedList<B> = nil
    let right: LinkedList<C> = nil
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
  compact: fa => linkedList.filterMap(fa, identity),
  separate: fa => linkedList.partitionMap(fa, identity)
}

const { map, reduce, foldMap, reduceRight, filter, filterMap, partition, partitionMap, compact, separate } = pipeable(
  linkedList
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
