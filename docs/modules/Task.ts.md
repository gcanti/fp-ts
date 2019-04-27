---
title: Task.ts
nav_order: 81
parent: Modules
---

# Overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

---

<h2 class="text-delta">Table of contents</h2>

- [Task (interface)](#task-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [task (constant)](#task-constant)
- [taskSeq (constant)](#taskseq-constant)
- [delay (function)](#delay-function)
- [getMonoid (function)](#getmonoid-function)
- [getRaceMonoid (function)](#getracemonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [tryCatch (function)](#trycatch-function)

---

# Task (interface)

**Signature**

```ts
export interface Task<A> {
  (): Promise<A>
}
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# task (constant)

**Signature**

```ts
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = ...
```

Added in v2.0.0

# taskSeq (constant)

Like `Task` but `ap` is sequential

**Signature**

```ts
export const taskSeq: typeof task = ...
```

Added in v2.0.0

# delay (function)

**Signature**

```ts
export const delay = <A>(millis: number, a: A): Task<A> => ...
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Task<A>> => ...
```

Added in v2.0.0

# getRaceMonoid (function)

**Signature**

```ts
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => ...
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Task<A>> => ...
```

Added in v2.0.0

# tryCatch (function)

**Signature**

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): Task<Either<L, A>> => ...
```

Added in v2.0.0
