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
export const URI: "ReaderTask" = ...
```

Added in v2.3.0

# ap

**Signature**

```ts
<E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v2.3.0

# apFirst

**Signature**

```ts
<E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# apSecond

**Signature**

```ts
<E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# ask

**Signature**

```ts
export const ask: <R>() => ReaderTask<R, R> = ...
```

Added in v2.3.0

# asks

**Signature**

```ts
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# chainIOK

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# chainTaskK

**Signature**

```ts
export function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# flatten

**Signature**

```ts
<E, A>(mma: ReaderTask<E, ReaderTask<E, A>>) => ReaderTask<E, A>
```

Added in v2.3.0

# fromIO

**Signature**

```ts
export function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A> { ... }
```

Added in v2.3.0

# fromIOK

**Signature**

```ts
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# fromReader

**Signature**

```ts
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# fromTask

**Signature**

```ts
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# fromTaskK

**Signature**

```ts
export function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# getMonoid

**Signature**

```ts
export function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>> { ... }
```

Added in v2.3.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> { ... }
```

Added in v2.3.0

# local

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A> { ... }
```

Added in v2.3.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# of

**Signature**

```ts
export const of: <R, A>(a: A) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# readerTask

**Signature**

```ts
export const readerTask: Monad2<URI> & MonadTask2<URI> = ...
```

Added in v2.3.0

# readerTaskSeq

Like `readerTask` but `ap` is sequential

**Signature**

```ts
export const readerTaskSeq: typeof readerTask = ...
```

Added in v2.3.0

# run

**Signature**

```ts
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> { ... }
```

Added in v2.4.0
