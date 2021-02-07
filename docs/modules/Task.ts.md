---
title: Task.ts
nav_order: 94
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

- [Apply](#apply)
  - [ap](#ap)
- [FromTask](#fromtask)
  - [~~fromTask~~](#fromtask)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [delay](#delay)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromIOK](#fromiok)
- [constructors](#constructors)
  - [fromIO](#fromio)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [FromIO](#fromio)
  - [FromTask](#fromtask-1)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getRaceMonoid](#getracemonoid)
  - [~~getMonoid~~](#getmonoid)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~taskSeq~~](#taskseq)
  - [~~task~~](#task)
- [model](#model)
  - [Task (interface)](#task-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [never](#never)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.0.0

# FromTask

## ~~fromTask~~

**Signature**

```ts
export declare const fromTask: <A>(fa: Task<A>) => Task<A>
```

Added in v2.7.0

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

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Task<A>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Task<B>) => <A>(first: Task<A>) => Task<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Task<B>) => <A>(first: Task<A>) => Task<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (first: Task<A>) => Task<A>
```

Added in v2.0.0

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

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v2.10.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>
```

Added in v2.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => Task<B>
```

Added in v2.4.0

# constructors

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => Task<A>
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

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply1<'Task'>
```

Added in v2.10.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply1<'Task'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'Task'>
```

Added in v2.10.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask1<'Task'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Task'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Task'>
```

Added in v2.10.0

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

## ~~getMonoid~~

Use `Applicative.getApplicativeMonoid` instead.

Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.

**Signature**

```ts
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<Task<A>>
```

Added in v2.0.0

## ~~getSemigroup~~

Use `Apply.getApplySemigroup` instead.

**Signature**

```ts
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Task<A>>
```

Added in v2.0.0

## ~~taskSeq~~

Use small, specific instances instead.

**Signature**

```ts
export declare const taskSeq: Monad1<'Task'> & MonadTask1<'Task'>
```

Added in v2.0.0

## ~~task~~

Use small, specific instances instead.

**Signature**

```ts
export declare const task: Monad1<'Task'> & MonadTask1<'Task'>
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

## Do

**Signature**

```ts
export declare const Do: Task<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (fa: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Task<B>
) => (ma: Task<A>) => Task<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: Task<A>) => Task<{ [K in N]: A }>
```

Added in v2.8.0

## never

A `Task` that never completes.

**Signature**

```ts
export declare const never: Task<never>
```

Added in v2.0.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceArray: <A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

Added in v2.9.0

## sequenceSeqArray

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceSeqArray: <A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => Task<B>) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v2.9.0

## traverseSeqArray

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArray: <A, B>(f: (a: A) => Task<B>) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v2.9.0

## traverseSeqArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v2.9.0
