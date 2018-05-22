//
// Code for http://www.tomharding.me/2017/03/13/fantas-eel-and-specification-4/
//

import { Semigroup } from '../src/Semigroup'

export const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y // string concatenation
}

export const getArraySemigroup = <A>(): Semigroup<Array<A>> => ({
  concat: (x, y) => x.concat(y)
})

console.log(getArraySemigroup<number>().concat([1, 2], [3]))

// getArraySemigroup<number>().concat([1, 2], ['a']) // type error

export const semigroupString2: Semigroup<string> = {
  concat: (x, y) => `${x} MITTENS ${y}`
}

// associative law
console.log(
  semigroupString2.concat(semigroupString2.concat('a', 'b'), 'c') ===
    semigroupString2.concat('a', semigroupString2.concat('b', 'c'))
)
// => true

// defined in fp-ts/lib/Monoid
export const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y // number addition
}

//
// Exercises
//

/** the `Product` Semigroup */
// ???

/** the `Min` Semigroup */
export const semigroupMin: Semigroup<number> = {
  concat: (x, y) => Math.min(x, y)
}

/** the `Max` Semigroup */
// ???

// defined in fp-ts/lib/Monoid
export const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y // disjunction
}

// defined in fp-ts/lib/Monoid
export const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y // conjunction
}

// defined in fp-ts/lib/Semigroup
export const getFirstSemigroup = <A>(): Semigroup<A> => ({
  concat: (x, y) => x
})

// defined in fp-ts/lib/Semigroup
export const getLastSemigroup = <A>(): Semigroup<A> => ({
  concat: (x, y) => y
})

// defined in fp-ts/lib/Tuple
export class Tuple<A, B> {
  constructor(readonly fst: A, readonly snd: B) {}
  concat(SA: Semigroup<A>, SB: Semigroup<B>): (that: Tuple<A, B>) => Tuple<A, B> {
    return that => new Tuple(SA.concat(this.fst, that.fst), SB.concat(this.snd, that.snd))
  }
}

//
// Customer record merging
//

export class Customer {
  constructor(
    readonly name: string,
    readonly favouriteThings: Array<string>,
    readonly registrationDate: number, // since epoch
    readonly hasMadePurchase: boolean
  ) {}
  concat(that: Customer) {
    return new Customer(
      this.name,
      this.favouriteThings.concat(that.favouriteThings),
      Math.min(this.registrationDate, that.registrationDate),
      this.hasMadePurchase || that.hasMadePurchase
    )
  }
}

// let's generalize concat

// this interface represents an isomorphism
export interface Iso<S, A> {
  to: (s: S) => A
  from: (a: A) => S
}

export const merge = <S, A>(S: Semigroup<A>, iso: Iso<S, A>): Semigroup<S> => ({
  concat: (x, y) => iso.from(S.concat(iso.to(x), iso.to(y)))
})

type Tuple4Customer = [string, Array<string>, number, boolean]

export const iso: Iso<Customer, Tuple4Customer> = {
  to: ({ name, favouriteThings, registrationDate, hasMadePurchase }) => [
    name,
    favouriteThings,
    registrationDate,
    hasMadePurchase
  ],
  from: ([name, favouriteThings, registrationDate, hasMadePurchase]) =>
    new Customer(name, favouriteThings, registrationDate, hasMadePurchase)
}

export const strategy: Semigroup<Tuple4Customer> = {
  concat: (x, y) => [
    getFirstSemigroup<string>().concat(x[0], y[0]),
    getArraySemigroup<string>().concat(x[1], y[1]),
    semigroupMin.concat(x[2], y[2]),
    semigroupAny.concat(x[3], y[3])
  ]
}

const mySemigroup = merge(strategy, iso)
const me = new Customer('Giulio', ['climbing'], 100, false)
const oldMe = new Customer('Giulio', ['math'], 10, true)

console.log(mySemigroup.concat(me, oldMe))
/*
=> Customer {
  name: 'Giulio',
  favouriteThings: [ 'climbing', 'math' ],
  registrationDate: 10,
  hasMadePurchase: true }
*/

// What if we want to merge more than two customers?

import { fold } from '../src/Semigroup'

console.log(fold(merge(strategy, iso))(me)([oldMe /* ... */]))
