---
title: State.ts
nav_order: 99
parent: Modules
---

## State overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [of](#of)
  - [put](#put)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [FromState](#fromstate)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [State (interface)](#state-interface)
- [sequencing](#sequencing)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apS](#aps)
  - [apSecond](#apsecond)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [let](#let)
- [zone of death](#zone-of-death)
  - [~~evalState~~](#evalstate)
  - [~~execState~~](#execstate)
  - [~~state~~](#state)

---

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

## of

**Signature**

```ts
export declare const of: <S, A>(a: A) => State<S, A>
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

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'State'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'State'>
```

Added in v2.10.0

## FromState

**Signature**

```ts
export declare const FromState: FromState2<'State'>
```

Added in v2.11.0

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

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'State'>
```

Added in v2.10.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: State<E, (a: A) => B>) => State<E, B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B>
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

# sequencing

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <S, A, B>(f: (a: A) => State<S, B>) => (ma: State<S, A>) => State<S, A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A>
```

Added in v2.0.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <S, A>(arr: readonly State<S, A>[]) => State<S, readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, S, B>(f: (a: A) => State<S, B>) => (as: readonly A[]) => State<S, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: readonly A[]) => State<S, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: readonly A[]) => State<S, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: ReadonlyNonEmptyArray<A>) => State<S, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

# type lambdas

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

# utils

## ap

**Signature**

```ts
export declare const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(second: State<E, B>) => <A>(first: State<E, A>) => State<E, A>
```

Added in v2.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: State<E, B>
) => (fa: State<E, A>) => State<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(second: State<E, B>) => <A>(first: State<E, A>) => State<E, B>
```

Added in v2.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<E, B>
) => (ma: State<E, A>) => State<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: State<E, A>) => State<E, { readonly [K in N]: A }>
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

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: State<E, A>) => State<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

# zone of death

## ~~evalState~~

Use [`evaluate`](#evaluate) instead

**Signature**

```ts
export declare const evalState: <S, A>(ma: State<S, A>, s: S) => A
```

Added in v2.0.0

## ~~execState~~

Use [`execute`](#execute) instead

**Signature**

```ts
export declare const execState: <S, A>(ma: State<S, A>, s: S) => S
```

Added in v2.0.0

## ~~state~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `S.Functor` instead of `S.state`
(where `S` is from `import S from 'fp-ts/State'`)

**Signature**

```ts
export declare const state: Monad2<'State'>
```

Added in v2.0.0
