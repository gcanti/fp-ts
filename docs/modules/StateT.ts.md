---
title: StateT.ts
nav_order: 80
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StateM (interface)](#statem-interface)
- [StateT (interface)](#statet-interface)
- [getStateM (function)](#getstatem-function)

---

# StateM (interface)

**Signature**

```ts
export interface StateM<M> {
  readonly map: <S, A, B>(fa: StateT<M, S, A>, f: (a: A) => B) => StateT<M, S, B>
  readonly of: <S, A>(a: A) => StateT<M, S, A>
  readonly ap: <S, A, B>(fab: StateT<M, S, (a: A) => B>, fa: StateT<M, S, A>) => StateT<M, S, B>
  readonly chain: <S, A, B>(fa: StateT<M, S, A>, f: (a: A) => StateT<M, S, B>) => StateT<M, S, B>
  readonly get: <S>() => StateT<M, S, S>
  readonly put: <S>(s: S) => StateT<M, S, void>
  readonly modify: <S>(f: (s: S) => S) => StateT<M, S, void>
  readonly gets: <S, A>(f: (s: S) => A) => StateT<M, S, A>
  readonly fromState: <S, A>(fa: State<S, A>) => StateT<M, S, A>
  readonly fromM: <S, A>(ma: HKT<M, A>) => StateT<M, S, A>
  readonly evalState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, A>
  readonly execState: <S, A>(ma: StateT<M, S, A>, s: S) => HKT<M, S>
}
```

# StateT (interface)

**Signature**

```ts
export interface StateT<M, S, A> {
  (s: S): HKT<M, [A, S]>
}
```

# getStateM (function)

**Signature**

```ts
export function getStateM<M extends URIS3>(M: Monad3<M>): StateM3<M>
export function getStateM<M extends URIS2>(M: Monad2<M>): StateM2<M>
export function getStateM<M extends URIS>(M: Monad1<M>): StateM1<M>
export function getStateM<M>(M: Monad<M>): StateM<M> { ... }
```

Added in v2.0.0
