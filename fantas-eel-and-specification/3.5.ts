//
// Code for http://www.tomharding.me/2017/04/09/fantas-eel-and-specification-3.5/
//

import { fold } from '../src/Array'
import { lessThanOrEq, Ord, ordNumber } from '../src/Ord'

export const lte = <A>(ord: Ord<A>) => (xs: Array<A>, ys: Array<A>): boolean =>
  fold(xs, true, (head, tail) =>
    fold(ys, false, (head_, tail_) => lessThanOrEq(ord)(head, head_) && lte(ord)(tail, tail_))
  )

console.log(lte(ordNumber)([1, 2], [1])) // => false
console.log(lte(ordNumber)([1], [1, 2])) // => true
