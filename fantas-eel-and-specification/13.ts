//
// Code for http://www.tomharding.me/2017/05/15/fantas-eel-and-specification-13/
//

import { StrMap, lookup } from '../src/StrMap'
import { option } from '../src/Option'

const data = new StrMap({ a: new StrMap({ b: new StrMap({ c: 2 }) }) })

console.log(
  lookup('a', data)
    .map(d => lookup('b', d))
    .map(o => o.map(d => lookup('c', d)))
)
// => some(some(some(2)))

console.log(
  lookup('a', data)
    .map(d => lookup('badger', d))
    .map(o => o.map(d => lookup('c', d)))
)
// => some(none)

//
// using flatten (= join)
//

import { flatten } from '../src/Chain'

const flattenOption = flatten(option)

console.log(flattenOption(flattenOption(lookup('a', data).map(d => lookup('b', d))).map(d => lookup('c', d))))
// => some(2)

console.log(flattenOption(flattenOption(lookup('a', data).map(d => lookup('badger', d))).map(d => lookup('c', d))))
// => none

//
// using chain
//

console.log(
  lookup('a', data)
    .chain(d => lookup('b', d))
    .chain(d => lookup('c', d))
)
// => some(2)

//
// Either
//

import { Either, right, left } from '../src/Either'

export const sqrt = (x: number): Either<string, number> => (x < 0 ? left('Hey, no!') : right(Math.sqrt(x)))

console.log(
  right<string, number>(16)
    .chain(sqrt)
    .chain(sqrt)
)
// => right(2)

console.log(
  right<string, number>(81)
    .chain(sqrt)
    .map(x => -x)
    .chain(sqrt)
    .map(x => -x)
)
// => left("Hey, no!")

console.log(left<string, number>('eep').chain(sqrt))
// => left("eep")

//
// Array
//

import { array } from '../src/Array'

const flights = {
  ATL: ['LAX', 'DFW'],
  ORD: ['DEN'],
  LAX: ['JFK', 'ATL'],
  DEN: ['ATL', 'ORD', 'DFW'],
  JFK: ['LAX', 'DEN']
}

type FLIGHT = keyof typeof flights

const whereNext = (x: FLIGHT): Array<FLIGHT> => (flights[x] || []) as Array<FLIGHT>

console.log(array.chain(array.chain(whereNext('LAX'), whereNext), whereNext))
// => [ 'JFK', 'ATL', 'ATL', 'ORD', 'DFW', 'JFK', 'ATL' ]

const range = (from: number, to: number): Array<number> => [...new Array(to - from).fill(1)].map((_, i) => i + from)

import { tuple } from '../src/function'

const factors = (n: number): Array<[number, number]> =>
  array.chain(range(1, n), a => array.chain(range(1, a), b => (a * b !== n ? [] : [tuple(a, b)])))

console.log(factors(20))
// => [ [ 5, 4 ], [ 10, 2 ] ]

//
// Task
//

import { Task, task } from '../src/Task'

const getUser = (email: string): Task<number> => task.of(email.length)

type User = { name: string }

const getFriends = (id: number): Task<Array<User>> => task.of([{ name: `Friends of ${id}` }])

getUser('test@test.com')
  .chain(getFriends)
  .run()
  .then(x => console.log(x))
// => [ { name: 'Friends of 13' } ]
