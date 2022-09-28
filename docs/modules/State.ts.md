---
title: State.ts
nav_order: 90
parent: Modules
---

## State overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [ap](#ap)
  - [flap](#flap)
  - [flatten](#flatten)
  - [zipLeft](#zipleft)
  - [zipLeftPar](#zipleftpar)
  - [zipRight](#zipright)
  - [zipRightPar](#ziprightpar)
- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [do notation](#do-notation)
  - [bindT](#bindt)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Flattenable](#flattenable)
  - [FromState](#fromstate)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
- [model](#model)
  - [State (interface)](#state-interface)
- [type lambdas](#type-lambdas)
  - [StateTypeLambda (interface)](#statetypelambda-interface)
- [utils](#utils)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTPar](#bindtpar)
  - [bindTo](#bindto)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [flatMap](#flatmap)
  - [let](#let)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)
  - [unit](#unit)

---

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <S>(self: State<S, A>) => State<S, B>
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

## ap

**Signature**

```ts
export declare const ap: <S, A>(fa: State<S, A>) => <B>(self: State<S, (a: A) => B>) => State<S, B>
```

Added in v3.0.0

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

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <S, _>(that: State<S, _>) => <A>(self: State<S, A>) => State<S, A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <S, B>(second: State<S, B>) => <A>(self: State<S, A>) => State<S, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <S, A>(that: State<S, A>) => <_>(self: State<S, _>) => State<S, A>
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

# do notation

## bindT

**Signature**

```ts
export declare const bindT: <A extends readonly unknown[], S, B>(
  f: (a: A) => State<S, B>
) => (self: State<S, A>) => State<S, readonly [...A, B]>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<StateTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<StateTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<StateTypeLambda>
```

Added in v3.0.0

## FromState

**Signature**

```ts
export declare const FromState: FromState_<StateTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<StateTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<StateTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<StateTypeLambda>
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

# type lambdas

## StateTypeLambda (interface)

**Signature**

```ts
export interface StateTypeLambda extends TypeLambda {
  readonly type: State<this['InOut1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTPar

**Signature**

```ts
export declare const bindTPar: <S, B>(
  fb: State<S, B>
) => <A extends readonly unknown[]>(self: State<S, A>) => State<S, readonly [...A, B]>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, A>(self: State<S, A>) => State<S, { readonly [K in N]: A }>
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
export declare const execute: <S>(s: S) => <A>(self: State<S, A>) => S
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, S, B>(f: (a: A) => State<S, B>) => (self: State<S, A>) => State<S, B>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S>(self: State<S, A>) => State<S, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## lift2

Lifts a binary function into `State`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => <S>(fa: State<S, A>, fb: State<S, B>) => State<S, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `State`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S>(fa: State<S, A>, fb: State<S, B>, fc: State<S, C>) => State<S, D>
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
) => (as: readonly [A, ...A[]]) => State<S, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (as: readonly [A, ...A[]]) => State<S, readonly [B, ...B[]]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <S, A>(self: State<S, A>) => State<S, readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: <S>() => State<S, void>
```

Added in v3.0.0
