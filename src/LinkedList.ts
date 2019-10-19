/**
 * @file Adapted from https://github.com/purescript/purescript-lists
 */

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
  readonly length: number
}

interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: LinkedList<A>
  readonly length: number
}

/**
 * @since 2.1.1
 */
export type LinkedList<A> = Nil | Cons<A>

/**
 * @since 2.1.1
 */
export const nil: Nil = { type: 'Nil', length: 0 }

/**
 * @since 2.1.1
 */
export function cons<A>(head: A, tail: LinkedList<A>): LinkedList<A> {
  return { type: 'Cons', head, tail, length: tail.length + 1 }
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
