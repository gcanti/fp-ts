//
// Code for http://www.tomharding.me/2017/03/21/fantas-eel-and-specification-5/
//

import { getFirstMonoid, none, some } from '../src/Option'
import { monoidSum } from '../src/Monoid'

const firstMonoid = getFirstMonoid<number>()

console.log(firstMonoid.concat(none, some(1)))
// => some(1)

console.log(firstMonoid.concat(some(1), some(2)))
// => some(1)

import { fold } from '../src/Monoid'

const sumAll = fold(monoidSum)

console.log(sumAll([1, 2, 3, 4, 5]))
// => 15

console.log(sumAll([]))
// => 0

import { getMonoid } from '../src/Tuple'
import { monoidString } from '../src/Monoid'

const monoidTuple = getMonoid(monoidSum, monoidString)

console.log(monoidTuple.empty)
// => new Tuple([0, ""])

import { getFunctionMonoid, monoidAll } from '../src/Monoid'

export const monoidFunction = getFunctionMonoid(monoidAll)<string>()

export const gt2 = (s: string) => s.length > 2
export const lt4 = (s: string) => s.length < 4

export const between2and4 = monoidFunction.concat(gt2, lt4)

console.log(between2and4('foo')) // => true
console.log(between2and4('')) // => false
