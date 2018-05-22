//
// Code for http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
//

//
// product types
//

/*
// A coordinate in 3D space
export type Coord = {
  readonly x: number
  readonly y: number
  readonly z: number
}

// A line between two coordinates
export type Line = {
  readonly from: Coord
  readonly to: Coord
}
*/

// however in order to add methods to Coord we have to change the enconding using `class`

export class Coord {
  /** A coordinate in 3D space */
  constructor(readonly x: number, readonly y: number, readonly z: number) {}
  translate(deltaX: number, deltaY: number, deltaZ: number) {
    return new Coord(this.x + deltaX, this.y + deltaY, this.x + deltaZ)
  }
}

export class Line {
  /** A line between two coordinates */
  constructor(readonly from: Coord, readonly to: Coord) {}
}

const origin = new Coord(0, 0, 0)

export const myLine = new Line(origin, origin.translate(2, 4, 6))

//
// sum types
//

/*
// using type Foo = ...

export type Square = { readonly _tag: 'Square'; readonly topleft: Coord; readonly bottomright: Coord }
export type Circle = { readonly _tag: 'Circle'; readonly centre: Coord; readonly radius: number }
export type Shape = Square | Circle
*/

// using `class`es

export class Square {
  readonly _tag: 'Square' = 'Square'
  constructor(readonly topleft: Coord, readonly bottomright: Coord) {}
}

export class Circle {
  readonly _tag: 'Circle' = 'Circle'
  constructor(readonly centre: Coord, readonly radius: number) {}
}

export type Shape = Square | Circle

export const cata = <R>(whenSquare: (s: Square) => R, whenCircle: (c: Circle) => R) => (s: Shape): R => {
  switch (s._tag) {
    case 'Square':
      return whenSquare(s)
    case 'Circle':
      return whenCircle(s)
  }
}

import { Endomorphism } from '../src/function'

export const translateShape = (deltaX: number, deltaY: number, deltaZ: number): Endomorphism<Shape> =>
  cata<Shape>(
    s => new Square(s.topleft.translate(deltaX, deltaY, deltaZ), s.bottomright.translate(deltaX, deltaY, deltaZ)),
    c => new Circle(c.centre.translate(deltaX, deltaY, deltaZ), c.radius)
  )

//
// Example: linked lists
//

export type List<A> = Nil<A> | Cons<A>

export class Nil<A> {
  static value: List<never> = new Nil()
  private constructor() {}
  // we could also define cata (here renamed to fold) as a method
  fold<R>(whenNil: () => R, whenCons: (head: A, tail: List<A>) => R): R {
    return whenNil()
  }
  map<B>(f: (a: A) => B): List<B> {
    return Nil.value
  }
  toString() {
    return 'Nil.value'
  }
}

export class Cons<A> {
  constructor(readonly head: A, readonly tail: List<A>) {}
  fold<R>(whenNil: () => R, whenCons: (head: A, tail: List<A>) => R): R {
    return whenCons(this.head, this.tail)
  }
  map<B>(f: (a: A) => B): List<B> {
    return new Cons(f(this.head), this.tail.map(f))
  }
  toString() {
    return `new Cons(${this.head}, ${this.tail})`
  }
}

export const fromArray = <A>(xs: Array<A>): List<A> =>
  xs.reduceRight((acc, a) => new Cons(a, acc), Nil.value as List<A>)

export const toArray = <A>(xs: List<A>): Array<A> => xs.fold(() => [], (head, tail) => [head, ...toArray(tail)])

console.log(toArray(fromArray([1, 2, 3]).map(x => x + 2)))
// => [3, 4, 5]

console.log(fromArray([1, 2, 3]).toString())
// => new Cons(1, new Cons(2, new Cons(3, Nil.value)))
