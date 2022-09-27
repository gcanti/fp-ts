---
title: ReaderIO.ts
nav_order: 74
parent: Modules
---

## ReaderIO overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [flatMap](#flatmap)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [asksReaderIO](#asksreaderio)
  - [flap](#flap)
  - [flatMapIOK](#flatmapiok)
  - [flatMapReaderK](#flatmapreaderk)
  - [flatten](#flatten)
  - [fromIOK](#fromiok)
  - [fromReaderK](#fromreaderk)
  - [local](#local)
  - [tap](#tap)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Flattenable](#flattenable)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [ReaderIO (interface)](#readerio-interface)
- [natural transformations](#natural-transformations)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
- [type lambdas](#type-lambdas)
  - [ReaderIOTypeLambda (interface)](#readeriotypelambda-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apT](#apt)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTo](#bindto)
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

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R2, A>(fa: ReaderIO<R2, A>) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v3.0.0

# Monad

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReaderIO<unknown, A>
```

Added in v3.0.0

# combinators

## asksReaderIO

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderIO: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => I.IO<B>) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v3.0.0

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => I.IO<B>
) => (...a: A) => ReaderIO<unknown, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderIO<R, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, _>(f: (a: A) => ReaderIO<R2, _>) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <R, B>(second: ReaderIO<R, B>) => <A>(self: ReaderIO<R, A>) => ReaderIO<R, A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <R, B>(second: ReaderIO<R, B>) => <A>(self: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderIO<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderIO`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderIOTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderIOTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderIOTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<ReaderIOTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderIOTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderIOTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderIOTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderIOTypeLambda>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void>
```

Added in v3.0.0

# model

## ReaderIO (interface)

**Signature**

```ts
export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}
```

Added in v3.0.0

# natural transformations

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: I.IO<A>) => ReaderIO<unknown, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderIO<R, A>
```

Added in v3.0.0

# type lambdas

## ReaderIOTypeLambda (interface)

**Signature**

```ts
export interface ReaderIOTypeLambda extends TypeLambda {
  readonly type: ReaderIO<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderIO<unknown, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReaderIO<unknown, {}>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <R2, B>(
  fb: ReaderIO<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## lift2

Lifts a binary function into `ReaderIO`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>) => ReaderIO<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderIO`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>, fc: ReaderIO<R3, C>) => ReaderIO<R1 & R2 & R3, D>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly ReaderIO<R, A>[]) => ReaderIO<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (as: readonly [A, ...A[]]) => ReaderIO<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly [A, ...A[]]) => ReaderIO<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: ReaderIO<unknown, void>
```

Added in v3.0.0
