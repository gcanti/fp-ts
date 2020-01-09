---
title: Combinators Part I
parent: Functional design
nav_order: 1
---

# Functional design: combinators

In this article the term "combinator" refers to the [combinator pattern](https://wiki.haskell.org/Combinator)

> A style of organizing libraries centered around the idea of combining things. Usually there is some type `T`, some "primitive" values of type `T`, and some "combinators" which can combine values of type `T` in various ways to build up more complex values of type `T`

So the general shape of a combinator is

```ts
combinator: Thing -> Thing
```

The goal of a combinator is to create new "things" from previously defined "things".

Since the result can be passed back as input, you get a combinatorial explosion of possibilities, which makes this pattern very powerful.

If you mix and match several combinators together, you get an even larger combinatorial explosion.

So a design that you may often find in a functional module is

- a small set of very simple "primitives"
- a set of "combinators" for combining them into more complicated structures

Let's see some examples.

## Example 1: `Eq`

The `getEq` combinator: given an instance of `Eq` for `A`, we can derive an instance of `Eq` for `Array<A>`

```ts
import { Eq } from 'fp-ts/lib/Eq'

export function getEq<A>(E: Eq<A>): Eq<Array<A>> {
  return {
    equals: (xs, ys) => xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i]))
  }
}
```

Usage

```ts
/** a primitive `Eq` instance for `number` */
export const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

// derived
export const eqArrayOfNumber: Eq<Array<number>> = getEq(eqNumber)

// derived
export const eqArrayOfArrayOfNumber: Eq<Array<Array<number>>> = getEq(eqArrayOfNumber)

// derived
export const eqArrayOfArrayOfArrayOfNumber: Eq<Array<Array<Array<number>>>> = getEq(
  eqArrayOfArrayOfNumber
)

// etc...
```

Another combinator, `contramap`: given an instance of `Eq` for `A` and a function from `B` to `A`, we can derive an instance of `Eq` for `B`

```ts
export const contramap = <A, B>(f: (b: B) => A) => (E: Eq<A>): Eq<B> => {
  return {
    equals: (x, y) => E.equals(f(x), f(y))
  }
}
```

Usage

```ts
export interface User {
  id: number
  name: string
}

export const eqUser: Eq<User> = contramap((user: User) => user.id)(eqNumber)

// mix with `getArraySetoid`
export const eqArrayOfUser: Eq<Array<User>> = getEq(eqUser)
```

## Example 2: `Monoid`

The `getIOMonoid` combinator: given an instance of `Monoid` for `A`, we can derive an instance of `Monoid` for `IO<A>`

```ts
import { IO } from 'fp-ts/lib/IO'
import { Monoid } from 'fp-ts/lib/Monoid'

export function getIOMonoid<A>(M: Monoid<A>): Monoid<IO<A>> {
  return {
    concat: (x, y) => () => M.concat(x(), y()),
    empty: () => M.empty
  }
}
```

We can use `getIOMonoid` to derive another combinator, `replicateIO`: given a number `n` and an action `mv` of type `IO<void>`, we can derive an action that performs `n` times `mv`

```ts
import { fold } from 'fp-ts/lib/Monoid'
import { replicate } from 'fp-ts/lib/Array'

/** a primitive `Monoid` instance for `void` */
export const monoidVoid: Monoid<void> = {
  concat: () => undefined,
  empty: undefined
}

export function replicateIO(n: number, mv: IO<void>): IO<void> {
  return fold(getIOMonoid(monoidVoid))(replicate(n, mv))
}
```

Usage

```ts
//
// helpers
//

/** logs to the console */
export function log(message: unknown): IO<void> {
  return () => console.log(message)
}

/** returns a random integer between `low` and `high` */
export const randomInt = (low: number, high: number): IO<number> => {
  return () => Math.floor((high - low + 1) * Math.random() + low)
}

//
// program
//
import { chain } from 'fp-ts/lib/IO'
import { pipe } from 'fp-ts/lib/pipeable'

function fib(n: number): number {
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2)
}

/** calculates a random fibonacci and prints the result to the console */
const printFib: IO<void> = pipe(
  randomInt(30, 35),
  chain(n => log(fib(n)))
)

replicateIO(3, printFib)()
/*
1346269
9227465
3524578
*/
```

## Example 3: `IO`

We can build many other combinators for `IO`, for example the `time` combinator mimics the analogous Unix command: given an action `IO<A>`, we can derive an action `IO<A>` that prints to the console the elapsed time

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { now } from 'fp-ts/lib/Date'
import { log } from 'fp-ts/lib/Console'

export function time<A>(ma: IO<A>): IO<A> {
  return io.chain(now, start =>
    io.chain(ma, a => io.chain(now, end => io.map(log(`Elapsed: ${end - start}`), () => a)))
  )
}
```

Usage

```ts
time(replicateIO(3, printFib))()
/*
5702887
1346269
14930352
Elapsed: 193
*/
```

With partials...

```ts
time(replicateIO(3, time(printFib)))()
/*
3524578
Elapsed: 32
14930352
Elapsed: 125
3524578
Elapsed: 32
Elapsed: 189
*/
```

Can we make the `time` combinator more general? We'll see how in the [next article](./combinators-part-II.md).
