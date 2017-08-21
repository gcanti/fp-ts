import { Functor, FantasyFunctor } from 'fp-ts/lib/Functor'

export const URI = 'List'

export type URI = typeof URI

export type List<A> = Nil<A> | Cons<A>

export class Nil<A> implements FantasyFunctor<URI, A> {
  static value = new Nil<any>()
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

export class Cons<A> implements FantasyFunctor<URI, A> {
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

export function map<A, B>(f: (a: A) => B, fa: List<A>): List<B> {
  return fa.map(f)
}

const proof: Functor<URI> = {
  URI,
  map
}
// tslint:disable-next-line no-unused-expression
proof

console.log(cons(1, cons(2, nil)).map(n => n * 2)) // => cons(2, cons(4, nil))
