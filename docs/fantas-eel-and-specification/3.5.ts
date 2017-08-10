//
// Code for http://www.tomharding.me/2017/04/09/fantas-eel-and-specification-3.5/
//

import { Ord, lessThanOrEq } from '../../src/Ord'
import { fold } from '../../src/Array'

function lte<A>(ord: Ord<A>, xs: Array<A>, ys: Array<A>): boolean {
  return fold(
    () => true,
    (head, tail) => fold(() => false, (head_, tail_) => lessThanOrEq(ord, head, head_) && lte(ord, tail, tail_), ys),
    xs
  )
}

import { numberOrd } from '../../src/Ord'

console.log(lte(numberOrd, [1, 2], [1])) // => false
console.log(lte(numberOrd, [1], [1, 2])) // => true
