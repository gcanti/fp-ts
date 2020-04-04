---
title: ReaderTask.ts
nav_order: 67
parent: Modules
---

# ReaderTask overview

Added in v2.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderTask (interface)](#readertask-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [ask](#ask)
- [asks](#asks)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainIOK](#chainiok)
- [chainTaskK](#chaintaskk)
- [flatten](#flatten)
- [fromIO](#fromio)
- [fromIOK](#fromiok)
- [fromReader](#fromreader)
- [fromTask](#fromtask)
- [fromTaskK](#fromtaskk)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)
- [local](#local)
- [map](#map)
- [of](#of)
- [readerTask](#readertask)
- [readerTaskSeq](#readertaskseq)
- [run](#run)

---

# ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v2.3.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.3.0

# URI

**Signature**

```ts
export declare const URI: 'ReaderTask'
```

Added in v2.3.0

# ap

**Signature**

```ts
export declare const ap: <E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v2.3.0

# apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# ask

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v2.3.0

# asks

**Signature**

```ts
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v2.3.0

# chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# chainIOK

**Signature**

```ts
export declare function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

# chainTaskK

**Signature**

```ts
export declare function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

# flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: ReaderTask<E, ReaderTask<E, A>>) => ReaderTask<E, A>
```

Added in v2.3.0

# fromIO

**Signature**

```ts
export declare function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A>
```

Added in v2.3.0

# fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

# fromReader

**Signature**

```ts
export declare const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

# fromTask

**Signature**

```ts
export declare const fromTask: <R, A>(ma: TA.Task<A>) => ReaderTask<R, A>
```

Added in v2.3.0

# fromTaskK

**Signature**

```ts
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

# getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
```

Added in v2.3.0

# getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
```

Added in v2.3.0

# local

**Signature**

```ts
export declare function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
```

Added in v2.3.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# of

**Signature**

```ts
export declare const of: <R, A>(a: A) => ReaderTask<R, A>
```

Added in v2.3.0

# readerTask

**Signature**

```ts
export declare const readerTask: Monad2<'ReaderTask'> & MonadTask2<'ReaderTask'>
```

Added in v2.3.0

# readerTaskSeq

Like `readerTask` but `ap` is sequential

**Signature**

```ts
export declare const readerTaskSeq: Monad2<'ReaderTask'> & MonadTask2<'ReaderTask'>
```

Added in v2.3.0

# run

**Signature**

```ts
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
```

Added in v2.4.0
