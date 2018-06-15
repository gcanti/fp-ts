//
// Code for http://www.tomharding.me/2017/04/17/fantas-eel-and-specification-9/
//

import { Applicative, Applicative1 } from '../src/Applicative'
import { liftA2 } from '../src/Apply'
import { HKT, Type, URIS } from '../src/HKT'
import { getArrayMonoid, Monoid } from '../src/Monoid'
import { getMonoid as getOptionMonoid, none, option, some } from '../src/Option'
import * as tuple from '../src/Tuple'

export const append = <A>(y: A) => (xs: Array<A>) => xs.concat([y])

// these overloadings are helpful for the 12.ts post
export function insideOut<F extends URIS>(F: Applicative1<F>): <A>(xs: Array<Type<F, A>>) => Type<F, Array<A>>
export function insideOut<F>(F: Applicative<F>): <A>(xs: Array<HKT<F, A>>) => HKT<F, Array<A>>
export function insideOut<F>(F: Applicative<F>): <A>(xs: Array<HKT<F, A>>) => HKT<F, Array<A>> {
  return xs => xs.reduce((acc, x) => liftA2(F)(append)(x)(acc), F.of([]))
}

console.log(insideOut(option)([some(2), some(10), some(3)])) // => some([2, 10, 3])

console.log(insideOut(option)([some(2), none, some(3)])) // => none

//
// Monoids from Applicatives
//

export const getMonoid = <F extends URIS, A>(F: Applicative1<F>, M: Monoid<A>): Monoid<Type<F, A>> => ({
  concat: (x, y) => liftA2(F)((x: A) => (y: A) => M.concat(x, y))(x)(y),
  empty: F.of(M.empty)
})

const monoidArrayNumber = getArrayMonoid<number>()

// Usual implementation:

const { concat } = getOptionMonoid(monoidArrayNumber)

console.log(concat(some([2]), some([3]))) // => some([2, 3])
console.log(concat(some([2]), none)) // => some([2])
console.log(concat(none, some([3]))) // => some([3])
console.log(concat(none, none)) // => none

// With the above implementation

const monoid = getMonoid(option, monoidArrayNumber)

console.log(monoid.concat(some([2]), some([3]))) // => some([2, 3])
console.log(monoid.concat(some([2]), none)) // => none
console.log(monoid.concat(none, some([3]))) // => none
console.log(monoid.concat(none, none)) // => none

//
// Tuple
//

const monoidTuple = tuple.getApplicative(monoidArrayNumber)

console.log(monoidTuple.of(2)) // => new Tuple([[], 2])
