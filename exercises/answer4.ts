import { Either, left, right } from '../src/Either'
import { none, Option, option } from '../src/Option'

export function head<A>(xs: Array<A>): Option<A> {
  if (xs.length) {
    return option.of(xs[0])
  }
  return none
}

console.log(head([1, 2, 3])) // => some(1)
console.log(head([])) // => none

export function elementAt<A>(xs: Array<A>, i: number): Either<string, A> {
  if (i < 0) {
    return left<string, A>('out of lower bound')
  }
  if (i >= xs.length) {
    return left<string, A>('out of upper bound')
  }
  return right<string, A>(xs[i])
}

console.log(elementAt([1, 2, 3], -1)) // => left('out of lower bound')
console.log(elementAt([1, 2, 3], 10)) // => left('out of upper bound')
console.log(elementAt([1, 2, 3], 1)) // => right(2)
