---
title: IO
parent: Getting started
nav_order: 10
---

# Getting started with fp-ts: IO

In `fp-ts` a synchronous effectful computation is represented by the `IO` type, which is basically a **thunk**, i.e. a function with the following signature: `() => A`

```ts
interface IO<A> {
  (): A
}
```

Note that `IO` represents a computation that **never fails**.

Examples of such computations are:

- read / write to `localStorage`
- get the current time
- write to the `console`
- get a random number

**Example** (read / write to `localStorage`)

```ts
import { fromNullable, Option } from 'fp-ts/lib/Option'

const getItem = (key: string): IO<Option<string>> => () =>
  fromNullable(localStorage.getItem(key))

const setItem = (key: string, value: string): IO<void> => () =>
  localStorage.setItem(key, value)
```

**Example** (get the current time)

```ts
const now: IO<number> = () => new Date().getTime()
```

**Example** (write to the `console`)

```ts
const log = (s: unknown): IO<void> => () => console.log(s)
```

**Example** (get a random number)

```ts
const random: IO<number> = () => Math.random()
```

The `IO` type admits a [Monad](https://dev.to/gcanti/getting-started-with-fp-ts-monad-6k) instance, so you can `map`...

```ts
import { io } from 'fp-ts/lib/IO'

/** get a random boolean */
const randomBool: IO<boolean> = io.map(random, n => n < 0.5)
```

...or `chain` computations

```ts
/** write to the `console` a random boolean */
const program: IO<void> = io.chain(randomBool, log)

program()
```

Note that **nothing happens** until you call `program()`.

That's because `program` is a **value** which just **represents** an effectful computation, so in order to execute any side effect you must "run the `IO` action".

Since `IO` actions are just values you can use useful abstractions like [Monoid](https://dev.to/gcanti/getting-started-with-fp-ts-monoid-ja0) to handle them...

**Example** (Dungeons and Dragons)

```ts
import { log } from 'fp-ts/lib/Console'
import { getMonoid, IO, io } from 'fp-ts/lib/IO'
import { fold, Monoid, monoidSum } from 'fp-ts/lib/Monoid'
import { randomInt } from 'fp-ts/lib/Random'

type Die = IO<number>

const monoidDie: Monoid<Die> = getMonoid(monoidSum)

/** returns the sum of the roll of the dice */
const roll: (dice: Array<Die>) => IO<number> = fold(monoidDie)

const D4: Die = randomInt(1, 4)
const D10: Die = randomInt(1, 10)
const D20: Die = randomInt(1, 20)

const dice = [D4, D10, D20]

io.chain(roll(dice), result => log(`Result is: ${result}`))()
/*
Result is: 11
*/
```

..or define useful [combinators](https://dev.to/gcanti/functional-design-combinators-14pn)

```ts
/** Log any value to the console for debugging purposes */
const withLogging = <A>(action: IO<A>): IO<A> =>
  io.chain(action, a => io.map(log(`Value is: ${a}`), () => a))

io.chain(roll(dice.map(withLogging)), result => log(`Result is: ${result}`))()
/*
Value is: 4
Value is: 2
Value is: 13
Result is: 19
*/
```

## Error handling

What if we want to represent a synchronous effectful computation that **may fail**?

We need two effects:

| Type constructor | Effect (interpretation)             |
| ---------------- | ----------------------------------- |
| `IO<A>`          | a synchronous effectful computation |
| `Either<E, A>`   | a computation that may fail         |

The solution is to put `Either` inside `IO`, which leads to the `IOEither` type

```ts
interface IOEither<E, A> extends IO<Either<E, A>> {}
```

When we "run" a value of type `IOEither<E, A>`, if we get a `Left` it means that the computation failed with an error of type `E`, otherwise we get a `Right` which means that the computation succeeded with a value of type `A`.

**Example** (read a file)

Since `fs.readFileSync` may throw, I'm going to use the `tryCatch` helper

```ts
tryCatch: <E, A>(f: () => A) => IOEither<E, A>
```

where `f` is a thunk that either throws an error (which is automatically catched by `tryCatch`) or returns a value of type `A`.

```ts
import { toError } from 'fp-ts/lib/Either'
import { IOEither, tryCatch } from 'fp-ts/lib/IOEither'
import * as fs from 'fs'

const readFileSync = (path: string): IOEither<Error, string> =>
  tryCatch(() => fs.readFileSync(path, 'utf8'), toError)

readFileSync('foo')() // => left(Error: ENOENT: no such file or directory, open 'foo')
readFileSync(__filename)() // => right(...)
```

## Lifting

The `fp-ts/lib/IOEither` module provides other helpers which allow to create values of type `IOEither`, they are collectively called **lifting functions**.

Here's a summary

| Start value    | lifting function                                         |
| -------------- | -------------------------------------------------------- |
| `IO<E>`        | `leftIO: <E, A>(ml: IO<E>) => IOEither<E, A>`            |
| `E`            | `left: <E, A>(e: E) => IOEither<E, A>`                   |
| `Either<E, A>` | `fromEither: <E, A>(ma: Either<E, A>) => IOEither<E, A>` |
| `A`            | `right: <E, A>(a: A) => IOEither<E, A>`                  |
| `IO<A>`        | `rightIO: <E, A>(ma: IO<A>) => IOEither<E, A>`           |

**Example** (loading a random file)

Let's say we want to randomly load the content of one of three files (`1.txt`, `2.txt`, `3.txt`).

The `randomInt: (low: number, high: number) => IO<number>` function returns a random integer uniformly distributed in the closed interval `[low, high]`

```ts
import { randomInt } from 'fp-ts/lib/Random'
```

We can chain `randomInt` with the `readFileSync` function defined above

```ts
import { ioEither } from 'fp-ts/lib/IOEither'

const randomFile = ioEither.chain(
  randomInt(1, 3), // static error
  n => readFileSync(`${__dirname}/${n}.txt`)
)
```

This doesn't type check though!

The types don't align: `randomInt` _runs in the `IO` context_ while `readFileSync` _runs in the `IOEither` context_.

However we can lift `randomInt` to the `IOEither` context by using `rightIO` (see the summary above)

```ts
import { ioEither, rightIO } from 'fp-ts/lib/IOEither'

const randomFile = ioEither.chain(rightIO(randomInt(1, 3)), n =>
  readFileSync(`${__dirname}/${n}.txt`)
)
```

