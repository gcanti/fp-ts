---
title: ReaderT.ts
nav_order: 68
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderM (interface)](#readerm-interface)
- [ReaderT (interface)](#readert-interface)
- [getReaderM (function)](#getreaderm-function)

---

# ReaderM (interface)

**Signature**

```ts
export interface ReaderM<M> {
  readonly map: <E, A, B>(ma: ReaderT<M, E, A>, f: (a: A) => B) => ReaderT<M, E, B>
  readonly of: <E, A>(a: A) => ReaderT<M, E, A>
  readonly ap: <E, A, B>(mab: ReaderT<M, E, (a: A) => B>, ma: ReaderT<M, E, A>) => ReaderT<M, E, B>
  readonly chain: <E, A, B>(ma: ReaderT<M, E, A>, f: (a: A) => ReaderT<M, E, B>) => ReaderT<M, E, B>
  readonly ask: <E>() => ReaderT<M, E, E>
  readonly asks: <E, A>(f: (e: E) => A) => ReaderT<M, E, A>
  readonly local: <E, A, D>(ma: ReaderT<M, E, A>, f: (d: D) => E) => ReaderT<M, D, A>
  readonly fromReader: <E, A>(ma: Reader<E, A>) => ReaderT<M, E, A>
  readonly fromM: <E, A>(ma: HKT<M, A>) => ReaderT<M, E, A>
}
```

# ReaderT (interface)

**Signature**

```ts
export interface ReaderT<M, E, A> {
  (e: E): HKT<M, A>
}
```

# getReaderM (function)

**Signature**

```ts
export function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M> { ... }
```

Added in v2.0.0
