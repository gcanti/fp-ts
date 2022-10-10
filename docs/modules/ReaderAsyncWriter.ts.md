---
title: ReaderAsyncWriter.ts
nav_order: 23
parent: Modules
---

## ReaderAsyncWriter overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [asksReaderAsyncWriter](#asksreaderasyncwriter)
  - [tell](#tell)
- [conversions](#conversions)
  - [fromAsync](#fromasync)
  - [fromAsyncWriter](#fromasyncwriter)
  - [fromReader](#fromreader)
  - [fromReaderAsync](#fromreaderasync)
  - [fromReaderWriter](#fromreaderwriter)
  - [fromSync](#fromsync)
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
  - [getFromAsync](#getfromasync)
  - [getFromIdentity](#getfromidentity)
  - [getFromReader](#getfromreader)
  - [getFromSync](#getfromsync)
  - [getMonad](#getmonad)
- [lifting](#lifting)
  - [liftAsyncWriter](#liftasyncwriter)
  - [liftReaderWriter](#liftreaderwriter)
  - [liftWriter](#liftwriter)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [ReaderAsyncWriter (interface)](#readerasyncwriter-interface)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [tupled](#tupled)
- [type lambdas](#type-lambdas)
  - [ReaderAsyncWriterFFix (interface)](#readerasyncwriterffix-interface)
  - [ReaderAsyncWriterTypeLambda (interface)](#readerasyncwritertypelambda-interface)
- [utils](#utils)
  - [censor](#censor)
  - [fst](#fst)
  - [listen](#listen)
  - [listens](#listens)
  - [local](#local)
  - [pass](#pass)
  - [reverse](#reverse)
  - [snd](#snd)

---

# constructors

## asksReaderAsyncWriter

**Signature**

```ts
export declare const asksReaderAsyncWriter: <R1, R2, W, A>(
  f: (r1: R1) => ReaderAsyncWriter<R2, W, A>
) => ReaderAsyncWriter<R1 & R2, W, A>
```

Added in v3.0.0

## tell

Appends a value to the accumulator

**Signature**

```ts
export declare const tell: <W, R>(w: W) => ReaderAsyncWriter<R, W, void>
```

Added in v3.0.0

# conversions

## fromAsync

**Signature**

```ts
export declare const fromAsync: <W>(w: W) => <A>(fa: Async<A>) => ReaderAsyncWriter<unknown, W, A>
```

Added in v3.0.0

## fromAsyncWriter

**Signature**

```ts
export declare const fromAsyncWriter: <W, A>(a: Async<Writer<W, A>>) => ReaderAsyncWriter<unknown, W, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <W>(w: W) => <R, A>(fa: Reader<R, A>) => ReaderAsyncWriter<R, W, A>
```

Added in v3.0.0

## fromReaderAsync

**Signature**

```ts
export declare const fromReaderAsync: <W>(
  w: W
) => <R, A>(a: readerAsync.ReaderAsync<R, A>) => ReaderAsyncWriter<R, W, A>
```

Added in v3.0.0

## fromReaderWriter

**Signature**

```ts
export declare const fromReaderWriter: <R, W, A>(fa: Reader<R, Writer<W, A>>) => ReaderAsyncWriter<R, W, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <W>(w: W) => <A>(fa: Sync<A>) => ReaderAsyncWriter<unknown, W, A>
```

Added in v3.0.0

## fromWriter

**Signature**

```ts
export declare const fromWriter: <W, A>(fa: Writer<W, A>) => ReaderAsyncWriter<unknown, W, A>
```

Added in v3.0.0

# do notation

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderAsyncWriter<R, E, A>
) => ReaderAsyncWriter<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
) => <R, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, G, A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ReaderAsyncWriterTypeLambda>
```

Added in v3.0.0

## FromWriter

**Signature**

```ts
export declare const FromWriter: fromWriter_.FromWriter<ReaderAsyncWriterTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderAsyncWriterTypeLambda>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Monoid: Monoid<W>
) => Applicative<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
) => Apply<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <W>(S: Semigroup<W>) => Flattenable<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getFromAsync

**Signature**

```ts
export declare const getFromAsync: <W>(M: Monoid<W>) => FromAsync<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getFromIdentity

**Signature**

```ts
export declare const getFromIdentity: <W>(M: Monoid<W>) => FromIdentity<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getFromReader

**Signature**

```ts
export declare const getFromReader: <W>(M: Monoid<W>) => FromReader<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getFromSync

**Signature**

```ts
export declare const getFromSync: <W>(M: Monoid<W>) => FromSync<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad<ReaderAsyncWriterFFix<W>>
```

Added in v3.0.0

# lifting

## liftAsyncWriter

**Signature**

```ts
export declare const liftAsyncWriter: <A extends readonly unknown[], W, B>(
  f: (...a: A) => Async<Writer<W, B>>
) => (...a: A) => ReaderAsyncWriter<unknown, W, B>
```

Added in v3.0.0

## liftReaderWriter

**Signature**

```ts
export declare const liftReaderWriter: <A extends readonly unknown[], R, W, B>(
  f: (...a: A) => Reader<R, Writer<W, B>>
) => (...a: A) => ReaderAsyncWriter<R, W, B>
```

Added in v3.0.0

## liftWriter

**Signature**

```ts
export declare const liftWriter: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Writer<E, B>
) => (...a: A) => ReaderAsyncWriter<unknown, E, B>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <R, E, B>(self: ReaderAsyncWriter<R, E, (a: A) => B>) => ReaderAsyncWriter<R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <R, E>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, B>
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
) => <R>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, G, B>
```

Added in v3.0.0

# model

## ReaderAsyncWriter (interface)

**Signature**

```ts
export interface ReaderAsyncWriter<R, W, A> extends Reader<R, Async<Writer<W, A>>> {}
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(A, M))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <W>(
  A: Apply<readerAsync.ReaderAsyncTypeLambda>,
  M: Monoid<W>
) => <R, A>(arr: readonly ReaderAsyncWriter<R, W, A>[]) => ReaderAsyncWriter<R, W, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(getApply(Apply, Semigroup))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
) => <A, R, B>(
  f: (a: A) => ReaderAsyncWriter<R, W, B>
) => (as: readonly [A, ...A[]]) => ReaderAsyncWriter<R, W, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(Apply, Semigroup))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Semigroup: Semigroup<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderAsyncWriter<R, W, B>
) => (as: readonly [A, ...A[]]) => ReaderAsyncWriter<R, W, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <W>(
  A: Apply<readerAsync.ReaderAsyncTypeLambda>,
  M: Monoid<W>
) => <A, R, B>(f: (a: A) => ReaderAsyncWriter<R, W, B>) => (as: readonly A[]) => ReaderAsyncWriter<R, W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(Apply, Monoid))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <W>(
  Apply: Apply<readerAsync.ReaderAsyncTypeLambda>,
  Monoid: Monoid<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderAsyncWriter<R, W, B>
) => (as: readonly A[]) => ReaderAsyncWriter<R, W, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderAsyncWriter<R, E, A>) => ReaderAsyncWriter<R, E, readonly [A]>
```

Added in v3.0.0

# type lambdas

## ReaderAsyncWriterFFix (interface)

**Signature**

```ts
export interface ReaderAsyncWriterFFix<W> extends TypeLambda {
  readonly type: ReaderAsyncWriter<this['In1'], W, this['Out1']>
}
```

Added in v3.0.0

## ReaderAsyncWriterTypeLambda (interface)

**Signature**

```ts
export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## censor

**Signature**

```ts
export declare const censor: <W>(
  f: (w: W) => W
) => <R, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, A>
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => readerAsync.ReaderAsync<R, W>
```

Added in v3.0.0

## listen

**Signature**

```ts
export declare const listen: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, readonly [W, A]>
```

Added in v3.0.0

## listens

**Signature**

```ts
export declare const listens: <W, B>(
  f: (w: W) => B
) => <R, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, W, readonly [A, B]>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <W, A>(self: ReaderAsyncWriter<R1, W, A>) => ReaderAsyncWriter<R2, W, A>
```

Added in v3.0.0

## pass

**Signature**

```ts
export declare const pass: <R, W, A>(
  self: ReaderAsyncWriter<R, W, readonly [A, (w: W) => W]>
) => ReaderAsyncWriter<R, W, A>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => ReaderAsyncWriter<R, A, W>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <R, W, A>(self: ReaderAsyncWriter<R, W, A>) => readerAsync.ReaderAsync<R, A>
```

Added in v3.0.0
