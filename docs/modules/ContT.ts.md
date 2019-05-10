---
title: ContT.ts
nav_order: 23
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ContM (interface)](#contm-interface)
- [ContT (interface)](#contt-interface)
- [getContM (function)](#getcontm-function)

---

# ContM (interface)

**Signature**

```ts
export interface ContM<M> {
  readonly map: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => B) => ContT<M, R, B>
  readonly of: <R, A>(a: A) => ContT<M, R, A>
  readonly ap: <R, A, B>(mab: ContT<M, R, (a: A) => B>, ma: ContT<M, R, A>) => ContT<M, R, B>
  readonly chain: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => ContT<M, R, B>) => ContT<M, R, B>
  readonly fromM: <R, A>(ma: HKT<M, A>) => ContT<M, R, A>
}
```

# ContT (interface)

**Signature**

```ts
export interface ContT<M, R, A> {
  (c: (a: A) => HKT<M, R>): HKT<M, R>
}
```

# getContM (function)

**Signature**

```ts
export function getContM<M extends URIS>(M: Monad1<M>): ContM1<M>
export function getContM<M>(M: Monad<M>): ContM<M> { ... }
```

Added in v2.0.0
