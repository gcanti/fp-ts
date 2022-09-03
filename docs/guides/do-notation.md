---
title: Do notation
parent: Guides
nav_order: 4
---

# Do Notation

Both [Haskell](https://wiki.haskell.org/Monad#do-notation)
and [PureScript](https://github.com/purescript/documentation/blob/master/language/Syntax.md#do-notation)
languages provide syntactic sugar for working with monads in the form of do notation.

`fp-ts` provides it's own implementation of do notation which can help to simplify effectful
code.

Let's take a look at an example of how do notation can help to simplify our code. Here we have
a bit of code which reads two values from the command line, prints them and stores them
in an object with `x` and `y` properties.

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'

declare const print: (s: string) => T.Task<void>
declare const readLine: T.Task<string>

const main: T.Task<{ x: string; y: string }> = pipe(
  readLine,
  T.map((x) => ({ x })),
  T.chain(({ x }) =>
    pipe(
      readLine,
      T.map((y) => ({ x, y }))
    )
  ),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y))
)
```

Notice how we need a nested `pipe` to allow the combination of `x` and `y` values into a single
object.

Here's how we can write `main` with do notation (we'll call it `mainDo`):

```ts
const mainDo: T.Task<{ x: string; y: string }> = pipe(
  T.Do,
  T.bind('x', () => readLine),
  T.bind('y', () => readLine),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y))
)
```

This will look very familiar to those who have prior experience with Purescript or Haskell
where we could write something like:

```haskell
main :: IO (String, String)
main = do
  x <- readLn
  y <- readLn
  print x
  print y
  return (x, y)
```

Note that due to the lack of type-classes in Typescript, when working with `fp-ts` we need to
import everything from the appropriate module. In the previous example, we use specific `Do`,
`bind`, `map` and `chainFirst` functions imported from the `Task` module as we were working
with the `Task` type.

If we were to write the same code using the `IO` monad, we would need to import everything from the `IO`
module like so:

```ts
import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'

declare const print: (s: string) => IO.IO<void>
declare const readLine: IO.IO<string>

const mainDo: IO.IO<{ x: string; y: string }> = pipe(
  IO.Do,
  IO.bind('x', () => readLine),
  IO.bind('y', () => readLine),
  IO.chainFirst(({ x }) => print(x)),
  IO.chainFirst(({ y }) => print(y))
)
```

## Examples

Using `bindTo`:

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'

declare const print: (s: string) => T.Task<void>
declare const readLine: T.Task<string>

pipe(
  readLine,
  T.bindTo('x'),
  T.bind('y', () => readLine),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y))
)
```

Performing actions in parallel with `apS`:

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'

declare const encryptValue: (val: string) => T.Task<string>

pipe(
  T.Do,
  T.apS('x', encryptValue('hello')),
  T.apS('y', encryptValue('world')),
  T.map(({ x, y }) => {
    /* ... */
  })
)
```

# FAQ

> What does `IO.Do` do exactly?

`IO.Do` is just an alias for `IO.of({})` where `{}` is an empty record.

You build up a record using `bind` which accepts a key and a function that accepts the current state of the record and returns an effect of some value to store under the key.

The record becomes kind of like a scope to put intermediate values in when you are chaining effects.
