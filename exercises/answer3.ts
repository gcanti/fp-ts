import { Functor1 } from 'fp-ts/lib/Functor'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    List: List<A>
  }
}

export const URI = 'List'

export type URI = typeof URI

export type List<A> = Nil<A> | Cons<A>

export class Nil<A> {
  static value = new Nil<never>()
  readonly _A: A
  readonly _URI: URI
  private constructor() {}
  map<B>(f: (a: A) => B): List<B> {
    return this as any
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'nil'
  }
}

export class Cons<A> {
  readonly _A: A
  readonly _URI: URI
  constructor(readonly head: A, readonly tail: List<A>) {}
  map<B>(f: (a: A) => B): List<B> {
    return new Cons(f(this.head), this.tail.map(f))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `cons(${this.head}, ${this.tail})`
  }
}

export const nil = Nil.value

export function cons<A>(head: A, tail: List<A>): List<A> {
  return new Cons(head, tail)
}

export function map<A, B>(fa: List<A>, f: (a: A) => B): List<B> {
  return fa.map(f)
}

const proof: Functor1<URI> = {
  URI,
  map
}

console.log(cons(1, cons(2, nil)).map(n => n * 2)) // => cons(2, cons(4, nil))
