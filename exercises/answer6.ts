import { array } from '../src/Array'
import { some, none } from '../src/Option'
import { tuple } from '../src/function'

export function evens(count: number): Array<number> {
  let i = count
  return array.unfoldr(1, n => {
    if (i <= 0) {
      return none
    }
    i--
    return some(tuple(n, n + 2))
  })
}

console.log(evens(10)) // => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
