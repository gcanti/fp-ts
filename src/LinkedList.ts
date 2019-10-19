/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

import { Foldable1 } from './Foldable'
import { array } from './Array'
import { Monoid } from './Monoid'

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
 * @since 2.1.1
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: LinkedList<A>) => B {
  return fa => linkedList.reduce(fa, b, f)
}

/**
 * @since 2.1.1
 */
export function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: LinkedList<A>) => M {
  return f => fa => linkedList.foldMap(M)(fa, f)
}

/**
 * @since 2.1.1
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: LinkedList<A>) => B {
  return fa => linkedList.reduceRight(fa, b, f)
}

/**
 * Gets an array from a list.
 * @since 2.1.1
 */
export function toArray<A>(list: LinkedList<A>): Array<A> {
  const len = length(list)
  const r: Array<A> = new Array(len)
  let l: LinkedList<A> = list
  let i = 0
  while (isCons(l)) {
    r[i] = l.head
    i++
    l = l.tail
  }
  return r
}

/**
 * @since 2.1.1
 */
export const linkedList: Foldable1<URI> = {
  URI,
  reduce: (fa, b, f) => {
    let out = b
    let currentTail = fa
    while (true) {
      if (isNil(currentTail)) return out
      out = f(out, currentTail.head)
      currentTail = currentTail.tail
    }
  },
  foldMap: M => (fa, f) => {
    let out = M.empty
    let currentTail = fa
    while (true) {
      if (isNil(currentTail)) return out
      out = M.concat(out, f(currentTail.head))
      currentTail = currentTail.tail
    }
  },
  reduceRight: (fa, b, f) => array.reduceRight(toArray(fa), b, f)
}
