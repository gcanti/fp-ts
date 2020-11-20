---
title: State.ts
nav_order: 82
parent: Modules
---

## State overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [state](#state)
- [model](#model)
  - [State (interface)](#state-interface)
- [utils](#utils)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [~~evalState~~](#evalstate)
  - [~~execState~~](#execstate)

---

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <E, A>(a: A) => State<E, A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A>
```

Added in v2.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A>
```

Added in v2.0.0

# constructors

## get

Get the current state

**Signature**

```ts
export declare const get: <S>() => State<S, S>
```

Added in v2.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>
```

Added in v2.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S>(f: (s: S) => S) => State<S, void>
```

Added in v2.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S>(s: S) => State<S, void>
```

Added in v2.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'State'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'State'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'State'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'State'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## state

**Signature**

```ts
export declare const state: Monad2<'State'>
```

Added in v2.0.0

# model

## State (interface)

**Signature**

```ts
export interface State<S, A> {
  (s: S): [A, S]
}
```

Added in v2.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <S, A>(fa: State<S, A>) => State<S, { [K in N]: A }>
```

Added in v2.8.0

## evaluate

Run a computation in the `State` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(s: S) => <A>(ma: State<S, A>) => A
```

Added in v2.8.0

## execute

Run a computation in the `State` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(s: S) => <A>(ma: State<S, A>) => S
```

Added in v2.8.0

## sequenceArray

This function has the same behavior of `A.sequence(S.State)` but it's stack safe and optimized

**Signature**

```ts
export declare const sequenceArray: <S, A>(arr: readonly State<S, A>[]) => State<S, readonly A[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { sequenceArray, State } from 'fp-ts/State'
import { pipe, tuple } from 'fp-ts/function'

const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
const arr = RA.range(0, 100)

assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
```

Added in v2.9.0

## traverseArray

This function has the same behavior of `A.traverse(S.State)` but it's stack safe and optimized

**Signature**

```ts
export declare const traverseArray: <A, S, B>(f: (a: A) => State<S, B>) => (arr: readonly A[]) => State<S, readonly B[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { traverseArray, State } from 'fp-ts/State'
import { pipe, tuple } from 'fp-ts/function'

const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
const arr = RA.range(0, 100)

assert.deepStrictEqual(pipe(arr, traverseArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (arr: readonly A[]) => State<S, readonly B[]>
```

Added in v2.9.0

## ~~evalState~~

Use `evaluate` instead

**Signature**

```ts
export declare const evalState: <S, A>(ma: State<S, A>, s: S) => A
```

Added in v2.0.0

## ~~execState~~

Use `execute` instead

**Signature**

```ts
export declare const execState: <S, A>(ma: State<S, A>, s: S) => S
```

Added in v2.0.0
