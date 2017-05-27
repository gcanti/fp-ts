import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import { sequence } from 'fp-ts/lib/Traversable'

import * as array from 'fp-ts/lib/Array'

export function getAllSomesOrNone<A>(xs: Array<Option<A>>): Option<Array<A>> {
  return sequence(option, array)(xs)
}

console.log(getAllSomesOrNone([option.some(1), option.some(2), option.some(3)])) // => Some([1, 2, 3])
console.log(getAllSomesOrNone([option.some(1), option.none, option.some(3)])) // => None
