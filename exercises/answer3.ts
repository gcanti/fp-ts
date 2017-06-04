import { HKT } from 'fp-ts/lib/HKT'
import { Functor } from 'fp-ts/lib/Functor'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A> {
    'List': List<A>
  }
}

export const URI = 'List'

export type URI = typeof URI

export type List<A> = Nil<A> | Cons<A>

export class Nil<A> {
  static value = new Nil<any>()
  private constructor() {}
  map<B>(f: (a: A) => B): List<B> {
    return this as any
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'Nil'
  }
}

export class Cons<A> {
  constructor(public readonly head: A, public readonly tail: List<A>) {}
  map<B>(f: (a: A) => B): List<B> {
    return new Cons(f(this.head), this.tail.map(f))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `List(${this.head}, ${this.tail})`
  }
}

export const nil = Nil.value

export function map<A, B>(f: (a: A) => B, fa: List<A>): List<B> {
  return fa.map(f)
}

console.log(new Cons(1, new Cons(2, nil)).map(n => n * 2)) // => List(2, List(4, Nil))
