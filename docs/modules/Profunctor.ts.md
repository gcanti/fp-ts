---
title: Profunctor.ts
nav_order: 66
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Profunctor (interface)](#profunctor-interface)
- [Profunctor2 (interface)](#profunctor2-interface)
- [Profunctor2C (interface)](#profunctor2c-interface)
- [Profunctor3 (interface)](#profunctor3-interface)
- [Profunctor4 (interface)](#profunctor4-interface)

---

# Profunctor (interface)

**Signature**

```ts
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B) => HKT2<F, L, B>
  readonly promap: <A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>
}
```

Added in v2.0.0

# Profunctor2 (interface)

**Signature**

```ts
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
  readonly promap: <A, B, C, D>(fbc: Type2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => Type2<F, A, D>
}
```

# Profunctor2C (interface)

**Signature**

```ts
export interface Profunctor2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly promap: <A, C, D>(flc: Type2<F, L, C>, f: (a: A) => L, g: (c: C) => D) => Type2<F, A, D>
}
```

# Profunctor3 (interface)

**Signature**

```ts
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
  readonly promap: <U, A, B, C, D>(fbc: Type3<F, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Type3<F, U, A, D>
}
```

# Profunctor4 (interface)

**Signature**

```ts
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
  readonly promap: <X, U, A, B, C, D>(fbc: Type4<F, X, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Type4<F, X, U, A, D>
}
```
