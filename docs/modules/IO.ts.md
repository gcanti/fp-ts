---
title: IO.ts
nav_order: 45
parent: Modules
---

# Overview

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

IO actions are terminated by calling their `run()` method that executes the computation and returns the result.
Ideally each application should call `run()` only once for a root value of type `Task` or `IO` that represents the entire
application. However, this might vary a bit depending on how you construct your application. An application
framework with fp-ts types might take care of calling `run()` for you, while another application framework without
fp-ts typing might force you to call `run()` at multiple locations whenever the framework demands less strictly typed
values as inputs for its method calls.

Below are some basic examples of how you can wrap values and function calls with `IO`.

```ts
import { IO, io } from 'fp-ts/lib/IO'

const constant: IO<number> = io.of(123)
constant.run() // returns 123

const random: IO<number> = new IO(() => Math.random())
random.run() // returns a random number
random.run() // returns another random number

const log = (...args): IO<void> => new IO(() => console.log(...args))
log('hello world').run() // returns undefined and outputs "hello world" to console
```

In the example above we implemented type safe alternatives for `Math.random()` and `console.log()`. The main
motivation was to explain how you can wrap values. However, fp-ts provides type safe alternatives for such basic
tools through `Console` and `Random` modules. So you don't need to constantly redefine them.

The next code snippet below is an example of a case where type safety affects the end result. Using `console.log()`
directly would break the code, resulting in both logging actions being executed when the value is not `null`. You
can confirm this by removing `.run()` from the end of the example code and replacing calls to `log()` with
standard`console.log()`.

```ts
import { IO } from 'fp-ts/lib/IO'
import { fromNullable } from 'fp-ts/lib/Option'
import { log } from 'fp-ts/lib/Console'

const logger = (input: number | null) =>
  fromNullable(input).fold(log('Received null'), value => log(`Received ${value}`))

logger(123).run() // returns undefined and outputs "Received 123" to console
```

In addition to creating IO actions we need a way to combine them to build the application. For example we might have
several `IO<void>` actions that only cause side effects without returning a result. We can combine several `IO<void>`
actions into one for sequential execution with `sequence_(io, array)` as follows. This is useful when you care about
the execution order but do not care about the results.

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { array } from 'fp-ts/lib/Array'
import { sequence_ } from 'fp-ts/lib/Foldable2v'
import { log } from 'fp-ts/lib/Console'

const logGiraffe: IO<void> = log('giraffe')
const logZebra: IO<void> = log('zebra')

const logGiraffeThenZebra: IO<void> = sequence_(io, array)([logGiraffe, logZebra])

logGiraffeThenZebra.run() // returns undefined and outputs words "giraffe" and "zebra" to console
```

We might also have several IO actions that yield some values that we want to capture. We can combine them by
using `sequenceS(io)` over an object matching the structure of the expected result. This is useful when you care
about the results but do not care about the execution order.

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { sequenceS } from 'fp-ts/lib/Apply'

interface Result {
  name: string
  age: number
}

const computations: { [K in keyof Result]: IO<Result[K]> } = {
  name: io.of('Aristotle'),
  age: io.of(60)
}

const computation: IO<Result> = sequenceS(io)(computations)

computation.run() // returns { name: 'Aristotle', age: 60 }
```

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [IO (class)](#io-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [io (constant)](#io-constant)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# IO (class)

**Signature**

```ts
export class IO<A> {
  constructor(readonly run: Lazy<A>) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): IO<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: IO<(a: A) => B>): IO<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: IO<B>): IO<A> { ... }
```

Added in v1.6.0

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: IO<B>): IO<B> { ... }
```

Added in v1.5.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => IO<B>): IO<B> { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# io (constant)

**Signature**

```ts
export const io: Monad1<URI> & MonadIO1<URI> = ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ...
```

Added in v1.0.0
