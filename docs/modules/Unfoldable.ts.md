---
title: Unfoldable.ts
nav_order: 91
parent: Modules
---

# Overview

This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.

---

<h2 class="text-delta">Table of contents</h2>

- [Unfoldable (interface)](#unfoldable-interface)
- [Unfoldable1 (interface)](#unfoldable1-interface)
- [Unfoldable2 (interface)](#unfoldable2-interface)
- [Unfoldable2C (interface)](#unfoldable2c-interface)
- [Unfoldable3 (interface)](#unfoldable3-interface)
- [Unfoldable3C (interface)](#unfoldable3c-interface)

---

# Unfoldable (interface)

**Signature**

```ts
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

Added in v2.0.0

# Unfoldable1 (interface)

**Signature**

```ts
export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type<F, A>
}
```

# Unfoldable2 (interface)

**Signature**

```ts
export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfold: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}
```

# Unfoldable2C (interface)

**Signature**

```ts
export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}
```

# Unfoldable3 (interface)

**Signature**

```ts
export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfold: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>
}
```

# Unfoldable3C (interface)

**Signature**

```ts
export interface Unfoldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>
}
```
