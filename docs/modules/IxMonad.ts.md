---
title: IxMonad.ts
nav_order: 46
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IxMonad (interface)](#ixmonad-interface)
- [IxMonad3 (interface)](#ixmonad3-interface)

---

# IxMonad (interface)

**Signature**

```ts
export interface IxMonad<F> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}
```

Added in v2.0.0

# IxMonad3 (interface)

**Signature**

```ts
export interface IxMonad3<F extends URIS3> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => Type3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: Type3<F, I, O, A>, f: (a: A) => Type3<F, O, Z, B>) => Type3<F, I, Z, B>
}
```
