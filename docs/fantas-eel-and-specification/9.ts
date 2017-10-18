//
// Code for http://www.tomharding.me/2017/04/17/fantas-eel-and-specification-9/
//

import { liftA2 } from '../../src/Apply'
import { Applicative } from '../../src/Applicative'
import { HKT, HKTS, HKTAs } from '../../src/HKT'

export const append = <A>(y: A) => (xs: Array<A>) => xs.concat([y])

// these overloadings are helpful for the 12.ts post
export function insideOut<F extends HKTS>(F: Applicative<F>): <A>(xs: Array<HKTAs<F, A>>) => HKTAs<F, Array<A>>
export function insideOut<F>(F: Applicative<F>): <A>(xs: Array<HKT<F, A>>) => HKT<F, Array<A>>
export function insideOut<F>(F: Applicative<F>): <A>(xs: Array<HKT<F, A>>) => HKT<F, Array<A>> {
  return <A>(xs: Array<HKT<F, A>>) =>
    xs.reduce((acc, x) => liftA2(F)<A, Array<A>, Array<A>>(append)(x)(acc), F.of<A[]>([]))
}

import * as option from '../../src/Option'

console.log(insideOut(option)([option.some(2), option.some(10), option.some(3)])) // => some([2, 10, 3])

console.log(insideOut(option)([option.some(2), option.none, option.some(3)])) // => none

//
// Monoids from Applicatives
//

import { Monoid } from '../../src/Monoid'

export const getMonoid = <F, A>(F: Applicative<F>, M: Monoid<A>): Monoid<HKT<F, A>> => ({
  concat: x => y => liftA2(F)((x: A) => (y: A) => M.concat(x)(y))(x)(y),
  empty: () => F.of(M.empty())
})

import { getArrayMonoid } from '../../src/Monoid'

const monoidArrayNumber = getArrayMonoid<number>()

// Usual implementation:

const { concat } = option.getSemigroup(monoidArrayNumber)

console.log(concat(option.some([2]))(option.some([3]))) // => some([2, 3])
console.log(concat(option.some([2]))(option.none)) // => some([2])
console.log(concat(option.none)(option.some([3]))) // => some([3])
console.log(concat(option.none)(option.none)) // => none

// With the above implementation

const monoid = getMonoid(option, monoidArrayNumber)

console.log(monoid.concat(option.some([2]))(option.some([3]))) // => some([2, 3])
console.log(monoid.concat(option.some([2]))(option.none)) // => none
console.log(monoid.concat(option.none)(option.some([3]))) // => none
console.log(monoid.concat(option.none)(option.none)) // => none

//
// Tuple
//

import * as tuple from '../../src/Tuple'

const monoidTuple = tuple.getApplicative(monoidArrayNumber)

console.log(monoidTuple.of(2)) // => new Tuple([[], 2])
