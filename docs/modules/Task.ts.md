---
title: Task.ts
nav_order: 81
parent: Modules
---

# Task overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Task (interface)](#task-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [task (constant)](#task-constant)
- [taskSeq (constant)](#taskseq-constant)
- [chainIOK (function)](#chainiok-function)
- [delay (function)](#delay-function)
- [fromIO (function)](#fromio-function)
- [fromIOK (function)](#fromiok-function)
- [getMonoid (function)](#getmonoid-function)
- [getRaceMonoid (function)](#getracemonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [never (function)](#never-function)
- [of (function)](#of-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

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
export const URI: "Task" = ...
```

Added in v2.0.0

# task (constant)

**Signature**

```ts
export const task: Monad1<URI> & MonadTask1<URI> = ...
```

Added in v2.0.0

# taskSeq (constant)

Like `Task` but `ap` is sequential

**Signature**

```ts
export const taskSeq: typeof task = ...
```

Added in v2.0.0

# chainIOK (function)

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B> { ... }
```

Added in v2.4.0

# delay (function)

**Signature**

```ts
export function delay(millis: number): <A>(ma: Task<A>) => Task<A> { ... }
```

Added in v2.0.0

# fromIO (function)

**Signature**

```ts
export function fromIO<A>(ma: IO<A>): Task<A> { ... }
```

Added in v2.0.0

# fromIOK (function)

**Signature**

```ts
export function fromIOK<A extends Array<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B> { ... }
```

Added in v2.4.0

# getMonoid (function)

**Signature**

```ts
export function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>> { ... }
```

Added in v2.0.0

# getRaceMonoid (function)

Note: uses `Promise.race` internally

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

# of (function)

**Signature**

```ts
export function of<A>(a: A): Task<A> { ... }
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<A>(mma: Task<Task<A>>) => Task<A>
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

Added in v2.0.0
