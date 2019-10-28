/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

import { Foldable1 } from './Foldable'
import { Functor1 } from './Functor'
import { Monoid } from './Monoid'
import { array } from './Array'
import { Traversable1 } from './Traversable'
import { Applicative } from './Applicative'
import { HKT } from './HKT'

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
 * @since 2.1.1
 */
export function map<A, B>(f: (a: A) => B): (fa: LinkedList<A>) => LinkedList<B> {
  return fa => linkedList.map(fa, f)
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
 * @since 2.1.1
 */
export const linkedList: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = {
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
  }
}
