import { Option, some, none, option } from 'fp-ts/lib/Option'
import { array } from 'fp-ts/lib/Array'
import { sequence } from 'fp-ts/lib/Traversable'

export function getAllSomesOrNone<A>(xs: Array<Option<A>>): Option<Array<A>> {
  return sequence(option, array)(xs)
}

console.log(getAllSomesOrNone([some(1), some(2), some(3)])) // => some([1, 2, 3])
console.log(getAllSomesOrNone([some(1), none, some(3)])) // => none
