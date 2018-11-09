---
id: Task
title: Module Task
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)

## task

```ts
Monad1<URI> & MonadIO1<URI> & MonadTask1<URI>
```

Added in v1.0.0 (instance)

## taskSeq

```ts
typeof task
```

Added in v1.10.0 (instance)

Like [task](#task) but `ap` is sequential

# Task

```ts
constructor(readonly run: Lazy<Promise<A>>) {}
```

Added in v1.0.0 (data)

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see [TaskEither](./TaskEither.md).

## ap

```ts
<B>(fab: Task<(a: A) => B>): Task<B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## applyFirst

```ts
<B>(fb: Task<B>): Task<A>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: Task<B>): Task<B>
```

Added in v1.5.0 (method)

Combine two effectful actions, keeping only the result of the second

## chain

```ts
<B>(f: (a: A) => Task<B>): Task<B>
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Task<B>
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## delay

```ts
<A>(millis: number, a: A): Task<A>
```

Added in v1.7.0 (function)

## fromIO

```ts
<A>(io: IO<A>): Task<A>
```

Added in v1.0.0 (function)

Lifts an IO action into a Task

## getMonoid

```ts
<A>(M: Monoid<A>): Monoid<Task<A>>
```

Added in v1.0.0 (function)

## getRaceMonoid

```ts
<A = never>(): Monoid<Task<A>>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

Added in v1.0.0 (function)

## tryCatch

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): Task<Either<L, A>>
```

Added in v1.0.0 (function)
