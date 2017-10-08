//
// Code for http://www.tomharding.me/2017/06/26/fantas-eel-and-specification-18/
//

import { Either, right, left } from '../../src/Either'
import { pipe } from '../../src/function'

type User = { name: string }

const isValid = (user: User): boolean => user.name !== ''

export const login = (user: User): Either<string, User> => (isValid(user) ? right(user) : left('BOO'))

export const failureStream = pipe((x: string) => x.toUpperCase(), x => x + '!', x => '<em>' + x + '</em>')

export const successStream = pipe((x: User) => x.name, x => 'Hey, ' + x + '!', x => '<h1>' + x + '</h1>')

console.log(login({ name: 'Giulio' }).bimap(failureStream, successStream))
// => right("<h1>Hey, Giulio!</h1>")

//
// Costar
//

import { HKT } from '../../src/HKT'
import { Functor } from '../../src/Functor'

export class Costar<F, B, C> {
  constructor(readonly F: Functor<F>, readonly run: (fl: HKT<F, B>) => C) {}
  promap<A, D>(f: (a: A) => B, g: (c: C) => D): Costar<F, A, D> {
    return new Costar(this.F, fa => g(this.run(this.F.map(f, fa))))
  }
}

import * as array from '../../src/Array'

// Takes a list of ints to the sum
export const sum = new Costar<'Array', number, number>(array, (xs: HKT<'Array', number>) =>
  (xs as Array<number>).reduce((acc, x) => acc + x, 0)
)

// Make every element 1, then sum them!
export const length = sum.promap<any, number>(() => 1, x => x)

// Is the result over 5?
export const isOk = sum.promap((x: number) => x, x => x > 5)

// Why not both? Is the length over 5?
export const longEnough = sum.promap<any, boolean>(() => 1, x => x > 5)

console.log(longEnough.run([1, 3, 5, 7]))
// => false
