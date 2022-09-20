---
title: Task.ts
nav_order: 99
parent: Modules
---

## Task overview

`Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.

```ts
interface Task<A> {
  (): Promise<A>
}
```

If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [TaskF (interface)](#taskf-interface)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [delay](#delay)
  - [flap](#flap)
  - [fromIOK](#fromiok)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain-1)
  - [FromIO](#fromio)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [getRaceMonoid](#getracemonoid)
- [model](#model)
  - [Task (interface)](#task-interface)
- [natural transformations](#natural-transformations)
  - [fromIO](#fromio)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
  - [never](#never)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArraySeq](#traversereadonlynonemptyarrayseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
```

Added in v3.0.0

# HKT

## TaskF (interface)

**Signature**

```ts
export interface TaskF extends HKT {
  readonly type: Task<this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Task<A>
```

Added in v3.0.0

# combinators

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (first: Task<A>) => Task<A>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => (first: Task<A>) => Task<B>
```

Added in v3.0.0

## delay

Creates a task that will complete after a time delay

**Signature**

```ts
export declare const delay: (millis: number) => <A>(ma: Task<A>) => Task<A>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import { takeRight } from 'fp-ts/ReadonlyArray'

async function test() {
  const log: Array<string> = []
  const append = (message: string): T.Task<void> =>
    T.fromIO(() => {
      log.push(message)
    })
  const fa = append('a')
  const fb = T.delay(20)(append('b'))
  const fc = T.delay(10)(append('c'))
  const fd = append('d')
  await pipe(T.ApT, T.apT(fa), T.apT(fb), T.apT(fc), T.apT(fd))()
  assert.deepStrictEqual(takeRight(2)(log), ['c', 'b'])
}

test()
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Task<(a: A) => B>) => Task<B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => (...a: A) => Task<B>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Task<B>) => <A>(first: Task<A>) => Task<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Task<B>) => <A>(first: Task<A>) => Task<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Task<B>) => (first: Task<A>) => Task<A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: Task<Task<A>>) => Task<A>
```

Added in v3.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<TaskF>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: applicative.Applicative<TaskF>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply<TaskF>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply<TaskF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: chain_.Chain<TaskF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<TaskF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<TaskF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TaskF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<TaskF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TaskF>
```

Added in v3.0.0

## getRaceMonoid

Monoid returning the first completed task.

Note: uses `Promise.race` internally.

**Signature**

```ts
export declare const getRaceMonoid: <A = never>() => Monoid<Task<A>>
```

**Example**

```ts
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'

async function test() {
  const S = T.getRaceMonoid<string>()
  const fa = T.delay(20)(T.of('a'))
  const fb = T.delay(10)(T.of('b'))
  assert.deepStrictEqual(await pipe(fa, S.concat(fb))(), 'b')
}

test()
```

Added in v3.0.0

# model

## Task (interface)

**Signature**

```ts
export interface Task<A> {
  (): Promise<A>
}
```

Added in v3.0.0

# natural transformations

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => Task<A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Task<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Task<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (fa: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: Task<B>) => <A extends readonly unknown[]>(fas: Task<A>) => Task<readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Task<B>
) => (ma: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: Task<A>) => Task<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## never

A `Task` that never completes.

**Signature**

```ts
export declare const never: Task<never>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <A>(arr: readonly Task<A>[]) => Task<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => Task<B>) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <A, B>(f: (a: A) => Task<B>) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: readonly A[]) => Task<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => Task<B>
) => (as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArraySeq

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArraySeq: <A, B>(
  f: (a: A) => Task<B>
) => (as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: Task<A>) => Task<readonly [A]>
```

Added in v3.0.0
