import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'

export function head<A>(xs: Array<A>): Option<A> {
  if (xs.length) {
    return option.of(xs[0])
  }
  return option.none
}

console.log(head([1, 2, 3])) // => Some(1)
console.log(head([])) // => None

import { Either } from 'fp-ts/lib/Either'
import * as either from 'fp-ts/lib/Either'

export function elementAt<A>(xs: Array<A>, i: number): Either<string, A> {
  if (i < 0) {
    return either.left<string, A>('out of lower bound')
  }
  if (i >= xs.length) {
    return either.left<string, A>('out of upper bound')
  }
  return either.right<string, A>(xs[i])
}

console.log(elementAt([1, 2, 3], -1)) // => Left('out of lower bound')
console.log(elementAt([1, 2, 3], 10)) // => Left('out of upper bound')
console.log(elementAt([1, 2, 3], 1)) // => Right(2)
