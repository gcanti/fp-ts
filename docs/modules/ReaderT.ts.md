---
title: ReaderT.ts
nav_order: 67
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderT (interface)](#readert-interface)
- [ReaderT1 (interface)](#readert1-interface)
- [ReaderT2 (interface)](#readert2-interface)
- [ReaderT3 (interface)](#readert3-interface)
- [fromReader (function)](#fromreader-function)
- [getReaderT (function)](#getreadert-function)

---

# ReaderT (interface)

**Signature**

```ts
export interface ReaderT<M> {
  readonly map: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => B) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => (e: E) => HKT<M, B>) => (e: E) => HKT<M, B>
}
```

# ReaderT1 (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => B) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => (e: E) => Type<M, B>) => (e: E) => Type<M, B>
}
```

# ReaderT2 (interface)

**Signature**

```ts
export interface ReaderT2<M extends URIS2> {
  readonly map: <L, E, A, B>(fa: (e: E) => Type2<M, L, A>, f: (a: A) => B) => (e: E) => Type2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Type2<M, L, (a: A) => B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
  readonly chain: <L, E, A, B>(
    fa: (e: E) => Type2<M, L, A>,
    f: (a: A) => (e: E) => Type2<M, L, B>
  ) => (e: E) => Type2<M, L, B>
}
```

# ReaderT3 (interface)

**Signature**

```ts
export interface ReaderT3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(fa: (e: E) => Type3<M, U, L, A>, f: (a: A) => B) => (e: E) => Type3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Type3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Type3<M, U, L, (a: A) => B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    fa: (e: E) => Type3<M, U, L, A>,
    f: (a: A) => (e: E) => Type3<M, U, L, B>
  ) => (e: E) => Type3<M, U, L, B>
}
```

# fromReader (function)

**Signature**

```ts
export function fromReader<F extends URIS3>(
  F: Applicative3<F>
): <E, U, L, A>(fa: Reader<E, A>) => (e: E) => Type3<F, U, L, A>
export function fromReader<F extends URIS2>(F: Applicative2<F>): <E, L, A>(fa: Reader<E, A>) => (e: E) => Type2<F, L, A>
export function fromReader<F extends URIS>(F: Applicative1<F>): <E, A>(fa: Reader<E, A>) => (e: E) => Type<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A> { ... }
```

Added in v1.2.0

# getReaderT (function)

**Signature**

```ts
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M> { ... }
```

Added in v1.14.0
