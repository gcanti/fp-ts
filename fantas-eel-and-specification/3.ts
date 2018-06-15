//
// Code for http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
//

import { findIndex } from '../src/Array'
import { Setoid, setoidNumber } from '../src/Setoid'

export class Coord {
  /** A coordinate in 3D space */
  constructor(readonly x: number, readonly y: number, readonly z: number) {}
  translate(deltaX: number, deltaY: number, deltaZ: number) {
    return new Coord(this.x + deltaX, this.y + deltaY, this.x + deltaZ)
  }
  equals(that: Coord): boolean {
    return this.x === that.x && this.y === that.y && this.z === that.z
  }
}

export class Line {
  /** A line between two coordinates */
  constructor(readonly from: Coord, readonly to: Coord) {}
  equals(that: Line): boolean {
    return this.from.equals(that.from) && this.to.equals(that.to)
  }
}

export type List<A> = Nil<A> | Cons<A>

export class Nil<A> {
  static value: List<never> = new Nil()
  private constructor() {}
  fold<R>(whenNil: () => R, whenCons: (head: A, tail: List<A>) => R): R {
    return whenNil()
  }
  map<B>(f: (a: A) => B): List<B> {
    return Nil.value
  }
  toString() {
    return 'Nil.value'
  }
  equals(S: Setoid<A>, that: List<A>): boolean {
    return isNil(this)
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
  equals(S: Setoid<A>, that: List<A>): boolean {
    return that.fold(() => false, (head, tail) => S.equals(this.head, head) && this.tail.equals(S, tail))
  }
}

export const isNil = <A>(xs: List<A>): xs is Nil<A> => xs === Nil.value

export const equals = <A>(S: Setoid<A>) => (xs: List<A>) => (ys: List<A>): boolean => xs.equals(S, ys)

//
// derivations
//

export const notEquals = <A>(S: Setoid<A>) => (x: A) => (y: A): boolean => !S.equals(x, y)

//
// nub implementation
//

const nub = <A>(S: Setoid<A>) => (xs: Array<A>): Array<A> =>
  xs.filter((x, i) => findIndex(xs, (a: A) => S.equals(x, a)).exists(j => i === j))

console.log(nub(setoidNumber)([1, 2, 3, 4, 2, 3]))
// => [ 1, 2, 3, 4 ]
