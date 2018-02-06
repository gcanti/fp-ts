//
// Code for http://www.tomharding.me/2017/04/09/fantas-eel-and-specification-3.5/
//

import { Ord, lessThanOrEq } from '../../src/Ord'
import { fold } from '../../src/Array'

export const lte = <A>(ord: Ord<A>) => (xs: Array<A>, ys: Array<A>): boolean =>
  fold(xs, true, (head, tail) =>
    fold(ys, false, (head_, tail_) => lessThanOrEq(ord)(head, head_) && lte(ord)(tail, tail_))
  )

import { ordNumber } from '../../src/Ord'

console.log(lte(ordNumber)([1, 2], [1])) // => false
console.log(lte(ordNumber)([1], [1, 2])) // => true
