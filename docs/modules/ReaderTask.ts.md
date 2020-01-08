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
- [URI (constant)](#uri-constant)
- [ask (constant)](#ask-constant)
- [asks (constant)](#asks-constant)
- [fromReader (constant)](#fromreader-constant)
- [fromTask (constant)](#fromtask-constant)
- [of (constant)](#of-constant)
- [readerTask (constant)](#readertask-constant)
- [readerTaskSeq (constant)](#readertaskseq-constant)
- [chainIOK (function)](#chainiok-function)
- [chainTaskK (function)](#chaintaskk-function)
- [fromIO (function)](#fromio-function)
- [fromIOK (function)](#fromiok-function)
- [fromTaskK (function)](#fromtaskk-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [local (function)](#local-function)
- [run (function)](#run-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "ReaderTask" = ...
```

Added in v2.3.0

# ask (constant)

**Signature**

```ts
export const ask: <R>() => ReaderTask<R, R> = ...
```

Added in v2.3.0

# asks (constant)

**Signature**

```ts
export const asks: <R, A = ...
```

Added in v2.3.0

# fromReader (constant)

**Signature**

```ts
export const fromReader: <R, A = ...
```

Added in v2.3.0

# fromTask (constant)

**Signature**

```ts
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# of (constant)

**Signature**

```ts
export const of: <R, A>(a: A) => ReaderTask<R, A> = ...
```

Added in v2.3.0

# readerTask (constant)

**Signature**

```ts
export const readerTask: Monad2<URI> & MonadTask2<URI> = ...
```

Added in v2.3.0

# readerTaskSeq (constant)

Like `readerTask` but `ap` is sequential

**Signature**

```ts
export const readerTaskSeq: typeof readerTask = ...
```

Added in v2.3.0

# chainIOK (function)

**Signature**

```ts
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# chainTaskK (function)

**Signature**

```ts
export function chainTaskK<A, B>(f: (a: A) => Task<B>): <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# fromIO (function)

**Signature**

```ts
export function fromIO<R, A>(ma: IO<A>): ReaderTask<R, A> { ... }
```

Added in v2.3.0

# fromIOK (function)

**Signature**

```ts
export function fromIOK<A extends Array<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# fromTaskK (function)

**Signature**

```ts
export function fromTaskK<A extends Array<unknown>, B>(f: (...a: A) => Task<B>): <R>(...a: A) => ReaderTask<R, B> { ... }
```

Added in v2.4.0

# getMonoid (function)

**Signature**

```ts
export function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>> { ... }
```

Added in v2.3.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> { ... }
```

Added in v2.3.0

# local (function)

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A> { ... }
```

Added in v2.3.0

# run (function)

**Signature**

```ts
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> { ... }
```

Added in v2.4.0

# ap (export)

**Signature**

```ts
<E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v2.3.0

# apFirst (export)

**Signature**

```ts
<E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# apSecond (export)

**Signature**

```ts
<E, B>(fb: ReaderTask<E, B>) => <A>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v2.3.0

# flatten (export)

**Signature**

```ts
<E, A>(mma: ReaderTask<E, ReaderTask<E, A>>) => ReaderTask<E, A>
```

Added in v2.3.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v2.3.0
