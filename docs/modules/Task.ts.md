---
title: Task.ts
nav_order: 88
parent: Modules
---

# Overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Task (class)](#task-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [never (constant)](#never-constant)
- [task (constant)](#task-constant)
- [taskSeq (constant)](#taskseq-constant)
- [~~delay~~ (function)](#delay-function)
- [delay2v (function)](#delay2v-function)
- [fromIO (function)](#fromio-function)
- [getMonoid (function)](#getmonoid-function)
- [getRaceMonoid (function)](#getracemonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [of (function)](#of-function)
- [tryCatch (function)](#trycatch-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Task (class)

**Signature**

```ts
export class Task<A> {
  constructor(readonly run: Lazy<Promise<A>>) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Task<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Task<(a: A) => B>): Task<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: Task<B>): Task<A> { ... }
```

Added in v1.6.0

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: Task<B>): Task<B> { ... }
```

Added in v1.5.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Task<B>): Task<B> { ... }
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

# never (constant)

**Signature**

```ts
export const never = ...
```

Added in v1.19.0

# task (constant)

**Signature**

```ts
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = ...
```

Added in v1.0.0

# taskSeq (constant)

Like `Task` but `ap` is sequential

**Signature**

```ts
export const taskSeq: typeof task = ...
```

Added in v1.10.0

# ~~delay~~ (function)

Use `delay2v`

**Signature**

```ts
export const delay = <A>(millis: number, a: A): Task<A> => ...
```

Added in v1.7.0

# delay2v (function)

**Signature**

```ts
export function delay2v(millis: number): <A>(ma: Task<A>) => Task<A> { ... }
```

Added in v1.19.0

# fromIO (function)

Lifts an IO action into a Task

**Signature**

```ts
export const fromIO = <A>(io: IO<A>): Task<A> => ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => ...
```

Added in v1.0.0

# getRaceMonoid (function)

**Signature**

```ts
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => ...
```

Added in v1.0.0

# of (function)

**Signature**

```ts
export function of<A>(a: A): Task<A> { ... }
```

Added in v1.19.0

# tryCatch (function)

**Signature**

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => ...
```

Added in v1.0.0
