//
// Code for http://www.tomharding.me/2017/03/08/fantas-eel-and-specification-2/
//

import { zipWith } from '../../src/Array'

const sum = (x: number, y: number) => x + y
console.log(zipWith(sum)([1, 2])([4, 5, 6]))
// => [5, 7]

import { filter } from '../../src/Array'

const gt2 = (n: number) => n > 2
console.log(filter(gt2)([1, 2, 3]))
// => [3]

//
// Type Constraints
//

export function naiveEquals<A>(xs: Array<A>, ys: Array<A>): boolean {
  return xs.length === ys.length && xs.every((x, i) => x === ys[i]) // <- this is too restrictive
}

// let's write a better equals...

import { Setoid } from '../../src/Setoid'

export const equals = <A>(S: Setoid<A>) => (xs: Array<A>) => (ys: Array<A>): boolean =>
  xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i])) // <- this too restrictive

// so type constraints are encoded as additional arguments (usually in first position)

//
// Examples
//

/** `Setoid` instance for `number` */
const setoidNumber: Setoid<number> = {
  equals: (x, y) => x === y
}

console.log(equals(setoidNumber)([1, 2])([1, 2]))
// => true

/** `Setoid` instance for `Date` */
const setoidDate: Setoid<Date> = {
  equals: (x, y) => x.getTime() === y.getTime()
}

const d1 = new Date(1973, 10, 30)
const d2 = new Date()

console.log(equals(setoidDate)([d1, d2])([d1, d2]))
// => true
