---
id: Task
title: Task
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)

# Task

**Signature** (data type)

```ts
export class Task<A> {
  constructor(readonly run: Lazy<Promise<A>>) {}
  ...
}
```

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see [TaskEither](./TaskEither.md).

## ap

**Signature** (method)

```ts
ap<B>(fab: Task<(a: A) => B>): Task<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: Task<B>): Task<A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: Task<B>): Task<B>  { ... }
```

Added in v1.5.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Task<B>): Task<B>  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Task<B>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## task

**Signature** (constant)

```ts
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = ...
```

Added in v1.0.0

## taskSeq

Like [task](#task) but `ap` is sequential

**Signature** (constant)

```ts
export const taskSeq: typeof task = ...
```

Added in v1.10.0

## delay

**Signature** (function)

```ts
export const delay = <A>(millis: number, a: A): Task<A> => { ... }
```

Added in v1.7.0

## fromIO

Lifts an IO action into a Task

**Signature** (function)

```ts
export const fromIO = <A>(io: IO<A>): Task<A> => { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => { ... }
```

Added in v1.0.0

## getRaceMonoid

**Signature** (function)

```ts
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => { ... }
```

Added in v1.0.0

## tryCatch

**Signature** (function)

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => { ... }
```

Added in v1.0.0
