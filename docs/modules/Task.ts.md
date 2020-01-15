---
title: Task.ts
nav_order: 87
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
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainIOK](#chainiok)
- [delay](#delay)
- [flatten](#flatten)
- [fromIO](#fromio)
- [fromIOK](#fromiok)
- [getMonoid](#getmonoid)
- [getRaceMonoid](#getracemonoid)
- [getSemigroup](#getsemigroup)
- [map](#map)
- [never](#never)
- [of](#of)
- [task](#task)
- [taskSeq](#taskseq)

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

# URI

**Signature**

```ts
export const URI: "Task" = ...
```

Added in v2.0.0

# ap

**Signature**

```ts
<A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
```

Added in v2.0.0

# chainIOK

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B> { ... }
```

Added in v2.4.0

# delay

**Signature**

```ts
export function delay(millis: number): <A>(ma: Task<A>) => Task<A> { ... }
```

Added in v2.0.0

# flatten

**Signature**

```ts
<A>(mma: Task<Task<A>>) => Task<A>
```

Added in v2.0.0

# fromIO

**Signature**

```ts
export function fromIO<A>(ma: IO<A>): Task<A> { ... }
```

Added in v2.0.0

# fromIOK

**Signature**

```ts
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B> { ... }
```

Added in v2.4.0

# getMonoid

**Signature**

```ts
export function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>> { ... }
```

Added in v2.0.0

# getRaceMonoid

Note: uses `Promise.race` internally

**Signature**

```ts
export function getRaceMonoid<A = never>(): Monoid<Task<A>> { ... }
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

Added in v2.0.0

# never

**Signature**

```ts
export const never: Task<never> = () => new Promise(_ => ...
```

Added in v2.0.0

# of

**Signature**

```ts
export function of<A>(a: A): Task<A> { ... }
```

Added in v2.0.0

# task

**Signature**

```ts
export const task: Monad1<URI> & MonadTask1<URI> = ...
```

Added in v2.0.0

# taskSeq

Like `Task` but `ap` is sequential

**Signature**

```ts
export const taskSeq: typeof task = ...
```

Added in v2.0.0
