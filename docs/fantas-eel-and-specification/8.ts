//
// Code for http://www.tomharding.me/2017/04/10/fantas-eel-and-specification-8/
//

import { liftA2 } from '../../src/Apply'
import * as identity from '../../src/Identity'
import * as option from '../../src/Option'

const sum = (x: number) => (y: number) => x + y

const identitySum = liftA2(identity)(sum)

console.log(identitySum(new identity.Identity(2))(new identity.Identity(3))) // => new Identity(5)

const optionSum = liftA2(option)(sum)

console.log(optionSum(option.some(2))(option.some(2))) // => some(4)
console.log(optionSum(option.some(2))(option.none)) // => none

import * as array from '../../src/Array'

console.log(array.ap([], [1, 2, 3]))
// => []

console.log(array.ap([(x: number) => x + '!'], [1, 2, 3]))
// => [ '1!', '2!', '3!' ]

console.log(array.ap([(x: number) => x + '!', (x: number) => x + '?'], [1, 2, 3]))
// => [ '1!', '2!', '3!', '1?', '2?', '3?' ]

console.log(liftA2(array)(sum)([1, 2])([3, 4]))
// => [ 4, 5, 5, 6 ]

//
// Option
//

console.log(option.some(3).ap(option.some((x: number) => -x))) // => some(-3)
console.log(option.none.ap(option.some((x: number) => -x))) // => none
console.log(option.some(3).ap(option.none)) // => none
console.log(option.none.ap(option.none)) // => none

//
// Either
//

import * as either from '../../src/Either'

console.log(either.right(2).ap(either.right((x: number) => -x))) // => right(-2)
console.log(either.left<string, number>('halp').ap(either.right((x: number) => -x))) // => left("halp")
console.log(either.right<string, number>(2).ap(either.left<string, (x: number) => number>('eek'))) // => left("eek")
console.log(either.left<string, number>('halp').ap(either.left<string, (x: number) => number>('eek'))) // => left("eek")

//
// Task
//

import * as task from '../../src/Task'

export const getJSON = (url: string): task.Task<string> => new task.Task(() => fetch(url).then(res => res.text()))

export const renderPage = (users: string) => (posts: string) => 'html...'

// A Task of a web page
export const page = liftA2(task)(renderPage)(getJSON('/users'))(getJSON('/posts'))
