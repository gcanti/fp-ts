---
title: Tagless final
parent: Functional design
nav_order: 3
---

# Functional design: tagless final

In the [last article](./combinators-part-II.md) I wrote a `time` combinator which mimics the analogous Unix command: given an action `IO<A>`, we can derive an action `IO<[A, number]>` that returns the elapsed time along with the computed value

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { now } from 'fp-ts/lib/Date'

export function time<A>(ma: IO<A>): IO<[A, number]> {
  return io.chain(now, start => io.chain(ma, a => io.map(now, end => [a, end - start])))
}
```

There's still a problem though: `time` works with `IO` only.

What if we want a `time` combinator for `Task`? Or `TaskEither`? Or even `ReaderTaskEither`?

## A small rewrite

Let's just rename `io` to a generic `M` (like **M** onad)

```ts
import { IO, io as M } from 'fp-ts/lib/IO'
import { now } from 'fp-ts/lib/Date'

export function time<A>(ma: IO<A>): IO<[A, number]> {
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}
```

The value `io`, exported by the `fp-ts/lib/IO` module, contains the `Monad` instance of `IO`.

In `fp-ts` type-classes are encoded as `interfaces`s and instances are encoded as static dictionaries containing the operations defined by the type-class.

So in the case of a `Monad` instance, we expect the following operations: `map`, `of`, `ap` and `chain`.

```ts
// fp-ts/lib/IO.ts

export const io = {
  map: ...,
  of: ...,
  ap: ...,
  chain: ...
}
```

Let's try to write a `time` combinator for `Task` using the same style

## Lifting

In order to make the type-checker happy we must **lift** the `now` action, which has type `IO<number>`, to the `Task` monad.

Fortunately `fp-ts` provides a built-in `fromIO` function for that. `fromIO` transforms a `IO<A>` into a `Task<A>`, for all `A`.

```ts
import { Task, task as M, fromIO } from 'fp-ts/lib/Task'
import * as D from 'fp-ts/lib/Date'

export function time<A>(ma: Task<A>): Task<[A, number]> {
  const now = fromIO(D.now)
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}
```

That would work, but there's so much duplication.

If we ignore for a minute the first line of the body, the code is exactly the same as before, isn't it?

```ts
export function time<A>(ma: IO<A>): IO<[A, number]> {
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}

export function time<A>(ma: Task<A>): Task<[A, number]> {
  return M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}
```

That's the beauty of the monadic interface, we can handle synchronous and asynchronous computations with pretty much the same code.

## Tagless final

So the idea is that the `time` combinator could support any monad `M` which is able to lift `now`.

Or, more generally, any monad `M` which is able to lift an action `IO<A>` to an action `M<A>`, for all `A`.

Let's encode such a capability into a type-class (i.e. an `interface` in TypeScript) named `MonadIO`

```ts
import { IO } from 'fp-ts/lib/IO'
import { Monad1 } from 'fp-ts/lib/Monad'
import { Kind, URIS } from 'fp-ts/lib/HKT'

export interface MonadIO<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}
```

The type `Kind<M, A>` is how `fp-ts` encodes a generic type constructor `M<A>` of kind `* -> *` (TypeScript doesn't support Higher Kinded Types natively).

Let's rewrite the `time` combinator against the `MonadIO` interface (this style of programming is called "tagless final" or "MTL style"), passed in as an additional first parameter

```ts
export function time<M extends URIS>(
  M: MonadIO<M>
): <A>(ma: Kind<M, A>) => Kind<M, [A, number]> {
  const now = M.fromIO(D.now) // lifting
  return ma => M.chain(now, start => M.chain(ma, a => M.map(now, end => [a, end - start])))
}
```

That's great, from now on we can use `time` with any monad which admits an instance of `MonadIO`!

## Writing a `MonadIO` instance

In order to write a `MonadIO` instance for `IO` we must augment its `Monad` instance with the `fromIO` operation, which is just the `identity` function

```ts
import { URI, io } from 'fp-ts/lib/IO'
import { identity } from 'fp-ts/lib/function'

export const monadIOIO: MonadIO<URI> = {
  ...io,
  fromIO: identity
}
```

Let's write a `MonadIO` instance for `Task`

```ts
import { URI, task, fromIO } from 'fp-ts/lib/Task'

const monadIOTask: MonadIO<URI> = {
  ...task,
  fromIO: fromIO
}
```

Now we can get a specialized version of `time` for a concrete type constructor by passing the corresponding `MonadIO` instance

```ts
// timeIO: <A>(ma: IO<A>) => IO<[A, number]>
const timeIO = time(monadIOIO)

// timeTask: <A>(ma: Task<A>) => Task<[A, number]>
const timeTask = time(monadIOTask)
```

This approach has great benefits: when writing a function based on tagless final, the target monad of the function can be changed in the future, by the user.
