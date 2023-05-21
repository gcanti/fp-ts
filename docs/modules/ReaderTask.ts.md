---
title: ReaderTask.ts
nav_order: 81
parent: Modules
---

## ReaderTask overview

Added in v2.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tap](#tap)
  - [tapIO](#tapio)
  - [tapReader](#tapreader)
  - [tapReaderIO](#tapreaderio)
  - [tapTask](#taptask)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderTask](#asksreadertask)
  - [asksReaderTaskW](#asksreadertaskw)
  - [of](#of)
- [conversions](#conversions)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromReaderIO](#fromreaderio)
  - [fromTask](#fromtask)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [let](#let)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [Pointed](#pointed)
- [legacy](#legacy)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderIOK](#chainfirstreaderiok)
  - [chainFirstReaderIOKW](#chainfirstreaderiokw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOK](#chainiok)
  - [chainW](#chainw)
- [lifting](#lifting)
  - [fromIOK](#fromiok)
  - [fromReaderIOK](#fromreaderiok)
  - [fromReaderK](#fromreaderk)
  - [fromTaskK](#fromtaskk)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [sequencing](#sequencing)
  - [chainReaderIOK](#chainreaderiok)
  - [chainReaderIOKW](#chainreaderiokw)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainTaskK](#chaintaskk)
  - [flatMap](#flatmap)
  - [flatMapIO](#flatmapio)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [apW](#apw)
  - [local](#local)
- [zone of death](#zone-of-death)
  - [~~getMonoid~~](#getmonoid)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~readerTaskSeq~~](#readertaskseq)
  - [~~readerTask~~](#readertask)
  - [~~run~~](#run)
  - [~~sequenceSeqArray~~](#sequenceseqarray)

---

# combinators

## tap

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tap: {
  <R1, A, R2, _>(self: ReaderTask<R1, A>, f: (a: A) => ReaderTask<R2, _>): ReaderTask<R1 & R2, A>
  <A, R2, _>(f: (a: A) => ReaderTask<R2, _>): <R1>(self: ReaderTask<R1, A>) => ReaderTask<R2 & R1, A>
}
```

Added in v2.15.0

## tapIO

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapIO: {
  <R, A, _>(self: ReaderTask<R, A>, f: (a: A) => IO<_>): ReaderTask<R, A>
  <A, _>(f: (a: A) => IO<_>): <R>(self: ReaderTask<R, A>) => ReaderTask<R, A>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as RT from 'fp-ts/ReaderTask'
import * as Console from 'fp-ts/Console'

// Will produce `Hello, fp-ts` to the stdout
const effect = pipe(
  RT.ask<string>(),
  RT.tapIO((value) => Console.log(`Hello, ${value}`))
)

async function test() {
  assert.deepStrictEqual(await effect('fp-ts')(), 'fp-ts')
}

test()
```

Added in v2.16.0

## tapReader

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapReader: {
  <R1, R2, A, _>(self: ReaderTask<R1, A>, f: (a: A) => R.Reader<R2, _>): ReaderTask<R1 & R2, A>
  <R2, A, _>(f: (a: A) => R.Reader<R2, _>): <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
}
```

Added in v2.16.0

## tapReaderIO

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapReaderIO: {
  <R1, R2, A, _>(self: ReaderTask<R1, A>, f: (a: A) => RIO.ReaderIO<R2, _>): ReaderTask<R1 & R2, A>
  <R2, A, _>(f: (a: A) => RIO.ReaderIO<R2, _>): <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
}
```

Added in v2.16.0

## tapTask

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapTask: {
  <R, A, _>(self: ReaderTask<R, A>, f: (a: A) => T.Task<_>): ReaderTask<R, A>
  <A, _>(f: (a: A) => T.Task<_>): <R>(self: ReaderTask<R, A>) => ReaderTask<R, A>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as RT from 'fp-ts/ReaderTask'
import * as T from 'fp-ts/Task'

const effect = pipe(
  RT.ask<number>(),
  RT.tapTask((value) => T.of(value + 1))
)

async function test() {
  assert.deepStrictEqual(await effect(1)(), 1)
}

test()
```

Added in v2.16.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v2.3.0

## asks

Projects a value from the global context in a `ReaderTask`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v2.3.0

## asksReaderTask

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderTask: <R, A>(f: (r: R) => ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.11.0

## asksReaderTaskW

Less strict version of [`asksReaderTask`](#asksreadertask).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const asksReaderTaskW: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A>
```

Added in v2.11.0

## of

**Signature**

```ts
export declare const of: <R = unknown, A = never>(a: A) => ReaderTask<R, A>
```

Added in v2.3.0

# conversions

## fromIO

**Signature**

```ts
export declare const fromIO: <A, R = unknown>(fa: IO<A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: R.Reader<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromReaderIO

**Signature**

```ts
export declare const fromReaderIO: <R, A>(fa: RIO.ReaderIO<R, A>) => ReaderTask<R, A>
```

Added in v2.13.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, R = unknown>(fa: T.Task<A>) => ReaderTask<R, A>
```

Added in v2.3.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderTask<unknown, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<E, B>
) => (fa: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<E, B>
) => (ma: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

# instances

## ApplicativePar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'ReaderTask'>
```

Added in v2.7.0

## ApplicativeSeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'ReaderTask'>
```

Added in v2.7.0

## ApplyPar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplyPar: Apply2<'ReaderTask'>
```

Added in v2.10.0

## ApplySeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplySeq: Apply2<'ReaderTask'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: chainable.Chain2<'ReaderTask'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'ReaderTask'>
```

Added in v2.10.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader2<'ReaderTask'>
```

Added in v2.11.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'ReaderTask'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderTask'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'ReaderTask'>
```

Added in v2.10.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'ReaderTask'>
```

Added in v2.10.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask2<'ReaderTask'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'ReaderTask'>
```

Added in v2.10.0

# legacy

## chain

Alias of `flatMap`.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## chainFirst

Alias of `tap`.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (first: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## chainFirstIOK

Alias of `tapIO`.

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.10.0

## chainFirstReaderIOK

Alias of `tapReaderIO`.

**Signature**

```ts
export declare const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.13.0

## chainFirstReaderIOKW

Alias of `tapReaderIO`.

Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).

**Signature**

```ts
export declare const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
```

Added in v2.13.0

## chainFirstReaderK

Alias of `tapReader`.

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.11.0

## chainFirstReaderKW

Alias of `tapReader`.

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, A>
```

Added in v2.11.0

## chainFirstTaskK

Alias of `tapTask`.

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.10.0

## chainFirstW

Alias of `tap`.

**Signature**

```ts
export declare const chainFirstW: <R2, A, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
```

Added in v2.11.0

## chainIOK

Alias of `flatMapIO`.

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## chainW

Alias of `flatMap`.

**Signature**

```ts
export declare const chainW: <R2, A, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v2.6.7

# lifting

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RIO.ReaderIO<R, B>
) => (...a: A) => ReaderTask<R, B>
```

Added in v2.13.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => (...a: A) => ReaderTask<R, B>
```

Added in v2.11.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

# mapping

## as

Maps the value to the specified constant value.

**Signature**

```ts
export declare const as: {
  <R, A, _>(self: ReaderTask<R, _>, a: A): ReaderTask<R, A>
  <A>(a: A): <R, _>(self: ReaderTask<R, _>) => ReaderTask<R, A>
}
```

Added in v2.16.0

## asUnit

Maps the value to the void constant value.

**Signature**

```ts
export declare const asUnit: <R, _>(self: ReaderTask<R, _>) => ReaderTask<R, void>
```

Added in v2.16.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

# model

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v2.3.0

# sequencing

## chainReaderIOK

**Signature**

```ts
export declare const chainReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.13.0

## chainReaderIOKW

Less strict version of [`chainReaderIOK`](#chainreaderiok).

**Signature**

```ts
export declare const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v2.13.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.11.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, B>
```

Added in v2.11.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, R2, B>(f: (a: A) => ReaderTask<R2, B>): <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
  <R1, A, R2, B>(ma: ReaderTask<R1, A>, f: (a: A) => ReaderTask<R2, B>): ReaderTask<R1 & R2, B>
}
```

Added in v2.14.0

## flatMapIO

**Signature**

```ts
export declare const flatMapIO: {
  <A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
  <R, A, B>(ma: ReaderTask<R, A>, f: (a: A) => IO<B>): ReaderTask<R, B>
}
```

Added in v2.16.0

## flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v2.3.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A>
```

Added in v2.11.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseSeqArray

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.10.0

## traverseSeqArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.10.0

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'ReaderTask'
```

Added in v2.3.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.3.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderTask<unknown, readonly []>
```

Added in v2.11.0

## ap

**Signature**

```ts
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

Added in v2.3.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B>
```

Added in v2.8.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A>
```

Added in v2.3.0

# zone of death

## ~~getMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getMonoid: <R, A>(M: Monoid<A>) => Monoid<ReaderTask<R, A>>
```

Added in v2.3.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <R, A>(S: Semigroup<A>) => Semigroup<ReaderTask<R, A>>
```

Added in v2.3.0

## ~~readerTaskSeq~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTaskSeq`
(where `RT` is from `import RT from 'fp-ts/ReaderTask'`)

**Signature**

```ts
export declare const readerTaskSeq: MonadTask2<'ReaderTask'>
```

Added in v2.3.0

## ~~readerTask~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTask`
(where `RT` is from `import RT from 'fp-ts/ReaderTask'`)

**Signature**

```ts
export declare const readerTask: MonadTask2<'ReaderTask'>
```

Added in v2.3.0

## ~~run~~

**Signature**

```ts
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
```

Added in v2.4.0

## ~~sequenceSeqArray~~

Use `traverseReadonlyArrayWithIndexSeq` instead.

**Signature**

```ts
export declare const sequenceSeqArray: <R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v2.10.0
