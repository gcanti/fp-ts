//
// Code for http://www.tomharding.me/2017/05/08/fantas-eel-and-specification-12/
//

import { Task, task } from '../../src/Task'

export type User = { name: string }

export const getById = (id: number): Task<User> => task.of({ name: `name-${id}` })

import { sequence } from '../../src/Traversable'
import { array, traverse } from '../../src/Array'

export const paralleliseTaskArray = (ids: Array<number>): Task<Array<User>> => sequence(task, array)(ids.map(getById))

paralleliseTaskArray([1, 2, 3])
  .run()
  .then(x => console.log(x))
// => [ { name: 'name-1' }, { name: 'name-2' }, { name: 'name-3' } ]

import { Either, either, right, left } from '../../src/Either'

export const toChar = (n: number): Either<string, string> =>
  n < 0 || n > 25 ? left(n + ' is out of bounds!') : right(String.fromCharCode(n + 65))

console.log(traverse(either)([0, 1, 2, 3], toChar))
// => right(["A", "B", "C", "D"])

console.log(traverse(either)([0, 15, 21, -2], toChar))
// => left("-2 is out of bounds!")
