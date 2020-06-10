---
title: ReaderTask.ts
nav_order: 67
parent: Modules
---

## ReaderTask overview

Added in v2.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [chainIOK](#chainiok)
  - [chainTaskK](#chaintaskk)
  - [fromIOK](#fromiok)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [readerTask](#readertask)
  - [readerTaskSeq](#readertaskseq)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [utils](#utils)
  - [run](#run)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <R, A>(a: A) => ReaderTask<R, A>
```

Added in v2.3.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

Added in v2.3.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v2.3.0

# combinators

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## fromTaskK

**Signature**

```ts
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## local

**Signature**

```ts
export declare const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
```

Added in v2.3.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v2.3.0

## asks

**Signature**

```ts
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v2.3.0

## fromIO

**Signature**

```ts
export declare const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A = never>(ma: R.Reader<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromTask

**Signature**

```ts
export declare const fromTask: <R, A>(ma: T.Task<A>) => ReaderTask<R, A>
```

Added in v2.3.0

# instances

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

## getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
```

Added in v2.3.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
```

Added in v2.3.0

## readerTask

**Signature**

```ts
export declare const readerTask: Monad2<'ReaderTask'> & MonadTask2<'ReaderTask'>
```

Added in v2.3.0

## readerTaskSeq

Like `readerTask` but `ap` is sequential

**Signature**

```ts
export declare const readerTaskSeq: Monad2<'ReaderTask'> & MonadTask2<'ReaderTask'>
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

# utils

## run

**Signature**

```ts
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
```

Added in v2.4.0
