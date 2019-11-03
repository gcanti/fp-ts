/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

import { Foldable1 } from './Foldable'
import { Functor1 } from './Functor'
import { array } from './Array'
import { Traversable1 } from './Traversable'
import { Applicative } from './Applicative'
import { HKT } from './HKT'
import * as O from './Option'
import { pipe, pipeable } from './pipeable'
import { Filterable1 } from './Filterable'
import { Predicate, identity } from './function'
import { Separated, Compactable1 } from './Compactable'
import * as E from './Either'

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
  return array.reduceRight<A, LinkedList<A>>(as, nil, cons)
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
  reduceRight: (fa, b, f) => array.reduceRight(toArray(fa), b, f),
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
