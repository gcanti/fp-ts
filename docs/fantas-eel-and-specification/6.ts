//
// Code for http://www.tomharding.me/2017/03/27/fantas-eel-and-specification-6/
//

// Let's see how to define a functor instance

import { Functor } from '../../src/Functor'

declare module '../../src/HKT' {
  interface URI2HKT<A> {
    MyType: MyType<A>
  }
}

export const URI = 'MyType'

export type URI = typeof URI

export class MyType<A> {
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
}

export function map<A, B>(f: (a: A) => B, fa: MyType<A>): MyType<B> {
  return new MyType(f(fa.value))
}

export const functor: Functor<URI> = {
  URI,
  map
}
