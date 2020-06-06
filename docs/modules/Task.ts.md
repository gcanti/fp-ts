---
title: Task.ts
nav_order: 87
parent: Modules
---

## Task overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Functor](#functor)
  - [map](#map)
- [Model](#model)
  - [Task (interface)](#task-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [delay](#delay)
  - [fromIO](#fromio)
- [instances](#instances)
  - [getMonoid](#getmonoid)
  - [getRaceMonoid](#getracemonoid)
  - [getSemigroup](#getsemigroup)
  - [task](#task)
  - [taskSeq](#taskseq)
- [utils](#utils)
  - [fromIOK](#fromiok)
  - [never](#never)

---

# Applicative

## of

**Signature**

```ts
export declare function of<A>(a: A): Task<A>
```

Added in v2.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
```

Added in v2.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
```

Added in v2.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

Added in v2.0.0

# Model

## Task (interface)

**Signature**

```ts
export interface Task<A> {
  (): Promise<A>
}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'Task'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

Added in v2.0.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
```

Added in v2.0.0

## chainIOK

**Signature**

```ts
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B>
```

Added in v2.4.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>
```

Added in v2.0.0

# constructors

## delay

**Signature**

```ts
export declare function delay(millis: number): <A>(ma: Task<A>) => Task<A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare function fromIO<A>(ma: IO<A>): Task<A>
```

Added in v2.0.0

# instances

## getMonoid

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>>
```

Added in v2.0.0

## getRaceMonoid

Note: uses `Promise.race` internally

**Signature**

```ts
export declare function getRaceMonoid<A = never>(): Monoid<Task<A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

Added in v2.0.0

## task

**Signature**

```ts
export declare const task: Monad1<'Task'> & MonadTask1<'Task'>
```

Added in v2.0.0

## taskSeq

Like `Task` but `ap` is sequential

**Signature**

```ts
export declare const taskSeq: Monad1<'Task'> & MonadTask1<'Task'>
```

Added in v2.0.0

# utils

## fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B>
```

Added in v2.4.0

## never

**Signature**

```ts
export declare const never: Task<never>
```

Added in v2.0.0
