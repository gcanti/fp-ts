---
title: Task.ts
nav_order: 82
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
- [fromIO (function)](#fromio-function)
- [getMonoid (function)](#getmonoid-function)
- [getRaceMonoid (function)](#getracemonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [never (function)](#never-function)

---

# Task (interface)

**Signature**

```ts
export interface Task<A> {
  (): Promise<A>
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

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
export function delay<A>(millis: number, ma: Task<A>): Task<A> { ... }
```

Added in v2.0.0

# fromIO (function)

**Signature**

```ts
export function fromIO<A>(ma: IO<A>): Task<A> { ... }
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>> { ... }
```

Added in v2.0.0

# getRaceMonoid (function)

**Signature**

```ts
export function getRaceMonoid<A = never>(): Monoid<Task<A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>> { ... }
```

Added in v2.0.0

# never (function)

**Signature**

```ts
export const never: Task<never> = () => new Promise(_ => ...
```

Added in v2.0.0
