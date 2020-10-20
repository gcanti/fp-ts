---
title: Task.ts
nav_order: 87
parent: Modules
---

## Task overview

```ts
interface Task<A> {
  (): Promise<A>
}
```

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
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [MonadTask](#monadtask)
  - [fromTask](#fromtask)
- [combinators](#combinators)
  - [chainIOK](#chainiok)
  - [delay](#delay)
  - [fromIOK](#fromiok)
- [constructors](#constructors)
  - [fromIO](#fromio)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getRaceMonoid](#getracemonoid)
  - [getSemigroup](#getsemigroup)
  - [task](#task)
  - [taskSeq](#taskseq)
- [model](#model)
  - [Task (interface)](#task-interface)
- [utils](#utils)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [never](#never)

---

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <A>(a: A) => Task<A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>
```

Added in v2.0.0

# MonadTask

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: Task<A>) => Task<A>
```

Added in v2.7.0

# combinators

## chainIOK

**Signature**

```ts
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B>
```

Added in v2.4.0

## delay

Creates a task that will complete after a time delay

**Signature**

```ts
export declare function delay(millis: number): <A>(ma: Task<A>) => Task<A>
```

**Example**

```ts
import { sequenceT } from 'fp-ts/Apply'
import * as T from 'fp-ts/Task'

async function test() {
  const log: Array<string> = []
  const append = (message: string): T.Task<void> =>
    T.fromIO(() => {
      log.push(message)
    })
  const fa = append('a')
  const fb = append('b')
  const fc = T.delay(10)(append('c'))
  const fd = append('d')
  await sequenceT(T.task)(fa, fb, fc, fd)()
  assert.deepStrictEqual(log, ['a', 'b', 'd', 'c'])
}

test()
```

Added in v2.0.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B>
```

Added in v2.4.0

# constructors

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(ma: IO<A>) => Task<A>
```

Added in v2.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative1<'Task'>
```

Added in v2.7.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative1<'Task'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Task'>
```

Added in v2.7.0

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

## getMonoid

Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>>
```

Added in v2.0.0

## getRaceMonoid

Monoid returning the first completed task.

Note: uses `Promise.race` internally.

**Signature**

```ts
export declare function getRaceMonoid<A = never>(): Monoid<Task<A>>
```

**Example**

```ts
import * as T from 'fp-ts/Task'

async function test() {
  const S = T.getRaceMonoid<string>()
  const fa = T.delay(20)(T.of('a'))
  const fb = T.delay(10)(T.of('b'))
  assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
}

test()
```

Added in v2.0.0

## getSemigroup

Lift a semigroup into 'Task', the inner values are concatenated using the provided `Semigroup`.

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

**Example**

```ts
import * as T from 'fp-ts/Task'
import { semigroupString } from 'fp-ts/Semigroup'

async function test() {
  const S = T.getSemigroup(semigroupString)
  const fa = T.of('a')
  const fb = T.of('b')
  assert.deepStrictEqual(await S.concat(fa, fb)(), 'ab')
}

test()
```

Added in v2.0.0

## task

**Signature**

```ts
export declare const task: Monad1<'Task'> & MonadTask1<'Task'>
```

Added in v2.0.0

## taskSeq

Like `task` but `ap` is sequential

**Signature**

```ts
export declare const taskSeq: Monad1<'Task'> & MonadTask1<'Task'>
```

Added in v2.0.0

# model

## Task (interface)

**Signature**

```ts
export interface Task<A> {
  (): Promise<A>
}
```

Added in v2.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Task<B>
) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: Task<A>) => Task<{ [K in N]: A }>
```

Added in v2.8.0

## never

A `Task` that never completes.

**Signature**

```ts
export declare const never: Task<never>
```

Added in v2.0.0
