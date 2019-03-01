---
title: Task.ts
nav_order: 83
---

# Overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [Task](#task)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [applyFirst](#applyfirst)
  - [applySecond](#applysecond)
  - [chain](#chain)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [task](#task)
- [taskSeq](#taskseq)
- [delay](#delay)
- [fromIO](#fromio)
- [getMonoid](#getmonoid)
- [getRaceMonoid](#getracemonoid)
- [getSemigroup](#getsemigroup)
- [tryCatch](#trycatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Task

**Signature** (class)

```ts
export class Task<A> {
  constructor(readonly run: Lazy<Promise<A>>) { ... }
  ...
}
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Task<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Task<(a: A) => B>): Task<B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> { ... }
```

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: Task<B>): Task<A> { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: Task<B>): Task<B> { ... }
```

Added in v1.5.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Task<B>): Task<B> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# task

**Signature** (constant)

```ts
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = ...
```

Added in v1.0.0

# taskSeq

Like `Task` but `ap` is sequential

**Signature** (constant)

```ts
export const taskSeq: typeof task = ...
```

Added in v1.10.0

# delay

**Signature** (function)

```ts
export const delay = <A>(millis: number, a: A): Task<A> => ...
```

Added in v1.7.0

# fromIO

Lifts an IO action into a Task

**Signature** (function)

```ts
export const fromIO = <A>(io: IO<A>): Task<A> => ...
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => ...
```

Added in v1.0.0

# getRaceMonoid

**Signature** (function)

```ts
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => ...
```

Added in v1.0.0

# tryCatch

**Signature** (function)

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => ...
```

Added in v1.0.0
