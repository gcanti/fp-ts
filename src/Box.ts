import { Functor1 } from './Functor'

declare module './HKT' {
  interface URI2HKT<A> {
    Box: Box<A>
  }
}

export const URI = 'Box'

export type URI = typeof URI

export class Box<A> {
  readonly _A!: A
  readonly _URI!: URI
  private constructor(readonly value: A) {}

  static of<A>(val: A) {
    return new Box(val)
  }

  map<B>(f: (a: A) => B) {
    return new Box(f(this.value))
  }
}

const map = <A, B>(fa: Box<A>, f: (a: A) => B): Box<B> => {
  return fa.map(f)
}

export const box: Functor1<URI> = {
  URI,
  map
}
