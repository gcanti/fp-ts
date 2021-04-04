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

const main: T.Task<{ x: string, y: string }> = pipe(
  readLine,
  T.map(x => ({ x })),
  T.chain(({ x }) => pipe(readLine, T.map(y => ({ x, y })))),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y)),
)
```

Notice how we need a nested `pipe` to allow the combination of `x` and `y` values into a single
object.

Here's how we can write `main` with do notation (we'll call it `mainDo`):
```ts
const mainDo: T.Task<{ x: string, y: string }> = pipe(
  T.Do,
  T.bind('x', () => readLine),
  T.bind('y', () => readLine),
  T.chainFirst(({ x }) => print(x)),
  T.chainFirst(({ y }) => print(y)),
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
