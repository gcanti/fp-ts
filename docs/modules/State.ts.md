---
title: State.ts
nav_order: 90
parent: Modules
---

## State overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [StateF (interface)](#statef-interface)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [flap](#flap)
  - [flatten](#flatten)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Flattenable](#flattenable-1)
  - [FromState](#fromstate)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
- [model](#model)
  - [State (interface)](#state-interface)
- [utils](#utils)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <S, A>(fa: State<S, A>) => <B>(self: State<S, (a: A) => B>) => State<S, B>
```

Added in v3.0.0

# Flattenable

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, S, B>(f: (a: A) => State<S, B>) => (self: State<S, A>) => State<S, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <S>(self: State<S, A>) => State<S, B>
```

Added in v3.0.0

# HKT

## StateF (interface)

**Signature**

```ts
export interface StateF extends HKT {
  readonly type: State<this['Invariant1'], this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, S>(a: A) => State<S, A>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <S, B>(fab: State<S, (a: A) => B>) => State<S, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <S, A>(mma: State<S, State<S, A>>) => State<S, A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <S, B>(second: State<S, B>) => <A>(self: State<S, A>) => State<S, A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <S, B>(second: State<S, B>) => <A>(self: State<S, A>) => State<S, B>
```

Added in v3.0.0

# constructors

## get

Get the current state

**Signature**

```ts
export declare const get: <S>() => State<S, S>
```

Added in v3.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>
```

Added in v3.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S>(f: Endomorphism<S>) => State<S, void>
```

Added in v3.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S>(s: S) => State<S, void>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<StateF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<StateF>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<StateF>
```

Added in v3.0.0

## FromState

**Signature**

```ts
export declare const FromState: FromState_<StateF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<StateF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<StateF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<StateF>
```

Added in v3.0.0

# model

## State (interface)

**Signature**

```ts
export interface State<S, A> {
  (s: S): readonly [S, A]
}
```

Added in v3.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (fa: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <S, B>(
  fb: State<S, B>
) => <A extends readonly unknown[]>(fas: State<S, A>) => State<S, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (ma: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, A>(fa: State<S, A>) => State<S, { readonly [K in N]: A }>
```

Added in v3.0.0

## evaluate

Run a computation in the `State` monad, discarding the final state.

**Signature**

```ts
export declare const evaluate: <S>(s: S) => <A>(ma: State<S, A>) => A
```

Added in v3.0.0

## execute

Run a computation in the `State` monad discarding the result.

**Signature**

```ts
export declare const execute: <S>(s: S) => <A>(ma: State<S, A>) => S
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S>(fa: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <S, A>(arr: readonly State<S, A>[]) => State<S, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, S, B>(
  f: (a: A) => State<S, B>
) => (as: readonly A[]) => State<S, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: readonly A[]) => State<S, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, S, B>(
  f: (a: A) => State<S, B>
) => (as: ReadonlyNonEmptyArray<A>) => State<S, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: ReadonlyNonEmptyArray<A>) => State<S, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <S, A>(fa: State<S, A>) => State<S, readonly [A]>
```

Added in v3.0.0
