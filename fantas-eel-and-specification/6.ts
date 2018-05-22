//
// Code for http://www.tomharding.me/2017/03/27/fantas-eel-and-specification-6/
//

// Let's see how to define a functor instance

import { Functor1 } from '../src/Functor'

declare module '../src/HKT' {
  interface URI2HKT<A> {
    MyType: MyType<A>
  }
}

export const URI = 'MyType'

export type URI = typeof URI

export class MyType<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly value: A) {}
}

export const map = <A, B>(fa: MyType<A>, f: (a: A) => B): MyType<B> => new MyType(f(fa.value))

export const functor: Functor1<URI> = {
  URI,
  map
}
