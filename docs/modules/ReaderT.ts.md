---
title: ReaderT.ts
nav_order: 66
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderT (interface)](#readert-interface)
- [ReaderT1 (interface)](#readert1-interface)
- [ReaderT2 (interface)](#readert2-interface)
- [ReaderT3 (interface)](#readert3-interface)
- [getReaderT (function)](#getreadert-function)

---

# ReaderT (interface)

**Signature**

```ts
export interface ReaderT<M> {
  readonly map: <E, A, B>(ma: (e: E) => HKT<M, A>, f: (a: A) => B) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(mab: (e: E) => HKT<M, (a: A) => B>, ma: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(ma: (e: E) => HKT<M, A>, f: (a: A) => (e: E) => HKT<M, B>) => (e: E) => HKT<M, B>
  readonly fromReader: <E, A>(ma: Reader<E, A>) => (e: E) => HKT<M, A>
}
```

# ReaderT1 (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(ma: (e: E) => Type<M, A>, f: (a: A) => B) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(mab: (e: E) => Type<M, (a: A) => B>, ma: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(ma: (e: E) => Type<M, A>, f: (a: A) => (e: E) => Type<M, B>) => (e: E) => Type<M, B>
  readonly fromReader: <E, A>(ma: Reader<E, A>) => (e: E) => Type<M, A>
}
```

# ReaderT2 (interface)

**Signature**

```ts
export interface ReaderT2<M extends URIS2> {
  readonly map: <L, E, A, B>(ma: (e: E) => Type2<M, L, A>, f: (a: A) => B) => (e: E) => Type2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  readonly ap: <L, E, A, B>(
    mab: (e: E) => Type2<M, L, (a: A) => B>,
    ma: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
  readonly chain: <L, E, A, B>(
    ma: (e: E) => Type2<M, L, A>,
    f: (a: A) => (e: E) => Type2<M, L, B>
  ) => (e: E) => Type2<M, L, B>
  readonly fromReader: <E, A>(ma: Reader<E, A>) => <L>(e: E) => Type2<M, L, A>
}
```

# ReaderT3 (interface)

**Signature**

```ts
export interface ReaderT3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(ma: (e: E) => Type3<M, U, L, A>, f: (a: A) => B) => (e: E) => Type3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Type3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    mab: (e: E) => Type3<M, U, L, (a: A) => B>,
    ma: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    ma: (e: E) => Type3<M, U, L, A>,
    f: (a: A) => (e: E) => Type3<M, U, L, B>
  ) => (e: E) => Type3<M, U, L, B>
  readonly fromReader: <E, A>(ma: Reader<E, A>) => <U, L>(e: E) => Type3<M, U, L, A>
}
```

# getReaderT (function)

**Signature**

```ts
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M> { ... }
```

Added in v2.0.0
