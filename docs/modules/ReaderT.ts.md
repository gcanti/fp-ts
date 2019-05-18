---
title: ReaderT.ts
nav_order: 68
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderM (interface)](#readerm-interface)
- [ReaderM1 (interface)](#readerm1-interface)
- [ReaderM2 (interface)](#readerm2-interface)
- [ReaderM3 (interface)](#readerm3-interface)
- [ReaderT (interface)](#readert-interface)
- [ReaderT1 (interface)](#readert1-interface)
- [ReaderT2 (interface)](#readert2-interface)
- [ReaderT3 (interface)](#readert3-interface)
- [getReaderM (function)](#getreaderm-function)

---

# ReaderM (interface)

**Signature**

```ts
export interface ReaderM<M> {
  readonly map: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => B) => ReaderT<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT<M, R, (a: A) => B>, ma: ReaderT<M, R, A>) => ReaderT<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT<M, R, A>, f: (a: A) => ReaderT<M, R, B>) => ReaderT<M, R, B>
  readonly ask: <R>() => ReaderT<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT<M, R, A>) => ReaderT<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT<M, R, A>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ReaderT<M, R, A>
}
```

Added in v2.0.0

# ReaderM1 (interface)

**Signature**

```ts
export interface ReaderM1<M extends URIS> {
  readonly map: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => B) => ReaderT1<M, R, B>
  readonly of: <R, A>(a: A) => ReaderT1<M, R, A>
  readonly ap: <R, A, B>(mab: ReaderT1<M, R, (a: A) => B>, ma: ReaderT1<M, R, A>) => ReaderT1<M, R, B>
  readonly chain: <R, A, B>(ma: ReaderT1<M, R, A>, f: (a: A) => ReaderT1<M, R, B>) => ReaderT1<M, R, B>
  readonly ask: <R>() => ReaderT1<M, R, R>
  readonly asks: <R, A>(f: (r: R) => A) => ReaderT1<M, R, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <A>(ma: ReaderT1<M, R, A>) => ReaderT1<M, Q, A>
  readonly fromReader: <R, A>(ma: Reader<R, A>) => ReaderT1<M, R, A>
  readonly fromM: <R, A>(ma: Type<M, A>) => ReaderT1<M, R, A>
}
```

Added in v2.0.0

# ReaderM2 (interface)

**Signature**

```ts
export interface ReaderM2<M extends URIS2> {
  readonly map: <R, L, A, B>(ma: ReaderT2<M, R, L, A>, f: (a: A) => B) => ReaderT2<M, R, L, B>
  readonly of: <R, L, A>(a: A) => ReaderT2<M, R, L, A>
  readonly ap: <R, L, A, B>(mab: ReaderT2<M, R, L, (a: A) => B>, ma: ReaderT2<M, R, L, A>) => ReaderT2<M, R, L, B>
  readonly chain: <R, L, A, B>(ma: ReaderT2<M, R, L, A>, f: (a: A) => ReaderT2<M, R, L, B>) => ReaderT2<M, R, L, B>
  readonly ask: <R, L>() => ReaderT2<M, R, L, R>
  readonly asks: <R, L, A>(f: (r: R) => A) => ReaderT2<M, R, L, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <L, A>(ma: ReaderT2<M, R, L, A>) => ReaderT2<M, Q, L, A>
  readonly fromReader: <R, L, A>(ma: Reader<R, A>) => ReaderT2<M, R, L, A>
  readonly fromM: <R, L, A>(ma: Type2<M, L, A>) => ReaderT2<M, R, L, A>
}
```

Added in v2.0.0

# ReaderM3 (interface)

**Signature**

```ts
export interface ReaderM3<M extends URIS3> {
  readonly map: <R, U, L, A, B>(ma: ReaderT3<M, R, U, L, A>, f: (a: A) => B) => ReaderT3<M, R, U, L, B>
  readonly of: <R, U, L, A>(a: A) => ReaderT3<M, R, U, L, A>
  readonly ap: <R, U, L, A, B>(
    mab: ReaderT3<M, R, U, L, (a: A) => B>,
    ma: ReaderT3<M, R, U, L, A>
  ) => ReaderT3<M, R, U, L, B>
  readonly chain: <R, U, L, A, B>(
    ma: ReaderT3<M, R, U, L, A>,
    f: (a: A) => ReaderT3<M, R, U, L, B>
  ) => ReaderT3<M, R, U, L, B>
  readonly ask: <R, U, L>() => ReaderT3<M, R, U, L, R>
  readonly asks: <R, U, L, A>(f: (r: R) => A) => ReaderT3<M, R, U, L, A>
  readonly local: <Q, R>(f: (d: Q) => R) => <U, L, A>(ma: ReaderT3<M, R, U, L, A>) => ReaderT3<M, Q, U, L, A>
  readonly fromReader: <R, U, L, A>(ma: Reader<R, A>) => ReaderT3<M, R, U, L, A>
  readonly fromM: <R, U, L, A>(ma: Type3<M, U, L, A>) => ReaderT3<M, R, U, L, A>
}
```

Added in v2.0.0

# ReaderT (interface)

**Signature**

```ts
export interface ReaderT<M, R, A> {
  (r: R): HKT<M, A>
}
```

Added in v2.0.0

# ReaderT1 (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS, R, A> {
  (r: R): Type<M, A>
}
```

Added in v2.0.0

# ReaderT2 (interface)

**Signature**

```ts
export interface ReaderT2<M extends URIS2, R, L, A> {
  (r: R): Type2<M, L, A>
}
```

Added in v2.0.0

# ReaderT3 (interface)

**Signature**

```ts
export interface ReaderT3<M extends URIS3, R, U, L, A> {
  (r: R): Type3<M, U, L, A>
}
```

Added in v2.0.0

# getReaderM (function)

**Signature**

```ts
export function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>
export function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>
export function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>
export function getReaderM<M>(M: Monad<M>): ReaderM<M> { ... }
```

Added in v2.0.0
