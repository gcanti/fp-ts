//
// Code for http://www.tomharding.me/2017/04/24/fantas-eel-and-specification-10/
//

import { Option, some, none } from '../../src/Option'

console.log((none as Option<number>).alt(none).alt(some(3))) // => some(3)

import { HKT } from '../../src/HKT'
import { Plus } from '../../src/Plus'
import { Monoid } from '../../src/Monoid'

export function getMonoid<F>(plus: Plus<F>): <A>() => Monoid<HKT<F, A>> {
  return () => ({
    concat(x, y) {
      return plus.alt(x, y)
    },
    empty: () => plus.zero()
  })
}
