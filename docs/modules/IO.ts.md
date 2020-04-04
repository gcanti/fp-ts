---
title: IO.ts
nav_order: 43
parent: Modules
---

# IO overview

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

`IO` actions are _thunks_ so they are terminated by calling their `()` function application that executes the
computation and returns the result. Ideally each application should call `()` only once for a root value of type
`Task` or `IO` that represents the entire application. However, this might vary a bit depending on how you construct
your application. An application framework with `fp-ts` types might take care of calling `()` for you, while another
application framework without `fp-ts` typing might force you to call `()` at multiple locations whenever the
framework demands less strictly typed values as inputs for its method calls.

Below are some basic examples of how you can wrap values and function calls with `IO`.

```ts
import { IO, io } from 'fp-ts/lib/IO'

const constant: IO<number> = io.of(123)
constant() // returns 123

const random: IO<number> = () => Math.random()
random() // returns a random number
random() // returns another random number

const log = (...args): IO<void> => () => console.log(...args)
log('hello world')() // returns undefined and outputs "hello world" to console
```

In the example above we implemented type safe alternatives for `Math.random()` and `console.log()`. The main
motivation was to explain how you can wrap values. However, `fp-ts` provides type safe alternatives for such basic
tools through `Console` and `Random` modules. So you don't need to constantly redefine them.

The next code snippet below is an example of a case where type safety affects the end result. Using `console.log()`
directly would break the code, resulting in both logging actions being executed when the value is not `null`. You
can confirm this by removing `()` from the end of the example code and replacing calls to `log()` with standard
`console.log()`.

```ts
import { fromNullable, fold } from 'fp-ts/lib/Option'
import { log } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'

const logger = (input: number | null) =>
  pipe(
    fromNullable(input),
    fold(log('Received null'), (value) => log(`Received ${value}`))
  )

logger(123)() // returns undefined and outputs "Received 123" to console
```

In addition to creating `IO` actions we need a way to combine them to build the application. For
example, we might want to combine several `IO<void>` actions into one `IO<void[]>` action for
sequential execution. This can be done with `array.sequence(io)` as follows.

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { array } from 'fp-ts/lib/Array'
import { log } from 'fp-ts/lib/Console'

const logGiraffe: IO<void> = log('giraffe')
const logZebra: IO<void> = log('zebra')

const logGiraffeThenZebra: IO<void[]> = array.sequence(io)([logGiraffe, logZebra])

logGiraffeThenZebra() // returns undefined and outputs words "giraffe" and "zebra" to console
```

We might also have several `IO` actions that yield some values that we want to capture. We can combine them by using
`sequenceS(io)` over an object matching the structure of the expected result. This is useful when you care about the
results but do not care about the execution order.

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { sequenceS } from 'fp-ts/lib/Apply'

interface Result {
  name: string
  age: number
}

const computations: { [K in keyof Result]: IO<Result[K]> } = {
  name: io.of('Aristotle'),
  age: io.of(60),
}

const computation: IO<Result> = sequenceS(io)(computations)

computation() // returns { name: 'Aristotle', age: 60 }
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [IO (interface)](#io-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [flatten](#flatten)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)
- [io](#io)
- [map](#map)
- [of](#of)

---

# IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export declare const URI: 'IO'
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

Added in v2.0.0

# chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# getMonoid

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v2.0.0

# io

**Signature**

```ts
export declare const io: Monad1<'IO'> & MonadIO1<'IO'> & ChainRec1<'IO'>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v2.0.0

# of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0
