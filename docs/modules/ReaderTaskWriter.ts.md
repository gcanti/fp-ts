---
title: ReaderTaskWriter.ts
nav_order: 78
parent: Modules
---

## ReaderTaskWriter overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [asksReaderTaskWriter](#asksreadertaskwriter)
  - [tell](#tell)
- [conversions](#conversions)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromReaderTask](#fromreadertask)
  - [fromReaderWriter](#fromreaderwriter)
  - [fromTask](#fromtask)
  - [fromTaskWriter](#fromtaskwriter)
  - [fromWriter](#fromwriter)
- [do notation](#do-notation)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [mapError](#maperror)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [FromWriter](#fromwriter)
  - [Functor](#functor)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getFlattenable](#getflattenable)
  - [getFromIO](#getfromio)
  - [getFromIdentity](#getfromidentity)
  - [getFromReader](#getfromreader)
  - [getFromTask](#getfromtask)
  - [getMonad](#getmonad)
- [lifting](#lifting)
  - [liftReaderWriter](#liftreaderwriter)
  - [liftTaskWriter](#lifttaskwriter)
  - [liftWriter](#liftwriter)
- [mapping](#mapping)
  - [flap](#flap)
  - [mapBoth](#mapboth)
- [model](#model)
  - [ReaderTaskWriter (interface)](#readertaskwriter-interface)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [tupled](#tupled)
- [type lambdas](#type-lambdas)
  - [ReaderTaskWriterFFix (interface)](#readertaskwriterffix-interface)
  - [ReaderTaskWriterTypeLambda (interface)](#readertaskwritertypelambda-interface)
- [utils](#utils)
  - [censor](#censor)
  - [fst](#fst)
  - [listen](#listen)
  - [listens](#listens)
  - [local](#local)
  - [map](#map)
  - [pass](#pass)
  - [snd](#snd)
  - [swap](#swap)

---

# constructors

## asksReaderTaskWriter

**Signature**

```ts
export declare const asksReaderTaskWriter: <R1, R2, W, A>(
  f: (r1: R1) => ReaderTaskWriter<R2, W, A>
) => ReaderTaskWriter<R1 & R2, W, A>
```

Added in v3.0.0

## tell

Appends a value to the accumulator

**Signature**

```ts
export declare const tell: <W, R>(w: W) => ReaderTaskWriter<R, W, void>
```

Added in v3.0.0

# conversions

## fromIO

**Signature**

```ts
export declare const fromIO: <W>(w: W) => <A>(fa: Sync<A>) => ReaderTaskWriter<unknown, W, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <W>(w: W) => <R, A>(fa: Reader<R, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromReaderTask

**Signature**

```ts
export declare const fromReaderTask: <W>(w: W) => <R, A>(a: readerTask.ReaderTask<R, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromReaderWriter

**Signature**

```ts
export declare const fromReaderWriter: <R, W, A>(fa: Reader<R, Writer<W, A>>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <W>(w: W) => <A>(fa: Async<A>) => ReaderTaskWriter<unknown, W, A>
```

Added in v3.0.0

## fromTaskWriter

**Signature**

```ts
export declare const fromTaskWriter: <W, A>(a: Async<Writer<W, A>>) => ReaderTaskWriter<unknown, W, A>
```

Added in v3.0.0

## fromWriter

**Signature**

```ts
export declare const fromWriter: <W, A>(fa: Writer<W, A>) => ReaderTaskWriter<unknown, W, A>
```

Added in v3.0.0

# do notation

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderTaskWriter<R, E, A>
) => ReaderTaskWriter<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(
  f: (e: E) => G
) => <R, A>(self: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, G, A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ReaderTaskWriterTypeLambda>
```

Added in v3.0.0

## FromWriter

**Signature**

```ts
export declare const FromWriter: fromWriter_.FromWriter<ReaderTaskWriterTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderTaskWriterTypeLambda>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(
  Apply: Apply<readerTask.ReaderTaskTypeLambda>,
  Monoid: Monoid<W>
) => Applicative<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(
  Apply: Apply<readerTask.ReaderTaskTypeLambda>,
  Semigroup: Semigroup<W>
) => Apply<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <W>(S: Semigroup<W>) => Flattenable<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getFromIO

**Signature**

```ts
export declare const getFromIO: <W>(M: Monoid<W>) => FromIO<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getFromIdentity

**Signature**

```ts
export declare const getFromIdentity: <W>(M: Monoid<W>) => FromIdentity<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getFromReader

**Signature**

```ts
export declare const getFromReader: <W>(M: Monoid<W>) => FromReader<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getFromTask

**Signature**

```ts
export declare const getFromTask: <W>(M: Monoid<W>) => FromTask<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad<ReaderTaskWriterFFix<W>>
```

Added in v3.0.0

# lifting

## liftReaderWriter

**Signature**

```ts
export declare const liftReaderWriter: <A extends readonly unknown[], R, W, B>(
  f: (...a: A) => Reader<R, Writer<W, B>>
) => (...a: A) => ReaderTaskWriter<R, W, B>
```

Added in v3.0.0

## liftTaskWriter

**Signature**

```ts
export declare const liftTaskWriter: <A extends readonly unknown[], W, B>(
  f: (...a: A) => Async<Writer<W, B>>
) => (...a: A) => ReaderTaskWriter<unknown, W, B>
```

Added in v3.0.0

## liftWriter

**Signature**

```ts
export declare const liftWriter: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Writer<E, B>
) => (...a: A) => ReaderTaskWriter<unknown, E, B>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <R, E, B>(self: ReaderTaskWriter<R, E, (a: A) => B>) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(self: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, G, B>
```

Added in v3.0.0

# model

## ReaderTaskWriter (interface)

**Signature**

```ts
export interface ReaderTaskWriter<R, W, A> extends Reader<R, Async<Writer<W, A>>> {}
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(A, M))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <W>(
  A: Apply<readerTask.ReaderTaskTypeLambda>,
  M: Monoid<W>
) => <R, A>(arr: readonly ReaderTaskWriter<R, W, A>[]) => ReaderTaskWriter<R, W, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <W>(
  A: Apply<readerTask.ReaderTaskTypeLambda>,
  M: Monoid<W>
) => <A, R, B>(f: (a: A) => ReaderTaskWriter<R, W, B>) => (as: readonly A[]) => ReaderTaskWriter<R, W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(Apply, Monoid))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <W>(
  Apply: Apply<readerTask.ReaderTaskTypeLambda>,
  Monoid: Monoid<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderTaskWriter<R, W, B>
) => (as: readonly A[]) => ReaderTaskWriter<R, W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(Apply, Semigroup))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <W>(
  Apply: Apply<readerTask.ReaderTaskTypeLambda>,
  Semigroup: Semigroup<W>
) => <A, R, B>(
  f: (a: A) => ReaderTaskWriter<R, W, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskWriter<R, W, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(Apply, Semigroup))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <W>(
  Apply: Apply<readerTask.ReaderTaskTypeLambda>,
  Semigroup: Semigroup<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderTaskWriter<R, W, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskWriter<R, W, readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, readonly [A]>
```

Added in v3.0.0

# type lambdas

## ReaderTaskWriterFFix (interface)

**Signature**

```ts
export interface ReaderTaskWriterFFix<W> extends TypeLambda {
  readonly type: ReaderTaskWriter<this['In1'], W, this['Out1']>
}
```

Added in v3.0.0

## ReaderTaskWriterTypeLambda (interface)

**Signature**

```ts
export interface ReaderTaskWriterTypeLambda extends TypeLambda {
  readonly type: ReaderTaskWriter<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## censor

**Signature**

```ts
export declare const censor: <W>(f: (w: W) => W) => <R, A>(self: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <R, W, A>(self: ReaderTaskWriter<R, W, A>) => readerTask.ReaderTask<R, W>
```

Added in v3.0.0

## listen

**Signature**

```ts
export declare const listen: <R, W, A>(self: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, readonly [W, A]>
```

Added in v3.0.0

## listens

**Signature**

```ts
export declare const listens: <W, B>(
  f: (w: W) => B
) => <R, A>(self: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, readonly [A, B]>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <W, A>(self: ReaderTaskWriter<R1, W, A>) => ReaderTaskWriter<R2, W, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(self: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## pass

**Signature**

```ts
export declare const pass: <R, W, A>(
  self: ReaderTaskWriter<R, W, readonly [A, (w: W) => W]>
) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <R, W, A>(self: ReaderTaskWriter<R, W, A>) => readerTask.ReaderTask<R, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, W, A>(self: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, A, W>
```

Added in v3.0.0
