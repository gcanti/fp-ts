//
// Code for http://www.tomharding.me/2017/05/08/fantas-eel-and-specification-12/
//

import * as task from '../../src/Task'

export type User = { name: string }

export const getById = (id: number): task.Task<User> => task.of({ name: `name-${id}` })

import { sequence } from '../../src/Traversable'
import * as array from '../../src/Array'

export const paralleliseTaskArray = (ids: Array<number>): task.Task<Array<User>> =>
  sequence(task, array)(ids.map(getById))

paralleliseTaskArray([1, 2, 3]).run().then(x => console.log(x))
// => [ { name: 'name-1' }, { name: 'name-2' }, { name: 'name-3' } ]

import * as either from '../../src/Either'

export const toChar = (n: number): either.Either<string, string> =>
  n < 0 || n > 25 ? either.left(n + ' is out of bounds!') : either.right(String.fromCharCode(n + 65))

console.log(array.traverse(either)(toChar, [0, 1, 2, 3]))
// => right(["A", "B", "C", "D"])

console.log(array.traverse(either)(toChar, [0, 15, 21, -2]))
// => left("-2 is out of bounds!")
