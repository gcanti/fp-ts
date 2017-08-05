//
// Code for http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
//

import { Setoid } from '../../src/Setoid'

export class Coord {
  /** A coordinate in 3D space */
  constructor(public readonly x: number, public readonly y: number, public readonly z: number) {}
  translate(deltaX: number, deltaY: number, deltaZ: number) {
    return new Coord(this.x + deltaX, this.y + deltaY, this.x + deltaZ)
  }
  equals(that: Coord): boolean {
    return this.x === that.x && this.y === that.y && this.z === that.z
  }
}

export class Line {
  /** A line between two coordinates */
  constructor(public readonly from: Coord, public readonly to: Coord) {}
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
  constructor(public readonly head: A, public readonly tail: List<A>) {}
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

export function isNil<A>(xs: List<A>): xs is Nil<A> {
  return xs === Nil.value
}

export function equals<A>(S: Setoid<A>, xs: List<A>, ys: List<A>): boolean {
  return xs.equals(S, ys)
}

//
// derivations
//

export function notEquals<A>(S: Setoid<A>): (x: A, y: A) => boolean {
  return (x, y) => !S.equals(x, y)
}

//
// nub implementation
//

import { findIndex } from '../../src/Array'

function nub<A>(S: Setoid<A>, xs: Array<A>): Array<A> {
  return xs.filter((x, i) => findIndex(a => S.equals(x, a), xs).exists(j => i === j))
}

const setoidNumber: Setoid<number> = {
  equals(x, y) {
    return x === y
  }
}

console.log(nub(setoidNumber, [1, 2, 3, 4, 2, 3]))
// => [ 1, 2, 3, 4 ]
